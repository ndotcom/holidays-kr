const request = require('request');
const parser = require('fast-xml-parser');
const config = {
    serviceKey : ''
};

const zerofill = function(number, digit){
    return ('00000000'+number).slice(-digit);
};

const getHolidaysByMonth = function(year, month){
    const url =
        'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo'
        + '?solYear=' + year
        + '&solMonth=' + zerofill(month, 2)
        + '&ServiceKey=' + config.serviceKey
    ;

    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                if (parser.validate(body) === true) {
                    /*
                     {
                        items : {
                            item : [   항목이 1개일 경우엔 item에 Array가 아니라 Object로 바로 들어가 있음, 0개일 경우엔 '' 가 들어가 있음.
                                ...
                            ]
                        },
                        numOfRows: [Number],
                        pageNo: [Number],
                        totalCount: [Number]
                     }
                     */
                    const data = parser.parse(body).response.body;
                    const holidays = [];
                    const addDay = item => {
                        if (item.isHoliday !== 'Y') return;

                        item.locdate += '';

                        const pushItem = {
                            name: item.dateName,
                            year: parseInt(item.locdate.substr(0, 4)),
                            month: parseInt(item.locdate.substr(4, 2)),
                            day: parseInt(item.locdate.substr(6, 2))
                        };
                        pushItem.date = [pushItem.year, zerofill(pushItem.month, 2), zerofill(pushItem.day, 2)].join('-');

                        holidays.push(pushItem);
                    };


                    if (data.totalCount && data.totalCount > 1) {
                        data.items.item.forEach(item => {
                            addDay(item);
                        });
                    } else if (data.totalCount === 1) {
                        addDay(data.items.item);
                    }

                    resolve(holidays);
                }
                reject(Error('XML 파싱 실패'));
            }
            reject(error);
        });
    });

};

const getHolidaysByMonthCount = function(year, month, monthCount = 1){
    const promiseList = [];

    // 추가 월만큼 반복해서 추가
    for(let i=0; i<monthCount; i++){
        const targetYear = year + Math.floor((month + i - 1)/12);
        const targetMonth = (month+i)%12 || 12;


        promiseList.push(new Promise(function(resolve, reject){
            setTimeout(function(){
                getHolidaysByMonth(targetYear, targetMonth)
                    .then(r => {
                        resolve(r)
                    })
                    .catch(r => {
                        reject(r)
                    })
                ;
            }, 100 * Math.max(i-10,0));  // 한번에 요청이 많이 나가면 뱉길래 10개 이상부터는 지연시간을 둠
        }));

    }

    return Promise.all(promiseList)
        .then(r => {
            return r.reduce(function(sum, current){
                return sum.concat(current);
            }, []);
        });
};

module.exports = {
    set serviceKey(val){
        config.serviceKey = val;
    },

    /**
     *
     * @param {Object} options
     * @param {Number} options.year 4자리 연도.
     * @param {Number} options.month 1~12
     * @param {Number} [options.monthCount=1] 지정한 연도.월부터 몇달짜리까지 긁어올지 정한다.
     * @return {Promise}
     */
    getHolidays : function(options){
        return getHolidaysByMonthCount(
            options.year,
            options.month,
            options.monthCount
        );
    }
};
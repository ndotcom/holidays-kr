# holidays-kr v1.0.0

## Description

- [공공데이터 포털 특일정보](https://www.data.go.kr/dataset/15012690/openapi.do) 데이터 기반으로 한국 공휴일 데이터 제공
- 1년치 데이터만 제공되는 것으로 확인됨

## Installation

```console
$ npm install holidays-kr --save
```


## Usage

```js
const holidays = require('holidays-kr');

holidays.serviceKey = 'YOUR_API_KEY';

holidays.getHolidays({
    year : 2018,
    month : 11,
    monthCount : 10
}).then(list => {
    console.log(list);
});
```

## License

MIT

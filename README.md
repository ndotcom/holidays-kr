# holidays-kr v1.0.3

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]


## Description

- [공공데이터 포털 특일정보](https://www.data.go.kr/dataset/15012690/openapi.do) 데이터 기반으로 한국 공휴일 데이터 제공
- API가 요청당 한달치 데이터만 주는 것을 원하는 범위만큼 한번에 긁을 수 있도록 하였습니다.
- 선거일과 대체공휴일 같은 반복이 아닌 휴일에 대응 가능합니다.
- 한국천문연구원 측에서 수기로 입력한 데이터(대략 앞으로 1년치)만 노출되므로, 무한정으로 받을 순 없습니다.

## Installation

```console
$ npm install holidays-kr --save
```


## Usage

```js
const holidays = require('holidays-kr');

holidays.serviceKey = 'YOUR_API_KEY';

holidays.getHolidays({
    year : 2018,        // 수집 시작 연도
    month : 11,         // 수집 시작 월
    monthCount : 10     // 수집 월 갯수
}).then(list => {
    console.log(list);  // 2018.11 ~ 2019.8 데이터
});
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/holidays-kr.svg
[npm-url]: https://npmjs.org/package/holidays-kr
[downloads-image]: https://img.shields.io/npm/dm/holidays-kr.svg
[downloads-url]: https://npmjs.org/package/holidays-kr
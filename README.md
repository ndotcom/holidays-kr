# holidays-kr

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  ![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)


## Description

- [공공데이터 포털 특일정보](https://www.data.go.kr/dataset/15012690/openapi.do) 데이터 기반으로 한국 공휴일 데이터 제공
- 실제 휴일데이터를 받을 수 있습니다.
  - 선거일, 대체공휴일 같은 수기입력이 필요한 데이터도 전부 이용가능 
- API가 요청당 한달치 데이터만 주는 것을 원하는 범위만큼 한번에 긁을 수 있도록 하였습니다.
- 한국천문연구원 측에서 수기로 입력한 데이터(대략 앞으로 1년치)만 노출되므로, 무한정 기간의 데이터를 받을 순 없습니다.

## Installation

```console
$ npm install holidays-kr
```
혹은
```console
$ yarn add holidays-kr
```


## Usage
```javascript
import HolidaysKr from 'holidays-kr';

HolidaysKr.serviceKey = 'your-service-key'; // 디코딩된 서비스키를 사용해야 합니다.

const holidays = await HolidaysKr.getHolidays({
  year: 2023,   // 수집 시작 연도
  month: 5,     // 수집 시작 월
  monthCount: 3 // 수집 월 갯수
});

console.log(holidays);   // 2018.11 ~ 2019.8 데이터
```

## 타입과 파라미터

`getHolidays`는 다음과 같은 옵션을 받습니다.

| 옵션 | 설명 |
|------|-----|
| year | 가져오려는 공휴일의 년도 |
| month | 가져오려는 공휴일의 월 |
| monthCount | month로부터 몇 개월치 공휴일을 가져올지 (기본값은 1) |

반환 값은 다음과 같은 속성을 가진 객체의 배열입니다.

| 속성 | 설명 |
|------|-----|
| name | 공휴일의 이름 |
| year | 공휴일의 년도 |
| month | 공휴일의 월 |
| day | 공휴일의 일 |
| dateStr | 'YYYY-MM-DD' 형식의 날짜 문자열 |

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/holidays-kr.svg
[npm-url]: https://npmjs.org/package/holidays-kr
[downloads-image]: https://img.shields.io/npm/dm/holidays-kr.svg
[downloads-url]: https://npmjs.org/package/holidays-kr
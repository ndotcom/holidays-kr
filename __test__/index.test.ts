import axios from "axios";
import { getHolidaysByMonthCount, setServiceKey } from "../src";

jest.mock("axios");

describe("getHolidaysByMonthCount", () => {
  beforeEach(() => {
    setServiceKey("testServiceKey");
  });

  it("returns correct holiday data", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: `
        <response>
          <header>
            <resultCode>00</resultCode>
            <resultMsg>NORMAL SERVICE.</resultMsg>
          </header>
          <body>
            <items>
              <item>
                <dateKind>01</dateKind>
                <dateName>추석</dateName>
                <isHoliday>Y</isHoliday>
                <locdate>20150926</locdate>
                <seq>1</seq>
              </item>
              <item>
                <dateKind>01</dateKind>
                <dateName>추석</dateName>
                <isHoliday>Y</isHoliday>
                <locdate>20150927</locdate>
                <seq>1</seq>
              </item>
              <item>
                <dateKind>01</dateKind>
                <dateName>추석</dateName>
                <isHoliday>Y</isHoliday>
                <locdate>20150928</locdate>
                <seq>1</seq>
              </item>
              <item>
                <dateKind>01</dateKind>
                <dateName>대체공휴일</dateName>
                <isHoliday>Y</isHoliday>
                <locdate>20150929</locdate>
                <seq>1</seq>
              </item>
            </items>
            <numOfRows>10</numOfRows>
            <pageNo>1</pageNo>
            <totalCount>4</totalCount>
          </body>
        </response>
      `,
    });

    const holidays = await getHolidaysByMonthCount(2015, 9);

    expect(holidays).toEqual([
      { name: "추석", year: 2015, month: 9, day: 26, dateStr: "2015-09-26" },
      { name: "추석", year: 2015, month: 9, day: 27, dateStr: "2015-09-27" },
      { name: "추석", year: 2015, month: 9, day: 28, dateStr: "2015-09-28" },
      {
        name: "대체공휴일",
        year: 2015,
        month: 9,
        day: 29,
        dateStr: "2015-09-29",
      },
    ]);
  });
});

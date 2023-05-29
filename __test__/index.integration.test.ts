import axios from "axios";
import { getHolidaysByMonthCount, setServiceKey } from "../src";

import dotenv from "dotenv";

describe("getHolidaysByMonthCount integration test", () => {
  beforeAll(() => {
    dotenv.config();
    setServiceKey(process.env.SERVICE_KEY || "");
  });

  it("returns correct holiday data", async () => {
    const holidays = await getHolidaysByMonthCount(2015, 9, 2);

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
      {
        dateStr: "2015-10-03",
        day: 3,
        month: 10,
        name: "개천절",
        year: 2015,
      },
      {
        dateStr: "2015-10-09",
        day: 9,
        month: 10,
        name: "한글날",
        year: 2015,
      },
    ]);
  });
});

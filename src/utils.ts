import { HolidayItem, ResponseItem } from "./types";

export const zerofill = (number: number, digit: number): string => {
  return ("00000000" + number).slice(-digit);
};

export const addDay = (
  { isHoliday, locdate, dateName }: ResponseItem,
  holidays: HolidayItem[]
): void => {
  if (isHoliday !== "Y") return;

  const locDateStr = `${locdate}`;
  const year = parseInt(locDateStr.substring(0, 4));
  const month = parseInt(locDateStr.substring(4, 6));
  const day = parseInt(locDateStr.substring(6, 8));
  const dateStr = [year, zerofill(month, 2), zerofill(day, 2)].join("-");

  holidays.push({
    name: dateName,
    year,
    month,
    day,
    dateStr,
  });
};

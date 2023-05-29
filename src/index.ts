import {HolidayItem} from "./types";
import {setServiceKey} from "./config";
import {getHolidaysByMonthCount} from "./getHolidays";

export * from './config';
export * from './getHolidays';
export * from './types';
export * from './utils';

export default {
    set serviceKey(val: string) {
        setServiceKey(val);
    },
    getHolidays : function(options: {year: number, month: number, monthCount?: number}): Promise<HolidayItem[]> {
        return getHolidaysByMonthCount(options.year, options.month, options.monthCount);
    }
};
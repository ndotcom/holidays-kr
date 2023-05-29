export interface Config {
  serviceKey: string;
}

export interface HolidayItem {
  name: string;
  year: number;
  month: number;
  day: number;
  dateStr: string;
}

export interface ResponseItem {
  dateKind: number;
  dateName: string;
  isHoliday: "Y" | "N";
  locdate: number;
  seq: number;
}

export interface ResponseData {
  response: {
    header: {
      resultCode: "00" | string;
      resultMsg: "NORMAL SERVICE." | string;
    };
    body: {
      numOfRows: number;
      pageNo: number;
    } & (
      | {
          totalCount: 1;
          items: { item: ResponseItem };
        }
      | {
          totalCount: number;
          items: { item: ResponseItem[] };
        }
    );
  };
}

import axios from "axios";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import { config, ENDPOINT } from "./config";
import { zerofill, addDay } from "./utils";
import { HolidayItem, ResponseData } from "./types";

const getHolidaysByMonth = async (
  year: number,
  month: number
): Promise<HolidayItem[]> => {
  const { data } = await axios.get(ENDPOINT, {
    params: {
      solYear: year,
      solMonth: zerofill(month, 2),
      ServiceKey: config.serviceKey,
    },
  });

  if (!XMLValidator.validate(data)) {
    throw new Error("XML 파싱에 실패앴습니다.");
  }

  const parser = new XMLParser();
  const parsedXml = parser.parse(data);

  if (
    parsedXml.OpenAPI_ServiceResponse &&
    parsedXml.OpenAPI_ServiceResponse.cmmMsgHeader
  ) {
    const header = parsedXml.OpenAPI_ServiceResponse.cmmMsgHeader;

    throw new Error(
      header.returnAuthMsg || header.errMsg || header.returnReasonCode
    );
  }

  if (!data.response?.body?.items?.item) {
    throw new Error("응답받은 포멧이 정상적이지 않습니다.");
  }

  const responseData: ResponseData = data;

  const {
    items: { item },
  } = responseData.response.body;
  const holidays: HolidayItem[] = [];
  const itemList = Array.isArray(item) ? item : [item];

  itemList.forEach((item) => {
    addDay(item, holidays);
  });

  return holidays;
};

export const getHolidaysByMonthCount = async (
  year: number,
  month: number,
  monthCount: number = 1
): Promise<HolidayItem[]> => {
  const promiseList = [];

  if (monthCount > 13) {
    throw Error(
      "최대 12개월을 넘을 수 없습니다. 어차피 실제 입력된 데이터도 1년을 넘지 않습니다."
    );
  }

  for (let i = 0; i < monthCount; i++) {
    const targetYear = year + Math.floor((month + i - 1) / 12);
    const targetMonth = (month + i) % 12 || 12;

    // 한번에 빨리 요청하면 막히기 때문에 100ms 간격으로 요청
    promiseList.push(
      new Promise<HolidayItem[]>((resolve, reject) => {
        setTimeout(() => {
          getHolidaysByMonth(targetYear, targetMonth)
            .then((r) => resolve(r))
            .catch((r) => reject(r));
        }, 100 * Math.max(i - 10, 0));
      })
    );
  }

  const result = await Promise.all(promiseList);
  return result.flat();
};

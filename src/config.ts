import { Config } from "./types";

export const config: Config = {
  serviceKey: "",
};

export const setServiceKey = (val: string) => {
  config.serviceKey = val;
};

export const ENDPOINT =
  "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";

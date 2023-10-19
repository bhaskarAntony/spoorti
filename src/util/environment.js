import envDev from "../env.dev.json";
import envProd from "../env.prod.json";
import envUat from "../env.uat.json";
import envStage from "../env.stage.json";

const config = process.env.REACT_APP_ENV;

let envConfig;

switch (config) {
  case "production":
    envConfig = envProd;
    break;
  case "uat":
    envConfig = envUat;
    break;
  case "stage":
    envConfig = envStage;
    break;
  default:
    envConfig = envDev;
}

export const get = (params) => {
  return envConfig[params];
};

export const host = () => {
  return get("HOST");
};

export const baseApiServer = (params) => {
  return get("API_SERVER")[params];
};

export const getRecaptchaKey = () => {
  return get("RECAPTCHA_SITE_KEY");
};


import * as stateService from "./services/stateService";
import * as districtService from "./services/districtService";
import * as blockService from "./services/blockService";
import * as villageService from "./services/villageService";
import * as cityService from "./services/cityService";
import { wrapService } from "./utils/wrapService";

export const services = {
  ...wrapService(stateService),
  ...wrapService(districtService),
  ...wrapService(blockService),
  ...wrapService(villageService),
  ...wrapService(cityService),
};

// (async () => {
//   const states = await services.getBlockById("MHD01B01");
//   console.log(states);
// })();

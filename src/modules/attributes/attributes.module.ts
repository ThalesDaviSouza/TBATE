import { AttributeService } from "./Domain/services/attributesService.js";
import { AttributeUtilsService } from "./Infra/services/attributesUtilsService.js";

function buildAttributesModule() {
  const attributeUtilsService = new AttributeUtilsService();
  const attributeService = new AttributeService();

  return {
    attributeUtilsService,
    attributeService
  };
}

export const attributesModule = buildAttributesModule();
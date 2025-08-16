import { AttributeService } from "./Domain/services/attributesService.js";
import { AttributeUtilsService } from "./Infra/services/attributesUtilsService.js";

const attributeUtilsService = new AttributeUtilsService();
const attributeService = new AttributeService();

export function getAttributeUtilsService(){
  return attributeUtilsService;
}

export function getAttributeService(){
  return attributeService;
}
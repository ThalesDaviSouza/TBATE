import { AbstractAttributeSheetBuilder } from "../Builders/AbstractAttributeSheetBuilder.js";

export function buildAttributeSheet(
  attributeSheetBuilder: AbstractAttributeSheetBuilder,
  sheetId: string,
  attributeId: string
) {
  attributeSheetBuilder.addSheetId(sheetId);
  attributeSheetBuilder.addAttributeId(attributeId);
  attributeSheetBuilder.addValue(0);

  return attributeSheetBuilder.buildAttributeSheet();
}

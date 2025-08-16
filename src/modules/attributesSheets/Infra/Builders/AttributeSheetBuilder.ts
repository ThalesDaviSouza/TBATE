import { AbstractAttributeSheetBuilder } from "./AbstractAttributeSheetBuilder.js";

export class AttributeSheetBuilder extends AbstractAttributeSheetBuilder {
  addSheetId(sheetId: string): void {
    this.sheetAttribute.sheetId = sheetId;
  }
  
  addAttributeId(attributeId: string): void {
    this.sheetAttribute.attributeId = attributeId;
  }
  
  addValue(value: number): void {
    this.sheetAttribute.value = value;
    this.sheetAttribute.currentValue = value;
  }
}
import { AttributeSheetCreateDto } from "../../Application/dtos/attributeSheetCreateDto.js";

export abstract class AbstractAttributeSheetBuilder {
  protected sheetAttribute: AttributeSheetCreateDto = {};

  abstract addSheetId(sheetId: string): void;
  abstract addAttributeId(attributeId: string): void;
  abstract addValue(value: number): void;

  buildAttributeSheet(): AttributeSheetCreateDto{
    return this.sheetAttribute;
  }
}
import { AbstractSheetBuilder } from "../Builders/AbstractSheetBuilder.js";

export function buildSheet(
  sheetBuilder: AbstractSheetBuilder,
  userId: string,
  name: string
) {

  sheetBuilder.addUserId(userId);
  sheetBuilder.addName(name);
  sheetBuilder.addDescription('');
  sheetBuilder.addRace('');
  sheetBuilder.addMana(0);
  sheetBuilder.addHealth(0);

  return sheetBuilder.buildSheet();
}
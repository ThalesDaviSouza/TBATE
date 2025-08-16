import { AbstractSheetBuilder } from "./AbstractSheetBuilder.js";

export class SheetBuilder extends AbstractSheetBuilder{
  addName(name: string): void {
    this.sheet.name = name;
  }

  addRace(race: string): void {
    this.sheet.race = race;
  }

  addDescription(description: string): void {
    this.sheet.description = description;
  }

  addUserId(userId: string): void {
    this.sheet.userId = userId;
  }

  addMana(mana: number): void {
    this.sheet.mana = mana;
    this.sheet.maxMana = mana;
  }

  addHealth(health: number): void {
    this.sheet.health = health;
    this.sheet.maxHealth = health;
  }

}
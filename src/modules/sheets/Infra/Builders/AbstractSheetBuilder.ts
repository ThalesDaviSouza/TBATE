import { createSheetDto } from "../../Application/dtos/createSheetDto.js";

export abstract class AbstractSheetBuilder {
  protected sheet: createSheetDto = {};

  abstract addName(name: string) : void;
  abstract addRace(race: string) : void;
  abstract addDescription(description: string) : void;
  abstract addUserId(userId: string) : void;
  abstract addMana(mana: number) : void;
  abstract addHealth(health: number) : void;

  buildSheet(): createSheetDto{
    return this.sheet;
  }

  // TODO: implementar o elements e o attributes para o builder
}
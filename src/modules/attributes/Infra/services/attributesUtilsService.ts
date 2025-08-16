import { AttributeType } from "@prisma/client";

export class AttributeUtilsService {
   getAttributeNameByType(type: AttributeType) {
    if(type == AttributeType.Charisma){
      return 'Charisma';
    }
    if(type == AttributeType.Dexterity){
      return 'Dexterity';
    }
    if(type == AttributeType.Impetus){
      return 'Impetus';
    }
    if(type == AttributeType.Intellect){
      return 'Intellect';
    }
    if(type == AttributeType.Strength){
      return 'Strength';
    }
    if(type == AttributeType.Vigor){
      return 'Vigor';
    }
    if(type == AttributeType.Talent){
      return 'Talent';
    }

    throw new Error("Tipo de atributo não encontrado");
  }
}
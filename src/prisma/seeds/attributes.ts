import { PrismaClient } from "@prisma/client"

// TODO: mover para o mdóulo correto
const attributes = [
  "Charisma",
  "Dexterity",
  "Intellect",
  "Impetus",
  "Strength",
  "Talent",
  "Vigor",
]

export async function seedAttributes(prisma: PrismaClient){
  for(let attribute of attributes){
    await prisma.attribute.upsert({
      where: {
        name: attribute
      },
      update: {},
      create: {
        name: attribute
      }
    })
  }
}

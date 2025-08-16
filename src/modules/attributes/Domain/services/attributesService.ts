import { prisma } from "../../../../prisma/index.js";

export class AttributeService {
  async getAll() {
    const attributes = await prisma.attribute.findMany();

    return attributes;
  }

  async getByName(name: string) {
    const attribute = await prisma.attribute.findUnique({
      where: {
        name: name
      }
    });

    return attribute;
  }
}
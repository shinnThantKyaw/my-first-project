import { prisma } from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { it } from "node:test";

export interface Menu {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  let menus = await prisma.menus.findMany();

  if (method === "GET") {
    res.json(menus);
  } else if (method === "POST") {
    const menu: Menu = JSON.parse(req.body);
    await prisma.menus.create({
      data: {
        name: menu.name,
        price: menu.price,
        isAvailable: menu.isAvailable,
      },
    });
    res.end();
  } else if (method === "PUT") {
    const menu: Menu = JSON.parse(req.body);
    menus = menus.map((item) => (item.id === menu.id ? menu : item));
    res.end();
  }
}

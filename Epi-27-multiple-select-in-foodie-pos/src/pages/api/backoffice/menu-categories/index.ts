import { prisma } from "@/libs/prisma";
import { Menus, MenusCategories } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { it } from "node:test";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  let menuCategories: MenusCategories[] =
    await prisma.menusCategories.findMany();

  if (method === "GET") {
    res.json(JSON.stringify(menuCategories));
  } else if (method === "POST") {
    const menuCategory: MenusCategories = JSON.parse(req.body);
    await prisma.menusCategories.create({ data: { name: menuCategory.name } });
    res.end();
  }
}

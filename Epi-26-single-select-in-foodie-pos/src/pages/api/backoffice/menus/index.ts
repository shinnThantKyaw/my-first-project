import { prisma } from "@/libs/prisma";
import { Menus } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { it } from "node:test";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  let menus: Menus[] = await prisma.menus.findMany();

  if (method === "GET") {
    res.json(JSON.stringify(menus));
  } else if (method === "POST") {
    const menu = JSON.parse(req.body);
    const menuCategoryId = menu.menuCategoryId;

    const addedMenu = await prisma.menus.create({
      data: {
        name: menu.name,
        price: menu.price,
        isAvailable: menu.isAvailable,
      },
    });
    await prisma.menusCategoriesAndMenus.create({
      data: { menuId: addedMenu.id, menuCategoryIds: menuCategoryId },
    });
    res.end();
  } else if (method === "PUT") {
    const menu = JSON.parse(req.body);
    const menuCategoryId = menu.menuCategoryId;

    await prisma.menus.update({
      data: {
        name: menu.name,
        price: menu.price,
        isAvailable: menu.isAvailable,
      },
      where: { id: menu.id },
    });

    // menu ကို menu category မထည့်ဘဲ add မိရင် ဖြေရှင်းဖို့ ဒီကောင်ထည့်ထားတာ
    if (menu.menusCategoriesAndMenus.length === 0) {
      await prisma.menusCategoriesAndMenus.create({
        data: { menuId: menu.id, menuCategoryIds: menuCategoryId },
      });
      res.end();
    }
    const isSameMenuCategoryId =
      menu.menusCategoriesAndMenus[0].menuCategoryIds === menuCategoryId;
    if (!isSameMenuCategoryId) {
      await prisma.menusCategoriesAndMenus.update({
        data: { menuCategoryIds: menuCategoryId },
        where: { id: menu.menusCategoriesAndMenus[0].id },
      });
    }

    res.end();
  }
}

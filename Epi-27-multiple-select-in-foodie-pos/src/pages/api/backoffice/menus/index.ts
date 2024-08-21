import { prisma } from "@/libs/prisma";
import {
  Menus,
  MenusCategories,
  MenusCategoriesAndMenus,
} from "@prisma/client";
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
    const menuCategoryIds: number[] = menu.menuCategoryIds;

    const addedMenu = await prisma.menus.create({
      data: {
        name: menu.name,
        price: menu.price,
        isAvailable: menu.isAvailable,
      },
    });
    /*    [{id:1,menuId:1,menuCategoryIds:1}] */
    const data: any = menuCategoryIds.map((menuCategoryId) => ({
      menuId: addedMenu.id,
      menuCategoryIds: menuCategoryId,
    }));
    await prisma.menusCategoriesAndMenus.createMany({
      data: data,
    });
    res.end();
  } else if (method === "PUT") {
    const menu = JSON.parse(req.body);
    const menuCategoryIds: number[] = menu.menuCategoryIds;

    await prisma.menus.update({
      data: {
        name: menu.name,
        price: menu.price,
        isAvailable: menu.isAvailable,
      },
      where: { id: menu.id },
    });

    const data = menuCategoryIds.map((menuCategoryId) => ({
      menuId: menu.id,
      menuCategoryIds: menuCategoryId,
    }));

    // menu ကို menu category မထည့်ဘဲ add မိရင် ဖြေရှင်းဖို့ ဒီကောင်ထည့်ထားတာ
    if (menu.menusCategoriesAndMenus.length === 0) {
      await prisma.menusCategoriesAndMenus.createMany({
        data: data,
      });
      res.end();
    }

    const previousMenucategoriesAndMenus =
      await prisma.menusCategoriesAndMenus.findMany({
        where: { menuId: menu.id },
      });
    const previousMenuCategoryIds: number[] =
      previousMenucategoriesAndMenus.map((item) => item.menuCategoryIds);

    const updatedMenuCategoryIds: number[] = menu.menuCategoryIds;

    const isSameMenuCategoryId =
      updatedMenuCategoryIds.length === previousMenuCategoryIds.length &&
      updatedMenuCategoryIds.every((updatedMenuCategoryId) =>
        previousMenuCategoryIds.includes(updatedMenuCategoryId)
      );

    console.log("previous is ", previousMenuCategoryIds);
    console.log("updated is ", updatedMenuCategoryIds);
    console.log("boolen is ", isSameMenuCategoryId);

    if (!isSameMenuCategoryId) {
      await prisma.menusCategoriesAndMenus.deleteMany({
        where: { menuId: menu.id },
      });

      await prisma.menusCategoriesAndMenus.createMany({
        data: data,
      });
    }

    /*     const isSameMenuCategoryId =
      menu.menusCategoriesAndMenus[0].menuCategoryIds === menuCategoryId;
    if (!isSameMenuCategoryId) {
      await prisma.menusCategoriesAndMenus.update({
        data: { menuCategoryIds: menuCategoryId },
        where: { id: menu.menusCategoriesAndMenus[0].id },
      });
    }
 */
    res.end();
  }
}

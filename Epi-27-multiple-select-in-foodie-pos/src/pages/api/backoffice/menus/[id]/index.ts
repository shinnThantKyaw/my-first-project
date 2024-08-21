import { Menu } from "@mui/material";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export default async function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const menuId = Number(req.query.id);
  const menuToBeUpdatedOrDeleted = await prisma.menus.findFirst({
    where: { id: menuId },
    include: { menusCategoriesAndMenus: true },
  });

  if (method === "GET") {
    res.json(JSON.stringify(menuToBeUpdatedOrDeleted));
  } else if (method === "DELETE") {
    await prisma.menusCategoriesAndMenus.deleteMany({
      where: { menuId: menuId },
    });
    await prisma.menus.delete({ where: { id: menuId } });
    res.end();
  }
  res.end();
}

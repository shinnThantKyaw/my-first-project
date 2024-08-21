import { Menu } from "@mui/material";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { menus } from "..";

export default function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    const id = Number(req.query.id);
    const menuToBeUpdated = menus.find((item) => item.id === id);
    console.log(menuToBeUpdated?.isAvailable);
    res.json(JSON.stringify(menuToBeUpdated));
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    menus.splice(id - 1, 1);
    console.log(menus);
  }
  res.end();
}

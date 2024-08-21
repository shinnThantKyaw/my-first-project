import { NextApiRequest, NextApiResponse } from "next";

export interface Menu {
  id: number;
  price: string;
  isAvailable: string;
}
const menus: Menu[] = [];
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "GET") {
    res.json(menus);
  } else if (method === "POST") {
  }
}

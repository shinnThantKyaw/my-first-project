import { NextApiRequest, NextApiResponse } from "next";
import { it } from "node:test";

export interface Menu {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;
}
export let menus: Menu[] = [
  { id: 1, name: "Shan Khout Swell", price: 1000, isAvailable: true },
  { id: 2, name: "Khout Swell Kyaw", price: 1000, isAvailable: true },
  {
    id: 3,
    name: "Malar Khout Swell Kyaw",
    price: 1000,
    isAvailable: true,
  },
  {
    id: 4,
    name: "Khout Swell Tote",
    price: 1000,
    isAvailable: true,
  },
];
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "GET") {
    menus.map((menu, index) => (menu.id = index + 1));
    res.json(menus);
  } else if (method === "POST") {
    const menu: Menu = JSON.parse(req.body);
    menus.push(menu);
    res.end();
  } else if (method === "PUT") {
    const menu: Menu = JSON.parse(req.body);
    menus = menus.map((item) => (item.id === menu.id ? menu : item));
    res.end();
  }
}

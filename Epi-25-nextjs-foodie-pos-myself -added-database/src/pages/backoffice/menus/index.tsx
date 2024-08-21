import BackOfficeLayout from "@/components/backOfficeLayouts";
import SideBar from "@/components/sideBar";
import TopBar from "@/components/topBar";
import { Menu } from "@/pages/api/backoffice/menus";
import { Box, Button } from "@mui/material";
import next from "next";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import config from "../../../config";
import Link from "next/link";

export default function Menus() {
  useEffect(() => {
    getTheMenus();
  }, []);
  const router = useRouter();

  const [menus, setMenus] = useState<Menu[]>();
  const getTheMenus = async () => {
    console.log("get the menus");

    const response = await fetch(`${config.backofficeApiUrl}/menus`);
    const menus: Menu[] = await response.json();
    setMenus(menus);
  };

  const handelDelete = async (menu: Menu) => {
    await fetch(`${config.backofficeApiUrl}/menus/${menu.id}`, {
      method: "DELETE",
    });

    getTheMenus();
  };
  if (!menus) {
    return (
      <Box>
        <h1>hello</h1>
      </Box>
    );
  }

  if (menus.length === 0) {
    return (
      <BackOfficeLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "20px",
            paddingTop: "0px",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              router.push("/backoffice/addingMenus");
            }}
          >
            Create New
          </Button>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "auto",
            mt: "20px",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              backgroundColor: "#fb8500",
              color: "#023047",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            There is no menu yet
          </h1>
        </Box>
      </BackOfficeLayout>
    );
  }

  return (
    <BackOfficeLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px",
          paddingTop: "0px",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            router.push("/backoffice/addingMenus");
          }}
        >
          Create New
        </Button>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          mt: "20px",
          padding: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {menus.map((menu) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mr: "8px",
                mt: "10px",
              }}
              key={menu.id}
            >
              <Link href={`/backoffice/updatingMenu/${menu.id}`}>
                <Box
                  sx={{
                    backgroundColor: "#fb8500",
                    color: "#023047",
                    width: "170px",
                    height: "170px",
                    padding: "15px",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <h3 style={{ padding: "0", margin: "0" }}>{menu.name}</h3>
                  <span>{menu.price}</span>
                  <span>
                    {menu.isAvailable ? "Available" : "Not Available"}
                  </span>
                </Box>
              </Link>
              <Button
                variant="contained"
                sx={{ mt: "7px" }}
                onClick={() => {
                  handelDelete(menu);
                }}
              >
                Delete
              </Button>
            </Box>
          );
        })}
      </Box>
    </BackOfficeLayout>
  );
}

import BackOfficeLayout from "@/components/backOfficeLayouts";
import SideBar from "@/components/sideBar";
import TopBar from "@/components/topBar";
import { Box, Button } from "@mui/material";
import next from "next";
import { Router, useRouter } from "next/router";
import { config } from "process";

export default function Menus() {
  const router = useRouter();

  const getTheMenus = async () => {
    const response = await fetch(`${config}menus`);
    const menus = response.json();
  };
  return (
    <BackOfficeLayout>
      <Box
        sx={{
          width: "80vw",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <h1>Menus Page</h1>
        <Button
          variant="contained"
          onClick={() => {
            router.push("/backoffice/addingMenus");
          }}
        >
          Create New
        </Button>
      </Box>
    </BackOfficeLayout>
  );
}

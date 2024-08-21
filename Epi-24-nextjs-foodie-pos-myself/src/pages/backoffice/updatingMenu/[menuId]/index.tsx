import BackOfficeLayout from "@/components/backOfficeLayouts";
import config from "@/config";
import { Menu } from "@/pages/api/backoffice/menus";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UpdatingMenu() {
  useEffect(() => {
    getMenuById();
  }, []);

  const param = useParams();
  const { menuId } = param;
  const router = useRouter();
  const [menu, setMenu] = useState<Menu>();

  const getMenuById = async () => {
    const response = await fetch(`${config.backofficeApiUrl}/menus/${menuId}`);
    const menuJsonStr = await response.json();
    const menu = JSON.parse(menuJsonStr);
    setMenu(menu);
    console.log(menu.isAvailable);
  };
  const handleUpdatingMenu = async () => {
    await fetch(`${config.backofficeApiUrl}/menus`, {
      method: "PUT",
      body: JSON.stringify(menu),
    });
    router.push("/backoffice/menus");
  };

  if (!menu) {
    return;
  }

  return (
    <Box
      sx={{
        bgcolor: "#023047",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "#219ebc",
          width: "400px",
          height: "400px",
          borderRadius: "10px",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ bgcolor: "white", width: "100%", borderRadius: "8px" }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Name"
            sx={{ width: "100%" }}
            value={menu.name}
            onChange={(e) => {
              setMenu({ ...menu, name: e.target.value });
            }}
          />
        </Box>
        <Box
          sx={{
            bgcolor: "white",
            my: "20px",
            width: "100%",
            borderRadius: "8px",
          }}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Price"
            type="number"
            sx={{ width: "100%" }}
            value={menu.price === 0 ? "" : menu.price}
            onChange={(e) => {
              console.log(e.target.value);
              setMenu({ ...menu, price: Number(e.target.value) });
            }}
          />
        </Box>
        <Box>
          <FormControlLabel
            control={<Checkbox />}
            label="Is Available"
            sx={{ color: "white" }}
            checked={menu.isAvailable}
            onChange={() => {
              setMenu({ ...menu, isAvailable: !menu.isAvailable });
            }}
          />
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#023047",
            ":hover": { bgcolor: "#8ecae6", color: "#023047" },
            mt: "10px",
          }}
          onClick={handleUpdatingMenu}
        >
          Update Menu
        </Button>
      </Box>
    </Box>
  );
}

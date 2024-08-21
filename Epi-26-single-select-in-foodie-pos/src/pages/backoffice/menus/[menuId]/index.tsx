import BackOfficeLayout from "@/components/backOfficeLayouts";
import SingleSelect from "@/components/singleSelect";
import config from "@/config";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import { Menus, MenusCategories } from "@prisma/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UpdatingMenu() {
  const router = useRouter();
  const menuId = router.query.menuId;
  const [menu, setMenu] = useState<Menus>();
  const [selectedMenuCategoryId, setSelectedMenuCategoryId] =
    useState<number>();
  const [menuCategories, setMenuCategories] = useState<MenusCategories[]>([]);

  useEffect(() => {
    if (menuId) {
      getMenuById();
      getTheMenuCategories();
    }
  }, [menuId]);

  const getTheMenuCategories = async () => {
    const response = await fetch(`${config.backofficeApiUrl}/menu-categories`);
    const dataFromSever = await response.json();
    const menuCategories: MenusCategories[] = JSON.parse(dataFromSever);
    console.log("menu categories is", menuCategories);
    setMenuCategories(menuCategories);
  };

  const getMenuById = async () => {
    const response = await fetch(`${config.backofficeApiUrl}/menus/${menuId}`);
    const menuJsonStr = await response.json();
    const menu = JSON.parse(menuJsonStr);
    setMenu(menu);
    if (menu.menusCategoriesAndMenus.length > 0) {
      const menuCategoryId = menu.menusCategoriesAndMenus[0].menuCategoryIds;
      setSelectedMenuCategoryId(menuCategoryId);
    }
  };

  const handelDelete = async (menu: Menus) => {
    await fetch(`${config.backofficeApiUrl}/menus/${menu.id}`, {
      method: "DELETE",
    });
    router.push("/backoffice/menus");
  };

  const handleUpdatingMenu = async () => {
    await fetch(`${config.backofficeApiUrl}/menus`, {
      method: "PUT",
      body: JSON.stringify({ ...menu, menuCategoryId: selectedMenuCategoryId }),
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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2.5,
          }}
        >
          {" "}
          <h2>Updating Menu</h2>
          <Button
            variant="contained"
            color="error"
            sx={{ mt: "7px" }}
            onClick={() => {
              handelDelete(menu);
            }}
          >
            Delete
          </Button>
        </Box>
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
        <SingleSelect
          title={"Menu Categories"}
          selectedMenuCategoryId={selectedMenuCategoryId}
          setSelectedMenuCategoryId={setSelectedMenuCategoryId}
          items={menuCategories}
        />
        <Box>
          <FormControlLabel
            control={<Checkbox />}
            label="Is Available"
            sx={{ color: "white" }}
            checked={menu.isAvailable ? true : false}
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

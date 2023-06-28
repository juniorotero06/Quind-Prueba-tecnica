/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Assets
import Logo from "../../logo.svg";
import * as Icons from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";

const categories = [
  {
    id: "Prueba Tecnica",
    iconOption: <Icons.School />,
    children: [
      {
        id: "Punto 1",
        active: true,
        link: "/punto-1",
      },
      {
        id: "Punto 2",
        active: true,
        link: "/punto-2",
      },
    ],
  },
  {
    id: "Alquiler de Camaras",
    iconOption: <Icons.School />,
    children: [
      {
        id: "Cameras",
        active: true,
        link: "/cameras",
      },
      {
        id: "Cients",
        active: true,
        link: "/clients",
      },
      {
        id: "Films",
        active: true,
        link: "/films",
      },
      {
        id: "Stores",
        active: true,
        link: "/stores",
      },
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;
  const [visibility, setvisibility] = useState({
    status: false,
    index: null,
  });
  const history = useHistory();

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{
            ...item,
            ...itemCategory,
            fontSize: 22,
            color: "#fff",
            flexFlow: "column",
          }}
        >
          <img
            src={Logo}
            alt="torrens-lg"
            width="60%"
            height="50%"
            style={{ marginBottom: 20 }}
          />
        </ListItem>
        <ListItem
          sx={{ ...item, ...itemCategory }}
          onClick={() => history.push("/")}
        >
          <ListItemIcon>
            <Icons.Home />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        {categories.map(({ id, children, iconOption }, index) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItemButton
              onClick={() =>
                setvisibility({
                  status: !visibility.status,
                  index,
                })
              }
            >
              <ListItem>
                <ListItemIcon sx={{ color: "#fff" }}>{iconOption}</ListItemIcon>
                <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
              </ListItem>
            </ListItemButton>
            {visibility.status &&
              visibility.index === index &&
              children.map(({ id: childId, icon, active, link }) => (
                <ListItem disablePadding key={childId}>
                  <ListItemButton
                    selected={active}
                    sx={item}
                    onClick={() => history.push(link)}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}

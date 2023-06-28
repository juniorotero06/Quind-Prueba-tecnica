import React from "react";

// Assets
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import * as Icons from "@mui/icons-material";

export default function SearchHeader({ setModal, modal, getFn, titleButton }) {
  return (
    <div>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Button
                variant="contained"
                sx={{ mr: 1 }}
                onClick={() => setModal(!modal)}
              >
                {titleButton}
              </Button>

              <Tooltip title="Reload">
                <IconButton onClick={() => getFn()}>
                  <Icons.Refresh color="inherit" sx={{ display: "block" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

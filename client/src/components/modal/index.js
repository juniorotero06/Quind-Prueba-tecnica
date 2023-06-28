import * as React from "react";

// Assets
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "70vh",
  overflow: "auto",
  bgcolor: "background.paper",
  border: "1px solid #FF5000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};
export default function BasicModal({
  title,
  children,
  toggleOverlay,
  visible,
  setFn,
}) {
  return (
    <div>
      <Modal
        open={visible}
        onClose={() => toggleOverlay(setFn, visible)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography
            component="div"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            {children}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

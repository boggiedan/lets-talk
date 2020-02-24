import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const RegisterDialog = ({ onUsernameSubmit }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState("");

  const closeDialog = () => setIsOpen(false);

  const usernameChangeHanlder = event => {
    setUsername(event.target.value);
  };

  const submitUsernameHandler = () => {
    if (username && username.trim()) {
      closeDialog();
      onUsernameSubmit(username);
    }
  };

  return (
    <Dialog open={isOpen} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Register</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Welcome to Let's Talk. Please enter an username to continue.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          fullWidth
          onChange={usernameChangeHanlder}
        />
        <DialogActions>
          <Button variant="outlined" onClick={submitUsernameHandler}>
            Register
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

RegisterDialog.propTypes = {
  onUsernameSubmit: PropTypes.func.isRequired
};

export default RegisterDialog;

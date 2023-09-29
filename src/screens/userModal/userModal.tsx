import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useUserContext } from "../home/homeUserContext";

interface UserModalProps {
  openFilter: any;
  handleAddClose: any;
  user: any;
  onSubmit: any;
}

const UserModal = (props: UserModalProps) => {
  const { addUser, updateUserData } = useUserContext();
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [mobileNoError, setMobileNoError] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
   
    if (props.user) {
      setName(props.user.name);
      setMobileNo(props.user.mobileNo);
    } else {
     
      setName("");
      setMobileNo("");
    }
  }, [props.user]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleMobileNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMobileNo = e.target.value;
    setMobileNo(newMobileNo);
  };



  const handleSubmit = () => {
 
    if (name.trim() === "") {
      // Name is empty
      setNameError("Name is required.");
      setMobileNoError(""); // Clear mobile number error if any
    } else if (!/^\d{10}$/.test(mobileNo)) {
      // Mobile number is invalid
      setMobileNoError("Invalid mobile number. It should be 10 digits.");
      setNameError(""); // Clear name error if any
    } else {
     
      setNameError("");
      setMobileNoError("");

      if (props.user) {
       
        updateUserData(props.user.id, name, mobileNo);
      } else {
       
        addUser(name, mobileNo);
      }
      props.handleAddClose();
    }
  };


  return (
    <Dialog open={props.openFilter} onClose={props.handleAddClose} maxWidth="sm" fullWidth>
      <DialogTitle>{props.user ? "Edit User" : "Add User"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="dense"
          value={name}
          error={Boolean(nameError)}
          helperText={nameError}
          onChange={handleNameChange}
        />
        <TextField
          label="Mobile number"
          variant="outlined"
          fullWidth
          margin="dense"
          value={mobileNo}
          onChange={handleMobileNoChange}
          error={Boolean(mobileNoError)}
          helperText={mobileNoError}
        />
      </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={handleSubmit}>
          {props.user ? "Update" : "Submit"}
        </Button>
        <Button variant="contained" onClick={props.handleAddClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;

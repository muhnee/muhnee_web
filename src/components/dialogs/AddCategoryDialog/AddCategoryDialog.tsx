import React, { FC, useContext, useState } from "react";
import firebase from "firebase";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import AuthenticationContext from "../../../contexts/AuthenticationContext";
import { useNotificationDispatch } from "../../../contexts/NotificationProvider";

import AddCategoryDialogProps from "./types";
import { TransactionTypes } from "../../../types/Transaction";

const AddCategoryDialog: FC<AddCategoryDialogProps> = ({
  open = false,
  onClose = () => {}
}) => {
  const { user } = useContext(AuthenticationContext);
  const dispatchNotifications = useNotificationDispatch();

  const [type, setType] = useState<TransactionTypes>("expense");
  const [name, setName] = useState<string>("");

  const onAddNewCategory = (type: string, newCategory: string) => {
    if (user && user.uid) {
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("categories")
        .doc(type)
        .collection("types")
        .add({
          name: newCategory
        });
      dispatchNotifications({
        type: "@@NOTIFICATION/PUSH",
        notification: {
          message: `Successfully added ${newCategory}!! 🚀`,
          type: "success"
        }
      });
      onClose();
    }
  };

  const formId = "add-category-dialog";
  const isCategoryNameTooLong = name.length > 50;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Category</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id={`${formId}-label`}>Transaction Type</InputLabel>
          <Select
            labelId={`${formId}-label`}
            id={formId}
            value={type}
            onChange={event => {
              if (event.target.value === "expense") {
                setType("expense");
              } else {
                setType("income");
              }
            }}
            fullWidth
          >
            <MenuItem value={"expense"}>Expense</MenuItem>
            <MenuItem value={"income"}>Income</MenuItem>
          </Select>
        </FormControl>
        <TextField
          required
          id="category-name"
          label="Name"
          value={name}
          margin="normal"
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            setName(event.target.value as string);
          }}
          fullWidth
          error={isCategoryNameTooLong}
          helperText={
            isCategoryNameTooLong
              ? `Too many characters (${name.length}/50)`
              : `Enter a name for your category (${name.length}/50)`
          }
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onAddNewCategory(type, name)}
          disabled={!name || isCategoryNameTooLong}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryDialog;

import React, { FC, useState } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  DialogActions
} from "@material-ui/core";

const AddTransactionModal: FC = () => {
  const [open, setOpen] = useState(false);

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outlined" color="primary">
        Add Tranaction
      </Button>
      <Dialog open={open}>
        <DialogTitle>Add new Transaction</DialogTitle>
        <DialogContent>
          <FormControl>
            <InputLabel id="transaction-type-label">Type</InputLabel>
            <Select
              labelId="transaction-type-label"
              id="transaction-type"
              value={type}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setType(event.target.value as string);
              }}
            >
              <MenuItem value={"expense"}>Expense</MenuItem>
              <MenuItem value={"income"}>Income</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            id="amount"
            label="Amount"
            value={amount}
            margin="normal"
            type="number"
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              setAmount(event.target.value as number);
            }}
          />
          <TextField
            required
            id="descriptio n"
            label="Description"
            value={description}
            margin="normal"
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              setDescription(event.target.value as string);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTransactionModal;

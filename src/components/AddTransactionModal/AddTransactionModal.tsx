import React, { FC, useState } from "react";
import moment from "moment";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import MomentUtils from "@date-io/moment";
import useStyles from "./styles";

const AddTransactionModal: FC = () => {
  const [open, setOpen] = useState(false);

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [taxDeductible, setTaxDeductible] = useState(false);
  const [selectedDate, handleDateChange] = useState<MaterialUiPickersDate>(
    moment()
  );

  const classes = useStyles();

  const onClose = () => {
    setOpen(false);
  };

  const handleToggle = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setTaxDeductible(checked);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outlined" color="primary">
        Add Tranaction
      </Button>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Dialog open={open} maxWidth="md" fullWidth>
          <DialogTitle>Add new Transaction</DialogTitle>
          <DialogContent className={classes.dialogContent}>
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
              id="description"
              label="Description"
              value={description}
              margin="normal"
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setDescription(event.target.value as string);
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={taxDeductible}
                  onChange={handleToggle}
                  value="taxDeductible"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  color="primary"
                />
              }
              label="Tax Deductible?"
              className={classes.switch}
            />
            <DateTimePicker
              label="Transaction Date Time"
              inputVariant="outlined"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default AddTransactionModal;

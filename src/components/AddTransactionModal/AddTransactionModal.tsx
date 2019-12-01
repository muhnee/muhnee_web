import React, { FC, useState, useContext } from "react";
import moment from "moment";
import firebase from "firebase";

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
import AuthenticationContext from "../../contexts/AuthenticationContext";

const AddTransactionModal: FC = () => {
  const { user } = useContext(AuthenticationContext);

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [taxDeductible, setTaxDeductible] = useState(false);
  const [selectedDate, handleDateChange] = useState<MaterialUiPickersDate>(
    moment()
  );

  const addData = () => {
    if (user && selectedDate) {
      setIsSubmitting(true);
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("budget")
        .doc(`${selectedDate.year()}-${selectedDate.month()}`)
        .collection("transactions")
        .add({
          type,
          amount: +amount,
          description,
          taxDeductible,
          timestamp: selectedDate.toDate()
        })
        .then(() => {
          setIsSubmitting(false);
          onClose();
        })
        .catch(err => {
          setIsSubmitting(false);
          onClose();
          console.error(err);
        });
    }
  };

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

  if (!user || !user.uid) {
    return <span>An Error Occured</span>;
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outlined" color="primary">
        Add Transaction
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
                disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={taxDeductible}
                  onChange={handleToggle}
                  value="taxDeductible"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  color="primary"
                  disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={addData} disabled={isSubmitting}>
              Add
            </Button>
            <Button onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default AddTransactionModal;

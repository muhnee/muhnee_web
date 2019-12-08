import React, { FC, useState, useContext, useEffect } from "react";
import moment from "moment";
import MomentUtils from "@date-io/moment";
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
import Typography from "@material-ui/core/Typography";

import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { DropzoneArea } from "material-ui-dropzone";

import AuthenticationContext from "../../../contexts/AuthenticationContext";
import CategoriesContext from "../../../contexts/CategoriesContext";
import { useNotificationDispatch } from "../../../contexts/NotificationProvider";

import useStyles from "./styles";

const AddTransactionModal: FC = () => {
  const { user } = useContext(AuthenticationContext);
  const { incomeCategories, expenseCategories } = useContext(CategoriesContext);
  const dispatchNotifications = useNotificationDispatch();

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [taxDeductible, setTaxDeductible] = useState(false);
  const [selectedDate, handleDateChange] = useState<MaterialUiPickersDate>(
    moment()
  );
  const [files, setFiles] = useState<File[]>([]);

  const resetData = () => {
    setType("expense");
    setAmount(0);
    setCategory("");
    setDescription("");
    setTaxDeductible(false);
    handleDateChange(moment());
    setFiles([]);
  };

  useEffect(() => {
    resetData();
  }, [setType, setAmount, setDescription, setTaxDeductible, handleDateChange]);

  const addData = async () => {
    if (user && selectedDate) {
      setIsSubmitting(true);
      let filesMetadata;
      if (files.length > 0) {
        filesMetadata = await uploadFiles();
        console.log(filesMetadata);
      }
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
          timestamp: selectedDate.toDate(),
          category: category,
          receipt: filesMetadata
            ? filesMetadata.metadata.fullPath || null
            : null
        })
        .then(() => {
          setIsSubmitting(false);
          dispatchNotifications({
            type: "@@NOTIFICATION/PUSH",
            notification: {
              message: `Successfully added transaction ${description} - $${amount}!! 🚀`,
              type: "success"
            }
          });
          resetData();
          onClose();
        })
        .catch(err => {
          setIsSubmitting(false);
          onClose();
          console.error(err);
        });
    }
  };

  const uploadFiles = () => {
    if (user && user.uid && files) {
      return firebase
        .storage()
        .ref()
        .child(
          `/users/${user.uid}/uploads/${moment().toISOString()}-${
            files[0].name
          }`
        )
        .put(files[0])
        .then(snapshot => {
          console.log(snapshot);
          return snapshot;
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

  if (files) {
    console.log(files);
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
            <FormControl>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={category}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  setCategory(event.target.value as string);
                }}
                disabled={isSubmitting}
              >
                {type === "expense"
                  ? expenseCategories &&
                    expenseCategories.size > 0 &&
                    expenseCategories.docs.map(category => {
                      let categoryData: any = category.data();
                      return (
                        <MenuItem value={category.id}>
                          {categoryData.name}
                        </MenuItem>
                      );
                    })
                  : incomeCategories &&
                    incomeCategories.size > 0 &&
                    incomeCategories.docs.map(category => {
                      let categoryData: any = category.data();
                      return (
                        <MenuItem value={category.id}>
                          {categoryData.name}
                        </MenuItem>
                      );
                    })}
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
            <div>
              <Typography>Receipt Photo</Typography>
              <DropzoneArea
                onChange={files => setFiles(files)}
                filesLimit={1}
                acceptedFiles={["image/*", "application/pdf"]}
                dropzoneText="Drag and Drop"
              />
            </div>
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

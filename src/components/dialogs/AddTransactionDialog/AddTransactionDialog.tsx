import React, { FC, useState, useContext, useEffect } from "react";
import firebase from "firebase";
import clsx from "clsx";
import moment from "moment";
import MomentUtils from "@date-io/moment";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormGroup";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { DropzoneArea } from "material-ui-dropzone";

import AuthenticationContext from "../../../contexts/AuthenticationContext";
import CategoriesContext from "../../../contexts/CategoriesContext";
import { useNotificationDispatch } from "../../../contexts/NotificationProvider";

import useStyles from "./styles";
import { FILE_UPLOAD } from "../../../config/settings";
import { colors } from "../../../config/colors";
import AddTransactionDialogProps from "./types";
import { TransactionTypes, RecurringDays } from "../../../types/Transaction";
import { useFirestore, useStorage } from "../../../firebase/firebase";

const AddTransactionDialog: FC<AddTransactionDialogProps> = ({
  open = false,
  onClose = () => {}
}) => {
  const { user } = useContext(AuthenticationContext);
  const { incomeCategories, expenseCategories } = useContext(CategoriesContext);
  const dispatchNotifications = useNotificationDispatch();
  const firestore = useFirestore();
  const storage = useStorage();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [type, setType] = useState<TransactionTypes>("expense");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [taxDeductible, setTaxDeductible] = useState(false);
  const [selectedDate, handleDateChange] = useState<MaterialUiPickersDate>(
    moment()
  );
  const [recurringDays, setRecurringDays] = useState<RecurringDays>(0);
  const [files, setFiles] = useState<File[]>([]);

  const resetData = () => {
    setType("expense");
    setAmount(0);
    setCategory("");
    setDescription("");
    setTaxDeductible(false);
    handleDateChange(moment());
    setFiles([]);
    setRecurringDays(0);
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
      }

      const transaction: any = {
        type,
        amount: +amount,
        description,
        taxDeductible,
        timestamp: firebase.firestore.Timestamp.fromDate(selectedDate.toDate()),
        category: category,
        receipt: filesMetadata ? filesMetadata.metadata.fullPath || null : null,
        recurringDays: recurringDays || 0
      };

      firestore
        .collection("users")
        .doc(user.uid)
        .collection("budget")
        .doc(`${selectedDate.year()}-${selectedDate.month() + 1}`)
        .collection("transactions")
        .add(transaction)
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
      return storage
        .ref()
        .child(
          `/users/${user.uid}/uploads/${moment().toISOString()}-${
            files[0].name
          }`
        )
        .put(files[0])
        .then(snapshot => {
          return snapshot;
        });
    }
  };

  const classes = useStyles();

  const handleToggle = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setTaxDeductible(checked);
  };

  const handleTransactionTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if ((event.target as HTMLInputElement).value === "expense") {
      setType("expense");
    } else {
      setType("income");
    }
  };

  if (!user || !user.uid) {
    return null;
  }

  /**
   * Determines whether or not is the form filled so that we can submit
   */
  const isFormFilled = type && amount && description && selectedDate;

  const categoryData =
    type === "expense" ? expenseCategories : incomeCategories;

  const isDescriptionTooLong = description.length > 50;
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Dialog open={open} maxWidth="md" fullWidth onClose={onClose}>
        <DialogTitle>Add a new transaction</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <div className={classes.rowCenter}>
            <InputBase
              id="amount"
              value={amount}
              type="number"
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setAmount(event.target.value as number);
              }}
              disabled={isSubmitting}
              required
              startAdornment={
                <InputAdornment position="start" style={{ fontSize: "2rem" }}>
                  $
                </InputAdornment>
              }
              style={{
                fontSize: "3rem",
                textAlign: "center"
              }}
            />
            {type === "expense" && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={taxDeductible}
                      onChange={handleToggle}
                      value="taxDeductible"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                      color="primary"
                      disabled={isSubmitting}
                    />
                  }
                  label={"Tax Deductible"}
                  className={classes.switch}
                />
              </div>
            )}
          </div>
          <div className={classes.rowCenter}>
            <FormGroup>
              <FormLabel>Type</FormLabel>
              <RadioGroup value={type} onChange={handleTransactionTypeChange}>
                <FormControlLabel
                  value="income"
                  control={<Radio />}
                  label="Income"
                />
                <FormControlLabel
                  value="expense"
                  control={<Radio />}
                  label="Expense"
                />
              </RadioGroup>
            </FormGroup>
          </div>
          <InputLabel id="category-label">Category</InputLabel>
          <div className={clsx(classes.rowCenter, classes.rowSelect)}>
            {categoryData &&
              categoryData.size >= 0 &&
              categoryData.docs.map((cat, i) => {
                let data: any = cat.data();
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setCategory(cat.id);
                    }}
                    style={{
                      backgroundColor:
                        category === cat.id ? colors.button[type] : "#999",
                      color: "white",
                      padding: "0.25rem",
                      borderRadius: "5px",
                      margin: "0.75rem 0.5rem"
                    }}
                  >
                    <Typography variant="body2">{data.name}</Typography>
                  </div>
                );
              })}
          </div>
          <FormControl>
            <InputLabel id="recurring-days-label">Recurring Days</InputLabel>
            <Select
              labelId="recurring-days-label"
              id="recurring-days"
              value={recurringDays}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setRecurringDays(event.target.value as RecurringDays);
              }}
              variant="filled"
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={14}>14</MenuItem>
              <MenuItem value={21}>21</MenuItem>
              <MenuItem value={32}>32</MenuItem>
            </Select>
          </FormControl>
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
            error={isDescriptionTooLong}
            helperText={
              isDescriptionTooLong
                ? `Too many characters (${description.length}/50)`
                : `Enter a description for your transaction (${description.length}/50)`
            }
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
              acceptedFiles={FILE_UPLOAD.ACCEPTED_MIME_TYPES}
              dropzoneText="Drag a file or click to upload"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={addData}
            disabled={!isFormFilled || isSubmitting || isDescriptionTooLong}
            variant="contained"
            className={classes.actionButton}
          >
            Add Transaction
          </Button>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
};

export default AddTransactionDialog;

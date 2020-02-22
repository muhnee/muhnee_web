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
import Divider from "@material-ui/core/Divider";
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

import { Editor } from "@tinymce/tinymce-react";

import DropdownSelect from "./fields/DropdownSelect";

import AuthenticationContext from "../../../contexts/AuthenticationContext";
import CategoriesContext from "../../../contexts/CategoriesContext";
import { useNotificationDispatch } from "../../../contexts/NotificationProvider";

import useStyles from "./styles";
import { FILE_UPLOAD } from "../../../config/settings";
import { colors } from "../../../config/colors";
import AddTransactionDialogProps from "./types";
import {
  Transaction,
  TransactionTypes,
  RecurringDays
} from "../../../types/Transaction";
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
  const [notes, setNotes] = useState("");

  const resetData = () => {
    setType("expense");
    setAmount(0);
    setCategory("");
    setDescription("");
    setTaxDeductible(false);
    handleDateChange(moment());
    setFiles([]);
    setRecurringDays(0);
    setNotes("");
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
        recurringDays: recurringDays || 0,
        notes: notes
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
      <Dialog open={open} maxWidth="lg" fullWidth onClose={onClose}>
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
          <div style={{ display: "flex" }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "0.5rem 0.25rem"
              }}
            >
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
              <DropdownSelect
                label="Category"
                value={category}
                onChange={value => setCategory(value)}
                options={
                  (categoryData &&
                    categoryData.size >= 0 &&
                    categoryData.docs.map(cat => {
                      return { value: cat.id, label: cat.data().name };
                    })) ||
                  []
                }
              />
              <DropdownSelect
                label="Recurring Days"
                value={recurringDays}
                onChange={value => setRecurringDays(value as RecurringDays)}
                options={[
                  { value: 0, label: 0 },
                  { value: 1, label: 1 },
                  { value: 2, label: 2 },
                  { value: 5, label: 5 },
                  { value: 7, label: 7 },
                  { value: 14, label: 14 },
                  { value: 21, label: 21 },
                  { value: 28, label: 28 },
                  { value: 32, label: 32 }
                ]}
              />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "0.5rem 0.25rem"
              }}
            >
              <DateTimePicker
                label="Transaction Date Time"
                inputVariant="outlined"
                value={selectedDate}
                onChange={handleDateChange}
                disabled={isSubmitting}
                style={{ margin: "0.75rem 0" }}
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
                error={isDescriptionTooLong}
                helperText={
                  isDescriptionTooLong
                    ? `Too many characters (${description.length}/50)`
                    : `Enter a description for your transaction (${description.length}/50)`
                }
                style={{ margin: "1rem 0" }}
              />
              <Divider />
              <Typography>Notes</Typography>
              <Editor
                value={notes}
                apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                init={{
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code ",
                    "insertdatetime media table paste code help wordcount"
                  ],
                  toolbar:
                    "formatselect | undo redo | bold italic | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | table | removeformat | help"
                }}
                onEditorChange={(content, editor) => {
                  setNotes(content);
                }}
              />
            </div>
          </div>

          <div style={{ margin: "0.5rem 0" }}>
            <Typography gutterBottom>Receipt</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Max File Size (5mb)
            </Typography>
            <DropzoneArea
              onChange={files => setFiles(files)}
              maxFileSize={5000000}
              filesLimit={1}
              acceptedFiles={FILE_UPLOAD.ACCEPTED_MIME_TYPES}
              dropzoneText="Drag a file or click to upload"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={addData}
            disabled={
              !isFormFilled || isSubmitting || isDescriptionTooLong || !category
            }
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

import React, { FC, useContext, useState, useEffect } from "react";
import moment from "moment";
import firebase from "firebase";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

import { useFirestore, useStorage } from "../../../firebase/firebase";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { DropzoneDialog } from "material-ui-dropzone";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import DeleteIcon from "@material-ui/icons/Delete";

import DeleteTransactionWarningDialog from "../../../components/dialogs/DeleteTransactionWarningDialog";

import LoadingContainer from "../../../containers/LoadingContainer";

import AuthenticationContext from "../../../contexts/AuthenticationContext";

import MomentUtils from "@date-io/moment";

import { red } from "@material-ui/core/colors";
import useStyles from "./styles";

import CategoriesContext from "../../../contexts/CategoriesContext";
import { useNotificationDispatch } from "../../../contexts/NotificationProvider";
import { FILE_UPLOAD } from "../../../config/settings";

import { RecurringDays, TransactionTypes } from "../../../types/Transaction";

const TransactionPage: FC = () => {
  const { user } = useContext(AuthenticationContext);
  const { incomeCategories, expenseCategories } = useContext(CategoriesContext);
  const dispatchNotifications = useNotificationDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [warningDialogOpen, setWarningDialogOpen] = useState(false);
  const [fileUpdateDialogOpen, setFileUpdateDialogOpen] = useState(false);
  const [files, setUpdateFiles] = useState<File[]>([]);

  const [type, setType] = useState<TransactionTypes>("expense");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [taxDeductible, setTaxDeductible] = useState(false);
  const [selectedDate, handleDateChange] = useState<MaterialUiPickersDate>(
    moment()
  );
  const [recieptFilePath, setReceiptFilePath] = useState("");
  const [gsStorageURL, setGSStorageURL] = useState("");
  const [recurringDays, setRecurringDays] = useState<RecurringDays>(0);

  const history = useHistory();
  let { monthId, transactionId } = useParams();
  const firestore = useFirestore();
  const storage = useStorage();
  const classes = useStyles();

  useEffect(() => {
    async function getData() {
      if (user && user.uid) {
        setIsLoading(true);
        const doc = await firestore
          .collection("users")
          .doc(user.uid)
          .collection("budget")
          .doc(monthId)
          .collection("transactions")
          .doc(transactionId)
          .get();
        if (doc.exists) {
          const docData: any = doc.data();
          setType(docData.type);
          setAmount(docData.amount);
          handleDateChange(moment(new Date(docData.timestamp.toDate())));
          setDescription(docData.description || "");
          setTaxDeductible(docData.taxDeductible);
          setCategory(docData.category || "");
          setRecurringDays(docData.recurringDays);
          if (docData.receipt) {
            const firebaseRef = storage.refFromURL(
              `gs://muhnee-app.appspot.com/${docData.receipt}`
            );
            try {
              setGSStorageURL(`gs://muhnee-app.appspot.com/${docData.receipt}`);
              setReceiptFilePath(await firebaseRef.getDownloadURL());
            } catch (e) {
              console.error(e);
              setReceiptFilePath("");
              if (e.code === "storage/object-not-found") {
                dispatchNotifications({
                  type: "@@NOTIFICATION/PUSH",
                  notification: {
                    message: `Cannot find receipt`,
                    type: "error"
                  }
                });
              } else {
                dispatchNotifications({
                  type: "@@NOTIFICATION/PUSH",
                  notification: {
                    message: `an unknown error occurred.`,
                    type: "error"
                  }
                });
              }
            }
          } else {
            setReceiptFilePath("");
            setGSStorageURL("");
          }
        }
        setIsLoading(false);
      }
    }
    getData();
  }, [
    monthId,
    transactionId,
    user,
    setType,
    setAmount,
    handleDateChange,
    setDescription,
    setTaxDeductible,
    setIsLoading,
    setCategory,
    setRecurringDays,
    setReceiptFilePath,
    dispatchNotifications,
    firestore,
    storage
  ]);

  const onDeleteTransaction = async () => {
    if (user) {
      if (gsStorageURL) {
        try {
          await storage.refFromURL(gsStorageURL).delete();
        } catch {}
      }
      await firestore
        .collection("users")
        .doc(user.uid)
        .collection("budget")
        .doc(monthId)
        .collection("transactions")
        .doc(transactionId)
        .delete();
      dispatchNotifications({
        type: "@@NOTIFICATION/PUSH",
        notification: {
          message: `Successfully deleted transaction ${description} - $${amount}!! 🚀`,
          type: "success"
        }
      });
      history.push("/dashboard");
    }
  };

  const handleToggle = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setTaxDeductible(checked);
  };

  const updateTransaction = async () => {
    if (user && selectedDate) {
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
        category,
        receipt: filesMetadata ? filesMetadata.metadata.fullPath || null : null,
        recurringDays: recurringDays
      };

      firestore
        .collection("users")
        .doc(user.uid)
        .collection("budget")
        .doc(monthId)
        .collection("transactions")
        .doc(transactionId)
        .update(transaction)
        .then(() => {
          dispatchNotifications({
            type: "@@NOTIFICATION/PUSH",
            notification: {
              message: `Successfully updated transaction ${description} - $${amount}!! 🚀`,
              type: "warning"
            }
          });
          history.push("/dashboard");
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const uploadFiles = async () => {
    if (user && user.uid && files) {
      if (gsStorageURL) {
        try {
          await storage.refFromURL(gsStorageURL).delete();
        } catch {}
      }
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

  if (!user || !user.uid) {
    return <Redirect to="/" />;
  }

  if (isLoading) {
    return (
      <div className={classes.root}>
        <LoadingContainer loadingMessage="Fetching Transaction Data..." />
      </div>
    );
  }

  const isDescriptionTooLong = description.length > 50;

  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className={classes.root}>
          <div style={{ marginBottom: "1.25rem" }}>
            <Button
              onClick={() => {
                history.goBack();
              }}
            >
              &larr; Go Back
            </Button>
          </div>
          <>
            <div style={{ flex: 1 }}>
              <div className={classes.body}>
                <Card variant="outlined" className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Transaction Type
                    </Typography>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="transaction-type-label">Type</InputLabel>
                      <Select
                        labelId="transaction-type-label"
                        id="transaction-type"
                        value={type}
                        onChange={(
                          event: React.ChangeEvent<{ value: unknown }>
                        ) => {
                          if (event.target.value === "expense") {
                            setType("expense");
                          } else {
                            setType("income");
                          }
                        }}
                      >
                        <MenuItem value={"expense"}>Expense</MenuItem>
                        <MenuItem value={"income"}>Income</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select
                        labelId="category-label"
                        id="category"
                        value={category}
                        onChange={(
                          event: React.ChangeEvent<{ value: unknown }>
                        ) => {
                          setCategory(event.target.value as string);
                        }}
                      >
                        {type === "expense"
                          ? expenseCategories &&
                            expenseCategories.size > 0 &&
                            expenseCategories.docs.map(category => {
                              let categoryData: any = category.data();
                              return (
                                <MenuItem value={category.id} key={category.id}>
                                  {categoryData.name}
                                </MenuItem>
                              );
                            })
                          : incomeCategories &&
                            incomeCategories.size > 0 &&
                            incomeCategories.docs.map(category => {
                              let categoryData: any = category.data();
                              return (
                                <MenuItem value={category.id} key={category.id}>
                                  {categoryData.name}
                                </MenuItem>
                              );
                            })}
                      </Select>
                    </FormControl>
                  </CardContent>
                </Card>
                <Card variant="outlined" className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Transaction Summary
                    </Typography>
                    <TextField
                      required
                      id="description"
                      label="Description"
                      value={description}
                      margin="normal"
                      onChange={(
                        event: React.ChangeEvent<{ value: unknown }>
                      ) => {
                        setDescription(event.target.value as string);
                      }}
                      error={isDescriptionTooLong}
                      helperText={
                        isDescriptionTooLong
                          ? `Too many characters (${description.length}/50)`
                          : `Enter a description for your transaction (${description.length}/50)`
                      }
                    />
                    <div className={classes.transactionAmount}>
                      <TextField
                        required
                        id="amount"
                        label="Amount"
                        value={amount}
                        margin="normal"
                        type="number"
                        onChange={(
                          event: React.ChangeEvent<{ value: unknown }>
                        ) => {
                          setAmount(event.target.value as number);
                        }}
                        style={{ flex: 1 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          )
                        }}
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={taxDeductible}
                              onChange={handleToggle}
                              value="taxDeductible"
                              inputProps={{
                                "aria-label": "is transaction tax deductible"
                              }}
                              color="primary"
                            />
                          }
                          label="Tax Deductible"
                          className={classes.switch}
                        />
                      </div>
                    </div>
                    <DateTimePicker
                      label="Transaction Date Time"
                      inputVariant="outlined"
                      value={selectedDate}
                      onChange={handleDateChange}
                    />
                    <FormControl>
                      <InputLabel id="recurring-days-label">
                        Recurring Days
                      </InputLabel>
                      <Select
                        labelId="recurring-days-label"
                        id="recurring-days"
                        value={recurringDays}
                        onChange={(
                          event: React.ChangeEvent<{ value: unknown }>
                        ) => {
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
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card variant="outlined" style={{ minWidth: 500 }}>
                  <CardContent>
                    <Typography variant="body1">Receipt</Typography>
                    <div className={classes.receipt}>
                      {recieptFilePath && (
                        <Link href={recieptFilePath} target="_blank">
                          Download receipt
                        </Link>
                      )}
                      <Button onClick={() => setFileUpdateDialogOpen(true)}>
                        Update File
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                padding: "0.25rem"
              }}
            >
              <div style={{ flex: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    updateTransaction();
                  }}
                  disabled={isDescriptionTooLong}
                  style={{ color: "#fff" }}
                >
                  Update Transaction
                </Button>
              </div>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setWarningDialogOpen(true);
                }}
                style={{ color: red[500], borderColor: red[500] }}
              >
                <DeleteIcon />
                Delete Transaction
              </Button>
            </div>
          </>
        </div>
        <DeleteTransactionWarningDialog
          open={warningDialogOpen}
          onClose={() => {
            setWarningDialogOpen(false);
          }}
          onDeleteTransaction={() => onDeleteTransaction()}
        />
      </MuiPickersUtilsProvider>
      <DropzoneDialog
        open={fileUpdateDialogOpen}
        acceptedFiles={FILE_UPLOAD.ACCEPTED_MIME_TYPES}
        showPreviews={true}
        filesLimit={1}
        onClose={() => setFileUpdateDialogOpen(false)}
        onSave={(files: File[]) => {
          setUpdateFiles(files);
          setFileUpdateDialogOpen(false);
        }}
      />
    </>
  );
};

export default TransactionPage;

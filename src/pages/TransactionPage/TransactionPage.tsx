import React, { FC, useContext, useState, useEffect } from "react";
import moment from "moment";
import firebase from "firebase";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

import DeleteIcon from "@material-ui/icons/Delete";

import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import DeleteTransactionWarningDialog from "../../components/dialogs/DeleteTransactionWarningDialog";

import LoadingContainer from "../../containers/LoadingContainer";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import useStyles from "./styles";
import { red } from "@material-ui/core/colors";

const TransactionPage: FC = () => {
  const { user } = useContext(AuthenticationContext);

  const [isLoading, setIsLoading] = useState(false);
  const [warningDialogOpen, setWarningDialogOpen] = useState(false);
  const [type, setType] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [taxDeductible, setTaxDeductible] = useState(false);
  const [selectedDate, handleDateChange] = useState<MaterialUiPickersDate>(
    moment()
  );

  const history = useHistory();
  let { monthId, transactionId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    async function getData() {
      if (user && user.uid) {
        setIsLoading(true);
        const doc = await firebase
          .firestore()
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
          setDescription(docData.description);
          setTaxDeductible(docData.taxDeductible);
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
    setIsLoading
  ]);

  const onDeleteTransaction = async () => {
    if (user) {
      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("budget")
        .doc(monthId)
        .collection("transactions")
        .doc(transactionId)
        .delete();
      history.push("/dashboard");
    }
  };

  const handleToggle = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setTaxDeductible(checked);
  };

  const updateTransaction = () => {
    if (user && selectedDate) {
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("budget")
        .doc(monthId)
        .collection("transactions")
        .doc(transactionId)
        .update({
          type,
          amount: +amount,
          description,
          taxDeductible,
          timestamp: selectedDate.toDate()
        })
        .then(() => {
          history.push("/dashboard");
        })
        .catch(err => {
          console.error(err);
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

  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className={classes.root}>
          <>
            <div className={classes.body}>
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
            </div>
            <Divider />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ flex: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    updateTransaction();
                  }}
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
    </>
  );
};

export default TransactionPage;

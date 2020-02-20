import React, { FC, useEffect, useState } from "react";
import moment, { Moment } from "moment";
import MomentUtils from "@date-io/moment";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import CategoryIconAvatar from "../../../components/CategoryIconAvatar";

import { PdfIcon } from "../../../icons/PdfIcon";

import { useFunctions, useStorage } from "../../../firebase/firebase";
import useStyles from "./styles";
import { Reports } from "../../../types/response/Reports";
import { Transaction } from "../../../types/Transaction";
import { FunctionsResponse } from "../../../types";

interface ReceiptTableCellInnerProps {
  gsUrl: string;
}

interface StorageMetadata {
  name: string;
  contentType: "application/pdf" | "image/png" | "image/jpg";
}
const ReceiptTableCellInner: FC<ReceiptTableCellInnerProps> = ({
  gsUrl: gsURL
}) => {
  const storage = useStorage();
  const [url, setUrl] = useState("");
  const [metadata, setMetadata] = useState<StorageMetadata | null>(null);
  useEffect(() => {
    async function getData() {
      const fileRef = storage.ref(gsURL);
      const url: string = await fileRef.getDownloadURL();
      const metadata: StorageMetadata = await fileRef.getMetadata();
      console.log(metadata);
      setMetadata(metadata);
      setUrl(url);
    }
    getData();
  }, [gsURL]);

  if (!metadata) {
    return null;
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
      {metadata.contentType === "application/pdf" && <PdfIcon />}
      <a href={url} style={{ marginLeft: "0.25rem" }}>
        {metadata.name}
      </a>
    </div>
  );
};

const TaxDeductibleReport: FC = () => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState<Moment>(
    moment(`${moment().year() - 1}-07-01`)
  );

  const [taxDeductibleItems, setTaxDeductibleItems] = useState<Transaction[]>(
    []
  );
  const [reportTimestamp, setReportTimestamp] = useState<Moment>(moment());
  const functions = useFunctions();

  //TODO: Move this to hooks
  useEffect(() => {
    async function getData() {
      const getUserTaxDeductibleItems = functions.httpsCallable(
        "getUserTaxDeductibleItems"
      );
      const res: FunctionsResponse<Reports<
        Transaction[]
      >> = await getUserTaxDeductibleItems({
        start: startDate.toISOString()
      });

      setTaxDeductibleItems(res.data.data);
      setReportTimestamp(moment(res.data.timestamp));
    }
    getData();
  }, [startDate]);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className={classes.root}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            <Typography>Tax Deductible Report</Typography>
          </div>
          <DatePicker
            disableFuture
            format="DD MMM YYYY"
            label="Start Date"
            value={startDate}
            onChange={value => {
              setStartDate(value as Moment);
            }}
          />
        </div>
        <div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Receipt</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {taxDeductibleItems.map(transaction => {
                  return (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        {transaction.category.icon && (
                          <CategoryIconAvatar
                            category={transaction.category}
                            type="expense"
                          />
                        )}
                        <Typography style={{ marginLeft: "0.25rem" }}>
                          {transaction.category.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{`$${transaction.amount.toFixed(
                        2
                      )}`}</TableCell>
                      <TableCell>
                        {moment(transaction.timestamp).format(
                          "DD MMMM YYYY hh:mm a"
                        )}
                      </TableCell>
                      <TableCell>
                        {transaction.receipt && (
                          <ReceiptTableCellInner gsUrl={transaction.receipt} />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography
            variant="body2"
            color="textSecondary"
          >{`Report generated on ${reportTimestamp.toLocaleString()}`}</Typography>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default TaxDeductibleReport;

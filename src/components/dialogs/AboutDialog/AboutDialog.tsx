import React, { FC } from "react";
import moment from "moment";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import FooterDialogProps from "./types";

const AboutDialog: FC<FooterDialogProps> = ({
  open = false,
  onClose = () => {}
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <Typography variant="h5" color="inherit" gutterBottom>
          <Link
            href="https://muhneeapp.com"
            target="_blank"
            rel="noreferrer noopener"
            color="inherit"
            style={{
              textDecoration: "underline"
            }}
          >
            Muhnee
          </Link>{" "}
        </Typography>
        <Typography variant="h6" color="textPrimary" gutterBottom>
          Version: v{process.env.REACT_APP_VERSION}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Copyright &copy; Muhnee 2019{" "}
          {moment().year() !== 2019 ? `- ${moment().year()}` : ``} <br />
          Please click{" "}
          <Link
            href="https://muhnee.atlassian.net/servicedesk/customer/portal/2"
            target="_blank"
            rel="noreferrer noopener"
            color="inherit"
            style={{
              textDecoration: "underline"
            }}
          >
            here
          </Link>{" "}
          if you are experiencing issues.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AboutDialog;

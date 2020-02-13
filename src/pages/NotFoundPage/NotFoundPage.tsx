import React, { FC } from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";

const NotFoundPage: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Page not found
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        This page has moved or doesn't exist.
      </Typography>
      <div>
        <Button variant="outlined" href="/dashboard">
          Go back home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;

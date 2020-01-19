import React, { FC, useContext } from "react";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";
import GlobalConfigContext from "../../contexts/GlobalConfigContext";

const MaintenancePage: FC = () => {
  const classes = useStyles();
  const { maintenance } = useContext(GlobalConfigContext);

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Muhnee is under currently unavailable
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Our team is currently on it! So please try again later.
      </Typography>
      {maintenance.message && (
        <div className={classes.message}>
          <Divider />
          <Typography variant="body1">Reason:</Typography>
          <Typography variant="body1">{maintenance.message}</Typography>
        </div>
      )}
      {maintenance.scheduledEnd && (
        <div className={classes.scheduledEnd}>
          <Divider />
          <Typography variant="body1">
            {`Maintenance scheduled to complete on ${maintenance.scheduledEnd.format(
              "Do MMM YYYY hh:mma"
            )}`}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default MaintenancePage;

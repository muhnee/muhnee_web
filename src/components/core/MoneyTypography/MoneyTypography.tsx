import React, { FC } from "react";

import Typography from "@material-ui/core/Typography";
import MoneyTypographyProps from "./types";
import useStyles from "./styles";

const MoneyTypography: FC<MoneyTypographyProps> = ({
  children,
  variant = "body1"
}) => {
  const classes = useStyles();
  return (
    <Typography variant={variant} className={classes.root}>
      {children}
    </Typography>
  );
};

export default MoneyTypography;

import React, { FC } from "react";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";
import { Link } from "@material-ui/core";

const PolicyLinks: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.termsLink}>
      <Typography variant="caption" color="textSecondary">
        <Link
          href="https://www.notion.so/Privacy-13ae75755f0e49c28a1a19a607931665"
          target="_blank"
        >
          Privacy Policy
        </Link>
      </Typography>
      <Typography variant="caption" color="textSecondary">
        <Link
          href="https://www.notion.so/muhnee/Terms-of-Use-a10d1dd98f044d1b9799f39fca4e387a"
          target="_blank"
        >
          Terms of Use
        </Link>
      </Typography>
    </div>
  );
};

export default PolicyLinks;

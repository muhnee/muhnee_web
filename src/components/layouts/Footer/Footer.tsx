import React, { FC } from "react";
import moment from "moment";

import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const Footer: FC = () => {
  return (
    <div
      style={{
        padding: "0.25rem 0.75rem"
      }}
    >
      <Typography variant="body1" color="inherit">
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
        v{process.env.REACT_APP_VERSION}
      </Typography>
      <Typography variant="body1" color="inherit">
        Copyright &copy; Muhnee 2019{" "}
        {moment().year() !== 2019 ? `- ${moment().year()}` : ``} | Experiencing
        issues? Click{" "}
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
        </Link>
      </Typography>
    </div>
  );
};

export default Footer;

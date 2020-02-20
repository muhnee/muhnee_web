import React, { FC } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import AuthenticatedContainer from "../../containers/AuthenticatedContainer";

import TaxDeductibleReportPage from "./TaxDeductibleReport";

const ReportingPage: FC = () => {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.path} exact>
        <AuthenticatedContainer>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6">Reports</Typography>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 10,
                  minWidth: 250,
                  minHeight: 150,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "30%",
                  backgroundImage: "url(/images/scheduled.svg)",
                  backgroundPosition: "90% 90%",
                  padding: "0.75rem",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div style={{ flex: 1 }}>
                  <Typography variant="h6" color="textSecondary">
                    Tax Deductible Report
                  </Typography>
                </div>
                <Link href="/reports/tax_deductible_expenses">
                  <Typography variant="body2">View Report</Typography>
                </Link>
              </div>
            </div>
          </div>
        </AuthenticatedContainer>
      </Route>
      <Route path={`${match.path}/tax_deductible_expenses`}>
        <AuthenticatedContainer>
          <TaxDeductibleReportPage />
        </AuthenticatedContainer>
      </Route>
      <Route path={match.path}>
        <AuthenticatedContainer>
          <h3>Not found.</h3>
        </AuthenticatedContainer>
      </Route>
    </Switch>
  );
};

export default ReportingPage;

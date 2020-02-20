import React, { FC } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import AuthenticatedContainer from "../../containers/AuthenticatedContainer";

import TransactionPage from "./TransactionPage";
import MonthlySummaryPage from "./MonthlySummaryPage";

const MonthsPage: FC = () => {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:monthId`} exact>
        <AuthenticatedContainer>
          <MonthlySummaryPage />
        </AuthenticatedContainer>
      </Route>
      <Route path={`${match.path}/:monthId/transactions/:transactionId`}>
        <AuthenticatedContainer>
          <TransactionPage />
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

export default MonthsPage;

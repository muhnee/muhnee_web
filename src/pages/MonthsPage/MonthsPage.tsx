import React, { FC } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import TransactionPage from "./TransactionPage";
import MonthlySummaryPage from "./MonthlySummaryPage";

const MonthsPage: FC = () => {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:monthId`} exact>
        <MonthlySummaryPage />
      </Route>
      <Route path={`${match.path}/:monthId/transactions/:transactionId`}>
        <TransactionPage />
      </Route>
      <Route path={match.path}>
        <h3>Not found.</h3>
      </Route>
    </Switch>
  );
};

export default MonthsPage;

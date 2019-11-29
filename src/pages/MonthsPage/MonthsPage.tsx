import React, { FC } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import TransactionPage from "../TransactionPage/TransactionPage";

const MonthsPage: FC = () => {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:monthId/transactions/:transactionId`}>
        <TransactionPage />
      </Route>
      <Route path={match.path}>
        <h3>Currently under construction.</h3>
      </Route>
    </Switch>
  );
};

export default MonthsPage;

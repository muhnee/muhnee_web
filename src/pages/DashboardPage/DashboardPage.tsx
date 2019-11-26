import React, { FC } from "react";
import AuthenticatedContainer from "../../containers/AuthenticatedContainer";

const DashboardPage: FC = () => {
  return (
    <AuthenticatedContainer>
      <div>Dashboard Page!</div>
    </AuthenticatedContainer>
  );
};

export default DashboardPage;

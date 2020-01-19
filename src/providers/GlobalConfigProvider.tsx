import React, { FC } from "react";
import moment from "moment";

import { useDocumentData } from "react-firebase-hooks/firestore";

import { GlobalConfig } from "../contexts/types";
import { useFirestore } from "../firebase/firebase";
import GlobalConfigContext from "../contexts/GlobalConfigContext";

const GlobalConfigProvider: FC = ({ children }) => {
  const firestore = useFirestore();

  const [globalConfig, isGlobalConfigLoading] = useDocumentData<GlobalConfig>(
    firestore.collection("config").doc("global")
  );
  return (
    <GlobalConfigContext.Provider
      value={{
        maintenance: {
          enabled: globalConfig ? globalConfig.maintenance.enabled : false,
          scheduledEnd:
            globalConfig && globalConfig.maintenance.scheduledEnd
              ? moment(globalConfig.maintenance.scheduledEnd.toDate())
              : null,
          message: globalConfig ? globalConfig.maintenance.message : ""
        },
        isLoading: isGlobalConfigLoading
      }}
    >
      {children}
    </GlobalConfigContext.Provider>
  );
};

export default GlobalConfigProvider;

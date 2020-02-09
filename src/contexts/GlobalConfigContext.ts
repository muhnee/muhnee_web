import React from "react";

import { GlobalConfigState } from "./types";

const GlobalConfigContext = React.createContext<GlobalConfigState>({
  maintenance: {
    enabled: false,
    scheduledEnd: null,
    message: ""
  },
  enabledLogin: {
    googleAuth: false,
    appleAuth: false
  },
  isLoading: false
});

export default GlobalConfigContext;

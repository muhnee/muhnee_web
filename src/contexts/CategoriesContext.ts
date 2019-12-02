import React from "react";

import { CategoriesContextState } from "./types";

const CategoriesContext = React.createContext<CategoriesContextState>({
  expenseCategories: null,
  incomeCategories: null
});

export default CategoriesContext;

import React from "react";

import { CategoriesContextState } from "./types";

const CategoriesContext = React.createContext<CategoriesContextState>({
  expenseCategories: null,
  incomeCategories: null,
  categoryMap: {
    income: {},
    expense: {}
  },
  isLoading: false
});

export default CategoriesContext;

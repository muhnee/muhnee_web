import React, { useContext, FC } from "react";
import firebase from "firebase";

import { useCollection } from "react-firebase-hooks/firestore";

import CategoriesContext from "../contexts/CategoriesContext";
import AuthenticationContext from "../contexts/AuthenticationContext";

import { _Category } from "../contexts/types";

const CategoriesProvider: FC = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  const [expenseCategories, isExpenseCategoriesLoading] = useCollection(
    user
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("categories")
          .doc("expense")
          .collection("types")
      : null
  );

  const [incomeCategories, isIncomeCategoriesLoading] = useCollection(
    user
      ? firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("categories")
          .doc("income")
          .collection("types")
      : null
  );

  let income: _Category = {};
  if (incomeCategories) {
    incomeCategories.docs.forEach(doc => {
      let docData: any = doc.data();
      income[doc.id] = {
        id: doc.id,
        name: docData.name,
        icon: docData.icon
      };
    });
  }

  let expense: _Category = {};
  if (expenseCategories) {
    expenseCategories.docs.forEach(doc => {
      let docData: any = doc.data();
      expense[doc.id] = {
        id: doc.id,
        name: docData.name,
        icon: docData.icon
      };
    });
  }

  return (
    <CategoriesContext.Provider
      value={{
        expenseCategories,
        incomeCategories,
        categoryMap: { income, expense },
        isLoading: isIncomeCategoriesLoading && isExpenseCategoriesLoading
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;

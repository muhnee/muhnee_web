import React, { useContext, FC } from "react";
import firebase from "firebase";

import { useCollection } from "react-firebase-hooks/firestore";

import CategoriesContext from "../contexts/CategoriesContext";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { Category } from "../types/Category";

interface _Category {
  [id: string]: Category;
}
const CategoriesProvider: FC = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  const [expenseCategories] = useCollection(
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

  const [incomeCategories] = useCollection(
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
        categoryMap: { income, expense }
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;

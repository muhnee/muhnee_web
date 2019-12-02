import React, { useContext, FC } from "react";
import firebase from "firebase";

import { useCollection } from "react-firebase-hooks/firestore";

import CategoriesContext from "../contexts/CategoriesContext";
import AuthenticationContext from "../contexts/AuthenticationContext";

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

  return (
    <CategoriesContext.Provider value={{ expenseCategories, incomeCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;

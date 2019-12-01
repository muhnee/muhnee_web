import React, { FC, useContext } from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import { useCollection } from "react-firebase-hooks/firestore";

const CategoriesPage: FC = () => {
  const { user } = useContext(AuthenticationContext);

  const [
    expenseCategories,
    isExpenseCategoriesLoading,
    isExpenseCategoriesErrored
  ] = useCollection(
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

  const [
    incomeCategories,
    isIncomeCategoriesLoading,
    isIncomeCategoriesErrored
  ] = useCollection(
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

  console.log(expenseCategories);
  if (!user || !user.uid) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <div>
        {!isIncomeCategoriesLoading &&
        expenseCategories &&
        expenseCategories.size > 0
          ? expenseCategories.docs.map((category, i) => {
              let expense: any = category.data();
              return <li key={category.id}>{expense.name}</li>;
            })
          : null}
      </div>
    </div>
  );
};

export default CategoriesPage;

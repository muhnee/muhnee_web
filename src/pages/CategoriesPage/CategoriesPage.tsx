import React, { FC, useContext } from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import { useCollection } from "react-firebase-hooks/firestore";

import useStyles from "./styles";
import { Typography } from "@material-ui/core";
import AddCategoryContainer from "../../containers/AddCategoryContainer";

const CategoriesPage: FC = () => {
  const { user } = useContext(AuthenticationContext);
  const classes = useStyles();

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

  const onAddNewCategory = (type: string, newCategory: string) => {
    if (user && user.uid) {
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("categories")
        .doc(type)
        .collection("types")
        .add({
          name: newCategory
        });
    }
  };

  if (!user || !user.uid) {
    return <Redirect to="/" />;
  }
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant="h6">Expenses</Typography>
        <div className={classes.categoryListContainer}>
          {!isExpenseCategoriesLoading &&
          expenseCategories &&
          expenseCategories.size > 0
            ? expenseCategories.docs.map((category, i) => {
                let expense: any = category.data();
                return <li key={category.id}>{expense.name}</li>;
              })
            : null}
        </div>
        <div>
          <AddCategoryContainer
            onSubmit={newCategory => {
              onAddNewCategory("expense", newCategory);
            }}
          />
        </div>
      </div>
      <div className={classes.container}>
        <Typography variant="h6">Income</Typography>
        <div className={classes.categoryListContainer}>
          {!isIncomeCategoriesLoading &&
          incomeCategories &&
          incomeCategories.size > 0
            ? incomeCategories.docs.map((category, i) => {
                let income: any = category.data();
                return <li key={category.id}>{income.name}</li>;
              })
            : null}
        </div>
        <div>
          <AddCategoryContainer
            onSubmit={newCategory => {
              onAddNewCategory("income", newCategory);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;

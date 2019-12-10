import React, { FC, useContext } from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase";

import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import useStyles from "./styles";

import AddCategoryContainer from "../../containers/AddCategoryContainer";
import CategoriesContext from "../../contexts/CategoriesContext";
import { useNotificationDispatch } from "../../contexts/NotificationProvider";
import CategoriesListItem from "../../components/CategoriesListItem";

const CategoriesPage: FC = () => {
  const { user } = useContext(AuthenticationContext);
  const { expenseCategories, incomeCategories } = useContext(CategoriesContext);
  const dispatchNotifications = useNotificationDispatch();
  const classes = useStyles();

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
      dispatchNotifications({
        type: "@@NOTIFICATION/PUSH",
        notification: {
          message: `Successfully added ${newCategory}!! 🚀`,
          type: "success"
        }
      });
    }
  };

  const onCategoryRemove = (type: string, id: string, name: string) => {
    if (user && user.uid) {
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("categories")
        .doc(type)
        .collection("types")
        .doc(id)
        .delete();
      dispatchNotifications({
        type: "@@NOTIFICATION/PUSH",
        notification: {
          message: `Successfully removed ${name}!! 🚀`,
          type: "info"
        }
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
        <List className={classes.categoryListContainer}>
          {expenseCategories && expenseCategories.size > 0
            ? expenseCategories.docs.map(category => {
                let expenseCategory: any = category.data();
                return (
                  <CategoriesListItem
                    category={{
                      id: expenseCategory.id,
                      name: expenseCategory.name,
                      icon: expenseCategory.icon
                    }}
                    onRemove={() => {
                      onCategoryRemove(
                        "expense",
                        category.id,
                        expenseCategory.name
                      );
                    }}
                  />
                );
              })
            : null}
        </List>
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
        <List className={classes.categoryListContainer}>
          {incomeCategories && incomeCategories && incomeCategories.size > 0
            ? incomeCategories.docs.map(category => {
                let income: any = category.data();
                return (
                  <CategoriesListItem
                    category={{
                      id: category.id,
                      name: income.name,
                      icon: income.icon
                    }}
                    onRemove={() => {
                      onCategoryRemove("income", category.id, income.name);
                    }}
                  />
                );
              })
            : null}
        </List>
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

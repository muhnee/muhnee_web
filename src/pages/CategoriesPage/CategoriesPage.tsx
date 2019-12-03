import React, { FC, useContext } from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import AuthenticationContext from "../../contexts/AuthenticationContext";

import useStyles from "./styles";
import {
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/DeleteOutline";

import AddCategoryContainer from "../../containers/AddCategoryContainer";
import CategoriesContext from "../../contexts/CategoriesContext";
import { useNotificationDispatch } from "../../contexts/NotificationProvider";

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
                  <ListItem key={category.id}>
                    <ListItemText primary={expenseCategory.name} />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() => {
                          onCategoryRemove(
                            "expense",
                            category.id,
                            expenseCategory.name
                          );
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
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
                  <ListItem key={category.id}>
                    <ListItemText primary={income.name} />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() => {
                          onCategoryRemove("income", category.id, income.name);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
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

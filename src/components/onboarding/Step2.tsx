import React, { FC, useContext } from "react";

import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

import AddCategoryContainer from "../../containers/AddCategoryContainer";

import CategoriesContext from "../../contexts/CategoriesContext";
import { useNotificationDispatch } from "../../contexts/NotificationProvider";

import { Step1Props } from "./types";
import { TransactionTypes } from "../../types/Transaction";

import useStyles from "./styles";
import { useFirestore } from "../../firebase/firebase";

const Step2: FC<Step1Props> = ({ user }) => {
  const { expenseCategories } = useContext(CategoriesContext);
  const dispatchNotifications = useNotificationDispatch();
  const firestore = useFirestore();

  const classes = useStyles();

  const onAddNewCategory = (type: TransactionTypes, newCategory: string) => {
    if (user && user.uid) {
      firestore
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
      firestore
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

  return (
    <div className={classes.root}>
      <img
        src="/images/shopping.svg"
        className={classes.images}
        alt="shopping trolley"
      />
      <div className={classes.textContainer}>
        <Typography variant="h4">
          <strong>Firstly</strong>, let's add some categories to group your
          expenses.
        </Typography>
        <Typography variant="body1">
          Categorising your expenses allow you to analyze your expenses much
          better. For example, you can do analysis the amount of money you've
          spent on meals, transportation, entertainment, etc.
        </Typography>
      </div>
      <div className={classes.categories}>
        {expenseCategories && expenseCategories.size > 0
          ? expenseCategories.docs.map(category => {
              let expenseCategory: any = category.data();
              return (
                <Chip
                  label={expenseCategory.name}
                  key={category.id}
                  onDelete={() => {
                    onCategoryRemove(
                      "expense",
                      category.id,
                      expenseCategory.name
                    );
                  }}
                  className={classes.chip}
                />
              );
            })
          : null}
      </div>
      <div>
        <AddCategoryContainer
          onSubmit={(newCategory: string) => {
            onAddNewCategory("expense", newCategory);
          }}
        />
      </div>
    </div>
  );
};

export default Step2;

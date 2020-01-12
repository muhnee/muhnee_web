import React, { FC, useContext } from "react";
import firebase from "firebase";

import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

import AddCategoryContainer from "../../containers/AddCategoryContainer";

import CategoriesContext from "../../contexts/CategoriesContext";
import { useNotificationDispatch } from "../../contexts/NotificationProvider";

import { Step1Props } from "./types";
import { TransactionTypes } from "../../types/Transaction";

import useStyles from "./styles";

const Step2: FC<Step1Props> = ({ user }) => {
  const { incomeCategories } = useContext(CategoriesContext);
  const dispatchNotifications = useNotificationDispatch();

  const classes = useStyles();

  const onAddNewCategory = (type: TransactionTypes, newCategory: string) => {
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

  return (
    <div className={classes.root}>
      <img src="/images/wallet.svg" className={classes.images} alt="wallet" />
      <div className={classes.textContainer}>
        <Typography variant="h4">
          <strong>Now </strong>let's add some and update categories for your
          income.
        </Typography>
        <Typography variant="body1">
          This becomes really helpful if you have more than one source of
          income. Some of these categories have been preloaded, feel free to
          remove them and add more.
        </Typography>
        <div>
          {incomeCategories && incomeCategories.size > 0
            ? incomeCategories.docs.map(category => {
                let categoryData: any = category.data();
                return (
                  <Chip
                    label={categoryData.name}
                    key={category.id}
                    onDelete={() => {
                      onCategoryRemove(
                        "expense",
                        category.id,
                        categoryData.name
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
              onAddNewCategory("income", newCategory);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Step2;

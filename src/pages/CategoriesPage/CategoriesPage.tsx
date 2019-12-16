import React, { FC, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase";

import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { DropzoneDialog } from "material-ui-dropzone";

import CategoriesListItem from "../../components/CategoriesListItem";

import AddCategoryContainer from "../../containers/AddCategoryContainer";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import CategoriesContext from "../../contexts/CategoriesContext";

import { useNotificationDispatch } from "../../contexts/NotificationProvider";

import useStyles from "./styles";

const CategoriesPage: FC = () => {
  const { user } = useContext(AuthenticationContext);
  const { expenseCategories, incomeCategories } = useContext(CategoriesContext);
  const dispatchNotifications = useNotificationDispatch();

  const [avatarIdFileUpload, setAvatarIdFileUpload] = useState("");
  const [avatarIdType, setAvatarIdType] = useState("");

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

  const onUpdateAvatar = async (file: File[]) => {
    if (user && user.uid) {
      const filesMetadata = await firebase
        .storage()
        .ref()
        .child(
          `/users/${user.uid}/uploads/icons/${avatarIdType}/${avatarIdFileUpload}`
        )
        .put(file[0])
        .then(snapshot => {
          return snapshot;
        });
      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("categories")
        .doc(avatarIdType)
        .collection("types")
        .doc(avatarIdFileUpload)
        .update({
          icon: filesMetadata ? filesMetadata.metadata.fullPath || null : null
        });
      dispatchNotifications({
        type: "@@NOTIFICATION/PUSH",
        notification: {
          message: `Successfully updated avatar!! 🚀`,
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
                      id: category.id,
                      name: expenseCategory.name,
                      icon: expenseCategory.icon
                    }}
                    key={category.id}
                    type="expense"
                    onRemove={(type, id, name) => {
                      onCategoryRemove(type, id, name);
                    }}
                    onAvatarClick={(type, id) => {
                      setAvatarIdType(type);
                      setAvatarIdFileUpload(id);
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
                    key={category.id}
                    category={{
                      id: category.id,
                      name: income.name,
                      icon: income.icon
                    }}
                    type="income"
                    onRemove={(type, id, name) => {
                      onCategoryRemove(type, id, name);
                    }}
                    onAvatarClick={(type, id) => {
                      setAvatarIdType(type);
                      setAvatarIdFileUpload(id);
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
      <DropzoneDialog
        open={!!avatarIdFileUpload}
        acceptedFiles={["image/*"]}
        showPreviews={true}
        filesLimit={1}
        maxFileSize={2000000}
        onClose={() => setAvatarIdFileUpload("")}
        onSave={(files: File[]) => {
          onUpdateAvatar(files);
          setAvatarIdFileUpload("");
        }}
      />
    </div>
  );
};

export default CategoriesPage;

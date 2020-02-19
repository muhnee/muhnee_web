import React, { FC, useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

import Skeleton from "@material-ui/lab/Skeleton";

import { DropzoneDialog } from "material-ui-dropzone";

import AddIcon from "@material-ui/icons/AddBox";

import CategoriesListItem from "../../components/CategoriesListItem";

import AuthenticatedContainer from "../../containers/AuthenticatedContainer";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import CategoriesContext from "../../contexts/CategoriesContext";
import { useNotificationDispatch } from "../../contexts/NotificationProvider";
import { useUIDispatch } from "../../contexts/UIProvider";

import useStyles from "./styles";
import { useFirestore, useStorage } from "../../firebase/firebase";

const CategoriesPage: FC = () => {
  const { user } = useContext(AuthenticationContext);
  const { expenseCategories, incomeCategories, isLoading } = useContext(
    CategoriesContext
  );
  const dispatchNotifications = useNotificationDispatch();
  const uiDispatch = useUIDispatch();
  const firestore = useFirestore();
  const storage = useStorage();

  const [avatarIdFileUpload, setAvatarIdFileUpload] = useState("");
  const [avatarIdType, setAvatarIdType] = useState("");

  const classes = useStyles();

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

  const onUpdateAvatar = async (file: File[]) => {
    if (user && user.uid) {
      const filesMetadata = await storage
        .ref()
        .child(
          `/users/${user.uid}/uploads/icons/${avatarIdType}/${avatarIdFileUpload}`
        )
        .put(file[0])
        .then(snapshot => {
          return snapshot;
        });
      await firestore
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

  const onUpdate = async (
    newCategoryName: string,
    id: string,
    type: string
  ) => {
    if (user && user.uid) {
      await firestore
        .collection("users")
        .doc(user.uid)
        .collection("categories")
        .doc(type)
        .collection("types")
        .doc(id)
        .update({
          name: newCategoryName
        });
      dispatchNotifications({
        type: "@@NOTIFICATION/PUSH",
        notification: {
          message: `Successfully updated category to ${newCategoryName}!! 🚀`,
          type: "info"
        }
      });
    }
  };

  if (!user || !user.uid) {
    return <Redirect to="/" />;
  }

  return (
    <AuthenticatedContainer>
      <div className={classes.root}>
        <Typography variant="h5">Budget Categories</Typography>
        <Typography>
          This section allows you to modify your budget categories used for
          analysis and reporting purposes
        </Typography>
        <div className={classes.row}>
          <Card className={classes.container} variant="outlined">
            <CardContent>
              <Typography variant="h6">Expenses</Typography>
              {isLoading && (
                <Skeleton variant="rect" width="100%" height={"3rem"} />
              )}
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
                          onUpdate={onUpdate}
                        />
                      );
                    })
                  : null}
                <ListItem />
              </List>
            </CardContent>
          </Card>
          <Card className={classes.container} variant="outlined">
            <CardContent>
              <Typography variant="h6">Income</Typography>
              {isLoading && (
                <Skeleton variant="rect" width="100%" height={"3rem"} />
              )}
              <List className={classes.categoryListContainer}>
                {incomeCategories &&
                incomeCategories &&
                incomeCategories.size > 0
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
            </CardContent>
          </Card>
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
        <Fab
          variant="extended"
          color="primary"
          onClick={() =>
            uiDispatch({
              type: "@@UI/ADD_CATEGORY_DIALOG_OPEN"
            })
          }
          className={classes.fab}
        >
          <AddIcon className={classes.extendedIcon} />
          Add Category
        </Fab>
      </div>
    </AuthenticatedContainer>
  );
};

export default CategoriesPage;

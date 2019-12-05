import React, { FC, useContext, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import firebase from "firebase";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";

import AddCategoryContainer from "../../containers/AddCategoryContainer";

import DeleteIcon from "@material-ui/icons/DeleteOutline";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import CategoriesContext from "../../contexts/CategoriesContext";
import { useNotificationDispatch } from "../../contexts/NotificationProvider";
import { UserContext } from "../../contexts/UserContext";

import useStyles from "./styles";

const OnboardingPage: FC = () => {
  const [step, setStep] = useState(0);

  const { user, isLoaded } = useContext(AuthenticationContext);
  const { loaded, onboarded } = useContext(UserContext);
  const { expenseCategories, incomeCategories } = useContext(CategoriesContext);

  const dispatchNotifications = useNotificationDispatch();
  const history = useHistory();

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

  const finaliseSetup = () => {
    if (user && user.uid) {
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .update({
          onboarded: true
        })
        .then(() => {
          history.push("/dashboard");
        });
    }
  };

  if (isLoaded && !user) {
    return null;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  if (loaded && onboarded) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Slide direction="left" in={step === 0} mountOnEnter unmountOnExit>
        <div className={classes.root}>
          <img
            src="/images/savings.svg"
            className={classes.images}
            alt="saving money"
          />
          <div className={classes.textContainer}>
            <Typography variant="h4">
              <strong>Hello</strong>, {user && user.displayName}.
            </Typography>
            <Typography variant="h5">
              Let's start saving and managing your money by setting up your
              account.
            </Typography>
          </div>
          <Button
            onClick={() => setStep(step + 1)}
            variant="outlined"
            color="primary"
          >
            Next Step
          </Button>
        </div>
      </Slide>
      <Slide direction="left" in={step === 1} mountOnEnter unmountOnExit>
        <div className={classes.root}>
          <img
            src="/images/shopping.svg"
            className={classes.images}
            alt="shopping trolley"
          />
          <div className={classes.textContainer}>
            <Typography variant="h4">
              <strong>Step 1,</strong>
            </Typography>
            <Typography variant="h5">
              Firstly, let's add some categories to group your expenses.
            </Typography>
            <Typography variant="body1">
              Some of these categories have been preloaded, feel free to remove
              them and add more.
            </Typography>
            <List>
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
          <div className={classes.stepContainer}>
            <Button
              onClick={() => setStep(step - 1)}
              variant="outlined"
              color="primary"
            >
              Previous Step
            </Button>
            <Button
              onClick={() => setStep(step + 1)}
              variant="outlined"
              color="primary"
            >
              Next Step
            </Button>
          </div>
        </div>
      </Slide>
      <Slide direction="left" in={step === 2} mountOnEnter unmountOnExit>
        <div className={classes.root}>
          <img
            src="/images/wallet.svg"
            className={classes.images}
            alt="wallet"
          />
          <div className={classes.textContainer}>
            <Typography variant="h4">
              <strong>Step 2,</strong>
            </Typography>
            <Typography variant="h5">
              Now let's add some and update categories to for your income.
            </Typography>
            <Typography variant="body1">
              This becomes really helpful if you have more than one source of
              income. Some of these categories have been preloaded, feel free to
              remove them and add more.
            </Typography>
            <List>
              {incomeCategories && incomeCategories.size > 0
                ? incomeCategories.docs.map(category => {
                    let categoryData: any = category.data();
                    return (
                      <ListItem key={category.id}>
                        <ListItemText primary={categoryData.name} />
                        <ListItemSecondaryAction>
                          <IconButton
                            onClick={() => {
                              onCategoryRemove(
                                "income",
                                category.id,
                                categoryData.name
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
                  onAddNewCategory("income", newCategory);
                }}
              />
            </div>
          </div>
          <div className={classes.stepContainer}>
            <Button
              onClick={() => setStep(step - 1)}
              variant="outlined"
              color="primary"
            >
              Previous Step
            </Button>
            <Button
              onClick={() => finaliseSetup()}
              variant="contained"
              color="primary"
            >
              Get Started
            </Button>
          </div>
        </div>
      </Slide>
    </>
  );
};

export default OnboardingPage;

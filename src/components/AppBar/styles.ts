import { Theme, makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    menuItems: {
      flex: 1
    },
    menuItemsInner: {
      display: "none",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        display: "flex"
      }
    },
    root: {
      display: "flex",
      flexDirection: "row",
      borderBottom: "1px solid #ccc",
      alignItems: "center",
      position: "sticky",
      backgroundColor: "#fff",
      top: 0,
      zIndex: 2
    },
    logo: { color: "white" },
    navigationContainer: {
      flex: 1,
      justifyContent: "center"
    },
    bigAvatar: {
      width: 60,
      height: 60
    },
    paper: {
      zIndex: 2000,
      padding: "2rem 0rem",
      boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.4), 0px 1px 1px 0px rgba(0,0,0,0.2), 0px 1px 3px 0px rgba(0,0,0,0.3);"
    },
    userMenuContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    },
    displayName: {
      marginRight: "0.25rem"
    },
    userDialogHeader: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0.5rem 2rem"
    },
    termsLink: {
      display: "flex",
      flexDirection: "row",
      flex: 1,
      padding: "0.25rem 0.5rem",
      justifyContent: "space-evenly"
    }
  })
);

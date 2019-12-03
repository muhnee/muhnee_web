import { makeStyles, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "row"
    },
    sidebar: {
      padding: "0.25rem 0 0.25rem 0.25rem",
      width: 200,
      borderRight: "1px solid #ccc",
      height: "100vh",
      position: "fixed",
      zIndex: 3,
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.down("sm")]: {
        display: "none"
      }
    },
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      overflow: "scroll",
      height: "100vh",
      marginLeft: 200,
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0
      }
    }
  })
);

import { makeStyles, createStyles } from "@material-ui/core/styles";
import colors from "../../config/colors";

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      overflow: "hidden"
    },
    sidebar: {
      background: colors.background,
      padding: "0.25rem 0 0.25rem 0.25rem",
      minWidth: 125,
      borderRight: "1px solid #ccc",
      height: "100vh",
      zIndex: 3,
      display: "flex",
      color: "white",
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
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0
      }
    },
    appBar: {
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        width: "100%"
      }
    },
    userCardRoot: {
      textAlign: "left",
      display: "flex",
      flex: 1,
      padding: "0.5rem 0.25rem",
      backgroundColor: theme.palette.primary.dark,
      marginRight: "0.25rem",
      borderRadius: "0.25rem"
    }
  })
);

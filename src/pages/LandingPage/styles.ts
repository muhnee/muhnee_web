import { makeStyles, createStyles, Theme } from "@material-ui/core";
import colors from "../../config/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex"
    },
    background: {
      flex: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: colors.background
    },
    loginContainer: {
      background: "white",
      flex: 1,
      padding: "1.5rem 1.5rem",
      maxWidth: 800
    },
    loginImage: {
      margin: "0.25rem 0",
      cursor: "pointer"
    },
    loginText: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "1.25rem"
    },
    logoContainer: {
      padding: "1.5rem 1.5rem",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    authProviders: {
      margin: "2rem 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    footer: { marginTop: "0.5rem" }
  })
);

export default useStyles;

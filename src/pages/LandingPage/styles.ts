import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex"
    },
    leftContainer: {
      flex: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: `linear-gradient(to top right, ${theme.palette.primary.main}, #8E91F3)`
    },
    loginContainer: {
      background: "white",
      width: "80%",
      padding: "1.5rem 1.5rem",
      maxWidth: 800
    },
    loginImage: {
      margin: "0.25rem 0",
      cursor: "pointer"
    }
  })
);

export default useStyles;

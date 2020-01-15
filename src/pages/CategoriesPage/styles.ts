import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    root: {
      padding: "0.25rem 0.75rem",
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      marginTop: "0.5rem",
      flex: 1
    },
    container: {
      display: "flex",
      minWidth: 280,
      flex: 1,
      flexDirection: "column",
      margin: "0rem 0.25rem"
    },
    categoryListContainer: {
      flex: 1
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    },
    fab: {
      position: "fixed",
      bottom: "3vh",
      right: "3vw",
      color: "white"
    },
    row: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: "0.5rem"
    }
  })
);

export default useStyles;

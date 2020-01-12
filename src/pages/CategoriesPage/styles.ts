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
      width: "100%",
      display: "flex",
      minWidth: 280,
      flexDirection: "column",
      margin: "0.5rem"
    },
    categoryListContainer: {
      flex: 1
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    },
    fab: {
      position: "fixed",
      bottom: "2vh",
      right: "2vw",
      color: "white"
    }
  })
);

export default useStyles;

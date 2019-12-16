import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  header: {
    padding: "0.5rem 0.75rem",
    backgroundColor: "#eee"
  },
  monthlySummaryContainer: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "1.25rem"
  },
  monthlySummaryCard: {
    flex: 1,
    margin: "0.25rem 0"
  },
  main: {
    display: "flex",
    flexWrap: "wrap"
  },
  leftContainer: {
    padding: "0.5rem 0.75rem",
    minWidth: 300,
    flex: 3
  },
  rightContainer: {
    padding: "0.5rem 0.75rem",
    minWidth: 300,
    flex: 2
  },
  fab: {
    position: "fixed",
    bottom: "2vh",
    right: "2vw",
    color: "white"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default useStyles;

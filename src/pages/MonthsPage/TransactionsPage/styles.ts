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
    flexWrap: "wrap"
  },
  monthlySummaryCard: {
    flex: 1,
    margin: "0.25rem 0"
  },
  main: {
    padding: "0.5rem 0.75rem"
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

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
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
  }
});

export default useStyles;

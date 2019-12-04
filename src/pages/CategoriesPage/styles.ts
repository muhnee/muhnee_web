import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    padding: "0.25rem 0.75rem",
    display: "flex",
    flexWrap: "wrap",
    marginTop: "0.5rem",
    flex: 1
  },
  container: {
    flex: 1,
    padding: "0.5rem 0.5rem",
    display: "flex",
    minWidth: 280,
    flexDirection: "column"
  },
  categoryListContainer: {
    flex: 1
  }
});

export default useStyles;

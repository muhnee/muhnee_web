import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
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
  }
});

export default useStyles;

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0.5rem 1.25rem"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "0.5rem 1.25rem"
  },
  avatar: {
    height: 100,
    width: 100,
    margin: "0.5rem 0"
  },
  row: {
    display: "flex",
    flexWrap: "wrap"
  }
});

export default useStyles;

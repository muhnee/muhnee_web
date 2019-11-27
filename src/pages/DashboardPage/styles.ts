import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    flex: 1,
    padding: "1rem",
    display: "flex",
    flexWrap: "wrap"
  },
  leftContainer: {
    flex: 2
  },
  rightContainer: {
    flex: 1
  }
});

export default useStyles;

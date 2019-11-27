import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    flex: 1,
    padding: "1rem",
    display: "flex",
    flexWrap: "wrap"
  },
  leftContainer: {
    flex: 2,
    minWidth: 300
  },
  rightContainer: {
    flex: 1,
    minWidth: 300
  }
});

export default useStyles;

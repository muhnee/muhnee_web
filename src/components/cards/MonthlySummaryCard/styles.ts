import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    flex: 1,
    margin: "0.25rem 0",
    minWidth: 280
  },
  value: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center"
  }
}));

export default useStyles;

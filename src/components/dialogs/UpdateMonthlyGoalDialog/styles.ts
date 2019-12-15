import { makeStyles, Theme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles<Theme>(theme => ({
  actionButton: {
    backgroundColor: green[500],
    color: "white"
  }
}));

export default useStyles;

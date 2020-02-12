import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    flex: 1,
    padding: "1rem",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
  }
}));

export default useStyles;

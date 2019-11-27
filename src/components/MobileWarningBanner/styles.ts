import { makeStyles } from "@material-ui/styles";
import { blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    backgroundColor: blueGrey[100],
    padding: "0.25rem 0.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transitionProperty: "all",
    transitionDuration: ".5s",
    transitionTimingFunction: "cubic-bezier(0, 1, 0.5, 1)"
  }
});

export default useStyles;

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    root: {
      display: "flex",
      minWidth: 280,
      flex: 1,
      flexWrap: "wrap",
      width: "100%"
    },
    primary: {
      display: "flex"
    },
    recurringIcon: {
      color: green[500],
      marginLeft: "0.25rem"
    }
  })
);

export default useStyles;

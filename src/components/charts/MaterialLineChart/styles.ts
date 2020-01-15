import { createStyles, makeStyles, Theme } from "@material-ui/core";
const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    root: {
      fontFamily: "'Montserrat', '-sans-serif'"
    }
  })
);

export default useStyles;

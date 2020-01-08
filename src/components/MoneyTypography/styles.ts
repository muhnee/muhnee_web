import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    root: {
      fontFamily: "Varela Round, Montserrat"
    }
  })
);

export default useStyles;

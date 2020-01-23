import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    root: {
      display: "flex",
      minWidth: 280,
      flex: 1,
      flexWrap: "wrap"
    }
  })
);

export default useStyles;

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    root: {
      padding: "0.5rem 0.75rem"
    }
  })
);

export default useStyles;

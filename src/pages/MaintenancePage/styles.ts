import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    root: {
      flex: 1,
      padding: "1.25rem 0.75rem"
    },
    message: {
      padding: "0.75rem 0"
    },
    scheduledEnd: {
      padding: "0.75rem 0"
    }
  })
);

export default useStyles;

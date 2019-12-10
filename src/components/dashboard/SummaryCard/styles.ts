import { makeStyles, createStyles, Theme } from "@material-ui/core";
import SummaryCardProps from "./types";

const useStyles = makeStyles<Theme, SummaryCardProps>(theme =>
  createStyles({
    root: {
      color: theme.palette.primary.main,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      flexWrap: "wrap",
      margin: "0 1.5rem"
    },
    directionIcon: {
      height: "1rem"
    }
  })
);

export default useStyles;

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
      margin: "0.5rem 1.5rem"
    },
    directionIcon: {
      height: "1rem"
    },
    title: {
      color: theme.palette.primary.main
    },
    value: {
      display: "flex",
      minWidth: 200,
      maxWidth: 350
    }
  })
);

export default useStyles;

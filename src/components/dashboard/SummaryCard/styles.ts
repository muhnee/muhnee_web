import { makeStyles, createStyles, Theme } from "@material-ui/core";
import SummaryCardProps from "./types";

const useStyles = makeStyles<Theme, SummaryCardProps>(theme =>
  createStyles({
    root: {
      marginBottom: "1rem",
      minWidth: 280,
      flex: 1,
      margin: "0 0.5rem"
    },
    listItem: {
      display: "flex",
      minWidth: 280,
      flex: 1,
      flexWrap: "wrap"
    }
  })
);

export default useStyles;

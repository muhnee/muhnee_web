import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { MonthlySummaryCardProps } from "./types";

const useStyles = makeStyles<Theme, MonthlySummaryCardProps>(theme =>
  createStyles({
    root: {
      flex: 1,
      margin: "0.25rem 0",
      minWidth: 280
    },
    value: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center"
    }
  })
);

export default useStyles;

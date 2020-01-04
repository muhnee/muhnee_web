import { makeStyles, createStyles, Theme } from "@material-ui/core";
import SummaryCardProps from "./types";

const useStyles = makeStyles<Theme, SummaryCardProps>(theme =>
  createStyles({
    root: {
      boxShadow: `
      0 1.4px 2.8px rgba(0, 0, 0, 0.143),
      0 3.3px 6.7px rgba(0, 0, 0, 0.199),
      0 6.1px 12.5px rgba(0, 0, 0, 0.231),
      0 10.9px 22.3px rgba(0, 0, 0, 0.256),
      0 20.5px 41.8px rgba(0, 0, 0, 0.285),
      0 49px 100px rgba(0, 0, 0, 0.34)
    `,
      marginBottom: "1rem",
      minWidth: 280
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

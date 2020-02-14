import { makeStyles, createStyles, Theme } from "@material-ui/core";
import colors from "../../../config/colors";
import SummaryTitleProps from "./types";

const useStyles = makeStyles<Theme, SummaryTitleProps>(theme =>
  createStyles({
    root: {
      marginBottom: "1rem",
      minWidth: 280,
      flex: 1
    },
    value: {
      background: colors.background,
      WebkitBackgroundClip: "text", // Removed !important
      backgroundClip: "text", // Removed !important
      color: "transparent",
      fontWeight: 700
    }
  })
);

export default useStyles;

import { makeStyles, createStyles, Theme } from "@material-ui/core";
import SummaryCardProps from "./types";

const useStyles = makeStyles<Theme, SummaryCardProps>(theme =>
  createStyles({
    root: ({ inverted }) => ({
      backgroundColor: inverted ? theme.palette.primary.main : "#fff",
      border: inverted ? "none" : `1px solid ${theme.palette.primary.main}`,
      color: inverted ? "#fff" : theme.palette.primary.main,
      minWidth: 200,
      minHeight: 150,
      padding: "0.5rem 1.5rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      flexWrap: "wrap"
    }),
    avatar: ({ inverted }) => ({
      border: `2px solid ${inverted ? "#fff" : theme.palette.primary.main}`,
      color: inverted ? "#fff" : theme.palette.primary.main,
      backgroundColor: inverted ? theme.palette.primary.main : "#fff"
    })
  })
);

export default useStyles;

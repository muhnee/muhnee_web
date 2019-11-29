import { makeStyles, createStyles, Theme } from "@material-ui/core";
import TransactionCardProps from "./types";
import { colors } from "../../../config/colors";

const useStyles = makeStyles<Theme, TransactionCardProps>(theme =>
  createStyles({
    root: ({ transaction }) => {
      const mainColor =
        transaction.type === "expense" ? colors.expense : colors.income;
      return {
        border: `2px solid ${mainColor}`,
        color: mainColor,
        minWidth: 200,
        padding: "0.5rem 1.5rem",
        margin: "0.75rem 0rem",
        display: "flex",
        flexDirection: "row",
        borderRadius: "0.25rem",
        flexWrap: "wrap",
        alignItems: "center"
      };
    },
    avatar: ({ transaction }) => {
      const mainColor =
        transaction.type === "expense" ? colors.expense : colors.income;
      return {
        border: `2px solid ${mainColor}`,
        color: mainColor,
        backgroundColor: "#fff"
      };
    },
    cardCenter: {
      flex: 1,
      marginLeft: "0.5rem"
    }
  })
);

export default useStyles;

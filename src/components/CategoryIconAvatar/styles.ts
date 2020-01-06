import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { CategoryIconAvatarProps } from "./types";
import { colors } from "../../config/colors";

const useStyles = makeStyles<Theme, CategoryIconAvatarProps>(theme =>
  createStyles({
    avatar: ({ type }) => {
      const mainColor = type === "expense" ? colors.expense : colors.income;
      return {
        border: `2px solid ${mainColor}`,
        color: mainColor,
        backgroundColor: "#fff"
      };
    }
  })
);

export default useStyles;

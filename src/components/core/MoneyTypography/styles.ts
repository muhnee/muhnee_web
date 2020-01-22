import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

import MoneyTypographyProps from "./types";

const useStyles = makeStyles<Theme, MoneyTypographyProps>(theme =>
  createStyles({
    root: ({ type }) => ({
      fontFamily: "Varela Round, Montserrat",
      color: type === "expense" ? red[500] : "#777"
    })
  })
);

export default useStyles;

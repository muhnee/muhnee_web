import { createMuiTheme } from "@material-ui/core";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { deepOrange, blue } from "@material-ui/core/colors";

const theme: ThemeOptions = {
  palette: {
    primary: {
      main: "#8E91F3"
    },
    secondary: deepOrange
  }
};

export const muiTheme = createMuiTheme(theme);

export default muiTheme;

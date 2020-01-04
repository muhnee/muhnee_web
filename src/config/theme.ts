import { createMuiTheme } from "@material-ui/core";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { deepOrange } from "@material-ui/core/colors";

const theme: ThemeOptions = {
  palette: {
    primary: {
      main: "#8E91F3"
    },
    secondary: deepOrange
  },
  typography: {
    fontFamily: "Quicksand",
    body2: {
      fontFamily: "Merriweather"
    }
  }
};

export const muiTheme = createMuiTheme(theme);

export default muiTheme;

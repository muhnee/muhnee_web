import { createMuiTheme } from "@material-ui/core";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { deepOrange } from "@material-ui/core/colors";

const theme: ThemeOptions = {
  palette: {
    primary: {
      main: "#4199e1"
    },
    secondary: deepOrange
  },
  typography: {
    fontFamily: "Montserrat",
    body2: {
      fontFamily: "Varela Round"
    }
  }
};

export const muiTheme = createMuiTheme(theme);

export default muiTheme;

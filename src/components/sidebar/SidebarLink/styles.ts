import { Theme, makeStyles, createStyles } from "@material-ui/core";
import { SidebarLinkProps } from "./types";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles<Theme, SidebarLinkProps>(theme =>
  createStyles({
    root: ({ to }) => {
      const isPageOpen = window.location.pathname === to;
      return {
        color: isPageOpen ? "#2e2e2e" : `#777`,
        borderRight: isPageOpen ? `2px solid ${blue[500]}` : "none"
      };
    },
    avatar: ({ to }) => {
      const isPageOpen = window.location.pathname === to;
      return {
        color: isPageOpen ? blue[500] : `#777`,
        backgroundColor: "white"
      };
    }
  })
);

export default useStyles;

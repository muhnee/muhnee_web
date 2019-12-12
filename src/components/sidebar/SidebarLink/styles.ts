import { Theme, makeStyles, createStyles } from "@material-ui/core";
import { SidebarLinkProps } from "./types";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles<Theme, SidebarLinkProps>(theme => {
  const highlightColor = blue[500];

  return createStyles({
    root: ({ to }) => {
      const isPageOpen = window.location.pathname === to;
      return {
        color: isPageOpen ? "#eee" : `#555`,
        borderRight: isPageOpen ? `3px solid ${highlightColor}` : "none"
      };
    },
    avatar: ({ to }) => {
      const isPageOpen = window.location.pathname === to;
      return {
        color: isPageOpen ? highlightColor : `#555`,
        backgroundColor: "white"
      };
    }
  });
});

export default useStyles;

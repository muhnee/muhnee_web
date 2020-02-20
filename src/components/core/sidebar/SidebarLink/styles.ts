import { Theme, makeStyles, createStyles } from "@material-ui/core";
import { SidebarLinkProps } from "./types";

const useStyles = makeStyles<Theme, SidebarLinkProps>(theme => {
  const highlightColor = theme.palette.secondary.main;

  return createStyles({
    root: ({ to }) => {
      const isPageOpen = `/${window.location.pathname.split("/")[1]}` === to;
      return {
        color: isPageOpen ? "#eee" : `#555`,
        borderRight: isPageOpen ? `3px solid ${highlightColor}` : "none",
        display: "flex",
        flexDirection: "column"
      };
    },
    avatar: ({ to }) => {
      const isPageOpen = `/${window.location.pathname.split("/")[1]}` === to;
      return {
        color: isPageOpen ? highlightColor : `#555`,
        backgroundColor: "white"
      };
    }
  });
});

export default useStyles;

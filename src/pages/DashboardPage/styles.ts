import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    flex: 1,
    padding: "1rem",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
  },
  row: {
    padding: "1rem",
    display: "flex",
    flexWrap: "wrap"
  },
  leftContainer: {
    flex: 2,
    minWidth: 300,
    display: "flex",
    flexDirection: "column"
  },
  rightContainer: {
    flex: 1,
    minWidth: 300,
    marginLeft: "0.5rem"
  },
  heading: { color: "#0069E9", fontWeight: 700, fontFamily: "Montserrat" },
  summaryContainer: {
    display: "flex",
    flexWrap: "wrap"
  },
  summaryButtonContainer: {
    marginTop: "1.25rem",
    display: "flex",
    flexWrap: "wrap"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  fab: {
    position: "fixed",
    bottom: "2vh",
    right: "2vw",
    color: "white"
  },
  actionButtonContainer: {
    display: "flex",
    justifyContent: "flex-end"
  },
  monthTitle: {
    fontWeight: 300
  }
}));

export default useStyles;

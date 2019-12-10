import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
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
    flex: 3,
    minWidth: 300,
    display: "flex",
    flexDirection: "column"
  },
  rightContainer: {
    flex: 1,
    minWidth: 300
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
  }
});

export default useStyles;

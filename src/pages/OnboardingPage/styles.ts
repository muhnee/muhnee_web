import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#ccc"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    height: 700,
    width: "50%",
    minWidth: 280,
    alignItems: "center",
    padding: "0.75rem 0.5rem"
  },
  stepContainer: {
    display: "flex",
    maxWidth: 500,
    width: "80%"
  }
});

export default useStyles;

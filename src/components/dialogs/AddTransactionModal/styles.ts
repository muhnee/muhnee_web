import { makeStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles({
  dialogContent: {
    display: "flex",
    flexDirection: "column"
  },
  switch: {
    margin: "1.25rem 0"
  },
  actionButton: {
    backgroundColor: green[500],
    color: "white"
  },
  suggestion: {
    marginRight: "1rem",
    textDecoration: "underline",
    cursor: "pointer"
  }
});

export default useStyles;

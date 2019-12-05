import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0.25rem 0.75rem"
  },
  textContainer: {
    minWidth: 200,
    maxWidth: 500,
    margin: "1.25rem 0"
  },
  images: {
    width: "30%",
    minWidth: 280,
    maxHeight: 230
  },
  stepContainer: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  }
});

export default useStyles;

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  textContainer: {
    minWidth: 200,
    maxWidth: 500,
    margin: "1.25rem 0"
  },
  categories: {
    minWidth: 200,
    maxWidth: 500,
    margin: "1.25rem 0"
  },
  images: {
    width: "30%",
    minWidth: 280,
    maxHeight: 200
  },
  stepContainer: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    maxWidth: 800
  },
  chip: { margin: "0.1rem 0.5rem" }
});

export default useStyles;

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    padding: "1rem 0.5rem",
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  body: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  switch: {
    margin: "1.25rem 0"
  },
  receipt: {
    marginTop: "0.25rem",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap"
  }
});

export default useStyles;
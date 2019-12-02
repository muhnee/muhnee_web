import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: "1.25rem"
  },
  input: {
    flex: 1,
    marginRight: "0.25rem"
  }
});

export default useStyles;

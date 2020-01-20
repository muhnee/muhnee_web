import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 1.25rem"
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row"
  },
  avatar: {
    height: 100,
    width: 100,
    margin: "0.5rem 0"
  },
  settingsCard: {
    flex: 1,
    minWidth: 280,
    maxWidth: "30%",
    margin: "0.25rem 0.75rem"
  }
});

export default useStyles;

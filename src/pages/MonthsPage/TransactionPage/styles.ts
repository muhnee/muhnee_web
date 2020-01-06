import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    padding: "1rem 0.5rem",
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  body: {
    display: "flex",
    flexWrap: "wrap"
  },
  switch: {
    margin: "1.25rem 0"
  },
  receipt: {
    marginTop: "0.25rem",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap"
  },
  card: {
    minWidth: 280,
    flex: 1,
    margin: "0.5rem"
  },
  cardContent: {
    display: "flex",
    flexDirection: "column"
  },
  formControl: {
    marginBottom: "0.25rem"
  },
  transactionAmount: {
    display: "flex",
    flexWrap: "wrap"
  }
});

export default useStyles;

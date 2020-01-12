import React, { FC, useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { AddCategoryContainerProps } from "./types";
import useStyles from "./styles";

const AddCategoryContainer: FC<AddCategoryContainerProps> = props => {
  const { onSubmit } = props;
  const [newCategory, handleNewCategoryChange] = useState("");

  const classes = useStyles();

  const isCategoryNameTooLong = newCategory.length > 50;
  return (
    <div className={classes.root}>
      <TextField
        value={newCategory}
        onChange={e => handleNewCategoryChange(e.target.value)}
        label="New Category"
        className={classes.input}
        error={isCategoryNameTooLong}
        helperText={
          isCategoryNameTooLong
            ? `Too many characters (${newCategory.length}/50)`
            : `Enter a name for your category (${newCategory.length}/50)`
        }
      />
      <Button
        onClick={() => {
          onSubmit(newCategory);
          handleNewCategoryChange("");
        }}
        disabled={isCategoryNameTooLong}
      >
        Submit
      </Button>
    </div>
  );
};
export default AddCategoryContainer;

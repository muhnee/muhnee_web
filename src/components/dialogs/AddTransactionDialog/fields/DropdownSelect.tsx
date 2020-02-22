import React, { FC } from "react";

import FormControl from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import DropdownSelectProps from "./DropdownSelectProps";

const DropdownSelect: FC<DropdownSelectProps> = ({
  label,
  onChange = () => {},
  value,
  options = []
}) => {
  const dropdownId = `dropdown-${label}`;
  const labelId = `${dropdownId}-label`;
  return (
    <FormControl style={{ margin: "0.25rem 0" }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        value={value}
        labelId={labelId}
        id={dropdownId}
        variant="filled"
        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
          onChange(event.target.value as any);
        }}
      >
        {options.map((option, i) => (
          <MenuItem value={option.value} key={`${option.value}-${i}`}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownSelect;

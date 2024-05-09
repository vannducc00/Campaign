import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export default function InputField(props) {
  const { name, label, control, error, isFullWidth, type, changes, value } = props;

  return (
    <Controller
      render={({
        field,
      }) => {
        return (
          <TextField
            id="standard-basic"
            variant="standard"
            label={label || ""}
            fullWidth = {!isFullWidth}
            {...field}
            error = {!!error[name]}
            helperText = {error[name]?.message}
            type={type || "text"}
            onChange={(e)=> changes && changes(e)}
            value={value}
          />
        );
      }}
      control={control}
      name={name}
    />
  );
}

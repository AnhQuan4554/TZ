import { FormHelperText, InputLabel } from '@mui/material';
import React, { FC } from 'react';
import CreatableSelect from 'react-select/creatable';

interface Props {
  onChange: (values: string[]) => void;
  options: { value: string; label: string }[];
  values?: string[];
  error?: string | string[] | undefined;
  label?: string;
}

export const CreatableMultiSelect: FC<Props> = (props) => {
  const { onChange, options, values, error, label } = props;
  const defaultValue = values
    ? values.map((value) => ({ value, label: value }))
    : undefined;
  let errorMessage;
  if (error) {
    if (Array.isArray(error)) {
      errorMessage = error.join(', ');
    } else {
      errorMessage = error;
    }
  }
  return (
    <>
      {label && <InputLabel sx={{ marginTop: 3 }}>{label}</InputLabel>}
      <CreatableSelect
        isMulti
        styles={{
          menu: (base) => ({ ...base, zIndex: 9999, position: 'relative' }),
        }}
        value={defaultValue}
        onChange={(selections) =>
          onChange(selections.map((value) => value.value))
        }
        options={options}
      />
      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </>
  );
};

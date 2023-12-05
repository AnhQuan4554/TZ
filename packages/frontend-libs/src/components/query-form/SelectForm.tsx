import type { FC } from 'react';
import { FormControl, FormLabel, Select, MenuItem } from '@mui/material';

export interface ISelectFormProps {
  title: string;
  options: any[];
  value: string;
  onUpdate: Function;
  dataTestId?: string;
  customStyle?: any;
}

export const SelectForm: FC<ISelectFormProps> = ({
  title,
  options,
  value,
  onUpdate,
  dataTestId,
  customStyle,
}) => {
  return (
    <FormControl
      component="fieldset"
      sx={{ top: 3, width: '100%', ...customStyle }}
      data-test-id={dataTestId}
    >
      <FormLabel component="legend" style={{ marginBottom: '8px' }}>
        {title}
      </FormLabel>
      <Select
        className="select-form"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        variant="outlined"
        sx={{
          width: '100%',
        }}
        onChange={(e) => {
          onUpdate(e.target.value);
        }}
      >
        <MenuItem value="all" key="all">
          All
        </MenuItem>
        {options.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

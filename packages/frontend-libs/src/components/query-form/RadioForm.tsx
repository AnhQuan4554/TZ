import type { FC } from 'react';
import { FormControl, RadioGroup, FormLabel, FormControlLabel, Radio } from '@mui/material';

export interface IRadioFormProps {
  title: string;
  options: any[];
  value: string;
  onUpdate: Function;
  dataTestId?: string;
}

export const RadioForm: FC<IRadioFormProps> = ({ title, options, value, onUpdate, dataTestId }) => {
  return (
    <FormControl component="fieldset" sx={{ width: '100%' }} data-test-id={dataTestId}>
      <FormLabel component="legend" sx={{ pt: 2 }}>
        {title}
      </FormLabel>
      <RadioGroup
        row
        aria-label="status"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={(e) => {
          onUpdate(e.target.value);
        }}
      >
        {options.map((item) => {
          return (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={<Radio />}
              label={item.label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

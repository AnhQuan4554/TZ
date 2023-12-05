import CircleCheckedFilled from '@mui/icons-material/CheckCircle';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import { Checkbox } from '@mui/material';

function CheckboxWrapper(props: any) {
  return (
    <Checkbox
      icon={<CircleUnchecked />}
      checkedIcon={<CircleCheckedFilled />}
      {...props}
      style={{
        color: 'rgb(101, 116, 139)',
      }}
    />
  );
}
export default CheckboxWrapper;

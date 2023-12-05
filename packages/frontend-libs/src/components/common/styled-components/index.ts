import { styled } from '@mui/material/styles';
import { Box, Card, Grid } from '@mui/material';

export const JustifyContentCenterBox = styled(Box)(() => ({
  justifyContent: 'center',
  display: 'flex',
  width: '100%',
}));

export const AlignJustifyFlexEndGrid = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
}));

export const AlignJustifyCenterGrid = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const AlignJustifyCenterCard = styled(Card)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const AlignItemsCenterCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
}));

export const AlignCenterJustifySpaceAroundBox = styled(Box)(() => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-around',
}));

export const AlignJustifyTextAlignCenterGrid = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
}));

export const AlignItemsCenterGrid = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const JustifySpaceBetweenBox = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
}));

export const JustifySpaceBetweenGrid = styled(Grid)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
}));

export const AlignCenterJustifySpaceBetweenBox = styled(Box)(() => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
}));

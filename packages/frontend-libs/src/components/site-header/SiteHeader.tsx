import type { FC } from 'react';
import { useRef, useState } from 'react';
import { Grid } from '@mui/material';
import { SiteSelectedPopOver } from './SiteSelectedPopOver';
import {
  StyledArrowDropUpIcon,
  StyledArrowDropDownIcon,
  StyledHeadingTopTypography,
  StyledSelectSiteText,
} from './styles/TitleHeaderStyle';

export interface ISiteHeaderProps {
  header: string;
  selectSiteHeader: string;
  siteAddress: string;
  siteName: string;
  dataTestId?: string;
}
export const SiteHeader: FC<ISiteHeaderProps> = ({
  header,
  dataTestId,
  selectSiteHeader,
  siteAddress,
  siteName,
}) => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const handleOpenPopover = (): void => {
    setOpenPopover(true);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(false);
  };

  return (
    <Grid
      data-test-id={dataTestId}
      item
      xs={12}
      sm={6}
      md={6}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <StyledHeadingTopTypography data-test-id={`${dataTestId}-title`} variant="h1">
        {header}
      </StyledHeadingTopTypography>
      <StyledSelectSiteText onClick={handleOpenPopover}>{selectSiteHeader}</StyledSelectSiteText>
      {openPopover ? (
        <StyledArrowDropUpIcon data-test-id={`${dataTestId}-arrow-up`} />
      ) : (
        <StyledArrowDropDownIcon data-test-id={`${dataTestId}-arrow-down`} />
      )}
      <SiteSelectedPopOver
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
        dataTestId={`${dataTestId}-site`}
        siteAddress={siteAddress}
        siteName={siteName}
      />
    </Grid>
  );
};

import type { FC } from 'react';
import { Grid, Box } from '@mui/material';
import { capitalizeFirstLetter, Loading } from '@tymlez/frontend-libs';
import {
  StyledBannerBackgroundGrid,
  StyledBannerGrid,
  StyledContentForBannerGrid,
  StyledMainContentGrid,
  StyledMainContentText,
  StyledParamInBannerGrid,
  StyledProjectImg,
  StyledSubTitleText,
  StyledTitleText,
  StyledValueSpan,
} from './styled-components';
import { useTrustChainSiteInfo } from '../../hooks/useSiteInfo';

export const TrustChainSiteBanner: FC = () => {
  const { data: trustChainInfo } = useTrustChainSiteInfo();

  if (!trustChainInfo) {
    return <Loading />;
  }

  const dataCarbon = [
    {
      title: 'Date Deployed',
      value: trustChainInfo?.dateDeployed,
    },
    {
      title: 'MRV Reading Granularity',
      value: '5 minutes',
    },
    {
      title: 'Hedera Network',
      value: capitalizeFirstLetter(trustChainInfo?.network || ''),
    },
  ];

  return (
    <StyledBannerBackgroundGrid
      sx={{
        backgroundImage: `url(${trustChainInfo.bannerImage})`,
      }}
    >
      <StyledBannerGrid>
        <StyledContentForBannerGrid item>
          <StyledProjectImg src={trustChainInfo.profileImage} alt="project" />
          <StyledMainContentGrid>
            <StyledMainContentText>
              Project: {trustChainInfo.name}
            </StyledMainContentText>
            <StyledSubTitleText>
              About : {trustChainInfo.about}
            </StyledSubTitleText>
          </StyledMainContentGrid>
        </StyledContentForBannerGrid>
        <StyledParamInBannerGrid item xs={12} sm={8} md={8}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 1, sm: 3, md: 3 }}
              columns={{ xs: 12, sm: 12, md: 12 }}
            >
              {dataCarbon.map((item: any) => (
                <Grid item xs={6} sm={4} md={4} key={item.title}>
                  <StyledTitleText>{item.title}</StyledTitleText>
                  <StyledValueSpan>{item.value}</StyledValueSpan>
                </Grid>
              ))}
            </Grid>
          </Box>
        </StyledParamInBannerGrid>
      </StyledBannerGrid>
    </StyledBannerBackgroundGrid>
  );
};

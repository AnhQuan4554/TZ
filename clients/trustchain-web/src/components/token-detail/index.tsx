import type { NextPage } from 'next';
import { Grid, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Loading, AuthGuard, useBreakpoint } from '@tymlez/frontend-libs';
import { MainLayout } from '../../layout/Main';
import { TokenTimelineComponent } from './TokenTimeline';
import { Image } from '../../utils/Image';
import hederaImage from '../../../public/images/hedera.png';
import {
  StyledAvatar,
  StyledAvatarImage,
  StyledBackToGrid,
  StyledBackToText,
  StyledBannerImage,
  StyledBtnGrid,
  StyledImageBox,
  StyledImgGrid,
  StyledInforDetailGrid,
  StyledInforText,
  StyledIntroduceGrid,
  StyledLedgerWorksGrid,
  StyledMainGrid,
  StyledMemoText,
  StyledMemoValueText,
  StyledNameTokenText,
  StyledSizeTokenImage,
  StyledStatusText,
  StyledTokenKeyGrid,
  StyledTokenKeyText,
  StyledValueInforText,
  StyledValueTokenText,
} from './styled-components';
import { useGetTokenDetails } from '../../hooks/useTokensData';
import { useTrustChainSiteInfo } from '../../hooks/useSiteInfo';

const Item = styled('div')(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const DidItemDataHash = styled('div')(({ theme }) => ({
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column-reverse',
}));

export const Token: NextPage = () => {
  const isSmallScreen = useBreakpoint('sm', 'down');
  const router = useRouter();
  const { query } = router;
  const { id, accountId, type } = query;
  const { data: token } = useGetTokenDetails(id, accountId);
  const { data: trustChainInfo } = useTrustChainSiteInfo();

  const params = {
    type: type || '',
    accountId,
  };

  const bannerImage = trustChainInfo ? `.${trustChainInfo.bannerImage}` : '';

  if (token) {
    return (
      <>
        <Head>
          <title>Token detail</title>
        </Head>
        {!isSmallScreen && (
          <>
            <Link
              href={{
                pathname: '/',
                query: {
                  ...params,
                }, // the data
              }}
              passHref
            >
              <StyledBackToGrid>
                <img src="../icons/other/returnArrow.svg" alt="Arow return" />
                <StyledBackToText>Back to Tokenised Assets</StyledBackToText>
              </StyledBackToGrid>
            </Link>
            <Grid container sx={{ maxHeight: '250px' }}>
              <Grid item xs={12} sx={{ height: '100%' }}>
                <StyledBannerImage src={bannerImage} alt="home" />
              </Grid>
            </Grid>
          </>
        )}

        {token && (
          <StyledMainGrid>
            {isSmallScreen && (
              <Grid container>
                <Grid item xs={12}>
                  <StyledBannerImage src={bannerImage} alt="home" />
                </Grid>
              </Grid>
            )}

            <StyledAvatar>
              <StyledAvatarImage
                data-test-id="trustchain-token-detail-image"
                src={token.image}
                alt="token avatar"
              />
            </StyledAvatar>

            <StyledIntroduceGrid data-test-id="trustchain-token-detail-data-info">
              <Grid>
                <StyledNameTokenText>{token.name}</StyledNameTokenText>
                <StyledValueTokenText>#{token.id}</StyledValueTokenText>
              </Grid>
            </StyledIntroduceGrid>

            <StyledImgGrid container spacing={1}>
              <Grid item xs={6} md={8} sx={{ display: 'flex' }}>
                <Grid sx={{ mr: 2 }}>
                  <Tooltip title={token.nftInfo.tooltip}>
                    <img src={token.nftInfo.image} alt="NFT" />
                  </Tooltip>
                </Grid>
                <Grid>
                  <Tooltip title={token.carbonIconTooltip}>
                    <img src={token.carbonIcon} alt="Carbon" />
                  </Tooltip>
                </Grid>
              </Grid>
            </StyledImgGrid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <Grid container>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={4}
                    data-test-id="trustchain-token-detail-root-authority-acount"
                  >
                    <Item>
                      <StyledInforText>Root Authority Account:</StyledInforText>
                      <StyledValueInforText>
                        {token.rootAccount}
                      </StyledValueInforText>
                    </Item>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={4}
                    data-test-id="trustchain-token-detail-token-value"
                  >
                    <Item>
                      <StyledInforText>Token Value:</StyledInforText>
                      <StyledValueInforText>
                        {token.value} {token.uom}
                      </StyledValueInforText>
                    </Item>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={4}
                    data-test-id="trustchain-token-detail-datetime"
                  >
                    <Item>
                      <StyledInforText>Mint Time:</StyledInforText>
                      <StyledValueInforText>
                        {token.mintDateTime}
                      </StyledValueInforText>
                    </Item>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                data-test-id="trustchain-token-detail-verifiable-presentation"
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Item>
                      <StyledInforText>Verifiable Presentation</StyledInforText>
                      <StyledValueInforText>
                        {token.verifiablePresentation}
                      </StyledValueInforText>
                    </Item>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <Grid container>
                  <Grid item sm={6} md={4}>
                    <StyledStatusText>Status</StyledStatusText>
                    <img src="../images/verified_images.svg" alt="verified" />
                  </Grid>
                  <Grid
                    item
                    sm={6}
                    md={4}
                    data-test-id="trustchain-token-detail-memo"
                  >
                    <StyledMemoText>Memo</StyledMemoText>
                    <StyledMemoValueText>{token.memo}</StyledMemoValueText>
                  </Grid>
                  <Grid item sm={6} md={4} />
                </Grid>
              </Grid>
              <Grid item sm={12} md={6} sx={{ display: 'flex' }}>
                <Grid container>
                  <StyledTokenKeyGrid item xs={12}>
                    <StyledTokenKeyText>Token Keys</StyledTokenKeyText>
                    <Tooltip title={token.tokenKey} placement="right">
                      <StyledSizeTokenImage
                        src="../images/token_key.svg"
                        alt="icon"
                      />
                    </Tooltip>
                  </StyledTokenKeyGrid>
                </Grid>
              </Grid>
            </Grid>

            <StyledInforDetailGrid container spacing={2}>
              <Grid item xs={12} md={8}>
                <DidItemDataHash>
                  <Grid data-test-id="trustchain-token-detail-data-hash">
                    <StyledInforText sx={{ mt: 1 }}>
                      Data Hash (MD5):
                    </StyledInforText>
                    <StyledValueInforText>
                      {token.dataHash}
                    </StyledValueInforText>
                  </Grid>
                </DidItemDataHash>
              </Grid>
              <StyledBtnGrid item xs={12} md={4}>
                <StyledImageBox>
                  <Image src={hederaImage} />
                </StyledImageBox>
              </StyledBtnGrid>
            </StyledInforDetailGrid>
            <TokenTimelineComponent
              data={token.tokenTimeline}
              dataTestId="trustchain-token-detail-root-authority-acount"
            />
            <StyledLedgerWorksGrid
              onClick={() => {
                window.open(token.ledgerWorksLink, '_blank');
              }}
            >
              <img
                src="../images/ledgerWorksExploreLogo.png"
                alt="ledger works"
                style={{ width: '120px' }}
              />
            </StyledLedgerWorksGrid>
          </StyledMainGrid>
        )}
      </>
    );
  }

  return (
    <Grid sx={{ margin: 'auto', paddingTop: '100px' }}>
      <Loading />
    </Grid>
  );
};

Token.getLayout = (page) => (
  <AuthGuard>
    <MainLayout>{page}</MainLayout>
  </AuthGuard>
);

import type { FC } from 'react';
import { Grid, Tooltip } from '@mui/material';
import {
  StyledComonGrid,
  StyledDottedBox,
  StyledIconImg,
  StyledIdText,
  StyledImage,
  StyledImageCardGrid,
  StyledItemPaper,
  StyledNameCardGrid,
  StyledNameCardText,
  StyledRootAccountGrid,
  StyledRootAuthorityAccountText,
  StyledRootValueText,
  StyledTitleDetailGrid,
  StyledTokenDateAndValueGrid,
  StyledTokenGrid,
  StyledTokenText,
  StyledValueTokenSpan,
} from './styled-components';

interface TokenTileProps {
  tokenData: any;
  dataTestId?: string;
  onClick: () => void;
}

export const TokenTile: FC<TokenTileProps> = ({
  tokenData,
  dataTestId,
  onClick,
}) => {
  return (
    <StyledItemPaper onClick={onClick}>
      {/* Start IMG and Token's name */}
      <Grid container spacing={1}>
        <Grid item xs={4} sm={5} sx={{ height: 'fit-content' }}>
          <StyledImageCardGrid>
            <StyledImage
              data-test-id={`${dataTestId}-img`}
              src={tokenData.image}
              alt="token_image"
            />
          </StyledImageCardGrid>
        </Grid>
        <Grid item xs={8} sm={7}>
          <StyledNameCardGrid>
            <StyledNameCardText>{tokenData.name}</StyledNameCardText>
          </StyledNameCardGrid>
          <Grid>
            <StyledIdText>#{tokenData.id}</StyledIdText>
          </Grid>

          <StyledComonGrid>
            <Grid sx={{ mr: 2 }}>
              <Tooltip title={tokenData.nftInfo.tooltip}>
                <StyledIconImg src={tokenData.nftInfo.image} alt="nft_icon" />
              </Tooltip>
            </Grid>
            <Grid>
              <Tooltip title={tokenData.carbonIconTooltip}>
                <StyledIconImg src={tokenData.carbonIcon} alt="carbon_icon" />
              </Tooltip>
            </Grid>
          </StyledComonGrid>
        </Grid>
      </Grid>
      {/* End IMG and Token's name */}

      {/* Start Token value, Mint Time, Root Authority Account */}
      <StyledTokenGrid>
        <StyledTokenText>Token Value :</StyledTokenText>
        <StyledValueTokenSpan>
          {Number(tokenData.value).toFixed()} {tokenData.uom}
        </StyledValueTokenSpan>
      </StyledTokenGrid>
      <StyledDottedBox />
      <StyledTokenDateAndValueGrid>
        <StyledTitleDetailGrid>
          <StyledRootAuthorityAccountText>
            Mint Time:{' '}
          </StyledRootAuthorityAccountText>
          <StyledRootValueText>{tokenData.mintDateTime}</StyledRootValueText>
        </StyledTitleDetailGrid>
        <StyledRootAccountGrid>
          <StyledRootAuthorityAccountText>
            Root Authority Account:
          </StyledRootAuthorityAccountText>
          <StyledRootValueText>{tokenData.rootAccount}</StyledRootValueText>
        </StyledRootAccountGrid>
      </StyledTokenDateAndValueGrid>
      {/* End Token value, Mint Time, Root Authority Account */}
    </StyledItemPaper>
  );
};

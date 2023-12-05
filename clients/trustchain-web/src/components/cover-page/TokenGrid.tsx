import type { FC } from 'react';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { TokenTile } from './TokenTile';

interface Props {
  tokens: any;
  dataTestId: string;
  raAccountId: string | undefined;
}

export const TokenGrid: FC<Props> = ({ tokens, dataTestId, raAccountId }) => {
  const router = useRouter();

  const handleTokenClick = (tokenData: any) => {
    let route = `/token?id=${tokenData.transaction_id}&type=${
      tokenData.id || ''
    }`;

    if (raAccountId !== undefined) {
      route = `${route}&accountId=${raAccountId || ''}`;
    }
    router.push(route);
  };

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {(tokens || []).map((token: any, index: any) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={2}
                xl={2}
                key={token.transaction_id}
              >
                <TokenTile
                  onClick={() => handleTokenClick(token)}
                  tokenData={token}
                  dataTestId={`${dataTestId}-${index}-token-product`}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

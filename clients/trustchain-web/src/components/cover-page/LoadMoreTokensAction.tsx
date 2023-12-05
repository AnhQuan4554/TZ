import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { Button, Grid } from '@mui/material';
import { Loading } from '@tymlez/frontend-libs';

interface Props {
  isLoading: boolean;
  disabled: boolean;
  loadedTokenCount: number;
  onLoadMore: () => void;
}

export const LoadMoreTokensAction: FC<Props> = ({
  isLoading,
  disabled,
  loadedTokenCount,
  onLoadMore,
}) => {
  const loadBtn = useRef<any>();
  useEffect(() => {
    if (loadedTokenCount > 10) {
      loadBtn.current?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return (
    <Grid
      style={{
        textAlign: 'center',
      }}
      sx={{ my: 4 }}
    >
      <Grid item>
        {isLoading && <Loading dataTestId="trustchain-list-product-loading" />}
        {!isLoading && loadedTokenCount > 0 && (
          <Button
            ref={loadBtn}
            disabled={disabled}
            onClick={() => onLoadMore()}
            variant="outlined"
          >
            Load more
          </Button>
        )}
        {!isLoading && loadedTokenCount === 0 && <p>No tokens found</p>}
      </Grid>
    </Grid>
  );
};

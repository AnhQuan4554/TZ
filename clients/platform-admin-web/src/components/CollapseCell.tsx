import { Button } from '@mui/material';
import { FC, useState } from 'react';

interface ErrorProps {
  error?: string;
  limit: number;
}
export const CollapseCell: FC<ErrorProps> = ({ error, limit }) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  return (
    <>
      {error && error.length <= limit && error}
      {error && error.length > limit && (
        <>
          {showMore ? error : `${error.substring(0, limit)}`}
          <Button size="small" onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show less' : 'Show more'}
          </Button>
        </>
      )}
    </>
  );
};

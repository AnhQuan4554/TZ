import { IconButton, InputBase, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { FC, useState } from 'react';

interface Props {
  filterQuery: string;
  onUpdateQuery: (query: string) => void;
}

export const CustomizedFilter: FC<Props> = ({ filterQuery, onUpdateQuery }) => {
  const [filter, setFilter] = useState<string>(filterQuery);

  const handleSubmit = (event: any) => {
    onUpdateQuery(filter);
    event.preventDefault();
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mr: 3, mt: 3 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Filter"
        inputProps={{ 'aria-label': 'filter' }}
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

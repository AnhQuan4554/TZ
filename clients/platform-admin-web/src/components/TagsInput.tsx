import { Cancel } from '@mui/icons-material';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

interface tagProps {
  handleDelete: (value: string) => void;
  value: string;
}
const Tags = (props: tagProps) => {
  const { handleDelete, value } = props;
  return (
    <Box
      sx={{
        // background: '#283240',
        background: '#92d050',
        height: '100%',
        display: 'flex',
        padding: '0.4rem',
        margin: '0 0.5rem 0 0',
        justifyContent: 'center',
        alignContent: 'center',
        color: '#ffffff',
      }}
    >
      <Stack direction="row" gap={1}>
        <Typography>{value}</Typography>
        <Cancel
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            handleDelete(value);
          }}
        />
      </Stack>
    </Box>
  );
};

interface Props {
  onChange: (values: string[]) => void;
  values: string[];
}
export default function TagsInput({ onChange, values }: Props) {
  const [tags, setTags] = useState<string[]>(values);
  const tagRef = useRef<any>('');
  const handleDelete = (value: string) => {
    const newTags = tags.filter((val) => val !== value);
    setTags(newTags);
    onChange(newTags);
  };

  useEffect(() => {
    setTags(values);
  }, [values]);

  const onHandleChange = (e: any) => {
    if (e.code === 'Enter' && tagRef.current) {
      const newTags = [...tags, tagRef.current.value];
      setTags(newTags);

      tagRef.current.value = '';
      onChange(newTags);
      e.preventDefault();
    }
  };
  return (
    <Box sx={{ flexGrow: 1, marginTop: 2 }}>
      <TextField
        label="Tags"
        inputRef={tagRef}
        fullWidth
        variant="standard"
        size="small"
        margin="normal"
        placeholder={tags.length < 5 ? 'Enter tags' : ''}
        InputProps={{
          startAdornment: (
            <Box sx={{ display: 'flex', mt: 2 }}>
              {tags.map((data) => (
                <Tags key={data} value={data} handleDelete={handleDelete} />
              ))}
            </Box>
          ),
        }}
        onKeyDown={onHandleChange}
      />
      {/* <Box sx={{ margin: '0 0.2rem 0 0', display: 'flex' }}>
        {tags.map((data) => (
          <Tags value={data} handleDelete={handleDelete} />
        ))}
      </Box> */}
    </Box>
  );
}

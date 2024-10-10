import { IconButton, CircularProgress, IconButtonProps } from '@mui/material';
import React, { ReactNode } from 'react';

type LoadingButtonProps = IconButtonProps & {
  loading: boolean;
  children: ReactNode;
};

const LoadingIconButton: React.FC<LoadingButtonProps> = ({ loading, children, ...props }) => {
  return (
    <IconButton {...props} disabled={loading || props.disabled}>
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </IconButton>
  );
};

export default LoadingIconButton;

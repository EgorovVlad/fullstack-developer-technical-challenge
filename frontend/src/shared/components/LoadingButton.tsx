import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import React, { ReactNode } from 'react';

type LoadingButtonProps = ButtonProps & {
  loading: boolean;
  children: ReactNode;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({ loading, children, ...props }) => {
  return (
    <Button {...props} disabled={loading || props.disabled}>
      {children}
      {loading && <CircularProgress size={24} color="inherit" style={{ marginLeft: 8 }} />}
    </Button>
  );
};

export default LoadingButton;

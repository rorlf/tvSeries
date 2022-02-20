import React, { ReactNode } from 'react';

// Components
import { Error, Loading } from 'shared/components';

// Styles
import useStyles from './styles';

interface Props {
  isLoading?: boolean;
  hasError: boolean;
  children: ReactNode;
  errorMessage: string;
  onPressRetry: () => void;
}

export const LoadingAndErrorHandler = ({
  isLoading,
  hasError,
  errorMessage,
  children,
  onPressRetry,
}: Props) => {
  const styles = useStyles();

  if (isLoading) return <Loading style={styles.loading} />;

  if (hasError)
    return <Error message={errorMessage} onPressRetry={onPressRetry} />;

  return <>{children}</>;
};

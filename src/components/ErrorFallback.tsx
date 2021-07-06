import styles from 'components/ErrorFallback.module.scss';
import { useHistory } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';

import MessageDisplay from './MessageDisplay';
import Button from './Button';


const ErrorFallback = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const history = useHistory();

  return (
    <ErrorBoundary
      onError={(error) =>
        console.error('ErrorBoundary error', error)
      }
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <MessageDisplay
          className={styles.errorDisplay}
          severity='error'
          iconCode='error'
          message={
            <div className={styles.errorInner}>
              <p>Something went wrong</p>
              <div className={styles.errorMsg} >
                <p>Received the following error:</p>
                <pre>{error.message}</pre>
              </div>
              <Button
                styledAs='bigWhite'
                onClick={() => {
                  resetErrorBoundary();
                  history.push('/');
                }}
              >
                Return Home
              </Button>
            </div>
          }
        />
      )}
    >
      {children}
    </ErrorBoundary >
  );
};

export default ErrorFallback;

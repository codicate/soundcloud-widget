import styles from './MessageDisplay.module.scss';

function MessageDisplay({
  iconCode,
  message,
  className,
  severity = 'default',
  ...props
}: {
  iconCode: string;
  message: string;
  severity?: 'default' | 'warning' | 'error';
} & React.HTMLAttributes<HTMLDivElement>
) {
  return (
    <div
      className={`
        ${styles.rejected} 
        ${styles[severity]} 
        ${className || ''}
      `}
      {...props}
    >
      <div className='material-icons'>
        {iconCode}
      </div>
      {message}
    </div>
  );
}

export default MessageDisplay;

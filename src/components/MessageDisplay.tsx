import styles from './MessageDisplay.module.scss';
import cn from 'classnames';

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
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  return (
    <div
      className={cn(
        styles.rejected,
        styles[severity],
        className
      )}
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

import styles from './Button.module.css';

interface Props {
  palette?: 'primary' | 'secondary' | 'carbon' | 'danger';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: any;
  children: React.ReactNode;
}

export default function Button({
  palette,
  fullWidth,
  disabled,
  onClick,
  children,
}: Props) {
  const classes = `${palette ? styles[palette] : styles['primary']} ${
    fullWidth ? styles['full'] : ''
  } ${styles['button']}`;

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick ? onClick : () => {}}
    >
      {children}
    </button>
  );
}

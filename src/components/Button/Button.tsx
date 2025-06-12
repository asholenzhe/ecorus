import './button.css'

interface ButtonProps{
    children: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
}
const Button: React.FC<ButtonProps> = ({
                                            children,
                                            onClick,
                                            className = '',
                                        }) => {
    const classes = ['btn', className].filter(Boolean).join(' ');
    return <button className={classes} onClick={onClick} >{children}</button>
}

export default Button
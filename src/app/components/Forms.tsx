interface ButtonStyleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
    buttontype?: string | null;
    children?: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

export function ButtonStyle({ text, children, className, buttontype, startIcon, endIcon, onClick, ...props }: ButtonStyleProps) {
    let buttonStyle = 'btn p-2 rounded cursor-pointer w-50 mx-auto';

    if (startIcon || endIcon) {
        buttonStyle += ' flex items-center justify-center gap-2';
    }

    if (className) {
        buttonStyle += ` ${className ?? ""}`;
    }

    switch (buttontype) {
        case 'primary':
            buttonStyle += ' text-white bg-blue-500 hover:bg-blue-600';
            break;
        case 'secondary':
            buttonStyle += ' border border-black text-black bg-transparence hover:bg-gray-100';
            break;
        case 'tertiary':
            buttonStyle += ' text-white bg-green-500 hover:bg-green-600';
            break;
        case 'danger':
            buttonStyle += ' text-white bg-red-500 hover:bg-red-600';
            break;
        case 'warning':
            buttonStyle += ' text-white bg-yellow-500 hover:bg-yellow-600';
            break;
        default:
            buttonStyle += ' btn-primary';
            break;
    }

    return (
        <button className={buttonStyle} onClick={onClick} {...props}>{startIcon}{text}{children}{endIcon}</button>
    );
}

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
    buttontype?: string;
    icon: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function IconButton({ icon, buttontype = 'primary', className, onClick, ...props }: IconButtonProps) {
    let buttonStyle = 'h-10 w-10 border rounded cursor-pointer flex items-center justify-center';

    if (className) {
        buttonStyle += ` ${className ?? ""}`;
    }

    switch (buttontype) {
        case 'primary':
            buttonStyle += ' text-white bg-blue-500 hover:bg-blue-600';
            break;
        case 'secondary':
            buttonStyle += ' border border-black text-black bg-transparence hover:bg-gray-100';
            break;
        case 'tertiary':
            buttonStyle += ' text-white bg-green-500 hover:bg-green-600';
            break;
        case 'danger':
            buttonStyle += ' text-white bg-red-500 hover:bg-red-600';
            break;
        case 'warning':
            buttonStyle += ' text-white bg-yellow-500 hover:bg-yellow-600';
            break;
        default:
            buttonStyle += ' btn-primary';
            break;
    }
    return (
        <div className={buttonStyle} onClick={onClick} {...props}>{icon}</div>
    );
}

interface InputStyleProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string | number;
    label?: string;
    id?: string;
    className?: string;
    small?: boolean;
    middle?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputStyle({ value, label, id, className, small, middle, onChange, ...props }: InputStyleProps) {
    return (
        <div className={`${small ? '!w-10' : 'w-96'} ${middle ? '!w-16' : 'w-96'} border rounded h-10 relative`}>
            <label className="absolute -top-6 left-2 font-bold" htmlFor="id">{label}</label>
            <input id={id} className={` w-full h-full p-2 ${className ?? ""}`} {...props} value={value} onChange={onChange} />
        </div>
    );
}
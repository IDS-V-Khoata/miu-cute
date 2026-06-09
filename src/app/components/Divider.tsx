interface DividerProps {
    color?: string;
    className?: string;
}
export default function Divider({ color, className }: DividerProps) {
    return (
        <div className={`bg-${color ? color : 'gray-400'} h-[1px] w-full ${className} `}></div>
    );
}
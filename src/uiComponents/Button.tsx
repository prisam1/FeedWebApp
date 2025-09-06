
interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  disabled: boolean
}


export const Button = ({ text, onClick, className = "", disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-semibold text-white ${disabled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-500 hover:bg-blue-600"
        } ${className}`}
    >
      {text}
    </button>
  );
};

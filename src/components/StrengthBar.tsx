import { StrengthBarType } from "../types/types";
import { usePasswordStrength } from "../hooks/useStrengthBar";

interface StrengthBarProps {
  password: string;
}

export const StrengthBar = ({ password }: StrengthBarProps) => {
  const strength: StrengthBarType = usePasswordStrength(password);

  return (
    <div className="mt-2">
      {/* Bars */}
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded ${
              i <= strength.level ? strength.barColor : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Label */}
      <p className={`text-sm mt-1 font-semibold ${strength.textColor}`}>
        {strength.label}
      </p>
    </div>
  );
};

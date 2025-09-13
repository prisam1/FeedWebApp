import { useEffect, useState } from "react";
import { StrengthBarType } from "../types/types";

export const usePasswordStrength = (password: string) => {
  const [strength, setStrength] = useState<StrengthBarType>({
    level: 0,
    label: "Poor",
    barColor: "bg-gray-300",
    textColor: "text-gray-400",
  });

  useEffect(() => {
    if (!password) {
      setStrength({
        level: 0,
        label: "Poor",
        barColor: "bg-gray-300",
        textColor: "text-gray-400",
      });
      return;
    }

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
      setStrength({
        level: 1,
        label: "Poor",
        barColor: "bg-red-500",
        textColor: "text-red-500",
      });
    } else if (score === 3) {
      setStrength({
        level: 2,
        label: "Weak",
        barColor: "bg-yellow-400",
        textColor: "text-yellow-500",
      });
    } else if (score === 4) {
      setStrength({
        level: 3,
        label: "Good",
        barColor: "bg-blue-500",
        textColor: "text-blue-500",
      });
    } else {
      setStrength({
        level: 4,
        label: "Excellent",
        barColor: "bg-green-500",
        textColor: "text-green-500",
      });
    }
  }, [password]);

  return strength;
};

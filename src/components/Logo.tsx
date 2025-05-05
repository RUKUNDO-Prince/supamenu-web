
import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "dark" | "light";
  size?: "small" | "medium" | "large";
}

const Logo = ({ variant = "light", size = "medium" }: LogoProps) => {
  const baseClasses = "font-bold";
  
  const sizeClasses = {
    small: "text-xl",
    medium: "text-2xl",
    large: "text-4xl",
  };

  return (
    <Link to="/" className={`${baseClasses} ${sizeClasses[size]} flex items-center`}>
      <span className={variant === "light" ? "text-white" : "text-black"}>
        Supa
      </span>
      <span className="text-orange-500">Menu</span>
    </Link>
  );
};

export default Logo;

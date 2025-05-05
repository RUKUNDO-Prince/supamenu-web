import React from "react";

interface TextLogoProps {
   size?: "small" | "medium" | "large";
   className?: string;
}

const TextLogo: React.FC<TextLogoProps> = ({
   size = "medium",
   className = "",
}) => {
   let fontSize = "text-3xl";
   if (size === "small") fontSize = "text-xl";
   if (size === "large") fontSize = "text-5xl";

   return (
      <div className={`font-bold ${fontSize} ${className}`}>
         <span className="text-black">Supa</span>
         <span className="text-white">Menu</span>
      </div>
   );
};

export default TextLogo;

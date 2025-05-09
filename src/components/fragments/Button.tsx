import { forwardRef, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "outline" | "custom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", className = "", ...props }, ref) => {
    const baseStyles =
      "px-5 py-2 rounded-full font-semibold transition duration-200 cursor-pointer";

    const variants: Record<Variant, string> = {
      primary: "bg-blue-btn text-white",
      outline: "border ",
      custom: "",
    };

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

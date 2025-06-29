import * as React from "react";
import { Eye, EyeOff } from "lucide-react"; // lucide iconlari
import { cn } from "../../lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { withToggle?: boolean }
>(({ className, type, withToggle, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === "password" && withToggle;

  return (
    <div className="relative w-full">
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
});
Input.displayName = "Input";

export { Input };

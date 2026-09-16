import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-2 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-7 py-3.5 gap-2.5 font-semibold",
    };

    const variantStyles = {
      primary:
        "bg-[#0B132B] text-white hover:bg-[#1E293B] shadow-sm hover:shadow-md focus-visible:ring-[#0B132B]",
      secondary:
        "bg-white/80 backdrop-blur-md text-[#0B132B] border border-slate-200/80 hover:bg-white hover:border-slate-300 shadow-sm",
      glass:
        "bg-white/70 backdrop-blur-lg text-[#0B132B] border border-white/80 hover:bg-white/90 shadow-sm",
      outline:
        "bg-transparent text-[#0B132B] border border-slate-300 hover:bg-slate-50",
      white:
        "bg-white text-[#0B132B] hover:bg-slate-100 shadow-sm hover:shadow",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

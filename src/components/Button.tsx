import Link from "next/link";
import type { ComponentPropsWithRef } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
}

const baseClasses =
  "win95-btn inline-block text-center no-underline cursor-pointer";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[#FF00FF] text-white",
  secondary: "bg-[#C0C0C0] text-black",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...buttonProps
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

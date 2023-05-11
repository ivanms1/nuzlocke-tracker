import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button className={clsx("p-3", className)} {...props}>
      {children}
    </button>
  );
}

export default Button;

import { cn } from "@/lib/utils";

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("container px-5 max-w-[1368px] mx-auto", className)}>
      {children}
    </div>
  );
};

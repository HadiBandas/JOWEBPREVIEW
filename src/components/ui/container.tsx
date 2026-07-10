import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
    return (
        <div
            className={cn(
                "mx-auto w-full px-5 sm:px-8 md:px-12",
                "max-w-[1800px]",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

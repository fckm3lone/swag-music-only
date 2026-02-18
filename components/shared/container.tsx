import React, { PropsWithChildren } from 'react';
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
}

export const Container: React.FC<PropsWithChildren<Props>> = ({ className, children }) => {
    return (
        <div className={cn('mx-auto w-full max-w-[1520px] px-0 md:px-8 lg:px-16 xl:px-25 min-[1550px]:px-0', className)}>
            {children}
        </div>
    );
};

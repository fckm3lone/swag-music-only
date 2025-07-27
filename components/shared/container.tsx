import React, { PropsWithChildren } from 'react';
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
}

export const Container: React.FC<PropsWithChildren<Props>> = ({ className, children }) => {
    return (
        <div className={cn('mx-auto max-w-[1520px]', className)}>
            {children}
        </div>
    );
};


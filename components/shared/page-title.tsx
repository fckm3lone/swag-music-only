import React from "react";
import { cn } from "@/lib/utils";
import {Container} from "@/components/shared";

interface PageTitleProps {
    title: string;
    className?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, className }) => {
    return (
        
        <div className={cn("text-left my-4", className)}>
            <h2 className="text-lg font-ultra-light tracking-widest text-foreground">{title}</h2>
            <div className="border mx-auto mt-2" />
        </div>
       
    );
};

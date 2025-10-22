import {Header} from "@/components/shared/header";
import {Suspense} from "react";


export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Suspense>
            <Header showSearch={true} />
            </Suspense>
            {children}
        </>
    );
}

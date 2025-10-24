import {Header} from "@/components/shared/header";
import {Suspense} from "react";


export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Suspense fallback={null}>
            <Header showSearch={true} />
            </Suspense>
            {children}
        </>
    );
}

// app/(other)/layout.tsx

import {Header} from "@/components/shared/header";
import {Suspense} from "react";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-card min-h-screen">
            <Suspense fallback={null}>
            <Header showSearch={false} />
            </Suspense>
            {children}
        </div>
    );
}

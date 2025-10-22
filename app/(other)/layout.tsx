// app/(other)/layout.tsx

import {Header} from "@/components/shared/header";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-card min-h-screen">
            <Header showSearch={false} />
            {children}
        </div>
    );
}

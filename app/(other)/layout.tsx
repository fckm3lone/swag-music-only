import { Header } from "@/components/shared/header";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header showSearch={false} />
            {children}
        </>
    );
}

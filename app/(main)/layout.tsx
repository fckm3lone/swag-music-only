import { Header } from "@/components/shared/header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header showSearch={true} />
            {children}
        </>
    );
}

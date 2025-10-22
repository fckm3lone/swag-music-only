"use client";
import {Toaster} from 'react-hot-toast';
import {SessionProvider} from "next-auth/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode, useState} from "react";
import NextTopLoader from 'nextjs-toploader';

export function Providers({ children }: { children: ReactNode }) {
    // создаём queryClient один раз
    const [queryClient] = useState(() => new QueryClient());

    return (


        <QueryClientProvider client={queryClient}>
            <SessionProvider >
            {children}
            <Toaster toastOptions={{
                success: {
                    iconTheme: {
                        primary: '#FEA613FF',
                        secondary: 'white',
                    },
                },
            }}/>
                <NextTopLoader
                    color="#D9D9D9"
                    shadow="0 0 4px #D9D9D9"
                    height={3}
                />
            </SessionProvider>
        </QueryClientProvider>
    );
}

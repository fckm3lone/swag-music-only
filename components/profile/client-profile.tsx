'use client'

import {Container} from '@/components/shared/container';
import React, {useEffect, useRef, useState} from 'react';
import {PageTitle} from '@/components/shared/page-title';
import ProfileForm from "@/components/profile/profile-form";
import OrdersList from "@/components/profile/orders-list";
import ProfileMenu from "@/components/profile/profile-menu";
import ProfileMenuDrawer from "@/components/profile/profile-menu-drawer";

export function ClientProfile({ user }: { user: any }) {
    const [activeSection, setActiveSection] = useState('profile');
    const profileRef = useRef<HTMLDivElement>(null);
    const ordersRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            },
            {
                rootMargin: '-50% 0px -50% 0px',
                threshold: 0,
            }
        );

        if (profileRef.current) observer.observe(profileRef.current);
        if (ordersRef.current) observer.observe(ordersRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <Container>
            <PageTitle title="PROFILE" className="mb-10"/>
            <div className='flex flex-row gap-10 justify-between'>
                <div className='flex flex-col gap-10 max-w-230'>
                    <div id="profile" ref={profileRef}>
                        <ProfileForm data={user} />
                    </div>
                    <div id="orders" ref={ordersRef}>
                        <OrdersList />
                    </div>
                </div>
                <div className='hidden md:flex basis-97.5 grow shrink max-w-100 max-[1350px]:max-w-230'>
                    <ProfileMenu active={activeSection} setActive={setActiveSection} />
                </div>
                <div className='md:hidden absolute top-0 right-0 z-[9999]'>
                    <ProfileMenuDrawer active={activeSection} setActive={setActiveSection} />
                </div>
            </div>
        </Container>
    );
}
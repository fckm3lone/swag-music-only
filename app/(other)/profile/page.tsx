import React from 'react';
import {getUserSession} from "@/lib/get-user-session";
import {redirect} from 'next/navigation';
import prisma from '@/prisma/prisma-client';
import {ClientProfile} from "@/components/profile/client-profile";

export default async function ProfilePage () {
  const session = await getUserSession();
  if (!session) return redirect("/?notAuth");

  const user = await prisma.user.findFirst({ where: { id: Number(session.id) } });
  if (!user) return redirect("/?notAuth");

  return <ClientProfile user={user} />;
}




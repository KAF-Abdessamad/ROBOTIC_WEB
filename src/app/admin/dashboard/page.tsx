import React from "react";
import { requireAdminSession } from "@/lib/auth";
import {
  getAdminApplicationsAction,
  getAdminEventsAction,
  getAdminMembersAction,
  getAdminSettingsAction,
  getAdminMessagesAction,
} from "@/app/actions";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panneau d'Administration | Robotics Club UPF",
  description: "Espace d'administration centralisé du Robotics Club de l'UPF.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();

  const [applications, events, members, settings, messages] =
    await Promise.all([
      getAdminApplicationsAction(),
      getAdminEventsAction(),
      getAdminMembersAction(),
      getAdminSettingsAction(),
      getAdminMessagesAction(),
    ]);

  return (
    <div className="pt-24 sm:pt-28 pb-16 min-h-screen">
      <AdminDashboardClient
        session={session}
        initialData={{
          applications,
          events,
          members,
          settings,
          messages,
        }}
      />
    </div>
  );
}

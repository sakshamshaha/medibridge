import React from "react";
import { CustomerDashboardLayout } from "../../components/CustomerDashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CustomerDashboardLayout>{children}</CustomerDashboardLayout>;
}

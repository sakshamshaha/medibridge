import { RetailerSidebar } from "@/components/RetailerLayoutUI";

export default function RetailerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RetailerSidebar>{children}</RetailerSidebar>;
}

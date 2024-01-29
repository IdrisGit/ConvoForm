"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@convoform/ui/components/ui/tabs";

import { montserrat } from "@/app/fonts";
import { NavLink } from "@/lib/types/navigation";

type Props = {
  formId: string;
};

export default function NavLinks({ formId }: Readonly<Props>) {
  const pathName = usePathname();
  const currentFormId = formId;
  const isAlreadyOnConversationsPage = pathName.includes(`conversations`);

  const tabLinks = [
    {
      path: `/forms/${currentFormId}`,
      name: "Editor",
      isActive: pathName === `/forms/${currentFormId}`,
    },
    {
      name: "Conversations",
      path: isAlreadyOnConversationsPage
        ? ""
        : `/forms/${currentFormId}/conversations`,
      isActive: isAlreadyOnConversationsPage,
    },
  ] as NavLink[];

  const activeTab = tabLinks.find((link) => link.isActive);

  return (
    <Tabs value={activeTab?.name} className="w-full py-3">
      <TabsList className="grid w-full grid-cols-2">
        {tabLinks.map((link) => (
          <TabsTrigger
            value={link.name}
            key={`${link.path}-${link.name}`}
            className={montserrat.className}
            asChild
            disabled={link.disabled}
          >
            <Link href={link.path}>{link.name}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

import { Conversation } from "@convoform/db";
import { Card, CardContent } from "@convoform/ui/components/ui/card";
import { Skeleton } from "@convoform/ui/components/ui/skeleton";
import { FileText } from "lucide-react";

import { timeAgo } from "@/lib/utils";
import { SecondaryNavigation } from "../../common/secondaryNavigation";

interface ConversationsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  conversations: Conversation[];
  formId: string;
}

export function ConversationsCard({
  conversations,
  formId,
}: Readonly<ConversationsCardProps>) {
  const emptyConversations = conversations.length === 0;

  return (
    <Card className="border-0 bg-transparent shadow-none">
      <CardContent className="p-0 lg:pt-6">
        <ConversationList conversations={conversations} formId={formId} />
        {emptyConversations ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm text-gray-500">No Conversations</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

const ConversationsCardSkelton = () => (
  <Card className="border-0 bg-transparent shadow-none">
    <CardContent className="pt-6">
      <h3 className="mb-5 px-4 text-lg font-semibold tracking-tight">
        <Skeleton className="h-5 w-20" />
      </h3>
      <nav className="flex flex-col gap-1">
        <Skeleton className="h-[40px] w-full" />
        <Skeleton className="h-[40px] w-full" />
      </nav>
    </CardContent>
  </Card>
);

ConversationsCard.ConversationsCardSkelton = ConversationsCardSkelton;

const ConversationList = ({
  conversations,
  formId,
}: Readonly<{
  formId: string;
  conversations: Pick<Conversation, "id" | "name" | "createdAt">[];
}>) => {
  const items = conversations.map((conversation) => ({
    href: `/forms/${formId}/conversations/${conversation.id}`,
    title: (
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <FileText className="mr-2" size={20} />
          <span className="capitalize">{conversation.name}</span>
        </div>
        <span className="text-muted-foreground font-light">
          {timeAgo(conversation.createdAt)}
        </span>
      </div>
    ),
  }));

  return <SecondaryNavigation items={items} />;
};
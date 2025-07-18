import { getPrisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";
import PageClient from "./page.client";
import Spinner from "@/components/spinner";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const chat = await getChatById(id);

  if (!chat) notFound();

  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Spinner className="size-8" /></div>}>
      <PageClient chat={chat} />
    </Suspense>
  );
}

const getChatById = cache(async (id: string) => {
  const prisma = getPrisma();
  return await prisma.chat.findFirst({
    where: { id },
    include: { messages: { orderBy: { position: "asc" } } },
  });
});

export type Chat = NonNullable<Awaited<ReturnType<typeof getChatById>>>;
export type Message = Chat["messages"][number];

export const runtime = "edge";
export const maxDuration = 45;

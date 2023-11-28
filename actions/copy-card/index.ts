'use server';

import { auth } from '@clerk/nextjs';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { createSafeAction } from '@/lib/create-safe-action';
import { createAuditLog } from '@/lib/cretae-audit-log';
import { db } from '@/lib/db';

import { CopyCard } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: 'Unauthorized',
        };
    }

    const { id, boardId } = data;
    let card;

    try {
        const cardToCopy = await db.card.findUnique({
            where: {
                id,
                list: {
                    board: {
                        orgId,
                    },
                },
            },
        });

        if (!cardToCopy) {
            return {
                error: 'Card   not found',
            };
        }

        // order position 계산
        const lastCard = await db.card.findFirst({
            where: { listId: cardToCopy.listId },
            orderBy: { order: 'desc' },
            select: { order: true },
        });
        const newOrder = lastCard ? lastCard.order + 1 : 1;

        card = await db.card.create({
            data: {
                title: `${cardToCopy.title} - Copy`,
                description: cardToCopy.description,
                listId: cardToCopy.listId,
                order: newOrder,
            },
        });

        await createAuditLog({
            entityTitle: card.title,
            entityId: card.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.CREATE,
        });
    } catch (error) {
        return {
            error: 'Failed to copy.',
        };
    }

    revalidatePath(`/board/${boardId}`);

    return {
        data: card,
    };
};

export const copyCard = createSafeAction(CopyCard, handler);
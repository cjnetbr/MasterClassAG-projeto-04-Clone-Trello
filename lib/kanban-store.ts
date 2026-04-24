"use client";

import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { initialColumns } from "@/lib/kanban-data";
import type { KanbanCard, KanbanColumn, Priority } from "@/types/kanban";

type MoveResult = {
  moved: boolean;
  changedColumn: boolean;
  toColumnTitle?: string;
  clientEmail?: string;
  cardTitle?: string;
};

type CardPatch = {
  title?: string;
  description?: string;
  priority?: Priority;
  clientEmail?: string;
};

type KanbanState = {
  columns: KanbanColumn[];
  moveCard: (activeId: string, overId: string) => MoveResult;
  addNote: (cardId: string, columnId: string, content: string) => void;
  updateCard: (cardId: string, patch: CardPatch) => void;
  findCard: (cardId: string) => { card: KanbanCard; column: KanbanColumn } | null;
};

function cloneInitialColumns() {
  return structuredClone(initialColumns);
}

function findColumnByCard(columns: KanbanColumn[], cardId: string) {
  return columns.find((column) => column.cards.some((card) => card.id === cardId));
}

function findColumnByOverId(columns: KanbanColumn[], overId: string) {
  return (
    columns.find((column) => column.id === overId) ??
    columns.find((column) => column.cards.some((card) => card.id === overId))
  );
}

function recount(column: KanbanColumn) {
  return {
    ...column,
    count: column.cards.length,
  };
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set, get) => ({
      columns: cloneInitialColumns(),
      moveCard: (activeId, overId) => {
        const columns = get().columns;
        const fromColumn = findColumnByCard(columns, activeId);
        const toColumn = findColumnByOverId(columns, overId);

        if (!fromColumn || !toColumn) {
          return { moved: false, changedColumn: false };
        }

        const activeCard = fromColumn.cards.find((card) => card.id === activeId);
        if (!activeCard) {
          return { moved: false, changedColumn: false };
        }

        const fromIndex = fromColumn.cards.findIndex((card) => card.id === activeId);
        const overCardIndex = toColumn.cards.findIndex((card) => card.id === overId);
        const toIndex = overCardIndex >= 0 ? overCardIndex : toColumn.cards.length;

        if (fromColumn.id === toColumn.id) {
          if (fromIndex === toIndex || fromIndex < 0) {
            return { moved: false, changedColumn: false };
          }

          set({
            columns: columns.map((column) =>
              column.id === fromColumn.id
                ? recount({ ...column, cards: arrayMove(column.cards, fromIndex, toIndex) })
                : column,
            ),
          });

          return { moved: true, changedColumn: false, cardTitle: activeCard.title };
        }

        set({
          columns: columns.map((column) => {
            if (column.id === fromColumn.id) {
              return recount({
                ...column,
                cards: column.cards.filter((card) => card.id !== activeId),
              });
            }

            if (column.id === toColumn.id) {
              const nextCards = [...column.cards];
              nextCards.splice(toIndex, 0, activeCard);
              return recount({ ...column, cards: nextCards });
            }

            return column;
          }),
        });

        return {
          moved: true,
          changedColumn: true,
          toColumnTitle: toColumn.title,
          clientEmail: activeCard.clientEmail,
          cardTitle: activeCard.title,
        };
      },
      addNote: (cardId, columnId, content) => {
        const text = content.trim();
        if (!text) return;

        set({
          columns: get().columns.map((column) => ({
            ...column,
            cards: column.cards.map((card) =>
              card.id === cardId
                ? {
                    ...card,
                    notes: [
                      ...card.notes,
                      {
                        id: crypto.randomUUID(),
                        cardId,
                        columnId,
                        content: text,
                        createdAt: new Date().toISOString(),
                        author: "Cesar Junior",
                      },
                    ],
                  }
                : card,
            ),
          })),
        });
      },
      updateCard: (cardId, patch) => {
        set({
          columns: get().columns.map((column) => ({
            ...column,
            cards: column.cards.map((card) =>
              card.id === cardId ? { ...card, ...patch } : card,
            ),
          })),
        });
      },
      findCard: (cardId) => {
        for (const column of get().columns) {
          const card = column.cards.find((item) => item.id === cardId);
          if (card) return { card, column };
        }

        return null;
      },
    }),
    {
      name: "slothui-kanban-board-pt-br",
      partialize: (state) => ({ columns: state.columns }),
    },
  ),
);

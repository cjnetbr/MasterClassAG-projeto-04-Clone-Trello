"use client";

import { useEffect, useMemo, useState } from "react";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  type DraggableAttributes,
  type DraggableSyntheticListeners,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Code2,
  GripVertical,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageCircle,
  Plus,
  Search,
  Settings,
  Share2,
  Sparkles,
  Star,
  Upload,
  Users,
  WalletCards,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useKanbanStore } from "@/lib/kanban-store";
import { cn } from "@/lib/utils";
import type { Assignee, KanbanCard, KanbanColumn, Priority } from "@/types/kanban";

type ToastState = {
  id: number;
  message: string;
  tone: "success" | "warning";
} | null;

const navItems = [
  { label: "Home", icon: Home, badge: "10", active: true },
  { label: "Tasks", icon: LayoutDashboard },
  { label: "Users", icon: Users, badge: "2" },
  { label: "APIs", icon: Code2 },
  { label: "Subscription", icon: WalletCards },
  { label: "Settings", icon: Settings },
  { label: "Help & Support", icon: CircleHelp },
];

const priorityStyles: Record<Priority, string> = {
  Important: "bg-blue-50 text-blue-700",
  Meh: "bg-violet-50 text-violet-700",
  OK: "bg-amber-50 text-amber-700",
  "High Priority": "bg-red-50 text-red-700",
  "Low Priority": "bg-emerald-50 text-emerald-700",
  "I don't know": "bg-orange-50 text-orange-700",
  "Maybe important": "bg-gray-100 text-gray-600",
  "Not that important": "bg-orange-50 text-orange-700",
};

const priorities = Object.keys(priorityStyles) as Priority[];

const columnStyles = {
  indigo: {
    shell: "bg-[#EEF0FF]",
    header: "bg-[#5B5FEF]",
    badge: "bg-white/20 text-white",
    ring: "ring-[#5B5FEF]",
  },
  amber: {
    shell: "bg-[#FFF5E1]",
    header: "bg-[#F59E0B]",
    badge: "bg-white/25 text-white",
    ring: "ring-[#F59E0B]",
  },
  emerald: {
    shell: "bg-[#EAFBF4]",
    header: "bg-[#10B981]",
    badge: "bg-white/25 text-white",
    ring: "ring-[#10B981]",
  },
};

const tabs = [
  "By Status",
  "By Total Tasks",
  "Tasks Due",
  "Extra Tasks",
  "Tasks Completed",
];

function formatCount(value: number) {
  if (value >= 100000) return `${Math.round(value / 1000)}k`;
  if (value >= 1000) return `${Math.round(value / 100) / 10}K+`;
  return String(value);
}

function relativeTime(isoDate: string) {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.max(1, Math.round(diff / 60000));
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  return `${Math.round(hours / 24)} d ago`;
}

function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-[280px] shrink-0 flex-col bg-[#5B5FEF] px-5 py-6 text-white lg:flex">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-xl font-black text-[#5B5FEF]">
          S
        </div>
        <span className="text-2xl font-bold tracking-normal">slothui</span>
      </div>

      <div className="mb-6 flex h-11 items-center gap-3 rounded-2xl bg-white/15 px-4 text-white/75 ring-1 ring-white/10">
        <Search className="h-5 w-5" />
        <span className="text-sm">Search</span>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={cn(
              "flex h-12 items-center gap-3 rounded-2xl px-4 text-sm font-semibold text-white/78 transition",
              item.active && "bg-white text-[#5B5FEF] shadow-sm",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="flex-1">{item.label}</span>
            {item.badge ? (
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-bold",
                  item.active ? "bg-[#EEF0FF] text-[#5B5FEF]" : "bg-white/18 text-white",
                )}
              >
                {item.badge}
              </span>
            ) : null}
          </a>
        ))}
      </nav>

      <div className="mb-5 rounded-3xl bg-[#7275F4] p-4 ring-1 ring-white/10">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/18">
          <Star className="h-5 w-5 fill-white" />
        </div>
        <p className="mb-1 text-sm font-bold">Go Pro</p>
        <p className="mb-4 text-xs leading-5 text-white/75">
          Upgrade your workflow with extra boards and smart reports.
        </p>
        <Button className="h-9 w-full rounded-xl bg-white text-[#5B5FEF] hover:bg-white/90">
          Upgrade
        </Button>
      </div>

      <div className="flex items-center gap-3 rounded-2xl bg-white/12 p-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white font-bold text-[#5B5FEF]">
          CJ
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">Cesar Junior</p>
          <p className="text-xs text-white/70">Project manager</p>
        </div>
        <LogOut className="h-5 w-5 text-white/70" />
      </div>
    </aside>
  );
}

function Header() {
  return (
    <header className="border-b border-gray-100 bg-white px-5 py-5 xl:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#5B5FEF]">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-gray-400">Workspace</p>
            <h1 className="text-2xl font-bold text-gray-950">Kanban Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Search dashboard">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="secondary" size="sm">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="secondary" size="sm">
            <Upload className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-7">
          {tabs.map((tab) => {
            const active = tab === "By Total Tasks";
            return (
              <button
                key={tab}
                className={cn(
                  "relative pb-3 text-sm font-semibold text-gray-500",
                  active && "text-[#5B5FEF]",
                )}
              >
                {tab}
                {active ? (
                  <>
                    <span className="ml-2 rounded-full bg-[#EEF0FF] px-2 py-0.5 text-xs text-[#5B5FEF]">
                      12
                    </span>
                    <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#5B5FEF]" />
                  </>
                ) : null}
              </button>
            );
          })}
        </div>

        <Button variant="secondary" size="sm" className="text-gray-600">
          Sort By
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}

function AvatarStack({ people }: { people: Assignee[] }) {
  const visible = people.slice(0, 3);
  const overflow = people.length - visible.length;

  return (
    <div className="flex h-9 min-w-[96px] items-center">
      {visible.map((person, index) => (
        <div
          key={person.name}
          title={person.name}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold",
            person.color,
            index > 0 && "-ml-2",
          )}
        >
          {person.initials}
        </div>
      ))}
      {overflow > 0 ? (
        <div className="-ml-2 flex h-8 min-w-8 items-center justify-center rounded-full border-2 border-white bg-[#EEF0FF] px-2 text-[11px] font-bold text-[#5B5FEF]">
          +{overflow}
        </div>
      ) : null}
    </div>
  );
}

function TaskCard({
  card,
  onOpen,
  dragListeners,
  dragAttributes,
  dragging,
}: {
  card: KanbanCard;
  onOpen?: () => void;
  dragListeners?: DraggableSyntheticListeners;
  dragAttributes?: DraggableAttributes;
  dragging?: boolean;
}) {
  return (
    <article
      onClick={onOpen}
      {...dragAttributes}
      {...dragListeners}
      className={cn(
        "touch-none rounded-2xl bg-white p-5 shadow-[0_12px_30px_rgba(17,24,39,0.06)] ring-1 ring-gray-100 transition",
        onOpen && "cursor-grab hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(17,24,39,0.09)] active:cursor-grabbing",
        dragging && "opacity-60 shadow-[0_22px_48px_rgba(17,24,39,0.18)]",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "inline-flex rounded-full px-3 py-1 text-xs font-bold",
            priorityStyles[card.priority],
          )}
        >
          {card.priority}
        </span>
        {dragListeners ? (
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-300"
            aria-hidden="true"
          >
            <GripVertical className="h-4 w-4" />
          </span>
        ) : null}
      </div>
      <h3 className="mt-4 line-clamp-2 min-h-12 text-base font-bold leading-6 text-gray-950">
        {card.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
        {card.description}
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-gray-400">
        <Mail className="h-4 w-4" />
        <span className="truncate">{card.clientEmail || "No client email"}</span>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <AvatarStack people={card.assignees} />
        <div className="flex shrink-0 items-center gap-3 text-xs font-bold text-gray-400">
          <span className="flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4" />
            {formatCount(card.comments)}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" />
            {formatCount(card.checks)}
          </span>
        </div>
      </div>
    </article>
  );
}

function SortableTaskCard({ card, onOpen }: { card: KanbanCard; onOpen: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TaskCard
        card={card}
        onOpen={onOpen}
        dragAttributes={attributes}
        dragListeners={listeners}
        dragging={isDragging}
      />
    </div>
  );
}

function KanbanColumnView({
  column,
  overColumnId,
  pulseColumnId,
  onOpenCard,
}: {
  column: KanbanColumn;
  overColumnId: string | null;
  pulseColumnId: string | null;
  onOpenCard: (cardId: string) => void;
}) {
  const styles = columnStyles[column.accent];
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  const active = overColumnId === column.id || isOver;
  const pulsing = pulseColumnId === column.id;

  return (
    <section
      ref={setNodeRef}
      className={cn(
        "flex w-[340px] shrink-0 flex-col rounded-[28px] p-3 transition duration-200",
        styles.shell,
        active && "ring-2 ring-offset-2",
        active && styles.ring,
      )}
    >
      <div
        className={cn(
          "mb-3 flex h-14 items-center rounded-2xl px-4 text-white",
          styles.header,
          pulsing && "animate-column-pulse",
        )}
      >
        <h2 className="flex-1 text-base font-bold">{column.title}</h2>
        <span className={cn("mr-3 rounded-full px-2.5 py-1 text-xs font-bold", styles.badge)}>
          {column.count}
        </span>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/30"
          aria-label={`Add card to ${column.title}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <SortableContext items={column.cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
        <div className="flex min-h-[520px] flex-col gap-4">
          {column.cards.length > 0 ? (
            column.cards.map((card) => (
              <SortableTaskCard key={card.id} card={card} onOpen={() => onOpenCard(card.id)} />
            ))
          ) : (
            <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/50 text-sm font-semibold text-gray-400">
              Drop a card here
            </div>
          )}
        </div>
      </SortableContext>
    </section>
  );
}

function CardDrawer({
  cardId,
  onClose,
}: {
  cardId: string | null;
  onClose: () => void;
}) {
  const findCard = useKanbanStore((state) => state.findCard);
  const updateCard = useKanbanStore((state) => state.updateCard);
  const addNote = useKanbanStore((state) => state.addNote);
  const result = cardId ? findCard(cardId) : null;
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    setNoteText("");
  }, [cardId]);

  if (!cardId || !result) return null;

  const { card, column } = result;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-gray-950/30" onClick={onClose}>
      <aside
        className="h-full w-full max-w-[480px] animate-drawer-in overflow-y-auto bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[#5B5FEF]">{column.title}</p>
            <h2 className="text-xl font-bold text-gray-950">Card details</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close card details">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-gray-700">Title</span>
            <input
              value={card.title}
              onChange={(event) => updateCard(card.id, { title: event.target.value })}
              className="h-11 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold outline-none focus:border-[#5B5FEF]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-gray-700">Description</span>
            <textarea
              value={card.description}
              onChange={(event) => updateCard(card.id, { description: event.target.value })}
              className="min-h-28 w-full resize-none rounded-xl border border-gray-200 p-3 text-sm leading-6 outline-none focus:border-[#5B5FEF]"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-gray-700">Priority</span>
              <select
                value={card.priority}
                onChange={(event) => updateCard(card.id, { priority: event.target.value as Priority })}
                className="h-11 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold outline-none focus:border-[#5B5FEF]"
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-gray-700">Client email</span>
              <input
                value={card.clientEmail}
                onChange={(event) => updateCard(card.id, { clientEmail: event.target.value })}
                className="h-11 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold outline-none focus:border-[#5B5FEF]"
              />
            </label>
          </div>

          <div>
            <span className="mb-2 block text-sm font-bold text-gray-700">Assignees</span>
            <AvatarStack people={card.assignees} />
          </div>

          <div className="rounded-2xl bg-gray-50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-950">Notes</h3>
              <span className="text-xs font-semibold text-gray-400">{card.notes.length} total</span>
            </div>

            <div className="mb-4 space-y-3">
              {card.notes.length > 0 ? (
                card.notes.map((note) => (
                  <div key={note.id} className="rounded-xl bg-white p-3 ring-1 ring-gray-100">
                    <p className="text-sm leading-6 text-gray-700">{note.content}</p>
                    <p className="mt-2 text-xs font-semibold text-gray-400">
                      {note.author} · {relativeTime(note.createdAt)} · {note.columnId}
                    </p>
                  </div>
                ))
              ) : (
                <p className="rounded-xl border border-dashed border-gray-200 bg-white p-4 text-sm font-semibold text-gray-400">
                  No notes for this card yet.
                </p>
              )}
            </div>

            <textarea
              value={noteText}
              maxLength={500}
              onChange={(event) => setNoteText(event.target.value)}
              placeholder="Add a note for the current stage"
              className="min-h-24 w-full resize-none rounded-xl border border-gray-200 p-3 text-sm leading-6 outline-none focus:border-[#5B5FEF]"
            />
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">{noteText.length}/500</span>
              <Button
                size="sm"
                onClick={() => {
                  addNote(card.id, column.id, noteText);
                  setNoteText("");
                }}
              >
                Add note
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Toast({ toast }: { toast: ToastState }) {
  if (!toast) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 max-w-md rounded-2xl px-5 py-4 text-sm font-semibold text-white shadow-2xl animate-toast-in",
        toast.tone === "success" ? "bg-[#5B5FEF]" : "bg-[#F59E0B]",
      )}
    >
      {toast.message}
    </div>
  );
}

export function KanbanDashboard() {
  const columns = useKanbanStore((state) => state.columns);
  const moveCard = useKanbanStore((state) => state.moveCard);
  const findCard = useKanbanStore((state) => state.findCard);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overColumnId, setOverColumnId] = useState<string | null>(null);
  const [pulseColumnId, setPulseColumnId] = useState<string | null>(null);
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const activeCard = useMemo(() => {
    if (!activeId) return null;
    return findCard(activeId)?.card ?? null;
  }, [activeId, findCard]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function resolveColumnId(overId: string | null) {
    if (!overId) return null;
    return (
      columns.find((column) => column.id === overId)?.id ??
      columns.find((column) => column.cards.some((card) => card.id === overId))?.id ??
      null
    );
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
    setOpenCardId(null);
  }

  function handleDragOver(event: DragEndEvent) {
    setOverColumnId(resolveColumnId(event.over ? String(event.over.id) : null));
  }

  function handleDragEnd(event: DragEndEvent) {
    const overId = event.over ? String(event.over.id) : null;
    const destinationColumn = resolveColumnId(overId);

    if (activeId && overId) {
      const result = moveCard(activeId, overId);
      if (result.changedColumn && destinationColumn) {
        setPulseColumnId(destinationColumn);
        window.setTimeout(() => setPulseColumnId(null), 650);
        setToast({
          id: Date.now(),
          tone: result.clientEmail ? "success" : "warning",
          message: result.clientEmail
            ? `Card moved to ${result.toColumnTitle} · Email will be sent to ${result.clientEmail}`
            : `No client email · update "${result.cardTitle}" before moving`,
        });
      }
    }

    setActiveId(null);
    setOverColumnId(null);
  }

  return (
    <main className="flex min-h-screen bg-[#F7F8FC]">
      <Sidebar />
      <section className="min-w-0 flex-1">
        <Header />
        <div className="px-5 py-6 xl:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#5B5FEF]">Current board</p>
              <h2 className="text-xl font-bold text-gray-950">Client Projects</h2>
            </div>
            <div className="hidden items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-gray-500 ring-1 ring-gray-100 md:flex">
              <Sparkles className="h-4 w-4 text-[#5B5FEF]" />
              Interactive Phase 2 board
            </div>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={() => {
              setActiveId(null);
              setOverColumnId(null);
            }}
          >
            <div className="overflow-x-auto pb-4">
              <div className="flex min-w-max gap-5">
                {columns.map((column) => (
                  <KanbanColumnView
                    key={column.id}
                    column={column}
                    overColumnId={overColumnId}
                    pulseColumnId={pulseColumnId}
                    onOpenCard={setOpenCardId}
                  />
                ))}
              </div>
            </div>
            <DragOverlay>
              {activeCard ? (
                <div className="w-[320px] scale-[1.02] opacity-90">
                  <TaskCard card={activeCard} />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </section>
      <CardDrawer cardId={openCardId} onClose={() => setOpenCardId(null)} />
      <Toast toast={toast} />
    </main>
  );
}

import {
  Bell,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Code2,
  Home,
  LayoutDashboard,
  LogOut,
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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Assignee, KanbanCard, KanbanColumn, Priority } from "@/types/kanban";

const navItems = [
  { label: "Home", icon: Home, badge: "10", active: true },
  { label: "Tasks", icon: LayoutDashboard },
  { label: "Users", icon: Users, badge: "2" },
  { label: "APIs", icon: Code2 },
  { label: "Subscription", icon: WalletCards },
  { label: "Settings", icon: Settings },
  { label: "Help & Support", icon: CircleHelp },
];

const assignees: Record<string, Assignee> = {
  ana: { name: "Ana Ribeiro", initials: "AR", color: "bg-[#FEE2E2] text-[#B91C1C]" },
  bruno: { name: "Bruno Costa", initials: "BC", color: "bg-[#DBEAFE] text-[#1D4ED8]" },
  clara: { name: "Clara Dias", initials: "CD", color: "bg-[#DCFCE7] text-[#047857]" },
  diego: { name: "Diego Lima", initials: "DL", color: "bg-[#F3E8FF] text-[#7E22CE]" },
  eva: { name: "Eva Martins", initials: "EM", color: "bg-[#FEF3C7] text-[#B45309]" },
};

const columns: KanbanColumn[] = [
  {
    id: "in-progress",
    title: "In Progress",
    count: 25,
    accent: "indigo",
    cards: [
      {
        id: "card-1",
        priority: "Important",
        title: "Dashboard wireframe and sidebar navigation system",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae risus at augue aliquet.",
        assignees: [assignees.ana, assignees.bruno, assignees.clara, assignees.diego],
        comments: 24,
        checks: 18,
      },
      {
        id: "card-2",
        priority: "Meh",
        title: "Client project status overview",
        description:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
        assignees: [assignees.bruno, assignees.eva],
        comments: 108000,
        checks: 42,
      },
      {
        id: "card-3",
        priority: "OK",
        title: "Campaign task review checklist",
        description:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.",
        assignees: [assignees.clara],
        comments: 12,
        checks: 9,
      },
    ],
  },
  {
    id: "reviewed",
    title: "Reviewed",
    count: 8,
    accent: "amber",
    cards: [
      {
        id: "card-4",
        priority: "High Priority",
        title: "Proposal approval flow for agency clients",
        description:
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
        assignees: [assignees.diego, assignees.ana, assignees.eva],
        comments: 73,
        checks: 31,
      },
      {
        id: "card-5",
        priority: "Low Priority",
        title: "Landing copy draft",
        description:
          "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur.",
        assignees: [],
        comments: 8,
        checks: 4,
      },
      {
        id: "card-6",
        priority: "I don't know",
        title: "Notification timing notes",
        description:
          "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
        assignees: [assignees.eva, assignees.bruno, assignees.clara, assignees.ana],
        comments: 19,
        checks: 11,
      },
    ],
  },
  {
    id: "completed",
    title: "Completed",
    count: 2,
    accent: "emerald",
    cards: [
      {
        id: "card-7",
        priority: "Maybe important",
        title: "Brand color exploration",
        description:
          "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.",
        assignees: [assignees.ana, assignees.diego],
        comments: 7,
        checks: 16,
      },
      {
        id: "card-8",
        priority: "Not that important",
        title: "Archive old board examples",
        description:
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
        assignees: [assignees.clara, assignees.bruno, assignees.eva],
        comments: 3,
        checks: 22,
      },
    ],
  },
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

const columnStyles = {
  indigo: {
    shell: "bg-[#EEF0FF]",
    header: "bg-[#5B5FEF]",
    badge: "bg-white/20 text-white",
  },
  amber: {
    shell: "bg-[#FFF5E1]",
    header: "bg-[#F59E0B]",
    badge: "bg-white/25 text-white",
  },
  emerald: {
    shell: "bg-[#EAFBF4]",
    header: "bg-[#10B981]",
    badge: "bg-white/25 text-white",
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

function TaskCard({ card }: { card: KanbanCard }) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-[0_12px_30px_rgba(17,24,39,0.06)] ring-1 ring-gray-100">
      <span
        className={cn(
          "inline-flex rounded-full px-3 py-1 text-xs font-bold",
          priorityStyles[card.priority],
        )}
      >
        {card.priority}
      </span>
      <h3 className="mt-4 line-clamp-2 min-h-12 text-base font-bold leading-6 text-gray-950">
        {card.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
        {card.description}
      </p>
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

function KanbanColumnView({ column }: { column: KanbanColumn }) {
  const styles = columnStyles[column.accent];

  return (
    <section className={cn("flex w-[340px] shrink-0 flex-col rounded-[28px] p-3", styles.shell)}>
      <div className={cn("mb-3 flex h-14 items-center rounded-2xl px-4 text-white", styles.header)}>
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

      <div className="flex min-h-[520px] flex-col gap-4">
        {column.cards.length > 0 ? (
          column.cards.map((card) => <TaskCard key={card.id} card={card} />)
        ) : (
          <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/50 text-sm font-semibold text-gray-400">
            No cards yet
          </div>
        )}
      </div>
    </section>
  );
}

export default function DashboardPage() {
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
              Static Phase 1 preview
            </div>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex min-w-max gap-5">
              {columns.map((column) => (
                <KanbanColumnView key={column.id} column={column} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

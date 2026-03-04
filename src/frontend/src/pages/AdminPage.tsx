import type { Submission } from "@/backend";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useActor } from "@/hooks/useActor";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Eye,
  Loader2,
  LogOut,
  RefreshCw,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useCallback, useState } from "react";

const TOKEN_KEY = "sk_admin_token";

function formatTimestamp(ts: bigint): string {
  // ts is nanoseconds since epoch
  const ms = Number(ts / 1_000_000n);
  const date = new Date(ms);
  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function truncate(text: string, maxLen = 60): string {
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen)}…`;
}

// ─── Login View ───────────────────────────────────────────────────────────────
interface LoginViewProps {
  onLogin: (token: string) => void;
}

function LoginView({ onLogin }: LoginViewProps) {
  const { actor, isFetching } = useActor();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = useMutation({
    mutationFn: async ({ u, p }: { u: string; p: string }) => {
      if (!actor) throw new Error("Not ready");
      return actor.adminLogin(u, p);
    },
    onSuccess: (token) => {
      localStorage.setItem(TOKEN_KEY, token);
      onLogin(token);
    },
    onError: () => {
      setError("Invalid credentials. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate({ u: username, p: password });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.087_0_0)] flex items-center justify-center px-4">
      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 w-full max-w-sm">
        {/* Brand mark */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
            style={{
              border: "1px solid var(--gold)",
              background: "oklch(0.108 0 0)",
            }}
          >
            <ShieldCheck size={22} style={{ color: "var(--gold)" }} />
          </div>
          <h1 className="font-display text-3xl font-light tracking-widest text-white mb-1">
            SKdesigns
          </h1>
          <p
            className="text-xs tracking-[0.25em] uppercase"
            style={{ color: "var(--gold)" }}
          >
            Admin Portal
          </p>
        </div>

        {/* Login card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-sm p-8 space-y-5"
          style={{
            background: "oklch(0.108 0 0)",
            border: "1px solid oklch(0.18 0 0)",
            boxShadow: "0 32px 80px oklch(0 0 0 / 0.6)",
          }}
        >
          <div className="space-y-1.5">
            <label
              htmlFor="admin-username"
              className="block text-xs tracking-[0.15em] uppercase font-medium"
              style={{ color: "oklch(0.65 0 0)" }}
            >
              Username
            </label>
            <input
              id="admin-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              data-ocid="admin.login.input"
              className="w-full px-4 py-3 text-sm text-white rounded-sm outline-none transition-all duration-200 placeholder:text-[oklch(0.35_0_0)]"
              style={{
                background: "oklch(0.13 0 0)",
                border: "1px solid oklch(0.22 0 0)",
              }}
              placeholder="Enter username"
              onFocus={(e) => {
                e.target.style.borderColor = "var(--gold)";
                e.target.style.boxShadow = "0 0 0 1px var(--gold)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "oklch(0.22 0 0)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="admin-password"
              className="block text-xs tracking-[0.15em] uppercase font-medium"
              style={{ color: "oklch(0.65 0 0)" }}
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              data-ocid="admin.password.input"
              className="w-full px-4 py-3 text-sm text-white rounded-sm outline-none transition-all duration-200 placeholder:text-[oklch(0.35_0_0)]"
              style={{
                background: "oklch(0.13 0 0)",
                border: "1px solid oklch(0.22 0 0)",
              }}
              placeholder="Enter password"
              onFocus={(e) => {
                e.target.style.borderColor = "var(--gold)";
                e.target.style.boxShadow = "0 0 0 1px var(--gold)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "oklch(0.22 0 0)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {error && (
            <p
              className="text-xs px-3 py-2 rounded-sm"
              style={{
                color: "oklch(0.75 0.18 27)",
                background: "oklch(0.18 0.06 27 / 0.3)",
                border: "1px solid oklch(0.35 0.12 27 / 0.4)",
              }}
              data-ocid="admin.login.error_state"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending || isFetching}
            data-ocid="admin.login.submit_button"
            className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold tracking-[0.1em] uppercase transition-all duration-300 rounded-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "var(--gold)",
              color: "oklch(0.087 0 0)",
              border: "1px solid var(--gold)",
            }}
            onMouseEnter={(e) => {
              if (!loginMutation.isPending) {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "var(--gold-bright)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 32px oklch(0.72 0.12 75 / 0.5)";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "var(--gold)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Authenticating…
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p
          className="text-center mt-8 text-xs"
          style={{ color: "oklch(0.35 0 0)" }}
        >
          © {new Date().getFullYear()} SKdesigns. Restricted access.
        </p>
      </div>
    </div>
  );
}

// ─── Dashboard View ───────────────────────────────────────────────────────────
interface DashboardViewProps {
  token: string;
  onLogout: () => void;
}

function DashboardView({ token, onLogout }: DashboardViewProps) {
  const { actor, isFetching: actorFetching } = useActor();

  const {
    data: submissions,
    isLoading: subLoading,
    isError: subError,
    refetch: refetchSubs,
    isFetching: subFetching,
  } = useQuery<Submission[]>({
    queryKey: ["admin-submissions", token],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSubmissions(token);
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  const {
    data: count,
    isLoading: countLoading,
    refetch: refetchCount,
  } = useQuery<bigint>({
    queryKey: ["admin-count", token],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getSubmissionCount(token);
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  const handleRefresh = useCallback(() => {
    void Promise.all([refetchSubs(), refetchCount()]);
  }, [refetchSubs, refetchCount]);

  const isLoading = subLoading || countLoading || actorFetching;
  const isRefreshing = subFetching && !isLoading;

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.087 0 0)" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "oklch(0.087 0 0)",
          borderBottom: "1px solid oklch(0.18 0 0)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-sm"
            style={{
              border: "1px solid var(--gold)",
              background: "oklch(0.108 0 0)",
            }}
          >
            <ShieldCheck size={14} style={{ color: "var(--gold)" }} />
          </div>
          <span className="font-display text-xl font-light tracking-widest text-white">
            SKdesigns Admin
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
            data-ocid="admin.refresh.button"
            className="flex items-center gap-2 px-4 py-2 text-xs tracking-[0.1em] uppercase rounded-sm transition-all duration-200 disabled:opacity-40"
            style={{
              color: "oklch(0.65 0 0)",
              border: "1px solid oklch(0.22 0 0)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color =
                "var(--gold)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "oklch(0.72 0.12 75 / 0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color =
                "oklch(0.65 0 0)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "oklch(0.22 0 0)";
            }}
          >
            <RefreshCw
              size={12}
              className={isRefreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={onLogout}
            data-ocid="admin.logout.button"
            className="flex items-center gap-2 px-4 py-2 text-xs tracking-[0.1em] uppercase rounded-sm transition-all duration-200"
            style={{
              color: "oklch(0.75 0.18 27)",
              border: "1px solid oklch(0.35 0.12 27 / 0.5)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "oklch(0.18 0.06 27 / 0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "transparent";
            }}
          >
            <LogOut size={12} />
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* Stats row */}
        <div className="mb-8">
          <div
            className="inline-flex items-center gap-4 px-6 py-5 rounded-sm"
            style={{
              background: "oklch(0.108 0 0)",
              border: "1px solid oklch(0.18 0 0)",
              boxShadow: "0 4px 24px oklch(0 0 0 / 0.4)",
            }}
          >
            <div
              className="flex items-center justify-center w-12 h-12 rounded-sm"
              style={{
                background: "oklch(0.72 0.12 75 / 0.12)",
                border: "1px solid oklch(0.72 0.12 75 / 0.25)",
              }}
            >
              <Users size={20} style={{ color: "var(--gold)" }} />
            </div>
            <div>
              <p
                className="text-xs tracking-[0.15em] uppercase mb-0.5"
                style={{ color: "oklch(0.55 0 0)" }}
              >
                Total Inquiries
              </p>
              {countLoading ? (
                <div
                  className="h-7 w-12 rounded animate-pulse"
                  style={{ background: "oklch(0.18 0 0)" }}
                />
              ) : (
                <p
                  className="font-display text-3xl font-light"
                  style={{ color: "var(--gold)", lineHeight: 1 }}
                >
                  {count !== undefined ? count.toString() : "—"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display text-2xl font-light tracking-wide text-white">
              Client Inquiries
            </h2>
            <p className="text-xs mt-1" style={{ color: "oklch(0.50 0 0)" }}>
              All form submissions from the "Let's Work Together" contact form
            </p>
          </div>
          {submissions && submissions.length > 0 && (
            <span
              className="text-xs px-2.5 py-1 rounded-full tracking-wide"
              style={{
                background: "oklch(0.72 0.12 75 / 0.12)",
                color: "var(--gold)",
                border: "1px solid oklch(0.72 0.12 75 / 0.3)",
              }}
            >
              {submissions.length}{" "}
              {submissions.length === 1 ? "entry" : "entries"}
            </span>
          )}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div
            className="flex flex-col items-center justify-center py-20 rounded-sm"
            style={{
              background: "oklch(0.108 0 0)",
              border: "1px solid oklch(0.18 0 0)",
            }}
            data-ocid="admin.loading_state"
          >
            <Loader2
              size={28}
              className="animate-spin mb-4"
              style={{ color: "var(--gold)" }}
            />
            <p
              className="text-sm tracking-wider"
              style={{ color: "oklch(0.55 0 0)" }}
            >
              Loading submissions…
            </p>
          </div>
        )}

        {/* Error state */}
        {subError && !isLoading && (
          <div
            className="flex flex-col items-center justify-center py-16 rounded-sm"
            style={{
              background: "oklch(0.108 0 0)",
              border: "1px solid oklch(0.35 0.12 27 / 0.4)",
            }}
            data-ocid="admin.error_state"
          >
            <p
              className="text-sm mb-3"
              style={{ color: "oklch(0.75 0.18 27)" }}
            >
              Failed to load submissions. Your session may have expired.
            </p>
            <button
              type="button"
              onClick={onLogout}
              className="text-xs tracking-wider underline"
              style={{ color: "oklch(0.65 0 0)" }}
            >
              Sign in again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !subError && submissions && submissions.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-20 rounded-sm"
            style={{
              background: "oklch(0.108 0 0)",
              border: "1px solid oklch(0.18 0 0)",
            }}
            data-ocid="admin.empty_state"
          >
            <Eye
              size={32}
              className="mb-4 opacity-25"
              style={{ color: "var(--gold)" }}
            />
            <p
              className="text-sm tracking-wide"
              style={{ color: "oklch(0.45 0 0)" }}
            >
              No inquiries yet
            </p>
            <p className="text-xs mt-1.5" style={{ color: "oklch(0.35 0 0)" }}>
              Submissions will appear here once clients fill out the contact
              form.
            </p>
          </div>
        )}

        {/* Table */}
        {!isLoading && !subError && submissions && submissions.length > 0 && (
          <div
            className="rounded-sm overflow-hidden"
            style={{ border: "1px solid oklch(0.18 0 0)" }}
            data-ocid="admin.submissions.table"
          >
            <div className="overflow-x-auto">
              <TooltipProvider delayDuration={200}>
                <Table>
                  <TableHeader>
                    <TableRow
                      style={{
                        background: "oklch(0.108 0 0)",
                        borderBottom: "1px solid oklch(0.18 0 0)",
                      }}
                    >
                      <TableHead
                        className="w-10 text-xs tracking-[0.15em] uppercase font-medium py-4"
                        style={{ color: "oklch(0.55 0 0)" }}
                      >
                        #
                      </TableHead>
                      <TableHead
                        className="text-xs tracking-[0.15em] uppercase font-medium py-4"
                        style={{ color: "oklch(0.55 0 0)" }}
                      >
                        Name
                      </TableHead>
                      <TableHead
                        className="text-xs tracking-[0.15em] uppercase font-medium py-4"
                        style={{ color: "oklch(0.55 0 0)" }}
                      >
                        Email
                      </TableHead>
                      <TableHead
                        className="text-xs tracking-[0.15em] uppercase font-medium py-4 hidden sm:table-cell"
                        style={{ color: "oklch(0.55 0 0)" }}
                      >
                        Project Type
                      </TableHead>
                      <TableHead
                        className="text-xs tracking-[0.15em] uppercase font-medium py-4"
                        style={{ color: "oklch(0.55 0 0)" }}
                      >
                        Message
                      </TableHead>
                      <TableHead
                        className="text-xs tracking-[0.15em] uppercase font-medium py-4 hidden md:table-cell"
                        style={{ color: "oklch(0.55 0 0)" }}
                      >
                        Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((sub, idx) => (
                      <TableRow
                        key={sub.id}
                        data-ocid={`admin.submissions.row.${idx + 1}`}
                        className="transition-colors duration-150"
                        style={{
                          background:
                            idx % 2 === 0
                              ? "oklch(0.087 0 0)"
                              : "oklch(0.096 0 0)",
                          borderBottom: "1px solid oklch(0.15 0 0)",
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLTableRowElement
                          ).style.background = "oklch(0.12 0 0)";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLTableRowElement
                          ).style.background =
                            idx % 2 === 0
                              ? "oklch(0.087 0 0)"
                              : "oklch(0.096 0 0)";
                        }}
                      >
                        <TableCell
                          className="py-4 text-xs font-mono w-10"
                          style={{ color: "oklch(0.40 0 0)" }}
                        >
                          {idx + 1}
                        </TableCell>
                        <TableCell className="py-4 text-sm font-medium text-white whitespace-nowrap">
                          {sub.name}
                        </TableCell>
                        <TableCell
                          className="py-4 text-sm whitespace-nowrap"
                          style={{ color: "oklch(0.72 0.12 75)" }}
                        >
                          <a
                            href={`mailto:${sub.email}`}
                            className="hover:underline underline-offset-2"
                          >
                            {sub.email}
                          </a>
                        </TableCell>
                        <TableCell
                          className="py-4 text-sm hidden sm:table-cell"
                          style={{ color: "oklch(0.65 0 0)" }}
                        >
                          <span
                            className="inline-block px-2.5 py-0.5 rounded-full text-xs"
                            style={{
                              background: "oklch(0.72 0.12 75 / 0.08)",
                              border: "1px solid oklch(0.72 0.12 75 / 0.2)",
                              color: "oklch(0.80 0.10 75)",
                            }}
                          >
                            {sub.projectType}
                          </span>
                        </TableCell>
                        <TableCell
                          className="py-4 text-sm max-w-xs"
                          style={{ color: "oklch(0.60 0 0)" }}
                        >
                          {sub.message.length > 60 ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help">
                                  {truncate(sub.message)}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent
                                className="max-w-sm text-xs leading-relaxed"
                                style={{
                                  background: "oklch(0.13 0 0)",
                                  border: "1px solid oklch(0.22 0 0)",
                                  color: "oklch(0.88 0 0)",
                                }}
                              >
                                {sub.message}
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            sub.message
                          )}
                        </TableCell>
                        <TableCell
                          className="py-4 text-xs whitespace-nowrap hidden md:table-cell"
                          style={{ color: "oklch(0.45 0 0)" }}
                        >
                          {formatTimestamp(sub.timestamp)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TooltipProvider>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="mt-16 px-6 py-6 text-center"
        style={{ borderTop: "1px solid oklch(0.15 0 0)" }}
      >
        <p className="text-xs" style={{ color: "oklch(0.30 0 0)" }}>
          © {new Date().getFullYear()} SKdesigns · Restricted Admin Portal
        </p>
      </footer>
    </div>
  );
}

// ─── Admin Page (root) ────────────────────────────────────────────────────────
export default function AdminPage() {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY),
  );

  const handleLogin = (t: string) => {
    setToken(t);
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  if (!token) {
    return <LoginView onLogin={handleLogin} />;
  }

  return <DashboardView token={token} onLogout={handleLogout} />;
}

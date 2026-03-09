import type { PortfolioItem, Submission } from "@/backend";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useActor } from "@/hooks/useActor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Edit2,
  Eye,
  ImageOff,
  Layers,
  Loader2,
  LogOut,
  Plus,
  RefreshCw,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import { useCallback, useState } from "react";

const TOKEN_KEY = "sk_admin_token";

function formatTimestamp(ts: bigint): string {
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
      if (!actor)
        throw new Error(
          "Backend not ready. Please wait a moment and try again.",
        );
      return actor.adminLogin(u, p);
    },
    onSuccess: (t) => {
      localStorage.setItem(TOKEN_KEY, t);
      onLogin(t);
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("not ready") || msg.includes("Backend")) {
        setError(
          "Backend is still loading. Please wait a few seconds and try again.",
        );
      } else {
        setError(
          "Invalid credentials. Please check your username and password.",
        );
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate({ u: username.trim(), p: password.trim() });
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

// ─── Portfolio Form Modal ─────────────────────────────────────────────────────
interface PortfolioFormState {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

interface PortfolioFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: PortfolioFormState) => void;
  initialData?: PortfolioFormState;
  isSaving: boolean;
  mode: "add" | "edit";
}

const emptyForm: PortfolioFormState = {
  title: "",
  category: "",
  description: "",
  imageUrl: "",
};

function inputStyle(focused = false) {
  return {
    background: "oklch(0.13 0 0)",
    border: focused ? "1px solid var(--gold)" : "1px solid oklch(0.22 0 0)",
    color: "oklch(0.95 0 0)",
  };
}

function PortfolioFormModal({
  open,
  onClose,
  onSave,
  initialData,
  isSaving,
  mode,
}: PortfolioFormModalProps) {
  const [form, setForm] = useState<PortfolioFormState>(
    initialData ?? emptyForm,
  );
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [imgPreviewStatus, setImgPreviewStatus] = useState<
    "idle" | "loaded" | "error"
  >("idle");

  // Sync initialData when modal opens with edit data
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose();
    if (isOpen) {
      setForm(initialData ?? emptyForm);
      setImgPreviewStatus("idle");
    }
  };

  const handleChange =
    (field: keyof PortfolioFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      // Reset preview status whenever the URL changes
      if (field === "imageUrl") setImgPreviewStatus("idle");
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  const labelStyle = {
    color: "oklch(0.65 0 0)",
    fontSize: "0.6875rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    fontWeight: 500,
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-lg rounded-sm p-0 overflow-hidden"
        style={{
          background: "oklch(0.108 0 0)",
          border: "1px solid oklch(0.22 0 0)",
          boxShadow: "0 32px 80px oklch(0 0 0 / 0.7)",
        }}
      >
        <DialogHeader
          className="px-6 pt-6 pb-4"
          style={{ borderBottom: "1px solid oklch(0.18 0 0)" }}
        >
          <DialogTitle className="font-display text-xl font-light tracking-wide text-white flex items-center gap-2">
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-sm"
              style={{
                background: "oklch(0.72 0.12 75 / 0.12)",
                border: "1px solid oklch(0.72 0.12 75 / 0.3)",
              }}
            >
              {mode === "add" ? (
                <Plus size={13} style={{ color: "var(--gold)" }} />
              ) : (
                <Edit2 size={13} style={{ color: "var(--gold)" }} />
              )}
            </span>
            {mode === "add" ? "Add New Work" : "Edit Project"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-6 pt-5 pb-2 space-y-4">
          {/* Title */}
          <div className="space-y-1.5">
            <label htmlFor="pf-title" style={labelStyle}>
              Title
            </label>
            <input
              id="pf-title"
              type="text"
              required
              value={form.title}
              onChange={handleChange("title")}
              onFocus={() => setFocusedField("title")}
              onBlur={() => setFocusedField(null)}
              placeholder="e.g. Brand Identity for Apex"
              data-ocid="portfolio.form.title.input"
              className="w-full px-4 py-2.5 text-sm rounded-sm outline-none transition-all duration-150 placeholder:text-[oklch(0.35_0_0)]"
              style={inputStyle(focusedField === "title")}
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label htmlFor="pf-category" style={labelStyle}>
              Category
            </label>
            <input
              id="pf-category"
              type="text"
              required
              value={form.category}
              onChange={handleChange("category")}
              onFocus={() => setFocusedField("category")}
              onBlur={() => setFocusedField(null)}
              placeholder="e.g. Web Design, Branding, UI/UX"
              data-ocid="portfolio.form.category.input"
              className="w-full px-4 py-2.5 text-sm rounded-sm outline-none transition-all duration-150 placeholder:text-[oklch(0.35_0_0)]"
              style={inputStyle(focusedField === "category")}
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label htmlFor="pf-description" style={labelStyle}>
              Description
            </label>
            <textarea
              id="pf-description"
              rows={3}
              value={form.description}
              onChange={handleChange("description")}
              onFocus={() => setFocusedField("description")}
              onBlur={() => setFocusedField(null)}
              placeholder="Brief description of the project…"
              data-ocid="portfolio.form.description.textarea"
              className="w-full px-4 py-2.5 text-sm rounded-sm outline-none transition-all duration-150 resize-none placeholder:text-[oklch(0.35_0_0)]"
              style={inputStyle(focusedField === "description")}
            />
          </div>

          {/* Image URL */}
          <div className="space-y-1.5">
            <label htmlFor="pf-imageurl" style={labelStyle}>
              Image URL
            </label>
            <input
              id="pf-imageurl"
              type="url"
              required
              value={form.imageUrl}
              onChange={handleChange("imageUrl")}
              onFocus={() => setFocusedField("imageUrl")}
              onBlur={() => setFocusedField(null)}
              placeholder="https://example.com/image.jpg"
              data-ocid="portfolio.form.imageurl.input"
              className="w-full px-4 py-2.5 text-sm rounded-sm outline-none transition-all duration-150 placeholder:text-[oklch(0.35_0_0)]"
              style={inputStyle(focusedField === "imageUrl")}
            />

            {/* Live image preview — shown only when a URL is entered */}
            {form.imageUrl.trim() !== "" && (
              <div
                className="mt-2 rounded-sm overflow-hidden"
                style={{ border: "1px solid oklch(0.22 0 0)" }}
              >
                {/* Hidden img used to trigger load/error events */}
                <img
                  key={form.imageUrl}
                  src={form.imageUrl}
                  alt="Preview"
                  className="w-full h-32 object-cover"
                  style={{
                    display: imgPreviewStatus === "error" ? "none" : "block",
                    background: "oklch(0.13 0 0)",
                  }}
                  onLoad={() => setImgPreviewStatus("loaded")}
                  onError={() => setImgPreviewStatus("error")}
                />

                {/* Error placeholder */}
                {imgPreviewStatus === "error" && (
                  <div
                    className="h-32 w-full flex flex-col items-center justify-center gap-2"
                    style={{ background: "oklch(0.13 0 0)" }}
                  >
                    <ImageOff
                      size={20}
                      style={{ color: "oklch(0.60 0.15 50)" }}
                    />
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        letterSpacing: "0.1em",
                        color: "oklch(0.60 0.15 50)",
                      }}
                    >
                      Cannot load image
                    </span>
                  </div>
                )}

                {/* Status badge */}
                <div
                  className="px-3 py-1.5 flex items-center gap-2"
                  style={{ borderTop: "1px solid oklch(0.18 0 0)" }}
                >
                  {imgPreviewStatus === "idle" && (
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        letterSpacing: "0.1em",
                        color: "oklch(0.45 0 0)",
                      }}
                    >
                      Loading preview…
                    </span>
                  )}
                  {imgPreviewStatus === "loaded" && (
                    <span
                      className="flex items-center gap-1.5"
                      style={{
                        fontSize: "0.6875rem",
                        letterSpacing: "0.1em",
                        color: "oklch(0.72 0.16 145)",
                      }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="6"
                          cy="6"
                          r="5.5"
                          stroke="currentColor"
                          strokeOpacity="0.4"
                        />
                        <path
                          d="M3.5 6l2 2 3-3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Preview loaded
                    </span>
                  )}
                  {imgPreviewStatus === "error" && (
                    <span
                      className="flex items-center gap-1.5"
                      style={{
                        fontSize: "0.6875rem",
                        letterSpacing: "0.1em",
                        color: "oklch(0.65 0.15 50)",
                      }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="6"
                          cy="6"
                          r="5.5"
                          stroke="currentColor"
                          strokeOpacity="0.4"
                        />
                        <path
                          d="M4 4l4 4M8 4l-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      URL unreachable — try a direct image link
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <DialogFooter
            className="pt-3 pb-5 flex flex-row justify-end gap-3"
            style={{ borderTop: "1px solid oklch(0.18 0 0)" }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              data-ocid="portfolio.form.cancel_button"
              className="px-5 py-2.5 text-xs tracking-[0.1em] uppercase rounded-sm transition-all duration-200 disabled:opacity-40"
              style={{
                color: "oklch(0.65 0 0)",
                border: "1px solid oklch(0.22 0 0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "oklch(0.35 0 0)";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "oklch(0.80 0 0)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "oklch(0.22 0 0)";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "oklch(0.65 0 0)";
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              data-ocid="portfolio.form.submit_button"
              className="flex items-center gap-2 px-6 py-2.5 text-xs tracking-[0.1em] uppercase rounded-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              style={{
                background: "var(--gold)",
                color: "oklch(0.087 0 0)",
                border: "1px solid var(--gold)",
              }}
              onMouseEnter={(e) => {
                if (!isSaving) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--gold-bright)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 20px oklch(0.72 0.12 75 / 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "var(--gold)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              {isSaving ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  Saving…
                </>
              ) : mode === "add" ? (
                <>
                  <Plus size={12} />
                  Add Project
                </>
              ) : (
                <>
                  <Edit2 size={12} />
                  Save Changes
                </>
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Portfolio Management Panel ───────────────────────────────────────────────
interface PortfolioManagementProps {
  token: string;
}

function PortfolioManagement({ token }: PortfolioManagementProps) {
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<PortfolioItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<PortfolioItem | null>(null);

  const {
    data: portfolioItems = [],
    isLoading: portfolioLoading,
    isError: portfolioError,
  } = useQuery<PortfolioItem[]>({
    queryKey: ["admin-portfolio", token],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPortfolioItems();
    },
    enabled: !!actor && !actorFetching,
  });

  const invalidatePortfolio = () => {
    void queryClient.invalidateQueries({
      queryKey: ["admin-portfolio", token],
    });
    void queryClient.invalidateQueries({ queryKey: ["portfolio"] });
  };

  const addMutation = useMutation({
    mutationFn: async (data: PortfolioFormState) => {
      if (!actor) throw new Error("Not ready");
      return actor.addPortfolioItem(
        token,
        data.title,
        data.category,
        data.description,
        data.imageUrl,
      );
    },
    onSuccess: () => {
      invalidatePortfolio();
      setModalOpen(false);
    },
  });

  const editMutation = useMutation({
    mutationFn: async (data: PortfolioFormState & { id: string }) => {
      if (!actor) throw new Error("Not ready");
      return actor.updatePortfolioItem(
        token,
        data.id,
        data.title,
        data.category,
        data.description,
        data.imageUrl,
      );
    },
    onSuccess: () => {
      invalidatePortfolio();
      setEditItem(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not ready");
      return actor.deletePortfolioItem(token, id);
    },
    onSuccess: () => {
      invalidatePortfolio();
      setDeleteItem(null);
    },
  });

  const handleAdd = (data: PortfolioFormState) => {
    addMutation.mutate(data);
  };

  const handleEdit = (data: PortfolioFormState) => {
    if (!editItem) return;
    editMutation.mutate({ ...data, id: editItem.id });
  };

  const handleDeleteConfirm = () => {
    if (!deleteItem) return;
    deleteMutation.mutate(deleteItem.id);
  };

  const openEditModal = (item: PortfolioItem) => {
    setEditItem(item);
  };

  const closeEditModal = () => {
    setEditItem(null);
  };

  return (
    <div>
      {/* Header row */}
      <div className="flex items-start justify-between mb-5 flex-wrap gap-4">
        <div>
          <h2 className="font-display text-2xl font-light tracking-wide text-white">
            Portfolio Management
          </h2>
          <p className="text-xs mt-1" style={{ color: "oklch(0.50 0 0)" }}>
            Add, edit, and remove projects shown on the public portfolio
          </p>
        </div>

        <div className="flex items-center gap-3">
          {portfolioItems.length > 0 && (
            <span
              className="text-xs px-2.5 py-1 rounded-full tracking-wide"
              style={{
                background: "oklch(0.72 0.12 75 / 0.12)",
                color: "var(--gold)",
                border: "1px solid oklch(0.72 0.12 75 / 0.3)",
              }}
            >
              {portfolioItems.length}{" "}
              {portfolioItems.length === 1 ? "project" : "projects"}
            </span>
          )}

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            data-ocid="portfolio.add.open_modal_button"
            className="flex items-center gap-2 px-4 py-2 text-xs tracking-[0.1em] uppercase rounded-sm transition-all duration-200 font-semibold"
            style={{
              color: "var(--gold)",
              border: "1px solid oklch(0.72 0.12 75 / 0.5)",
              background: "oklch(0.72 0.12 75 / 0.06)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "oklch(0.72 0.12 75 / 0.14)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "var(--gold)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 16px oklch(0.72 0.12 75 / 0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "oklch(0.72 0.12 75 / 0.06)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "oklch(0.72 0.12 75 / 0.5)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            <Plus size={13} />
            Add New Work
          </button>
        </div>
      </div>

      {/* Loading state */}
      {portfolioLoading && (
        <div
          className="flex flex-col items-center justify-center py-20 rounded-sm"
          style={{
            background: "oklch(0.108 0 0)",
            border: "1px solid oklch(0.18 0 0)",
          }}
          data-ocid="portfolio.loading_state"
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
            Loading portfolio…
          </p>
        </div>
      )}

      {/* Error state */}
      {portfolioError && !portfolioLoading && (
        <div
          className="flex flex-col items-center justify-center py-16 rounded-sm"
          style={{
            background: "oklch(0.108 0 0)",
            border: "1px solid oklch(0.35 0.12 27 / 0.4)",
          }}
          data-ocid="portfolio.error_state"
        >
          <p className="text-sm mb-3" style={{ color: "oklch(0.75 0.18 27)" }}>
            Failed to load portfolio items.
          </p>
        </div>
      )}

      {/* Empty state */}
      {!portfolioLoading && !portfolioError && portfolioItems.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-20 rounded-sm"
          style={{
            background: "oklch(0.108 0 0)",
            border: "1px solid oklch(0.18 0 0)",
          }}
          data-ocid="portfolio.empty_state"
        >
          <ImageOff
            size={32}
            className="mb-4 opacity-25"
            style={{ color: "var(--gold)" }}
          />
          <p
            className="text-sm tracking-wide"
            style={{ color: "oklch(0.45 0 0)" }}
          >
            No portfolio items yet
          </p>
          <p className="text-xs mt-1.5" style={{ color: "oklch(0.35 0 0)" }}>
            Click "Add New Work" to add your first project.
          </p>
        </div>
      )}

      {/* Portfolio table */}
      {!portfolioLoading && !portfolioError && portfolioItems.length > 0 && (
        <div
          className="rounded-sm overflow-hidden"
          style={{ border: "1px solid oklch(0.18 0 0)" }}
          data-ocid="portfolio.table"
        >
          <div className="overflow-x-auto">
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
                    Title
                  </TableHead>
                  <TableHead
                    className="text-xs tracking-[0.15em] uppercase font-medium py-4 hidden sm:table-cell"
                    style={{ color: "oklch(0.55 0 0)" }}
                  >
                    Category
                  </TableHead>
                  <TableHead
                    className="text-xs tracking-[0.15em] uppercase font-medium py-4 hidden md:table-cell"
                    style={{ color: "oklch(0.55 0 0)" }}
                  >
                    Image URL
                  </TableHead>
                  <TableHead
                    className="text-xs tracking-[0.15em] uppercase font-medium py-4 text-right"
                    style={{ color: "oklch(0.55 0 0)" }}
                  >
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolioItems.map((item, idx) => (
                  <TableRow
                    key={item.id}
                    data-ocid={`portfolio.item.row.${idx + 1}`}
                    className="transition-colors duration-150"
                    style={{
                      background:
                        idx % 2 === 0 ? "oklch(0.087 0 0)" : "oklch(0.096 0 0)",
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
                        idx % 2 === 0 ? "oklch(0.087 0 0)" : "oklch(0.096 0 0)";
                    }}
                  >
                    <TableCell
                      className="py-4 text-xs font-mono w-10"
                      style={{ color: "oklch(0.40 0 0)" }}
                    >
                      {idx + 1}
                    </TableCell>
                    <TableCell className="py-4 text-sm font-medium text-white whitespace-nowrap">
                      {item.title}
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
                        {item.category}
                      </span>
                    </TableCell>
                    <TableCell
                      className="py-4 text-xs hidden md:table-cell max-w-[200px]"
                      style={{ color: "oklch(0.45 0 0)" }}
                    >
                      <span className="block truncate">
                        {truncate(item.imageUrl, 40)}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          data-ocid={`portfolio.item.edit_button.${idx + 1}`}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wide uppercase rounded-sm transition-all duration-150"
                          style={{
                            color: "var(--gold)",
                            border: "1px solid oklch(0.72 0.12 75 / 0.3)",
                          }}
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "oklch(0.72 0.12 75 / 0.1)";
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.borderColor = "var(--gold)";
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "transparent";
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.borderColor = "oklch(0.72 0.12 75 / 0.3)";
                          }}
                        >
                          <Edit2 size={11} />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteItem(item)}
                          data-ocid={`portfolio.item.delete_button.${idx + 1}`}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wide uppercase rounded-sm transition-all duration-150"
                          style={{
                            color: "oklch(0.75 0.18 27)",
                            border: "1px solid oklch(0.35 0.12 27 / 0.4)",
                          }}
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "oklch(0.18 0.06 27 / 0.2)";
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.borderColor = "oklch(0.45 0.15 27 / 0.6)";
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "transparent";
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.borderColor = "oklch(0.35 0.12 27 / 0.4)";
                          }}
                        >
                          <Trash2 size={11} />
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Add modal */}
      <PortfolioFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAdd}
        isSaving={addMutation.isPending}
        mode="add"
      />

      {/* Edit modal */}
      <PortfolioFormModal
        open={!!editItem}
        onClose={closeEditModal}
        onSave={handleEdit}
        initialData={
          editItem
            ? {
                title: editItem.title,
                category: editItem.category,
                description: editItem.description,
                imageUrl: editItem.imageUrl,
              }
            : undefined
        }
        isSaving={editMutation.isPending}
        mode="edit"
      />

      {/* Delete confirm dialog */}
      <AlertDialog
        open={!!deleteItem}
        onOpenChange={(open) => {
          if (!open) setDeleteItem(null);
        }}
      >
        <AlertDialogContent
          className="max-w-md rounded-sm"
          style={{
            background: "oklch(0.108 0 0)",
            border: "1px solid oklch(0.22 0 0)",
            boxShadow: "0 32px 80px oklch(0 0 0 / 0.7)",
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-xl font-light tracking-wide text-white">
              Delete Project
            </AlertDialogTitle>
            <AlertDialogDescription
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.60 0 0)" }}
            >
              Are you sure you want to delete{" "}
              <span className="text-white font-medium">
                "{deleteItem?.title}"
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row justify-end gap-3 mt-2">
            <AlertDialogCancel
              data-ocid="portfolio.delete.cancel_button"
              className="px-5 py-2.5 text-xs tracking-[0.1em] uppercase rounded-sm transition-all duration-200 border-0"
              style={{
                color: "oklch(0.65 0 0)",
                border: "1px solid oklch(0.22 0 0)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "oklch(0.80 0 0)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "oklch(0.65 0 0)";
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteMutation.isPending}
              data-ocid="portfolio.delete.confirm_button"
              className="flex items-center gap-2 px-5 py-2.5 text-xs tracking-[0.1em] uppercase rounded-sm font-semibold disabled:opacity-50 border-0"
              style={{
                background: "oklch(0.5 0.2 27)",
                color: "oklch(0.95 0 0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "oklch(0.58 0.22 27)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "oklch(0.5 0.2 27)";
              }}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  Deleting…
                </>
              ) : (
                <>
                  <Trash2 size={12} />
                  Delete
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
      try {
        return await actor.getSubmissions(token);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        onLogout();
        return [];
      }
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
        <div className="mb-8 flex flex-wrap gap-4">
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
              <Layers size={20} style={{ color: "var(--gold)" }} />
            </div>
            <div>
              <p
                className="text-xs tracking-[0.15em] uppercase mb-0.5"
                style={{ color: "oklch(0.55 0 0)" }}
              >
                Portfolio Projects
              </p>
              <p
                className="font-display text-3xl font-light"
                style={{ color: "var(--gold)", lineHeight: 1 }}
              >
                —
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="inquiries" className="w-full">
          <TabsList
            className="mb-6 h-auto p-0 rounded-sm gap-0"
            style={{
              background: "oklch(0.108 0 0)",
              border: "1px solid oklch(0.18 0 0)",
            }}
          >
            <TabsTrigger
              value="inquiries"
              data-ocid="admin.tabs.inquiries.tab"
              className="flex items-center gap-2 px-6 py-3 text-xs tracking-[0.15em] uppercase rounded-none transition-all duration-200 data-[state=active]:shadow-none"
              style={
                {
                  "--tw-ring-shadow": "none",
                } as React.CSSProperties
              }
            >
              <Users size={13} />
              Inquiries
              {submissions && submissions.length > 0 && (
                <span
                  className="px-1.5 py-0.5 text-xs rounded-full"
                  style={{
                    background: "oklch(0.72 0.12 75 / 0.15)",
                    color: "var(--gold)",
                    fontSize: "0.6rem",
                  }}
                >
                  {submissions.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="portfolio"
              data-ocid="admin.tabs.portfolio.tab"
              className="flex items-center gap-2 px-6 py-3 text-xs tracking-[0.15em] uppercase rounded-none transition-all duration-200 data-[state=active]:shadow-none"
            >
              <Layers size={13} />
              Portfolio
            </TabsTrigger>
          </TabsList>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries" className="mt-0">
            {/* Section header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display text-2xl font-light tracking-wide text-white">
                  Client Inquiries
                </h2>
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.50 0 0)" }}
                >
                  All form submissions from the "Let's Work Together" contact
                  form
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
            {!isLoading &&
              !subError &&
              submissions &&
              submissions.length === 0 && (
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
                  <p
                    className="text-xs mt-1.5"
                    style={{ color: "oklch(0.35 0 0)" }}
                  >
                    Submissions will appear here once clients fill out the
                    contact form.
                  </p>
                </div>
              )}

            {/* Table */}
            {!isLoading &&
              !subError &&
              submissions &&
              submissions.length > 0 && (
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
                                    border:
                                      "1px solid oklch(0.72 0.12 75 / 0.2)",
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
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="mt-0">
            <PortfolioManagement token={token} />
          </TabsContent>
        </Tabs>
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
  // Restore session from localStorage on mount
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(TOKEN_KEY) ?? null;
    } catch {
      return null;
    }
  });

  const handleLogin = (t: string) => {
    localStorage.setItem(TOKEN_KEY, t);
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

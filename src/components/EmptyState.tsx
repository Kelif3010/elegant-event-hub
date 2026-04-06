import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  illustration: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState = ({ illustration, title, description, actionLabel, onAction, className }: EmptyStateProps) => (
  <div className={cn("flex flex-col items-center justify-center py-16 px-6 animate-fade-in", className)}>
    <div className="mb-6 text-accent/60">{illustration}</div>
    <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">{title}</h3>
    <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">{description}</p>
    {actionLabel && onAction && (
      <Button onClick={onAction} className="shadow-elegant gap-2">
        {actionLabel}
      </Button>
    )}
  </div>
);

export default EmptyState;

/* ─── Inline SVG Illustrations ─── */

export const GuestsIllustration = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 80c0-11 9-20 20-20s20 9 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="76" cy="44" r="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
    <path d="M60 80c0-9 7-16 16-16s16 7 16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
    <circle cx="60" cy="100" r="2" fill="currentColor" opacity="0.3" />
    <circle cx="50" cy="105" r="1.5" fill="currentColor" opacity="0.2" />
    <circle cx="70" cy="103" r="1.5" fill="currentColor" opacity="0.2" />
  </svg>
);

export const TasksIllustration = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="20" width="70" height="85" rx="8" stroke="currentColor" strokeWidth="2" />
    <path d="M45 15h30v12a4 4 0 01-4 4H49a4 4 0 01-4-4V15z" stroke="currentColor" strokeWidth="2" />
    <line x1="40" y1="45" x2="80" y2="45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <line x1="40" y1="60" x2="72" y2="60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <line x1="40" y1="75" x2="65" y2="75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
    <path d="M35 45l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
  </svg>
);

export const BudgetIllustration = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="55" r="30" stroke="currentColor" strokeWidth="2" />
    <path d="M60 40v30M50 50h20M50 60h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M67 45a10 10 0 00-14 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M53 65a10 10 0 0014 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="60" cy="95" r="2" fill="currentColor" opacity="0.3" />
    <path d="M30 90l5-5M90 90l-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
  </svg>
);

export const TimelineIllustration = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="60" y1="15" x2="60" y2="105" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
    <circle cx="60" cy="30" r="6" stroke="currentColor" strokeWidth="2" />
    <circle cx="60" cy="60" r="6" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
    <circle cx="60" cy="90" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
    <line x1="70" y1="30" x2="90" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <line x1="70" y1="60" x2="85" y2="60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <line x1="30" y1="90" x2="50" y2="90" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
  </svg>
);

export const VendorsIllustration = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35 65c0-8 5-15 15-18M70 47c10 3 15 10 15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="50" cy="40" r="10" stroke="currentColor" strokeWidth="2" />
    <circle cx="70" cy="40" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M45 70l15 15 15-15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
    <path d="M60 85v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
    <rect x="30" y="95" width="60" height="8" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
  </svg>
);

export const PhotosIllustration = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="60" height="50" rx="6" stroke="currentColor" strokeWidth="2" />
    <rect x="35" y="40" width="50" height="40" rx="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
    <circle cx="42" cy="50" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M20 68l15-12 12 8 15-14 18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    <circle cx="60" cy="100" r="2" fill="currentColor" opacity="0.3" />
  </svg>
);

export const WishlistIllustration = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="35" width="60" height="55" rx="4" stroke="currentColor" strokeWidth="2" />
    <path d="M30 55h60" stroke="currentColor" strokeWidth="2" />
    <line x1="60" y1="35" x2="60" y2="90" stroke="currentColor" strokeWidth="2" />
    <path d="M45 25c0-5 5-10 15-10s15 5 15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M60 15v20" stroke="currentColor" strokeWidth="2" />
    <circle cx="45" cy="72" r="3" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <circle cx="75" cy="72" r="3" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
  </svg>
);

export const GuestbookIllustration = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 25h50a5 5 0 015 5v65a5 5 0 01-5 5H30" stroke="currentColor" strokeWidth="2" />
    <path d="M30 25v75" stroke="currentColor" strokeWidth="2" />
    <path d="M25 25h10M25 100h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="40" y1="45" x2="72" y2="45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <line x1="40" y1="55" x2="68" y2="55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <line x1="40" y1="65" x2="60" y2="65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
    <path d="M80 35l8-10c2-2 5-2 7 0l0 0c2 2 2 5 0 7l-15 15v0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

export const MusicIllustration = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="45" cy="80" r="12" stroke="currentColor" strokeWidth="2" />
    <circle cx="75" cy="75" r="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
    <line x1="57" y1="80" x2="57" y2="30" stroke="currentColor" strokeWidth="2" />
    <line x1="85" y1="75" x2="85" y2="35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M57 30l28 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M57 40l28 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
  </svg>
);

export const TablePlanIllustration = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="55" r="20" stroke="currentColor" strokeWidth="2" />
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const cx = 60 + Math.cos(rad) * 30;
      const cy = 55 + Math.sin(rad) * 30;
      return <circle key={i} cx={cx} cy={cy} r="4" stroke="currentColor" strokeWidth="1.5" opacity={0.3 + i * 0.1} />;
    })}
    <rect x="20" y="90" width="30" height="15" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />
    <rect x="70" y="90" width="30" height="15" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />
  </svg>
);

export const InvitationsIllustration = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="35" width="80" height="55" rx="6" stroke="currentColor" strokeWidth="2" />
    <path d="M20 41l40 25 40-25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 84l28-20M100 84L72 64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <circle cx="60" cy="20" r="4" fill="currentColor" opacity="0.2" />
    <path d="M55 20h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <circle cx="60" cy="105" r="2" fill="currentColor" opacity="0.2" />
  </svg>
);

import styles from "./AvailabilityBadge.module.css";

export function AvailabilityBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-300/15 bg-emerald-300/5 px-3.5 py-2 text-sm font-medium text-emerald-100">
      <span className={styles.statusDot} aria-hidden="true" />
      Open to new opportunities
    </div>
  );
}

/** Ad placeholder — renders nothing until an AdSense client is configured. */
export function AdSlot({ slot, className = "" }: { slot: string; className?: string }) {
  void slot;
  return null;
}

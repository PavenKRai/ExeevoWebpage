export function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      className="progress fixed inset-x-0 top-0 z-[200] h-[3px] origin-left"
      style={{ background: "linear-gradient(90deg, #df1995, #0762c8, #00c389)" }}
    />
  );
}

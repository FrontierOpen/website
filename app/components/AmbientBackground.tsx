export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 bg-[#050608]"
    >
      <div className="absolute inset-x-0 top-0 h-[34rem] bg-[linear-gradient(180deg,#0a1019_0%,#050608_82%)] opacity-70" />
    </div>
  );
}

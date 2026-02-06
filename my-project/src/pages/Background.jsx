export default function Background({ children }) {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/mercado.svg')" }}
    >
      <div className="min-h-screen bg-black/60">
        {children}
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <header className="w-full bg-[#9e3f3f]">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        
        <h1 className="text-white text-2xl font-bold tracking-wide">
          GERENCIADOR DE PRODUTOS
        </h1>

        <nav className="flex gap-10 text-white font-semibold text-sm tracking-wide">
          <a
            href="/cadastro"
            className="hover:opacity-80 transition"
          >
            REGISTRO DE<br />PRODUTOS
          </a>

          <a
            href="/produtos"
            className="hover:opacity-80 transition"
          >
            LISTA DE<br />PRODUTOS
          </a>
        </nav>
      </div>
    </header>
  );
}

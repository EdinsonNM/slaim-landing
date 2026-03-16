import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="w-full py-6 px-4 bg-black/80 border-t border-white/5"
      aria-label="Información del producto"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-white/60 text-sm">
          Un producto de{" "}
          <Link
            href="https://edi-developer.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 hover:text-white font-medium underline underline-offset-2 transition-colors"
          >
            EdiDev
          </Link>
        </p>
      </div>
    </footer>
  );
}

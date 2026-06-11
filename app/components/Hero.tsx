import Image from "next/image";
import imageSrc from "@/public/assets/unideo-01.jpg";

interface HeroProps {
  id?: string;
  title: string;
  subtitle?: string;
  /** src de la imagen de fondo. Dejar vacío muestra placeholder gris. */
  imageSrc?: string;
  showButton?: boolean;
  buttonText?: string;
  buttonHref?: string;
  /** Centra el título cuando no hay botón (ej. páginas interiores) */
  center?: boolean;
  minHeight?: string;
}

export default function Hero({
  id,
  title,
  subtitle,
  showButton = false,
  buttonText = "Solicitar Informes",
  buttonHref = "#contacto",
  center = false,
  minHeight = "min-h-[260px] sm:min-h-[320px] md:min-h-[380px]",
}: HeroProps) {
  return (
    <section
      id={id}
      className={`relative w-full ${minHeight} flex items-center overflow-hidden`}
    >
      {/* Background image placeholder */}
      <Image src={imageSrc} alt={title} fill className="object-cover object-center" priority />
      {/* <div className="absolute inset-0 bg-slate-400" aria-hidden="true" /> */}

      {/* Blue overlay */}
      <div className="absolute inset-0 bg-[#1a3a6e]/65" aria-hidden="true" />

      {/* Content */}
      <div
        className={`relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 py-14 sm:py-16 ${center ? "text-center" : ""}`}
      >
        {subtitle && (
          <p className="text-blue-200 text-sm uppercase tracking-widest mb-3 font-medium drop-shadow">
            {subtitle}
          </p>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 max-w-xl leading-tight drop-shadow">
          {title}
        </h1>
        {showButton && (
          <a
            href={buttonHref}
            className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-semibold uppercase tracking-widest px-6 py-2.5 transition-colors"
          >
            {buttonText}
            <span aria-hidden="true">›</span>
          </a>
        )}
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Contacto | UNIDEO",
  description: "Ponte en contacto con el Centro Universitario de Especialidades Odontológicas.",
};

function InfoItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-10 h-10 rounded-full bg-[#1a3a6e]/10 flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-[#1a3a6e] uppercase tracking-wide mb-0.5">
          {label}
        </p>
        <div className="text-sm text-gray-600 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export default function ContactoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <Hero
          title="Contacto"
          center
          minHeight="min-h-[200px] sm:min-h-[240px] md:min-h-[280px]"
        />

        {/* Main contact section */}
        <section className="w-full bg-white py-12 sm:py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6 sm:px-10">

            {/* Section header */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[#2563eb]">
                Envíanos un mensaje
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Responderemos a tu solicitud en un plazo de 24–48 horas hábiles.
              </p>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

              {/* Left — contact info */}
              <aside className="lg:col-span-2 flex flex-col gap-8">

                {/* Info cards */}
                <div className="bg-gray-50 rounded-xl p-6 flex flex-col gap-6 border border-gray-100">
                  <InfoItem
                    label="Dirección"
                    icon={
                      <svg className="w-5 h-5 text-[#1a3a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    }
                  >
                    <p>Av Guadalupe 4354-int.4, Camino Real, 45040 Zapopan, Jal.</p>
                  </InfoItem>

                  <InfoItem
                    label="Teléfono"
                    icon={
                      <svg className="w-5 h-5 text-[#1a3a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5C3 14.06 9.94 21 18.5 21h1a1.5 1.5 0 001.5-1.5v-2.586a1.5 1.5 0 00-.44-1.06l-2.12-2.122a1.5 1.5 0 00-2.122 0l-.707.707a1 1 0 01-1.414 0l-3.536-3.535a1 1 0 010-1.415l.707-.707a1.5 1.5 0 000-2.121L9.247 4.44A1.5 1.5 0 008.186 4H5.5A1.5 1.5 0 004 5.5z" />
                      </svg>
                    }
                  >
                    <a href="tel:+523331229017" className="hover:text-[#2563eb] transition-colors">
                    +523331229017
                    </a>
                  </InfoItem>

                  <InfoItem
                    label="Correo electrónico"
                    icon={
                      <svg className="w-5 h-5 text-[#1a3a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    }
                  >
                    <a href="mailto:gorthocenter@gmail.com" className="hover:text-[#2563eb] transition-colors">
                      gorthocenter@gmail.com
                    </a>
                  </InfoItem>

                  <InfoItem
                    label="Horario de atención"
                    icon={
                      <svg className="w-5 h-5 text-[#1a3a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
                      </svg>
                    }
                  >
                    <p>Lunes a viernes</p>
                    <p className="font-medium">9:00 am – 14:00 pm</p>
                    <p className="font-medium">16:00 pm – 20:00 pm</p>
                  </InfoItem>
                </div>

                {/* Map placeholder */}
                <div>
                  <p className="text-xs font-bold text-[#1a3a6e] uppercase tracking-wide mb-2">
                    Ubicación
                  </p>
                  {/* Replace with an embedded Google Maps iframe */}
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d382.19161484027666!2d-103.41455327770463!3d20.66432684540887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ae83092c1f85%3A0x78433801743d6e90!2sOrthocenter!5e0!3m2!1ses-419!2smx!4v1781145424291!5m2!1ses-419!2smx" width="100%" height="350" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ubicación de Orthocenter"></iframe>
                </div>
              </aside>

              {/* Right — form */}
              <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

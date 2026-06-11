import Image from "next/image";
import teamImage from "@/public/assets/unideo-team.jpg";
import qrCodeImage from "@/public/assets/sicyt.jalisco.gob.png";

export default function Objectives() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-[#2563eb] mb-8">
          Objetivos
        </h2>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left column — text + QR */}
          <div className="flex flex-col gap-5 text-sm text-gray-700 leading-relaxed">
            <p>
              Formar profesionistas en Ortodoncia con una sólida preparación
              académica, y una excelente experiencia clínica, que sean capaces de
              brindar a sus pacientes desde el nacimiento y a lo largo de su vida,
              diagnósticos, objetivos y planes de tratamiento que corrijan los
              diferentes tipos de anomalías dento-maxilofaciales, así como predecir
              el curso de éstas, a partir de técnicas de vanguardia, que brinden una
              mejor calidad de vida.
            </p>

            <p className="text-sm text-gray-700">
              Número de registro{" "}
              <span className="text-[#2563eb] font-semibold">ESDIP-2024-064</span>{" "}
              con valor curricular de 224 horas correspondientes a 14 créditos
            </p>

            {/* QR code placeholder */}
            <div className="flex flex-col gap-2">
              <Image src={qrCodeImage} alt="QR Code" width={130} height={130} />
              <a
                href="https://sicyt.jalisco.gob.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#2563eb] hover:underline"
              >
                sicyt.jalisco.gob.mx
              </a>
            </div>
          </div>

          {/* Right column — group photo placeholder */}
          <div className="w-full">
            <Image src={teamImage} alt="Grupo de estudiantes" width={600} height={400} className="w-full h-auto rounded" />
            {/* <div className="w-full aspect-[3/2] bg-slate-200 border border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400 text-sm select-none">
              Imagen del grupo
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

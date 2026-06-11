import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Objectives from "./components/Objectives";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero
          id="diplomado"
          title="Diplomado en Ortodoncia"
          showButton
          buttonText="Solicitar Informes"
          buttonHref="/contacto"
          minHeight="min-h-[320px] sm:min-h-[380px] md:min-h-[440px]"
        />
        <Objectives />
      </main>
      <Footer />
    </div>
  );
}

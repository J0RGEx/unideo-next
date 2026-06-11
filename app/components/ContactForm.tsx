"use client";

import { useState, FormEvent, useRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

interface FormState {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  mensaje: string;
}

const INITIAL_FORM: FormState = {
  nombre: "",
  apellidos: "",
  email: "",
  telefono: "",
  mensaje: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!turnstileToken) {
      setError("Por favor completa la verificación de seguridad.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Ocurrió un error. Inténtalo de nuevo.");
        turnstileRef.current?.reset();
        setTurnstileToken(null);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("No se pudo conectar con el servidor. Inténtalo más tarde.");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    } finally {
      setLoading(false);
    }
  }

  /* ── Estado de éxito ── */
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
        {/* Círculo animado */}
        <div className="relative mb-5">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          {/* Ping decorativo */}
          <span className="absolute inset-0 rounded-full bg-green-200 opacity-40 animate-ping" />
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">
          ¡Mensaje enviado correctamente!
        </h3>
        <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
          Gracias por contactarnos, <span className="font-semibold text-gray-700">{form.nombre}</span>.
          Te responderemos a la brevedad al correo proporcionado.
        </p>

        <button
          className="mt-7 inline-flex items-center gap-1.5 text-sm text-[#2563eb] hover:underline font-medium"
          onClick={() => {
            setSubmitted(false);
            setForm(INITIAL_FORM);
            setTurnstileToken(null);
          }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l-7 7 7 7M2 12h20" />
          </svg>
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  /* ── Formulario ── */
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

      {/* Nombre + Apellidos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nombre" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/40 focus:border-[#2563eb] transition"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="apellidos" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Apellidos <span className="text-red-500">*</span>
          </label>
          <input
            id="apellidos"
            name="apellidos"
            type="text"
            required
            placeholder="Tus apellidos"
            value={form.apellidos}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/40 focus:border-[#2563eb] transition"
          />
        </div>
      </div>

      {/* Email + Teléfono */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Correo electrónico <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="correo@ejemplo.com"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/40 focus:border-[#2563eb] transition"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="telefono" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Teléfono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            placeholder="(33) 0000-0000"
            value={form.telefono}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/40 focus:border-[#2563eb] transition"
          />
        </div>
      </div>

      {/* Mensaje */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="mensaje" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Comentario o mensaje <span className="text-red-500">*</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={5}
          placeholder="Escribe tu mensaje aquí…"
          value={form.mensaje}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#2563eb]/40 focus:border-[#2563eb] transition"
        />
      </div>

      <p className="text-xs text-gray-400">
        Los campos marcados con <span className="text-red-500">*</span> son obligatorios.
      </p>

      {/* Turnstile */}
      <div>
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
          onSuccess={(token) => setTurnstileToken(token)}
          onExpire={() => setTurnstileToken(null)}
          onError={() => setTurnstileToken(null)}
          options={{ theme: "light", language: "es" }}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
          </svg>
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !turnstileToken}
        className="self-start inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-8 py-2.5 rounded transition-colors"
      >
        {loading ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 20v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              />
            </svg>
            Enviando…
          </>
        ) : (
          "Enviar mensaje"
        )}
      </button>
    </form>
  );
}

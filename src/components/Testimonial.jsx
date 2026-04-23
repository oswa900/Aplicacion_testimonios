// src/components/Testimonial.jsx
// Componente presentacional: recibe `item` y renderiza la tarjeta del testimonio.
// No maneja estado ni lógica; solo muestra datos.

import React from 'react';

/**
 * Testimonial
 * @param {{ item: { nombre: string, cargo: string, texto: string, foto: string } }} props
 */
export default function Testimonial({ item }) {
  // Desestructuración: acceso directo sin escribir item.nombre, item.cargo, etc.
  const { nombre, cargo, texto, foto } = item;

  return (
    // <article> es semánticamente correcto para contenido independiente (reseña / comentario)
    <article className="testimonial-card">
      {/* alt descriptivo cumple WCAG 1.1.1 — texto alternativo para imágenes */}
      <img
        src={foto}
        alt={`Foto de ${nombre}`}
        className="testimonial-photo"
      />
      {/* h3 mantiene jerarquía: App usa h1 como título principal */}
      <h3 className="testimonial-name">{nombre}</h3>
      <p  className="testimonial-role">{cargo}</p>
      {/* Comillas decorativas para dar estilo visual de cita */}
      <p  className="testimonial-text">"{texto}"</p>
    </article>
  );
}

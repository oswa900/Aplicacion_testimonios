// src/components/Controls.jsx
// Componente UI-only: muestra los botones de navegación y delega
// las acciones al componente padre mediante callbacks (lifting state up).

import React from 'react';

/**
 * Controls
 * @param {{ onPrev: Function, onNext: Function, onRandom: Function, onPlay: Function, onPause: Function, isPlaying: boolean }} props
 * onPrev   — ir al testimonio anterior
 * onNext   — ir al siguiente testimonio
 * onRandom — ir a un testimonio aleatorio distinto del actual
 * onPlay   — iniciar autoplay
 * onPause  — pausar autoplay
 * isPlaying — estado actual de autoplay
 */
export default function Controls({ onPrev, onNext, onRandom, onPlay, onPause, isPlaying }) {
  return (
    <div className="controls">
      {/*
        aria-label es esencial: los botones solo muestran íconos Unicode.
        Sin él, un lector de pantalla anunciaría el nombre del símbolo,
        no la acción. Cumple WCAG 4.1.2 (Name, Role, Value).
      */}
      <button onClick={onPrev}   aria-label="Anterior">&#9664;</button>
      <button onClick={onNext}   aria-label="Siguiente">&#9654;</button>
      <button onClick={onRandom} aria-label="Aleatorio">&#127922;</button>
      {isPlaying ? (
        <button onClick={onPause} aria-label="Pausar">&#10074;&#10074;</button>
      ) : (
        <button onClick={onPlay} aria-label="Reproducir">&#9658;</button>
      )}
    </div>
  );
}

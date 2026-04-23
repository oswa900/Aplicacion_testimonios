// src/App.jsx
// Componente raíz: gestiona el estado (índice activo), las funciones de
// navegación y el autoplay. Los componentes hijos solo muestran datos
// o disparan eventos — toda la lógica vive aquí.

import React, { useState, useEffect, useRef } from 'react';
import testimonios from './data';
import Testimonial  from './components/Testimonial';
import Controls     from './components/Controls';
import './styles.css';

export default function App() {
  // ── Estado ───────────────────────────────────────────────────────────────
  // index: posición (0-based) del testimonio actualmente visible.
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const length = testimonios.length;

  // autoplayRef guarda el ID del intervalo sin provocar re-renders al cambiar.
  // useState provocaría un render extra cada vez que se resetea el intervalo.
  const autoplayRef = useRef(null);

  // ── Funciones de navegación ───────────────────────────────────────────────
  // El operador módulo (%) hace que al llegar al último elemento se vuelva al primero,
  // y al ir hacia atrás desde el primero se llegue al último.
  const next = () =>
    setIndex(prev => (prev + 1) % length);

  const prev = () =>
    setIndex(prev => (prev - 1 + length) % length);

  const random = () => {
    let r = Math.floor(Math.random() * length);
    // Asegurarse de no mostrar el mismo testimonio que el actual
    if (r === index) r = (r + 1) % length;
    setIndex(r);
  };

  // ── Autoplay ──────────────────────────────────────────────────────────────
  // useEffect se ejecuta tras el primer render y cada vez que `length` cambie.
  // Retorna una función de cleanup que detiene el intervalo al desmontarse
  // el componente, evitando memory leaks.
  useEffect(() => {
    if (isPlaying) {
      autoplayRef.current = setInterval(
        () => setIndex(i => (i + 1) % length),
        5000
      );
    }
    return () => clearInterval(autoplayRef.current); // cleanup
  }, [length, isPlaying]);

  // ── Pausar / Reanudar al interactuar ─────────────────────────────────────
  // Cuando el usuario hace clic en cualquier botón de navegación:
  //   1. Se limpia el intervalo actual.
  //   2. Se ejecuta la acción.
  //   3. Si está reproduciendo, se inicia un nuevo intervalo desde cero.
  const handleUserAction = (actionFn) => {
    if (isPlaying) clearInterval(autoplayRef.current);
    actionFn();
    if (isPlaying) {
      autoplayRef.current = setInterval(
        () => setIndex(i => (i + 1) % length),
        5000
      );
    }
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <main className="app">
      <h1>Testimonios</h1>

      <div className="card-wrapper">
        {/* Se pasa el objeto completo del testimonio activo como prop `item` */}
        <Testimonial item={testimonios[index]} />
      </div>

      {/*
        Se envuelven las funciones en handleUserAction para reiniciar el
        autoplay cada vez que el usuario interactúa manualmente.
      */}
      <Controls
        onPrev={()    => handleUserAction(prev)}
        onNext={()    => handleUserAction(next)}
        onRandom={()  => handleUserAction(random)}
        onPlay={play}
        onPause={pause}
        isPlaying={isPlaying}
      />

      {/* Contador: muestra la posición actual (1-based) y el total */}
      <p className="counter">{index + 1} / {length}</p>
    </main>
  );
}

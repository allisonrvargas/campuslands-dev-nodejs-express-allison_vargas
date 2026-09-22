// Simulamos un golpe de pingpong como una operacion asincrona real (con una demora, como si
// fuera una llamada a una base de datos o un sensor), usando una
// Promise envuelta en setTimeout.

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function demoraAleatoria() {
  return Math.floor(Math.random() * 40) + 10; // entre 10 y 50 ms
}

export async function jugarPunto() {
  const demoraMs = demoraAleatoria();
  await esperar(demoraMs);

  const ganador = Math.random() > 0.5 ? 'jugador_a' : 'jugador_b';
  return { ganador, demora_ms: demoraMs };
}

// SECUENCIAL: cada punto espera a que termine el anterior antes de
// empezar el siguiente (for...of + await). El tiempo total es la SUMA
// de todas las demoras.
export async function jugarPartido(numeroPuntos = 5) {
  const inicio = Date.now();
  const puntos = [];

  for (let i = 0; i < numeroPuntos; i++) {
    const punto = await jugarPunto();
    puntos.push(punto);
  }

  const duracionTotalMs = Date.now() - inicio;
  const puntosJugadorA = puntos.filter((p) => p.ganador === 'jugador_a').length;

  return {
    puntos,
    marcador: { jugador_a: puntosJugadorA, jugador_b: puntos.length - puntosJugadorA },
    duracion_total_ms: duracionTotalMs,
    modo: 'secuencial (for...await)',
  };
}

// PARALELO: varios partidos corren "al mismo tiempo" con Promise.all.
// El tiempo total se acerca al de UN SOLO partido, no a la suma de todos.
export async function jugarTorneo(numeroPartidos = 3) {
  const inicio = Date.now();

  const partidos = await Promise.all(
    Array.from({ length: numeroPartidos }, () => jugarPartido(5))
  );

  const duracionTotalMs = Date.now() - inicio;

  return {
    partidos,
    total_partidos: partidos.length,
    duracion_total_ms: duracionTotalMs,
    modo: 'paralelo (Promise.all)',
  };
}

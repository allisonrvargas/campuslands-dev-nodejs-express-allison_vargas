import { jugarPartido, jugarTorneo } from '../services/pingpong.service.js';

export function ejecutarEjercicio(req, res) {
  return res.status(200).json({
    ok: true,
    message: 'Ejercicio ejecutado correctamente',
    topic: 'funciones asincronas',
  });
}

export async function obtenerPartido(req, res) {
  try {
    const partido = await jugarPartido(5);

    return res.status(200).json({ ok: true, partido });
  } catch (error) {
    console.error('Error jugando el partido:', error.message);

    return res.status(500).json({
      ok: false,
      message: 'Ocurrio un error jugando el partido',
    });
  }
}

export async function obtenerTorneo(req, res) {
  try {
    const torneo = await jugarTorneo(3);

    return res.status(200).json({ ok: true, torneo });
  } catch (error) {
    console.error('Error jugando el torneo:', error.message);

    return res.status(500).json({
      ok: false,
      message: 'Ocurrio un error jugando el torneo',
    });
  }
}

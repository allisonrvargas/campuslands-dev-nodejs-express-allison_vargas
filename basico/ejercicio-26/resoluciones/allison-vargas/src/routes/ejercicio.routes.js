import { Router } from 'express';
import {
  ejecutarEjercicio,
  obtenerJugadores,
  obtenerJugadorPorId,
  crearNuevoJugador,
  obtenerColas,
  unirseACola,
  forzarErrorServidor,
} from '../controllers/ejercicio.controller.js';
import { verificarApiKey } from '../middlewares/verificarApiKey.js';

const router = Router();

// GET /basico/ejercicio-26
router.get('/', ejecutarEjercicio);

// GET /basico/ejercicio-26/jugadores
router.get('/jugadores', obtenerJugadores);

// GET /basico/ejercicio-26/jugadores/:id
router.get('/jugadores/:id', obtenerJugadorPorId);

// POST /basico/ejercicio-26/jugadores
router.post('/jugadores', crearNuevoJugador);

// GET /basico/ejercicio-26/colas
router.get('/colas', obtenerColas);

// POST /basico/ejercicio-26/colas/:id/unirse (requiere x-api-key)
router.post('/colas/:id/unirse', verificarApiKey, unirseACola);

// GET /basico/ejercicio-26/forzar-error (solo para probar el 500)
router.get('/forzar-error', forzarErrorServidor);

export default router;

import { Router } from 'express';
import {
  ejecutarEjercicio,
  obtenerPartido,
  obtenerTorneo,
} from '../controllers/ejercicio.controller.js';

const router = Router();

// GET /basico/ejercicio-10
router.get('/', ejecutarEjercicio);

// GET /basico/ejercicio-10/partido (secuencial, un partido de 5 puntos)
router.get('/partido', obtenerPartido);

// GET /basico/ejercicio-10/torneo (paralelo, 3 partidos con Promise.all)
router.get('/torneo', obtenerTorneo);

export default router;

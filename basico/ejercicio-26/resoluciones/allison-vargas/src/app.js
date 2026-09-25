import express from 'express';
import ejercicioRoutes from './routes/ejercicio.routes.js';

const app = express();

app.use(express.json());
app.use('/basico/ejercicio-26', ejercicioRoutes);

app.use((error, req, res, next) => {
  console.error('Error inesperado:', error);
  // 500 Internal Server Error: algo salio mal que no era culpa del
  // cliente. Se registra el detalle completo en el servidor, pero al
  // cliente no se le exponen los detalles internos.
  res.status(500).json({ ok: false, message: 'Ocurrio un error interno en el servidor' });
});

export default app;

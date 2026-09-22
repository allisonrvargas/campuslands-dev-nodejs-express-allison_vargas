# Basico 10 - funciones asincronas 

## Que hace este ejercicio

Simula golpes de pingpong como operaciones asincronas con una demora real
(Promise + setTimeout), y compara dos formas de manejar varias
funciones asincronas:

- GET /basico/ejercicio-10/partido: juega 5 puntos secuencialmente,
  con for...of + await. El tiempo total es la suma de cada punto.
- GET /basico/ejercicio-10/torneo: juega 3 partidos en paralelo,
  con Promise.all. El tiempo total se acerca al de un solo partido,
  no a la suma de los tres.

Ambos endpoints devuelven duracion_total_ms para que se note la
diferencia real entre los dos enfoques.

## Estructura

```text
.
|-- package.json
|-- README.md
`-- src
    |-- app.js
    |-- server.js
    |-- routes/
    |   `-- ejercicio.routes.js
    |-- controllers/
    |   `-- ejercicio.controller.js
    `-- services/
        `-- pingpong.service.js
```

- routes: define los endpoints HTTP.
- controllers: recibe la peticion y arma la respuesta.
- services: la logica asincrona (secuencial y paralela).

## Como ejecutar

```bash
cd basico/ejercicio-10/resoluciones/allison-vargas
npm install
npm run dev
```

Respuesta esperada en GET /basico/ejercicio-10:

```json
{
  "ok": true,
  "message": "Ejercicio ejecutado correctamente",
  "topic": "funciones asincronas"
}
```

## Comparar secuencial vs paralelo

```bash
curl http://localhost:3000/basico/ejercicio-10/partido
curl http://localhost:3000/basico/ejercicio-10/torneo
```

El torneo juega 3 partidos completos (15 puntos en total) pero, por
correr en paralelo con Promise.all, su duracion_total_ms suele ser
similar al de un solo partido, no tres veces mayor.

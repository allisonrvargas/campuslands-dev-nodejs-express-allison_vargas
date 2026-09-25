# Basico 26 - codigos de estado 

## Que hace este ejercicio

Simula matchmaking de un shooter competitivo, cubriendo los codigos de
estado que faltaron en el ejercicio 25 (401 y 500):

| Status | Cuando se usa |
|---|---|
| 200 OK | Consulta o accion exitosa |
| 201 Created | Se creo un jugador nuevo |
| 400 Bad Request | El body enviado no es valido |
| 401 Unauthorized | Falta o es invalido el header x-api-key (no sabemos quien eres) |
| 403 Forbidden | El jugador esta identificado, pero su rango no alcanza para esa cola |
| 404 Not Found | El jugador o la cola pedidos no existen |
| 500 Internal Server Error | Un error inesperado real, no relacionado con lo que mando el cliente |

POST /colas/:id/unirse esta protegida por un middleware
(src/middlewares/verificarApiKey.js) que responde 401 ANTES
de llegar al controlador si falta la API key.

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
    |-- services/
    |   `-- shooter.service.js
    |-- validators/
    |   `-- jugador.validator.js
    |-- middlewares/
    |   `-- verificarApiKey.js
    `-- data/
        |-- jugadores.json
        `-- colas.json
```

## Como ejecutar

```bash
cd basico/ejercicio-26/resoluciones/allison-vargas
npm install
npm run dev
```

Respuesta esperada en GET /basico/ejercicio-26:

```json
{
  "ok": true,
  "message": "Ejercicio ejecutado correctamente",
  "topic": "codigos de estado"
}
```

## Ejemplos por status code

```bash
# 200
curl http://localhost:3000/basico/ejercicio-26/jugadores

# 404
curl http://localhost:3000/basico/ejercicio-26/jugadores/99

# 201
curl -X POST http://localhost:3000/basico/ejercicio-26/jugadores -H "Content-Type: application/json" -d "{\"nombre\":\"Milo\",\"rango\":\"plata\"}"

# 400
curl -X POST http://localhost:3000/basico/ejercicio-26/jugadores -H "Content-Type: application/json" -d "{\"rango\":\"inventado\"}"

# 401: falta la api key
curl -X POST http://localhost:3000/basico/ejercicio-26/colas/1/unirse -H "Content-Type: application/json" -d "{\"jugadorId\":1}"

# 200: con api key correcta, cola Casual (rango_minimo bronce)
curl -X POST http://localhost:3000/basico/ejercicio-26/colas/1/unirse -H "Content-Type: application/json" -H "x-api-key: shooter-secret-key" -d "{\"jugadorId\":1}"

# 403: con api key correcta, pero rango insuficiente (Ivy es bronce, cola pide diamante)
curl -X POST http://localhost:3000/basico/ejercicio-26/colas/2/unirse -H "Content-Type: application/json" -H "x-api-key: shooter-secret-key" -d "{\"jugadorId\":2}"

# 500: error inesperado forzado
curl http://localhost:3000/basico/ejercicio-26/forzar-error
```

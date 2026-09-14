# 100 Mexicanos Dijeron · Especial Patrio

Juego web para una dinámica presencial por equipos con preguntas de cultura mexicana, historia de México y fiestas patrias. Está hecho únicamente con HTML, CSS y JavaScript; no necesita base de datos ni registro de participantes.

## Funciones

- Tablero independiente para colocar en un proyector.
- Panel privado para el conductor.
- Preguntas con respuestas populares y puntajes.
- Preguntas de respuesta directa, sin opciones.
- Marcadores laterales para dos equipos, con apariencia de tablero de concurso.
- Tres errores independientes por equipo y puntos ×1, ×2 o ×3.
- Sonidos, animaciones, confeti y pantalla final del ganador.
- Área de juego clara y de alto contraste, rodeada por un marco oscuro tipo pantalla de televisión.
- Respuestas verdes y rojas en dos columnas, con puntuación digital y total visible.
- Bandera de México y personajes originales con vestimenta tricolor.
- Veinte preguntas listas para jugar.

> Los valores de las preguntas con respuestas populares se prepararon para la dinámica y no proceden de una encuesta estadística real.

## Publicarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Coloca en la raíz del repositorio `index.html`, `styles.css`, `questions.js`, `app.js`, la carpeta `assets` y este `README.md`.
3. En GitHub abre **Settings → Pages**.
4. Selecciona **Deploy from a branch**, la rama `main` y la carpeta `/root`.
5. Guarda y espera a que GitHub muestre el enlace público.

## Probarlo en una computadora

La forma más sencilla es abrir la carpeta con Visual Studio Code y utilizar la extensión **Live Server** sobre `index.html`.

1. Conecta el proyector a la laptop con un cable HDMI.
2. Presiona **Windows + P** y selecciona **Extender**; no elijas **Duplicar**.
3. Abre la página del juego en la laptop.
4. Pulsa **Abrir tablero para proyectar** y permite ventanas emergentes si el navegador lo solicita.
5. Mueve la nueva ventana al proyector. El panel de control permanece en la laptop y el público solo ve el tablero.
6. Presiona `F` dentro del tablero para mostrarlo en pantalla completa.

## Modificar preguntas

Todas se encuentran en `questions.js`.

Pregunta con varias respuestas:

```js
{
  type: "survey",
  category: "Gastronomía",
  question: "Menciona un platillo mexicano",
  answers: [
    { text: "Tacos", points: 40 },
    { text: "Pozole", points: 35 },
    { text: "Mole", points: 25 }
  ]
}
```

Pregunta de respuesta directa:

```js
{
  type: "exact",
  category: "Historia",
  question: "¿En qué año inició la Independencia?",
  answer: "1810",
  points: 50
}
```

## Atajos del conductor

- `1–8`: revelar u ocultar respuestas.
- `Z`: marcar un error al equipo verde.
- `X`: marcar un error al equipo rojo.
- `A` / `B`: entregar los puntos al equipo correspondiente.
- `Flecha derecha` / `Flecha izquierda`: cambiar de pregunta.
- `G`: mostrar u ocultar al equipo ganador.
- `U`: deshacer la última acción.

/**
 * BANCO DE PREGUNTAS
 * ------------------------------------------------------------
 * type: "survey"  -> varias respuestas ocultas con puntaje.
 * type: "exact"   -> una sola respuesta correcta.
 *
 * Los puntajes de las preguntas "survey" fueron preparados para
 * esta dinámica y suman 100 puntos; no representan una encuesta
 * estadística real. Puedes cambiar preguntas, respuestas y valores.
 */
window.GAME_QUESTIONS = [
  {
    type: "survey",
    category: "Fiestas patrias",
    question: "Menciona algo que no puede faltar en una Noche Mexicana",
    answers: [
      { text: "Pozole", points: 28 },
      { text: "Música mexicana", points: 22 },
      { text: "Antojitos", points: 18 },
      { text: "Decoración tricolor", points: 14 },
      { text: "Bebidas mexicanas", points: 10 },
      { text: "Fuegos artificiales", points: 8 }
    ]
  },
  {
    type: "exact",
    category: "Biblia · Génesis 6:13–14",
    question: "¿A quién mandó Dios construir un arca?",
    answer: "Noé",
    points: 50
  },
  {
    type: "exact",
    category: "Independencia",
    question: "¿En qué año inició la Guerra de Independencia de México?",
    answer: "1810",
    points: 50
  },
  {
    type: "survey",
    category: "Biblia · Éxodo 7–12",
    question: "Menciona una de las plagas enviadas sobre Egipto",
    answers: [
      { text: "Agua convertida en sangre", points: 24 },
      { text: "Ranas", points: 20 },
      { text: "Piojos o mosquitos", points: 17 },
      { text: "Moscas", points: 15 },
      { text: "Muerte del ganado", points: 13 },
      { text: "Granizo", points: 11 }
    ]
  },
  {
    type: "survey",
    category: "Gastronomía",
    question: "Menciona un platillo mexicano que represente al país",
    answers: [
      { text: "Tacos", points: 35 },
      { text: "Pozole", points: 20 },
      { text: "Mole", points: 15 },
      { text: "Tamales", points: 12 },
      { text: "Enchiladas", points: 10 },
      { text: "Chiles en nogada", points: 8 }
    ]
  },
  {
    type: "exact",
    category: "Independencia",
    question: "¿Qué sacerdote encabezó el llamado Grito de Dolores?",
    answer: "Miguel Hidalgo y Costilla",
    points: 50
  },
  {
    type: "exact",
    category: "Biblia · Mateo 2:1",
    question: "¿En qué ciudad nació Jesús?",
    answer: "Belén",
    points: 50
  },
  {
    type: "survey",
    category: "Personajes históricos",
    question: "Menciona a un personaje de la Independencia de México",
    answers: [
      { text: "Miguel Hidalgo", points: 30 },
      { text: "José María Morelos", points: 24 },
      { text: "Josefa Ortiz", points: 18 },
      { text: "Ignacio Allende", points: 14 },
      { text: "Vicente Guerrero", points: 9 },
      { text: "Leona Vicario", points: 5 }
    ]
  },
  {
    type: "survey",
    category: "Biblia · Mateo 10:2–4",
    question: "Menciona a uno de los doce apóstoles que aparecen en Mateo 10",
    answers: [
      { text: "Pedro", points: 26 },
      { text: "Juan", points: 20 },
      { text: "Santiago", points: 18 },
      { text: "Andrés", points: 15 },
      { text: "Felipe", points: 12 },
      { text: "Tomás", points: 9 }
    ]
  },
  {
    type: "exact",
    category: "Independencia",
    question: "¿En qué año se consumó la Independencia de México?",
    answer: "1821",
    points: 50
  },
  {
    type: "exact",
    category: "Biblia · 1 Samuel 17:49–50",
    question: "¿Quién venció a Goliat?",
    answer: "David",
    points: 50
  },
  {
    type: "survey",
    category: "Identidad mexicana",
    question: "Menciona una tradición mexicana reconocida en el mundo",
    answers: [
      { text: "Día de Muertos", points: 30 },
      { text: "Mariachi", points: 22 },
      { text: "Gastronomía mexicana", points: 18 },
      { text: "Posadas", points: 12 },
      { text: "Lucha libre", points: 10 },
      { text: "Danza folclórica", points: 8 }
    ]
  },
  {
    type: "exact",
    category: "Símbolos nacionales",
    question: "¿Quién escribió la letra del Himno Nacional Mexicano?",
    answer: "Francisco González Bocanegra",
    points: 60
  },
  {
    type: "survey",
    category: "Biblia · Gálatas 5:22–23",
    question: "Menciona un fruto del Espíritu señalado en Gálatas 5",
    answers: [
      { text: "Amor", points: 24 },
      { text: "Gozo", points: 20 },
      { text: "Paz", points: 18 },
      { text: "Paciencia", points: 15 },
      { text: "Benignidad", points: 13 },
      { text: "Bondad", points: 10 }
    ]
  },
  {
    type: "survey",
    category: "Independencia",
    question: "Menciona un símbolo relacionado con la Independencia de México",
    answers: [
      { text: "La bandera", points: 30 },
      { text: "Campana de Dolores", points: 22 },
      { text: "Miguel Hidalgo", points: 18 },
      { text: "El Grito", points: 14 },
      { text: "Ángel de la Independencia", points: 10 },
      { text: "Colores patrios", points: 6 }
    ]
  },
  {
    type: "exact",
    category: "Biblia · Génesis 7:12",
    question: "¿Cuántos días y cuántas noches llovió durante el diluvio?",
    answer: "40 días y 40 noches",
    points: 50
  },
  {
    type: "exact",
    category: "Documentos históricos",
    question: "¿Qué documento presentó José María Morelos en 1813?",
    answer: "Sentimientos de la Nación",
    points: 60
  },
  {
    type: "survey",
    category: "Biblia · Evangelios",
    question: "Menciona un milagro de Jesús narrado en los Evangelios",
    answers: [
      { text: "Convertir el agua en vino", points: 22 },
      { text: "Alimentar a cinco mil", points: 20 },
      { text: "Caminar sobre el agua", points: 18 },
      { text: "Calmar la tempestad", points: 16 },
      { text: "Sanar a un ciego", points: 14 },
      { text: "Resucitar a Lázaro", points: 10 }
    ]
  },
  {
    type: "survey",
    category: "Patrimonio",
    question: "Menciona un lugar histórico o arqueológico famoso de México",
    answers: [
      { text: "Teotihuacán", points: 24 },
      { text: "Chichén Itzá", points: 22 },
      { text: "Castillo de Chapultepec", points: 18 },
      { text: "Centro Histórico", points: 15 },
      { text: "Palenque", points: 12 },
      { text: "Monte Albán", points: 9 }
    ]
  },
  {
    type: "exact",
    category: "México independiente",
    question: "¿Quién fue el primer presidente de México?",
    answer: "Guadalupe Victoria",
    points: 60
  },
  {
    type: "exact",
    category: "Biblia · Éxodo 31:18",
    question: "¿A quién entregó Dios las dos tablas del testimonio?",
    answer: "Moisés",
    points: 50
  },
  {
    type: "survey",
    category: "Septiembre mexicano",
    question: "Menciona algo que ves en las calles durante el mes patrio",
    answers: [
      { text: "Banderas", points: 32 },
      { text: "Luces tricolores", points: 22 },
      { text: "Papel picado", points: 17 },
      { text: "Puestos de antojitos", points: 13 },
      { text: "Sombreros", points: 9 },
      { text: "Bigotes decorativos", points: 7 }
    ]
  },
  {
    type: "survey",
    category: "Biblia · Efesios 6:14–17",
    question: "Menciona una pieza de la armadura de Dios",
    answers: [
      { text: "Cinturón de la verdad", points: 20 },
      { text: "Coraza de justicia", points: 19 },
      { text: "Calzado del evangelio de la paz", points: 17 },
      { text: "Escudo de la fe", points: 17 },
      { text: "Yelmo de la salvación", points: 15 },
      { text: "Espada del Espíritu", points: 12 }
    ]
  },
  {
    type: "exact",
    category: "Símbolos nacionales",
    question: "¿En qué fecha se celebra el Día de la Bandera en México?",
    answer: "24 de febrero",
    points: 70
  },
  {
    type: "exact",
    category: "Biblia · Génesis 41:15–16, 25",
    question: "¿Quién interpretó los sueños del faraón en Egipto?",
    answer: "José",
    points: 60
  },
  {
    type: "survey",
    category: "México en el mundo",
    question: "Menciona a una figura mexicana reconocida internacionalmente",
    answers: [
      { text: "Frida Kahlo", points: 28 },
      { text: "Guillermo del Toro", points: 20 },
      { text: "Diego Rivera", points: 17 },
      { text: "Cantinflas", points: 14 },
      { text: "Salma Hayek", points: 12 },
      { text: "Vicente Fernández", points: 9 }
    ]
  },
  {
    type: "survey",
    category: "Sabores de México",
    question: "Menciona una bebida tradicional mexicana",
    answers: [
      { text: "Tequila", points: 28 },
      { text: "Agua de horchata", points: 22 },
      { text: "Agua de jamaica", points: 17 },
      { text: "Mezcal", points: 14 },
      { text: "Atole", points: 11 },
      { text: "Chocolate caliente", points: 8 }
    ]
  },
  {
    type: "survey",
    category: "Biblia · Génesis 35:23–26",
    question: "Menciona a uno de los hijos de Jacob",
    answers: [
      { text: "Rubén", points: 22 },
      { text: "José", points: 20 },
      { text: "Judá", points: 18 },
      { text: "Benjamín", points: 16 },
      { text: "Leví", points: 14 },
      { text: "Simeón", points: 10 }
    ]
  },
  {
    type: "exact",
    category: "Símbolos nacionales",
    question: "¿Cuáles son los tres colores de la bandera de México?",
    answer: "Verde, blanco y rojo",
    points: 40
  },
  {
    type: "exact",
    category: "Biblia · Jonás 1:17",
    question: "¿Qué profeta fue tragado por un gran pez?",
    answer: "Jonás",
    points: 50
  },
  {
    type: "survey",
    category: "Música mexicana",
    question: "Menciona un género o estilo de música tradicional mexicana",
    answers: [
      { text: "Mariachi", points: 34 },
      { text: "Música norteña", points: 20 },
      { text: "Banda sinaloense", points: 18 },
      { text: "Música ranchera", points: 12 },
      { text: "Son jarocho", points: 9 },
      { text: "Marimba", points: 7 }
    ]
  },
  {
    type: "survey",
    category: "Biblia · Génesis 1",
    question: "Menciona algo creado por Dios en el relato de Génesis 1",
    answers: [
      { text: "La luz", points: 22 },
      { text: "El firmamento o cielo", points: 18 },
      { text: "La tierra seca", points: 17 },
      { text: "La vegetación", points: 16 },
      { text: "El sol, la luna y las estrellas", points: 15 },
      { text: "Los animales", points: 12 }
    ]
  },
  {
    type: "exact",
    category: "Consumación de la Independencia",
    question: "¿Cómo se llamó el ejército que entró a la Ciudad de México en 1821?",
    answer: "Ejército Trigarante",
    points: 70
  },
  {
    type: "survey",
    category: "Artesanías mexicanas",
    question: "Menciona una artesanía mexicana reconocida",
    answers: [
      { text: "Alebrijes", points: 26 },
      { text: "Talavera", points: 22 },
      { text: "Barro negro", points: 17 },
      { text: "Textiles bordados", points: 15 },
      { text: "Rebozos", points: 11 },
      { text: "Arte wixárika", points: 9 }
    ]
  },
  {
    type: "exact",
    category: "Biblia · Lucas 1:27, 31",
    question: "¿Cómo se llamaba la madre de Jesús?",
    answer: "María",
    points: 50
  }
];

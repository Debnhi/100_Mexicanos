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
    category: "Independencia",
    question: "¿En qué año inició la Guerra de Independencia de México?",
    answer: "1810",
    points: 50
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
    type: "exact",
    category: "Independencia",
    question: "¿En qué año se consumó la Independencia de México?",
    answer: "1821",
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
    category: "Documentos históricos",
    question: "¿Qué documento presentó José María Morelos en 1813?",
    answer: "Sentimientos de la Nación",
    points: 60
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
    type: "exact",
    category: "Símbolos nacionales",
    question: "¿En qué fecha se celebra el Día de la Bandera en México?",
    answer: "24 de febrero",
    points: 70
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
    type: "exact",
    category: "Símbolos nacionales",
    question: "¿Cuáles son los tres colores de la bandera de México?",
    answer: "Verde, blanco y rojo",
    points: 40
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
  }
];

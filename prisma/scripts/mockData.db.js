import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

      const companies = [

            {
                  id: 1,
                  name: 'Servivet',
                  logo: 'https://i.postimg.cc/9Mq9MfDs/servivet-logo-20.png',
          backgroundColor: "#1f8a4d-#a65e2e-#6dca99-#f6eb61",
                  createdAt: new Date('2024-09-17T17:26:15.229Z'),
                  updatedAt: new Date('2024-09-24T20:23:14.560Z'),
            },
            {
                  id: 2,
                  name: 'Doralben',
                  logo: 'https://i.postimg.cc/B6dxcFWq/DORALBEN-logo.png',
              backgroundColor: "#4caf50-#1b5e20-#30b066-#326e31",
            },
            {
                  id: 3,
                  name: 'Unimedical',
                  logo: 'https://i.postimg.cc/NfG0CMgY/Logo-Unimedical-para-Ruleta-removebg.png',
              backgroundColor: "#fcc300-#111111-#E6B200-#111111",
                  rouletteColors: '#FFD700-#FFDB4D-#FFE066-#FFE680-#FFEB99-#FFF0B3-#FFF5CC'
            },
            {
                  id: 4,
                  name: 'VitalCan',
                  logo: 'https://i.postimg.cc/43QM0J4k/PNG-vitalcan.png',
                  backgroundColor: "#d69f8c-#d0bda6-#d0bda6-#d69f8c"
            },
            {
                  id: 5,
                  name: 'Bionatural',
                  logo: 'https://i.postimg.cc/tRhCpXq5/Logos-Bionatural-Super-Premium-Natural.png',
                  backgroundColor: "#1d301a-#638f69-#1d301a-#638f69"
            }

      ]

      for (const company of companies) {
            
            await prisma.company.create({
                  data: company
            })

  }
  
  //TODO: IMPORTANTE, NO OLVIDARSE DE AGREGAR LOS SCREENSAVERS  
  const screenSavers = [
  // Servivet ScreenSavers
    {
      id: 1,
      companyId: companies[0].id,
      path: '/Servivet/videos/vid.webm',
    },
    // Doralben ScreenSavers
    {
      id: 2,
      companyId: companies[1].id,
      path: '/Doralben/videos/vid1.webm',
    },
    {
      id: 3,
      companyId: companies[1].id,
      path: '/Doralben/videos/vid2.webm',
    },
    {
      id: 4,
      companyId: companies[1].id,
      path: '/Doralben/videos/vid3.webm',
    },
    {
      id: 5,
      companyId: companies[1].id,
      path: '/Doralben/videos/vid4.webm',
    },
    {
      id: 6,
      companyId: companies[1].id,
      path: '/Doralben/videos/vid5.webm',
    },
    {
      id: 7,
      companyId: companies[1].id,
      path: '/Doralben/videos/vid6.webm',
    },
    {
      id: 8,
      companyId: companies[1].id,
      path: '/Doralben/videos/vid7.webm',
    },
    {
      id: 9,
      companyId: companies[1].id,
      path: '/Doralben/videos/vid8.webm',
    },
    {
      id: 10,
      companyId: companies[1].id,
      path: '/Doralben/videos/vid9.webm',
    },
    {
      id: 11,
      companyId: companies[1].id,
      path: '/Doralben/videos/vid10.webm',
    },
    {
      id: 12,
      companyId: companies[1].id,
      path: '/Doralben/videos/vid11.webm',
    },
    {
      id: 13,
      companyId: companies[1].id,
      path: '/Doralben/videos/vid12.webm',
    },
    // ScreenSavers Unimedical
    {
      id: 15,
      companyId: companies[2].id,
      path: '/Unimedical/imgs/img1.jpg',
    },
    // ScreenSavers VitalCan
    {
      id: 16,
      companyId: companies[3].id,
      path: '/VitalCan/videos/vid1.webm',
    },
    {
      id: 17,
      companyId: companies[3].id,
      path: '/VitalCan/videos/vid2.webm',
    },
  ]
  
  for (const screenSaver of screenSavers) {
    await prisma.screenSaver.create({
      data: screenSaver
    })
  }

      const games = [
        {
                id: 1,
                  companyId: companies[0].id, 
                  name: 'Trivia Servivet',
                  createdAt: new Date('2024-09-17T17:26:35.712Z'),
                  updatedAt: new Date('2024-09-17T17:25:29.012Z'),
                  category: 'ALTERNATIVE_QA'
            },
        {
                id: 2,
                  companyId: companies[1].id,
                  name: 'Trivia Doralben',
                  category: 'ALTERNATIVE_QA_WITHOUT_TIMER',
                  updatedAt: new Date('2024-09-17T17:25:29.012Z'),
            },
        {
              id: 3,
                  companyId: companies[2].id,
                  category: 'ROULETTE',
                  name: 'Ruleta de premios',
                  updatedAt: new Date('2024-09-17T17:25:29.012Z'),
            },
        {
              id: 4,
                  companyId: companies[3].id,
          name: 'Trivia VitalCan',
                  category: 'ALTERNATIVE_QA',
                  updatedAt: new Date('2024-09-17T17:25:29.012Z'),
        },
        // Trivia Unimedical
        {
          id: 5,
          companyId: companies[2].id,
          name: 'Trivia Unimedical',
          category: 'NEW_ALTERNATIVE',
          updatedAt: new Date('2024-09-17T17:25:29.012Z'),
        }
      ]
      
      for (const game of games) {
            await prisma.game.create({
                  data: game,
            });
      }
      
      const prizes = [
      /* Premios Servivet */
            {
                  name: '10% de descuento en la próxima compra',
                  stock: 100,
                  companyId: companies[0].id,
            },
            {
                  name: '50% de descuento en la próxima compra',
                  stock: 10,
                  companyId: companies[0].id,
                  gameId: games[0].id
            },
            /* Premios Doralben */
            {
                  name: '10% de descuento en la próxima compra',
                  stock: 100,
                  companyId: companies[1].id,
            },
            {
                  name: '15% de descuento en la próxima compra',
                  stock: 75,
                  companyId: companies[1].id,
            },
            {
                  name: '25% de descuento en la próxima compra',
                  stock: 50,
                  companyId: companies[1].id,
            },
            {
                  name: '50% de descuento en la próxima compra',
                  stock: 25,
                  companyId: companies[1].id,
                  gameId: games[2].id
            },
            /* Premios unimedical */
            {
                  name: 'Taza',
                  stock: 144,
              companyId: companies[2].id,
              probability: 37.5,
              
            },
            {
                  name: 'Casaca',
                  stock: 100,
              companyId: companies[2].id,
                  probability: 25,
            },
            {
                  name: 'Descuento 10%',
                  stock: 10000,
              companyId: companies[2].id,
              probability: 12.5,
                  description: '10% de descuento en la próxima compra (tope $2000)',
            },
            {
                  name: 'Seguí participando',
                  stock: 10000,
              companyId: companies[2].id,
                  probability: 25
            },
            /* Premios VitalCan */
            {
                  name: '10% de descuento en la próxima compra',
                  stock: 100,
                  companyId: companies[3].id,
        },
        /* Premios Bionatural */
        {
            name: '10% de descuento en la próxima compra',
            stock: 100,
            companyId: companies[4].id,
        }
      ]

      for (const prize of prizes) {
            await prisma.prize.create({
                  data: prize,
            });
      }

      const preguntasServivet = [
            {
              text: '¿Cuáles son los únicos felinos que viven en grupo?',
              options: [
                { text: 'Tigres', isCorrect: false },
                { text: 'Gato doméstico', isCorrect: false },
                { text: 'Leones', isCorrect: true },
                { text: 'Pumas', isCorrect: false },  // Nueva opción
              ],
            },
            {
              text: '¿Cuál es el roedor más grande del mundo?',
              options: [
                { text: 'Capincho', isCorrect: true },
                { text: 'Nuitria', isCorrect: false },
                { text: 'Rata gigante de Gambia', isCorrect: false },
                { text: 'Castor', isCorrect: false },  // Nueva opción
              ],
            },
            {
              text: '¿Cuál es el lagarto más largo del mundo?',
              options: [
                { text: 'Lagarto overo', isCorrect: false },
                { text: 'Iguana rinoceronte', isCorrect: false },
                { text: 'Dragón de Komodo', isCorrect: true },
                { text: 'Caimán', isCorrect: false },  // Nueva opción
              ],
            },
            {
              text: '¿Cuánto puede llegar pesar el corazón de una ballena azul?',
              options: [
                { text: '50kg', isCorrect: false },
                { text: '150kg', isCorrect: false },
                { text: '300kg', isCorrect: true },
                { text: '200kg', isCorrect: false },  // Nueva opción
              ],
            },
            {
              text: '¿Qué perro tiene la lengua azul?',
              options: [
                { text: 'Galgo', isCorrect: false },
                { text: 'Chow Chow', isCorrect: true },
                { text: 'Dogo Argentino', isCorrect: false },
                { text: 'Shar Pei', isCorrect: false },  // Nueva opción
              ],
            },
            {
              text: '¿Qué mamífero no tiene cuerdas vocales?',
              options: [
                { text: 'Delfín', isCorrect: false },
                { text: 'Jirafa', isCorrect: true },
                { text: 'Elefante', isCorrect: false },
                { text: 'Ballena', isCorrect: false },  // Nueva opción
              ],
            },
            {
              text: '¿Qué animal no puede saltar?',
              options: [
                { text: 'Elefante', isCorrect: true },
                { text: 'Jirafa', isCorrect: false },
                { text: 'Koala', isCorrect: false },
                { text: 'Hipopótamo', isCorrect: false },  // Nueva opción
              ],
            },
            {
              text: '¿Qué animal se alimenta exclusivamente de bambú?',
              options: [
                { text: 'Panda', isCorrect: true },
                { text: 'Koala', isCorrect: false },
                { text: 'Orangután', isCorrect: false },
                { text: 'Lémur', isCorrect: false },  // Nueva opción
              ],
            },
            {
              text: '¿Qué ave puede volar hacia atrás?',
              options: [
                { text: 'Gaviota', isCorrect: false },
                { text: 'Faisán', isCorrect: false },
                { text: 'Colibrí', isCorrect: true },
                { text: 'Águila', isCorrect: false },  // Nueva opción
              ],
            },
            {
              text: '¿Qué insecto puede levantar hasta 50 veces su peso corporal?',
              options: [
                { text: 'Hormiga', isCorrect: true },
                { text: 'Pulga', isCorrect: false },
                { text: 'Mosquito', isCorrect: false },
                { text: 'Escarabajo', isCorrect: false },  // Nueva opción
              ],
            },
            {
                  text: '¿Qué mamífero tiene el embarazo más largo? (22 meses)',
                  options: [
                        { text: 'Jirafa', isCorrect: false },
                        { text: 'Elefante', isCorrect: true },
                    { text: 'Hipopótamo', isCorrect: false },
                    { text: 'Rinoceronte' , isCorrect: false },  // Nueva opción
                  ],
            },
            {
                  text: '¿Qué ave pone el huevo más grande?',
                  options: [
                        { text: 'Avestruz', isCorrect: true },
                        { text: 'Condor', isCorrect: false },
                    { text: 'Albatros', isCorrect: false },
                    { text: 'Águila', isCorrect: false },  // Nueva opción
                  ],
            },
            {
                  text: '¿Cuál es la especie de tiburón más grande?',
                  options: [
                        { text: 'Tiburón Blanco', isCorrect: false },
                        { text: 'Tiburón peregrino', isCorrect: false },
                    { text: 'Tiburón ballena', isCorrect: true },
                    { text: 'Tiburón martillo', isCorrect: false },  // Nueva opción
                  ],
            },
            {
                  text: '¿Cuántos litros de sangre por latido bombea el corazón de una ballena azul?',
                  options: [
                        { text: '10 litros', isCorrect: false },
                        { text: '50 litros', isCorrect: false },
                    { text: '80 litros', isCorrect: true },
                    { text: '100 litros', isCorrect: false },  // Nueva opción
                  ],
            },
            {
                  text: '¿Qué animal cuando se ve amenazado simula estar muerto?',
                  options: [
                        { text: 'Zorro', isCorrect: false },
                        { text: 'Comadreja', isCorrect: true },
                    { text: 'Mulita', isCorrect: false },
                    { text: 'Conejo', isCorrect: false },  // Nueva opción
                  ],
            },
            {
                  text: '¿Qué animal no tiene la capacidad de vomitar?',
                  options: [
                        { text: 'Caballo', isCorrect: true },
                        { text: 'Vaca', isCorrect: false },
                    { text: 'Oveja', isCorrect: false },
                    { text: 'Cabra', isCorrect: false },  // Nueva opción
                  ],
            },
            {
                  text: '¿Cuál es el animal terrestre más rápido?',
                  options: [
                        { text: 'Lobo', isCorrect: false },
                        { text: 'Caballo', isCorrect: false },
                    { text: 'Guepardo', isCorrect: true },
                    { text: 'León', isCorrect: false },  // Nueva opción
                  ],
            },
            {
                  text: '¿Cuál es el mamífero terrestre más lento?',
                  options: [
                        { text: 'Perezoso', isCorrect: true },
                        { text: 'Oso Hormiguero', isCorrect: false },
                    { text: 'Koala', isCorrect: false },
                    { text: 'Canguro', isCorrect: false },  // Nueva opción
                  ],
            },
            {
                  text: '¿Qué animal tiene la presión arterial más alta?',
                  options: [
                        { text: 'Oso', isCorrect: false },
                        { text: 'Rinoceronte', isCorrect: false },
                    { text: 'Jirafa', isCorrect: true },
                    { text: 'Elefante', isCorrect: false },  // Nueva opción
                  ],
            },
            {
                  text: '¿Cuántas plumas en promedio hay en la cola de un pavo real?',
                  options: [
                        { text: '100', isCorrect: false },
                        { text: '200', isCorrect: true },
                    { text: '300', isCorrect: false },
                    { text: '400', isCorrect: false },  // Nueva opción
                  ],
            },
            {
                  text: '¿Qué peso puede alcanzar una ballena azul?',
                  options: [
                        { text: '100.000kg', isCorrect: false },
                        { text: '120.000kg', isCorrect: false },
                    { text: '180.000kg', isCorrect: true },
                    { text: '200.000kg', isCorrect: false },  // Nueva opción
                  ],
            },
            {
                  text: '¿Cuántos compartimentos tienen los estómagos de las vacas?',
                  options: [
                        { text: '2', isCorrect: false },
                        { text: '3', isCorrect: false },
                    { text: '4', isCorrect: true },
                    { text: '5', isCorrect: false },  // Nueva opción
                  ],
            },
            {
                  text: '¿Cuántas vidas se dice que tiene un gato?',
                  options: [
                        { text: '4', isCorrect: false },
                        { text: '5', isCorrect: false },
                    { text: '7', isCorrect: true },
                    { text: '3', isCorrect: false },  // Nueva opción
                  ],
            },
            {
                  text: '¿Cuántos años está cumpliendo Servivet?',
                  options: [
                        { text: '10', isCorrect: false },
                        { text: '15', isCorrect: false },
                    { text: '20', isCorrect: true },
                    { text: '25', isCorrect: false },  // Nueva opción
                  ],
            },
            {
                  text: '¿En qué zona trabaja Servivet?',
                  options: [
                        { text: 'Montevideo', isCorrect: false },
                        { text: 'Montevideo y Costa de Oro', isCorrect: false },
                    { text: 'Todo el Uruguay', isCorrect: true },
                    { text: 'Montevideo y Canelones', isCorrect: false },  // Nueva opción
                  ],
            },
            {
                  text: 'Servivet es…',
                  options: [
                        { text: 'Una veterinaria', isCorrect: true },
                        { text: 'Una distribuidora de medicamentos e insumos veterinarios', isCorrect: false },
                    { text: 'Un laboratorio', isCorrect: false },
                    { text: 'Un petshop', isCorrect: false },  // Nueva opción
                  ],
            },
            {
                  text: '¿Con cuántos laboratorios y proveedores trabaja Servivet?',
                  options: [
                        { text: '10', isCorrect: false },
                        { text: '20', isCorrect: false },
                    { text: 'Más de 40', isCorrect: true },
                    { text: '30', isCorrect: false },  // Nueva opción
                  ],
            },
            {
                  text: '¿Con cuántos clientes cuenta hoy en día Servivet?',
                  options: [
                        { text: '100', isCorrect: false },
                        { text: '500', isCorrect: false },
                    { text: 'Más de 800', isCorrect: true },
                    { text: '700', isCorrect: false },  // Nueva opción
                  ],
            },
            {
                  text: '¿Con cuántos vendedores cuenta Servivet?',
                  options: [
                        { text: '2', isCorrect: false },
                        { text: '3', isCorrect: false },
                    { text: '6', isCorrect: true },
                    { text: '4', isCorrect: false },  // Nueva opción
                  ],
            },
            {
                  text: '¿Cuáles son los colores característicos de Servivet?',
                  options: [
                        { text: 'Rojo y azul', isCorrect: true },
                        { text: 'Verde y naranja', isCorrect: false },
                    { text: 'Violeta y amarillo', isCorrect: false },
                    { text: 'Celeste y blanco', isCorrect: false },  // Nueva opción
                  ],
            }
          ];
          

      for (const pregunta of preguntasServivet) {
            await prisma.question.create({
                  data: {
                        questionText: pregunta.text,
                        questionType: 'multiple_choice',
                        gameId: games[0].id,
                        options: {
                              create: pregunta.options.map((option) => ({
                                    optionText: option.text,
                                    isCorrect: option.isCorrect,
                              })),
                        },
                  },
            });
  }
  
  const preguntasDoralben = [
  {
    text: '¿Cuál es el principal componente de Feline FULLSPOT que actúa contra las pulgas?',
    options: [
      { text: 'Ivermectina', isCorrect: false },
      { text: 'Praziquantel', isCorrect: false },
      { text: 'Imidacloprid', isCorrect: true },
      { text: 'Selamectina', isCorrect: false },
    ],
  },
  {
    text: 'Seleccione la respuesta correcta acerca de la efectividad de Feline FULLSPOT contra las pulgas:',
    options: [
      { text: 'Efecto instantáneo ya que es un producto de contacto', isCorrect: false },
      { text: 'Tiene un 100% de efectividad dentro de las 4 horas de aplicación', isCorrect: false },
      { text: 'Brinda protección por 30 días', isCorrect: false },
      { text: 'Todas son correctas', isCorrect: true },
    ],
  },
  {
    text: '¿Cómo actúa el Imidacloprid en el sistema nervioso de los insectos?',
    options: [
      { text: 'Bloqueando los receptores de acetilcolina', isCorrect: true },
      { text: 'Estimulando los receptores muscarínicos', isCorrect: false },
      { text: 'Asociándose con los receptores nicotínicos', isCorrect: false },
      { text: 'Inhibiendo la liberación de GABA', isCorrect: false },
    ],
  },
  {
    text: 'Además de los parásitos externos, ¿qué parásitos internos elimina Feline FULLSPOT?',
    options: [
      { text: 'Solo nematodos', isCorrect: false },
      { text: 'Nematodos y cestodos', isCorrect: true },
      { text: 'Trematodos y ectoparásitos', isCorrect: false },
      { text: 'Solo cestodos', isCorrect: false },
    ],
  },
  {
    text: '¿Qué ventajas ofrece la desparasitación de los gatos con Feline?',
    options: [
      { text: 'Minimiza el estrés en el paciente', isCorrect: false },
      { text: 'Maximiza la seguridad al manipular a los gatos', isCorrect: false },
      { text: 'Mejora la experiencia durante la consulta', isCorrect: false },
      { text: 'Todas son correctas', isCorrect: true },
    ],
  },
  {
    text: '¿Qué efecto tiene la Ivermectina en los parásitos?',
    options: [
      { text: 'Causa parálisis flácida', isCorrect: true },
      { text: 'Estimula el sistema nervioso', isCorrect: false },
      { text: 'Destruye los receptores nicotínicos', isCorrect: false },
      { text: 'Inhibe la contracción muscular', isCorrect: false },
    ],
  },
  {
    text: '¿Qué efecto tiene el Praziquantel en los cestodos y trematodos?',
    options: [
      { text: 'Hiperpolariza las células nerviosas', isCorrect: false },
      { text: 'Causa contracción tetánica y vacuolización', isCorrect: true },
      { text: 'Bloquea los canales de sodio', isCorrect: false },
      { text: 'Estimula la liberación de acetilcolina', isCorrect: false },
    ],
  },
  {
    text: '¿Cuál es el intervalo recomendado entre aplicaciones de Feline FULLSPOT?',
    options: [
      { text: 'Cada 2 semanas', isCorrect: false },
      { text: 'Cada 6 semanas', isCorrect: false },
      { text: 'Cada 4 semanas', isCorrect: true },
      { text: 'Cada 8 semanas', isCorrect: false },
    ],
  },
  {
    text: 'Feline FULLSPOT corta el ciclo de la Dipilidiasis a través del siguiente mecanismo:',
    options: [
      { text: 'Sólo al eliminar al huésped intermediario: la pulga.', isCorrect: false },
      { text: 'Por un doble efecto: Al eliminar la fase adulta en huésped intermediario y al cisticercoide en el animal', isCorrect: true },
      { text: 'Por un doble efecto: Al eliminar al cisticercoide en el huésped intermediario y a la fase adulta en el animal', isCorrect: false },
      { text: 'Sólo al eliminar al gusano plano a nivel intestinal', isCorrect: false },
    ],
  },
  {
    text: '¿En qué casos podría recomendar Feline ENDOSPOT?',
    options: [
      { text: 'Desparasitación cat friendly de gatitos a partir de las 4 semanas de edad.', isCorrect: false },
      { text: 'Desparasitación de gatos que recientemente fueron desparasitados externamente', isCorrect: false },
      { text: 'Refuerzo en la desparasitación interna de gatos muy parasitados o inmunocomprometidos', isCorrect: false },
      { text: 'Todas son correctas', isCorrect: true },
    ],
  },
  {
    text: '¿Cuál es la edad recomendada para la aplicación de Feline FULLSPOT?',
    options: [
      { text: '4 semanas', isCorrect: false },
      { text: '12 semanas', isCorrect: false },
      { text: '8 semanas', isCorrect: true },
      { text: '16 semanas', isCorrect: false },
    ],
  },
  {
    text: 'Califique la siguiente afirmación acerca de Dipylidium caninum: “Feline FULLSPOT corta el ciclo del parasito porque actúa tanto en las pulgas (HI) como en el parasito adulto alojado en el intestino de los felinos (HD)”',
    options: [
      { text: 'Falso', isCorrect: false },
      { text: 'Verdadero', isCorrect: true },
    ],
  },
  {
    text: '¿Qué parásitos trata específicamente Feline ENDOSPOT?',
    options: [
      { text: 'Sólo Pulgas y trematodos', isCorrect: false },
      { text: 'Sólo nematodos y cestodos', isCorrect: true },
      { text: 'Sólo Áscaris spp. y pulgas', isCorrect: false },
      { text: 'Sólo nematodos adultos y larvas', isCorrect: false },
    ],
  },
  {
    text: 'Salvo que el criterio profesional indique lo contrario, ¿cuál es el intervalo recomendado entre aplicaciones de Feline ENDOSPOT?',
    options: [
      { text: 'Cada 15 días', isCorrect: false },
      { text: 'Cada 30 días', isCorrect: true },
      { text: 'Cada 21 días', isCorrect: false },
      { text: 'Cada 45 días', isCorrect: false },
    ],
  },
  {
    text: '¿Cómo actúa la Ivermectina sobre los parásitos?',
    options: [
      { text: 'Aumenta la permeabilidad de membranas a iones cloruro', isCorrect: true },
      { text: 'Inhibe la acción del GABA', isCorrect: false },
      { text: 'Destruye los canales de sodio', isCorrect: false },
      { text: 'Bloquea la transmisión de acetilcolina', isCorrect: false },
    ],
  },
  {
    text: '¿En qué situaciones debe considerarse una aplicación más frecuente de Feline FULLSPOT?',
    options: [
      { text: 'En animales convivientes con perros', isCorrect: false },
      { text: 'Si el gato está en ambientes muy infestados con parásitos', isCorrect: true },
      { text: 'Si el animal es menor de 12 semanas', isCorrect: false },
    ],
  },
  {
    text: '¿Cuál es la edad recomendada para la aplicación de Feline ENDOSPOT?',
    options: [
      { text: '4 semanas', isCorrect: false },
      { text: '12 semanas', isCorrect: false },
      { text: '8 semanas', isCorrect: true },
      { text: '16 semanas', isCorrect: false },
    ],
  },
  {
    text: '¿Cuál es el peso mínimo recomendado para la administración de Feline FULLSPOT?',
    options: [
      { text: '0.5 kg', isCorrect: false },
      { text: '1 kg', isCorrect: true },
      { text: '15 kg', isCorrect: false },
      { text: '2 kg', isCorrect: false },
    ],
  },
  {
    text: 'Califique la siguiente afirmación acerca de Feline y Protech Gatos: “Se puede alternar el uso de Feline FULLSPOT y Protech Gatos para lograr un mejor control de los parásitos externos especialmente en ambientes infestados y en los meses de calor entre primavera-verano”',
    options: [
      { text: 'Falso', isCorrect: true },
      { text: 'Verdadero', isCorrect: false },
    ],
  },
  {
    text: 'Califique la siguiente afirmación acerca de Feline FULLSPOT: “Es un tratamiento spot-on efectivo contra el ácaro del oído Otodectes cynotis, principal causa de otitis en gatos”',
    options: [
      { text: 'Falso', isCorrect: false },
      { text: 'Verdadero', isCorrect: true },
    ],
  },
];


      for (const pregunta of preguntasDoralben) {
            await prisma.question.create({
                  data: {
                        questionText: pregunta.text,
                        questionType: 'multiple_choice',
                        gameId: games[1].id,
                        options: {
                              create: pregunta.options.map((option) => ({
                                    optionText: option.text,
                                    isCorrect: option.isCorrect,
                              })),
                        },
                  },
            });
      }

const preguntasVitalCan = [
      {
        "text": "¿Cuáles ingredientes favorecen específicamente la salud digestiva?",
        "options": [
          { "text": "Harina de salmón, arroz, arvejas, gluten meal, aceite de pollo.", "isCorrect": false },
          { "text": "Pulpa de remolacha, levadura de cerveza, zeolita, inulina, extracto de yuca schidigera.", "isCorrect": true },
          { "text": "Extracto de romero, lecitina, tocoferoles.", "isCorrect": false },
          { "text": "Glucosamina, metilsulfonilmetano.", "isCorrect": false }
        ]
      },
      {
        "text": "¿Qué ingrediente de las recetas para gatos ayuda en el tránsito digestivo para controlar las bolas de pelo?",
        "options": [
          { "text": "Zeolita.", "isCorrect": false },
          { "text": "Manganeso.", "isCorrect": false },
          { "text": "Celulosa.", "isCorrect": true },
          { "text": "Glucosamina.", "isCorrect": false }
        ]
      },
      {
        "text": "¿Qué ingrediente de la dieta proporciona los mananoligosacáridos?",
        "options": [
          { "text": "Pulpa de remolacha.", "isCorrect": false },
          { "text": "Levadura de cerveza.", "isCorrect": false },
          { "text": "Paredes de levadura.", "isCorrect": true },
          { "text": "Celulosa.", "isCorrect": false }
        ]
      },
      {
        "text": "¿En qué presentaciones están disponibles los productos de Vitalcan Balanced Natural Recipe para perro?",
        "options": [
          { "text": "3 kg y 7,5 kg.", "isCorrect": false },
          { "text": "3 kg y 15 kg.", "isCorrect": false },
          { "text": "3 kg, 7,5 kg y 15 kg.", "isCorrect": true },
          { "text": "Ninguna es correcta.", "isCorrect": false }
        ]
      },
      {
        "text": "¿Para qué sirve la L-carnitina?",
        "options": [
          { "text": "Para mejorar el metabolismo de los ácidos grasos.", "isCorrect": true },
          { "text": "Para otorgar brillo en el pelo.", "isCorrect": false },
          { "text": "Para mejorar los procesos inflamatorios.", "isCorrect": false },
          { "text": "Para evitar las bolas de pelo.", "isCorrect": false }
        ]
      },
      {
        "text": "¿Cuál es la fuente de omega 3 en las recetas de Vitalcan Balanced Natural Recipe?",
        "options": [
          { "text": "Semillas de chía.", "isCorrect": false },
          { "text": "Harina de pescado.", "isCorrect": false },
          { "text": "Aceite de pescado.", "isCorrect": true },
          { "text": "Todas son correctas.", "isCorrect": false }
        ]
      },
      {
        "text": "¿Qué significa que una dieta sea monoproteica?",
        "options": [
          { "text": "Que contiene proteínas hipoalergénicas.", "isCorrect": false },
          { "text": "Que previene las sensibilidades digestivas o cutáneas.", "isCorrect": false },
          { "text": "Que tiene una sola fuente de proteínas de origen animal.", "isCorrect": true },
          { "text": "Que no contiene hidratos de carbono.", "isCorrect": false }
        ]
      },
      {
        "text": "¿Cuál es el contenido mínimo de proteína en las recetas de Vitalcan Balanced Natural Recipe para perro?",
        "options": [
          { "text": "Entre 20 y 24%.", "isCorrect": false },
          { "text": "Entre 30 y 32%.", "isCorrect": false },
          { "text": "Entre 26 y 28%.", "isCorrect": true },
          { "text": "Entre 23 y 25%.", "isCorrect": false }
        ]
      },
      {
        "text": "¿Cuál es el contenido mínimo de proteína en las recetas de Vitalcan Balanced Natural Recipe para gato?",
        "options": [
          { "text": "Entre 23 y 25%.", "isCorrect": false },
          { "text": "Entre 28 y 32%.", "isCorrect": false },
          { "text": "Entre 30 y 35%.", "isCorrect": true },
          { "text": "Entre 25 y 28%.", "isCorrect": false }
        ]
      },
      {
        "text": "¿Cuáles de las siguientes recetas de Vitalcan Balanced Natural Recipe para perros se recomiendan para sensibilidad digestiva o cutánea?",
        "options": [
          { "text": "Pollo, carne argentina seleccionada.", "isCorrect": false },
          { "text": "Cordero, salmón rosado, cerdo.", "isCorrect": true },
          { "text": "Ninguna es correcta.", "isCorrect": false },
          { "text": "Todas son correctas.", "isCorrect": false }
        ]
      },
      {
        "text": "¿Cuál es el tiempo ideal para hacer un cambio gradual de alimentación en perros y gatos?",
        "options": [
          { "text": "3 días.", "isCorrect": false },
          { "text": "5 días.", "isCorrect": false },
          { "text": "7 días.", "isCorrect": true },
          { "text": "10 días.", "isCorrect": false }
        ]
      },
      {
        "text": "¿Cuántas proteínas diferentes tiene la línea Vitalcan Balanced Natural Recipe para gato?",
        "options": [
          { "text": "Una.", "isCorrect": false },
          { "text": "Dos.", "isCorrect": false },
          { "text": "Cuatro.", "isCorrect": false },
          { "text": "Seis.", "isCorrect": true }
        ]
      },
      {
        "text": "¿Cuál de estos atributos no corresponde a Vitalcan Balanced Natural Recipe?",
        "options": [
          { "text": "Skin care.", "isCorrect": false },
          { "text": "Sin soja, sin trigo.", "isCorrect": false },
          { "text": "Proteína hidrolizada.", "isCorrect": true },
          { "text": "Con antioxidantes naturales.", "isCorrect": false }
        ]
      },
      {
        "text": "¿En qué países opera Vitalcan a la fecha?",
        "options": [
          { "text": "Argentina, Uruguay, Chile, Paraguay y Bolivia.", "isCorrect": false },
          { "text": "Ecuador, Panamá, Costa Rica y República Dominicana.", "isCorrect": false },
          { "text": "Rusia.", "isCorrect": false },
          { "text": "Todas son correctas.", "isCorrect": true }
        ]
      },
      {
        "text": "¿Cuáles ingredientes favorecen específicamente la salud articular?",
        "options": [
          { "text": "Harina de salmón, arroz, arvejas, gluten meal, aceite de pollo.", "isCorrect": false },
          { "text": "Pulpa de remolacha, levadura de cerveza, zeolita, inulina, extracto de yuca schidigera.", "isCorrect": false },
          { "text": "Extracto de romero, lecitina, tocoferoles.", "isCorrect": false },
          { "text": "Glucosamina, metilsulfonilmetano.", "isCorrect": true }
        ]
      },
      {
        "text": "¿Cuáles son los beneficios funcionales de la línea Vitalcan Balanced Natural Recipe?",
        "options": [
          { "text": "Skin care & Healthy joints.", "isCorrect": false },
          { "text": "Oral Care & Digestive Protect.", "isCorrect": false },
          { "text": "Hairball Control.", "isCorrect": false },
          { "text": "Todas son correctas.", "isCorrect": true }
        ]
      },
      {
        "text": "¿En qué año nace Vitalcan?",
        "options": [
          { "text": "2000.", "isCorrect": false },
          { "text": "2001.", "isCorrect": true },
          { "text": "2010.", "isCorrect": false },
          { "text": "2012.", "isCorrect": false }
        ]
      },
      {
        "text": "¿Cuáles productos de Vitalcan Balanced Natural Recipe para perro salieron primero al mercado?",
        "options": [
          { "text": "BNR Cordero y BNR Cerdo.", "isCorrect": true },
          { "text": "BNR Cordero y BNR Carne argentina seleccionada.", "isCorrect": false },
          { "text": "BNR Cerdo y BNR Salmón Rosado.", "isCorrect": false },
          { "text": "BNR Cerdo y BNR Pollo.", "isCorrect": false }
        ]
      },
      {
        "text": "¿Cuáles de estos atributos corresponden a la línea Vitalcan Balanced Natural Recipe?",
        "options": [
          { "text": "Skin care & Healthy joints.", "isCorrect": false },
          { "text": "Digestive protect & Oral care.", "isCorrect": false },
          { "text": "Hairball control & Skin care.", "isCorrect": false },
          { "text": "Todas son correctas.", "isCorrect": true }
        ]
      },
    ]

      for (const pregunta of preguntasVitalCan) {
            
            await prisma.question.create({
                  data: {
                        questionText: pregunta.text,
                        questionType: 'multiple_choice',
                        gameId: games[3].id,
                        options: {
                              create: pregunta.options.map((option) => ({
                                    optionText: option.text,
                                    isCorrect: option.isCorrect,
                              })),
                        },
                  },
            });

  }
  
  const preguntasUnimedical = [
  {
    "text": "Nombre nuestro antiparasitario interno que se puede administrar en hembras gestantes",
    "options": [
      { "text": "Uniplus Ultra", "isCorrect": true },
      { "text": "Prantel", "isCorrect": false },
      { "text": "Vitalflex", "isCorrect": false },
      { "text": "Guardian", "isCorrect": false }
    ]
  },
  {
    "text": "Nombre nuestro carencial con Resveratrol y Raiz de Ginseng",
    "options": [
      { "text": "Vitalflex", "isCorrect": false },
      { "text": "Artriton", "isCorrect": false },
      { "text": "Vitaton", "isCorrect": true },
      { "text": "Calfix", "isCorrect": false }
    ]
  },
  {
    "text": "Nombre nuestro condroprotector con Acido Hialurónico",
    "options": [
      { "text": "Vitalflex", "isCorrect": true },
      { "text": "Artriton", "isCorrect": false },
      { "text": "Vitaton", "isCorrect": false },
      { "text": "Calfix", "isCorrect": false }
    ]
  },
  {
    "text": "Nombre nuestro colirio que se puede dar en casos de úlcera",
    "options": [
      { "text": "Oftoxane", "isCorrect": false },
      { "text": "Hyaluflox", "isCorrect": true },
      { "text": "Otoderm", "isCorrect": false },
      { "text": "Dermixane", "isCorrect": false }
    ]
  },
  {
    "text": "Nombre de nuestro Fenobarbital en presentación gotas y comprimidos",
    "options": [
      { "text": "Unipental", "isCorrect": false },
      { "text": "Uniplus", "isCorrect": false },
      { "text": "Uniletas", "isCorrect": true },
      { "text": "Uniflox", "isCorrect": false }
    ]
  },
  {
    "text": "Que concentración tiene el shampoo Clorhexidin EXTRA forte",
    "options": [
      { "text": "4%", "isCorrect": true },
      { "text": "0.5%", "isCorrect": false },
      { "text": "1%", "isCorrect": false },
      { "text": "2%", "isCorrect": false }
    ]
  },
  {
    "text": "Cada cuantas horas se indica Diurovet (torasemide 6 mg comprimidos)",
    "options": [
      { "text": "12 hrs", "isCorrect": false },
      { "text": "6 hrs", "isCorrect": false },
      { "text": "8 hrs", "isCorrect": false },
      { "text": "24 hrs", "isCorrect": true }
    ]
  },
  {
    "text": "Como se llama nuestro llamo hipoalergénico a base de Avena",
    "options": [
      { "text": "Dermaven", "isCorrect": true },
      { "text": "Guardian Shampoo", "isCorrect": false },
      { "text": "Clorhexidin Shampoo", "isCorrect": false },
      { "text": "Aprurit", "isCorrect": false }
    ]
  },
  {
    "text": "Si te digo “crema mágica” a cual me refiero",
    "options": [
      { "text": "Predniderm crema", "isCorrect": false },
      { "text": "Novapel", "isCorrect": true },
      { "text": "Griseofulvina crema", "isCorrect": false },
      { "text": "Sarnil crema", "isCorrect": false }
    ]
  },
  {
    "text": "Cada cuantas horas se indica la Cefalexina",
    "options": [
      { "text": "8 a 12 hrs", "isCorrect": true },
      { "text": "1 a 2 hrs", "isCorrect": false },
      { "text": "6 a 8 hrs", "isCorrect": false },
      { "text": "24 hrs", "isCorrect": false }
    ]
  },
  {
    "text": "Cual es el principal diferencial del VITALFLEX",
    "options": [
      { "text": "Tiene ácido hialuronico", "isCorrect": true },
      { "text": "Tiene Resveratrol", "isCorrect": false },
      { "text": "Tiene Colágeno", "isCorrect": false },
      { "text": "Tiene Ginseng", "isCorrect": false }
    ]
  },
  {
    "text": "Que presentación tiene la(s) Prednisolona Unimedical",
    "options": [
      { "text": "10 20 y 40 mg", "isCorrect": true },
      { "text": "5 mg", "isCorrect": false },
      { "text": "20 mg", "isCorrect": false },
      { "text": "10 mg", "isCorrect": false }
    ]
  },
  {
    "text": "Que activos tiene el Clorhexidin Plus (spray)",
    "options": [
      { "text": "Clorhexidina + Ketoconazole", "isCorrect": false },
      { "text": "Clorhexidina", "isCorrect": false },
      { "text": "Clorhexidina + Triamcinolona", "isCorrect": true },
      { "text": "Triamcinolona", "isCorrect": false }
    ]
  },
  {
    "text": "Nombre de nuestro nuevo diurético cada 24 hrs",
    "options": [
      { "text": "Diuremedical", "isCorrect": false },
      { "text": "Dermaven", "isCorrect": false },
      { "text": "Diurovet", "isCorrect": true },
      { "text": "Dermixane", "isCorrect": false }
    ]
  },
  {
    "text": "Que producto administraría a un animal que está fatigado y con falta de energía",
    "options": [
      { "text": "Vitaton", "isCorrect": true },
      { "text": "Dermixane", "isCorrect": false },
      { "text": "Triamcort", "isCorrect": false },
      { "text": "Prednisolona 20", "isCorrect": false }
    ]
  },
  {
    "text": "Nombre de nuestro Diazepam inyectable",
    "options": [
      { "text": "Unizepam", "isCorrect": true },
      { "text": "Neurodermyl", "isCorrect": false },
      { "text": "Convulsivan", "isCorrect": false },
      { "text": "Uniletas", "isCorrect": false }
    ]
  },
  {
    "text": "Que activos contiene el Uniplus (tanto jarabe como en comprimidos)",
    "options": [
      { "text": "Oxantel + Pirantel + Praziquantel", "isCorrect": true },
      { "text": "Pirantel", "isCorrect": false },
      { "text": "Pirantel + Febantel", "isCorrect": false },
      { "text": "Oxantel + Pirantel", "isCorrect": false }
    ]
  },
  {
    "text": "Cada cuantos Kg se da el Uniplus ULTRA",
    "options": [
      { "text": "1 comprimido cada 10 kg", "isCorrect": true },
      { "text": "1 comprimido por Kg", "isCorrect": false },
      { "text": "1 comprimido cada 5 kg", "isCorrect": false },
      { "text": "1 comprimido cada 20 kg", "isCorrect": false }
    ]
  },
  {
    "text": "Que principio activo contiene el Uniflox",
    "options": [
      { "text": "Enrofloxacina", "isCorrect": true },
      { "text": "Cefalexina", "isCorrect": false },
      { "text": "Ketoconazole", "isCorrect": false },
      { "text": "Amoxicilina", "isCorrect": false }
    ]
  },
  {
    "text": "Nombre de nuestro Laxante suave Palatable",
    "options": [
      { "text": "Laxipet", "isCorrect": true },
      { "text": "Diurovet", "isCorrect": false },
      { "text": "Laximedical", "isCorrect": false },
      { "text": "Dermixane", "isCorrect": false }
    ]
  },
  {
    "text": "Cuantos años tiene Unimedical",
    "options": [
      { "text": "Entre 10 y 20", "isCorrect": false },
      { "text": "Entre 1 y 5", "isCorrect": false },
      { "text": "Entre 5 y 10", "isCorrect": false },
      { "text": "Mas de 30", "isCorrect": true }
    ]
  },
  {
    "text": "De que origen es nuestra Cefalexina",
    "options": [
      { "text": "India", "isCorrect": false },
      { "text": "China", "isCorrect": false },
      { "text": "Italiana", "isCorrect": true },
      { "text": "Argentina", "isCorrect": false }
    ]
  },
  {
    "text": "Además de comprimidos que otra presentación tiene Uniletas",
    "options": [
      { "text": "Gotas", "isCorrect": true },
      { "text": "Solo comprimidos", "isCorrect": false },
      { "text": "Inyectable", "isCorrect": false },
      { "text": "Crema", "isCorrect": false }
    ]
  },
  {
    "text": "Cuales son las presentaciones de Acepet",
    "options": [
      { "text": "Gotas comprimidos e Inyectable", "isCorrect": true },
      { "text": "Solamente en comprimidos", "isCorrect": false },
      { "text": "Gotas y comprimidos", "isCorrect": false },
      { "text": "Solamente en gotas", "isCorrect": false }
    ]
  },
  {
    "text": "Cuales son las concentraciones de nuestros Shampoos con Clorhexidina",
    "options": [
      { "text": "0.5% 2% y 4%", "isCorrect": true },
      { "text": "1%", "isCorrect": false },
      { "text": "2%", "isCorrect": false },
      { "text": "05%", "isCorrect": false }
    ]
  },
  {
    "text": "Que concentración de Fenobarbital contiene Uniletas comprimidos",
    "options": [
      { "text": "50 mg", "isCorrect": false },
      { "text": "100 mg", "isCorrect": true },
      { "text": "200 mg", "isCorrect": false },
      { "text": "500 mg", "isCorrect": false }
    ]
  },
  {
    "text": "Cual es el principio activo de Uniletas",
    "options": [
      { "text": "Fenobarbital", "isCorrect": true },
      { "text": "Diazepam", "isCorrect": false },
      { "text": "Bromuro de Potasio", "isCorrect": false },
      { "text": "Comitoina + Diazepam", "isCorrect": false }
    ]
  },
  {
    "text": "Cual es al principio activo del Ketomycol",
    "options": [
      { "text": "Ketoconazole", "isCorrect": true },
      { "text": "Ketorolac", "isCorrect": false },
      { "text": "Ketoprofeno", "isCorrect": false },
      { "text": "Ketamina", "isCorrect": false }
    ]
  },
  {
    "text": "Cual es el antibiótico que contiene Hyaluflox (colirio)",
    "options": [
      { "text": "Ofloxacina", "isCorrect": true },
      { "text": "Amoxicilina", "isCorrect": false },
      { "text": "Enrofloxacina", "isCorrect": false },
      { "text": "No tiene", "isCorrect": false }
    ]
  },
  {
    "text": "Cual es la dosis de Vitalflex en perros",
    "options": [
      { "text": "1 comprimido >20kg y medio <20 kg", "isCorrect": true },
      { "text": "1 comprimido cada 10 kg", "isCorrect": false },
      { "text": "1 comprimido cada 5 kg", "isCorrect": false },
      { "text": "2 comprimidos no importa el peso", "isCorrect": false }
    ]
  },
  {
    "text": "En que presentación viene nuestra Griseofulvina",
    "options": [
      { "text": "Comprimidos y Crema", "isCorrect": true },
      { "text": "Gotas", "isCorrect": false },
      { "text": "Comprimidos", "isCorrect": false },
      { "text": "Crema", "isCorrect": false }
    ]
  },
  {
    "text": "Cual es la concentración de nuestra Cefalexina",
    "options": [
      { "text": "500 mg y 1000 mg", "isCorrect": true },
      { "text": "500 mg", "isCorrect": false },
      { "text": "100 mg", "isCorrect": false },
      { "text": "600 mg", "isCorrect": false }
    ]
  },
  {
    "text": "Que principio activo contiene Pimovet",
    "options": [
      { "text": "Pimobendan", "isCorrect": true },
      { "text": "Benazepril", "isCorrect": false },
      { "text": "Espironolactona", "isCorrect": false },
      { "text": "Enalapril", "isCorrect": false }
    ]
  },
  {
    "text": "Que principio activo contiene Diurovet (diuretico cada 24 hrs)",
    "options": [
      { "text": "Torasemide", "isCorrect": true },
      { "text": "Doxiciclina", "isCorrect": false },
      { "text": "Furosemide", "isCorrect": false },
      { "text": "Pimobendan", "isCorrect": false }
    ]
  },
  {
    "text": "En que concentración(es) viene nuestra Enrofloxacina (Uniflox)",
    "options": [
      { "text": "50 mg y 150 mg", "isCorrect": true },
      { "text": "50 mg", "isCorrect": false },
      { "text": "100 mg", "isCorrect": false },
      { "text": "200 mg", "isCorrect": false }
    ]
  },
  {
    "text": "Cual de los siguientes productos se utiliza en oídos",
    "options": [
      { "text": "Otoderm", "isCorrect": true },
      { "text": "Oftoxane", "isCorrect": false },
      { "text": "Laxipet", "isCorrect": false },
      { "text": "Uniletas", "isCorrect": false }
    ]
  },
  {
    "text": "Cual es la forma farmacéutica del Novapel",
    "options": [
      { "text": "Comprimidos", "isCorrect": false },
      { "text": "Crema", "isCorrect": true },
      { "text": "Inyectable", "isCorrect": false },
      { "text": "Solución", "isCorrect": false }
    ]
  },
  {
    "text": "Cual es la presentación del Ketomycol",
    "options": [
      { "text": "Comprimidos spray y shampoo", "isCorrect": true },
      { "text": "Comprimidos", "isCorrect": false },
      { "text": "Spray", "isCorrect": false },
      { "text": "Shampoo", "isCorrect": false }
    ]
  },
  {
    "text": "Cual es el principio activo del Doxipet",
    "options": [
      { "text": "Doxicilina", "isCorrect": true },
      { "text": "Amoxicilina", "isCorrect": false },
      { "text": "Enrofloxacina", "isCorrect": false },
      { "text": "Cefalexina", "isCorrect": false }
    ]
  },
  {
    "text": "Cual es el nombre de nuestra Metoclorpramida",
    "options": [
      { "text": "Unipramida", "isCorrect": true },
      { "text": "Uniflox", "isCorrect": false },
      { "text": "Uniletas", "isCorrect": false },
      { "text": "Unienrol", "isCorrect": false }
    ]
  }
];


  for (const pregunta of preguntasUnimedical) {

    await prisma.question.create({
      data: {
        questionText: pregunta.text,
        questionType: 'multiple_choice',
        gameId: games[4].id,
        options: {
          create: pregunta.options.map((option) => ({
            optionText: option.text,
            isCorrect: option.isCorrect,
          })),
        },
      },
    });
  }

      

      console.log('Preguntas y opciones insertadas correctamente.');
}



main()
      .catch((e) => {
            console.error('Error al insertar datos de prueba:', e);
            process.exit(1);
      })
      .finally(async () => {
            await prisma.$disconnect();
      });

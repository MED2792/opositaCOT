import { useState, useMemo } from "react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');`;

const BLOCKS = [
  { id: "fx", label: "Fracturas", color: "#0D9488", tint: "#CCFBF1" },
  { id: "cadera", label: "Cadera y pelvis", color: "#7C3AED", tint: "#EDE9FE" },
  { id: "raquis", label: "Columna", color: "#DB2777", tint: "#FCE7F3" },
  { id: "ms", label: "Miembro superior", color: "#EA580C", tint: "#FFEDD5" },
  { id: "infantil", label: "Ortopedia infantil", color: "#0284C7", tint: "#E0F2FE" },
  { id: "rodilla", label: "Rodilla", color: "#16A34A", tint: "#DCFCE7" },
];

function BlockIcon({ id, size = 18 }) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (id) {
    case "fx":
      // Hueso partido: dos extremos redondeados unidos por una línea de fractura en zigzag
      return (
        <svg {...p}>
          <circle cx="5" cy="6" r="2.4" />
          <circle cx="19" cy="18" r="2.4" />
          <polyline points="6.7,7.7 9.5,10.5 8,12.5 11,14 9.5,16.5 17.3,16.3" />
        </svg>
      );
    case "cadera":
      // Cadera: arco pélvico con cabeza femoral
      return (
        <svg {...p}>
          <path d="M4 14c0-5.5 3.6-10 8-10s8 4.5 8 10" />
          <circle cx="12" cy="17.5" r="3" />
        </svg>
      );
    case "raquis":
      // Columna: vértebras apiladas
      return (
        <svg {...p}>
          <rect x="9" y="1.5" width="6" height="3.2" rx="1.4" />
          <rect x="8.4" y="6" width="6" height="3.2" rx="1.4" />
          <rect x="9" y="10.5" width="6" height="3.2" rx="1.4" />
          <rect x="8.4" y="15" width="6" height="3.2" rx="1.4" />
          <rect x="9" y="19.5" width="6" height="3" rx="1.3" />
        </svg>
      );
    case "ms":
      // Miembro superior: brazo con codo y mano
      return (
        <svg {...p}>
          <polyline points="6,3 9.5,11 7.5,15 13.5,21" />
          <circle cx="14.5" cy="21.3" r="1.9" />
        </svg>
      );
    case "infantil":
      // Ortopedia infantil: figura de un niño
      return (
        <svg {...p}>
          <circle cx="12" cy="5.5" r="2.8" />
          <line x1="7" y1="11" x2="17" y2="11" />
          <path d="M9 10.5 L8 21 M15 10.5 L16 21" />
        </svg>
      );
    case "rodilla":
      // Rodilla: pierna flexionada con la articulación
      return (
        <svg {...p}>
          <line x1="7.5" y1="3.5" x2="10.5" y2="12" />
          <circle cx="11" cy="13" r="2.1" />
          <line x1="12" y1="14.8" x2="16" y2="21.5" />
        </svg>
      );
    default:
      return null;
  }
}

const QUESTIONS = [
  {
    id: 1,
    block: "fx",
    code: "31-A1",
    image: null, // ejemplo: "/images/fx-31a1.jpg" — deja null si la pregunta no lleva imagen
    prompt:
      "Fractura pertrocantérea simple, con trazo único, sin conminución de la cortical medial. Según la clasificación AO/OTA, ¿a qué tipo corresponde?",
    options: [
      "31-A3",
      "31-A1",
      "31-B1",
      "31-A2",
    ],
    correct: 1,
    explanation:
      "El grupo 31-A1 corresponde a fracturas pertrocantéreas simples con dos fragmentos, sin conminución de la cortical medial.",
  },
  {
    id: 2,
    block: "fx",
    code: "23-C2",
    image: null,
    prompt:
      "Fractura de radio distal intraarticular, con conminución metafisaria pero epífisis simple. ¿Qué tipo AO describe mejor esta lesión?",
    options: [
      "23-A3",
      "23-C1",
      "23-C2",
      "23-B2",
    ],
    correct: 2,
    explanation:
      "El tipo C indica afectación articular y metafisaria simultánea; C2 implica conminución metafisaria con fractura articular simple.",
  },
  {
    id: 3,
    block: "fx",
    code: "41-B3",
    image: null,
    prompt:
      "En la clasificación AO de fracturas de meseta tibial, una fractura articular parcial con hundimiento y fragmento en cuña se clasifica como:",
    options: [
      "41-A2",
      "41-C1",
      "41-B2",
      "41-B3",
    ],
    correct: 3,
    explanation:
      "41-B3 corresponde a fracturas parciales articulares con hundimiento asociado a fragmento en cuña.",
  },
  {
    id: 4,
    block: "fx",
    code: "44-B",
    image: null,
    prompt:
      "En la clasificación de Danis-Weber para fracturas del tobillo, una fractura del peroné a nivel de la sindesmosis se denomina:",
    options: [
      "Weber A",
      "Weber B",
      "Weber C",
      "Weber D",
    ],
    correct: 1,
    explanation:
      "Weber B: trazo a nivel de la sindesmosis tibioperonea, con afectación variable de la estabilidad sindesmal.",
  },
  {
    id: 5,
    block: "cadera",
    code: "Garden",
    image: null,
    prompt:
      "Una fractura subcapital de fémur con desplazamiento completo pero contacto entre fragmentos corresponde a Garden tipo:",
    options: [
      "Garden III",
      "Garden II",
      "Garden IV",
      "Garden I",
    ],
    correct: 0,
    explanation:
      "Garden III: desplazamiento completo con angulación en varo de la cabeza, pero manteniendo cierto contacto trabecular.",
  },
  {
    id: 6,
    block: "cadera",
    code: "Pauwels",
    image: null,
    prompt:
      "¿Qué ángulo respecto a la horizontal define una fractura de cuello femoral Pauwels III?",
    options: [
      "30°–50°",
      "< 30°",
      "> 50°",
      "90° exactos",
    ],
    correct: 2,
    explanation:
      "Pauwels III implica un trazo de más de 50° respecto a la horizontal, con mayor componente de cizallamiento y peor pronóstico.",
  },
  {
    id: 7,
    block: "cadera",
    code: "Letournel",
    image: null,
    prompt:
      "En la clasificación de Letournel-Judet para fracturas acetabulares, una fractura que afecta ambas columnas se considera:",
    options: [
      "Un patrón elemental simple",
      "Un patrón asociado complejo",
      "Equivalente a fractura de pared posterior aislada",
      "No contemplada en la clasificación",
    ],
    correct: 1,
    explanation:
      "Las fracturas de ambas columnas forman parte de los patrones asociados, más complejos que los diez tipos elementales.",
  },
  {
    id: 8,
    block: "cadera",
    code: "Tile",
    image: null,
    prompt:
      "Una fractura de pelvis con rotura completa del complejo ligamentoso posterior e inestabilidad rotacional y vertical se clasifica, según Tile, como tipo:",
    options: [
      "Tile B",
      "Tile C",
      "Tile A",
      "Tile 0",
    ],
    correct: 1,
    explanation:
      "Tile C implica inestabilidad rotacional y vertical, con lesión completa del anillo posterior.",
  },
  {
    id: 9,
    block: "raquis",
    code: "AO Spine",
    image: null,
    prompt:
      "En la clasificación AO Spine toracolumbar, una fractura con estallido del cuerpo vertebral sin lesión del complejo ligamentoso posterior corresponde al tipo:",
    options: [
      "Tipo A",
      "Tipo D",
      "Tipo C",
      "Tipo B",
    ],
    correct: 0,
    explanation:
      "El tipo A agrupa las lesiones por compresión, incluyendo el estallido vertebral, sin fallo del complejo posterior tensor.",
  },
  {
    id: 10,
    block: "raquis",
    code: "Denis",
    image: null,
    prompt:
      "Según la teoría de las tres columnas de Denis, ¿qué estructuras conforman la columna media?",
    options: [
      "Ligamento longitudinal anterior y mitad anterior del cuerpo vertebral",
      "Pedículos, láminas y ligamento amarillo",
      "Pared posterior del cuerpo vertebral y ligamento longitudinal posterior",
      "Apófisis espinosas y ligamentos interespinosos",
    ],
    correct: 2,
    explanation:
      "La columna media incluye la pared posterior del cuerpo vertebral, el anillo fibroso posterior y el ligamento longitudinal posterior; su integridad es clave para la estabilidad.",
  },
  {
    id: 11,
    block: "raquis",
    code: "Frankel",
    image: null,
    prompt:
      "En la escala de Frankel para lesión medular, un paciente con función motora útil preservada pero alteración sensitiva se clasifica como:",
    options: [
      "Frankel C o D",
      "Frankel B",
      "Frankel E",
      "Frankel A",
    ],
    correct: 0,
    explanation:
      "Frankel C indica función motora no útil y D función motora útil preservada, ambos con déficit sensitivo variable; E es normalidad completa.",
  },
  {
    id: 12,
    block: "raquis",
    code: "ASIA",
    image: null,
    prompt:
      "En la escala ASIA de lesión medular, ¿qué define a un paciente ASIA A?",
    options: [
      "Preservación motora y sensitiva completa por debajo de la lesión",
      "Función motora útil en más de la mitad de los músculos clave",
      "Alteración sensitiva aislada sin afectación motora",
      "Ausencia completa de función motora y sensitiva en los segmentos sacros S4-S5",
    ],
    correct: 3,
    explanation:
      "ASIA A define una lesión completa: no hay preservación motora ni sensitiva en los segmentos sacros S4-S5.",
  },
  {
    id: 13,
    block: "ms",
    code: "Neer",
    image: null,
    prompt:
      "Según la clasificación de Neer para fracturas de húmero proximal, ¿qué desplazamiento define un fragmento como \"parte\" independiente?",
    options: [
      "Más de 2 cm de desplazamiento sin angulación asociada",
      "Cualquier trazo de fractura visible en la radiografía",
      "Más de 1 cm de desplazamiento o más de 45° de angulación",
      "Más de 45° de angulación, sin importar el desplazamiento",
    ],
    correct: 2,
    explanation:
      "Neer considera un fragmento como \"parte\" cuando presenta más de 1 cm de desplazamiento o más de 45° de angulación respecto al resto.",
  },
  {
    id: 14,
    block: "ms",
    code: "11-B1",
    image: null,
    prompt:
      "En la clasificación AO/OTA de húmero proximal, una fractura extraarticular bifocal con impactación metafisaria corresponde al tipo:",
    options: [
      "11-A1",
      "11-B1",
      "11-A3",
      "11-C1",
    ],
    correct: 1,
    explanation:
      "El grupo 11-B agrupa las fracturas extraarticulares bifocales; B1 implica impactación metafisaria sin gran desplazamiento.",
  },
  {
    id: 15,
    block: "ms",
    code: "Mason",
    image: null,
    prompt:
      "Una fractura de cabeza radial desplazada más de 2 mm, sin conminución significativa, se clasifica según Mason como tipo:",
    options: [
      "Mason I",
      "Mason IV",
      "Mason III",
      "Mason II",
    ],
    correct: 3,
    explanation:
      "Mason II corresponde a fracturas con desplazamiento superior a 2 mm sin conminución relevante; Mason III implica conminución severa.",
  },
  {
    id: 16,
    block: "ms",
    code: "13-C",
    image: null,
    prompt:
      "En la clasificación AO/OTA de húmero distal, una fractura articular completa con afectación tanto de la columna medial como de la lateral corresponde al grupo:",
    options: [
      "13-A",
      "13-D",
      "13-C",
      "13-B",
    ],
    correct: 2,
    explanation:
      "El grupo 13-C describe fracturas articulares completas, con separación de ambas columnas y del componente articular respecto a la diáfisis.",
  },
  {
    id: 17,
    block: "ms",
    code: "Monteggia",
    prompt:
      "Una fractura de cúbito proximal asociada a luxación de la cabeza radial se conoce como:",
    image: null,
    options: [
      "Fractura de Monteggia",
      "Fractura de Colles",
      "Fractura de Smith",
      "Fractura de Galeazzi",
    ],
    correct: 0,
    explanation:
      "La lesión de Monteggia combina fractura de la diáfisis cubital con luxación de la cabeza del radio.",
  },
  {
    id: 18,
    block: "ms",
    code: "Galeazzi",
    image: null,
    prompt:
      "Una fractura de la diáfisis radial asociada a luxación de la articulación radiocubital distal se denomina:",
    options: [
      "Fractura de Galeazzi",
      "Fractura de Chauffeur",
      "Fractura de Barton",
      "Fractura de Monteggia",
    ],
    correct: 0,
    explanation:
      "La lesión de Galeazzi asocia fractura diafisaria del radio con luxación de la articulación radiocubital distal.",
  },
  {
    id: 19,
    block: "ms",
    code: "23-A2",
    image: null,
    prompt:
      "Una fractura de radio distal extraarticular con desplazamiento dorsal (fractura de Colles clásica) corresponde, en la clasificación AO/OTA, al grupo:",
    options: [
      "23-C1",
      "23-A2",
      "23-C3",
      "23-B1",
    ],
    correct: 1,
    explanation:
      "Las fracturas extraarticulares simples o con cuña dorsal, como la de Colles, se agrupan dentro de 23-A.",
  },
  {
    id: 20,
    block: "ms",
    code: "Herbert",
    image: null,
    prompt:
      "En la clasificación de Herbert para fracturas del escafoides, una fractura estable del tercio medio (cintura) sin desplazamiento corresponde al tipo:",
    options: [
      "Herbert C",
      "Herbert A1",
      "Herbert A2",
      "Herbert B2",
    ],
    correct: 2,
    explanation:
      "Herbert A2 corresponde a fracturas estables de la cintura del escafoides, sin desplazamiento significativo.",
  },
  {
    id: 21,
    block: "ms",
    code: "Manguito rotador",
    image: null,
    prompt:
      "¿Cuál es el tendón que con mayor frecuencia se ve afectado en las roturas del manguito rotador?",
    options: [
      "Supraespinoso",
      "Redondo menor",
      "Infraespinoso",
      "Subescapular",
    ],
    correct: 0,
    explanation:
      "El supraespinoso es el tendón más frecuentemente afectado, debido a su localización en la zona de menor vascularización (zona crítica de Codman) y al conflicto subacromial.",
  },
  {
    id: 22,
    block: "ms",
    code: "Epicondilitis",
    image: null,
    prompt:
      "La epicondilitis lateral (\"codo de tenista\") afecta principalmente al origen de qué músculo:",
    options: [
      "Flexor radial del carpo",
      "Flexor cubital del carpo",
      "Pronador redondo",
      "Extensor radial corto del carpo",
    ],
    correct: 3,
    explanation:
      "La epicondilitis lateral afecta sobre todo al origen tendinoso del extensor radial corto del carpo (ECRB), por sobrecarga repetitiva.",
  },
  {
    id: 23,
    block: "ms",
    code: "Anatomía",
    image: null,
    prompt:
      "¿Cuántas articulaciones forman el complejo articular del hombro?",
    options: [
      "4",
      "5",
      "2",
      "3",
    ],
    correct: 0,
    explanation:
      "El complejo del hombro está formado por cuatro articulaciones: escapulohumeral, acromioclavicular, escapulotorácica y esternoclavicular.",
  },
  {
    id: 24,
    block: "ms",
    code: "Manguito rotador",
    image: null,
    prompt:
      "La inervación motora del supraespinoso y del infraespinoso proviene del nervio:",
    options: [
      "Axilar",
      "Musculocutáneo",
      "Supraescapular",
      "Torácico largo",
    ],
    correct: 2,
    explanation:
      "El nervio supraescapular, rama del tronco primario superior del plexo braquial, inerva tanto al supraespinoso como al infraespinoso.",
  },
  {
    id: 25,
    block: "ms",
    code: "SLAP",
    image: null,
    prompt:
      "Una lesión SLAP tipo III del labrum superior del hombro se caracteriza por:",
    options: [
      "Desprendimiento del labrum superior con el anclaje del bíceps",
      "Rotura del labrum extendida hacia el tendón del bíceps",
      "Desfibrilación simple del labrum superior",
      "Rotura en asa de cubo del labrum superior sin afectación del tendón del bíceps",
    ],
    correct: 3,
    explanation:
      "El tipo III SLAP es una rotura en asa de cubo del labrum superior, sin afectación asociada del tendón de la porción larga del bíceps.",
  },
  {
    id: 26,
    block: "ms",
    code: "Estabilidad",
    image: null,
    prompt:
      "Entre los estabilizadores estáticos capsulares del hombro, ¿cuál se considera el más importante para la estabilidad glenohumeral?",
    options: [
      "Ligamento glenohumeral inferior",
      "Ligamento coracohumeral",
      "Ligamento glenohumeral medio",
      "Ligamento glenohumeral superior",
    ],
    correct: 0,
    explanation:
      "El ligamento glenohumeral inferior, especialmente su fascículo anterior, se considera el estabilizador capsular más relevante del hombro.",
  },
  {
    id: 27,
    block: "ms",
    code: "Nervio axilar",
    image: null,
    prompt:
      "En un abordaje lateral del hombro, ¿a partir de qué distancia desde el borde lateral del acromion hacia distal existe riesgo de lesionar el nervio axilar?",
    options: [
      "8 cm",
      "5 cm",
      "10 cm",
      "2 cm",
    ],
    correct: 1,
    explanation:
      "Clásicamente se recomienda no sobrepasar los 5 cm desde el borde lateral del acromion en los abordajes laterales, por el riesgo de lesión del nervio axilar.",
  },
  {
    id: 28,
    block: "ms",
    code: "Proyecciones Rx",
    image: null,
    prompt:
      "La proyección radiológica de Zanca del hombro se utiliza principalmente para valorar:",
    options: [
      "La articulación glenohumeral",
      "El espacio subacromial",
      "La articulación esternoclavicular",
      "La articulación acromioclavicular",
    ],
    correct: 3,
    explanation:
      "La proyección de Zanca, con 10-15º de inclinación cefálica del tubo, está indicada para visualizar la articulación acromioclavicular.",
  },
  {
    id: 29,
    block: "ms",
    code: "Plexo braquial",
    image: null,
    prompt:
      "La parálisis braquial obstétrica de Erb-Duchenne afecta característicamente a las raíces:",
    options: [
      "C5-C6",
      "C7 aislada",
      "Todo el plexo (C5-T1)",
      "C8-T1",
    ],
    correct: 0,
    explanation:
      "La parálisis de Erb-Duchenne es el tipo más frecuente de parálisis braquial obstétrica y afecta a las raíces C5-C6, con la clásica postura en \"propina de camarero\".",
  },
  {
    id: 30,
    block: "ms",
    code: "Plexo braquial",
    image: null,
    prompt:
      "En la parálisis braquial obstétrica, ¿qué signo clínico sugiere una avulsión de las raíces C8-T1 (lesión preganglionar)?",
    options: [
      "Signo de Horner",
      "Reflejo de Moro conservado",
      "Mano en garra",
      "Ausencia del reflejo de prensión",
    ],
    correct: 0,
    explanation:
      "La presencia de un síndrome de Horner (enoftalmos, miosis, ptosis) sugiere una avulsión de las raíces C8-T1, lo que implica una lesión preganglionar de peor pronóstico.",
  },
  {
    id: 31,
    block: "ms",
    code: "Malformaciones",
    image: null,
    prompt:
      "¿Cuál es la malformación congénita del hombro más frecuente?",
    options: [
      "Luxación congénita de hombro",
      "Deformidad de Sprengel",
      "Síndrome de Poland",
      "Disostosis cleidocraneal",
    ],
    correct: 1,
    explanation:
      "La deformidad de Sprengel, producida por la falta de descenso del omóplato durante el periodo embrionario, es la malformación congénita del hombro más frecuente.",
  },
  {
    id: 32,
    block: "ms",
    code: "Clavícula",
    image: null,
    prompt:
      "¿Qué característica permite diferenciar la pseudoartrosis congénita de clavícula de una fractura obstétrica de clavícula?",
    options: [
      "La pseudoartrosis congénita está presente desde el nacimiento, sin fractura previa ni dolor",
      "La pseudoartrosis congénita presenta callo hipertrófico en la radiografía",
      "La fractura obstétrica suele asociar hipermovilidad generalizada",
      "La pseudoartrosis congénita cursa con dolor intenso",
    ],
    correct: 0,
    explanation:
      "En la pseudoartrosis congénita de clavícula no existió una fractura previa: la tumoración está presente desde el nacimiento y es indolora, a diferencia de la fractura obstétrica.",
  },
  {
    id: 33,
    block: "ms",
    code: "Síndrome de Poland",
    image: null,
    prompt:
      "El síndrome de Poland se caracteriza fundamentalmente por:",
    options: [
      "Hipoplasia bilateral de la cavidad glenoidea",
      "Fusión congénita de vértebras cervicales",
      "Aplasia unilateral de la porción costoesternal del pectoral mayor con alteraciones ipsilaterales en la mano",
      "Ausencia del tercio externo de la clavícula",
    ],
    correct: 2,
    explanation:
      "El síndrome de Poland se define por la aplasia unilateral de la porción costoesternal del pectoral mayor, asociada con frecuencia a alteraciones en la mano o extremidad superior del mismo lado.",
  },
  {
    id: 34,
    block: "ms",
    code: "Tortícolis",
    image: null,
    prompt:
      "¿Cuál es el tipo de tortícolis congénita más frecuente?",
    options: [
      "Tortícolis postural congénita",
      "Tortícolis muscular congénita",
      "Síndrome de Klippel-Feil",
      "Desplazamiento rotatorio atlo-axoideo",
    ],
    correct: 0,
    explanation:
      "La tortícolis postural congénita, causada por la posición mantenida intraútero, es la forma más frecuente de tortícolis en el recién nacido.",
  },
  {
    id: 35,
    block: "ms",
    code: "Hombro doloroso",
    image: null,
    prompt:
      "Varón de 58 años, fumador, con dolor de hombro insidioso de meses de evolución, sin antecedente traumático. En la exploración presenta arco doloroso entre 60º y 120º de abducción. ¿Qué se comprime característicamente en este síndrome?",
    options: [
      "El nervio axilar contra el cuello quirúrgico del húmero",
      "El tendón del bíceps contra el surco bicipital",
      "El nervio supraescapular contra la escotadura espinoglenoidea",
      "Un elemento del manguito rotador contra el borde anteroinferior del acromion, la articulación acromioclavicular o el ligamento coracoacromial",
    ],
    correct: 3,
    explanation:
      "Es la definición del síndrome doloroso subacromial: compresión de un elemento del manguito contra estructuras próximas (acromion, AC, ligamento coracoacromial) al elevar el brazo, típicamente entre 60º-120º.",
  },
  {
    id: 36,
    block: "ms",
    code: "Estadios de Neer",
    image: null,
    prompt:
      "Según los estadios evolutivos de Neer, ¿qué estadio se corresponde con fibrosis y tendinitis, de curso crónico, dolor recurrente con la actividad y tratamiento inicialmente conservador?",
    options: [
      "Estadio III",
      "Estadio IV",
      "Estadio II",
      "Estadio I",
    ],
    correct: 2,
    explanation:
      "Estadio I: edema y hemorragia (reversible). Estadio II: fibrosis y tendinitis, crónico. Estadio III: rotura tendinosa parcial o completa.",
  },
  {
    id: 37,
    block: "ms",
    code: "Ángulo crítico del hombro",
    image: null,
    prompt:
      "El ángulo crítico del hombro se mide en una Rx AP en plano escapular. Un ángulo por encima de 35º se asocia principalmente a mayor riesgo de:",
    options: [
      "Degeneración articular glenohumeral",
      "Rotura del manguito de los rotadores",
      "Inestabilidad anterior glenohumeral",
      "Os acromiale sintomático",
    ],
    correct: 1,
    explanation:
      "Lo normal es 32-33º. A mayor ángulo (>35º), mayor riesgo de rotura del manguito; con <30º hay mayor riesgo de degeneración articular.",
  },
  {
    id: 38,
    block: "ms",
    code: "Escala de Goutallier",
    image: null,
    prompt:
      "En una RM de hombro se describe el supraespinoso con 'igual cantidad de músculo que grasa'. Según la escala de Goutallier, ¿qué estadio es?",
    options: [
      "Estadio 1",
      "Estadio 3",
      "Estadio 4",
      "Estadio 2",
    ],
    correct: 1,
    explanation:
      "Goutallier: 0 sin grasa, 1 algunas manchas, 2 más músculo que grasa, 3 igual cantidad, 4 más grasa que músculo. A mayor grado, peor capacidad de cicatrización tras la reparación.",
  },
  {
    id: 39,
    block: "ms",
    code: "Clasificación de Burkhart",
    image: null,
    prompt:
      "Deportista de lanzamiento con rotura del manguito con longitud anteroposterior <2 cm y longitud medial-lateral >2 cm, con excelente movilidad en el plano AP. Según Davidson y Burkhart, ¿qué patrón presenta y cómo se repara?",
    options: [
      "Masiva, contraída e inmóvil; deslizamiento de intervalos",
      "PASTA; reanclaje transtendinoso",
      "Media luna; reparación directa a hueso",
      "En forma de U o L; convergencia de márgenes y reparación a hueso",
    ],
    correct: 3,
    explanation:
      "AP <2cm y medial-lateral >2cm con excelente movilidad AP corresponde al patrón en U o L, tratado con convergencia de márgenes y reparación directa a la tuberosidad.",
  },
  {
    id: 40,
    block: "ms",
    code: "Rotura irreparable",
    image: null,
    prompt:
      "¿Cuándo se considera 'irreparable' un desgarro del manguito de los rotadores?",
    options: [
      "Si ocurre cualquiera de los siguientes: retracción hasta glena o más allá, infiltración grasa muscular severa, o ascenso de la cabeza humeral con distancia acromiohumeral <7 mm",
      "Únicamente si afecta a más de 2 tendones completos",
      "Solo si hay degeneración grasa severa en los 4 tendones simultáneamente",
      "Únicamente cuando coexiste con artrosis glenohumeral franca",
    ],
    correct: 0,
    explanation:
      "Basta con que se cumpla cualquiera de esos criterios (no todos a la vez) para considerar la rotura irreparable.",
  },
  {
    id: 41,
    block: "ms",
    code: "External lag test",
    image: null,
    prompt:
      "Paciente con rotura masiva del manguito. Al colocar el brazo en rotación externa máxima con el codo pegado al tronco, el paciente no puede mantener la posición y el brazo cae bruscamente hacia rotación interna. ¿Qué prueba es y qué indica?",
    options: [
      "Belly press test; lesión del subescapular superior",
      "Drop-arm test; lesión aislada del subescapular",
      "Internal lag test; lesión aislada del infraespinoso",
      "External lag test; rotura posterosuperior masiva con afectación de infraespinoso y redondo menor",
    ],
    correct: 3,
    explanation:
      "El External lag test positivo (el brazo cae en rotación interna al no poder mantener la RE) es indicativo de desgarro posterosuperior masivo con afectación de infraespinoso y redondo menor.",
  },
  {
    id: 42,
    block: "ms",
    code: "Hamada-Fukuda",
    image: null,
    prompt:
      "Mujer de 76 años con hombro doloroso crónico y pseudoparálisis. En la Rx: distancia acromiohumeral <6 mm, acetabulización del acromion y artrosis glenohumeral evidente, sin colapso de la cabeza humeral. Según Hamada-Fukuda, ¿qué grado corresponde?",
    options: [
      "Grado V",
      "Grado IV",
      "Grado III",
      "Grado II",
    ],
    correct: 1,
    explanation:
      "Grado IV = grado III (acetabulización) + evidencia de artrosis glenohumeral. El grado V añadiría colapso de la cabeza humeral, ausente en este caso.",
  },
  {
    id: 43,
    block: "ms",
    code: "Artroplastia inversa",
    image: null,
    prompt:
      "¿Cuál de las siguientes es una CONTRAINDICACIÓN para la artroplastia inversa de hombro (RSA) en la artropatía del manguito rotador?",
    options: [
      "Disfunción del deltoides o del nervio axilar",
      "Escape anterosuperior de la cabeza humeral",
      "Edad avanzada con bajas demandas funcionales",
      "Rotura masiva e irreparable del MR con elevación activa <90º",
    ],
    correct: 0,
    explanation:
      "La RSA depende biomecánicamente de un deltoides funcional; su disfunción (o la del nervio axilar) es una contraindicación. El resto son indicaciones clásicas.",
  },
  {
    id: 44,
    block: "ms",
    code: "Rotura parcial",
    image: null,
    prompt:
      "Trabajador manual de 45 años con rotura de espesor parcial del supraespinoso (cara articular) que afecta al 40% del grosor del tendón, sin antecedente traumático agudo ni gran debilidad. ¿Cuál es la actitud terapéutica inicial más adecuada?",
    options: [
      "Tratamiento conservador inicial (no todo MR roto debe intervenirse)",
      "Tenotomía del bíceps de forma sistemática",
      "Reparación quirúrgica urgente por vía artroscópica",
      "Artroplastia inversa de entrada",
    ],
    correct: 0,
    explanation:
      "Las roturas parciales de espesor <50% sin traumatismo agudo ni gran debilidad se tratan inicialmente de forma conservadora. Cirugía precoz solo si hay trauma agudo con gran debilidad o tamaño >3 cm.",
  },
  {
    id: 45,
    block: "ms",
    code: "Luxación medial de la PLB",
    image: null,
    prompt:
      "Paciente con luxación medial del tendón de la porción larga del bíceps confirmada por ecografía. ¿Qué lesión asociada debemos sospechar de forma prioritaria?",
    options: [
      "Rotura del tendón del supraespinoso",
      "Rotura del ligamento coracoacromial",
      "Lesión SLAP tipo I",
      "Rotura del tendón del subescapular",
    ],
    correct: 3,
    explanation:
      "La luxación medial de la PLB se debe a la lesión de la porción superior del tendón subescapular, que forma parte de la polea bicipital. La luxación medial se asocia de forma característica a rotura del subescapular.",
  },
  {
    id: 46,
    block: "ms",
    code: "Rotura PLB — tratamiento",
    image: null,
    prompt:
      "Culturista de 45 años sufre dolor agudo, chasquido y equimosis en el brazo tras un esfuerzo, con signo de Popeye positivo. La RMN confirma rotura completa de la porción larga del bíceps. Es joven y activo. ¿Cuál es la actitud más adecuada?",
    options: [
      "Observación sin ningún tratamiento, ya que el dolor cede en días",
      "Desbridamiento artroscópico simple sin gesto sobre el tendón",
      "Tratamiento conservador con crioterapia y reposo 3 semanas",
      "Tenotomía o tenodesis quirúrgica",
    ],
    correct: 3,
    explanation:
      "En pacientes jóvenes y activos con roturas completas agudas de la PLB está indicado el tratamiento quirúrgico (tenotomía o tenodesis); el conservador se reserva sobre todo para pacientes mayores.",
  },
  {
    id: 47,
    block: "ms",
    code: "Tenotomía vs tenodesis PLB",
    image: null,
    prompt:
      "Respecto a la tenotomía y la tenodesis del bíceps como tratamiento de la patología de la porción larga del bíceps, señale la afirmación correcta:",
    options: [
      "No se han encontrado diferencias clínicas significativas en la reducción del dolor entre ambas técnicas realizadas correctamente",
      "La tenodesis se asocia de forma característica a mayor tasa de calambres y deformidad de Popeye",
      "La tenotomía aislada no es eficaz para aliviar el dolor",
      "La tenotomía se prefiere en pacientes jóvenes y activos por su mejor resultado estético",
    ],
    correct: 0,
    explanation:
      "Comparando tenotomía y tenodesis, no se han encontrado diferencias clínicas significativas en la reducción del dolor cuando se realizan correctamente; la tenodesis ofrece mejor estética y más fuerza, pero mayor morbilidad técnica.",
  },
  {
    id: 48,
    block: "ms",
    code: "Lesión SLAP tipo II",
    image: null,
    prompt:
      "Lanzador de béisbol de 24 años con dolor de hombro y sensación de 'brazo muerto' tras el lanzamiento. La artroRM muestra separación patológica del labrum superior y de la inserción del bíceps del margen glenoideo, con movilidad anormal del anclaje bicipital, sin extensión adicional. Según la clasificación de Snyder, ¿qué tipo de lesión SLAP es y cuál es su tratamiento habitual?",
    options: [
      "Tipo I; desbridamiento artroscópico",
      "Tipo IV; tenodesis o tenotomía del bíceps",
      "Tipo II; reparación/estabilización con anclajes de sutura",
      "Tipo III; resección tipo asa de cubo",
    ],
    correct: 2,
    explanation:
      "La descripción corresponde a una lesión SLAP tipo II (la más común clínicamente significativa, 55%), tratada mediante reparación/estabilización con anclajes de sutura.",
  },
  {
    id: 49,
    block: "ms",
    code: "Pinzamiento interno vs coracoideo",
    image: null,
    prompt:
      "Un lanzador de béisbol presenta dolor posterior de hombro durante la fase de aceleración del lanzamiento, con disminución de la rotación interna pasiva en abducción. Otro paciente, oficinista, presenta dolor sordo anterior de hombro que aumenta con la flexión, aducción y rotación interna, y signo de Hawkins modificado positivo. ¿Qué entidades presentan respectivamente?",
    options: [
      "Ambos presentan pinzamiento coracoideo, con distinta localización del dolor",
      "El primero pinzamiento coracoideo; el segundo pinzamiento interno",
      "Ambos presentan síndrome subacromial clásico",
      "El primero pinzamiento interno (posterosuperior); el segundo pinzamiento coracoideo (subcoracoideo)",
    ],
    correct: 3,
    explanation:
      "El pinzamiento interno (deportistas de lanzamiento, dolor posterior, ABD-RE) atrapa el manguito entre la glenoides posterosuperior y el troquíter. El pinzamiento coracoideo (dolor anterior con flexión-aducción-RI, Hawkins modificado +) es el choque de la cabeza humeral con la coracoides.",
  },
  {
    id: 50,
    block: "ms",
    code: "Tendinitis calcificante",
    image: null,
    prompt:
      "Mujer de 45 años con dolor muy intenso y agudo de hombro derecho de inicio súbito, sin traumatismo. La Rx muestra una calcificación irregular tipo 'nube' cerca de la inserción del supraespinoso. ¿En qué fase de la tendinitis calcificante se encuentra y cuál es la mejor actitud terapéutica inicial?",
    options: [
      "Fase formativa; artroscopia urgente para limpieza del depósito",
      "Fase de reabsorción (postcalcificación); punción-lavado del depósito e infiltración anestésica",
      "Fase de precalcificación; observación sin tratamiento",
      "Fase de reposo; tratamiento quirúrgico con reparación del manguito",
    ],
    correct: 1,
    explanation:
      "El dolor intenso y agudo con calcificación en 'nube' es típico de la fase de reabsorción/postcalcificación (aumento de presión al reabsorberse el depósito). El tratamiento de elección es la punción del depósito e infiltración anestésica, dentro del manejo conservador inicial.",
  },
  {
    id: 51,
    block: "ms",
    code: "Capsulitis adhesiva",
    image: null,
    prompt:
      "Paciente de 52 años, diabética, con capsulitis adhesiva primaria del hombro no dominante, que tras 5 meses de rehabilitación supervisada mantiene una flexión activa de 70º muy dolorosa (fase inflamatoria). ¿Cuál es la actitud más adecuada?",
    options: [
      "Continuar tratamiento conservador (fisioterapia, control del dolor); la manipulación no está indicada en fase inflamatoria",
      "Artrolisis artroscópica inmediata, ya que es la técnica más utilizada actualmente",
      "Manipulación bajo anestesia de forma aislada",
      "Hidrodilatación aislada sin rehabilitación posterior",
    ],
    correct: 0,
    explanation:
      "La manipulación bajo anestesia no se recomienda en fases inflamatorias de la enfermedad y no debe plantearse como procedimiento aislado, sino acompañada de rehabilitación posterior; en fase de dolor intenso se prioriza el control conservador.",
  },
  {
    id: 52,
    block: "ms",
    code: "Resección clavícula distal",
    image: null,
    prompt:
      "Levantador de pesas con artrosis acromioclavicular sintomática, dolor al hacer aducción horizontal cruzada, refractario a 6 meses de tratamiento conservador. Se decide resección de la clavícula distal (Mumford). ¿Cuál es la complicación característica de una resección excesiva (>1-1,5 cm)?",
    options: [
      "Parálisis del nervio axilar",
      "Rotura del manguito de los rotadores",
      "Osteonecrosis de la cabeza humeral",
      "Inestabilidad de la articulación acromioclavicular por lesión de los ligamentos coracoclaviculares",
    ],
    correct: 3,
    explanation:
      "Una resección excesiva de clavícula distal (>1-1,5 cm) puede alterar los ligamentos coracoclaviculares y producir inestabilidad superoinferior de la AAC. La resección debe limitarse a 5-10 mm.",
  },
  {
    id: 53,
    block: "ms",
    code: "Rotura del subescapular",
    image: null,
    prompt:
      "Paciente con antecedente de luxación anterior de hombro presenta dolor anterior y aumento de la rotación externa pasiva respecto al lado contralateral, con pruebas de despegue (lift-off) y de prensa abdominal (belly press) positivas. En la artroscopia se objetiva el 'signo de la coma'. ¿A qué corresponde este hallazgo?",
    options: [
      "Rotura del supraespinoso con retracción hasta la glenoides",
      "Rotura de la porción larga del bíceps con tendón retraído",
      "Ligamento glenohumeral superior avulsionado, indicativo de rotura crónica del subescapular",
      "Lesión SLAP tipo IV con extensión al bíceps",
    ],
    correct: 2,
    explanation:
      "El signo de la coma en la artroscopia representa el ligamento glenohumeral superior avulsionado, y es un hallazgo característico que ayuda a identificar una rotura crónica del subescapular retraído.",
  },
  {
    id: 54,
    block: "ms",
    code: "Quiste espinoglenoideo",
    image: null,
    prompt:
      "Voleibolista con debilidad progresiva y atrofia visible del músculo infraespinoso en la exploración, con dolor sordo leve y sin rotura tendinosa objetivada. La RMN muestra una lesión SLAP con una lesión quística en la escotadura espinoglenoidea. ¿Cuál es el hallazgo clínico clave que debe hacer sospechar esta entidad?",
    options: [
      "Tumefacción visible y fluctuante en la región posterior del hombro",
      "Debilidad del infraespinoso desproporcionada respecto al dolor",
      "Dolor intenso desproporcionado respecto a la debilidad",
      "Debilidad simultánea e igual de supraespinoso e infraespinoso",
    ],
    correct: 1,
    explanation:
      "El síntoma clave es la debilidad del infraespinoso (por compresión del nervio supraescapular en la escotadura espinoglenoidea por el quiste) claramente desproporcionada respecto al dolor, que suele ser leve. Si también se afecta el supraespinoso, la compresión estaría más proximal (escotadura supraescapular).",
  },
  {
    id: 55,
    block: "ms",
    code: "Craig / clavícula",
    image: null,
    prompt:
      "Varón de 28 años sufre una caída en bicicleta a alta velocidad. Presenta dolor y deformidad en tercio medio de clavícula derecha, con acortamiento clínico medido de 2,3 cm y desplazamiento completo sin contacto entre fragmentos. No hay lesión cutánea ni compromiso neurovascular. ¿Cuál es la actitud MÁS adecuada según la evidencia actual?",
    options: [
      "Fijación con agujas de Kirschner de entrada",
      "Tratamiento conservador con cabestrillo, sin más consideraciones",
      "Iniciar tratamiento conservador con vigilancia estrecha; considerar cirugía si a las 4-6 semanas persiste dolor o movilidad anormal",
      "Cirugía urgente, ya que el acortamiento >2 cm es indicación absoluta",
    ],
    correct: 2,
    explanation:
      "El acortamiento >20 mm y el desplazamiento completo son indicaciones RELATIVAS (no absolutas) de cirugía. La tendencia actual es iniciar tratamiento conservador con vigilancia estrecha y pasar a cirugía precoz si a las 4-6 semanas no hay signos de consolidación clínica.",
  },
  {
    id: 56,
    block: "ms",
    code: "Neer II clavícula",
    image: null,
    prompt:
      "Respecto a las fracturas del tercio lateral de clavícula tipo II de Neer, señale la afirmación correcta:",
    options: [
      "Corresponden a fracturas intraarticulares acromioclaviculares",
      "Se tratan de forma conservadora, dado su bajo riesgo de pseudoartrosis",
      "Presentan una elevada tasa de pseudoartrosis (30-45%), por lo que en general se prefiere la fijación quirúrgica",
      "El fragmento medial queda unido a los ligamentos coracoclaviculares, por lo que son estables",
    ],
    correct: 2,
    explanation:
      "En el tipo II de Neer la fractura queda medial a los ligamentos coracoclaviculares, lo que favorece el desplazamiento y una alta tasa de pseudoartrosis (30-45%), por lo que en general se prefiere el tratamiento quirúrgico.",
  },
  {
    id: 57,
    block: "ms",
    code: "Disociación escapulotorácica",
    image: null,
    prompt:
      "Paciente politraumatizado tras accidente de tráfico de alta energía. En la radiografía de tórax se objetiva desplazamiento lateral de la escápula izquierda de 1,5 cm respecto al lado contralateral, junto con fractura clavicular ipsilateral y déficit neurológico en el miembro superior. ¿Cuál es el diagnóstico más probable y qué mortalidad se asocia?",
    options: [
      "Hombro flotante; mortalidad prácticamente nula",
      "Luxación acromioclavicular tipo V; mortalidad del 25%",
      "Fractura de cuello de escápula aislada; sin mortalidad asociada",
      "Disociación escapulotorácica; mortalidad en torno al 10%",
    ],
    correct: 3,
    explanation:
      "El desplazamiento lateral de la escápula >1 cm en la Rx de tórax, junto con déficit neurovascular y lesiones asociadas (clavícula, AC, esternoclavicular), es característico de la disociación escapulotorácica, entidad grave con mortalidad en torno al 10%.",
  },
  {
    id: 58,
    block: "ms",
    code: "Luxación esternoclavicular",
    image: null,
    prompt:
      "En cuanto a las luxaciones esternoclaviculares, ¿cuál es la afirmación correcta?",
    options: [
      "Las luxaciones posteriores pueden asociar compresión mediastínica y requieren valorar cirugía torácica/vascular",
      "La TAC ha quedado en desuso frente a la radiografía simple para su estudio",
      "Las posteriores son más frecuentes que las anteriores",
      "El ligamento capsular posterior es el estabilizador más débil de la articulación",
    ],
    correct: 0,
    explanation:
      "Las luxaciones posteriores pueden comprimir estructuras mediastínicas (vasos, tráquea, esófago), por lo que se recomienda contar con un cirujano cardiotorácico o vascular en su tratamiento quirúrgico. Son menos frecuentes que las anteriores, y el ligamento capsular posterior es el estabilizador MÁS fuerte, no el más débil. La TAC es hoy la prueba de elección.",
  },
  {
    id: 59,
    block: "ms",
    code: "Rockwood V",
    image: null,
    prompt:
      "Jugador de rugby de 22 años sufre una caída sobre el hombro. Presenta signo de la 'tecla de piano' positivo. En la Rx de Zanca con estrés se objetiva un espacio coracoclavicular un 150% mayor que el contralateral, con desinserción parcial del trapecio. ¿Qué tipo de luxación acromioclavicular es y cuál sería una opción terapéutica razonable en este paciente joven y activo?",
    options: [
      "Tipo IV; tratamiento con Mumford aislado",
      "Tipo II; el tratamiento de elección es conservador",
      "Tipo V; se recomienda tratamiento quirúrgico, habitualmente con refuerzo coracoclavicular tipo suspensión (Dog-bone/Tight-rope)",
      "Tipo III; el tratamiento conservador es la opción más habitual",
    ],
    correct: 2,
    explanation:
      "Una distancia coracoclavicular >100% respecto al lado contralateral con desprendimiento del trapecio corresponde al tipo V de Rockwood y Matsen, en el que se recomienda tratamiento quirúrgico; la técnica más usada actualmente es el refuerzo coracoclavicular con sistemas de suspensión.",
  },
  {
    id: 60,
    block: "ms",
    code: "Ideberg I",
    image: null,
    prompt:
      "Sobre la clasificación de Ideberg de las fracturas de la cavidad glenoidea, ¿cuál de las siguientes indica tratamiento quirúrgico en el tipo I?",
    options: [
      "El tratamiento del tipo I es fundamentalmente artroscópico de entrada",
      "Fragmento mayor de 5 mm o afectación de más del 20% de la superficie glenoidea, o escalón articular ≥4 mm",
      "Solo si hay luxación glenohumeral asociada, sin considerar el tamaño del fragmento",
      "Cualquier fragmento, independientemente del tamaño",
    ],
    correct: 1,
    explanation:
      "En el tipo I de Ideberg (avulsión del margen glenoideo) el tratamiento quirúrgico está indicado cuando el fragmento es inestable: mayor de 5 mm, con afectación >20% de la superficie glenoidea, o con escalón/desplazamiento articular de 4 mm o más.",
  },
  {
    id: 61,
    block: "ms",
    code: "Hombro flotante",
    image: null,
    prompt:
      "Paciente con fractura de clavícula tercio medio y fractura ipsilateral de cuello quirúrgico de escápula, con ligamentos coracoclaviculares y acromioclaviculares intactos, mínimamente desplazada. ¿Cómo se clasifica esta lesión desde el punto de vista de la estabilidad y cuál sería el tratamiento más razonable?",
    options: [
      "Disociación escapulotorácica; requiere angiografía urgente",
      "Lesión estable, ya que el complejo suspensorio superior del hombro solo está interrumpido en un punto; puede valorarse tratamiento conservador si no hay desplazamiento significativo",
      "Luxación acromioclavicular tipo IV; tratamiento quirúrgico obligado",
      "Hombro flotante inestable; requiere fijación quirúrgica de ambos focos",
    ],
    correct: 1,
    explanation:
      "Cuando la fractura de cuello quirúrgico de escápula se asocia a una clavícula con ligamentos acromioclaviculares y coracoclaviculares intactos, el complejo suspensorio superior del hombro mantiene un punto de anclaje estable, por lo que la lesión se considera estable y puede tratarse de forma conservadora si no hay desplazamiento relevante.",
  },
  {
    id: 62,
    block: "ms",
    code: "N. musculocutáneo",
    image: null,
    prompt:
      "¿Qué estructura neurológica está en mayor riesgo en las fracturas desplazadas de la apófisis coracoides?",
    options: [
      "Nervio torácico largo",
      "Nervio axilar",
      "Nervio musculocutáneo",
      "Nervio supraescapular",
    ],
    correct: 2,
    explanation:
      "El nervio musculocutáneo entra en el tendón conjunto (porción corta del bíceps y coracobraquial), que se origina en la coracoides, por lo que puede lesionarse en fracturas desplazadas de esta apófisis.",
  },
  {
    id: 63,
    block: "ms",
    code: "Mumford",
    image: null,
    prompt:
      "Mujer de 65 años con luxación acromioclavicular tipo III diagnosticada hace 5 meses, actualmente con dolor moderado en la articulación acromioclavicular pero estable clínicamente, sin inestabilidad relevante. ¿Cuál sería la opción quirúrgica más adecuada si fracasa el tratamiento conservador?",
    options: [
      "Tornillo de Bosworth",
      "Reconstrucción del ligamento coracoclavicular con tendón autólogo más refuerzo tipo suspensión",
      "Técnica de Mumford (resección del extremo distal de clavícula) aislada, al ser una lesión crónica con articulación sintomática pero estable",
      "Transposición de Dewar-Barrington",
    ],
    correct: 2,
    explanation:
      "En luxaciones acromioclaviculares crónicas (>6 semanas) tipo I-II degenerativas o en tipo III con articulación sintomática pero estable, no tiene sentido reparar ligamentos no funcionales; la técnica de Mumford aislada (resección de 0,5-1 cm de clavícula distal) es una opción razonable.",
  },
  {
    id: 64,
    block: "ms",
    code: "Clavícula obstétrica",
    image: null,
    prompt:
      "Respecto a las fracturas de clavícula en el recién nacido, señale la afirmación correcta:",
    options: [
      "Son más frecuentes en la clavícula derecha (salvo dextrocardia) por ser la presentación OAI la más habitual en el parto",
      "Son más frecuentes en la clavícula izquierda por la presentación fetal habitual",
      "Se diagnostican mediante ecografía prenatal de rutina antes del parto",
      "Suelen requerir vendaje en 8 durante 6 semanas",
    ],
    correct: 0,
    explanation:
      "Debido a que la presentación más frecuente en el parto es la occípito-anterior izquierda (OAI), la fractura clavicular obstétrica es más frecuente en el lado derecho (salvo en casos de dextrocardia). El tratamiento habitual es mínimo o abstención terapéutica.",
  },
  {
    id: 65,
    block: "ms",
    code: "Luxación esternoclavicular posterior",
    image: null,
    prompt:
      "Paciente con luxación esternoclavicular posterior aguda tras accidente deportivo, con disfagia leve y congestión venosa del cuello. Tras reducción cerrada fallida en quirófano, ¿cuál es la actitud más adecuada?",
    options: [
      "Tratamiento conservador con cabestrillo indefinido",
      "Artrodesis esternoclavicular de entrada",
      "Colocación de agujas de Kirschner para fijación temporal",
      "Reducción abierta, evitando el uso de pines o agujas de Kirschner por riesgo de migración a estructuras mediastínicas, idealmente con interconsulta a cirugía cardiotorácica o vascular",
    ],
    correct: 3,
    explanation:
      "Ante el fracaso de la reducción cerrada en una luxación esternoclavicular posterior, está indicada la reducción abierta. Está formalmente contraindicado el uso de agujas o pines de Kirschner por el riesgo de rotura y migración a estructuras vitales del mediastino, y se recomienda contar con cirugía cardiotorácica o vascular dado el riesgo de complicaciones potencialmente mortales.",
  },
  {
    id: 66,
    block: "ms",
    code: "Fractura cuerpo escápula",
    image: null,
    prompt:
      "En las fracturas de cuerpo y espina de escápula, ¿cuál de los siguientes NO es un criterio habitualmente propuesto para valorar tratamiento quirúrgico?",
    options: [
      "Cualquier grado de conminución, independientemente del desplazamiento",
      "Angulación en visión axial de escápula de al menos 45º",
      "Ángulo glenopolar ≤22º",
      "Medialización del borde lateral de la escápula mayor de 2 cm",
    ],
    correct: 0,
    explanation:
      "La mera presencia de conminución no es, por sí sola, criterio de cirugía si no se acompaña de desplazamiento o angulación significativos. Los criterios clásicamente propuestos incluyen medialización >2 cm, angulación axial ≥45º, ángulo glenopolar ≤22º y disrupción bipolar del complejo suspensorio ≥1 cm.",
  },
  {
    id: 67,
    block: "ms",
    code: "Clavícula adolescente",
    image: null,
    prompt:
      "Adolescente de 15 años, deportista, sufre traumatismo directo sobre el hombro durante un partido de balonmano. Se diagnostica fractura de tercio medio de clavícula desplazada con acortamiento de 22 mm, sin lesión cutánea ni neurovascular. Los padres preguntan por el tratamiento más adecuado. ¿Cuál es la respuesta más ajustada a la evidencia actual?",
    options: [
      "Tratamiento mínimo o abstención terapéutica, igual que en fracturas obstétricas",
      "Cirugía de entrada, dado que se trata de una fractura desplazada con acortamiento >20 mm",
      "En general el tratamiento sigue siendo conservador con resultados similares al quirúrgico; en adolescentes mayores atletas puede plantearse una decisión compartida con la familia",
      "Fijación sistemática con agujas de Kirschner percutáneas",
    ],
    correct: 2,
    explanation:
      "En niños y adolescentes el tratamiento quirúrgico no ha demostrado mejores resultados que el conservador de forma generalizada; sin embargo, en adolescentes mayores atletas con fracturas muy desplazadas se puede plantear una decisión compartida con la familia. El acortamiento >20 mm es una indicación relativa, no absoluta.",
  },
  {
    id: 68,
    block: "ms",
    code: "Complicación clavícula",
    image: null,
    prompt:
      "¿Cuál de las siguientes es la complicación MÁS FRECUENTE de las fracturas de clavícula a medio-largo plazo?",
    options: [
      "Pseudoartrosis",
      "Compresión del plexo braquial",
      "Artrosis acromioclavicular postraumática",
      "Consolidación viciosa",
    ],
    correct: 3,
    explanation:
      "La consolidación viciosa es la complicación tardía más frecuente de las fracturas de clavícula, sobre todo cuando el acortamiento supera los 2 cm; suele ser bien tolerada funcionalmente aunque puede producir fatiga, dolor y defecto estético.",
  },
  {
    id: 69,
    block: "ms",
    code: "Luxación anterior >40 años",
    image: null,
    prompt:
      "Mujer de 62 años sufre una caída con el brazo en abducción y rotación externa, produciéndose una luxación anterior de hombro que se reduce en Urgencias. Tras la reducción persiste debilidad marcada para la rotación externa y la abducción activa, con recuperación lenta. ¿Cuál es la actitud más adecuada?",
    options: [
      "Es esperable tras cualquier luxación y no requiere estudio adicional",
      "Repetir la radiografía simple es suficiente para descartar cualquier lesión asociada",
      "Iniciar directamente fisioterapia intensiva sin pruebas de imagen",
      "Solicitar ecografía o RM para descartar rotura del manguito rotador, dado que en mayores de 40 años con recuperación lenta esto es más probable que una lesión del nervio axilar",
    ],
    correct: 3,
    explanation:
      "En pacientes mayores de 40 años, tras luxación anterior con desplazamiento apreciable o recuperación funcional lenta, está indicada ecografía o RM para descartar rotura del manguito rotador, que es más frecuente que la lesión del nervio axilar en este grupo de edad, aunque ambas pueden coexistir y se recomienda descartar el manguito ante cualquier sospecha de lesión nerviosa.",
  },
  {
    id: 70,
    block: "ms",
    code: "On-track / off-track",
    image: null,
    prompt:
      "En un paciente con inestabilidad anterior recidivante de hombro, la TC-3D muestra que el intervalo de Hill-Sachs es mayor que la superficie glenoidea disponible. ¿Qué implica este hallazgo?",
    options: [
      "Indica ausencia de defecto óseo relevante",
      "La lesión de Hill-Sachs es 'on-track' y no requiere ningún gesto sobre la cabeza humeral",
      "La lesión es 'off-track': la cabeza humeral se enganchará en el reborde glenoideo durante el arco de movimiento, lo que favorece la recidiva si no se trata adecuadamente",
      "Contraindica cualquier tratamiento quirúrgico",
    ],
    correct: 2,
    explanation:
      "Cuando el intervalo de Hill-Sachs supera la superficie glenoidea disponible, la lesión se clasifica como 'off-track': la cabeza humeral se engancha en el reborde glenoideo anterior durante el movimiento, lo que predispone a la recidiva si no se aborda (por ejemplo, mediante remplissage o técnicas de tope óseo).",
  },
  {
    id: 71,
    block: "ms",
    code: "Lesión HAGL",
    image: null,
    prompt:
      "Paciente con inestabilidad anterior de hombro en el que, durante la artroscopia, se identifica una desinserción de los ligamentos glenohumerales a nivel del cuello humeral, con la inserción glenoidea de los mismos íntegra. ¿De qué lesión se trata y qué la caracteriza?",
    options: [
      "Lesión ALPSA; el periostio anterior queda desprendido pero intacto",
      "Lesión de Perthes; labrum no desplazado con manguito perióstico normal",
      "Lesión de Bankart; avulsión labral anteroinferior glenoidea",
      "Lesión HAGL; desinserción de los ligamentos glenohumerales en su origen humeral, no en la glenoides, de difícil identificación y tratamiento",
    ],
    correct: 3,
    explanation:
      "La lesión HAGL (Humeral Avulsion of the Glenohumeral Ligament) consiste en la desinserción de los ligamentos glenohumerales en su inserción humeral (no en la glenoidea), a diferencia de las lesiones de Bankart, ALPSA o Perthes, que afectan al complejo labral glenoideo. Es una lesión de difícil identificación y tratamiento.",
  },
  {
    id: 72,
    block: "ms",
    code: "Convulsión y luxación posterior",
    image: null,
    prompt:
      "Varón de 45 años con antecedente de epilepsia sufre una crisis convulsiva. A su llegada a Urgencias presenta dolor bilateral en hombros, con limitación marcada de la rotación externa pasiva en ambos lados y elevación restringida por debajo de 90º. ¿Cuál es la sospecha diagnóstica principal y qué se debe evitar al intentar la reducción?",
    options: [
      "Rotura bilateral del manguito rotador; tratamiento conservador de entrada",
      "Luxación anterior bilateral; se debe reducir mediante rotación externa forzada",
      "Luxación posterior bilateral; debe evitarse la rotación externa forzada durante la reducción, ya que puede producir fracturas",
      "Fractura de troquíter bilateral; no requiere maniobra de reducción",
    ],
    correct: 2,
    explanation:
      "La limitación de la rotación externa pasiva tras una crisis convulsiva es el signo diagnóstico fundamental de luxación posterior de hombro (a menudo bilateral). Para reducirla se emplea rotación interna con tracción, evitando forzar la rotación externa, ya que puede producir fracturas.",
  },
  {
    id: 73,
    block: "ms",
    code: "Indicación quirúrgica 1ª luxación",
    image: null,
    prompt:
      "Jugador de balonmano de 22 años, deportista de contacto de alto nivel, sufre su primera luxación anterior traumática de hombro, sin fractura asociada ni rotura del manguito. Según los criterios actuales, ¿cuál es la actitud más adecuada?",
    options: [
      "Puede plantearse estabilización quirúrgica de entrada, ya que la edad <25 años y la práctica de deporte de contacto de alto nivel son criterios aceptados para indicar cirugía tras una primera luxación",
      "Cirugía diferida hasta que aparezca una segunda luxación, con independencia del perfil deportivo",
      "Inmovilización en rotación externa durante 6 semanas como única medida",
      "Tratamiento conservador de entrada en toda primera luxación, con independencia del perfil del paciente",
    ],
    correct: 0,
    explanation:
      "Las indicaciones de tratamiento quirúrgico tras una primera luxación traumática más aceptadas actualmente incluyen: paciente menor de 25 años deportista de contacto de alto nivel, existencia de fractura de Bankart ósea, o rotura del manguito rotador.",
  },
  {
    id: 74,
    block: "ms",
    code: "Defecto glenoideo subcrítico",
    image: null,
    prompt:
      "Deportista de contacto de 24 años con inestabilidad anterior recidivante presenta en la TC-3D un defecto óseo glenoideo del 16% con lesión de Hill-Sachs 'off-track'. ¿Cuál es la actitud más razonable según el algoritmo actual de decisión quirúrgica?",
    options: [
      "Se trata de un defecto 'subcrítico' (13,5-20%) con Hill-Sachs off-track; dado el perfil de riesgo (deportista de contacto), suele optarse por reparación de Bankart + Remplissage o Latarjet, en lugar de reparación de partes blandas aislada",
      "Debe realizarse un aloinjerto de tibia distal como primera opción de entrada",
      "La cirugía no está indicada por debajo del 20% de defecto",
      "Reparación de Bankart aislada, sin más consideraciones",
    ],
    correct: 0,
    explanation:
      "El defecto glenoideo 'subcrítico' (entre 13,5-20%) obliga a valorar factores pronósticos como la localización on/off-track del Hill-Sachs y el perfil de riesgo del paciente. En deportistas de contacto con Hill-Sachs off-track, se prefiere una técnica de tope óseo (Latarjet) o Bankart + Remplissage frente a la reparación aislada de partes blandas.",
  },
  {
    id: 75,
    block: "ms",
    code: "Triada terrible del hombro",
    image: null,
    prompt:
      "Paciente de 58 años sufre una luxación anterior de hombro de alta energía. Tras la reducción presenta impotencia funcional del deltoides con lenta recuperación, y en la RM se objetiva además una rotura del manguito rotador. ¿Qué entidad se debe sospechar y qué prueba confirma la afectación nerviosa?",
    options: [
      "Hombro flotante; se confirma con TC",
      "Triada terrible del hombro (luxación anterior + rotura del manguito rotador + lesión del plexo braquial); se confirma la afectación nerviosa mediante electromiograma a las 3-4 semanas",
      "Lesión de Hill-Sachs invertida; se confirma con radiografía simple",
      "Disociación escapulotorácica; se confirma con angiografía",
    ],
    correct: 1,
    explanation:
      "La coexistencia de luxación anterior de hombro, rotura del manguito rotador y lesión del plexo braquial (cualquiera de sus ramas o troncos, típicamente el nervio axilar) constituye la 'triada terrible del hombro'. La afectación nerviosa se confirma con electromiograma a las 3-4 semanas, dado que la mayoría son neuroapraxias que se recuperan en unas 10 semanas.",
  },
  {
    id: 76,
    block: "ms",
    code: "Lesión de Kim",
    image: null,
    prompt:
      "Jugador de rugby con dolor posterior de hombro recurrente ante posiciones de flexión, aducción y rotación interna, sin luxaciones francas documentadas. En la exploración, el test de Kim es positivo. ¿Qué lesión sugiere este cuadro y cómo se caracteriza?",
    options: [
      "Lesión de Bankart invertido; avulsión completa y desplazada del labrum posteroinferior",
      "Lesión de Perthes invertida; asociada de forma característica a luxación posterior franca",
      "Lesión HAGL inversa; desinserción de los ligamentos glenohumerales posteriores en su origen glenoideo",
      "Lesión de Kim; avulsión oculta e incompleta de la zona posteroinferior del labrum, típica de inestabilidad posterior recidivante por microtraumatismos repetidos",
    ],
    correct: 3,
    explanation:
      "La lesión de Kim es una avulsión oculta e incompleta del labrum posteroinferior, característica de la inestabilidad posterior recidivante por microtraumatismos repetidos (típica en rugby y culturismo), sin llegar a producir luxaciones francas.",
  },
  {
    id: 77,
    block: "ms",
    code: "Inestabilidad multidireccional",
    image: null,
    prompt:
      "Nadadora de 19 años con dolor e inestabilidad bilateral de hombros, de aparición insidiosa, sin antecedente traumático claro. En la exploración presenta signo del surco positivo bilateral y test de hiperabducción de Gagey patológico. ¿Cuál es la orientación terapéutica inicial más adecuada?",
    options: [
      "Procedimiento de Latarjet bilateral, por tratarse de una inestabilidad de alto riesgo",
      "Tratamiento no quirúrgico durante al menos 3-6 meses, centrado en fortalecimiento de estabilizadores dinámicos y control escapular, reservando la cirugía para los casos sin respuesta",
      "Estabilización quirúrgica bilateral de entrada, dado el carácter bilateral",
      "Reparación artroscópica de Bankart bilateral inmediata",
    ],
    correct: 1,
    explanation:
      "La inestabilidad multidireccional, típicamente no traumática, bilateral y asociada a laxitud e hiperlaxitud (signo del surco, test de Gagey patológico), se trata inicialmente de forma no quirúrgica mediante fortalecimiento de los estabilizadores dinámicos y control de la cinemática escapular, durante al menos 3-6 meses antes de plantear cirugía.",
  },
  {
    id: 78,
    block: "ms",
    code: "Fractura de troquíter",
    image: null,
    prompt:
      "Paciente de 55 años sufre una luxación anterior de hombro asociada a una fractura de la tuberosidad mayor (troquíter). Tras la reducción cerrada, la fractura permanece significativamente desplazada. ¿Cuál es la actitud más adecuada?",
    options: [
      "Amputación funcional del miembro",
      "Tratamiento conservador, dado que las fracturas de troquíter suelen consolidar bien",
      "No requiere ningún seguimiento adicional",
      "Está indicada la estabilización quirúrgica, ya que una fractura de troquíter que sigue desplazada tras la reducción es una indicación reconocida de tratamiento quirúrgico",
    ],
    correct: 3,
    explanation:
      "Entre las indicaciones de tratamiento quirúrgico de la inestabilidad de hombro se incluye la fractura de troquíter asociada que permanece desplazada tras la reducción, además de la fractura de glenoides y las lesiones del manguito asociadas.",
  },
  {
    id: 79,
    block: "ms",
    code: "Luxatio erecta",
    image: null,
    prompt:
      "Paciente acude con el brazo fijo en posición de hiperabducción completa por encima de la cabeza, sin poder bajarlo, tras un mecanismo de hiperabducción forzada. ¿Qué tipo de luxación glenohumeral es la más probable y qué lesiones asociadas hay que descartar activamente?",
    options: [
      "Luxación superior; descartar rotura del tendón de Aquiles",
      "Luxación inferior o 'luxatio erecta'; descartar lesiones de la arteria axilar y del plexo braquial, así como fracturas proximales de húmero",
      "Luxación posterior; descartar lesión del nervio supraescapular como principal riesgo asociado",
      "Subluxación fisiológica sin relevancia clínica",
    ],
    correct: 1,
    explanation:
      "La luxación inferior o 'luxatio erecta' se produce por hiperabducción, con choque del cuello humeral contra el acromion que hace de palanca luxando la cabeza en sentido inferior. Se asocia con frecuencia a lesiones de partes blandas, fracturas proximales de húmero y lesiones de la arteria axilar y del plexo braquial, que deben descartarse activamente.",
  },
  {
    id: 80,
    block: "ms",
    code: "Inestabilidad glenohumeral infantil",
    image: null,
    prompt:
      "Adolescente de 13 años con fisis humeral proximal abierta presenta una segunda luxación glenohumeral recidivante tras un episodio traumático inicial. ¿Cuál es la actitud más adecuada según el manejo habitual en este grupo de edad?",
    options: [
      "Amputación funcional del miembro superior",
      "Cirugía inmediata igual que en el adulto, independientemente del estado fisario",
      "Tratamiento conservador hasta el cierre fisario, con independencia de la clínica de recurrencia",
      "En general se opta por tratamiento conservador si la fisis está abierta, salvo que las recurrencias sugieran la existencia de una lesión de Bankart, en cuyo caso puede valorarse cirugía; el manejo es controvertido",
    ],
    correct: 3,
    explanation:
      "En niños con fisis abierta (<14 años) se suele optar por tratamiento conservador de la inestabilidad glenohumeral, salvo que existan recurrencias que sugieran una lesión de Bankart, donde el manejo se individualiza y es controvertido. En niños con fisis cerrada (>14 años) el tratamiento sigue las pautas del adulto joven.",
  },
  {
    id: 81,
    block: "ms",
    code: "Complicación vascular luxación",
    image: null,
    prompt:
      "Paciente anciana sufre una luxación anterior de hombro. Tras la reducción presenta un miembro frío, pálido y sin pulso radial palpable. ¿Cuál es la actitud inmediata?",
    options: [
      "Observación domiciliaria y revisión en una semana",
      "Cirugía urgente con restablecimiento de la circulación del brazo (sutura, injerto o prótesis vascular), dado que se trata de una probable lesión de la arteria axilar",
      "Aplicar frío local y analgesia oral, difiriendo la valoración vascular",
      "Repetir la reducción cerrada de forma más enérgica",
    ],
    correct: 1,
    explanation:
      "La lesión de la arteria axilar (más frecuente en ancianos, sobre todo a nivel del tercer segmento) es una urgencia que requiere cirugía inmediata con restablecimiento de la circulación del brazo mediante sutura, injerto o prótesis vascular.",
  },
  {
    id: 82,
    block: "ms",
    code: "Latarjet vs Bankart",
    image: null,
    prompt:
      "Respecto al procedimiento de Latarjet en el tratamiento de la inestabilidad anterior de hombro, señale la afirmación correcta:",
    options: [
      "Está indicado cuando existen múltiples factores de riesgo de recidiva, pero no ante un defecto óseo significativo aislado",
      "Consiste en el reanclaje artroscópico del labrum a la cavidad glenoidea sin transferencia ósea",
      "Ha caído en desuso frente a otras técnicas en la práctica actual",
      "Está indicado tanto si existe un defecto óseo significativo como si hay múltiples factores de riesgo de recidiva, incluso en ausencia de defecto óseo mayor",
    ],
    correct: 3,
    explanation:
      "El procedimiento de Latarjet (transferencia de la apófisis coracoides con el tendón conjunto a la glenoides anteroinferior) está indicado tanto ante un defecto óseo glenoideo significativo como ante la presencia de múltiples factores de riesgo de recidiva, incluso si el defecto óseo no es muy grande, por el efecto de 'hamaca' estabilizadora adicional que aporta el tendón conjunto.",
  },
  {
    id: 83,
    block: "ms",
    code: "PROFHER",
    image: null,
    prompt:
      "Mujer de 68 años sufre una caída casual con fractura desplazada del cuello quirúrgico de húmero proximal en 2 fragmentos. Según los resultados del ensayo clínico PROFHER y la evidencia posterior, ¿cuál es la actitud más ajustada?",
    options: [
      "El tratamiento conservador es una opción razonable, ya que no se han demostrado diferencias clínicas significativas frente al tratamiento quirúrgico a 2 y 5 años, con menos complicaciones",
      "Amputación funcional del miembro, dada la mala evolución esperable",
      "Cirugía sistemática con placa bloqueada, ya que ha demostrado ser claramente superior al tratamiento conservador",
      "Prótesis inversa de entrada en toda fractura desplazada en mayores de 65 años",
    ],
    correct: 0,
    explanation:
      "El ensayo PROFHER (y su seguimiento a 5 años) no demostró diferencias clínicas ni estadísticamente significativas entre tratamiento conservador y quirúrgico en fracturas desplazadas de húmero proximal, con más complicaciones en el grupo quirúrgico. La tendencia actual es aplicar tratamiento conservador en pacientes ancianos, independientemente del tipo de fractura.",
  },
  {
    id: 84,
    block: "ms",
    code: "Índice tuberosidad deltoidea",
    image: null,
    prompt:
      "En un paciente candidato a osteosíntesis con placa LCP por una fractura en 3 fragmentos de húmero proximal, se calcula el Índice de la Tuberosidad Deltoidea (DTI) obteniendo un valor de 1,2. ¿Qué implica este resultado?",
    options: [
      "Buena calidad ósea, bajo riesgo de fallo de la osteosíntesis",
      "Densidad mineral ósea baja de la cabeza humeral, con mayor riesgo de fallo de la osteosíntesis, por lo que podría reconsiderarse la indicación hacia una prótesis",
      "Indica ausencia de fractura asociada del troquíter",
      "El valor no tiene relación con la calidad ósea, solo con el tamaño de la placa",
    ],
    correct: 1,
    explanation:
      "Un DTI inferior a 1,4 predice una densidad mineral ósea baja de la cabeza humeral y aumenta el riesgo de fallo de la osteosíntesis, lo que debe tenerse en cuenta al planificar el tratamiento quirúrgico, especialmente en pacientes con hueso osteoporótico.",
  },
  {
    id: 85,
    block: "ms",
    code: "Fractura-luxación húmero proximal",
    image: null,
    prompt:
      "Paciente de 78 años con fractura-luxación anterior de húmero proximal en 4 fragmentos. ¿Cuál es el tratamiento de elección?",
    options: [
      "Prótesis (habitualmente inversa en el anciano)",
      "Reducción cerrada aislada sin fijación",
      "Osteosíntesis con placa LCP, con independencia de la edad del paciente",
      "Tratamiento conservador con Velpeau como primera opción",
    ],
    correct: 0,
    explanation:
      "Las fracturas-luxaciones en 4 fragmentos de húmero proximal se tratan mediante prótesis, dado el alto riesgo de necrosis avascular y la dificultad de conseguir una reducción estable; en el paciente anciano con buena función del deltoides, la prótesis inversa suele ser la opción preferida.",
  },
  {
    id: 86,
    block: "ms",
    code: "Prótesis inversa indicación",
    image: null,
    prompt:
      "Paciente anciano con fractura en 4 fragmentos de húmero proximal, con conminución importante de las tuberosidades que hace inviable su osteosíntesis, pero con función normal del músculo deltoides. ¿Cuál es la opción más adecuada según los criterios actuales?",
    options: [
      "Osteosíntesis con clavo intramedular, forzando la fijación de las tuberosidades conminutas",
      "Prótesis inversa, dado que existen tuberosidades no reconstruibles y buena función deltoidea",
      "Tratamiento conservador, reservando la cirugía para un segundo tiempo",
      "Hemiartroplastia cementada de entrada, por ser la técnica más sencilla",
    ],
    correct: 1,
    explanation:
      "La prótesis inversa está indicada en el anciano con relativamente alta demanda funcional cuando existe conminución importante de las tuberosidades no susceptible de osteosíntesis, y cuando existe funcionalidad del músculo deltoides; si no la hay, no debe implantarse.",
  },
  {
    id: 87,
    block: "ms",
    code: "Fractura troquíter desplazada",
    image: null,
    prompt:
      "Trabajador manual de 45 años con actividad repetida por encima de la cabeza sufre una fractura aislada del troquíter con 4 mm de desplazamiento. ¿Cuál es la actitud más adecuada según las particularidades de su perfil?",
    options: [
      "Tratamiento conservador sin reservas, ya que el desplazamiento es menor de 5 mm",
      "Prótesis inversa de entrada",
      "Amputación funcional del miembro superior",
      "Dado que es trabajador manual con actividad repetida por encima de la cabeza, el umbral de desplazamiento aceptable para tratamiento conservador se reduce a 3 mm, por lo que debería valorarse tratamiento quirúrgico",
    ],
    correct: 3,
    explanation:
      "Aunque el umbral general para tratamiento quirúrgico de la fractura de troquíter es un desplazamiento >5 mm, en pacientes deportistas o trabajadores manuales con actividad repetida por encima de la cabeza este umbral se reduce a 3 mm, dado el mayor riesgo funcional del desplazamiento en este grupo.",
  },
  {
    id: 88,
    block: "ms",
    code: "Pseudoartrosis húmero proximal",
    image: null,
    prompt:
      "Paciente con fractura de cuello quirúrgico de húmero proximal tratada de forma conservadora, que a los 7 meses presenta dolor, rigidez e impotencia funcional, con evidencia radiológica de ausencia de consolidación. ¿Cuál es la actitud más adecuada?",
    options: [
      "Está indicado el tratamiento quirúrgico, ya que se trata de una pseudoartrosis sintomática con más de 6 meses de evolución desde la fractura inicial",
      "Continuar con fisioterapia, sin plantear ninguna otra medida",
      "Amputación del miembro superior",
      "Esperar hasta el año antes de plantear cualquier tratamiento adicional",
    ],
    correct: 0,
    explanation:
      "El tratamiento quirúrgico de la pseudoartrosis de húmero proximal se recomienda cuando existe evidencia radiológica de pseudoartrosis transcurridos 6 meses desde la fractura, acompañada de dolor e impotencia funcional; suele consistir en osteosíntesis con aporte de injerto.",
  },
  {
    id: 89,
    block: "ms",
    code: "Little League Shoulder",
    image: null,
    prompt:
      "Adolescente de 13 años, lanzador de béisbol, presenta dolor progresivo en el hombro dominante relacionado con la actividad deportiva. En la radiografía se objetiva un ensanchamiento de la fisis proximal del húmero, sin fractura franca. ¿Cuál es el diagnóstico y el tratamiento más adecuado?",
    options: [
      "Osteomielitis del húmero proximal; requiere antibioterapia intravenosa urgente",
      "Tumor óseo primario; requiere biopsia inmediata",
      "Fractura-luxación de húmero proximal; requiere reducción abierta urgente",
      "'Little League Shoulder' (epifisiolisis humeral tipo I por sobreuso); el tratamiento consiste en descanso y modificación de la actividad física",
    ],
    correct: 3,
    explanation:
      "El 'Little League Shoulder' es una epifisiolisis humeral tipo I por uso excesivo del hombro durante la maduración esquelética, típica de deportistas de lanzamiento de 11-14 años, que se manifiesta radiológicamente como un ensanchamiento de la fisis proximal. El tratamiento es conservador: descanso y modificación de la actividad física.",
  },
  {
    id: 90,
    block: "ms",
    code: "Fractura neonatal húmero",
    image: null,
    prompt:
      "Recién nacido presenta pseudoparálisis del brazo tras un parto distócico con distocia de hombro. La radiografía muestra alterada la relación diáfisis-escápula sin visualizarse claramente la fractura. ¿Cuál es la prueba diagnóstica de elección y por qué?",
    options: [
      "Ecografía, porque en el neonato la epífisis proximal del húmero es cartilaginosa y la fractura no se visualiza en la radiografía simple",
      "TAC, porque ofrece mejor resolución ósea",
      "Ninguna prueba es necesaria; el diagnóstico se basa solo en la clínica",
      "RM bajo sedación, como primera prueba de imagen en el neonato",
    ],
    correct: 0,
    explanation:
      "En el neonato, la epífisis proximal del húmero es cartilaginosa (el núcleo de osificación de la cabeza aparece a los 6 meses), por lo que la fractura o epifisiolisis puede pasar desapercibida en la radiografía simple (a veces llamada 'pseudoluxación'). La ecografía es la prueba diagnóstica de elección en este contexto.",
  },
  {
    id: 91,
    block: "ms",
    code: "Fractura infantil desplazada",
    image: null,
    prompt:
      "Niño de 9 años sufre una fractura de cuello quirúrgico de húmero proximal con una angulación total (AP + axial) de 65º. Según la guía de indicación de tratamiento por edad y desviación, ¿cuál es la actitud más adecuada?",
    options: [
      "Prótesis, igual que en el adulto",
      "Tratamiento conservador, ya que en niños menores de 10-11 años se acepta hasta 60º de angulación",
      "Tratamiento quirúrgico, ya que en niños menores de 10-11 años el límite aceptado para tratamiento conservador es 60º de angulación, y este paciente lo supera",
      "Amputación funcional del miembro",
    ],
    correct: 2,
    explanation:
      "Según la guía de indicación de tratamiento por edad y desviación, en niños menores de 10-11 años se acepta tratamiento conservador hasta 60º de angulación; con 65º de angulación total (suma de las angulaciones en AP y axial) estaría superado ese límite, indicándose tratamiento quirúrgico.",
  },
  {
    id: 92,
    block: "ms",
    code: "Hematoma de Hennequin",
    image: null,
    prompt:
      "Paciente con fractura de húmero proximal que, 48 horas después del traumatismo, presenta un hematoma extenso en la cara interna del brazo y la cara lateral del tórax. ¿Cómo se denomina este hallazgo y qué significado tiene?",
    options: [
      "Signo de la charretera; indica luxación glenohumeral asociada",
      "Signo de Hill-Sachs; indica lesión osteocondral asociada",
      "Signo de Popeye; indica rotura del tendón del bíceps",
      "Hematoma de Hennequin (o 'en herradura'); es un hallazgo característico y esperable de las fracturas de la extremidad proximal del húmero, no indica por sí solo una complicación grave",
    ],
    correct: 3,
    explanation:
      "El hematoma de Hennequin (o 'en herradura') aparece típicamente a las 48 horas en la cara interna del brazo y la cara lateral del tórax, y es un hallazgo característico y esperable de las fracturas de la extremidad proximal del húmero.",
  },
  {
    id: 93,
    block: "ms",
    code: "Fractura cuello anatómico",
    image: null,
    prompt:
      "Paciente de 72 años con alta demanda funcional sufre una fractura en 2 fragmentos del cuello anatómico de húmero proximal. ¿Cuál es la actitud más adecuada dado el riesgo específico de este tipo de fractura?",
    options: [
      "Tratamiento conservador de entrada, difiriendo la valoración quirúrgica",
      "Amputación funcional del miembro",
      "Osteosíntesis con agujas percutáneas, técnica de elección habitual en este tipo de fractura",
      "Dado el alto riesgo de necrosis avascular de la cabeza humeral en el paciente mayor con este tipo de fractura, se prefiere el tratamiento protésico frente a la osteosíntesis",
    ],
    correct: 3,
    explanation:
      "Las fracturas de cuello anatómico en 2 fragmentos tienen un riesgo elevado de necrosis avascular de la cabeza humeral, especialmente en el paciente mayor; por ello, en personas mayores con alta demanda funcional o fracaso del tratamiento conservador se prefiere la prótesis frente a la reducción abierta y fijación interna, que se reserva para pacientes jóvenes.",
  },
  {
    id: 94,
    block: "ms",
    code: "Fractura impactada en valgo",
    image: null,
    prompt:
      "Paciente joven con buena calidad ósea presenta una fractura reciente en 4 fragmentos de húmero proximal, impactada en valgo. ¿Cuál es la técnica quirúrgica más adecuada en este perfil de paciente?",
    options: [
      "Amputación funcional del miembro",
      "Agujas percutáneas, con o sin sutura o injerto óseo asociado, dado que se trata de una fractura reciente, con buen hueso y en paciente joven",
      "Prótesis inversa de entrada, dada la complejidad de la fractura",
      "Tratamiento conservador de entrada, sin plantear ninguna intervención",
    ],
    correct: 1,
    explanation:
      "En fracturas en 4 fragmentos impactadas en valgo, recientes, con buena calidad ósea y en pacientes jóvenes, la técnica de elección son las agujas percutáneas, con o sin sutura o aporte de injerto óseo asociado, reservando la artroplastia para los casos crónicos, con mal hueso o en pacientes mayores.",
  },
  {
    id: 95,
    block: "ms",
    code: "Vascularización húmero proximal",
    image: null,
    prompt:
      "Respecto a la vascularización de la cabeza humeral, señale la afirmación correcta según la evidencia actual:",
    options: [
      "Depende sobre todo de la arteria circunfleja humeral anterior, sin aporte relevante de otras ramas",
      "Tradicionalmente se atribuía el papel principal a la arteria circunfleja humeral anterior, pero estudios recientes demuestran que la arteria circunfleja humeral posterior aporta hasta el 64% de la vascularización cefálica",
      "Depende sobre todo de ramas directas de la arteria subclavia, sin aporte relevante de la circunfleja",
      "No existe ninguna relación entre la vascularización cefálica y el riesgo de necrosis avascular",
    ],
    correct: 1,
    explanation:
      "Tradicionalmente se consideraba que la vascularización cefálica provenía sobre todo de las arterias anterolaterales ascendentes (ramas de la circunfleja humeral anterior), pero estudios recientes han demostrado que la arteria circunfleja humeral posterior desempeña un papel muy importante, aportando hasta el 64% de la vascularización del húmero proximal.",
  },
  {
    id: 96,
    block: "ms",
    code: "Codo flotante húmero proximal",
    image: null,
    prompt:
      "Paciente politraumatizado joven presenta una fractura de cuello quirúrgico de húmero proximal desplazada más de un 50%, asociada a una fractura ipsilateral distal del mismo miembro superior ('codo flotante'). ¿Cuál es la actitud más adecuada respecto al tratamiento de la fractura proximal?",
    options: [
      "Amputación funcional del miembro superior",
      "Prótesis inversa, con independencia de la edad del paciente",
      "El tratamiento quirúrgico está indicado, ya que las fracturas asociadas ipsilaterales del miembro superior (codo flotante) constituyen una de las indicaciones reconocidas de tratamiento quirúrgico en las fracturas de cuello quirúrgico",
      "Tratamiento conservador de entrada, dado que las fracturas asociadas ipsilaterales no modifican la indicación",
    ],
    correct: 2,
    explanation:
      "El tratamiento quirúrgico de las fracturas del cuello quirúrgico de húmero proximal está indicado en pacientes jóvenes y activos con desplazamiento significativo (>50%), politraumatizados, con fracturas asociadas ipsilaterales del miembro superior (codo flotante), daño vascular, fracturas abiertas, fracturas metastásicas o fracaso del tratamiento conservador.",
  },
  {
    id: 97,
    block: "ms",
    code: "Parálisis radial primaria",
    image: null,
    prompt:
      "Varón de 28 años sufre traumatismo directo en cara lateral del brazo tras accidente de moto. La Rx muestra fractura transversa de tercio medio de húmero con desplazamiento del fragmento distal hacia lateral. En la exploración presenta imposibilidad para la extensión de la muñeca y los dedos, con sensibilidad conservada. ¿Cuál es la actitud más adecuada respecto al nervio radial?",
    options: [
      "Solicitar arteriografía inmediata, asumiendo que la parálisis radial implica lesión vascular asociada",
      "Tratar la fractura según los criterios habituales (ortopédico o quirúrgico) y monitorizar la función radial, dada la alta probabilidad de recuperación espontánea de estas parálisis",
      "Iniciar tratamiento con corticoides sistémicos para acelerar la recuperación nerviosa",
      "Indicar cirugía urgente para exploración del nervio radial, dado el desplazamiento lateral del fragmento distal",
    ],
    correct: 1,
    explanation:
      "La parálisis radial primaria asociada a fractura cerrada de diáfisis humeral (más frecuente en fracturas del tercio distal con desplazamiento radial del fragmento distal) tiene alta probabilidad de recuperación espontánea (en torno al 77%). Por sí sola no es indicación de exploración quirúrgica temprana; se recomienda esta cuando no mejora en 4-6 meses.",
  },
  {
    id: 98,
    block: "ms",
    code: "Placa LCP en osteoporosis",
    image: null,
    prompt:
      "Mujer de 72 años, con antecedente de osteoporosis, presenta fractura diafisaria de húmero con gran conminución tras caída casual. Se decide tratamiento quirúrgico con placa. ¿Qué tipo de implante resulta más adecuado en este contexto?",
    options: [
      "Clavo elástico intramedular tipo Ender",
      "Placa de reconstrucción de 3,5 mm sin bloqueo",
      "Placa LCP con tornillos roscados a la placa",
      "Placa DCP convencional de 4,5 mm sin tornillos bloqueados",
    ],
    correct: 2,
    explanation:
      "En pacientes osteoporóticos y en fracturas con gran conminución, las placas LCP (con tornillos roscados a la placa) han demostrado ser superiores a las placas DCP convencionales, ya que reducen el riesgo de fracaso del implante por aflojamiento de los tornillos.",
  },
  {
    id: 99,
    block: "ms",
    code: "Pronóstico fractura diáfisis humeral",
    image: null,
    prompt:
      "¿Cuál de las siguientes fracturas diafisarias de húmero presenta, en términos generales, peor pronóstico de consolidación con tratamiento conservador?",
    options: [
      "Fractura transversa de tercio medio con buen contacto óseo",
      "Fractura de tercio proximal en paciente mayor de 55 años",
      "Fractura conminuta de tercio medio",
      "Fractura oblicua larga de tercio medio",
    ],
    correct: 1,
    explanation:
      "Las fracturas de tercio proximal, especialmente en pacientes mayores de 55 años, presentan peor pronóstico con tratamiento conservador, consolidando en torno al 76% de los casos, frente a las fracturas oblicuas o conminutas, que consolidan mejor por su mayor superficie de contacto.",
  },
  {
    id: 100,
    block: "ms",
    code: "Fijación en politraumatizado",
    image: null,
    prompt:
      "Paciente politraumatizado con fractura diafisaria de húmero de tercio medio y extensa lesión de partes blandas en el brazo. ¿Cuál sería la opción de fijación quirúrgica de elección en este contexto?",
    options: [
      "Enclavado intramedular bloqueado",
      "Osteosíntesis MIPO con placa larga",
      "Placa DCP mediante abordaje anterior clásico",
      "Ortesis funcional de Sarmiento tras reducción cerrada",
    ],
    correct: 0,
    explanation:
      "El enclavado intramedular bloqueado es la técnica de elección en fracturas patológicas, pacientes con obesidad mórbida, extensa lesión de partes blandas o pacientes politraumatizados, situaciones en las que colocar una placa resulta poco recomendable.",
  },
  {
    id: 101,
    block: "ms",
    code: "Abordaje anterolateral húmero",
    image: null,
    prompt:
      "Durante un abordaje lateral directo (anterolateral) de la diáfisis humeral para exposición del tercio distal, el cirujano debe tener especial precaución porque este abordaje:",
    options: [
      "No puede extenderse ni proximal ni distalmente",
      "Es de los que conlleva menor riesgo de lesión del nervio radial entre los abordajes del húmero",
      "Discurre a través del músculo tríceps en toda su longitud",
      "Es el abordaje que con mayor frecuencia produce parálisis iatrogénica del nervio radial",
    ],
    correct: 3,
    explanation:
      "Aunque el abordaje lateral directo (anterolateral) tiene la ventaja de poder extenderse tanto proximal como distalmente, es el abordaje que mayor tasa de parálisis iatrogénica del nervio radial produce, por lo que requiere una disección cuidadosa.",
  },
  {
    id: 102,
    block: "ms",
    code: "Parálisis radial postquirúrgica",
    image: null,
    prompt:
      "Un paciente tratado con osteosíntesis con placa por fractura diafisaria de húmero presenta, en el postoperatorio inmediato, imposibilidad para la extensión activa de la muñeca que no estaba presente antes de la cirugía. Durante la intervención no se documentó la integridad del nervio radial. ¿Cuál es la actitud más adecuada?",
    options: [
      "Retirar el material de osteosíntesis de forma urgente",
      "Reintervenir de forma inmediata para explorar el nervio radial",
      "Considerar la parálisis como definitiva y plantear transferencias tendinosas en el mismo ingreso",
      "Solicitar electromiografía y pruebas de conducción nerviosa a partir de las 3-4 semanas, y valorar exploración quirúrgica si no mejora en 4-6 meses",
    ],
    correct: 3,
    explanation:
      "En las parálisis radiales postquirúrgicas en las que no se ha comprobado la indemnidad del nervio durante la cirugía, se recomienda seguimiento con electromiografía y pruebas de conducción nerviosa, reservando la exploración quirúrgica para los casos que no mejoran en el plazo de 4-6 meses, dado que la mayoría se recuperan.",
  },
  {
    id: 103,
    block: "ms",
    code: "Clasificación AO tipo B",
    image: null,
    prompt:
      "En la clasificación AO de las fracturas diafisarias de húmero, una fractura tipo B se caracteriza por:",
    options: [
      "Presentar un trazo simple, ya sea espiroideo, oblicuo largo u oblicuo corto",
      "Afectar de forma habitual a la articulación del codo",
      "Presentar un tercer fragmento, en cuña o de flexión",
      "Corresponder a fracturas segmentarias con gran conminución",
    ],
    correct: 2,
    explanation:
      "Las fracturas tipo B en la clasificación AO son aquellas que presentan un tercer fragmento (en cuña o ala de mariposa, con tercer fragmento pequeño de flexión, o con tercer fragmento fracturado), a diferencia del tipo A (fractura simple) y el tipo C (fractura compleja).",
  },
  {
    id: 104,
    block: "ms",
    code: "Fractura humeral en niño pequeño",
    image: null,
    prompt:
      "Niño de 4 años sufre fractura diafisaria de húmero tras caída de un columpio, con 45º de angulación en la radiografía. No se objetivan alteraciones neurovasculares. ¿Cuál es la actitud terapéutica más apropiada?",
    options: [
      "Enclavado intramedular flexible de entrada, por tratarse de un paciente pediátrico",
      "Fijador externo, dado el riesgo de lesión fisaria con otras técnicas",
      "Reducción abierta y osteosíntesis con placa de forma urgente",
      "Tratamiento conservador, dado que esta angulación resulta aceptable a su edad y remodelará con el crecimiento",
    ],
    correct: 3,
    explanation:
      "En niños menores de 5 años se aceptan angulaciones de hasta 70º y desplazamiento completo, ya que remodelarán con el crecimiento. El tratamiento quirúrgico en niños es infrecuente y se reserva para casos concretos; lo habitual es el manejo conservador.",
  },
  {
    id: 105,
    block: "ms",
    code: "Movilidad del foco a las 6 semanas",
    image: null,
    prompt:
      "Paciente con fractura diafisaria de húmero de tercio medio tratada de forma conservadora con ortesis funcional de Sarmiento. A las 6 semanas de evolución, la exploración clínica del foco de fractura demuestra movilidad grosera al manipularlo. ¿Qué implica este hallazgo?",
    options: [
      "Obliga a sustituir la ortesis por un yeso colgante de Caldwell",
      "Es un hallazgo esperable a las 6 semanas y no requiere ninguna actuación adicional",
      "Debe considerarse indicación de tratamiento quirúrgico, dado que la mayoría de estos casos no llegarán a consolidar con tratamiento conservador",
      "Indica que la fractura ya ha consolidado y puede retirarse la ortesis",
    ],
    correct: 2,
    explanation:
      "La exploración física a las 6 semanas es esencial: si existe movilidad franca del foco en ese momento, se recomienda intervención quirúrgica, ya que más del 90% de estos casos no llegarán a consolidar con tratamiento conservador.",
  },
  {
    id: 106,
    block: "ms",
    code: "Pseudoartrosis atrófica tercio superior",
    image: null,
    prompt:
      "En una pseudoartrosis atrófica de tercio superior de diáfisis humeral, tras la extirpación del foco y la osteosíntesis con placa LCP, ¿qué medida adicional resulta más adecuada?",
    options: [
      "Sustituir la placa por un clavo intramedular fresado en el mismo tiempo quirúrgico",
      "Añadir injerto óseo autólogo en el foco",
      "Asociar campos electromagnéticos pulsátiles como tratamiento principal",
      "Aceptar acortamientos superiores a 5 cm para facilitar el contacto óseo",
    ],
    correct: 1,
    explanation:
      "En las pseudoartrosis de tipo atrófico, el tratamiento de elección combina la extirpación del foco, la osteosíntesis con placa LCP y la aportación de injerto óseo autólogo (o sustitutivos osteoinductores tipo BMP), aceptando acortamientos menores de 3 cm para lograr contacto óseo.",
  },
  {
    id: 107,
    block: "ms",
    code: "Estabilidad en valgo tras resección radial",
    image: null,
    prompt:
      "Paciente de 34 años sufre una fractura conminuta de cabeza radial no reconstruible. Durante la cirugía se comprueba que el ligamento colateral cubital (LCC) está íntegro, por lo que se decide resecar la cabeza radial sin sustituirla por prótesis. ¿Qué cabe esperar respecto a la estabilidad en valgo del codo?",
    options: [
      "Debe reconstruirse el LCC de rutina en toda resección de cabeza radial para evitar inestabilidad",
      "Con el LCC íntegro, la cabeza radial actúa como estabilizador secundario del valgo, por lo que no cabe esperar una inestabilidad relevante",
      "La resección aislada de la cabeza radial provoca inestabilidad en valgo con independencia del estado del LCC",
      "La estabilidad en valgo depende sobre todo del ligamento anular, por lo que la resección radial es irrelevante",
    ],
    correct: 1,
    explanation:
      "La cabeza radial es un estabilizador secundario del estrés en valgo cuando el LCC está íntegro; en ese contexto, su resección no suele causar inestabilidad en valgo. Si existiera lesión del LCC, la cabeza radial pasaría a actuar como estabilizador primario y su resección sí se acompañaría de inestabilidad franca.",
  },
  {
    id: 108,
    block: "ms",
    code: "Estabilidad en varo tras resección radial",
    image: null,
    prompt:
      "Varón de 29 años, tratado meses atrás mediante resección aislada de cabeza radial por fractura conminuta, refiere sensación de inestabilidad leve en varo durante actividades de carga axial del brazo. ¿Qué estructura es la principal responsable de la estabilidad en varo del codo y cuya insuficiencia relativa podría explicar este cuadro?",
    options: [
      "El ligamento anular del radio",
      "La banda anterior del ligamento colateral cubital",
      "La congruencia de la articulación cúbito-humeral, junto con las fibras del ligamento colateral cubital lateral",
      "La cápsula anterior del codo",
    ],
    correct: 2,
    explanation:
      "La estabilidad en varo depende sobre todo de la congruencia de la articulación cúbito-humeral (coronoides y olécranon), junto con las fibras del ligamento colateral cubital lateral (componente del LCL insertado en la cresta supinadora del cúbito), que son las más importantes para la restricción de la inestabilidad en varo.",
  },
  {
    id: 109,
    block: "ms",
    code: "Luxación congénita cabeza radial",
    image: null,
    prompt:
      "Niño de 8 años acude tras un traumatismo leve de codo. La exploración muestra una discreta prominencia posterolateral con mínimo déficit de extensión, sin otra limitación funcional relevante. La radiografía muestra una cabeza radial con forma de cúpula (convexa) y un cóndilo humeral hipoplásico. ¿Cuál es el diagnóstico más probable y la actitud más adecuada?",
    options: [
      "Fractura-luxación de Monteggia aguda; requiere reducción urgente y fijación del cúbito",
      "Fractura de cuello radial reciente; requiere inmovilización con yeso 4 semanas",
      "Luxación congénita de cabeza radial; dado que es prácticamente asintomática, se recomienda una actitud expectante sin tratamiento activo",
      "Sinostosis radiocubital congénita; requiere osteotomía desrotadora percutánea",
    ],
    correct: 2,
    explanation:
      "La deformidad de la cabeza radial (forma de cúpula) junto con la agenesia o hipoplasia del cóndilo humeral son signos radiográficos fiables de que la luxación de cabeza radial es congénita. Al ser prácticamente asintomática, si la clínica es mínima no se recomienda ningún tratamiento activo.",
  },
  {
    id: 110,
    block: "ms",
    code: "Sinostosis radiocubital congénita",
    image: null,
    prompt:
      "Adolescente con sinostosis radiocubital congénita bilateral presenta el antebrazo fijo en hiperpronación marcada, con gran dificultad para tareas que requieren supinación (comer con cuchara, recibir objetos). ¿Cuál es la actitud terapéutica más adecuada?",
    options: [
      "Separación quirúrgica de cúbito y radio para restaurar la pronosupinación activa",
      "Observación sin ninguna intervención, dada la naturaleza congénita del cuadro",
      "Fusión radiocarpiana bilateral precoz",
      "Osteotomía desrotadora con fijación percutánea con agujas para mejorar la posición funcional del antebrazo",
    ],
    correct: 3,
    explanation:
      "La separación quirúrgica de la sinostosis radiocubital congénita no se recomienda por sus malos resultados. Cuando la posición es muy invalidante, la opción más adecuada es la osteotomía desrotadora con fijación percutánea, dejando el antebrazo en una posición más funcional.",
  },
  {
    id: 111,
    block: "ms",
    code: "Etiopatogenia deformidad de Madelung",
    image: null,
    prompt:
      "Niña de 10 años presenta desviación cubital progresiva de ambas muñecas con prominencia de la cabeza cubital y limitación de la extensión dorsal. En la exploración radiológica se objetiva desviación de la epífisis radial distal. ¿Qué estructura anatómica se ha implicado clásicamente en la etiopatogenia de esta entidad?",
    options: [
      "El ligamento de Vickers, banda palmar anómala que fija el semilunar al radio distal",
      "El ligamento colateral cubital del codo",
      "El retináculo extensor de la muñeca",
      "El ligamento escafolunar",
    ],
    correct: 0,
    explanation:
      "Vickers y Nielsen describieron un ligamento palmar anómalo (ligamento de Vickers) que fija el semilunar al radio distal y que se ha implicado en la etiopatogenia de la deformidad de Madelung, contribuyendo a la desviación radial progresiva.",
  },
  {
    id: 112,
    block: "ms",
    code: "Tratamiento quirúrgico Madelung en niña",
    image: null,
    prompt:
      "Niña de 9 años con deformidad de Madelung típica progresiva, con desviación cubital marcada de la muñeca. Se decide tratamiento quirúrgico dada su edad. ¿Cuál es el objetivo principal de la cirugía en este grupo de edad?",
    options: [
      "Acortamiento del cúbito mediante técnica de Darrach como primer gesto quirúrgico",
      "Fusión radiocarpiana precoz para prevenir la progresión",
      "Corregir el crecimiento anómalo de la fisis radial distal, mediante técnicas como la interposición de grasa (Langenskiöld) o la resección del ligamento de Vickers con epifisiodesis temporal",
      "Osteotomía en cuña cerrada del radio como único gesto quirúrgico",
    ],
    correct: 2,
    explanation:
      "En niños menores de 10-12 años, el objetivo quirúrgico es corregir el crecimiento anómalo de la fisis, mediante la técnica de Langenskiöld (interposición de una bola de grasa) o la resección del ligamento de Vickers con epifisiodesis temporal con grapas en la zona no afecta del radio.",
  },
  {
    id: 113,
    block: "ms",
    code: "Anatomía patológica epicondilitis",
    image: null,
    prompt:
      "Paciente de 42 años, trabajador manual, presenta dolor en epicóndilo lateral que aumenta al extender la muñeca contra resistencia con el codo en extensión (signo de Cozen positivo). Si se realizara un estudio histológico del tendón afectado, ¿qué hallazgo sería característico de esta entidad?",
    options: [
      "Infiltrado inflamatorio agudo con predominio de neutrófilos",
      "Depósitos de cristales de pirofosfato cálcico",
      "Granulomas caseificantes con necrosis central",
      "Hiperplasia angiofibroblástica del origen de los tendones extensores de muñeca y dedos",
    ],
    correct: 3,
    explanation:
      "La epicondilitis lateral se caracteriza histológicamente por hiperplasia angiofibroblástica del origen de los tendones extensores (término acuñado por Nirschl), con infiltración de mucopolisacáridos, formación ósea y proliferación vascular, sin un componente inflamatorio agudo clásico.",
  },
  {
    id: 114,
    block: "ms",
    code: "Epicondilitis y PRP",
    image: null,
    prompt:
      "Paciente con epicondilitis lateral de 4 meses de evolución pregunta por la infiltración de plasma rico en plaquetas (PRP) como tratamiento. Según la evidencia disponible, ¿cuál es la respuesta más ajustada?",
    options: [
      "El PRP ha demostrado ser claramente superior a la modificación de actividad en todos los estudios disponibles",
      "Una revisión Cochrane no ha encontrado evidencia de beneficio del PRP frente a otras opciones, existiendo además riesgo de infección y un coste añadido",
      "El PRP es el tratamiento de elección en la fase aguda de la epicondilitis, previo a cualquier otra medida",
      "El PRP sustituye a la cirugía en los casos que no responden a 6-12 meses de tratamiento conservador",
    ],
    correct: 1,
    explanation:
      "Una revisión Cochrane de 2021 no apoya el uso de PRP o sangre autóloga en la epicondilitis, dado que no existe evidencia de beneficio claro, además de suponer un potencial riesgo de infección y un gasto añadido.",
  },
  {
    id: 115,
    block: "ms",
    code: "Epitrocleitis y neuritis cubital",
    image: null,
    prompt:
      "Paciente con epitrocleitis (codo del golfista) y neuritis cubital concomitante no tratada no mejora tras varios meses de tratamiento conservador dirigido de forma aislada a la epitrocleitis. ¿Cuál es la explicación más probable de este fracaso terapéutico?",
    options: [
      "El diagnóstico inicial era incorrecto y debe replantearse una artrosis de codo",
      "La epitrocleitis, a diferencia de la epicondilitis, no responde de forma habitual al tratamiento conservador",
      "Es necesario asociar toxina botulínica de entrada en todo caso de epitrocleitis",
      "La existencia de patología concomitante como la neuritis cubital, si no se trata, empeora el pronóstico del tratamiento de la epitrocleitis",
    ],
    correct: 3,
    explanation:
      "En la epitrocleitis se encuentra patología concomitante hasta en el 84% de los casos (síndrome del túnel carpiano, tendinitis del manguito rotador o neuritis cubital). Se ha comprobado que, si estas patologías asociadas no se tratan, el tratamiento de la epitrocleitis fracasará.",
  },
  {
    id: 116,
    block: "ms",
    code: "Rotura bíceps distal — tratamiento",
    image: null,
    prompt:
      "Varón de 45 años, culturista, sufre dolor agudo y un chasquido audible en la cara anterior del codo tras un levantamiento de peso, con equimosis, tumoración proximal y debilidad marcada a la supinación. El Hook test es positivo. Dado su perfil (paciente joven y activo), ¿cuál es la actitud más adecuada?",
    options: [
      "Tratamiento conservador con inmovilización, dado el buen pronóstico funcional esperado en este perfil de paciente",
      "Reparación quirúrgica precoz, idealmente antes de 7-10 días desde la lesión",
      "Cirugía diferida a las 8 semanas para permitir que ceda la inflamación local",
      "Tenodesis directa al músculo braquial anterior, sin intentar la reinserción anatómica del tendón",
    ],
    correct: 1,
    explanation:
      "En pacientes activos con rotura completa del tendón distal del bíceps, se recomienda la reparación quirúrgica precoz (antes de 7-10 días), reinsertando el tendón de forma anatómica en la tuberosidad bicipital; a mayor demora, mayor tasa de complicaciones y peor resultado funcional.",
  },
  {
    id: 117,
    block: "ms",
    code: "Técnica de doble incisión — complicaciones",
    image: null,
    prompt:
      "Cirujano opta por la técnica clásica de doble incisión (Boyd y Anderson) para la reparación de una rotura del tendón distal del bíceps, en lugar del miniabordaje anterior. ¿Qué complicación es más característica de esta técnica en comparación con el abordaje anterior único?",
    options: [
      "Lesión del nervio cutáneo lateral del antebrazo",
      "Mayor pérdida de fuerza en supinación por reparación no anatómica",
      "Lesión del nervio mediano",
      "Sinostosis radiocubital y osificación heterotópica",
    ],
    correct: 3,
    explanation:
      "La técnica de doble incisión (Boyd y Anderson) presenta menos riesgo de lesión del nervio cutáneo lateral del antebrazo que el miniabordaje anterior, pero conlleva mayor riesgo de sinostosis radiocubital y osificación heterotópica, por lo que se recomienda profilaxis con indometacina.",
  },
  {
    id: 118,
    block: "ms",
    code: "OCD capitellum vs enfermedad de Panner",
    image: null,
    prompt:
      "Gimnasta de 13 años con esqueleto inmaduro presenta dolor de codo de repetición en actividades de carga en valgo, con tumefacción, crepitación y bloqueos articulares ocasionales. ¿Cuál es el diagnóstico más probable y con qué entidad debe diferenciarse en niños de menor edad?",
    options: [
      "Enfermedad de Panner, que a diferencia de este caso es típica de niños mayores de 10 años",
      "Osteocondritis disecante del capitellum humeral, que debe diferenciarse de la enfermedad de Panner (osteocondrosis del capitellum típica en niños menores de 10 años)",
      "Epicondilitis lateral típica del adulto deportista",
      "Artrosis primaria de codo de inicio precoz",
    ],
    correct: 1,
    explanation:
      "La osteocondritis disecante del capitellum es más frecuente en deportistas con esqueleto inmaduro que realizan actividades de repetición en valgo (gimnastas, lanzadores). Debe diferenciarse de la enfermedad de Panner, una osteocondrosis del capitellum propia de niños menores de 10 años.",
  },
  {
    id: 119,
    block: "ms",
    code: "OCD capitellum — tratamiento por grado",
    image: null,
    prompt:
      "Adolescente con osteocondritis disecante del capitellum humeral es intervenido mediante artroscopia, objetivándose un fragmento osteocondral suelto pero no desplazado (grado IV). ¿Cuál es el tratamiento más adecuado según la clasificación artroscópica de esta entidad?",
    options: [
      "Tratamiento conservador con modificación de la actividad deportiva, dado que se trata de una lesión estable",
      "Retirada del fragmento con perforaciones, valorando mosaicoplastia si el defecto es amplio",
      "Artrodesis del codo como tratamiento definitivo",
      "Prótesis radiocapitelar de entrada, sin intento de preservación articular",
    ],
    correct: 1,
    explanation:
      "El tratamiento conservador se reserva para las lesiones estables (grados I-II, cartílago blando o fisurado). Las lesiones inestables (grados III-V, incluido el fragmento suelto no desplazado grado IV) se tratan retirando el fragmento y realizando perforaciones, valorando mosaicoplastia si el defecto es grande.",
  },
  {
    id: 120,
    block: "ms",
    code: "Artrosis de codo vs artritis reumatoide",
    image: null,
    prompt:
      "Varón de 52 años, trabajador manual, presenta dolor mecánico de codo en los últimos grados de flexoextensión, con chasquidos y bloqueos ocasionales. La radiografía muestra osteofitos en coronoides, cabeza radial y olécranon, con preservación relativa del espacio articular cubitohumeral. ¿Qué diagnóstico es más probable y qué hallazgo ayuda a diferenciarlo de una artropatía inflamatoria?",
    options: [
      "Artritis reumatoide; en ella se afecta de forma precoz sobre todo la articulación radiocapitelar",
      "Sinovitis vellonodular pigmentada; cursa característicamente con un derrame articular masivo desde el inicio",
      "Artrosis primaria de codo; a diferencia de la artritis reumatoide, en fases iniciales predomina la afectación radiocapitelar con relativa preservación de la cubitohumeral",
      "Osteocondromatosis sinovial; se caracteriza por múltiples cuerpos libres cartilaginosos de tamaño similar entre sí",
    ],
    correct: 2,
    explanation:
      "En la artrosis de codo, la articulación radiocapitelar es la que preferentemente se afecta, con relativa preservación de la cubitohumeral, especialmente al inicio de la enfermedad. Esto contrasta con la artritis reumatoide, en la que se ve afectada precozmente la articulación cubitohumeral propiamente dicha.",
  },
  {
    id: 121,
    block: "ms",
    code: "Artritis reumatoide de codo — Larsen 4",
    image: null,
    prompt:
      "Paciente con artritis reumatoide de larga evolución presenta dolor de codo refractario al tratamiento médico. La radiografía muestra erosiones progresivas que penetran en la zona subcondral, compatible con un estadio 4 de la clasificación de Larsen. ¿Cuál es la opción quirúrgica más adecuada en este estadio?",
    options: [
      "Sinovectomía aislada con resección de la cabeza radial",
      "Desbridamiento artroscópico simple sin ningún otro gesto añadido",
      "Artrodesis de codo como primera opción quirúrgica",
      "Artroplastia total de codo",
    ],
    correct: 3,
    explanation:
      "En pacientes con artritis reumatoide en estadios de Larsen 1-2, en los que no se controla el dolor con tratamiento médico, se recomienda la sinovectomía (± resección de cabeza radial). En estadios de Larsen 3 a 5, como el descrito, debe considerarse la artroplastia total de codo.",
  },
  {
    id: 122,
    block: "ms",
    code: "Rigidez de codo — pérdida de movilidad activa",
    image: null,
    prompt:
      "Paciente presenta pérdida de la extensión activa del codo, con la extensión pasiva conservada en la exploración. ¿Qué proceso debe sospecharse preferentemente ante este patrón?",
    options: [
      "Un proceso degenerativo intraarticular, como la artrosis",
      "Una lesión neurológica o tendinosa",
      "Una anquilosis ósea intraarticular franca",
      "Una osificación heterotópica ya madura",
    ],
    correct: 1,
    explanation:
      "Cuando se produce una pérdida de movilidad activa con conservación de la movilidad pasiva, debe sospecharse una lesión neurológica o tendinosa. Si, por el contrario, se pierde también la movilidad pasiva, debe sospecharse una lesión traumática o un proceso degenerativo intraarticular como la artrosis.",
  },
  {
    id: 123,
    block: "ms",
    code: "Rotura del tríceps — fleck sign",
    image: null,
    prompt:
      "Culturista con antecedente de uso de anabolizantes sufre una caída con la mano en extensión. Presenta dolor, tumefacción y una palpación en 'hachazo' en la zona posterior del codo, con debilidad parcial para la extensión activa contra resistencia. En la radiografía lateral se observa una pequeña cascarilla ósea separada de la punta del olécranon. ¿Qué significado tiene este hallazgo radiográfico?",
    options: [
      "Es un hallazgo casual sin relevancia clínica en este contexto",
      "Sugiere una fractura de estrés crónica del olécranon no relacionada con el episodio agudo",
      "El 'fleck sign' es patognomónico de una avulsión del tendón del tríceps",
      "Corresponde a un osteofito degenerativo típico de la artrosis de codo",
    ],
    correct: 2,
    explanation:
      "El 'fleck sign' (cascarilla ósea separada de la punta del olécranon en la radiografía lateral) es patognomónico de una avulsión del tendón del tríceps. La rotura del tríceps es poco frecuente y se asocia a culturismo, uso de anabolizantes, infiltraciones previas de corticoides y determinadas enfermedades óseas metabólicas.",
  },
  {
    id: 124,
    block: "ms",
    code: "Elección de implante en ATC",
    image: null,
    prompt:
      "Paciente anciana con artrosis postraumática de codo, mal stock óseo y ligamentos colaterales insuficientes, va a ser intervenida mediante artroplastia total de codo. ¿Qué tipo de implante resulta más adecuado dado este perfil de inestabilidad y déficit óseo?",
    options: [
      "Implante no abisagrado (unlinked), dado que ofrece mejores resultados en codos inestables",
      "Implante abisagrado (linked/constreñido), que permite cierta laxitud en varo-valgo y no depende tanto de la integridad de los tejidos blandos",
      "Prótesis radiocapitelar aislada, preservando la articulación cubitohumeral nativa",
      "Hemiartroplastia de codo, como alternativa de primera línea en este contexto",
    ],
    correct: 1,
    explanation:
      "Los implantes no abisagrados dependen de la integridad de los tejidos blandos y del buen stock óseo, por lo que solo deberían usarse en codos estables. En pacientes con mal stock óseo o insuficiencia ligamentosa, el implante abisagrado (constreñido, tipo 'loose/sloppy hinge') es la opción más adecuada, siendo además el más utilizado actualmente.",
  },
  {
    id: 125,
    block: "ms",
    code: "Codo - Estabilidad tras resección de cabeza radial",
    image: null,
    prompt:
      "Un paciente presenta una fractura conminuta e irreconstruible de la cabeza del radio, sin lesión asociada del ligamento colateral medial. Respecto a la resección de la cabeza radial en este contexto, ¿qué es correcto afirmar?",
    options: [
      "Puede realizarse sin alterar de forma relevante la estabilidad del codo, porque el ligamento colateral medial está intacto",
      "Está contraindicada de forma sistemática por el riesgo de inestabilidad en valgo",
      "Obliga a colocar una ortesis articulada durante al menos 6 meses",
      "Debe acompañarse de sustitución protésica inmediata en el mismo acto quirúrgico",
    ],
    correct: 0,
    explanation:
      "La resección de la cabeza radial puede realizarse sin alterar la estabilidad normal del codo si el ligamento colateral medial está intacto, ya que este ligamento es el principal estabilizador frente al valgo.",
  },
  {
    id: 126,
    block: "ms",
    code: "Codo - Mecanismo de luxación posterior",
    image: null,
    prompt:
      "Un joven de 22 años sufre una caída sobre la mano con el codo en valgo, el antebrazo en supinación y rotación externa del cúbito, con carga axial. En urgencias se objetiva una luxación posterior de codo sin fracturas asociadas. ¿Qué mecanismo corresponde a este patrón?",
    options: [
      "El mecanismo por pronación, que suele asociar fracturas de coronoides y cabeza radial",
      "El mecanismo por supinación, descrito clásicamente y el más frecuente",
      "Un tercer mecanismo en varo, propio de las caídas hacia atrás",
      "Una luxación divergente por pronación forzada del antebrazo",
    ],
    correct: 1,
    explanation:
      "La supinación del antebrazo con rotación externa del cúbito y carga axial provoca primero una lesión del ligamento lateral con luxación posterior, habitualmente sin fracturas asociadas; es el mecanismo clásico y el más frecuente.",
  },
  {
    id: 127,
    block: "ms",
    code: "Codo - Algoritmo de la tríada terrible",
    image: null,
    prompt:
      "En el manejo quirúrgico de una tríada terrible de codo con fractura de cabeza radial reparable y fractura de coronoides fijable por vía lateral, tras reparar la cabeza radial, la coronoides y el ligamento colateral lateral, se comprueba que el codo sigue siendo inestable. ¿Cuál es el siguiente paso del algoritmo?",
    options: [
      "Colocar directamente un fijador externo articulado",
      "Reparar el ligamento colateral medial",
      "Realizar una osteotomía de la cabeza radial",
      "Sustituir la coronoides por un injerto óseo estructural",
    ],
    correct: 1,
    explanation:
      "Según el algoritmo de manejo de la tríada terrible, si tras fijar la coronoides, la cabeza radial y reparar el ligamento colateral lateral el codo continúa inestable, el siguiente paso es reparar el ligamento colateral medial.",
  },
  {
    id: 128,
    block: "ms",
    code: "Codo - Inestabilidad posterolateral rotatoria",
    image: null,
    prompt:
      "Una mujer de 45 años, intervenida hace un año mediante abordaje de Kocher para una epicondilitis, refiere desde entonces chasquidos y sensación de fallo del codo al incorporarse de una silla, con dolor en el lado radial al extender el codo con el antebrazo en supinación. ¿Qué maniobra exploratoria es más útil para confirmar la sospecha diagnóstica?",
    options: [
      "La maniobra de ordeñamiento",
      "La maniobra de pivot-shift del codo",
      "La prueba de aprensión con el codo en flexión máxima",
      "La compresión axial con el antebrazo en pronación",
    ],
    correct: 1,
    explanation:
      "El cuadro sugiere una inestabilidad posterolateral rotatoria, probablemente iatrogénica tras el abordaje de Kocher. La maniobra de pivot-shift, aplicando supinación y valgo mientras se extiende el codo, es la exploración característica de este patrón.",
  },
  {
    id: 129,
    block: "ms",
    code: "Codo - Inestabilidad medial del lanzador",
    image: null,
    prompt:
      "Un lanzador de balonmano de 28 años presenta dolor medial de codo en la fase de aceleración del lanzamiento, con parestesias cubitales intermitentes. Tras 4 meses de reposo, fisioterapia y programa de rehabilitación del lanzamiento sin mejoría, ¿cuál es la opción terapéutica más adecuada?",
    options: [
      "Prolongar el tratamiento conservador otros 6 meses antes de valorar cirugía",
      "Reconstrucción del ligamento colateral medial con injerto tendinoso del palmar menor",
      "Reparación aislada del ligamento colateral cubital lateral",
      "Neurólisis simple del nervio cubital sin actuar sobre el ligamento",
    ],
    correct: 1,
    explanation:
      "El tratamiento quirúrgico está indicado cuando persiste una inestabilidad medial sintomática tras 3 a 6 meses de tratamiento conservador. La técnica más aceptada es la descrita por Jobe, con injerto tendinoso del palmar menor.",
  },
  {
    id: 130,
    block: "ms",
    code: "Codo - Inestabilidad posteromedial rotatoria",
    image: null,
    prompt:
      "Un paciente sufre una caída hacia atrás apoyando la mano por detrás del cuerpo, con el codo en varo. Se objetiva una fractura de la faceta anteromedial de la coronoides que afecta a más del 50% de la misma, junto con lesión del complejo ligamentoso lateral. ¿A qué patrón corresponde este cuadro?",
    options: [
      "Inestabilidad posterolateral rotatoria",
      "Inestabilidad medial por sobrecarga en valgo",
      "Inestabilidad posteromedial rotatoria",
      "Fractura-luxación transolecraniana tipo Monteggia",
    ],
    correct: 2,
    explanation:
      "La inestabilidad posteromedial rotatoria es secundaria a una luxación del codo en varo con lesión del ligamento colateral lateral y de la apófisis coronoides, sobre todo cuando afecta a más del 50% de esta, y suele producirse tras una caída hacia atrás con la mano por detrás del cuerpo.",
  },
  {
    id: 131,
    block: "ms",
    code: "Codo - Luxación pediátrica y fractura asociada",
    image: null,
    prompt:
      "Un niño de 11 años sufre una luxación posterior de codo tras una caída con el brazo en abducción y extensión forzadas. ¿Cuál es la fractura asociada más frecuente en este contexto?",
    options: [
      "Olécranon",
      "Epitróclea",
      "Apófisis coronoides",
      "Cabeza del radio",
    ],
    correct: 1,
    explanation:
      "En niños, las luxaciones de codo se asocian generalmente a fracturas, siendo la de epitróclea la más frecuente, seguida de la cabeza del radio, la apófisis coronoides y el olécranon.",
  },
  {
    id: 132,
    block: "ms",
    code: "Codo - Pronación dolorosa recidivante",
    image: null,
    prompt:
      "Una niña de 3 años acude a urgencias tras un tirón brusco del brazo, con el codo en extensión y pronación. Descartada la fractura, se intenta la maniobra de hiperpronación sin éxito en un primer intento. ¿Cuál es la actitud más adecuada en este momento?",
    options: [
      "Indicar reducción abierta de forma inmediata",
      "Solicitar una resonancia magnética antes de continuar",
      "Colocar una férula en flexión y algo de supinación, esperar y repetir la maniobra si persisten los síntomas",
      "Descartar definitivamente el diagnóstico de pronación dolorosa",
    ],
    correct: 2,
    explanation:
      "Si la sintomatología no desaparece tras el primer intento de reducción, se puede colocar una férula en flexión y algo de supinación y esperar un par de días; con esto habitualmente se reduce sola o baja la inflamación y se puede repetir la maniobra con éxito.",
  },
  {
    id: 133,
    block: "ms",
    code: "Codo - Fractura de olécranon Mayo tipo 2",
    image: null,
    prompt:
      "Un paciente de 55 años presenta una fractura de olécranon desplazada más de 3 mm, con articulación estable y sin extensión activa del codo. Según la clasificación de Mayo, este patrón corresponde a un tipo 2. ¿Cuál es su tratamiento habitual?",
    options: [
      "Inmovilización con cabestrillo y movilización progresiva",
      "Reducción abierta y osteosíntesis con agujas y cerclaje, o placa y tornillos",
      "Escisión sistemática del fragmento proximal con avance del tríceps",
      "Fijador externo articulado de entrada",
    ],
    correct: 1,
    explanation:
      "Las fracturas tipo 2 de Mayo (desplazadas, articulación estable, sin extensión activa) se tratan con reducción abierta y osteosíntesis, con agujas y cerclaje o con placa y tornillos según las características de la fractura.",
  },
  {
    id: 134,
    block: "ms",
    code: "Codo - Fractura de coronoides de O'Driscoll",
    image: null,
    prompt:
      "Tras una caída en varo con carga axial y lesión del ligamento colateral lateral, se objetiva una fractura de la apófisis coronoides que afecta al borde anteromedial, con trazo de fractura convexo. ¿Cómo denomina la clasificación de O'Driscoll a este patrón?",
    options: [
      "Fractura transversa",
      "Fractura de la faceta anteromedial",
      "Fractura basilar transolecraniana",
      "Fractura de la punta de la coronoides tipo I de Regan y Morrey",
    ],
    correct: 1,
    explanation:
      "La clasificación de O'Driscoll reconoce las fracturas de la faceta anteromedial, causadas por una fuerza posteromedial rotatoria en varo, con un trazo de fractura característicamente convexo.",
  },
  {
    id: 135,
    block: "ms",
    code: "Codo - Lesión de Essex-Lopresti",
    image: null,
    prompt:
      "Un paciente sufre una fractura de la cabeza del radio tras una caída, y además refiere dolor en la muñeca del mismo lado, con inestabilidad de la articulación radiocubital distal en la exploración. Ante la sospecha de una lesión de Essex-Lopresti, ¿cuál es el aspecto más importante del tratamiento de la cabeza radial?",
    options: [
      "Resecarla si existe conminución, para facilitar la rehabilitación",
      "Preservarla mediante osteosíntesis o prótesis, evitando su resección",
      "Tratarla de forma conservadora con cabestrillo, independientemente del desplazamiento",
      "Diferir cualquier actuación sobre la cabeza radial hasta resolver la muñeca",
    ],
    correct: 1,
    explanation:
      "En la lesión de Essex-Lopresti (fractura de cabeza radial con rotura de la membrana interósea y luxación radiocubital distal) es fundamental preservar la cabeza radial mediante osteosíntesis, o prótesis si no es sintetizable, para evitar la migración proximal del radio.",
  },
  {
    id: 136,
    block: "ms",
    code: "Codo - Fractura de cuello radial infantil (Judet)",
    image: null,
    prompt:
      "Un niño de 9 años presenta una fractura del cuello radial con traslocación del 70% de la diáfisis radial y angulación de 45º. Según la clasificación de Judet, este patrón corresponde a un tipo III. ¿Cuál es el manejo inicial más adecuado?",
    options: [
      "Tratamiento conservador con inmovilización según tolerancia al dolor",
      "Reducción cerrada, valorando técnicas percutáneas si la pronosupinación queda limitada",
      "Reducción abierta con fijación con agujas de entrada",
      "Prótesis de cabeza radial",
    ],
    correct: 1,
    explanation:
      "Las fracturas tipo III de Judet (traslocación 50-100%, angulación 30-60º) se tratan inicialmente con reducción cerrada; si esta fracasa o la pronosupinación queda por debajo de 60º tras la reducción, se recurre a técnicas percutáneas.",
  },
  {
    id: 137,
    block: "ms",
    code: "Codo - Clasificación de Hotchkiss",
    image: null,
    prompt:
      "Un paciente de 30 años presenta una fractura de cabeza radial con desplazamiento de 4 mm. En la exploración bajo anestesia articular se objetiva bloqueo mecánico a la pronosupinación, sin gran conminución del fragmento. Según la clasificación de Hotchkiss, ¿cuál es el manejo más adecuado?",
    options: [
      "Movilización precoz sin inmovilización, por tratarse de un tipo I",
      "Controles radiológicos semanales sin cirugía",
      "Reducción abierta y osteosíntesis",
      "Resección de la cabeza radial sin valorar prótesis",
    ],
    correct: 2,
    explanation:
      "En la clasificación de Hotchkiss, las fracturas tipo II con bloqueo mecánico o inestabilidad asociada, sin gran conminución, se tratan en pacientes jóvenes mediante reducción abierta y osteosíntesis.",
  },
  {
    id: 138,
    block: "ms",
    code: "Codo - Factores de riesgo de osificación heterotópica",
    image: null,
    prompt:
      "Un paciente politraumatizado con fractura-luxación compleja de codo y traumatismo torácico asociado presenta, tres meses después de la cirugía, una pérdida progresiva de movilidad en flexoextensión. Dados sus factores de riesgo, ¿qué complicación hay que sospechar en primer lugar?",
    options: [
      "Osteonecrosis de la cabeza radial",
      "Osificación heterotópica",
      "Pseudoartrosis de coronoides",
      "Lesión tardía del nervio interóseo posterior",
    ],
    correct: 1,
    explanation:
      "La osificación heterotópica es más frecuente en casos de fracturas-luxaciones complejas, politraumatismo con trauma torácico asociado y demora quirúrgica, y se manifiesta como pérdida progresiva de la movilidad tras la cirugía.",
  },
  {
    id: 139,
    block: "ms",
    code: "Codo - Protección del LCL en el abordaje de Kocher",
    image: null,
    prompt:
      "Durante un abordaje de Kocher para el tratamiento de una fractura de cabeza radial, ¿qué estructura hay que proteger de forma prioritaria para evitar generar una inestabilidad iatrogénica?",
    options: [
      "El ligamento colateral medial",
      "El nervio interóseo posterior",
      "El ligamento colateral lateral",
      "El nervio cubital",
    ],
    correct: 2,
    explanation:
      "El intervalo de Kocher discurre entre el ancóneo y el extensor cubital del carpo; hay que proteger el ligamento colateral lateral, evitando despegar el ancóneo, para no generar una inestabilidad iatrogénica.",
  },
  {
    id: 140,
    block: "ms",
    code: "Codo - Prótesis de cabeza radial, aspecto técnico",
    image: null,
    prompt:
      "En un paciente joven con fractura conminuta de cabeza radial en más de 3 fragmentos, asociada a lesiones ligamentosas, se decide colocar una prótesis de cabeza radial. ¿Qué aspecto técnico es importante para evitar complicaciones?",
    options: [
      "Sobredimensionar ligeramente el implante para aumentar la estabilidad en valgo",
      "Dejar el implante 1-2 mm distal a la punta de la apófisis coronoides, evitando un tamaño excesivo",
      "Colocar el implante sin comprobar el rango de pronosupinación",
      "Evitar cualquier reparación ligamentosa asociada para no interferir con la prótesis",
    ],
    correct: 1,
    explanation:
      "Al colocar una prótesis de cabeza radial hay que evitar sobredimensionar el implante; debe quedar aproximadamente 1-2 mm distal a la punta de la apófisis coronoides para no generar sobrepresión articular.",
  },
  {
    id: 141,
    block: "ms",
    code: "Codo - Fractura-luxación transolecraniana",
    image: null,
    prompt:
      "En una fractura-luxación de codo se comprueba que la articulación radiocubital proximal no está afectada, con los ligamentos colaterales anclados al fragmento distal del cúbito. Esta lesión, a menudo confundida con una fractura-luxación de Monteggia, ¿a qué corresponde?",
    options: [
      "Una tríada terrible de codo",
      "Una fractura-luxación transolecraniana",
      "Una luxación divergente anteroposterior",
      "Una inestabilidad posterolateral rotatoria crónica",
    ],
    correct: 1,
    explanation:
      "La fractura-luxación transolecraniana se confunde a menudo con una Monteggia Bado I, pero en realidad no afecta a la articulación radiocubital proximal; tiene mayor componente óseo que ligamentoso y requiere lograr una adecuada estabilidad ósea del olécranon.",
  },
  {
    id: 142,
    block: "ms",
    code: "Codo - Cerclaje vs placa preconformada en olécranon",
    image: null,
    prompt:
      "Comparando el cerclaje con agujas y alambre frente a la placa preconformada en el tratamiento de fracturas transversas de olécranon, ¿qué indica la evidencia disponible?",
    options: [
      "El cerclaje presenta menos complicaciones que la placa en la mayoría de las series",
      "La placa presenta una tasa de infección claramente inferior al cerclaje",
      "El cerclaje presenta más complicaciones, como migración de agujas, aunque la tasa de infección es algo mayor con placas",
      "Ambas técnicas son equivalentes en todos los aspectos, incluida la necesidad de retirada de material",
    ],
    correct: 2,
    explanation:
      "Las complicaciones son mayores con el cerclaje en la mayoría de las series (migración de agujas, pérdida de reducción), aunque la tasa de infección es algo mayor con placas; el coste-eficiencia favorece al cerclaje pese a la mayor tasa de retirada de material.",
  },
  {
    id: 143,
    block: "ms",
    code: "Codo - Fractura de olécranon en el anciano",
    image: null,
    prompt:
      "Una paciente de 78 años, con buen estado funcional previo, presenta una fractura de olécranon tipo 2B de Mayo (desplazada, conminuta). Según la evidencia reciente, ¿qué opción suele dar mejores resultados funcionales en este grupo de edad?",
    options: [
      "Reducción abierta y osteosíntesis con placa y tornillos de entrada",
      "Tratamiento conservador con cabestrillo 1-2 semanas y movilización precoz",
      "Escisión del fragmento proximal con avance del tríceps de entrada",
      "Fijador externo articulado",
    ],
    correct: 1,
    explanation:
      "En pacientes mayores de 70 años, varios estudios recientes describen mejores resultados funcionales con tratamiento conservador (cabestrillo 1-2 semanas y movilización precoz) que con cirugía, incluso en fracturas desplazadas.",
  },
  {
    id: 144,
    block: "ms",
    code: "Codo - Causa principal de fracaso en coronoides",
    image: null,
    prompt:
      "Tras la fijación quirúrgica de una fractura de apófisis coronoides asociada a luxación de codo, un paciente evoluciona con inestabilidad crónica y rigidez. ¿Cuál es la causa más importante de fracaso en el tratamiento de estas fracturas?",
    options: [
      "Utilizar tornillos canulados en lugar de sutura transósea",
      "No identificar ni reparar las lesiones ligamentosas asociadas y la inestabilidad subyacente del codo",
      "Iniciar la movilización antes de las 3 semanas de la cirugía",
      "Emplear un abordaje medial en lugar de posterior",
    ],
    correct: 1,
    explanation:
      "La causa más importante de fracaso en el tratamiento de las fracturas de coronoides es no identificar ni reparar las lesiones asociadas y la inestabilidad subyacente del codo, ya que los ligamentos colaterales tienen un papel clave en la estabilidad.",
  },
  {
    id: 145,
    block: "ms",
    code: "Antebrazo - Ángulo PUDA",
    image: null,
    prompt:
      "Al planificar la reducción de una fractura diafisaria de cúbito, se hace referencia al ángulo PUDA. ¿Qué representa este ángulo?",
    options: [
      "La angulación dorsal de la zona proximal del cúbito, de unos 5º de media",
      "La curva pronadora del radio a nivel de la inserción del pronador redondo",
      "El ángulo de torsión del radio respecto al eje humeral",
      "La angulación palmar del tercio distal del cúbito",
    ],
    correct: 0,
    explanation:
      "El cúbito es prácticamente recto, salvo por una cierta angulación dorsal en su zona proximal conocida como ángulo PUDA (proximal ulnar dorsal angulation), de alrededor de 5º, con un rango de 0-14º.",
  },
  {
    id: 146,
    block: "ms",
    code: "Antebrazo - Mecanismo de fractura aislada de cúbito",
    image: null,
    prompt:
      "Un hombre de 35 años acude a urgencias tras recibir un golpe directo con un objeto contundente en el antebrazo mientras se protegía de una agresión. Se objetiva una fractura aislada de la diáfisis cubital. ¿Qué mecanismo lesional es característico de este patrón?",
    options: [
      "La caída desde una altura con el brazo en hiperextensión",
      "El traumatismo directo tipo bastonazo",
      "La torsión forzada del antebrazo en pronación",
      "El impacto axial con el codo en flexión",
    ],
    correct: 1,
    explanation:
      "El traumatismo directo tipo bastonazo (nightstick fracture) es el mecanismo más típico de la fractura aislada del cúbito, al recibir el antebrazo un golpe directo mientras protege la cara o el cuerpo.",
  },
  {
    id: 147,
    block: "ms",
    code: "Antebrazo - Concepto de anillo cúbito-radial",
    image: null,
    prompt:
      "Un paciente presenta una fractura aparentemente aislada de la diáfisis radial, sin otra lesión evidente en la radiografía inicial. Teniendo en cuenta la anatomía funcional del antebrazo, ¿qué debe sospecharse ante este hallazgo?",
    options: [
      "Que se trata de una fractura de baja energía sin más implicaciones",
      "Una lesión asociada de la articulación radiocubital proximal o distal",
      "Una rotura aislada del ligamento anular sin relevancia clínica",
      "Que no es necesario valorar las articulaciones radiocubitales",
    ],
    correct: 1,
    explanation:
      "El cúbito, el radio y las articulaciones radiocubitales proximal y distal forman un anillo; para que exista desplazamiento hay que romper el anillo por dos puntos, por lo que ante una fractura aislada de la diáfisis radial o cubital hay que sospechar una lesión asociada de alguna de las dos articulaciones radiocubitales.",
  },
  {
    id: 148,
    block: "ms",
    code: "Antebrazo - Signo del radio cruzado",
    image: null,
    prompt:
      "Un niño de 8 años presenta una fractura en tallo verde de la diáfisis radial. Tras la reducción, en una radiografía AP verdadera se observa que el cúbito y el radio se cruzan sin que el antebrazo esté en pronación completa. ¿Qué indica este hallazgo?",
    options: [
      "Una consolidación adecuada de la fractura",
      "Una mala rotación de los fragmentos",
      "Una lesión asociada de la membrana interósea",
      "Que la reducción es correcta y no requiere más valoración",
    ],
    correct: 1,
    explanation:
      "El 'signo del radio cruzado' es indicativo de una deformidad angular y torsional en las fracturas en tallo verde de la diáfisis radial. Si tras reducir, en una Rx AP verdadera, el cúbito y el radio se cruzan sin que el antebrazo esté en pronación completa, existe una mala rotación de los fragmentos.",
  },
  {
    id: 149,
    block: "ms",
    code: "Antebrazo - Tratamiento estándar en adultos",
    image: null,
    prompt:
      "Un paciente adulto presenta una fractura diafisaria desplazada de cúbito y radio, sin lesión extensa de partes blandas. ¿Cuál es el tratamiento estándar recomendado para este tipo de fracturas?",
    options: [
      "Reducción abierta y osteosíntesis estable con placas, con compresión interfragmentaria",
      "Enclavado intramedular con clavos triangulares de Sage",
      "Inmovilización con yeso braquial moldeado en la membrana interósea",
      "Fijación externa no transfixiante de entrada",
    ],
    correct: 0,
    explanation:
      "El tratamiento estándar de las fracturas diafisarias de antebrazo en adultos consiste en la reducción abierta y osteosíntesis estable con placas, siguiendo los principios de la compresión interfragmentaria; los dispositivos endomedulares se reservan para cuando esto no es posible o en niños.",
  },
  {
    id: 150,
    block: "ms",
    code: "Antebrazo - Vías de abordaje y sinostosis",
    image: null,
    prompt:
      "Durante la osteosíntesis con placas de una fractura diafisaria de cúbito y radio, ¿por qué se recomienda utilizar dos vías de abordaje independientes para cada hueso?",
    options: [
      "Porque reduce el tiempo quirúrgico respecto a una incisión única",
      "Porque disminuye el riesgo de sinostosis postoperatoria entre ambos huesos",
      "Porque facilita la colocación de un único implante para ambos huesos",
      "Porque evita la necesidad de proteger el nervio interóseo posterior",
    ],
    correct: 1,
    explanation:
      "Se recomiendan dos vías de acceso independientes al cúbito y al radio para evitar la sinostosis postoperatoria, ya que las placas colocadas por una incisión única tienden a aproximarse, con mayor riesgo de interferencia en la rotación del antebrazo.",
  },
  {
    id: 151,
    block: "ms",
    code: "Antebrazo - Fractura aislada de cúbito estable",
    image: null,
    prompt:
      "Una mujer de 40 años sufre un traumatismo directo en el antebrazo y presenta una fractura aislada de la diáfisis cubital, no desplazada y con menos de 10º de angulación. ¿Cuál es el tratamiento más adecuado?",
    options: [
      "Yeso braquial 10-15 días seguido de ortesis funcional durante 12 semanas",
      "Reducción abierta y osteosíntesis con placa DCP de entrada",
      "Enclavado intramedular con clavo de Sage",
      "Fijación con dos placas de tercio de tubo en configuración ortogonal",
    ],
    correct: 0,
    explanation:
      "Las fracturas aisladas de cúbito no desplazadas y con menos de 10º de angulación se tratan de forma funcional, con un yeso braquial durante 10-15 días sustituido después por una ortesis que permite la flexoextensión y pronosupinación, manteniéndose unas 12 semanas.",
  },
  {
    id: 152,
    block: "ms",
    code: "Antebrazo - Fractura de Monteggia tipo Bado I",
    image: null,
    prompt:
      "Un paciente sufre una caída sobre la mano con el codo en extensión y el antebrazo en pronación máxima. En la radiografía se observa una fractura de cúbito con angulación anterior, junto con luxación anterior de la cabeza radial. ¿A qué tipo de la clasificación de Bado corresponde este patrón?",
    options: [
      "Tipo I",
      "Tipo II",
      "Tipo III",
      "Tipo IV",
    ],
    correct: 0,
    explanation:
      "El tipo I de Bado (el más frecuente, 60% de los casos) se caracteriza por una fractura de cúbito con angulación anterior y luxación anterior de la cabeza radial, y puede producirse por trauma directo o por una caída sobre la mano con el codo en extensión y el antebrazo en pronación máxima.",
  },
  {
    id: 153,
    block: "ms",
    code: "Antebrazo - Equivalente de Monteggia tipo I",
    image: null,
    prompt:
      "Una niña de 3 años presenta una luxación anterior aislada de la cabeza del radio tras un tirón brusco del brazo, sin fractura cubital asociada. Este cuadro se considera un equivalente de Monteggia. ¿A qué tipo corresponde?",
    options: [
      "Tipo I",
      "Tipo II",
      "Tipo III",
      "Tipo IV",
    ],
    correct: 0,
    explanation:
      "La luxación anterior aislada de la cabeza del radio, como ocurre en la pronación dolorosa, se considera un equivalente del tipo I de Monteggia, aunque no exista una fractura cubital asociada.",
  },
  {
    id: 154,
    block: "ms",
    code: "Antebrazo - Tratamiento de la fractura de Monteggia en adultos",
    image: null,
    prompt:
      "Un adulto presenta una fractura-luxación de Monteggia. ¿Cuál es el planteamiento terapéutico habitual en este grupo de edad?",
    options: [
      "Osteosíntesis con placa de la diáfisis cubital junto con reducción cerrada de la cabeza radial",
      "Tratamiento ortopédico con yeso braquial en supinación completa",
      "Resección primaria de la cabeza radial junto con osteosíntesis del cúbito",
      "Fijación externa articulada como primera opción quirúrgica",
    ],
    correct: 0,
    explanation:
      "El tratamiento de la fractura de Monteggia en adultos consiste en la reducción abierta y osteosíntesis del cúbito con placa DCP, junto con la reducción cerrada de la cabeza radial; el tratamiento ortopédico se reserva sobre todo para los niños.",
  },
  {
    id: 155,
    block: "ms",
    code: "Antebrazo - Causa de no reducción de la cabeza radial en Monteggia",
    image: null,
    prompt:
      "Tras la osteosíntesis del cúbito en una fractura de Monteggia, la cabeza radial no se reduce de forma espontánea. ¿Cuál es la causa más frecuente de este hallazgo?",
    options: [
      "Una mala reducción de la fractura cubital",
      "Una rotura del complejo fibrocartílago triangular",
      "Una lesión irreparable del nervio interóseo posterior",
      "Una fractura asociada de la apófisis coronoides",
    ],
    correct: 0,
    explanation:
      "La causa más frecuente de que la cabeza radial no se reduzca tras la osteosíntesis del cúbito es una mala reducción cubital; otras causas menos frecuentes son la interposición de la cápsula anterior y del ligamento anular.",
  },
  {
    id: 156,
    block: "ms",
    code: "Antebrazo - Concepto de fractura de Galeazzi",
    image: null,
    prompt:
      "¿Cómo se define una fractura-luxación de Galeazzi?",
    options: [
      "Una fractura del tercio proximal del cúbito con luxación de la cabeza radial",
      "Una fractura del tercio mediodistal del radio asociada a luxación de la articulación radiocubital distal",
      "Una fractura conminuta de ambos huesos del antebrazo sin afectación articular",
      "Una fractura de la epífisis distal del radio con luxación carpiana asociada",
    ],
    correct: 1,
    explanation:
      "La fractura-luxación de Galeazzi es una fractura del tercio mediodistal del radio asociada a luxación de la articulación radiocubital distal, que puede o no incluir una fractura de la estiloides cubital; cuanto más distal sea la fractura, mayor es la probabilidad de inestabilidad de esta articulación.",
  },
  {
    id: 157,
    block: "ms",
    code: "Antebrazo - Epidemiología comparada de Galeazzi y Monteggia",
    image: null,
    prompt:
      "Respecto a la frecuencia relativa de las fracturas-luxaciones de Galeazzi y Monteggia, es correcto afirmar que:",
    options: [
      "Ambas lesiones tienen una incidencia similar en la población adulta",
      "La fractura de Galeazzi es unas tres veces más frecuente que la de Monteggia",
      "La fractura de Monteggia es claramente más frecuente que la de Galeazzi",
      "Ambas son excepcionales y representan menos del 1% de las fracturas de antebrazo",
    ],
    correct: 1,
    explanation:
      "La fractura-luxación de Galeazzi es aproximadamente tres veces más frecuente que la fractura de Monteggia, representando el 3-6% de las fracturas del antebrazo, principalmente en varones de 2ª-3ª década de la vida.",
  },
  {
    id: 158,
    block: "ms",
    code: "Antebrazo - Signos de inestabilidad de la ARCD en Galeazzi",
    image: null,
    prompt:
      "En un paciente con una fractura diafisaria distal de radio, ¿qué hallazgo radiográfico sugiere de forma más directa una inestabilidad asociada de la articulación radiocubital distal?",
    options: [
      "Una angulación proximal del cúbito de 5º",
      "Un acortamiento radial superior a 5 mm con ensanchamiento articular en la proyección AP",
      "Una fractura transversa aislada de la diáfisis radial sin otros hallazgos",
      "Una fractura no desplazada del tercio proximal del radio",
    ],
    correct: 1,
    explanation:
      "Entre los signos de posible inestabilidad radiocubital distal se encuentran la fractura de la base de la estiloides cubital, el ensanchamiento articular en la proyección AP, el acortamiento del radio superior a 5 mm y la incongruencia persistente del cúbito distal en la radiografía lateral.",
  },
  {
    id: 159,
    block: "ms",
    code: "Antebrazo - Deformidad tolerable en niños",
    image: null,
    prompt:
      "Un niño de 7 años presenta una fractura diafisaria completa de cúbito y radio tras la reducción cerrada. Respecto a los límites de deformidad tolerable, ¿qué componente NO tiene capacidad de remodelación con el crecimiento?",
    options: [
      "La angulación en el plano volar-dorsal",
      "El acortamiento menor de 1 cm",
      "El defecto de rotación",
      "El acabalgamiento de los fragmentos",
    ],
    correct: 2,
    explanation:
      "Las angulaciones tienen capacidad de remodelación con el crecimiento, pero los defectos de rotación no remodelan, por lo que no se debe tolerar ningún defecto rotacional, ni en los dedos de la mano ni en el antebrazo.",
  },
  {
    id: 160,
    block: "ms",
    code: "Antebrazo - Tratamiento habitual en niños",
    image: null,
    prompt:
      "¿Cuál es el método de tratamiento más habitual de las fracturas diafisarias de cúbito y radio en la población pediátrica?",
    options: [
      "Reducción cerrada e inmovilización con yeso",
      "Reducción abierta y osteosíntesis con placas LCP",
      "Enclavado intramedular con clavos flexibles de entrada",
      "Fijación con agujas de Kirschner percutáneas de entrada",
    ],
    correct: 0,
    explanation:
      "La mayoría de las fracturas de antebrazo en niños se tratan de forma ortopédica, mediante reducción cerrada e inmovilización con yeso, dado el menor desplazamiento inicial y la capacidad de remodelación, reservándose la cirugía para casos concretos como fracturas inestables tras la reducción o equivalentes de Monteggia o Galeazzi.",
  },
  {
    id: 161,
    block: "ms",
    code: "Antebrazo - Abordaje de Kocher y riesgo nervioso",
    image: null,
    prompt:
      "Durante un abordaje posterolateral de Kocher para el tratamiento de una fractura de cabeza radial, ¿qué medida ayuda a proteger el nervio interóseo posterior si se necesita una disección más distal?",
    options: [
      "Mantener el antebrazo en supinación durante toda la disección",
      "Pronar el antebrazo para alejar la rama nerviosa del campo quirúrgico",
      "Extender el abordaje proximalmente hacia el húmero",
      "Realizar la disección exclusivamente por el plano medial",
    ],
    correct: 1,
    explanation:
      "En el abordaje de Kocher, si se precisa una disección más distal al ligamento anular y se quiere alejar el nervio interóseo posterior del campo quirúrgico, se debe pronar el antebrazo.",
  },
  {
    id: 162,
    block: "ms",
    code: "Antebrazo - Plano internervioso del abordaje de Henry",
    image: null,
    prompt:
      "En el abordaje anterior de Henry para la diáfisis radial, ¿qué plano internervioso se utiliza en la disección superficial?",
    options: [
      "Entre el extensor común de los dedos y el segundo radial",
      "Entre el braquiorradial y el pronador redondo/palmar mayor",
      "Entre el ancóneo y el extensor cubital del carpo",
      "Entre el tríceps y el ancóneo",
    ],
    correct: 1,
    explanation:
      "El abordaje de Henry utiliza el plano internervioso entre el braquiorradial (inervado por el nervio radial) y el pronador redondo/palmar mayor (inervado por el nervio mediano).",
  },
  {
    id: 163,
    block: "ms",
    code: "Antebrazo - Abordaje de Bryan-Morrey",
    image: null,
    prompt:
      "Un paciente va a ser intervenido mediante artroplastia total de codo. ¿Qué abordaje posterior está especialmente indicado para este procedimiento?",
    options: [
      "El abordaje bilaterotricipital o vía de Alonso Llames",
      "El abordaje de Bryan-Morrey, que preserva el olécranon",
      "La vía transtricipital longitudinal de Campbell",
      "El abordaje TRAP con desinserción del tríceps y el ancóneo",
    ],
    correct: 1,
    explanation:
      "El abordaje de Bryan-Morrey despega el tríceps del olécranon de medial a lateral, preservando su continuidad con el periostio del cúbito; se diseñó para preservar el olécranon y es el abordaje indicado para la realización de una prótesis de codo.",
  },
  {
    id: 164,
    block: "ms",
    code: "Antebrazo - Abordaje de Boyd en Monteggia",
    image: null,
    prompt:
      "En una fractura de Monteggia en la que no se consigue reducir de forma cerrada la cabeza radial, se opta por un abordaje subcutáneo proximal del cúbito que se prolonga hacia la cabeza radial evitando el nervio radial. ¿A qué abordaje corresponde esta descripción?",
    options: [
      "Abordaje de Thompson",
      "Abordaje de Boyd",
      "Abordaje de Kaplan",
      "Abordaje anterior a la fosa cubital",
    ],
    correct: 1,
    explanation:
      "El abordaje de Boyd está especialmente diseñado para las fracturas de Monteggia cuando no se puede reducir de forma cerrada la cabeza radial. Es un abordaje subcutáneo proximal del cúbito que se avanza posteriormente por el lado radial hasta alcanzar la cabeza radial, evitando el nervio radial.",
  },
  {
    id: 165,
    block: "ms",
    code: "STC en el embarazo",
    image: null,
    prompt:
      "Mujer de 30 años, gestante de 30 semanas, refiere desde hace tres semanas parestesias nocturnas en los tres primeros dedos de ambas manos. La exploración muestra Phalen y Durkan positivos de forma bilateral, sin atrofia tenar. ¿Cuál es la actitud terapéutica inicial más adecuada?",
    options: [
      "Férula de muñeca en posición neutra nocturna, AINEs y reevaluación tras el parto",
      "Cirugía de liberación del túnel carpiano bilateral de forma programada antes del parto",
      "Electromiografía urgente para decidir si se opera antes del tercer trimestre",
      "Infiltración con corticoides en ambas muñecas como tratamiento inicial",
    ],
    correct: 0,
    explanation:
      "En el síndrome del túnel carpiano asociado al embarazo, el tratamiento inicial es conservador (cambio de hábitos, férula nocturna y AINEs), ya que los síntomas suelen mejorar tras el parto; solo un porcentaje reducido de casos requiere cirugía.",
  },
  {
    id: 166,
    block: "ms",
    code: "Kienböck estadio IIIB",
    image: null,
    prompt:
      "Varón de 35 años con enfermedad de Kienböck en estadio IIIB de Lichtman (colapso del semilunar con flexión del escafoides), sin alteración degenerativa mediocarpiana. ¿Cuál de las siguientes es una opción terapéutica adecuada en este estadio?",
    options: [
      "Osteotomía de acortamiento radial aislada sin ningún otro gesto asociado",
      "Carpectomía proximal o artrodesis STT/escafo-grande",
      "Inmovilización prolongada como tratamiento definitivo",
      "Prótesis total de muñeca de entrada",
    ],
    correct: 1,
    explanation:
      "En el estadio IIIB de Kienböck, con escafoides flexionado, están indicadas la carpectomía proximal o las artrodesis parciales (STT o escafo-grande) para descargar el semilunar y corregir la deformidad del escafoides.",
  },
  {
    id: 167,
    block: "ms",
    code: "Prueba de Finkelstein",
    image: null,
    prompt:
      "Mujer de 42 años, en el posparto, refiere dolor en la cara radial de la muñeca que aumenta al coger en brazos a su hijo. En la exploración, la flexión pasiva del pulgar con la muñeca en desviación cubital reproduce el dolor. ¿Qué maniobra exploratoria se ha realizado y qué patología sugiere?",
    options: [
      "Maniobra de Brunelli; sugiere síndrome del túnel carpiano",
      "Test de Durkan; sugiere síndrome de Guyon",
      "Prueba de Finkelstein; sugiere tenosinovitis de De Quervain",
      "Signo de Tinel; sugiere síndrome de Wartenberg",
    ],
    correct: 2,
    explanation:
      "La prueba de Finkelstein reproduce el dolor en el primer compartimento extensor al forzar la flexión pasiva del pulgar con la muñeca en desviación cubital, siendo característica de la tenosinovitis de De Quervain.",
  },
  {
    id: 168,
    block: "ms",
    code: "Ganglión volar de muñeca",
    image: null,
    prompt:
      "¿Entre qué dos estructuras tendinosas se localiza típicamente el ganglión volar de la muñeca?",
    options: [
      "Flexor cubital del carpo y palmar menor",
      "Extensor largo y extensor corto del pulgar",
      "Flexor superficial y flexor profundo de los dedos",
      "Flexor radial del carpo (palmar mayor) y abductor largo del pulgar",
    ],
    correct: 3,
    explanation:
      "El ganglión volar de la muñeca se sitúa típicamente entre el tendón del flexor radial del carpo (palmar mayor) y el abductor largo del pulgar, y con frecuencia se relaciona con la rama palmar de la arteria radial.",
  },
  {
    id: 169,
    block: "ms",
    code: "Canal de Guyon — zonas",
    image: null,
    prompt:
      "Paciente con antecedente de fractura del gancho del ganchoso presenta debilidad de la musculatura interósea y del aductor del pulgar, con conservación de la sensibilidad en el borde cubital de la mano. ¿En qué zona del canal de Guyon se localiza la lesión?",
    options: [
      "Zona II",
      "Zona I",
      "Zona III",
      "Proximal al canal de Guyon, en el antebrazo",
    ],
    correct: 0,
    explanation:
      "La zona II del canal de Guyon contiene la rama motora del nervio cubital, que rodea la apófisis unciforme del ganchoso; su lesión provoca debilidad de la musculatura cubital intrínseca sin afectar a la sensibilidad, ya que la rama sensitiva discurre por otra zona.",
  },
  {
    id: 170,
    block: "ms",
    code: "Complicaciones cirugía STC",
    image: null,
    prompt:
      "¿Cuál es la causa más común de persistencia de la clínica tras la cirugía del síndrome del túnel carpiano, que constituye además su complicación más frecuente?",
    options: [
      "Lesión del nervio cubital en el canal de Guyon",
      "Liberación incompleta del ligamento anular del carpo",
      "Síndrome de dolor regional complejo",
      "Lesión de la rama motora recurrente del nervio mediano",
    ],
    correct: 1,
    explanation:
      "La persistencia de la clínica es la complicación más frecuente tras la cirugía del túnel carpiano, y su causa más habitual es la liberación incompleta del ligamento anular del carpo.",
  },
  {
    id: 171,
    block: "ms",
    code: "Signo vs. síndrome de Wartenberg",
    image: null,
    prompt:
      "En un paciente con parálisis del nervio cubital se observa abducción permanente del quinto dedo. ¿Cómo se denomina este hallazgo y con qué otra entidad no debe confundirse?",
    options: [
      "Signo de Froment; no debe confundirse con la enfermedad de Kienböck",
      "Signo de Tinel; no debe confundirse con la tenosinovitis de De Quervain",
      "Signo de Wartenberg; no debe confundirse con el síndrome de Wartenberg del nervio radial",
      "Signo de Finsterer; no debe confundirse con la enfermedad de Preiser",
    ],
    correct: 2,
    explanation:
      "El signo de Wartenberg (abducción permanente del 5º dedo) aparece en la afectación motora del nervio cubital y no debe confundirse con el síndrome de Wartenberg, que es la compresión de la rama sensitiva del nervio radial en el antebrazo.",
  },
  {
    id: 172,
    block: "ms",
    code: "Impactación cubitocarpiana",
    image: null,
    prompt:
      "Paciente con antecedente de fractura de radio distal consolidada con acortamiento presenta dolor en la zona cubital del carpo que aumenta con la desviación cubital de la muñeca. La radiografía muestra una varianza cubital positiva. ¿Cuál es el diagnóstico más probable y un procedimiento empleado en su tratamiento quirúrgico?",
    options: [
      "Enfermedad de Kienböck; tratamiento mediante carpectomía proximal",
      "Síndrome del túnel carpiano; liberación del ligamento anular del carpo",
      "Artrosis escafo-trapecio-trapezoidea; trapecectomía con interposición",
      "Síndrome de impactación cubitocarpiana; procedimiento de la oblea (wafer)",
    ],
    correct: 3,
    explanation:
      "El síndrome de impactación cubitocarpiana se produce por cúbito plus, con frecuencia tras fracturas de radio consolidadas con acortamiento; uno de los procedimientos quirúrgicos empleados es el acortamiento del cúbito mediante el procedimiento de la oblea (wafer).",
  },
  {
    id: 173,
    block: "ms",
    code: "Preiser vs. Kienböck",
    image: null,
    prompt:
      "¿Qué característica diferencia a la enfermedad de Preiser de la enfermedad de Kienböck?",
    options: [
      "En la enfermedad de Preiser la necrosis afecta al escafoides, mientras que en la de Kienböck afecta al semilunar",
      "La enfermedad de Preiser es más frecuente que la de Kienböck",
      "La enfermedad de Preiser aparece de forma característica en niños",
      "La enfermedad de Preiser se diagnostica en presencia de una fractura previa del escafoides",
    ],
    correct: 0,
    explanation:
      "La enfermedad de Preiser es la necrosis avascular idiopática del escafoides, mientras que la enfermedad de Kienböck afecta al semilunar; en ambas, para su diagnóstico, no debe existir una fractura previa del hueso implicado.",
  },
  {
    id: 174,
    block: "ms",
    code: "Segunda causa de artrosis de muñeca",
    image: null,
    prompt:
      "¿Cuál es la segunda localización más frecuente de artrosis en la muñeca, con frecuencia infradiagnosticada?",
    options: [
      "Articulación radiocubital distal",
      "Articulación escafo-trapecio-trapezoidea (STT)",
      "Articulación pisopiramidal",
      "Articulación radiocarpiana",
    ],
    correct: 1,
    explanation:
      "La artrosis escafo-trapecio-trapezoidea (STT) es la segunda causa más frecuente de artrosis de muñeca, por detrás de las secuelas de fracturas del radio distal y el carpo, y con frecuencia pasa infradiagnosticada.",
  },
  {
    id: 175,
    block: "ms",
    code: "Traslación cubital en muñeca reumatoide",
    image: null,
    prompt:
      "En la muñeca reumatoide, ¿qué mecanismo favorece la traslación cubital del carpo en el plano frontal?",
    options: [
      "La contractura del ligamento escafolunar",
      "La rotura aislada del tendón extensor largo del pulgar",
      "La inclinación cubital fisiológica del radio junto con la acción de la musculatura radial (ECRB y ECRL) cuando fallan los ligamentos",
      "La subluxación volar del tendón extensor cubital del carpo",
    ],
    correct: 2,
    explanation:
      "La inclinación cubital fisiológica del radio favorece el desplazamiento cubital del carpo; cuando fracasan las estructuras ligamentosas en la artritis reumatoide, la acción de la musculatura radial (ECRB y ECRL) potencia esta traslación cubital.",
  },
  {
    id: 176,
    block: "ms",
    code: "Rotura de EPL en artritis reumatoide",
    image: null,
    prompt:
      "Paciente con artritis reumatoide de larga evolución presenta una pérdida brusca e indolora de la extensión activa del pulgar tras una actividad cotidiana, confirmándose una rotura del tendón extensor largo del pulgar con repercusión funcional importante. ¿Cuál es la transferencia tendinosa de elección?",
    options: [
      "Transferencia del flexor superficial del cuarto dedo",
      "Sutura término-terminal directa del tendón roto",
      "Transferencia del extensor cubital del carpo",
      "Transferencia del extensor propio del índice al extensor largo del pulgar",
    ],
    correct: 3,
    explanation:
      "Ante la rotura del extensor largo del pulgar en la artritis reumatoide con pérdida funcional relevante, la transferencia del extensor propio del índice es la opción preferida, ya que no interfiere con la función del segundo dedo ni debilita la extensión radial de la muñeca.",
  },
  {
    id: 177,
    block: "ms",
    code: "Cirugía de la rizartrosis",
    image: null,
    prompt:
      "¿Cuál es la técnica quirúrgica más empleada en la actualidad para tratar la artrosis trapeciometacarpiana (rizartrosis) que no responde a tratamiento conservador?",
    options: [
      "Artroplastia de resección con interposición tendinosa",
      "Artrodesis trapeciometacarpiana",
      "Artroplastia con implante protésico",
      "Osteotomía de sustracción en valgo del primer metacarpiano",
    ],
    correct: 0,
    explanation:
      "La artroplastia de resección con interposición tendinosa, habitualmente con el flexor radial del carpo, es la técnica quirúrgica más utilizada en la actualidad para la rizartrosis que no responde a tratamiento conservador.",
  },
  {
    id: 178,
    block: "ms",
    code: "Fusión de 4 vs. 3 esquinas",
    image: null,
    prompt:
      "En relación con la artrodesis de las cuatro esquinas frente a la de tres esquinas (excluyendo el piramidal) en la muñeca SLAC/SNAC, ¿qué se ha observado en algunos estudios?",
    options: [
      "La fusión de cuatro esquinas presenta menor incidencia de dolor que la de tres esquinas",
      "La fusión de tres esquinas puede lograr menos dolor y mayor fuerza de prensión y movilidad",
      "La fusión de tres esquinas obtiene peores resultados de movilidad y fuerza de prensión",
      "No existe ninguna diferencia descrita entre ambas técnicas en la literatura",
    ],
    correct: 1,
    explanation:
      "Algunos estudios muestran mejores resultados con la fusión de tres esquinas frente a la de cuatro, con menos dolor y mayor fuerza de prensión y movilidad, aunque actualmente no se ha demostrado una ventaja clara de una técnica sobre la otra.",
  },
  {
    id: 179,
    block: "ms",
    code: "Contraindicaciones de la carpectomía proximal",
    image: null,
    prompt:
      "¿En cuál de las siguientes situaciones estaría contraindicada la carpectomía proximal de la muñeca?",
    options: [
      "Muñeca SLAC o SNAC sin afectación mediocarpiana",
      "Enfermedad de Kienböck en estadio IIIB",
      "Traslación cubital del carpo",
      "Enfermedad de Preiser",
    ],
    correct: 2,
    explanation:
      "La carpectomía proximal está contraindicada cuando existe traslación cubital del carpo, ya que esta técnica no corrige dicha inestabilidad y precisa integridad de la fosa semilunar y de la cabeza del hueso grande.",
  },
  {
    id: 180,
    block: "ms",
    code: "Denervación de la muñeca",
    image: null,
    prompt:
      "¿En qué consiste la técnica de denervación de la muñeca como tratamiento de la artrosis radiocarpiana con dolor?",
    options: [
      "En la resección completa de la primera hilera del carpo",
      "En la fusión de la articulación radiocarpiana mediante placa dorsal",
      "En la sustitución protésica de la articulación radiocarpiana",
      "En la sección de los nervios sensitivos y propioceptivos de la muñeca para interrumpir la transmisión del dolor",
    ],
    correct: 3,
    explanation:
      "La denervación de la muñeca consiste en la sección de los nervios sensitivos y propioceptivos para interrumpir la transmisión del dolor, sin corregir el proceso degenerativo subyacente, que puede seguir progresando.",
  },
  {
    id: 181,
    block: "ms",
    code: "STC dinámico en trabajador joven",
    image: null,
    prompt:
      "Trabajador joven de una cadena de montaje refiere parestesias en los primeros dedos de la mano que aparecen durante las tareas manuales repetitivas de flexo-extensión de la muñeca y ceden con el reposo. La exploración en consulta es normal. ¿Qué forma de presentación del síndrome del túnel carpiano es más compatible?",
    options: [
      "STC dinámico",
      "STC irritativo",
      "STC agudo",
      "STC crónico en fase avanzada",
    ],
    correct: 0,
    explanation:
      "El síndrome del túnel carpiano dinámico aparece en trabajadores jóvenes con actividades manuales repetitivas de flexo-extensión, cede con el reposo y la exploración en consulta puede ser normal, por lo que requiere un alto grado de sospecha clínica.",
  },
  {
    id: 182,
    block: "ms",
    code: "Compresión del nervio interóseo anterior",
    image: null,
    prompt:
      "Paciente refiere dolor antebraquial y dificultad para pinzar un papel entre el pulgar y el índice, siendo incapaz de formar el signo de 'OK' con la mano. No refiere alteraciones de la sensibilidad. ¿Qué estructura está afectada?",
    options: [
      "Nervio interóseo posterior",
      "Nervio interóseo anterior",
      "Nervio cubital en el canal de Guyon",
      "Nervio mediano en el túnel carpiano",
    ],
    correct: 1,
    explanation:
      "La rama interósea anterior del nervio mediano inerva el flexor largo del pulgar, el flexor profundo de 2º y 3º dedos y el pronador cuadrado; su compresión provoca debilidad para la pinza y la incapacidad de formar el signo de 'OK', sin alteración sensitiva asociada.",
  },
  {
    id: 183,
    block: "ms",
    code: "Estiloiditis radial",
    image: null,
    prompt:
      "Mujer de 55 años presenta dolor a la palpación selectiva en la estiloides radial, con tumefacción leve, sin antecedente traumático. El dolor aumenta con la supinación forzada de la muñeca. ¿Cómo se denomina este signo exploratorio y a qué entidad corresponde el cuadro?",
    options: [
      "Signo de Finsterer; enfermedad de Kienböck",
      "Prueba de Eichhoff; tenosinovitis de De Quervain",
      "Signo de Veyrassat; estiloiditis radial",
      "Signo de Wartenberg; cheiralgia parestésica",
    ],
    correct: 2,
    explanation:
      "El signo de Veyrassat (dolor con la supinación forzada) es característico de la estiloiditis radial, un cuadro rebelde al tratamiento que asocia tumefacción de partes blandas y engrosamiento óseo sobre la estiloides radial.",
  },
  {
    id: 184,
    block: "ms",
    code: "Cheiralgia parestésica",
    image: null,
    prompt:
      "Paciente refiere disestesias en el dorso radial de la mano que empeoran al llevar un reloj ajustado en la muñeca, con signo de Tinel positivo unos 9 cm proximal a la estiloides radial. ¿Qué cuadro es compatible con esta presentación?",
    options: [
      "Síndrome del túnel carpiano",
      "Síndrome de intersección tendinosa",
      "Síndrome de compresión del nervio cubital en el canal de Guyon",
      "Compresión de la rama sensitiva del nervio radial (síndrome de Wartenberg o cheiralgia parestésica)",
    ],
    correct: 3,
    explanation:
      "La cheiralgia parestésica o síndrome de Wartenberg del nervio radial se produce por compresión externa de su rama sensitiva, por ejemplo por relojes o pulseras, y se asemeja en su mecanismo a la meralgia parestésica del nervio femorocutáneo.",
  },
  {
    id: 185,
    block: "ms",
    code: "STC - test de Durkan",
    image: null,
    prompt:
      "Mujer de 52 años refiere hormigueo y dolor nocturno en los tres primeros dedos de la mano derecha, que la despierta y mejora al sacudir la mano. En la exploración, la compresión bimanual sobre el túnel carpiano reproduce los síntomas en menos de 30 segundos. ¿Qué maniobra exploratoria se ha realizado?",
    options: [
      "Prueba de compresión carpiana (Durkan)",
      "Maniobra de Phalen",
      "Signo de Tinel",
      "Diagrama de la mano de Brigham",
    ],
    correct: 0,
    explanation:
      "La prueba de compresión carpiana o test de Durkan, que consiste en presionar con ambos pulgares sobre el túnel carpiano, es la maniobra exploratoria más sensible y específica para el diagnóstico del síndrome del túnel carpiano.",
  },
  {
    id: 186,
    block: "ms",
    code: "STC en el embarazo",
    image: null,
    prompt:
      "Gestante de 30 semanas presenta parestesias nocturnas en los dedos de la mano compatibles con síndrome del túnel carpiano de intensidad leve. ¿Cuál es la actitud terapéutica más adecuada en este momento?",
    options: [
      "Sección endoscópica del ligamento anular del carpo",
      "Férula nocturna en posición neutra junto con antiinflamatorios",
      "Neurolisis del nervio mediano",
      "Transferencia tendinosa de oposición según Camitz",
    ],
    correct: 1,
    explanation:
      "En el síndrome del túnel carpiano asociado al embarazo, el tratamiento conservador con férula nocturna en posición neutra y AINEs es la opción inicial, ya que buena parte de los casos mejoran o se resuelven tras el parto.",
  },
  {
    id: 187,
    block: "ms",
    code: "Fenómeno de doble compresión",
    image: null,
    prompt:
      "Paciente joven con actividad laboral repetitiva en pronación presenta clínica sugestiva de síndrome del túnel carpiano, con estudios de conducción nerviosa negativos y dolor añadido en la cara anterior del antebrazo. ¿Qué entidad asociada debe sospecharse?",
    options: [
      "Síndrome de compresión del nervio interóseo posterior",
      "Compresión del nervio cubital en el canal de Guyon",
      "Síndrome del pronador (fenómeno de doble compresión)",
      "Síndrome de intersección tendinosa",
    ],
    correct: 2,
    explanation:
      "La coexistencia de síndrome del túnel carpiano con compresión del nervio mediano en el antebrazo proximal (síndrome del pronador) se conoce como fenómeno de doble compresión o 'double-crash syndrome', y debe sospecharse en jóvenes con actividades repetitivas en pronación y EMG negativa.",
  },
  {
    id: 188,
    block: "ms",
    code: "STC - complicación tras cirugía",
    image: null,
    prompt:
      "Tras una liberación quirúrgica del túnel carpiano, la complicación más frecuente en el postoperatorio es la persistencia de la clínica. ¿Cuál es su causa más habitual?",
    options: [
      "Lesión de la rama motora tenar del nervio mediano",
      "Síndrome de dolor regional complejo",
      "Apertura accidental del canal de Guyon",
      "Liberación incompleta del ligamento anular del carpo",
    ],
    correct: 3,
    explanation:
      "La liberación incompleta del ligamento anular del carpo es la causa más común de persistencia de la clínica tras la cirugía del túnel carpiano, siendo esta la complicación quirúrgica más frecuente.",
  },
  {
    id: 189,
    block: "ms",
    code: "Canal de Guyon - etiología",
    image: null,
    prompt:
      "Un paciente presenta entumecimiento del 4º y 5º dedos sin afectación del dorso de la mano, junto con debilidad para la abducción de los dedos. ¿Cuál es la causa más frecuente de este cuadro?",
    options: [
      "Ganglión en el canal de Guyon",
      "Fractura del gancho del ganchoso",
      "Microtraumatismos repetidos (síndrome del martillo hipotenar)",
      "Trombosis de la arteria cubital",
    ],
    correct: 0,
    explanation:
      "El ganglión es la causa más frecuente de compresión del nervio cubital en el canal de Guyon, presente en aproximadamente el 80% de los casos de origen no traumático.",
  },
  {
    id: 190,
    block: "ms",
    code: "Canal de Guyon - zona II",
    image: null,
    prompt:
      "Paciente presenta debilidad de la musculatura hipotenar, los interóseos y el aductor del pulgar, sin alteración de la sensibilidad en ningún territorio de la mano. ¿En qué zona del canal de Guyon se localiza la lesión?",
    options: [
      "Zona I",
      "Zona II",
      "Zona III",
      "Proximal al canal de Guyon",
    ],
    correct: 1,
    explanation:
      "La zona II del canal de Guyon contiene la rama motora del nervio cubital, que rodea la apófisis unciforme del ganchoso; su compresión aislada provoca debilidad motora sin déficit sensitivo asociado.",
  },
  {
    id: 191,
    block: "ms",
    code: "Ganglión volar de muñeca",
    image: null,
    prompt:
      "Se palpa una tumoración de consistencia elástica en la cara volar-radial de la muñeca, entre el tendón del flexor radial del carpo y el abductor largo del pulgar. ¿Cuál es el diagnóstico más probable?",
    options: [
      "Ganglión dorsal de muñeca",
      "Tenosinovitis de De Quervain",
      "Ganglión volar de muñeca",
      "Enfermedad de Kienböck",
    ],
    correct: 2,
    explanation:
      "El ganglión volar de muñeca, segundo en frecuencia entre los gangliones del carpo, se sitúa característicamente entre el flexor radial del carpo y el abductor largo del pulgar, y suele originarse en la cápsula y el ligamento radioescafoideo.",
  },
  {
    id: 192,
    block: "ms",
    code: "De Quervain - Finkelstein",
    image: null,
    prompt:
      "Mujer de 35 años en el posparto refiere dolor progresivo en la cara lateral de la muñeca que aumenta con la movilización del pulgar. Con la muñeca en desviación cubital, se fuerza la flexión pasiva del pulgar y se reproduce el dolor. ¿Qué maniobra se ha realizado y qué patología sugiere?",
    options: [
      "Maniobra de Brunelli; síndrome de intersección tendinosa",
      "Signo de Veyrassat; estiloiditis radial",
      "Maniobra de Eichhoff; degeneración escafo-trapecio-trapezoidea",
      "Prueba de Finkelstein; tenosinovitis de De Quervain",
    ],
    correct: 3,
    explanation:
      "La prueba de Finkelstein, que reproduce dolor al flexionar pasivamente el pulgar con la muñeca en desviación cubital, es característica de la tenosinovitis de De Quervain, más frecuente en mujeres en relación con el embarazo o el posparto.",
  },
  {
    id: 193,
    block: "ms",
    code: "Síndrome de intersección",
    image: null,
    prompt:
      "Un paciente presenta dolor y crepitación en la cara postero-lateral del antebrazo, localizado unos 6 cm proximal a la articulación radiocarpiana, más proximal que el dolor típico de la tenosinovitis de De Quervain. ¿Qué estructuras están afectadas?",
    options: [
      "Segundo compartimento extensor, por roce con el primero",
      "Primer compartimento extensor",
      "Tercer compartimento extensor, a nivel del tubérculo de Lister",
      "Sexto compartimento extensor",
    ],
    correct: 0,
    explanation:
      "El síndrome de intersección tendinosa afecta a los tendones del segundo compartimento extensor por roce con los del primero, y se localiza más proximal en el antebrazo que la tenosinovitis de De Quervain.",
  },
  {
    id: 194,
    block: "ms",
    code: "Degeneración escafo-trapecio-trapezoidea",
    image: null,
    prompt:
      "Paciente con dolor crónico en la muñeca y hallazgos radiográficos de artrosis entre el escafoides, el trapecio y el trapezoide, sin afectación de la articulación trapeciometacarpiana. ¿Cuál es la actitud quirúrgica más adecuada?",
    options: [
      "Artrodesis total de muñeca",
      "Resección del polo distal del escafoides o artrodesis triescafoidea",
      "Trapecectomía con interposición de tejidos blandos",
      "Carpectomía proximal",
    ],
    correct: 1,
    explanation:
      "En la degeneración escafo-trapecio-trapezoidea sin afectación de la articulación trapeciometacarpiana, las opciones incluyen la resección del polo distal del escafoides o la artrodesis triescafoidea (fusión STT).",
  },
  {
    id: 195,
    block: "ms",
    code: "Enfermedad de Kienböck - signo de Finsterer",
    image: null,
    prompt:
      "Paciente con dolor y rigidez progresiva en el dorso de la muñeca refiere que, al cerrar el puño, ha perdido la prominencia habitual de la cabeza del tercer metacarpiano, siendo dolorosa su percusión. ¿A qué signo corresponde este hallazgo y en qué enfermedad es patognomónico?",
    options: [
      "Signo de Wartenberg; síndrome de compresión del nervio radial",
      "Signo de Froment; compresión del nervio cubital",
      "Signo de Finsterer; enfermedad de Kienböck",
      "Signo de Veyrassat; estiloiditis radial",
    ],
    correct: 2,
    explanation:
      "El signo de Finsterer, patognomónico de la enfermedad de Kienböck, consiste en la pérdida de la prominencia normal de la cabeza del tercer metacarpiano al cerrar el puño, por el acortamiento del semilunar.",
  },
  {
    id: 196,
    block: "ms",
    code: "Kienböck - diagnóstico precoz",
    image: null,
    prompt:
      "Varón joven con dolor de muñeca de varios meses de evolución sin antecedente traumático presenta una radiografía simple normal. ¿Qué prueba de imagen es la más adecuada para confirmar una sospecha de enfermedad de Kienböck en esta fase?",
    options: [
      "Tomografía computarizada",
      "Gammagrafía ósea",
      "Ecografía de partes blandas",
      "Resonancia magnética",
    ],
    correct: 3,
    explanation:
      "La resonancia magnética es la técnica de elección para el diagnóstico de la enfermedad de Kienböck en fase temprana, cuando la radiografía simple todavía puede ser normal, mostrando una disminución de señal en T1 y T2 en el semilunar.",
  },
  {
    id: 197,
    block: "ms",
    code: "Kienböck - factores predisponentes",
    image: null,
    prompt:
      "¿Cuál de los siguientes factores anatómicos se ha relacionado como predisponente en la aparición de la enfermedad de Kienböck?",
    options: [
      "Varianza cubital negativa (cúbito minus)",
      "Cúbito plus",
      "Inclinación radial disminuida",
      "Fosa semilunar muy profunda",
    ],
    correct: 0,
    explanation:
      "El cúbito minus o varianza cubital negativa está presente en un porcentaje elevado de los casos de enfermedad de Kienböck, ya que aumenta la transmisión de cargas sobre la articulación radio-semilunar, aunque esta asociación sigue siendo objeto de debate.",
  },
  {
    id: 198,
    block: "ms",
    code: "Preiser vs Kienböck",
    image: null,
    prompt:
      "¿Qué diferencia principal existe entre la enfermedad de Preiser y la enfermedad de Kienböck?",
    options: [
      "La enfermedad de Preiser afecta al semilunar y la de Kienböck al escafoides",
      "La enfermedad de Preiser afecta al escafoides y la de Kienböck al semilunar",
      "Ambas afectan al mismo hueso, pero con distinta edad de presentación",
      "La enfermedad de Preiser aparece con más frecuencia en la infancia",
    ],
    correct: 1,
    explanation:
      "La enfermedad de Preiser es la osteonecrosis idiopática del escafoides carpiano, mientras que la enfermedad de Kienböck es la osteonecrosis idiopática del semilunar, siendo este último el hueso del carpo con mayor incidencia de osteonecrosis.",
  },
  {
    id: 199,
    block: "ms",
    code: "Necrosis avascular del hueso grande",
    image: null,
    prompt:
      "La necrosis avascular del hueso grande del carpo es una entidad poco frecuente. ¿Con qué causa se asocia más habitualmente?",
    options: [
      "Infección articular",
      "Hipotiroidismo",
      "Traumatismos de alta energía",
      "Anticoagulación crónica",
    ],
    correct: 2,
    explanation:
      "La necrosis avascular del hueso grande es rara y se asocia habitualmente a traumatismos de alta energía, aunque también se ha descrito en relación con dosis elevadas de esteroides, quimioterapia o enfermedad de Gaucher.",
  },
  {
    id: 200,
    block: "ms",
    code: "Ganglión dorsal de muñeca",
    image: null,
    prompt:
      "El ganglión más frecuente en la muñeca se localiza en su cara dorsal y suele originarse en el ligamento escafolunar. Ante un ganglión dorsal pequeño y con poca sintomatología, ¿cuál es la actitud más razonable?",
    options: [
      "Punción-aspiración inmediata",
      "Extirpación quirúrgica programada",
      "Artroscopia diagnóstica urgente",
      "Observación, ya que muchos se reabsorben espontáneamente",
    ],
    correct: 3,
    explanation:
      "El ganglión dorsal, originado habitualmente en el ligamento escafolunar, suele producir sintomatología menor y hasta la mitad se reabsorben espontáneamente en varios años, por lo que la observación es la actitud inicial más razonable si es poco sintomático.",
  },
  {
    id: 201,
    block: "ms",
    code: "Rizartrosis - técnica quirúrgica",
    image: null,
    prompt:
      "Paciente con artrosis trapeciometacarpiana avanzada y mala respuesta al tratamiento conservador va a intervenirse. ¿Cuál es la técnica quirúrgica empleada con más frecuencia para este tipo de artrosis?",
    options: [
      "Artroplastia de resección con interposición tendinosa",
      "Artrodesis trapeciometacarpiana",
      "Artroplastia con implante protésico",
      "Osteotomía de sustracción del primer metacarpiano",
    ],
    correct: 0,
    explanation:
      "La artroplastia de resección, con interposición tendinosa y en ocasiones reconstrucción ligamentosa, es la técnica quirúrgica más empleada en la artrosis trapeciometacarpiana del pulgar cuando fracasa el tratamiento conservador.",
  },
  {
    id: 202,
    block: "ms",
    code: "Artrosis de la mano - orden de afectación",
    image: null,
    prompt:
      "En la artrosis de la mano, ¿cuál es el orden de afectación de las articulaciones, de mayor a menor frecuencia?",
    options: [
      "Carpometacarpiana del pulgar, interfalángica distal, metacarpofalángica, interfalángica proximal",
      "Interfalángica distal, carpometacarpiana del pulgar, interfalángica proximal, metacarpofalángica",
      "Metacarpofalángica, interfalángica proximal, interfalángica distal, carpometacarpiana del pulgar",
      "Interfalángica proximal, interfalángica distal, metacarpofalángica, carpometacarpiana del pulgar",
    ],
    correct: 1,
    explanation:
      "En la artrosis de la mano, las articulaciones se afectan en el siguiente orden de frecuencia: interfalángica distal, carpometacarpiana del pulgar, interfalángica proximal y, por último, metacarpofalángica.",
  },
  {
    id: 203,
    block: "ms",
    code: "Mano reumatoide - cuello de cisne",
    image: null,
    prompt:
      "En la mano reumatoide, la deformidad en cuello de cisne se caracteriza por hiperextensión de la articulación interfalángica proximal e hiperflexión de la interfalángica distal. ¿Cuál es el mecanismo fisiopatológico principal implicado?",
    options: [
      "Rotura de la banda central del aparato extensor",
      "Subluxación volar de las bandas laterales del extensor",
      "Desequilibrio tendinoso con relajación de la cápsula volar de la interfalángica proximal",
      "Sección espontánea del tendón flexor superficial",
    ],
    correct: 2,
    explanation:
      "La deformidad en cuello de cisne se produce por un desequilibrio tendinoso y una relajación de la cápsula volar de la articulación interfalángica proximal, a diferencia de la deformidad en ojal o boutonnière, causada por rotura de la banda central del extensor.",
  },
  {
    id: 204,
    block: "ms",
    code: "Síndrome de Vaughn-Jackson",
    image: null,
    prompt:
      "En un paciente con artritis reumatoide evolucionada aparece de forma progresiva una pérdida de extensión, primero del quinto dedo y después del cuarto, en relación con el roce del tendón sobre la cabeza del cúbito prominente. ¿Cómo se denomina este cuadro?",
    options: [
      "Síndrome de Mannerfelt",
      "Deformidad en pulgar adducto",
      "Síndrome de la cabeza del cúbito aislado",
      "Síndrome de Vaughn-Jackson",
    ],
    correct: 3,
    explanation:
      "El síndrome de Vaughn-Jackson consiste en la rotura progresiva de los tendones extensores de cubital a radial, comenzando típicamente por el extensor del 5º dedo y extendiéndose al 4º, por roce sobre la cabeza cubital prominente en la artritis reumatoide.",
  },
  {
    id: 205,
    block: "ms",
    code: "Síndrome de Mannerfelt",
    image: null,
    prompt:
      "En un paciente con artritis reumatoide aparece pérdida brusca de la flexión activa de la interfalángica del pulgar, secundaria al roce del tendón flexor sobre un osteofito situado entre el escafoides, el trapecio y el trapezoide. ¿Cómo se denomina este cuadro?",
    options: [
      "Síndrome de Mannerfelt",
      "Síndrome de Vaughn-Jackson",
      "Dedo en Boutonnière",
      "Pulgar en Z",
    ],
    correct: 0,
    explanation:
      "El síndrome de Mannerfelt consiste en la rotura del flexor largo del pulgar, y en ocasiones del flexor profundo del segundo dedo, por atricción del tendón sobre un osteofito localizado entre el escafoides, el trapecio y el trapezoide.",
  },
  {
    id: 206,
    block: "ms",
    code: "AR - prevención de roturas tendinosas",
    image: null,
    prompt:
      "En un paciente con artritis reumatoide y sinovitis mantenida de los tendones extensores, ¿qué procedimiento realizado de forma precoz puede disminuir el riesgo de rotura tendinosa espontánea?",
    options: [
      "Artrodesis de muñeca",
      "Tenosinovectomía",
      "Denervación de muñeca",
      "Transferencia tendinosa profiláctica",
    ],
    correct: 1,
    explanation:
      "La tenosinovectomía realizada de forma precoz en la fase sinovítica de la artritis reumatoide puede prevenir la rotura de los tendones extensores, ya que elimina la sinovial que invade y debilita el tendón.",
  },
  {
    id: 207,
    block: "ms",
    code: "Fractura de Colles",
    image: null,
    prompt:
      "Mujer de 68 años sufre una caída con la mano en flexión dorsal. En la radiografía se observa una fractura extraarticular del radio distal con desplazamiento dorsal y acortamiento radial, con la típica deformidad en 'dorso de tenedor'. ¿Cómo se denomina clásicamente este tipo de fractura?",
    options: [
      "Fractura de Colles",
      "Fractura de Smith",
      "Fractura de Barton",
      "Fractura de Hutchinson",
    ],
    correct: 0,
    explanation:
      "La fractura de Colles es una fractura extraarticular del radio distal con desplazamiento dorsal y acortamiento radial, característica de las caídas con la muñeca en flexión dorsal, que produce la clásica deformidad en 'dorso de tenedor'.",
  },
  {
    id: 208,
    block: "ms",
    code: "Fractura de Smith",
    image: null,
    prompt:
      "Paciente sufre una caída con la muñeca en flexión palmar. La radiografía muestra una fractura extraarticular del radio distal con desplazamiento volar, y en la exploración se aprecia una deformidad en 'pala de jardinero'. ¿Qué tipo de fractura es compatible con esta presentación?",
    options: [
      "Fractura de Barton dorsal",
      "Fractura de Smith",
      "Fractura de Hutchinson",
      "Fractura die-punch",
    ],
    correct: 1,
    explanation:
      "La fractura de Smith o Goyrand-Smith es una fractura extraarticular del radio distal con desplazamiento volar, típica de caídas con la muñeca en flexión palmar, que produce la deformidad en 'pala de jardinero'.",
  },
  {
    id: 209,
    block: "ms",
    code: "Fractura de Barton",
    image: null,
    prompt:
      "¿Cuál de las siguientes definiciones corresponde a una fractura de Barton?",
    options: [
      "Fractura aislada de la apófisis estiloides del radio",
      "Fractura extraarticular con desplazamiento dorsal y acortamiento radial",
      "Fractura-luxación en la que se luxa el carpo y se fractura el reborde dorsal o volar del radio",
      "Fractura por impactación del semilunar en la superficie articular del radio",
    ],
    correct: 2,
    explanation:
      "La fractura de Barton o Rhea-Barton es una fractura-luxación en la que se luxa el carpo junto con la fractura del reborde dorsal o volar del radio, a diferencia de otras fracturas del radio distal que no asocian luxación carpiana.",
  },
  {
    id: 210,
    block: "ms",
    code: "Fractura de Hutchinson o Chauffeur",
    image: null,
    prompt:
      "Un paciente presenta una fractura aislada de la apófisis estiloides del radio tras un mecanismo de cizallamiento. Esta fractura, conocida como de Hutchinson o Chauffeur, se asocia con frecuencia a la lesión de qué estructura?",
    options: [
      "Fibrocartílago triangular",
      "Nervio mediano",
      "Extensor largo del pulgar",
      "Ligamento escafosemilunar",
    ],
    correct: 3,
    explanation:
      "Las fracturas de la estiloides radial (fractura de Hutchinson o Chauffeur) se asocian con frecuencia a lesiones del ligamento escafosemilunar, por lo que debe explorarse esta estructura ante este tipo de fractura.",
  },
  {
    id: 211,
    block: "ms",
    code: "Criterios de inestabilidad - edad",
    image: null,
    prompt:
      "En las fracturas extraarticulares del radio distal, ¿cuál de los siguientes factores se considera el mayor predictor de pérdida de reducción?",
    options: [
      "Edad superior a 60 años",
      "Fractura de cúbito asociada",
      "Conminución dorsal metafisaria",
      "Acortamiento radial inicial mayor de 10 mm",
    ],
    correct: 0,
    explanation:
      "La edad superior a 60 años es, entre los criterios de inestabilidad de las fracturas extraarticulares del radio distal, el mayor predictor de pérdida de reducción.",
  },
  {
    id: 212,
    block: "ms",
    code: "Sospecha de rotura del FCT",
    image: null,
    prompt:
      "En una fractura de radio distal, ¿qué hallazgo radiográfico obliga a sospechar una rotura asociada del fibrocartílago triangular?",
    options: [
      "Escalón articular menor de 2 mm",
      "Angulación dorsal del radio mayor de 25º",
      "Inclinación radial mayor de 15º",
      "Angulación volar menor de 10º",
    ],
    correct: 1,
    explanation:
      "Se debe sospechar una rotura del fibrocartílago triangular cuando existe un acortamiento radiocubital mayor de 5-7 mm o una angulación dorsal del radio mayor de 25º.",
  },
  {
    id: 213,
    block: "ms",
    code: "Tratamiento conservador con rotura del FCT",
    image: null,
    prompt:
      "Ante una fractura de radio distal con sospecha de rotura del fibrocartílago triangular que se va a tratar de forma conservadora, ¿en qué posición debe inmovilizarse el antebrazo?",
    options: [
      "Pronación completa",
      "Supinación completa",
      "Pronosupinación media",
      "Flexión palmar máxima de la muñeca",
    ],
    correct: 2,
    explanation:
      "Si existe rotura del fibrocartílago triangular, el antebrazo debe inmovilizarse con yeso braquioantebraquial en pronosupinación media durante 3 semanas, ya que es la posición en la que el fibrocartílago está más extendido y cicatriza mejor.",
  },
  {
    id: 214,
    block: "ms",
    code: "Prevención de la compresión del nervio mediano",
    image: null,
    prompt:
      "¿Cuál es la medida más eficaz para prevenir una compresión aguda del nervio mediano tras una fractura de radio distal?",
    options: [
      "Colocar un yeso con la muñeca en flexión mayor de 30º",
      "Administrar corticoides sistémicos de forma precoz",
      "Retrasar la reducción hasta que ceda el edema",
      "Realizar la reducción de la fractura de forma precoz",
    ],
    correct: 3,
    explanation:
      "La reducción precoz de la fractura y evitar flexionar la muñeca más de 30º dentro del yeso son las medidas más eficaces para prevenir la compresión aguda del nervio mediano tras una fractura de radio distal.",
  },
  {
    id: 215,
    block: "ms",
    code: "Criterios aceptables tras la reducción cerrada",
    image: null,
    prompt:
      "Tras la reducción cerrada de una fractura de radio distal, ¿cuál de los siguientes parámetros radiográficos se considera aceptable para no indicar una reducción abierta?",
    options: [
      "Angulación dorsal de 8º",
      "Escalón articular de 3 mm",
      "Acortamiento radial de 5 mm",
      "Inclinación radial de 10º",
    ],
    correct: 0,
    explanation:
      "Con la reducción cerrada se debe conseguir un escalón articular menor de 2 mm, una angulación dorsal menor de 10º, una inclinación radial mayor de 15º y un acortamiento menor de 3 mm; una angulación dorsal de 8º estaría dentro de los límites aceptables.",
  },
  {
    id: 216,
    block: "ms",
    code: "Tratamiento en el anciano con baja demanda",
    image: null,
    prompt:
      "Paciente de 78 años con bajos requerimientos funcionales sufre una fractura extraarticular desplazada del radio distal. ¿Cuál es la actitud terapéutica más adecuada?",
    options: [
      "Fijación interna con placa volar de entrada",
      "Reducción cerrada e inmovilización con yeso",
      "Fijador externo puenteando la articulación radiocarpiana",
      "Reducción abierta y agujas de Kirschner",
    ],
    correct: 1,
    explanation:
      "En pacientes de edad avanzada con bajos requerimientos funcionales, la inmovilización con yeso tras la reducción cerrada suele ser la opción más adecuada, reservando la cirugía para casos seleccionados.",
  },
  {
    id: 217,
    block: "ms",
    code: "Agujas percutáneas",
    image: null,
    prompt:
      "Respecto a las agujas percutáneas empleadas en el tratamiento de las fracturas de radio distal, ¿cuál de las siguientes afirmaciones es correcta?",
    options: [
      "Sustituyen a la inmovilización con yeso durante todo el tratamiento",
      "Se recomienda colocar una única aguja para minimizar el riesgo de lesión nerviosa",
      "Necesitan un soporte externo con yeso durante al menos 4 semanas",
      "Se introducen preferentemente a través de la rama sensitiva del nervio radial",
    ],
    correct: 2,
    explanation:
      "Las agujas de Kirschner percutáneas requieren un soporte externo con yeso durante al menos 4 semanas, colocándose habitualmente entre 2 y 4 agujas y evitando lesionar la rama sensitiva del nervio radial y los tendones extensores.",
  },
  {
    id: 218,
    block: "ms",
    code: "Fijador externo - sobredistracción",
    image: null,
    prompt:
      "Al colocar un fijador externo en una fractura de radio distal, ¿qué complicación se busca evitar limitando la distracción de la articulación radiocarpiana?",
    options: [
      "Infección del trayecto de los pines",
      "Lesión del nervio cubital",
      "Consolidación viciosa en varo",
      "Rigidez articular por sobredistracción",
    ],
    correct: 3,
    explanation:
      "Se recomienda evitar la sobredistracción con el fijador externo, ya que provoca rigidez; no debe superarse 1 mm de distracción en la articulación radiocarpiana ni distraer la articulación mediocarpiana.",
  },
  {
    id: 219,
    block: "ms",
    code: "Placa volar - línea de aguas",
    image: null,
    prompt:
      "Durante la colocación de una placa volar para el tratamiento de una fractura de radio distal, ¿qué precaución técnica reduce el riesgo de rotura del tendón flexor largo del pulgar?",
    options: [
      "No sobrepasar con la placa la línea de aguas ('watershed line')",
      "Colocar la placa distal a la línea de aguas ('watershed line')",
      "Usar tornillos de mayor longitud en la fila distal",
      "Emplear un abordaje dorsal en lugar de volar",
    ],
    correct: 0,
    explanation:
      "Una técnica quirúrgica correcta con placa volar implica no colocar la placa distal a la línea de aguas ('watershed line'), ya que hacerlo aumenta el riesgo de rotura del tendón flexor largo del pulgar.",
  },
  {
    id: 220,
    block: "ms",
    code: "Complicación más frecuente de la placa volar",
    image: null,
    prompt:
      "¿Cuál es la complicación más frecuente asociada a la fijación con placa volar en las fracturas de radio distal?",
    options: [
      "Rotura del extensor largo del pulgar",
      "Síndrome del túnel carpiano",
      "Pseudoartrosis",
      "Lesión de la rama sensitiva del nervio radial",
    ],
    correct: 1,
    explanation:
      "El síndrome del túnel carpiano, presente en torno al 14% de los casos, es la complicación más frecuente de la fijación con placa volar en las fracturas de radio distal.",
  },
  {
    id: 221,
    block: "ms",
    code: "Indicaciones de la placa dorsal",
    image: null,
    prompt:
      "¿En cuál de las siguientes situaciones estaría indicado un abordaje dorsal con placa para una fractura de radio distal?",
    options: [
      "Fractura extraarticular no desplazada en paciente anciano",
      "Fractura de Smith sin conminución",
      "Fractura die-punch con hundimiento dorsal",
      "Fractura de la estiloides cubital aislada",
    ],
    correct: 2,
    explanation:
      "El abordaje dorsal con placa está indicado en fracturas por cizallamiento dorsal, en fracturas die-punch dorsales o en fracturas articulares complejas que requieren visualización directa de los fragmentos.",
  },
  {
    id: 222,
    block: "ms",
    code: "Rotura diferida del extensor largo del pulgar",
    image: null,
    prompt:
      "Un paciente que fue tratado de forma conservadora por una fractura de radio distal presenta, varias semanas después, incapacidad para extender el pulgar por rotura del tendón extensor largo del pulgar. ¿Cuál es el tratamiento más adecuado?",
    options: [
      "Sutura término-terminal directa del tendón",
      "Injerto tendinoso libre interpuesto",
      "Inmovilización con férula en extensión",
      "Transferencia del tendón extensor propio del índice",
    ],
    correct: 3,
    explanation:
      "En la rotura del extensor largo del pulgar, el tendón suele estar degenerado, por lo que se recomienda la transferencia del tendón extensor propio del índice en lugar de la sutura término-terminal.",
  },
  {
    id: 223,
    block: "ms",
    code: "Consolidación con mal resultado funcional",
    image: null,
    prompt:
      "¿Cuál de las siguientes situaciones se asocia a peores resultados funcionales tras la consolidación de una fractura de radio distal?",
    options: [
      "Acortamiento radial mayor de 3 mm",
      "Inclinación radial mayor de 15º",
      "Angulación dorsal menor de 10º",
      "Escalón articular menor de 1 mm",
    ],
    correct: 0,
    explanation:
      "Los resultados funcionales son peores cuando la fractura consolida con más de 20º de angulación dorsal, menos de 10º de inclinación radial o más de 3 mm de acortamiento respecto a la muñeca contralateral.",
  },
  {
    id: 224,
    block: "ms",
    code: "Epidemiología pediátrica",
    image: null,
    prompt:
      "Respecto a las fracturas de la extremidad distal del cúbito y radio en la infancia, ¿cuál de las siguientes afirmaciones es correcta?",
    options: [
      "Suelen ser intraarticulares y de mal pronóstico",
      "Son la fractura más frecuente en niños, siendo la epifisiolisis tipo II la más habitual",
      "Predominan en el sexo femenino",
      "No se asocian con frecuencia a fracturas del codo",
    ],
    correct: 1,
    explanation:
      "La fractura de extremidad distal de cúbito y radio es la fractura más frecuente en la infancia, siendo la epifisiolisis tipo II de Salter y Harris la más habitual, con mejor pronóstico que en adultos al ser raramente intraarticulares.",
  },
  {
    id: 225,
    block: "ms",
    code: "Epifisiolisis - deformidad aceptable",
    image: null,
    prompt:
      "Niño de 9 años presenta una epifisiolisis tipo II de Salter y Harris en el radio distal, con buen remanente de crecimiento. ¿Qué grado de desplazamiento se puede aceptar con tratamiento ortopédico?",
    options: [
      "Cualquier grado de angulación si no hay dolor",
      "Hasta el 20% de contacto y 10º de angulación",
      "Hasta el 50% de contacto y 25º de angulación",
      "Ausencia total de desplazamiento",
    ],
    correct: 2,
    explanation:
      "En las epifisiolisis tipos I y II de Salter y Harris, que son las más frecuentes, se acepta hasta un 50% de contacto y 25º de angulación si queda al menos un año de crecimiento restante.",
  },
  {
    id: 226,
    block: "ms",
    code: "Fractura en rodete",
    image: null,
    prompt:
      "Niño de 7 años sufre una fractura por compresión axial del radio distal que afecta a una sola cortical, sin desplazamiento. ¿Cuál es el tratamiento habitual de esta fractura en rodete?",
    options: [
      "Yeso braquiopalmar durante 6 semanas",
      "Reducción abierta y agujas de Kirschner",
      "Fijador externo puenteando la muñeca",
      "Yeso corto antebraquial o vendaje simple durante 3 semanas",
    ],
    correct: 3,
    explanation:
      "Las fracturas en rodete o torus son fracturas incompletas y estables que afectan a una sola cortical; se tratan con yeso corto antebraquial durante 3 semanas, habiéndose descrito resultados similares con un vendaje simple.",
  },
  {
    id: 227,
    block: "ms",
    code: "Fractura en tallo verde",
    image: null,
    prompt:
      "Niño con una fractura metafisaria en tallo verde del radio distal, con deformidad y afectación de ambas corticales. ¿Cómo se plantea habitualmente la inmovilización?",
    options: [
      "Yeso largo braquiopalmar inicial, seguido de yeso corto hasta completar 4-6 semanas",
      "Yeso corto antebraquial durante todo el tratamiento",
      "Vendaje elástico simple durante 2 semanas",
      "Férula dorsal sin inmovilización circular",
    ],
    correct: 0,
    explanation:
      "En las fracturas en tallo verde, el tratamiento habitual consiste en un yeso largo braquiopalmar durante 3-4 semanas, seguido de un yeso corto antebraquial hasta completar entre 4 y 6 semanas de inmovilización total.",
  },
  {
    id: 228,
    block: "ms",
    code: "Fractura de Galeazzi pediátrica",
    image: null,
    prompt:
      "En una fractura de Galeazzi pediátrica con ápex de la fractura volar y deformidad dorsal, la deformidad rotacional predominante es la supinación. ¿En qué posición debe inmovilizarse el antebrazo para corregirla?",
    options: [
      "Supinación completa",
      "Pronación",
      "Pronosupinación media",
      "Flexión máxima del codo sin rotación",
    ],
    correct: 1,
    explanation:
      "Si el ápex de la fractura es volar y la deformidad dorsal, la deformidad rotacional asociada es la supinación, por lo que es preciso inmovilizar el antebrazo en pronación para corregirla.",
  },
  {
    id: 229,
    block: "ms",
    code: "Ligamento escafolunar",
    image: null,
    prompt:
      "¿Cuál es el ligamento intrínseco más importante para mantener la integridad de la primera hilera del carpo?",
    options: [
      "Ligamento escafolunar",
      "Ligamento lunopiramidal",
      "Ligamento radioescafogrande",
      "Ligamento radiolunar largo",
    ],
    correct: 0,
    explanation:
      "El ligamento escafolunar es el ligamento intrínseco más importante del carpo, ya que mantiene la congruencia de la primera hilera y su lesión es la causa más frecuente de inestabilidad carpiana.",
  },
  {
    id: 230,
    block: "ms",
    code: "Inestabilidad DISI",
    image: null,
    prompt:
      "En una radiografía lateral de muñeca se observa el semilunar en flexión dorsal, con un ángulo escafolunar aumentado, tras la rotura del ligamento escafolunar. ¿Cómo se denomina este patrón de inestabilidad?",
    options: [
      "Inestabilidad VISI",
      "Inestabilidad DISI",
      "Inestabilidad mediocarpiana dorsal",
      "Inestabilidad radiocubital distal",
    ],
    correct: 1,
    explanation:
      "Cuando se rompe el ligamento escafolunar, el semilunar es arrastrado por el piramidal hacia la extensión, apareciendo flexionado dorsalmente en la radiografía lateral; este patrón se denomina inestabilidad DISI (Dorsal Intercalated Segment Instability).",
  },
  {
    id: 231,
    block: "ms",
    code: "Inestabilidad VISI",
    image: null,
    prompt:
      "¿Qué ocurre con la posición del semilunar cuando se rompe el ligamento lunopiramidal?",
    options: [
      "El semilunar se mantiene en posición neutra",
      "El semilunar es arrastrado por el piramidal hacia la extensión",
      "El semilunar es arrastrado por el escafoides hacia la flexión",
      "El semilunar se disloca de forma aislada",
    ],
    correct: 2,
    explanation:
      "Si se rompe el ligamento lunopiramidal, el semilunar es arrastrado por el escafoides hacia la flexión, apareciendo flexionado en la radiografía lateral; este patrón se denomina inestabilidad VISI (Volar Intercalated Segment Instability).",
  },
  {
    id: 232,
    block: "ms",
    code: "Vascularización del escafoides",
    image: null,
    prompt:
      "¿Por qué las fracturas del polo proximal del escafoides tienen mayor riesgo de pseudoartrosis que las del tercio distal?",
    options: [
      "Porque reciben menos carga mecánica",
      "Porque están recubiertas en su totalidad por cartílago articular",
      "Porque su consolidación depende del ligamento escafolunar",
      "Porque la vascularización del escafoides es predominantemente retrógrada",
    ],
    correct: 3,
    explanation:
      "La vascularización del escafoides es predominantemente retrógrada, entrando principalmente por la zona dorsal distal, por lo que cuanto más proximal es la fractura, mayor es el riesgo de isquemia y pseudoartrosis.",
  },
  {
    id: 233,
    block: "ms",
    code: "Signo de Hirsch",
    image: null,
    prompt:
      "En la exploración de una posible fractura de escafoides, el dolor con la compresión axial del tercer metacarpiano solo aparece si la muñeca se desvía radialmente. ¿Cómo se conoce este hallazgo?",
    options: [
      "Signo de Hirsch",
      "Signo de Finsterer",
      "Signo de Terry-Thomas",
      "Prueba de Watson",
    ],
    correct: 0,
    explanation:
      "El signo de Hirsch describe que la compresión axial del tercer metacarpiano solo produce dolor si se desvía radialmente la muñeca, siendo uno de los hallazgos exploratorios sugestivos de fractura de escafoides.",
  },
  {
    id: 234,
    block: "ms",
    code: "Clasificación de Herbert",
    image: null,
    prompt:
      "Según la clasificación de Herbert, ¿qué tipo de fractura de escafoides corresponde a una fractura aguda inestable del tercio medio?",
    options: [
      "Tipo A2",
      "Tipo B2",
      "Tipo C",
      "Tipo D1",
    ],
    correct: 1,
    explanation:
      "En la clasificación de Herbert, las fracturas tipo B son agudas inestables; dentro de ellas, el tipo B2 corresponde a la fractura completa del tercio medio del escafoides.",
  },
  {
    id: 235,
    block: "ms",
    code: "Criterios de inestabilidad de Herbert y Fisher",
    image: null,
    prompt:
      "Según los criterios de Herbert y Fisher, ¿cuál de las siguientes características define una fractura de escafoides como inestable?",
    options: [
      "Desplazamiento menor de 1 mm",
      "Ángulo intraescafoideo menor de 35º",
      "Asociación con una luxación perilunar",
      "Localización en el tercio distal",
    ],
    correct: 2,
    explanation:
      "Según los criterios de Herbert y Fisher, una fractura de escafoides se considera inestable si está desplazada más de 1 mm, si el ángulo intraescafoideo supera 35º, si se asocia a luxaciones perilunares o si afecta al polo proximal.",
  },
  {
    id: 236,
    block: "ms",
    code: "Diagnóstico con radiografía negativa",
    image: null,
    prompt:
      "Paciente con dolor en la tabaquera anatómica tras una caída, con radiografías simples normales y sospecha clínica elevada de fractura de escafoides. ¿Cuál es la prueba más eficaz para el diagnóstico temprano en esta situación?",
    options: [
      "Gammagrafía ósea",
      "Ecografía de partes blandas",
      "Radiografías dinámicas en estrés",
      "Resonancia magnética",
    ],
    correct: 3,
    explanation:
      "Cuando la radiografía simple es negativa y la sospecha clínica es alta, la resonancia magnética es la prueba más eficaz para el diagnóstico temprano de la fractura de escafoides, con una sensibilidad cercana al 100%.",
  },
  {
    id: 237,
    block: "ms",
    code: "Fractura estable de escafoides - inmovilización",
    image: null,
    prompt:
      "Paciente con una fractura estable no desplazada del tercio proximal del escafoides que se trata de forma conservadora con yeso. ¿Qué duración aproximada de inmovilización se recomienda?",
    options: [
      "10-12 semanas",
      "3-4 semanas",
      "6-8 semanas",
      "2-3 semanas",
    ],
    correct: 0,
    explanation:
      "En las fracturas estables de escafoides, la duración de la inmovilización depende de la localización; las del tercio proximal requieren un tiempo más prolongado, entre 10 y 12 semanas.",
  },
  {
    id: 238,
    block: "ms",
    code: "Fractura inestable de escafoides - tratamiento",
    image: null,
    prompt:
      "¿Cuál es el tratamiento óptimo en una fractura inestable de escafoides en un paciente activo?",
    options: [
      "Inmovilización con yeso braquial prolongado",
      "Fijación con tornillo canulado de cabeza ocultable",
      "Reducción cerrada y agujas de Kirschner sin yeso",
      "Resección del fragmento proximal",
    ],
    correct: 1,
    explanation:
      "En las fracturas inestables de escafoides, el tratamiento óptimo se lleva a cabo mediante fijación con tornillos canulados de cabeza ocultable, que permite una consolidación fiable y una recuperación funcional más rápida.",
  },
  {
    id: 239,
    block: "ms",
    code: "Pseudoartrosis de escafoides - definición",
    image: null,
    prompt:
      "¿A partir de qué momento tras una fractura de escafoides sin signos de consolidación se considera que existe una pseudoartrosis establecida?",
    options: [
      "3 meses",
      "4 meses",
      "6 meses",
      "12 meses",
    ],
    correct: 2,
    explanation:
      "Se define como retardo de consolidación la ausencia de signos de reparación entre los 3 y 6 meses tras la fractura, y como pseudoartrosis cuando han transcurrido más de 6 meses sin consolidación.",
  },
  {
    id: 240,
    block: "ms",
    code: "Tratamiento de la pseudoartrosis de escafoides",
    image: null,
    prompt:
      "En el tratamiento quirúrgico de la pseudoartrosis sintomática de escafoides sin deformidad en joroba ni defecto óseo significativo, ¿cuál es una opción de tratamiento aceptada?",
    options: [
      "Carpectomía proximal de entrada",
      "Resección del fragmento proximal",
      "Artrodesis de cuatro esquinas",
      "Osteosíntesis sin injerto óseo",
    ],
    correct: 3,
    explanation:
      "En pseudoartrosis sin deformidad en joroba ni defecto óseo relevante, la osteosíntesis sin injerto óseo (habitualmente con tornillo a compresión de cabeza ocultable) es una opción de tratamiento válida; en casos con defecto óseo se recurre al injerto óseo.",
  },
  {
    id: 241,
    block: "ms",
    code: "SNAC estadio II",
    image: null,
    prompt:
      "Paciente con SNAC en estadio II, con afectación de toda la articulación radioescafoidea y de la articulación escafoides-hueso grande, sin colapso carpiano. ¿Cuál es una opción de tratamiento adecuada?",
    options: [
      "Escafoidectomía y artrodesis de cuatro esquinas",
      "Estiloidectomía radial aislada",
      "Denervación de muñeca aislada",
      "Artrodesis total de muñeca",
    ],
    correct: 0,
    explanation:
      "En el SNAC estadio II, con afectación de toda la articulación radioescafoidea y de la articulación escafoides-hueso grande, una opción adecuada es la resección de la primera hilera del carpo o la escafoidectomía con artrodesis de cuatro esquinas.",
  },
  {
    id: 242,
    block: "ms",
    code: "Fractura del gancho del ganchoso",
    image: null,
    prompt:
      "Jugador de pádel presenta dolor en el talón de la mano tras un golpe directo con la raqueta, con radiografía convencional normal. ¿Qué proyección radiográfica es más útil para visualizar una posible fractura del gancho del ganchoso?",
    options: [
      "Proyección oblicua semipronada",
      "Radiografía del túnel del carpo",
      "Proyección de Robert",
      "Radiografía en estrés con puño cerrado",
    ],
    correct: 1,
    explanation:
      "Las fracturas del gancho del ganchoso, típicas de golpes directos en el talón de la mano con raquetas o palos, son difíciles de ver en radiografías convencionales y se visualizan mejor con una radiografía del túnel del carpo o mediante TC.",
  },
  {
    id: 243,
    block: "ms",
    code: "Fractura del piramidal",
    image: null,
    prompt:
      "¿Cuál es el mecanismo habitual de producción de la fractura de la cortical dorsal del piramidal, la segunda fractura del carpo en frecuencia?",
    options: [
      "Compresión axial con la muñeca en flexión palmar",
      "Golpe directo sobre la eminencia hipotenar",
      "Impactación de la estiloides cubital con la muñeca en extensión y desviación cubital",
      "Torsión forzada con la muñeca en pronación",
    ],
    correct: 2,
    explanation:
      "La fractura del piramidal, sobre todo de su cortical dorsal, se produce típicamente por impactación de la estiloides cubital al caer con la muñeca en extensión y desviación cubital, o por arrancamiento en la inserción de los ligamentos dorsales.",
  },
  {
    id: 244,
    block: "ms",
    code: "Síndrome de Fenton",
    image: null,
    prompt:
      "En una fractura-luxación perilunar, el fragmento proximal del hueso grande rota entre 90 y 180 grados asociado a una fractura de escafoides. ¿Cómo se denomina este cuadro?",
    options: [
      "Muñeca SLAC",
      "Muñeca SNAC",
      "Síndrome HALT",
      "Síndrome de Fenton (escafo-grande)",
    ],
    correct: 3,
    explanation:
      "Cuando el fragmento proximal del hueso grande rota entre 90 y 180º en el contexto de una fractura de escafoides asociada, el cuadro se denomina síndrome escafogrande o síndrome de Fenton.",
  },
  {
    id: 245,
    block: "ms",
    code: "Secuencia lesional de Mayfield",
    image: null,
    prompt:
      "Según la secuencia lesional de Mayfield en las lesiones perilunares, ¿qué estructura se lesiona típicamente en la fase 1?",
    options: [
      "El ligamento escafolunar o el escafoides",
      "El ligamento lunopiramidal o el piramidal",
      "El espacio de Poirier con luxación volar del semilunar",
      "La articulación mediocarpiana entre grande y semilunar",
    ],
    correct: 0,
    explanation:
      "En la secuencia lesional de Mayfield, la fase 1 corresponde a la lesión del ligamento escafolunar (generalmente de volar a dorsal) o a una fractura de escafoides, siendo el inicio del patrón lesional perilunar.",
  },
  {
    id: 246,
    block: "ms",
    code: "Prueba de Watson",
    image: null,
    prompt:
      "Durante la prueba de deslizamiento del escafoides o prueba de Watson, se aplica presión palmar sobre el tubérculo del escafoides mientras la muñeca pasa de desviación cubital a desviación radial. ¿Qué hallazgo apoya una lesión del ligamento escafolunar?",
    options: [
      "Ausencia de dolor durante toda la maniobra",
      "Un chasquido doloroso con subluxación dorsal del escafoides",
      "Limitación de la flexión palmar de la muñeca",
      "Crepitación en la articulación radiocubital distal",
    ],
    correct: 1,
    explanation:
      "En la prueba de Watson, la presión sobre el tubérculo del escafoides impide su flexión normal; si el ligamento escafolunar está roto o laxo, se produce una subluxación dorsal del escafoides con un chasquido doloroso característico.",
  },
  {
    id: 247,
    block: "ms",
    code: "Clasificación artroscópica de Geissler",
    image: null,
    prompt:
      "En la clasificación artroscópica de Geissler para las lesiones del ligamento escafolunar, ¿qué grado corresponde a una rotura ligamentosa completa que permite pasar una óptica de 2,7 mm entre el escafoides y el semilunar?",
    options: [
      "Grado I",
      "Grado II",
      "Grado IV",
      "Grado III",
    ],
    correct: 2,
    explanation:
      "En la clasificación de Geissler, el grado IV corresponde a la rotura ligamentosa completa, en la que se puede pasar una óptica de 2,7 mm entre el escafoides y el semilunar.",
  },
  {
    id: 248,
    block: "ms",
    code: "Inestabilidad mediocarpiana palmar",
    image: null,
    prompt:
      "Paciente refiere un resalte brusco y doloroso en la muñeca al realizar la desviación cubital con pronación, sin antecedente traumático claro, con laxitud palmar demostrada en la exploración de la articulación mediocarpiana. ¿Qué entidad es compatible con este cuadro?",
    options: [
      "Inestabilidad escafolunar estática",
      "Inestabilidad radiocubital distal dorsal",
      "Fractura-luxación perilunar crónica",
      "Inestabilidad mediocarpiana palmar (volar)",
    ],
    correct: 3,
    explanation:
      "La inestabilidad mediocarpiana palmar se caracteriza por laxitud de la articulación mediocarpiana con un resalte brusco o 'clunk' doloroso al desviar la muñeca cubitalmente en pronación, sin relación necesaria con un traumatismo previo.",
  },
  {
    id: 249,
    block: "ms",
    code: "Lesión del FCT tipo IB de Palmer",
    image: null,
    prompt:
      "Paciente con una lesión traumática del fibrocartílago triangular tipo IB de Palmer, con rotura periférica en la base de la estiloides cubital. ¿Cuál es el tratamiento más adecuado?",
    options: [
      "Reparación artroscópica, con o sin fijación de la estiloides",
      "Desbridamiento artroscópico simple",
      "Acortamiento cubital aislado",
      "Abstención terapéutica con seguimiento clínico",
    ],
    correct: 0,
    explanation:
      "Las lesiones tipo IB de Palmer, con rotura periférica en la base de la estiloides cubital, se tratan mediante reparación artroscópica, asociada en ocasiones a reducción abierta y fijación interna de la estiloides si es necesario.",
  },
  {
    id: 250,
    block: "ms",
    code: "Técnica de Sauvé-Kapandji",
    image: null,
    prompt:
      "¿En qué consiste la técnica de Sauvé-Kapandji para las lesiones irreparables de la articulación radiocubital distal?",
    options: [
      "Resección aislada de la cabeza del cúbito",
      "Fusión de la cabeza del cúbito al radio con pseudoartrosis del cuello cubital",
      "Artroplastia total de la articulación radiocubital distal",
      "Reanclaje foveal del fibrocartílago triangular",
    ],
    correct: 1,
    explanation:
      "La técnica de Sauvé-Kapandji consiste en la fusión de la cabeza del cúbito al radio junto con la creación de una pseudoartrosis en el cuello del cúbito, lo que permite mantener la pronosupinación evitando el impacto radiocubital.",
  },
  {
    id: 251,
    block: "ms",
    code: "Recién nacido con hendidura central en V",
    image: null,
    prompt:
      "Recién nacido presenta ausencia del dedo medio con una hendidura central en forma de V, sindactilia entre los dedos adyacentes a la hendidura y afectación bilateral. ¿Qué patrón de mano hendida es más compatible con este cuadro?",
    options: [
      "Deformidad atípica en forma de U, con solo pulgar y meñique unidos a la mano",
      "Deformidad típica, de herencia autosómica dominante con penetrancia variable",
      "Simbraquidactilia con deficiencia central esporádica y unilateral",
      "Braquimetacarpia aislada del tercer y quinto metacarpianos",
    ],
    correct: 1,
    explanation:
      "La hendidura central en V, con ausencia del dedo medio, sindactilia de los dedos adyacentes y presentación bilateral, corresponde al patrón típico de mano hendida, de herencia autosómica dominante con penetrancia a menudo incompleta.",
  },
  {
    id: 252,
    block: "ms",
    code: "Dedo en gatillo congénito bilateral",
    image: null,
    prompt:
      "Lactante de 14 meses presenta el pulgar de ambas manos fijo en flexión de la interfalángica, sin antecedente de resolución espontánea desde que se detectó a los 6 meses. ¿Cuál es la conducta más adecuada?",
    options: [
      "Observación hasta los 4 años, ya que la mayoría resuelve espontáneamente a esa edad",
      "Infiltración local con corticoide como primera medida antes de plantear cirugía",
      "Liberación quirúrgica de la polea A1, programada hacia los 2 años de edad",
      "Amputación del pulgar por riesgo de anquilosis definitiva de la interfalángica",
    ],
    correct: 2,
    explanation:
      "Si el dedo en gatillo congénito no se resuelve espontáneamente, el tratamiento es la liberación quirúrgica de la primera polea anular (A1), que se recomienda realizar hacia los 2 años de edad.",
  },
  {
    id: 253,
    block: "ms",
    code: "Recién nacido con antebrazo corto y desviado al radio",
    image: null,
    prompt:
      "Recién nacido presenta un antebrazo corto y desviado hacia el lado radial, con prominencia distal del cúbito y ausencia del pulgar. Antes de plantear el tratamiento local, ¿qué actitud es prioritaria?",
    options: [
      "Descartar síndromes asociados como Holt-Oram, TAR o anemia de Fanconi",
      "Colocar una prótesis funcional antes de los 2 años de edad",
      "Indicar centralización quirúrgica del carpo de forma inmediata",
      "Iniciar directamente un programa de yesos progresivos sin más estudios",
    ],
    correct: 0,
    explanation:
      "Dos tercios de las deficiencias longitudinales del radio se asocian a un síndrome conocido (Holt-Oram, anemia de Fanconi, TAR, VATER), por lo que es obligatorio descartarlos antes de plantear el tratamiento.",
  },
  {
    id: 254,
    block: "ms",
    code: "Separación quirúrgica de sindactilia",
    image: null,
    prompt:
      "Niño de 5 meses presenta sindactilia completa entre el pulgar y el índice de la mano derecha, sin otras alteraciones. ¿Cuál es el momento más adecuado para plantear la separación quirúrgica?",
    options: [
      "Antes de los 6 meses de edad, para permitir un desarrollo adecuado de la pinza",
      "Entre 1 y 2 años, coincidiendo con la separación del resto de dedos",
      "Hacia los 3 años, cuando ya existe una prensión digital madura",
      "Tras la madurez esquelética, para evitar recidivas de la sindactilia",
    ],
    correct: 0,
    explanation:
      "La sindactilia entre el pulgar y el índice se debe separar antes de los 6 meses de edad, junto con la que afecta al espacio entre anular y meñique, para permitir el desarrollo funcional de la pinza.",
  },
  {
    id: 255,
    block: "ms",
    code: "Signo de Linburg en la exploración de la mano",
    image: null,
    prompt:
      "Durante la exploración de la mano, al pedir al paciente que flexione activamente la interfalángica del pulgar, se observa flexión simultánea de la interfalángica distal del índice. ¿A qué corresponde este hallazgo?",
    options: [
      "Efecto cuádriga secundario a una tenodesis del flexor profundo",
      "Anastomosis motora de Martin-Gruber entre mediano y cubital",
      "Signo de Linburg, por conexión aberrante entre FPL y FDP del índice",
      "Fenómeno de intrínseco plus por fibrosis de la musculatura intrínseca",
    ],
    correct: 2,
    explanation:
      "La flexión de la interfalángica distal del segundo dedo al flexionar el pulgar se conoce como signo de Linburg, causado por una conexión aberrante entre el flexor pollicis longus y el flexor digitorum profundus del índice.",
  },
  {
    id: 256,
    block: "ms",
    code: "Clasificación de la hipoplasia del pulgar",
    image: null,
    prompt:
      "En la clasificación de las anomalías del pulgar, un paciente presenta articulación carpometacarpiana inestable además de deficiencia esquelética y anomalías del músculo extrínseco. ¿Qué tipo y tratamiento le corresponden?",
    options: [
      "Tipo II, con plastia de oposición y reconstrucción del ligamento colateral cubital",
      "Tipo IIIA, con reconstrucción de la articulación carpometacarpiana",
      "Tipo IIIB, con pulgarización del índice",
      "Tipo IV o pulgar flotante, con amputación del resto rudimentario",
    ],
    correct: 2,
    explanation:
      "La deficiencia esquelética con anomalías musculotendinosas extrínsecas y articulación carpometacarpiana inestable corresponde al tipo IIIB, cuyo tratamiento es la pulgarización, a diferencia del IIIA con articulación estable, que se reconstruye.",
  },
  {
    id: 257,
    block: "ms",
    code: "Diferencias entre mano zamba radial y cubital",
    image: null,
    prompt:
      "¿Cuál de las siguientes afirmaciones diferencia correctamente la mano zamba cubital de la mano zamba radial?",
    options: [
      "En la mano zamba cubital la muñeca es inestable y el codo suele estar conservado",
      "En la mano zamba cubital las anomalías asociadas se limitan casi al sistema musculoesquelético",
      "La mano zamba cubital se asocia con frecuencia a cardiopatías congénitas",
      "En la mano zamba cubital es más frecuente el defecto total que el parcial",
    ],
    correct: 1,
    explanation:
      "A diferencia de la mano zamba radial, en la que las anomalías asociadas afectan a otros sistemas (cardíacas, hematopoyéticas, gastrointestinales), en la mano zamba cubital las malformaciones asociadas se limitan casi exclusivamente al sistema musculoesquelético.",
  },
  {
    id: 258,
    block: "ms",
    code: "Camptodactilia progresiva en preadolescente",
    image: null,
    prompt:
      "Niña de 9 años presenta una contractura en flexión indolora y progresiva de la interfalángica proximal del quinto dedo, que ha empeorado en los últimos meses sin antecedente en la primera infancia. ¿Qué tipo de camptodactilia es más probable?",
    options: [
      "Tipo I, infantil o congénita, con igual afectación en ambos sexos",
      "Tipo II, preadolescente o adquirida, más frecuente en niñas",
      "Tipo III, con afectación grave de múltiples dedos y síndromes asociados",
      "Deformidad de Kirner, con incurvación volar de la falange distal",
    ],
    correct: 1,
    explanation:
      "La camptodactilia tipo II es la forma preadolescente o adquirida, que se desarrolla entre los 7 y 11 años, predomina en niñas y, a diferencia de la tipo I, no suele mejorar de forma espontánea.",
  },
  {
    id: 259,
    block: "ms",
    code: "Espacios palmares profundos",
    image: null,
    prompt:
      "En un cuadro de infección profunda de la mano localizada entre los tendones flexores y la fascia de los interóseos, separado del espacio tenar por el septo palmar, ¿en qué espacio se localiza la colección?",
    options: [
      "Espacio hipotenar",
      "Espacio tenar",
      "Espacio medio palmar",
      "Espacio subaponeurótico dorsal",
    ],
    correct: 2,
    explanation:
      "El espacio medio palmar se sitúa entre los tendones flexores y la fascia de los interóseos, y queda separado del espacio tenar por el septo o tabique palmar, siendo asiento frecuente de colecciones infecciosas profundas de la mano.",
  },
  {
    id: 260,
    block: "ms",
    code: "Polidactilia postaxial en el recién nacido",
    image: null,
    prompt:
      "Recién nacido presenta un dedo supernumerario en el borde cubital de la mano, rudimentario y unido por un pedículo estrecho, sin estructura ósea definida. Según la clasificación de Temtamy y McKusick, ¿de qué tipo se trata y cuál es el tratamiento?",
    options: [
      "Tipo A, con reconstrucción del ligamento colateral y de las inserciones hipotenares",
      "Tipo B, con extirpación simple del dedo supernumerario",
      "Tipo A, con técnica de Bilhaut-Cloquet para preservar ambos dedos",
      "Tipo B, con estudio genético obligatorio antes de cualquier tratamiento",
    ],
    correct: 1,
    explanation:
      "Un dedo supernumerario rudimentario y pedunculado corresponde al tipo B de la clasificación de Temtamy y McKusick, cuyo tratamiento es la extirpación simple, reservándose la reconstrucción ligamentosa para los dedos tipo A completamente desarrollados.",
  },
  {
    id: 261,
    block: "ms",
    code: "Abordaje volar de los dedos",
    image: null,
    prompt:
      "Se necesita una vía de abordaje volar en un dedo que ofrezca una exposición amplia de los tendones flexores para su reparación. ¿Qué incisión es la más adecuada para este objetivo?",
    options: [
      "Incisión mediolateral, dorsal al paquete vasculonervioso",
      "Incisión de Bruner, en zig-zag siguiendo los pliegues de flexión",
      "Incisión longitudinal en línea media volar sin plastias posteriores",
      "Incisión transversa única a nivel de cada pliegue interfalángico",
    ],
    correct: 1,
    explanation:
      "La incisión de Bruner, realizada en zig-zag sobre los pliegues de flexión, ofrece una excelente exposición de los tendones flexores, mientras que el abordaje mediolateral conlleva más riesgo de lesión de las ramas dorsales del paquete neurovascular.",
  },
  {
    id: 262,
    block: "ms",
    code: "Sección tendinosa en zona II, protocolo de movilización",
    image: null,
    prompt:
      "Paciente joven sufre una sección de ambos tendones flexores en zona II del cuarto dedo. Se realiza reparación con sutura central a 4 hilos más epitendinosa. ¿Qué protocolo postoperatorio es el más adecuado?",
    options: [
      "Inmovilización estricta sin movilización hasta las 6 semanas",
      "Movilización activa precoz dentro de una férula dorsal que mantiene la muñeca flexionada",
      "Movilización contrarresistencia inmediata para evitar adherencias",
      "Movilización pasiva únicamente a partir de la tercera semana",
    ],
    correct: 1,
    explanation:
      "Una sutura con al menos 4 hilos cruzando el core, con resistencia suficiente (mínimo 40N), permite aplicar un protocolo de movilización activa precoz dentro de una férula dorsal que mantiene la muñeca flexionada, mejorando el rango de movimiento respecto a los protocolos pasivos.",
  },
  {
    id: 263,
    block: "ms",
    code: "Herida en trayecto tendinoso con exploración normal",
    image: null,
    prompt:
      "Paciente presenta una herida incisa sobre el trayecto de los tendones flexores del dedo medio. La exploración clínica de la función tendinosa parece normal. ¿Cuál es la conducta más adecuada?",
    options: [
      "Cierre simple de la herida y revisión clínica en consultas en una semana",
      "Exploración quirúrgica de la herida, ya que puede existir una lesión tendinosa parcial pese a una exploración normal",
      "Resonancia magnética urgente para descartar lesión tendinosa antes de decidir el tratamiento",
      "Observación domiciliaria con antiinflamatorios y revisión si aparecen síntomas",
    ],
    correct: 1,
    explanation:
      "En heridas sobre el trayecto de un tendón se recomienda la exploración quirúrgica, ya que pueden existir lesiones tendinosas parciales con una exploración clínica aparentemente normal.",
  },
  {
    id: 264,
    block: "ms",
    code: "Sección del flexor profundo en zona I",
    image: null,
    prompt:
      "Se secciona el tendón flexor profundo de un dedo trifalángico a nivel de zona I, quedando un muñón distal de 1,5 cm. ¿Qué riesgo conlleva un avance excesivo del tendón para su reinserción?",
    options: [
      "Deformidad en cuello de cisne por hiperextensión de la interfalángica proximal",
      "Efecto cuádriga, por tensión desigual sobre el vientre muscular común de los flexores profundos",
      "Rotura del ligamento retinacular oblicuo de Landsmeer",
      "Luxación del tendón extensor hacia el lado cubital de la articulación metacarpofalángica",
    ],
    correct: 1,
    explanation:
      "Una resección o avance excesivos del flexor profundo en zona I puede alterar la cascada digital y limitar la flexión de los tendones profundos restantes por el efecto cuádriga, al aplicar una tensión desigual sobre su vientre muscular común.",
  },
  {
    id: 265,
    block: "ms",
    code: "Reconstrucción tendinosa en dos tiempos",
    image: null,
    prompt:
      "Paciente presenta una lesión tendinosa de larga evolución en un dedo, con fracaso de una cirugía previa y ausencia de sistema de poleas competente. ¿Qué técnica de reconstrucción es la más adecuada?",
    options: [
      "Injerto libre en un tiempo con técnica de Pulvertaft",
      "Reconstrucción en dos tiempos mediante técnica de Hunter",
      "Tenolisis simple para liberar las adherencias existentes",
      "Sutura término-terminal directa tras liberación proximal",
    ],
    correct: 1,
    explanation:
      "Cuando no existen poleas competentes, hay excesiva cicatrización o ha fracasado una cirugía previa, está indicada la reconstrucción en dos tiempos (técnica de Hunter), que primero reconstruye el canal digital con una varilla de silicona y después coloca el injerto tendinoso definitivo.",
  },
  {
    id: 266,
    block: "ms",
    code: "Tenolisis de flexores, momento adecuado",
    image: null,
    prompt:
      "Paciente con una reparación tendinosa previa presenta limitación de la extensión activa por adherencias, con tendón intacto, articulaciones no lesionadas y buen estado neurovascular. ¿En qué momento y bajo qué condición está indicada la tenolisis?",
    options: [
      "Antes del mes de la cirugía, para evitar que las adherencias se consoliden",
      "Entre los 3 y 9 meses postoperatorios, tras alcanzar un tope de rehabilitación insuficiente",
      "Después de los 12 meses, una vez confirmada la ausencia de mejoría definitiva",
      "En cualquier momento, siempre que el paciente lo solicite por limitación funcional",
    ],
    correct: 1,
    explanation:
      "La tenolisis de flexores se realiza preferentemente entre los 3 y 9 meses postoperatorios, cuando se ha alcanzado un tope máximo en la rehabilitación que resulta insuficiente para los requerimientos funcionales, con tendón intacto y buen estado neurovascular.",
  },
  {
    id: 267,
    block: "ms",
    code: "Dedo en martillo tipo I tras lesión deportiva",
    image: null,
    prompt:
      "Jugador de baloncesto recibe un balonazo en la punta de un dedo extendido y presenta un déficit de extensión de la interfalángica distal, sin herida cutánea ni fractura asociada. ¿Cuál es el tratamiento más adecuado?",
    options: [
      "Sutura tendinosa urgente asociada a tenodermodesis",
      "Férula de Stack en extensión de la interfalángica distal durante al menos 6 semanas de forma ininterrumpida",
      "Reconstrucción diferida con injerto tendinoso tras cobertura cutánea",
      "Artrodesis primaria de la interfalángica distal",
    ],
    correct: 1,
    explanation:
      "El dedo en martillo tipo I (avulsión cerrada, sin herida) se trata de forma conservadora con una férula de Stack o de aluminio que mantiene la interfalángica distal en extensión durante al menos 6 semanas, sin retirarla en ningún momento.",
  },
  {
    id: 268,
    block: "ms",
    code: "Deformidad en Boutonniere de larga evolución",
    image: null,
    prompt:
      "Paciente joven presenta una deformidad en Boutonniere de más de 6 semanas de evolución, con la interfalángica proximal rígida y sin capacidad de extensión pasiva completa. ¿Cuál es la actitud más adecuada?",
    options: [
      "Tratamiento conservador con férula en extensión de la interfalángica proximal durante 6-8 semanas",
      "Tratamiento quirúrgico mediante sutura o reinserción de la bandeleta central, asociando fijación con aguja de la interfalángica proximal",
      "Movilización activa precoz sin inmovilización, para evitar mayor rigidez articular",
      "Observación, ya que la deformidad en Boutonniere no suele progresar sin tratamiento",
    ],
    correct: 1,
    explanation:
      "Cuando la deformidad en Boutonniere lleva más de 6 semanas de evolución y la interfalángica proximal está rígida, sin extensión pasiva posible, el tratamiento conservador ya no es eficaz y está indicada la reparación quirúrgica de la bandeleta central con fijación temporal de la articulación.",
  },
  {
    id: 269,
    block: "ms",
    code: "Deformidad en cuello de cisne, contractura de intrínsecos",
    image: null,
    prompt:
      "Paciente presenta una deformidad en cuello de cisne asociada a contractura de la musculatura intrínseca. Tras corregir quirúrgicamente la contractura de los intrínsecos, ¿qué ocurre con la deformidad en cuello de cisne?",
    options: [
      "Se corrige por completo, ya que la contractura de intrínsecos es la causa principal",
      "Persiste, porque la corrección de los intrínsecos no soluciona la hiperextensión de la interfalángica proximal",
      "Empeora de forma progresiva tras la cirugía de los intrínsecos",
      "Se transforma en una deformidad en Boutonniere en la mayoría de los casos",
    ],
    correct: 1,
    explanation:
      "La corrección de la contractura de los músculos intrínsecos no corrige la deformidad en cuello de cisne, ya que esta se debe fundamentalmente a la laxitud de la placa volar, que provoca la hiperextensión de la interfalángica proximal.",
  },
  {
    id: 270,
    block: "ms",
    code: "Mordedura humana con rotura tendinosa",
    image: null,
    prompt:
      "Paciente acude a urgencias tras un golpe en la boca con el puño cerrado, con una herida sobre la articulación metacarpofalángica y sospecha de rotura del tendón extensor. ¿Cuál es la actitud más adecuada?",
    options: [
      "Sutura primaria inmediata del tendón, cierre de la herida y antibióticos orales",
      "Dejar la herida abierta, iniciar antibióticos y reparar el tendón de forma diferida a los 5-7 días",
      "Cierre primario de la herida sin antibióticos, dado el bajo riesgo de infección",
      "Amputación del dedo si hay afectación tendinosa asociada a la mordedura",
    ],
    correct: 1,
    explanation:
      "Ante una mordedura humana sobre la mano, muy contaminada, se recomienda dejar la herida abierta, iniciar antibióticos y reparar el tendón de forma diferida a los 5-7 días, evitando la sutura primaria inmediata.",
  },
  {
    id: 271,
    block: "ms",
    code: "Nódulos en cara dorsal de las IFP y diátesis de Dupuytren",
    image: null,
    prompt:
      "Varón de 45 años con enfermedad de Dupuytren bilateral, historia familiar positiva y nódulos en la cara dorsal de las articulaciones interfalángicas proximales. ¿Qué implica este hallazgo sobre el curso de la enfermedad?",
    options: [
      "Indica un curso más lento y menor riesgo de recidiva tras el tratamiento",
      "Corresponde a la diátesis de Dupuytren, asociada a un curso más agresivo y rápido de la enfermedad",
      "Es un hallazgo casual sin relación con la evolución de la enfermedad de Dupuytren",
      "Indica afectación exclusivamente cutánea sin compromiso de la aponeurosis palmar",
    ],
    correct: 1,
    explanation:
      "Los nódulos de Garrod en la cara dorsal de las interfalángicas proximales, junto con la bilateralidad, la historia familiar, el inicio antes de los 50 años y el sexo masculino, forman parte de la diátesis de Dupuytren, que se asocia a un curso más agresivo y rápido de la enfermedad.",
  },
  {
    id: 272,
    block: "ms",
    code: "Indicación de fasciectomía regional selectiva",
    image: null,
    prompt:
      "Paciente con enfermedad de Dupuytren presenta una contractura de 40º en la articulación metacarpofalángica del cuarto dedo, con incapacidad para apoyar la mano completamente plana sobre una mesa. ¿Qué indica este hallazgo respecto al tratamiento?",
    options: [
      "El test de Hueston positivo, junto con la contractura mayor de 30º en MCF, permite plantear la cirugía",
      "La contractura debe superar los 90º antes de valorar cualquier tratamiento quirúrgico",
      "El test de Hueston solo es válido para valorar la articulación interfalángica proximal",
      "No está indicado el tratamiento quirúrgico hasta confirmar progresión angular durante al menos un año",
    ],
    correct: 0,
    explanation:
      "El test de la superficie de la mesa o test de Hueston (imposibilidad de apoyar la mano completamente plana) orienta sobre el momento de indicar cirugía, y se acepta plantear el tratamiento quirúrgico con una contractura mayor de 30º en la articulación metacarpofalángica.",
  },
  {
    id: 273,
    block: "ms",
    code: "Puñetazo con fractura de cuello del 5º metacarpiano",
    image: null,
    prompt:
      "Paciente golpea una pared con el puño cerrado y presenta una fractura del cuello del 5º metacarpiano con 45º de angulación en el plano sagital. ¿Cuál es la actitud más adecuada?",
    options: [
      "Reducción cerrada y osteosíntesis, ya que cualquier angulación en el 5º metacarpiano requiere cirugía",
      "Tratamiento conservador, dado que esta angulación está dentro del rango tolerado en el 5º metacarpiano",
      "Fijador externo, por tratarse de una fractura inestable de alto riesgo",
      "Amputación funcional del rayo si la angulación supera los 30º",
    ],
    correct: 1,
    explanation:
      "En las fracturas de cuello del 5º metacarpiano se toleran deformidades de hasta 50-70º en el plano sagital, por lo que una angulación de 45º puede tratarse de forma conservadora.",
  },
  {
    id: 274,
    block: "ms",
    code: "Fractura de Bennett, mecanismo y deformidad",
    image: null,
    prompt:
      "Paciente sufre una fractura-luxación de la base del primer metacarpiano tras una fuerza axial con el pulgar flexionado. ¿Qué deformidad característica presenta y por qué se produce?",
    options: [
      "Deformidad en aducción y acortamiento, por la tracción del abductor largo y del aductor del pulgar sobre la diáfisis",
      "Deformidad en abducción y alargamiento, por la tracción del extensor largo del pulgar",
      "Deformidad en supinación pura, sin acortamiento, por integridad del ligamento oblicuo anterior",
      "Deformidad en flexión de la interfalángica, por rotura del flexor largo del pulgar",
    ],
    correct: 0,
    explanation:
      "En la fractura de Bennett, el fragmento volar y cubital queda unido al carpo por los ligamentos volares, mientras que la diáfisis se desplaza en acortamiento y aducción por la tracción del abductor largo y del aductor del pulgar.",
  },
  {
    id: 275,
    block: "ms",
    code: "Lesión del ligamento colateral cubital del pulgar en esquiador",
    image: null,
    prompt:
      "Esquiador sufre una abducción brusca del pulgar tras una caída con el bastón. La exploración muestra más de 30º de inestabilidad radial en extensión y en flexión de 30º de la articulación metacarpofalángica, comparado con el lado contralateral. ¿Cuál es la actitud más adecuada?",
    options: [
      "Inmovilización con yeso en ligera flexión durante 3-6 semanas, por tratarse de una rotura parcial",
      "Tratamiento quirúrgico, dada la alta probabilidad de rotura completa con posible lesión de Stener",
      "Observación sin inmovilización, ya que la inestabilidad en ambas posiciones no indica rotura completa",
      "Artrodesis primaria de la articulación metacarpofalángica del pulgar",
    ],
    correct: 1,
    explanation:
      "Una inestabilidad mayor de 15-30º respecto al lado contralateral, presente tanto en extensión como en flexión de 30º, indica rotura completa del ligamento colateral cubital, con alta probabilidad de lesión de Stener, por lo que está indicado el tratamiento quirúrgico.",
  },
  {
    id: 276,
    block: "ms",
    code: "Luxación metacarpofalángica dorsal compleja",
    image: null,
    prompt:
      "Paciente presenta una luxación dorsal de la articulación metacarpofalángica del dedo índice, con retracción cutánea volar en forma de hoyuelo y angulación dorsal poco llamativa. ¿Qué actitud es la más adecuada?",
    options: [
      "Reducción cerrada mediante tracción longitudinal e hiperextensión progresiva",
      "Reconocer los signos de luxación compleja por interposición de la placa volar y plantear reducción quirúrgica",
      "Inmovilización sin intentar reducción, dado el buen pronóstico de este tipo de luxación",
      "Tracción longitudinal enérgica mantenida hasta conseguir la reducción",
    ],
    correct: 1,
    explanation:
      "El hoyuelo por retracción de la piel volar es un signo patognomónico de luxación metacarpofalángica compleja por interposición de la placa volar (lesión de Kaplan), que suele ser irreductible de forma cerrada y requiere tratamiento quirúrgico; además, la tracción longitudinal está contraindicada porque puede atrapar la placa volar en la articulación.",
  },
  {
    id: 277,
    block: "ms",
    code: "Fractura de Seymour en un niño",
    image: null,
    prompt:
      "Niño de 8 años sufre un traumatismo por aplastamiento en la punta de un dedo, con desplazamiento de la falange distal y una herida periungueal con salida de sangre bajo el pliegue ungueal. ¿Qué diagnóstico debe sospecharse y por qué es importante reconocerlo?",
    options: [
      "Fractura de Seymour, por el riesgo de interposición de la matriz ungueal y desarrollo de osteomielitis si no se trata adecuadamente",
      "Fractura de Bennett pediátrica, que se trata siempre de forma conservadora sin más estudios",
      "Luxación interfalángica distal simple, sin relevancia clínica en el paciente pediátrico",
      "Fractura patológica sobre encondroma, que requiere biopsia urgente",
    ],
    correct: 0,
    explanation:
      "La fractura de Seymour es una fractura-epifisiolisis desplazada de la falange distal con interposición de la matriz ungueal; si no se reconoce y trata adecuadamente puede complicarse con osteomielitis, alteraciones ungueales o trastornos del crecimiento óseo.",
  },
  {
    id: 278,
    block: "ms",
    code: "Signo de Kanavel más precoz",
    image: null,
    prompt:
      "Paciente presenta un dedo tumefacto con dolor a la palpación a lo largo de la vaina flexora y contractura en flexión de las articulaciones interfalángicas, tras una herida punzante previa. ¿Cuál de los signos cardinales de Kanavel es el más precoz y específico para el diagnóstico?",
    options: [
      "Inflamación fusiforme de la vaina tendinosa en su recorrido anatómico",
      "Dolor a la extensión pasiva del dedo",
      "Contractura en flexión de las articulaciones interfalángicas",
      "Dolor severo a la palpación a lo largo de la vaina",
    ],
    correct: 1,
    explanation:
      "De los cuatro signos cardinales de Kanavel de la tenosinovitis aguda supurada, el dolor al hacer extensión pasiva del dedo es el signo más precoz y específico, aunque la inflamación fusiforme de la vaina es el más frecuente.",
  },
  {
    id: 279,
    block: "ms",
    code: "Paroniquia herpética, diagnóstico diferencial con panadizo",
    image: null,
    prompt:
      "Higienista dental presenta dolor y tumefacción periungueal, con aparición a los 10 días de vesículas que confluyen en bullas. ¿Cuál es la actitud terapéutica más adecuada?",
    options: [
      "Drenaje quirúrgico precoz mediante incisión lateral, como en el panadizo bacteriano",
      "Tratamiento con aciclovir y evitar el desbridamiento quirúrgico, por el riesgo de sobreinfección bacteriana",
      "Incisión y drenaje amplios asociados a antibioterapia empírica de amplio espectro",
      "Resección parcial longitudinal de la uña de entrada, sin necesidad de tratamiento antiviral",
    ],
    correct: 1,
    explanation:
      "Ante la sospecha de paroniquia herpética, el drenaje o desbridamiento quirúrgico está contraindicado por el elevado riesgo de infección bacteriana secundaria; el tratamiento con aciclovir puede acortar la duración de los síntomas, que suelen resolverse espontáneamente en 3-4 semanas.",
  },
  {
    id: 280,
    block: "ms",
    code: "Fractura patológica sobre encondroma",
    image: null,
    prompt:
      "Paciente de 30 años sufre una fractura de la falange proximal tras un traumatismo de baja energía. La radiografía muestra una lesión lítica oval con áreas de calcificación en el foco de fractura. ¿Cuál es el diagnóstico más probable y la actitud inicial más adecuada?",
    options: [
      "Encondroma con fractura patológica; se debe tratar primero la fractura antes de plantear el curetaje de la lesión",
      "Quiste óseo aneurismático; requiere amputación del rayo de entrada por su alta tasa de recidiva",
      "Osteosarcoma; se debe derivar de forma urgente para biopsia y estadificación oncológica",
      "Tumor de células gigantes óseo; requiere resección amplia con reconstrucción inmediata",
    ],
    correct: 0,
    explanation:
      "El encondroma es el tumor óseo más frecuente de la mano y se presenta como fractura patológica en el 40-60% de los casos; ante esta situación se recomienda tratar primero la fractura, dejando el curetaje de la lesión para un segundo tiempo.",
  },
  {
    id: 281,
    block: "ms",
    code: "Metástasis distal al codo",
    image: null,
    prompt:
      "Paciente oncológico presenta una lesión osteolítica dolorosa en un metacarpiano, con sospecha de metástasis. Dado que las metástasis distales al codo son infrecuentes, ¿en qué tumor primario se debe pensar con mayor probabilidad?",
    options: [
      "Cáncer de próstata",
      "Cáncer broncopulmonar",
      "Cáncer colorrectal",
      "Cáncer de mama",
    ],
    correct: 1,
    explanation:
      "Las metástasis óseas distales al codo son muy infrecuentes, y cuando aparecen en la mano se debe pensar en primer lugar en un cáncer broncopulmonar como tumor primario.",
  },
  {
    id: 282,
    block: "ms",
    code: "Fractura de falange proximal inestable",
    image: null,
    prompt:
      "Paciente presenta una fractura transversa desplazada de la diáfisis de la falange proximal que, tras la reducción cerrada, vuelve a desplazarse al mover el dedo. ¿Cuál es el tratamiento de elección actual para este tipo de fractura inestable?",
    options: [
      "Cerclaje de esparadrapo al dedo adyacente y movilización inmediata sin más tratamiento",
      "Osteosíntesis con tornillo intramedular y movilización inmediata",
      "Inmovilización con férula en extensión completa de la muñeca y los dedos durante 6 semanas",
      "Amputación del dedo si la fractura no puede estabilizarse de forma cerrada",
    ],
    correct: 1,
    explanation:
      "En las fracturas transversas u oblicuas cortas inestables de la falange proximal, el método de elección actual es la osteosíntesis con tornillos intramedulares de 2 a 3 mm de diámetro, que permite la movilización inmediata del dedo.",
  },
  {
    id: 283,
    block: "ms",
    code: "Fracturas abiertas de la mano según Swanson",
    image: null,
    prompt:
      "Paciente diabético presenta una fractura abierta de un metacarpiano tras una herida contaminada, con más de 24 horas de evolución antes de la atención médica. Según la clasificación de Swanson, ¿qué tipo de fractura es y cómo se maneja la herida?",
    options: [
      "Tipo I, con cierre primario de la herida y sin necesidad de antibióticos",
      "Tipo II, con cierre diferido de la herida y uso de antibióticos",
      "Tipo I, ya que la diabetes no modifica la clasificación de la fractura abierta",
      "Tipo II, pero con cierre primario inmediato de la herida, dado el buen aporte vascular de la mano",
    ],
    correct: 1,
    explanation:
      "La presencia de enfermedad sistémica significativa como la diabetes, junto con el retraso en el tratamiento mayor de 24 horas, clasifica la fractura como tipo II de Swanson, que requiere antibióticos y cierre diferido de la herida.",
  },
  {
    id: 284,
    block: "raquis",
    code: "Desequilibrio sagital",
    image: null,
    prompt:
      "Paciente de 78 años acude por dolor lumbar progresivo y dificultad para mantenerse erguido al caminar. En la exploración se objetiva retroversión pélvica, flexión de rodillas y extensión de tobillos. ¿A qué corresponde este cuadro?",
    options: [
      "A un desequilibrio sagital con fallo de los mecanismos compensadores del raquis",
      "A una radiculopatía lumbar aislada sin componente postural",
      "A una escoliosis idiopática del adolescente sin repercusión funcional",
      "A una estenosis de canal cervical con mielopatía asociada",
    ],
    correct: 0,
    explanation:
      "Los mecanismos compensadores (retrolistesis lumbar, hipocifosis torácica, retroversión pélvica, flexión de rodillas y extensión de tobillos) buscan mantener el equilibrio sagital; cuando fallan, aparece un desequilibrio sagital con alto gasto energético y dolor asociado.",
  },
  {
    id: 285,
    block: "raquis",
    code: "Parámetros espinopélvicos",
    image: null,
    prompt:
      "¿Cómo se relacionan entre sí la incidencia pélvica (IP), la pendiente sacra (SS) y la rotación pélvica (PT)?",
    options: [
      "La IP equivale a la suma de la SS y la PT",
      "La IP es independiente de la SS y la PT",
      "La IP se obtiene restando la PT a la SS",
      "La IP se calcula dividiendo la PT entre la SS",
    ],
    correct: 0,
    explanation:
      "Los tres parámetros espinopélvicos están relacionados mediante la fórmula IP = PT + SS, siendo la IP constante para cada individuo desde la madurez esquelética.",
  },
  {
    id: 286,
    block: "raquis",
    code: "Clasificación de Roussouly",
    image: null,
    prompt:
      "Paciente con un perfil sagital tipo 4 de Roussouly, con incidencia pélvica alta e inclinación sacra superior a 45º. ¿Qué patología es más probable que desarrolle a largo plazo?",
    options: [
      "Espondilolistesis",
      "Hernia discal cervical",
      "Patología degenerativa lumbar típica del perfil tipo 3",
      "Escoliosis congénita torácica",
    ],
    correct: 0,
    explanation:
      "El tipo 4 de Roussouly, con incidencia pélvica alta e inclinación sacra elevada, es el perfil más propenso a la espondilolistesis, mientras que el tipo 3 es el menos propenso a la patología degenerativa lumbar.",
  },
  {
    id: 287,
    block: "raquis",
    code: "Anomalías transicionales lumbosacras",
    image: null,
    prompt:
      "Sobre las anomalías transicionales a nivel lumbosacro, ¿cuál de las siguientes afirmaciones es correcta?",
    options: [
      "La sacralización de L5 es más frecuente que la lumbarización de S1",
      "La lumbarización de S1 es más frecuente que la sacralización de L5",
      "Ambas anomalías carecen de relevancia para la planificación quirúrgica",
      "Solo pueden diagnosticarse mediante resonancia magnética",
    ],
    correct: 0,
    explanation:
      "La sacralización de L5 se describe en el 2-15% de la población general, más frecuente que la lumbarización de S1 (3-7%); su conocimiento es relevante para la planificación operatoria, apoyándose en la TC ante la sospecha.",
  },
  {
    id: 288,
    block: "raquis",
    code: "Morfología de T1",
    image: null,
    prompt:
      "¿Qué característica diferencia a la vértebra T1 del resto de vértebras torácicas?",
    options: [
      "Tiene una morfología similar a una vértebra cervical, con apófisis espinosa prominente",
      "Carece de apófisis espinosa identificable",
      "Presenta articulaciones costotransversas dobles a cada lado",
      "Sus pedículos son de menor tamaño que los de T11 y T12",
    ],
    correct: 0,
    explanation:
      "La vértebra T1 tiene una morfología similar a una vértebra cervical, con una apófisis espinosa prominente y de mayor longitud que la de C7.",
  },
  {
    id: 289,
    block: "raquis",
    code: "Particularidades vertebrales torácicas",
    image: null,
    prompt:
      "¿Qué particularidad anatómica comparten las vértebras T11 y T12?",
    options: [
      "No presentan articulaciones costotransversas",
      "Tienen pedículos más pequeños que los de L1 y L2",
      "Presentan una apófisis espinosa más larga que la de C7",
      "Carecen de apófisis transversas identificables",
    ],
    correct: 0,
    explanation:
      "Las vértebras T11 y T12 se caracterizan por no presentar articulaciones costotransversas, a diferencia del resto de vértebras torácicas.",
  },
  {
    id: 290,
    block: "raquis",
    code: "Maniobra de Spurling",
    image: null,
    prompt:
      "Paciente con dolor radicular cervical que se reproduce al realizar una compresión axial del cuello colocado en extensión y flexión lateral hacia el lado sintomático. ¿Qué maniobra se ha reproducido y qué especificidad tiene para la radiculopatía cervical?",
    options: [
      "Maniobra de Spurling, con una especificidad del 74%",
      "Test de Lasegue, con una sensibilidad del 94%",
      "Signo de Babinski, con una especificidad del 100%",
      "Maniobra de Adson, con una especificidad del 50%",
    ],
    correct: 0,
    explanation:
      "La maniobra de Spurling es positiva cuando la compresión axial del cuello en extensión y flexión lateral reproduce el dolor radicular, con una especificidad del 74% para radiculopatía cervical.",
  },
  {
    id: 291,
    block: "raquis",
    code: "Test de Lasegue",
    image: null,
    prompt:
      "¿Cuál de las siguientes afirmaciones sobre el test de Lasegue es correcta?",
    options: [
      "Se considera positivo si el dolor radicular aparece al elevar la pierna entre 30 y 45º con la rodilla en extensión",
      "Evalúa principalmente las raíces cervicales altas",
      "Se realiza flexionando la rodilla para eliminar la tensión del ciático",
      "Solo es válido si se reproduce estando el paciente en decúbito prono",
    ],
    correct: 0,
    explanation:
      "El test de Lasegue evalúa las raíces lumbares bajas y es positivo cuando la elevación de la pierna entre 30-45º con la rodilla en extensión reproduce el dolor radicular; tiene una sensibilidad del 94%.",
  },
  {
    id: 292,
    block: "raquis",
    code: "Signos de primera motoneurona",
    image: null,
    prompt:
      "Sobre los signos de lesión de primera motoneurona explorables en patología del raquis, ¿qué afirmación es correcta?",
    options: [
      "El signo de Babinski y el clonus tienen ambos una especificidad del 100%",
      "El clonus aparece de forma característica en lesiones de segunda motoneurona",
      "El signo de Babinski se explora mediante compresión axial cervical",
      "Ninguno de los dos signos aporta valor diagnóstico en la mielopatía cervical",
    ],
    correct: 0,
    explanation:
      "Tanto el signo de Babinski (extensión de los dedos del pie y tobillo tras estimular la región plantar) como el clonus (contracción rítmica involuntaria con la dorsiflexión forzada del tobillo) presentan una especificidad del 100% para lesión de primera motoneurona.",
  },
  {
    id: 293,
    block: "raquis",
    code: "Marcha con base ancha",
    image: null,
    prompt:
      "Paciente que presenta una marcha con base de sustentación ampliada e inestabilidad al caminar. ¿Qué proceso debe sospecharse principalmente?",
    options: [
      "Mielopatía cervical o hidrocefalia",
      "Debilidad aislada de la musculatura abductora de la cadera",
      "Lesión del nervio ciático poplíteo externo",
      "Espondilolistesis lumbar baja asintomática",
    ],
    correct: 0,
    explanation:
      "Una marcha con base ancha es característica de desórdenes neurológicos como la mielopatía cervical o la hidrocefalia, a diferencia de la marcha de Trendelenburg o la marcha parkinsoniana.",
  },
  {
    id: 294,
    block: "raquis",
    code: "Marcha de Trendelenburg",
    image: null,
    prompt:
      "La marcha de Trendelenburg se caracteriza fundamentalmente por:",
    options: [
      "Caída de la cadera contralateral por debilidad de la musculatura abductora de la cadera afecta",
      "Elevación exagerada de la cadera del lado afecto durante el apoyo",
      "Bloqueo en extensión de la rodilla por debilidad del cuádriceps",
      "Flexión plantar forzada del tobillo durante la fase de balanceo",
    ],
    correct: 0,
    explanation:
      "La marcha de Trendelenburg se debe a la debilidad de la musculatura abductora de la cadera, provocando caída de la cadera contralateral y un apoyo más prolongado sobre la extremidad afecta.",
  },
  {
    id: 295,
    block: "raquis",
    code: "Abordaje anterior cervical",
    image: null,
    prompt:
      "En el abordaje anterior de la columna cervical, ¿por qué se prefiere habitualmente el lado izquierdo?",
    options: [
      "Para reducir el riesgo de lesión del nervio laríngeo recurrente",
      "Para evitar la lesión de la arteria vertebral",
      "Para facilitar el acceso directo a la arteria carótida",
      "Para minimizar el riesgo de lesión del ganglio estrellado",
    ],
    correct: 0,
    explanation:
      "El trayecto del nervio laríngeo recurrente es más predecible en el lado izquierdo, por lo que el abordaje anterior cervical izquierdo reduce el riesgo de lesionarlo.",
  },
  {
    id: 296,
    block: "raquis",
    code: "Referencias anatómicas cervicales",
    image: null,
    prompt:
      "En el abordaje anterior de la columna cervical, el cartílago tiroides se utiliza como referencia de superficie de qué nivel vertebral?",
    options: [
      "C4-C5",
      "C2-C3",
      "C7-T1",
      "C3-C4",
    ],
    correct: 0,
    explanation:
      "El cartílago tiroides constituye una referencia anatómica de superficie útil para localizar el nivel C4-C5 durante el abordaje anterior de la columna cervical.",
  },
  {
    id: 297,
    block: "raquis",
    code: "Toracotomía",
    image: null,
    prompt:
      "El abordaje mediante toracotomía para la columna torácica permite acceder habitualmente a los niveles comprendidos entre:",
    options: [
      "T4 y T9",
      "C7 y T4",
      "T9 y L5",
      "T1 y T4",
    ],
    correct: 0,
    explanation:
      "La toracotomía permite acceder a niveles torácicos entre T4 y T9, empleándose habitualmente en cirugía tumoral y de corrección de deformidades, con colaboración de cirugía torácica.",
  },
  {
    id: 298,
    block: "raquis",
    code: "Tóraco-freno-lumbotomía",
    image: null,
    prompt:
      "Paciente con una fractura torácica baja que precisa descompresión y soporte anterior a nivel de la charnela toracolumbar. ¿Qué abordaje resulta más adecuado y en qué posición se coloca preferentemente al paciente?",
    options: [
      "Tóraco-freno-lumbotomía, en decúbito lateral izquierdo",
      "Costotransversectomía, en decúbito prono",
      "Abordaje lateral transpsoas, en decúbito lateral derecho",
      "Toracotomía simple, en decúbito supino",
    ],
    correct: 0,
    explanation:
      "La tóraco-freno-lumbotomía permite el acceso entre T9 y L5, con relevancia en la charnela toracolumbar; se prefiere el decúbito lateral izquierdo para evitar daños en los grandes vasos.",
  },
  {
    id: 299,
    block: "raquis",
    code: "Costotransversectomía (Capener)",
    image: null,
    prompt:
      "¿Cuál es la principal limitación del abordaje de Capener (costotransversectomía) para el tratamiento de fracturas dorsales?",
    options: [
      "Requiere sacrificar la raíz nerviosa saliente de la vértebra intervenida",
      "No permite acceder a la vértebra afectada",
      "Precisa de forma obligatoria la colaboración de cirugía torácica",
      "Solo puede realizarse con el paciente en decúbito supino",
    ],
    correct: 0,
    explanation:
      "Una de las principales limitaciones del abordaje de Capener es que, al resecar la costilla y la apófisis transversa para acceder a la vértebra, se requiere sacrificar la raíz nerviosa saliente de esa vértebra.",
  },
  {
    id: 300,
    block: "raquis",
    code: "Abordaje lateral transpsoas",
    image: null,
    prompt:
      "Tras un abordaje lateral transpsoas para artrodesis intersomática lumbar, el paciente presenta debilidad para la flexión de la cadera en el postoperatorio inmediato. ¿Cuál es la causa más probable?",
    options: [
      "El debilitamiento del músculo psoas ilíaco durante la disección del abordaje",
      "Una lesión del nervio femorocutáneo lateral",
      "Una sección del ligamento longitudinal anterior",
      "Una lesión del nervio obturador",
    ],
    correct: 0,
    explanation:
      "El abordaje lateral transpsoas debilita el músculo psoas al atravesarlo, lo que puede traducirse en debilidad de la flexión de cadera en el postoperatorio inmediato; también existe riesgo neurológico del plexo lumbosacro.",
  },
  {
    id: 301,
    block: "raquis",
    code: "Abordaje endoscópico de columna",
    image: null,
    prompt:
      "Sobre el abordaje endoscópico de columna, empleado sobre todo en la enfermedad degenerativa lumbar, ¿cuál es su principal limitación como técnica?",
    options: [
      "La curva de aprendizaje del cirujano",
      "La imposibilidad de tratar hernias discales lumbares",
      "La necesidad de anestesia general prolongada en todos los casos",
      "Su uso restringido, en la práctica, a la columna cervical",
    ],
    correct: 0,
    explanation:
      "El abordaje endoscópico emplea dilatadores y un endoscopio para visualizar las estructuras neurales, principalmente en hernias discales y estenosis de canal lumbar; su principal limitación es la curva de aprendizaje del cirujano.",
  },
  {
    id: 302,
    block: "raquis",
    code: "Ligamento amarillo",
    image: null,
    prompt:
      "El ligamento amarillo se sitúa:",
    options: [
      "Entre dos láminas vertebrales",
      "Entre dos apófisis transversas",
      "Por delante del cuerpo vertebral",
      "Entre dos apófisis espinosas",
    ],
    correct: 0,
    explanation:
      "El ligamento amarillo conecta las láminas de vértebras adyacentes, situándose entre dos láminas vertebrales.",
  },
  {
    id: 303,
    block: "raquis",
    code: "Presión discal según postura",
    image: null,
    prompt:
      "Un paciente refiere que su dolor lumbar empeora claramente al sentarse en comparación con estar de pie. ¿Qué hallazgo biomecánico explica mejor esta observación?",
    options: [
      "La presión sobre el disco intervertebral es mayor en sedestación que en bipedestación",
      "La presión discal es equivalente en ambas posturas",
      "La sedestación reduce la carga axial sobre el disco intervertebral",
      "El empeoramiento en sedestación indica de forma aislada patología facetaria",
    ],
    correct: 0,
    explanation:
      "La presión intradiscal es mayor en sedestación que en bipedestación, lo que explica que muchos pacientes con patología discal refieran empeoramiento del dolor al sentarse.",
  },
  {
    id: 304,
    block: "raquis",
    code: "Columna media de Denis",
    image: null,
    prompt:
      "Según la teoría de las tres columnas de Denis, ¿cuál de los siguientes elementos NO forma parte de la columna media?",
    options: [
      "El agujero de conjunción (intervertebral)",
      "La pared posterior del cuerpo vertebral",
      "La parte posterior del disco intervertebral",
      "El ligamento vertebral común posterior",
    ],
    correct: 0,
    explanation:
      "El agujero de conjunción no forma parte de la columna media de Denis, que está constituida por la pared posterior del cuerpo vertebral, la parte posterior del disco intervertebral y el ligamento longitudinal posterior.",
  },
  {
    id: 305,
    block: "raquis",
    code: "Músculo cuadrado lumbar",
    image: null,
    prompt:
      "El músculo cuadrado lumbar se inserta en la cresta ilíaca y se origina en:",
    options: [
      "La 12ª costilla y las apófisis transversas lumbares",
      "La 12ª costilla de forma aislada",
      "Las apófisis transversas lumbares de forma aislada",
      "Las costillas 10ª, 11ª y 12ª",
    ],
    correct: 0,
    explanation:
      "El músculo cuadrado lumbar se inserta en la cresta ilíaca y tiene su origen en la 12ª costilla y en las apófisis transversas de las vértebras lumbares.",
  },
  {
    id: 306,
    block: "raquis",
    code: "Sensibilidad vibratoria",
    image: null,
    prompt:
      "La sensibilidad vibratoria asciende por la médula espinal:",
    options: [
      "Por el mismo lado, a través de los cordones posteriores",
      "Por el lado contrario, a través de los haces espinotalámicos",
      "Por el mismo lado, a través de los haces espinotalámicos",
      "Por el lado contrario, a través de los cordones posteriores",
    ],
    correct: 0,
    explanation:
      "La sensibilidad vibratoria y propioceptiva asciende de forma ipsilateral a través de los cordones posteriores de la médula espinal.",
  },
  {
    id: 307,
    block: "raquis",
    code: "Abordaje anterior transperitoneal",
    image: null,
    prompt:
      "El abordaje anterior transperitoneal de la columna lumbar se emplea sobre todo para:",
    options: [
      "La fusión anterior a nivel L5-S1",
      "La artrodesis posterolateral instrumentada",
      "La descompresión de hernias discales cervicales",
      "El tratamiento de fracturas dorsales altas",
    ],
    correct: 0,
    explanation:
      "El abordaje anterior transperitoneal de la columna lumbar se utiliza sobre todo para la fusión anterior a nivel L5-S1.",
  },
  {
    id: 308,
    block: "raquis",
    code: "Traumatismo cervical en espondiloartropatía",
    image: null,
    prompt:
      "Paciente con hiperostosis esquelética idiopática difusa sufre una caída desde su propia altura y presenta dolor cervical, con una radiografía simple sin alteraciones claras. ¿Cuál es la actitud más adecuada?",
    options: [
      "Solicitar una TC cervical, dado el riesgo de fractura inestable pese al mecanismo de baja energía",
      "Descartar patología ósea relevante al tratarse de un traumatismo de baja energía",
      "Indicar reposo y analgesia sin pruebas de imagen adicionales",
      "Repetir la radiografía simple en dos semanas si el dolor persiste",
    ],
    correct: 0,
    explanation:
      "En pacientes con espondiloartropatías como la hiperostosis esquelética idiopática difusa, incluso los traumatismos menores pueden producir fracturas inestables, por lo que está indicada la TC.",
  },
  {
    id: 309,
    block: "raquis",
    code: "Criterios de White y Panjabi",
    image: null,
    prompt:
      "Según los criterios de White y Panjabi, una lesión cervical se considera inestable cuando la puntuación de inestabilidad es:",
    options: [
      "Igual o superior a 5 puntos",
      "Igual o superior a 3 puntos",
      "Igual o inferior a 5 puntos",
      "Igual o superior a 8 puntos",
    ],
    correct: 0,
    explanation:
      "Los criterios de White y Panjabi establecen que una puntuación igual o superior a 5 puntos indica inestabilidad de la lesión cervical.",
  },
  {
    id: 310,
    block: "raquis",
    code: "Indicación de Rx cervical",
    image: null,
    prompt:
      "Paciente consciente y alerta tras un traumatismo cervical de bajo riesgo, sin dolor ni molestias en el cuello y sin otras lesiones asociadas. ¿Qué actitud diagnóstica es la más adecuada respecto a la radiografía cervical?",
    options: [
      "No está indicada la realización de radiografías cervicales en este contexto",
      "Debe realizarse una serie completa de radiografías cervicales de forma protocolizada",
      "Se debe indicar directamente una RMN cervical",
      "Se debe colocar un collarín rígido durante 6 semanas sin más pruebas",
    ],
    correct: 0,
    explanation:
      "No está indicado realizar radiografías cervicales en pacientes con traumatismos de bajo riesgo, despiertos y alertas, sin dolor cervical ni otras lesiones asociadas.",
  },
  {
    id: 311,
    block: "raquis",
    code: "Técnica de imagen de elección cervical",
    image: null,
    prompt:
      "En un paciente con traumatismo cervical, ¿cuál es la técnica de imagen de elección para la valoración morfológica de la fractura?",
    options: [
      "La tomografía computarizada (TC)",
      "La resonancia magnética (RMN)",
      "La radiografía dinámica en flexo-extensión",
      "La fluoroscopia dinámica",
    ],
    correct: 0,
    explanation:
      "La TC es la técnica de imagen de elección para la valoración morfológica de la fractura cervical, siendo muy sensible para detectar fracturas facetarias.",
  },
  {
    id: 312,
    block: "raquis",
    code: "RMN en lesión medular cervical",
    image: null,
    prompt:
      "En un paciente con lesión medular traumática cervical, ¿qué papel tiene la RMN una vez realizada la TC inicial?",
    options: [
      "Puede modificar la planificación quirúrgica en un porcentaje muy alto de los casos",
      "No aporta información adicional relevante a la ya obtenida con la TC",
      "Solo tiene utilidad si el paciente no presenta ningún déficit neurológico",
      "Sustituye por completo a la TC en la valoración inicial",
    ],
    correct: 0,
    explanation:
      "En pacientes con lesión medular traumática cervical, la RMN es necesaria además de la TC, ya que puede modificar la planificación quirúrgica en un 93% de los casos.",
  },
  {
    id: 313,
    block: "raquis",
    code: "Fractura de cóndilo occipital",
    image: null,
    prompt:
      "Paciente politraumatizado con dolor en la región de la nuca y afectación de los pares craneales IX, X y XI tras un traumatismo de alta energía, con radiografía simple normal. ¿Qué se debe sospechar y cómo se confirma el diagnóstico?",
    options: [
      "Una fractura de los cóndilos occipitales, que se diagnostica mediante TC",
      "Una fractura del arco posterior del atlas, visible en la radiografía transoral",
      "Una espondilolistesis traumática de C2, diagnosticada con Rx lateral",
      "Una subluxación rotatoria atloaxoidea, diagnosticada con RMN",
    ],
    correct: 0,
    explanation:
      "Las fracturas de los cóndilos occipitales pasan desapercibidas en la radiografía convencional y se diagnostican mediante TC; pueden asociar afectación de pares craneales, sobre todo IX, X y XI.",
  },
  {
    id: 314,
    block: "raquis",
    code: "Clasificación de Anderson y Montesano",
    image: null,
    prompt:
      "Según la clasificación de Anderson y Montesano, una fractura del cóndilo occipital que se extiende hasta la base del cráneo, producida por un mecanismo de cizalladura, corresponde al tipo:",
    options: [
      "Tipo II, con frecuencia inestable",
      "Tipo I, habitualmente estable",
      "Tipo III, por avulsión del ligamento alar",
      "Tipo IV, con luxación occipito-atloidea asociada",
    ],
    correct: 0,
    explanation:
      "El tipo II de Anderson y Montesano se produce por cizalladura, se extiende a la base del cráneo y con frecuencia es inestable, a diferencia del tipo I, generalmente estable.",
  },
  {
    id: 315,
    block: "raquis",
    code: "Método de Harris",
    image: null,
    prompt:
      "En la valoración radiológica de la luxación occipito-atloidea, el método de Harris se considera anormal cuando la distancia basión-odontoides o basión-eje posterior supera:",
    options: [
      "12 mm",
      "4 mm",
      "7 mm",
      "20 mm",
    ],
    correct: 0,
    explanation:
      "El método de Harris considera anormal una distancia basión-eje posterior superior a 12 mm y una distancia basión-odontoides mayor de 12 mm (o menor de 4 mm).",
  },
  {
    id: 316,
    block: "raquis",
    code: "Fractura de Jefferson",
    image: null,
    prompt:
      "Paciente que, tras un traumatismo por compresión axial, presenta una fractura del atlas en la que el anillo se fragmenta separando las masas laterales de forma simétrica. ¿Cómo se denomina esta lesión según la clasificación de Levine?",
    options: [
      "Fractura-estallido o fractura de Jefferson",
      "Fractura aislada del arco posterior",
      "Fractura conminuta de una masa lateral",
      "Fractura aislada de la apófisis transversa",
    ],
    correct: 0,
    explanation:
      "La fractura-estallido del atlas por compresión axial simétrica, que separa las masas laterales, se conoce como fractura de Jefferson.",
  },
  {
    id: 317,
    block: "raquis",
    code: "Integridad del ligamento transverso",
    image: null,
    prompt:
      "¿Cuál de los siguientes hallazgos NO se emplea para valorar la integridad del ligamento transverso del atlas?",
    options: [
      "La distancia entre el basión y el extremo proximal de la odontoides",
      "El desplazamiento de las masas laterales en la Rx AP mayor de 7 mm",
      "La distancia atlanto-odontoidea en la Rx lateral mayor de 4 mm",
      "La valoración directa mediante RMN",
    ],
    correct: 0,
    explanation:
      "La distancia basión-odontoides corresponde al método de Harris, empleado para valorar la luxación occipito-atloidea, y no para valorar la integridad del ligamento transverso del atlas.",
  },
  {
    id: 318,
    block: "raquis",
    code: "Inestabilidad atlo-axoidea",
    image: null,
    prompt:
      "Un paciente presenta una disociación atloaxoidea vertical multiplanar, análoga a la disociación craneocervical. Según la clasificación de inestabilidad atlo-axoidea, ¿a qué tipo corresponde?",
    options: [
      "Inestabilidad tipo C",
      "Inestabilidad tipo A",
      "Inestabilidad tipo B",
      "Subluxación rotatoria aislada",
    ],
    correct: 0,
    explanation:
      "La inestabilidad tipo C corresponde a la disociación atloaxoidea vertical multiplanar, análoga a la disociación craneocervical, y se trata de forma similar a esta.",
  },
  {
    id: 319,
    block: "raquis",
    code: "Síndrome de Grisel",
    image: null,
    prompt:
      "Niño con dolor cervical alto y tortícolis tras un absceso retrofaríngeo, sin antecedente traumático claro. La Rx transoral muestra una situación asimétrica de las masas laterales respecto a la odontoides, con una distancia atlas-odontoides de 4 mm. ¿Qué diagnóstico y tratamiento inicial son los más adecuados?",
    options: [
      "Subluxación rotatoria atloaxoidea tipo II (síndrome de Grisel), con collarín 7 días como tratamiento inicial",
      "Fractura de Jefferson, con halo-chaleco como tratamiento inicial",
      "Luxación occipito-atloidea tipo 1, con artrodesis urgente",
      "Fractura de odontoides tipo III, con ortesis cervical durante 6 semanas",
    ],
    correct: 0,
    explanation:
      "El síndrome de Grisel es una subluxación rotatoria atloaxoidea secundaria a laxitud ligamentosa por infección de cabeza o cuello; con una distancia atlas-odontoides de 3-5 mm corresponde al tipo II de Fielding y Hawkins, tratándose inicialmente con collarín 7 días.",
  },
  {
    id: 320,
    block: "raquis",
    code: "Fractura de odontoides tipo II en el anciano",
    image: null,
    prompt:
      "Paciente de 78 años con una fractura de la apófisis odontoides tipo II de Anderson y D'Alonzo. ¿Qué factor condiciona especialmente la elección del tratamiento en este grupo de edad?",
    options: [
      "La mala tolerancia del halo-chaleco en el anciano, que favorece considerar la artrodesis C1-C2 precoz",
      "La ausencia de riesgo de pseudoartrosis de la odontoides a esta edad",
      "La contraindicación absoluta de cualquier tratamiento quirúrgico en mayores de 70 años",
      "La necesidad de tratamiento conservador con collarín blando como única opción",
    ],
    correct: 0,
    explanation:
      "Los ancianos toleran mal el halo, por lo que en las fracturas tipo II debe considerarse la artrodesis C1-C2 precoz; la tasa de mortalidad al año en mayores de 65 años es del 31% con independencia del tratamiento elegido.",
  },
  {
    id: 321,
    block: "raquis",
    code: "Espondilolistesis traumática de C2",
    image: null,
    prompt:
      "Paciente con una fractura bilateral de la pars interarticularis de C2 desplazada más de 3 mm, secundaria a hiperextensión y carga axial con flexión de rebote. Según la clasificación de Levine-Edwards, ¿a qué tipo corresponde y cuál es su tratamiento inicial habitual?",
    options: [
      "Tipo II, con halo u ortesis cervical como tratamiento inicial",
      "Tipo I, con tratamiento quirúrgico urgente por vía anterior",
      "Tipo III, con collarín blando durante 2 semanas",
      "Tipo IIa, con tracción cervical mantenida como único tratamiento",
    ],
    correct: 0,
    explanation:
      "La fractura desplazada más de 3 mm por hiperextensión y carga axial con flexión de rebote corresponde al tipo II de Levine-Edwards; la mayoría de estas lesiones se tratan mediante inmovilización externa con halo u ortesis cervical.",
  },
  {
    id: 322,
    block: "raquis",
    code: "Clasificación subaxial cervical",
    image: null,
    prompt:
      "El sistema de clasificación SLIC (Subaxial Injury Classification) para las lesiones cervicales subaxiales ha sido reemplazado mayoritariamente por:",
    options: [
      "La clasificación AO Cervical Spine",
      "La clasificación de Levine-Edwards",
      "La clasificación de Anderson y Montesano",
      "La clasificación de Fielding y Hawkins",
    ],
    correct: 0,
    explanation:
      "La clasificación AO Cervical Spine ha reemplazado mayoritariamente al sistema SLIC, que presentaba una evaluación simplista del componente morfológico de la fractura.",
  },
  {
    id: 323,
    block: "raquis",
    code: "Epidemiología toracolumbar",
    image: null,
    prompt:
      "Las fracturas de la unión toracolumbar (T11-L2) suponen más del 90% de las fracturas torácicas y lumbares. ¿A qué se debe principalmente esta elevada frecuencia?",
    options: [
      "A que esta zona constituye una transición biomecánica entre la caja torácica rígida y la columna lumbar más flexible",
      "A que es la zona con mayor densidad ósea de toda la columna",
      "A que carece de ligamentos estabilizadores en su cara anterior",
      "A que es la zona con menor superficie de apoyo vertebral de la columna",
    ],
    correct: 0,
    explanation:
      "La unión toracolumbar concentra la mayoría de las fracturas por localizarse en la zona de transición biomecánica entre la caja torácica rígida y la columna lumbar, más flexible.",
  },
  {
    id: 324,
    block: "raquis",
    code: "Concepto de estabilidad raquídea",
    image: null,
    prompt:
      "Según el concepto de estabilidad raquídea, se considera que el raquis es estable cuando:",
    options: [
      "Puede resistir cargas fisiológicas sin desarrollar lesión neurológica, deformidad inaceptable o dolor crónico por movimiento anormal",
      "No presenta ninguna fractura visible en la radiografía simple",
      "El paciente no refiere dolor en el momento de la exploración inicial",
      "Las columnas anterior y media están intactas, con independencia de la columna posterior",
    ],
    correct: 0,
    explanation:
      "El raquis se considera estable si puede resistir cargas fisiológicas sin desarrollar irritación o lesión neurológica, deformidad inaceptable o dolor crónico debido a un movimiento anormal.",
  },
  {
    id: 325,
    block: "raquis",
    code: "Fractura de Chance",
    image: null,
    prompt:
      "Paciente que sufre una lesión por flexión-distracción en la que la línea de fractura discurre solo a través del hueso, sin afectación de partes blandas. ¿Cómo se denomina esta lesión?",
    options: [
      "Fractura de Chance",
      "Fractura en lágrima",
      "Fractura de Jefferson",
      "Fractura del ahorcado",
    ],
    correct: 0,
    explanation:
      "Cuando la línea de una lesión por flexión-distracción ocurre solo por zona ósea, se denomina fractura de Chance.",
  },
  {
    id: 326,
    block: "raquis",
    code: "Clasificación de McCormack",
    image: null,
    prompt:
      "El sistema de clasificación de McCormack ayuda a predecir la necesidad de soporte estructural anterior en función de la conminución vertebral, el desplazamiento axial y la corrección de la cifosis. Una fractura con una puntuación igual o mayor a 7 puntos:",
    options: [
      "Requiere un soporte anterior",
      "Puede tratarse mediante un abordaje posterior aislado",
      "No precisa ningún tipo de estabilización quirúrgica",
      "Se trata mediante inmovilización externa sin cirugía",
    ],
    correct: 0,
    explanation:
      "Según McCormack, las fracturas con gran conminución y una puntuación igual o mayor a 7 requieren un soporte estructural anterior, mientras que puntuaciones iguales o menores a 6 pueden tratarse por vía posterior.",
  },
  {
    id: 327,
    block: "raquis",
    code: "Clasificación TLICS",
    image: null,
    prompt:
      "En la clasificación TLICS (Thoracolumbar Injury Classification and Severity Score), una puntuación total de 6 puntos indica:",
    options: [
      "Tratamiento quirúrgico",
      "Tratamiento conservador",
      "Que la decisión puede ser quirúrgica o conservadora de forma indistinta",
      "Que se requieren más pruebas de imagen antes de decidir el tratamiento",
    ],
    correct: 0,
    explanation:
      "Según la clasificación TLICS, una puntuación igual o superior a 5 indica tratamiento quirúrgico, por lo que una puntuación de 6 corresponde a esta categoría.",
  },
  {
    id: 328,
    block: "raquis",
    code: "Fractura por estallido AOSpine A4",
    image: null,
    prompt:
      "Paciente con una fractura vertebral con afectación de ambos platillos y del muro posterior, sin déficit neurológico. Según la clasificación AOSpine toracolumbar, ¿a qué tipo morfológico corresponde y cuál es la actitud terapéutica más debatida?",
    options: [
      "Tipo A4, con un manejo controvertido entre tratamiento quirúrgico y conservador",
      "Tipo A1, con indicación quirúrgica clara y bien establecida",
      "Tipo B2, que requiere artrodesis por vía anterior de forma protocolizada",
      "Tipo C, con indicación de doble abordaje como pauta habitual",
    ],
    correct: 0,
    explanation:
      "La fractura estallido con afectación de ambos platillos y del muro posterior corresponde al tipo A4 de AOSpine; en ausencia de compromiso neurológico, hay poca evidencia de calidad que apoye el tratamiento quirúrgico frente al conservador.",
  },
  {
    id: 329,
    block: "raquis",
    code: "Fractura por flexión-distracción AOSpine B2",
    image: null,
    prompt:
      "Paciente con una lesión por flexión-distracción en la que, además del componente óseo, existe afectación del complejo ligamentario posterior. Según la clasificación AOSpine, ¿qué tipo de lesión es y cuál es el tratamiento más adecuado?",
    options: [
      "AOSpine B2, que suele requerir tratamiento quirúrgico por su mayor inestabilidad",
      "AOSpine B1, que se trata de forma conservadora con seguimiento estrecho",
      "AOSpine A2, que se trata mediante inmovilización externa",
      "AOSpine C, que se trata con tratamiento conservador de forma habitual",
    ],
    correct: 0,
    explanation:
      "Cuando la lesión por flexión-distracción afecta al complejo ligamentario posterior (AOSpine B2), la lesión es más inestable y suele precisar cirugía, a diferencia de las puramente óseas (B1), que pueden tratarse de forma conservadora.",
  },
  {
    id: 330,
    block: "raquis",
    code: "Fractura por extensión-distracción AOSpine B3",
    image: null,
    prompt:
      "Paciente con espondilitis anquilosante sufre una caída de baja energía y presenta una fractura con rotura ligamentosa anterior y afectación de los elementos óseos posteriores, con retrolistesis. ¿Qué tipo de lesión es más probable y cuál es la vía de abordaje habitual?",
    options: [
      "Una fractura por extensión-distracción (AOSpine B3), que se artrodesa por vía posterior",
      "Una fractura por compresión (AOSpine A1), de tratamiento conservador",
      "Una fractura de Chance ósea, de tratamiento conservador con corsé",
      "Una fractura por rotación-traslación (AOSpine C), de abordaje anterior aislado",
    ],
    correct: 0,
    explanation:
      "Las fracturas por extensión-distracción (AOSpine B3) son más frecuentes en pacientes con rigidez previa, como la espondilitis anquilosante, y presentan rotura ligamentosa anterior con fractura de elementos posteriores; se artrodesan por vía posterior.",
  },
  {
    id: 331,
    block: "raquis",
    code: "Elección de abordaje quirúrgico",
    image: null,
    prompt:
      "Un paciente presenta una fractura toracolumbar con afectación neurológica incompleta y lesión asociada del complejo ligamentario posterior. Según los principios generales de tratamiento quirúrgico, ¿qué abordaje suele ser necesario?",
    options: [
      "Un doble abordaje, anterior y posterior",
      "Un abordaje posterior aislado, con independencia del estado neurológico",
      "Un abordaje anterior aislado, con independencia de la lesión ligamentosa",
      "Tratamiento conservador con corsé, dado que la lesión neurológica es incompleta",
    ],
    correct: 0,
    explanation:
      "Cuando coexisten una lesión neurológica incompleta y una lesión del complejo ligamentario posterior, suele ser necesario un doble abordaje, anterior y posterior.",
  },
  {
    id: 332,
    block: "raquis",
    code: "SCIWORA",
    image: null,
    prompt:
      "Un niño de 6 años presenta un cuadro clínico compatible con lesión medular tras un traumatismo, pero la radiografía simple y la TC no muestran alteraciones estructurales. ¿Qué concepto describe mejor esta situación y qué prueba de imagen está indicada ante la sospecha clínica?",
    options: [
      "SCIWORA, estando indicada la realización de una RMN",
      "Fractura de Chance ósea, estando indicada una nueva radiografía en 2 semanas",
      "Fractura en tallo verde vertebral, sin necesidad de pruebas adicionales",
      "Síndrome de Grisel, indicándose tratamiento antibiótico empírico",
    ],
    correct: 0,
    explanation:
      "El término SCIWORA describe una lesión medular sin evidencia de fractura o luxación en Rx o TC; ante la sospecha clínica en niños, se recomienda realizar una RMN.",
  },
  {
    id: 333,
    block: "raquis",
    code: "Indicación quirúrgica en fracturas infantiles",
    image: null,
    prompt:
      "En las fracturas vertebrales infantiles, ¿cuál de las siguientes situaciones constituye una indicación de tratamiento quirúrgico?",
    options: [
      "Una deformidad cifótica toracolumbar mayor de 20º",
      "Una fractura por compresión aislada con menos del 20% de acuñamiento",
      "Un dolor leve que mejora con analgesia oral",
      "Una fractura estable sin compromiso neurológico ni deformidad",
    ],
    correct: 0,
    explanation:
      "Entre las indicaciones quirúrgicas en las fracturas vertebrales infantiles se incluyen las fracturas toracolumbares con deformidad cifótica mayor de 20º, además de la inestabilidad cráneo-cervical o el compromiso neurológico progresivo.",
  },
  {
    id: 334,
    block: "raquis",
    code: "Escala ASIA, grado D",
    image: null,
    prompt:
      "Paciente con lesión medular en el que, tras resolverse el shock medular, se objetiva función motora conservada por debajo del nivel neurológico, con al menos la mitad de los músculos clave presentando un grado muscular igual o superior a 3 en la escala de Daniels. ¿Qué grado de la escala ASIA corresponde a este paciente?",
    options: [
      "ASIA D",
      "ASIA C",
      "ASIA B",
      "ASIA A",
    ],
    correct: 0,
    explanation:
      "El grado ASIA D corresponde a una lesión incompleta con función motora conservada por debajo del nivel neurológico y al menos la mitad de los músculos clave con un grado muscular de 3 o más.",
  },
  {
    id: 335,
    block: "raquis",
    code: "Reflejo bulbo-cavernoso",
    image: null,
    prompt:
      "La presencia del reflejo bulbo-cavernoso en un paciente con lesión medular traumática indica que:",
    options: [
      "El shock medular se ha resuelto y la posible lesión medular ya es irreversible",
      "El paciente se encuentra todavía en fase de shock medular",
      "La lesión medular es reversible con tratamiento médico precoz",
      "No existe compromiso neurológico significativo",
    ],
    correct: 0,
    explanation:
      "El reflejo bulbo-cavernoso sirve para evaluar si ha terminado el shock medular; cuando está presente, indica que el shock medular se ha resuelto y que la posible lesión medular ya es irreversible.",
  },
  {
    id: 336,
    block: "raquis",
    code: "Síndrome de Brown-Sequard",
    image: null,
    prompt:
      "Paciente con una hemisección medular lateral presenta parálisis de la musculatura del mismo lado de la lesión y pérdida de sensibilidad termoalgésica en el lado contrario. ¿Qué síndrome medular incompleto presenta y cuál es su pronóstico general?",
    options: [
      "Síndrome de Brown-Sequard, con un pronóstico favorable en la mayoría de los casos",
      "Síndrome medular central, con mal pronóstico funcional en la mayoría de los casos",
      "Síndrome medular anterior, con recuperación funcional en la minoría de los pacientes",
      "Síndrome de cono medular, con pronóstico variable según el nivel de la lesión",
    ],
    correct: 0,
    explanation:
      "El síndrome de Brown-Sequard es una hemisección medular lateral con parálisis ipsilateral y pérdida de sensibilidad termoalgésica contralateral; su pronóstico es bueno, con recuperación parcial de la función en más del 90% de los pacientes.",
  },
  {
    id: 337,
    block: "raquis",
    code: "Síndrome de Schneider",
    image: null,
    prompt:
      "Paciente de 68 años con artrosis cervical sufre una caída con mecanismo de hiperextensión y presenta debilidad más marcada en las extremidades superiores que en las inferiores, con conservación relativa de la sensibilidad propioceptiva. ¿Qué síndrome medular es el más probable?",
    options: [
      "Síndrome medular central (síndrome de Schneider)",
      "Síndrome medular anterior",
      "Síndrome medular posterior",
      "Síndrome de Brown-Sequard",
    ],
    correct: 0,
    explanation:
      "El síndrome medular central o de Schneider es el más frecuente y aparece sobre todo en lesiones por hiperextensión en columnas artrósicas, con mayor afectación de las extremidades superiores que de las inferiores.",
  },
  {
    id: 338,
    block: "raquis",
    code: "Síndrome medular anterior",
    image: null,
    prompt:
      "Sobre el síndrome medular anterior, ¿cuál de las siguientes afirmaciones es correcta?",
    options: [
      "Presenta un pronóstico funcional pobre, con recuperación de la función solo en una minoría de los pacientes",
      "Se caracteriza por afectación aislada de los cordones posteriores",
      "Tiene un pronóstico favorable, con recuperación funcional en la mayoría de los pacientes",
      "Cursa con preservación completa de la función motora por debajo de la lesión",
    ],
    correct: 0,
    explanation:
      "El síndrome medular anterior tiene mal pronóstico, ya que solo recupera la función un 10-15% de los pacientes, a diferencia de otros síndromes medulares incompletos.",
  },
  {
    id: 339,
    block: "raquis",
    code: "Cono medular y cauda equina",
    image: null,
    prompt:
      "¿Qué diferencia principal existe entre el síndrome de cono medular y el síndrome de cauda equina?",
    options: [
      "En el cono medular pueden preservarse los reflejos bulbo-cavernoso y de la micción, mientras que en la cauda equina los reflejos están abolidos",
      "El cono medular afecta a la médula cervical, mientras que la cauda equina afecta a la médula sacra",
      "La cauda equina se asocia de forma característica a una hiperreflexia generalizada",
      "El cono medular no puede cursar con alteración vesical, a diferencia de la cauda equina",
    ],
    correct: 0,
    explanation:
      "En el cono medular, la vejiga y los miembros inferiores son arrefléxicos pero pueden preservarse los reflejos bulbo-cavernoso y de la micción, mientras que en la cauda equina la vejiga y los miembros inferiores son arrefléxicos de forma global.",
  },
  {
    id: 340,
    block: "raquis",
    code: "Shock neurogénico",
    image: null,
    prompt:
      "Paciente con lesión medular cervical presenta hipotensión con bradicardia tras el traumatismo. ¿Qué mecanismo explica este cuadro y cómo se diferencia del shock hemorrágico?",
    options: [
      "Un shock neurogénico por simpatectomía funcional, que no mejora la tensión arterial con un bolo de cristaloides a diferencia del shock hemorrágico",
      "Un shock hemorrágico oculto, que se acompaña de forma característica de taquicardia compensadora marcada",
      "Un shock séptico precoz, que se corrige con tratamiento antibiótico",
      "Un shock cardiogénico, que contraindica la administración de fluidos intravenosos",
    ],
    correct: 0,
    explanation:
      "Tras la lesión medular se produce hipotensión con bradicardia por el efecto de la simpatectomía en el shock neurogénico; un bolo de cristaloides mejora la tensión arterial en el shock hemorrágico, pero no en el neurogénico.",
  },
  {
    id: 341,
    block: "raquis",
    code: "Corticoides en la lesión medular aguda",
    image: null,
    prompt:
      "Sobre el uso de corticoides a altas dosis en la lesión medular traumática aguda, ¿cuál de las siguientes afirmaciones es correcta?",
    options: [
      "Su utilización continúa siendo objeto de controversia en la literatura reciente",
      "Está indicada de forma protocolizada en cualquier paciente con sospecha de daño medular",
      "Ha demostrado un beneficio claro y sin controversia sobre la recuperación neurológica",
      "Está especialmente indicada en pacientes con lesión de la cola de caballo",
    ],
    correct: 0,
    explanation:
      "El tratamiento agudo de la lesión medular con corticoides a altas dosis continúa siendo debatido en la literatura reciente, existiendo revisiones que no encuentran evidencias suficientes que lo justifiquen.",
  },
  {
    id: 342,
    block: "raquis",
    code: "Estudio STASCIS",
    image: null,
    prompt:
      "Según el estudio STASCIS (Surgical Timing in Acute Spinal Cord Injury Study), ¿qué beneficio se asoció a la descompresión medular precoz en las primeras 24 horas?",
    options: [
      "Un incremento en las posibilidades de mejorar el déficit neurológico según la escala ASIA",
      "Una reducción de la necesidad de artrodesis posterior",
      "Una disminución del riesgo de trombosis venosa profunda",
      "Una menor incidencia de fugas de cemento en los procedimientos percutáneos",
    ],
    correct: 0,
    explanation:
      "El estudio STASCIS mostró que la descompresión precoz de la médula espinal en las primeras 24 horas incrementó las posibilidades de mejorar en dos grados el déficit neurológico según la escala ASIA.",
  },
  {
    id: 343,
    block: "raquis",
    code: "Epidemiología de las fracturas osteoporóticas",
    image: null,
    prompt:
      "Las fracturas vertebrales osteoporóticas afectan con mayor frecuencia al segmento comprendido entre:",
    options: [
      "T7 y L2",
      "C3 y C7",
      "L3 y L5",
      "T1 y T4",
    ],
    correct: 0,
    explanation:
      "El segmento vertebral más afectado por las fracturas osteoporóticas es T7-L2, presentándose habitualmente como acuñamientos anteriores o aplastamientos vertebrales.",
  },
  {
    id: 344,
    block: "raquis",
    code: "Fractura osteoporótica frente a tumoral",
    image: null,
    prompt:
      "¿Cuál de los siguientes hallazgos orienta más hacia una fractura vertebral de origen tumoral que hacia una fractura osteoporótica?",
    options: [
      "La destrucción de los pedículos vertebrales",
      "Un acuñamiento anterior aislado en T8 en una mujer de 75 años",
      "La ausencia de antecedente de cáncer conocido",
      "La afectación de una única vértebra sin cambios en la piel adyacente",
    ],
    correct: 0,
    explanation:
      "La destrucción de los pedículos vertebrales (signo del guiño en la Rx AP) orienta de forma característica hacia la presencia de un tumor, a diferencia de las fracturas osteoporóticas.",
  },
  {
    id: 345,
    block: "raquis",
    code: "Clasificación AO Spine-DGOU",
    image: null,
    prompt:
      "Paciente con una fractura vertebral osteoporótica que presenta un colapso severo con compromiso claro del muro posterior y cifosis progresiva. Según la clasificación AO Spine-DGOU, ¿a qué tipo corresponde y cuál es la recomendación inicial habitual?",
    options: [
      "OF4, con indicación generalmente quirúrgica",
      "OF1, con indicación conservadora",
      "OF2, con indicación conservadora",
      "OF3, con indicación conservadora de forma protocolizada",
    ],
    correct: 0,
    explanation:
      "El tipo OF4 de la clasificación AO Spine-DGOU corresponde a una fractura inestable, con colapso severo, compromiso del muro posterior y cifosis progresiva, siendo la recomendación inicial generalmente quirúrgica.",
  },
  {
    id: 346,
    block: "raquis",
    code: "Puntuación DGOU",
    image: null,
    prompt:
      "En el sistema de puntuación clínica DGOU para fracturas vertebrales osteoporóticas, una puntuación total superior a 10 puntos indica:",
    options: [
      "Tratamiento quirúrgico indicado",
      "Tratamiento conservador recomendado",
      "Evaluación individualizada sin orientación terapéutica clara",
      "La necesidad de repetir la puntuación pasadas 6 semanas",
    ],
    correct: 0,
    explanation:
      "En el sistema de puntuación clínica DGOU, una puntuación total superior a 10 puntos indica tratamiento quirúrgico, mientras que 0-6 puntos orienta a tratamiento conservador.",
  },
  {
    id: 347,
    block: "raquis",
    code: "Vertebroplastia frente a cifoplastia",
    image: null,
    prompt:
      "¿Cuál es la principal diferencia técnica entre la vertebroplastia percutánea y la cifoplastia?",
    options: [
      "La cifoplastia crea una cavidad con un dispositivo expansible que puede recuperar parcialmente la altura vertebral antes de rellenarla con cemento",
      "La vertebroplastia restaura por completo la altura vertebral perdida, a diferencia de la cifoplastia",
      "La cifoplastia no permite el uso de cemento óseo (PMMA)",
      "La vertebroplastia se realiza sin ningún tipo de control radiológico intraoperatorio",
    ],
    correct: 0,
    explanation:
      "La cifoplastia crea una cavidad mediante un dispositivo expansible que recupera parcialmente la altura vertebral antes de rellenarla con cemento a baja presión, a diferencia de la vertebroplastia, en la que el cemento se inyecta directamente a presión.",
  },
  {
    id: 348,
    block: "raquis",
    code: "Contraindicaciones de la cementación percutánea",
    image: null,
    prompt:
      "Paciente con una fractura vertebral osteoporótica y un colapso del 75% de la altura del cuerpo vertebral, sin compromiso neurológico. ¿Es candidato a una técnica de cementación percutánea?",
    options: [
      "No, dado que el colapso superior a dos tercios de la altura vertebral constituye una contraindicación",
      "Sí, aplicando un control radioscópico estricto durante el procedimiento",
      "Sí, es la indicación más favorable para este tipo de técnicas",
      "Solo si presenta además una infección vertebral activa",
    ],
    correct: 0,
    explanation:
      "El colapso mayor de dos tercios de la altura del cuerpo vertebral (vértebra en \"galleta\") constituye una contraindicación para la vertebroplastia y la cifoplastia.",
  },
  {
    id: 349,
    block: "raquis",
    code: "Origen embriológico del raquis",
    image: null,
    prompt:
      "¿Qué estructura embrionaria da origen a la columna vertebral?",
    options: [
      "El esclerotomo",
      "El dermatomo",
      "El miotomo",
      "El celoma",
    ],
    correct: 0,
    explanation:
      "Cada somita se diferencia en dermatomo, miotomo y esclerotomo; este último es el que da lugar a la columna vertebral.",
  },
  {
    id: 350,
    block: "raquis",
    code: "Origen del núcleo pulposo",
    image: null,
    prompt:
      "La notocorda desaparece en el cuerpo vertebral, pero sus restos dan lugar a:",
    options: [
      "El núcleo pulposo del disco intervertebral",
      "El anillo fibroso",
      "Las apófisis espinosas",
      "El ligamento vertebral común anterior",
    ],
    correct: 0,
    explanation:
      "La notocorda desaparece en el cuerpo vertebral y, por degeneración mucoide, forma el núcleo pulposo en el disco intervertebral.",
  },
  {
    id: 351,
    block: "raquis",
    code: "Barra lateral y escoliosis",
    image: null,
    prompt:
      "Recién nacido con una barra ósea lateral que impide el crecimiento de un lado de varias vértebras. ¿Qué deformidad es más probable que desarrolle?",
    options: [
      "Escoliosis, con concavidad en el lado de la barra",
      "Cifosis",
      "Lordosis fija",
      "Ninguna deformidad, dado que las barras laterales no crecen ni se mueven",
    ],
    correct: 0,
    explanation:
      "Las barras laterales provocan escoliosis con concavidad en el lado de la barra, a diferencia de las barras anteriores (cifosis) o posteriores (lordosis fija).",
  },
  {
    id: 352,
    block: "raquis",
    code: "Barra completa (vértebra en bloque)",
    image: null,
    prompt:
      "¿Qué tipo de defecto de segmentación vertebral congénito presenta, en general, el mejor pronóstico?",
    options: [
      "La barra completa o circunferencial (vértebra en bloque)",
      "La barra unilateral",
      "La barra anterior",
      "La hemivértebra segmentada",
    ],
    correct: 0,
    explanation:
      "Las barras completas o circunferenciales dan lugar a vértebras en bloque; no generan deformidad, aunque tampoco crecen ni se mueven, siendo el defecto de segmentación de mejor pronóstico.",
  },
  {
    id: 353,
    block: "raquis",
    code: "Hemivértebra segmentada",
    image: null,
    prompt:
      "Niña de 3 años con una hemivértebra torácica totalmente separada de las vértebras vecinas, con discos y cartílagos de crecimiento propios a ambos lados. ¿Qué comportamiento evolutivo es el esperable?",
    options: [
      "Una escoliosis progresiva, de aproximadamente 2º por año",
      "Ausencia de progresión, al no tener potencial de crecimiento propio",
      "Una progresión de la curva independiente del crecimiento del resto de la columna",
      "Una cifosis progresiva sin componente escoliótico",
    ],
    correct: 0,
    explanation:
      "La hemivértebra segmentada está totalmente separada de la vértebra vecina y genera escoliosis progresiva a partir de sus placas de crecimiento, con una progresión aproximada de 2º por año.",
  },
  {
    id: 354,
    block: "raquis",
    code: "Hemivértebra no segmentada",
    image: null,
    prompt:
      "¿Por qué la hemivértebra no segmentada no genera deformidad progresiva?",
    options: [
      "Porque está fusionada a ambas vértebras vecinas y carece de discos o cartílagos de crecimiento",
      "Porque se localiza en la columna lumbar de forma característica",
      "Porque se asocia de manera constante a una barra contralateral compensadora",
      "Porque el platillo superior y el inferior tienen el mismo potencial de crecimiento que las vértebras vecinas",
    ],
    correct: 0,
    explanation:
      "La hemivértebra no segmentada está fusionada a ambas vértebras adyacentes y no tiene discos ni cartílagos de crecimiento, por lo que no genera deformidad progresiva.",
  },
  {
    id: 355,
    block: "raquis",
    code: "Combinación de peor pronóstico",
    image: null,
    prompt:
      "¿Qué combinación de anomalías vertebrales congénitas conlleva, en general, el peor pronóstico en cuanto a progresión de la deformidad?",
    options: [
      "Una hemivértebra segmentada junto con una barra contralateral",
      "Una hemivértebra no segmentada aislada",
      "Una vértebra en bloque completo",
      "Una hemivértebra incarcerada aislada",
    ],
    correct: 0,
    explanation:
      "La combinación de una hemivértebra segmentada con una barra contralateral es un defecto mixto de peor pronóstico, produciendo una escoliosis progresiva de gran magnitud.",
  },
  {
    id: 356,
    block: "raquis",
    code: "Síndrome VACTERL",
    image: null,
    prompt:
      "Niño con escoliosis congénita presenta además atresia anorrectal, defectos cardiacos y anomalías renales. ¿Qué síndrome de agrupamiento debe sospecharse?",
    options: [
      "Síndrome VACTERL",
      "Síndrome de Goldenhar",
      "Síndrome de Jarcho-Levin",
      "Síndrome de Klippel-Feil",
    ],
    correct: 0,
    explanation:
      "El síndrome VACTERL agrupa anomalías vertebrales, atresia anorrectal, defectos cardiacos, traqueoesofágicos, renales y de las extremidades.",
  },
  {
    id: 357,
    block: "raquis",
    code: "Síndrome de Goldenhar",
    image: null,
    prompt:
      "¿Qué hallazgos clínicos son característicos del síndrome de Goldenhar?",
    options: [
      "Displasia o aplasia de los oídos, tumores oculares y asimetría facial, habitualmente de un solo lado",
      "Fusiones vertebrales torácicas extensas con costillas ausentes",
      "Cuello corto, implantación baja del pelo y limitación de la movilidad cervical",
      "Atresia anorrectal junto con defectos de las extremidades",
    ],
    correct: 0,
    explanation:
      "El síndrome de Goldenhar se caracteriza por displasia o aplasia de los oídos, tumores oculares o ausencia de ojo, y una asimetría de boca y mentón habitualmente unilateral.",
  },
  {
    id: 358,
    block: "raquis",
    code: "Evaluación diagnóstica de la escoliosis congénita",
    image: null,
    prompt:
      "Recién nacido diagnosticado de escoliosis congénita. ¿Qué evaluación complementaria está indicada, dada la alta tasa de anomalías asociadas?",
    options: [
      "Ecografía renal, ecocardiografía y RMN de columna",
      "Una radiografía de tórax de control, sin estudios adicionales",
      "Una valoración oftalmológica de forma aislada",
      "Una analítica hormonal tiroidea, sin otras pruebas",
    ],
    correct: 0,
    explanation:
      "Debido a la alta tasa de anomalías asociadas, se recomienda un examen físico completo junto con ecografía renal, ecocardiografía y RMN de columna vertebral.",
  },
  {
    id: 359,
    block: "raquis",
    code: "Radiografía inicial en escoliosis congénita",
    image: null,
    prompt:
      "En la evaluación radiológica inicial de la escoliosis congénita, las proyecciones posteroanterior y lateral permiten, entre otras cosas:",
    options: [
      "Establecer el patrón de la curva y medir su magnitud mediante el método de Cobb",
      "Diagnosticar de forma directa las anomalías renales asociadas",
      "Sustituir a la RMN en la valoración del neuroeje",
      "Descartar la necesidad de evaluación cardiológica",
    ],
    correct: 0,
    explanation:
      "Las proyecciones posteroanterior y lateral permiten establecer el patrón de curva, medir su magnitud mediante el método de Cobb y evaluar su flexibilidad y la rotación vertebral.",
  },
  {
    id: 360,
    block: "raquis",
    code: "RMN en la escoliosis congénita",
    image: null,
    prompt:
      "¿Por qué se recomienda realizar una RMN de columna en la evaluación de la escoliosis congénita?",
    options: [
      "Porque existe un 20-40% de alteraciones asociadas del neuroeje",
      "Porque permite medir el ángulo de Cobb con mayor precisión que la radiografía",
      "Porque sustituye a la ecografía renal en el cribado sistemático",
      "Porque es la única prueba capaz de detectar anomalías cardiacas asociadas",
    ],
    correct: 0,
    explanation:
      "La RMN de columna se recomienda en la evaluación inicial de la escoliosis congénita porque existe un 20-40% de alteraciones asociadas del neuroeje.",
  },
  {
    id: 361,
    block: "raquis",
    code: "Corsé en la escoliosis congénita",
    image: null,
    prompt:
      "Sobre el uso del corsé en la escoliosis congénita, es correcto afirmar que:",
    options: [
      "No tiene efecto sobre el crecimiento anómalo de las vértebras, aunque puede emplearse para curvas compensadoras flexibles",
      "Corrige de forma eficaz la curva estructural principal en la mayoría de los pacientes",
      "Está contraindicado en cualquier caso de escoliosis congénita",
      "Sustituye a la cirugía cuando la curva supera los 30º",
    ],
    correct: 0,
    explanation:
      "El uso del corsé no tiene efecto sobre la corrección de la escoliosis congénita ni sobre el crecimiento anómalo de las vértebras, aunque puede emplearse para tratar curvas compensadoras flexibles.",
  },
  {
    id: 362,
    block: "raquis",
    code: "Indicación quirúrgica en barra unilateral",
    image: null,
    prompt:
      "Lactante con una barra unilateral torácica documentada radiológicamente, sin progresión demostrada todavía de la curva. ¿Cuál es la actitud terapéutica más adecuada?",
    options: [
      "Indicar cirugía de entrada, dado que las barras unilaterales son quirúrgicas con independencia de la progresión demostrada",
      "Esperar a demostrar progresión antes de plantear la cirugía, como en el resto de anomalías",
      "Iniciar tratamiento con corsé como primera medida correctora",
      "Descartar la cirugía mientras el paciente no presente síntomas neurológicos",
    ],
    correct: 0,
    explanation:
      "Las barras unilaterales son quirúrgicas de entrada, mientras que el resto de anomalías deben demostrar primero que son progresivas antes de plantear la cirugía.",
  },
  {
    id: 363,
    block: "raquis",
    code: "Vértebra en mariposa",
    image: null,
    prompt:
      "¿Cuál es la localización más frecuente de la vértebra en mariposa y qué hallazgo radiológico la caracteriza en la proyección lateral?",
    options: [
      "Nivel lumbar, con una morfología trapezoidal o cuneiforme anterior que puede confundirse con un aplastamiento",
      "Nivel torácico alto, con ensanchamiento simétrico del cuerpo vertebral",
      "Nivel cervical, con fusión completa de dos cuerpos vertebrales",
      "Nivel sacro, con ausencia completa del cuerpo vertebral",
    ],
    correct: 0,
    explanation:
      "La vértebra en mariposa se localiza con mayor frecuencia a nivel lumbar y en la Rx lateral presenta una morfología trapezoidal o cuneiforme anterior que puede confundirse con un aplastamiento vertebral.",
  },
  {
    id: 364,
    block: "raquis",
    code: "Síndrome de insuficiencia torácica",
    image: null,
    prompt:
      "El síndrome de insuficiencia torácica se define como:",
    options: [
      "La incapacidad del tórax para sustentar la función y/o el crecimiento pulmonar normal",
      "La presencia aislada de una escoliosis torácica mayor de 45º sin afectación respiratoria",
      "Una malformación de las vértebras cervicales con compromiso de la vía aérea superior",
      "Una alteración transitoria de la función pulmonar que revierte sin tratamiento",
    ],
    correct: 0,
    explanation:
      "El síndrome de insuficiencia torácica es la incapacidad del tórax para sustentar la función o el crecimiento pulmonar normal, resultado de una condición congénita, adquirida o yatrogénica.",
  },
  {
    id: 365,
    block: "raquis",
    code: "VEPTR y altura torácica",
    image: null,
    prompt:
      "En el tratamiento del síndrome de insuficiencia torácica con VEPTR, ¿qué objetivo de altura torácica a la madurez esquelética se persigue, y qué valor se asocia a enfermedad pulmonar restrictiva severa?",
    options: [
      "Una altura próxima a 22 cm, con riesgo elevado de enfermedad restrictiva severa por debajo de 18 cm",
      "Una altura de 10 cm, sin relación con la función pulmonar posterior",
      "Una altura superior a 35 cm, para evitar cualquier grado de restricción respiratoria",
      "Una altura torácica que no se valora mediante radiografía",
    ],
    correct: 0,
    explanation:
      "El objetivo del tratamiento con VEPTR es conseguir una altura torácica a la madurez esquelética próxima a 22 cm; por debajo de 18 cm se asocia, en casi la mitad de los casos, a enfermedad pulmonar restrictiva severa.",
  },
  {
    id: 366,
    block: "raquis",
    code: "Cifosis congénita tipo I",
    image: null,
    prompt:
      "¿Qué tipo de cifosis congénita presenta el mayor riesgo de complicaciones neurológicas y la mayor velocidad de progresión?",
    options: [
      "El tipo I, por defecto de formación (hemivértebra posterior)",
      "El tipo II, por defecto de segmentación anterior",
      "El tipo III, mixto o por luxación rotatoria",
      "El tipo IV, sin riesgo neurológico asociado",
    ],
    correct: 0,
    explanation:
      "El tipo I de cifosis congénita, por defecto de formación, es el más frecuente y grave, con alto riesgo de complicaciones neurológicas y una velocidad de progresión de 7-9º por año.",
  },
  {
    id: 367,
    block: "raquis",
    code: "Arteria de Adamkiewicz y cifosis congénita",
    image: null,
    prompt:
      "Niño con cifosis congénita cuyo ápex se localiza entre T4 y T9. ¿Por qué esta localización conlleva un riesgo especialmente elevado de paraplejia?",
    options: [
      "Porque en esa zona entra la arteria de Adamkiewicz, que irriga la médula espinal",
      "Porque es la zona de menor movilidad de toda la columna vertebral",
      "Porque coincide con la salida del plexo braquial",
      "Porque es la localización habitual de la unión toracolumbar",
    ],
    correct: 0,
    explanation:
      "El riesgo de paraplejia en la cifosis congénita es mayor cuando el ápex de la curva se sitúa entre T4 y T9, zona por donde entra la arteria de Adamkiewicz.",
  },
  {
    id: 368,
    block: "raquis",
    code: "Contraindicación de la tracción en cifosis congénita",
    image: null,
    prompt:
      "En el tratamiento quirúrgico de la cifosis congénita grave, ¿qué maniobra debe evitarse por el riesgo de causar una lesión neurológica?",
    options: [
      "La tracción previa a la cirugía",
      "La monitorización con potenciales evocados",
      "La fusión posterior precoz en niños pequeños",
      "La resección posterior de la columna vertebral (PVCR)",
    ],
    correct: 0,
    explanation:
      "En la cifosis congénita no debe realizarse tracción previa a la cirugía, dado el riesgo de paraplejia asociado a esta maniobra.",
  },
  {
    id: 369,
    block: "raquis",
    code: "Tratamiento de la cifosis congénita",
    image: null,
    prompt:
      "Sobre el tratamiento de la cifosis congénita, es correcto afirmar que:",
    options: [
      "Es quirúrgico y debe realizarse de forma precoz, dado el riesgo de paraplejia",
      "El tratamiento conservador con corsé consigue detener su progresión en la mayoría de los casos",
      "Solo se plantea la cirugía si aparecen síntomas neurológicos evidentes",
      "El tratamiento de elección es la tracción progresiva mantenida durante meses",
    ],
    correct: 0,
    explanation:
      "El tratamiento de la cifosis congénita es quirúrgico y debe realizarse lo antes posible por el riesgo de paraplejia; el corsé es ineficaz para detener su evolución natural.",
  },
  {
    id: 370,
    block: "raquis",
    code: "Clasificación de la agenesia sacra",
    image: null,
    prompt:
      "En la clasificación de la ausencia congénita de sacro, la agenesia parcial unilateral del sacro corresponde al:",
    options: [
      "Tipo I",
      "Tipo II",
      "Tipo III",
      "Tipo IV",
    ],
    correct: 0,
    explanation:
      "El tipo I corresponde a la agenesia parcial unilateral del sacro, que puede ser estable o inestable según exista o no progresión de la deformidad cifoescoliótica toraco-pélvica.",
  },
  {
    id: 371,
    block: "raquis",
    code: "Inestabilidad vertebro-pélvica",
    image: null,
    prompt:
      "Paciente con agenesia total del sacro que presenta traslación de la columna sobre los ilíacos y gran dificultad para sentarse sin ayuda de las manos. ¿Qué situación describe este cuadro?",
    options: [
      "Una inestabilidad vertebro-pélvica, presente en la forma inestable del tipo II de la clasificación",
      "Una forma estable de agenesia sacra, sin repercusión funcional",
      "Una hemivértebra incarcerada asociada",
      "Un síndrome de insuficiencia torácica secundario",
    ],
    correct: 0,
    explanation:
      "La inestabilidad vertebro-pélvica se caracteriza por gran incapacidad para sentarse sin ayuda de las manos y, en casos graves, intrusión de las vísceras en el tórax; corresponde a la forma inestable de la clasificación.",
  },
  {
    id: 372,
    block: "raquis",
    code: "Contractura grave de rodilla en agenesia sacra",
    image: null,
    prompt:
      "Paciente con agenesia congénita de sacro y una contractura en flexión de la rodilla tan grave que impide la deambulación. ¿Cuál es el tratamiento más eficaz en estos casos graves?",
    options: [
      "La desarticulación y colocación de una prótesis externa",
      "Las tenotomías aisladas de isquiotibiales",
      "La fisioterapia intensiva prolongada",
      "El uso de férulas nocturnas de forma mantenida",
    ],
    correct: 0,
    explanation:
      "En las deformidades graves de rodilla asociadas a agenesia sacra, la desarticulación y colocación de una prótesis externa es el tratamiento más eficaz.",
  },
  {
    id: 373,
    block: "raquis",
    code: "Síndrome de Bertolotti, tipo II de Castellvi",
    image: null,
    prompt:
      "Adolescente con dolor lumbar bajo mecánico en el que la radiografía muestra un ensanchamiento de la apófisis transversa de L5 que forma una pseudoarticulación con el ala sacra, junto con una sacralización incompleta de L5. Según la clasificación de Castellvi, ¿a qué tipo corresponde?",
    options: [
      "Tipo II",
      "Tipo I",
      "Tipo III",
      "Tipo IV",
    ],
    correct: 0,
    explanation:
      "El tipo II de Castellvi se caracteriza por una apófisis transversa de L5 ensanchada que forma una pseudoarticulación con el ala sacra, junto con una sacralización o lumbarización incompleta.",
  },
  {
    id: 374,
    block: "raquis",
    code: "Castellvi tipo III",
    image: null,
    prompt:
      "¿Qué caracteriza al tipo III de la clasificación de Castellvi para las vértebras transicionales lumbosacras?",
    options: [
      "La fusión completa entre la apófisis transversa de L5 y el ala sacra",
      "Una anchura de la apófisis transversa de L5 mayor de 19 mm sin pseudoarticulación",
      "La combinación de un tipo IIIa en un lado y un tipo IIa en el otro",
      "La ausencia completa de la apófisis transversa de L5",
    ],
    correct: 0,
    explanation:
      "El tipo III de Castellvi se caracteriza por la fusión completa entre la apófisis transversa de L5 y el ala sacra, con sacralización completa de L5 o lumbarización completa de S1.",
  },
  {
    id: 375,
    block: "raquis",
    code: "Aplasia congénita de los pedículos lumbares",
    image: null,
    prompt:
      "La aplasia congénita de los pedículos lumbares afecta con mayor frecuencia a:",
    options: [
      "La cuarta vértebra lumbar (L4)",
      "La primera vértebra lumbar (L1)",
      "La quinta vértebra lumbar (L5)",
      "La segunda vértebra lumbar (L2)",
    ],
    correct: 0,
    explanation:
      "La aplasia congénita de los pedículos lumbares es una afección muy rara que afecta sobre todo a la cuarta vértebra lumbar (L4).",
  },
  {
    id: 376,
    block: "raquis",
    code: "Platibasia",
    image: null,
    prompt:
      "La platibasia se define como un aumento anómalo del ángulo basal (o de McRae), formado por líneas trazadas desde el nasión y desde el basión hasta la silla turca. ¿Qué valor de este ángulo se considera indicativo de platibasia?",
    options: [
      "Superior a 145º",
      "Superior a 90º",
      "Inferior a 100º",
      "Superior a 200º",
    ],
    correct: 0,
    explanation:
      "La apertura normal del ángulo basal es de 120 a 145º; se considera que existe platibasia cuando este ángulo es superior a 145º.",
  },
  {
    id: 377,
    block: "raquis",
    code: "Línea de McGregor e impresión basilar",
    image: null,
    prompt:
      "En un paciente con sospecha de impresión basilar, la radiografía lateral de cráneo muestra que la apófisis odontoides sobrepasa la línea de McGregor en 6 mm. ¿Qué interpretación es la correcta?",
    options: [
      "Es compatible con impresión basilar, dado que el límite normal es de 4,5 mm",
      "Es un hallazgo normal, ya que el límite aceptado es de 10 mm",
      "Indica de forma directa una malformación de Arnold-Chiari tipo III",
      "Descarta la existencia de otras malformaciones del sistema nervioso central",
    ],
    correct: 0,
    explanation:
      "Se considera impresión basilar cuando la apófisis odontoides sobrepasa la línea de McGregor más de 4,5 mm, por lo que un desplazamiento de 6 mm es compatible con este diagnóstico.",
  },
  {
    id: 378,
    block: "raquis",
    code: "Malformación más frecuente del atlas",
    image: null,
    prompt:
      "La malformación más frecuente del atlas es:",
    options: [
      "La occipitalización del atlas, con fusión total o parcial al hueso occipital",
      "La espina bífida del arco anterior",
      "La displasia diastrófica del atlas",
      "La fractura congénita del arco posterior",
    ],
    correct: 0,
    explanation:
      "Entre las malformaciones del atlas, la más frecuente es la occipitalización, en la que el atlas se fusiona de forma total o parcial al occipital.",
  },
  {
    id: 379,
    block: "raquis",
    code: "Os odontoideum",
    image: null,
    prompt:
      "¿Qué es el os odontoideum?",
    options: [
      "Un defecto en la unión de la odontoides con el cuerpo del axis, o una pseudoartrosis por una fractura previa",
      "La persistencia del núcleo de osificación apical de la odontoides",
      "Una hipoplasia congénita completa de la odontoides",
      "Una fusión precoz y completa de la odontoides con el cuerpo de C2",
    ],
    correct: 0,
    explanation:
      "El os odontoideum es un defecto en la unión de la odontoides con el cuerpo del axis, o una pseudoartrosis secundaria a una fractura previa, a diferencia del osículo terminal de Bergmann.",
  },
  {
    id: 380,
    block: "raquis",
    code: "Síndrome de Down, EAO sin síntomas",
    image: null,
    prompt:
      "Niño con síndrome de Down y un espacio atlanto-odontoideo (EAO) de 6 mm, sin síntomas neurológicos. ¿Qué recomendación es la más adecuada?",
    options: [
      "Evitar la sobrecarga excesiva de la cabeza, como en la gimnasia o las zambullidas",
      "Indicar artrodesis C1-C2 de forma inmediata",
      "No es necesario ningún seguimiento ni restricción de actividad",
      "Indicar tracción cervical continua durante varias semanas",
    ],
    correct: 0,
    explanation:
      "Cuando el EAO es mayor de 5 mm sin síntomas, se recomienda evitar la sobrecarga excesiva de la cabeza, como ocurre en la gimnasia o las zambullidas, sin indicación quirúrgica inmediata.",
  },
  {
    id: 381,
    block: "raquis",
    code: "Síndrome de Down, EAO con síntomas",
    image: null,
    prompt:
      "Niño con síndrome de Down, un EAO de 8 mm y síntomas neurológicos progresivos. ¿Cuál es el tratamiento indicado?",
    options: [
      "Artrodesis C1-C2",
      "Tratamiento conservador con collarín blando",
      "Observación clínica sin intervención",
      "Corsé de yeso durante 6 meses",
    ],
    correct: 0,
    explanation:
      "Cuando el EAO es mayor de 5 mm con síntomas neurológicos, o mayor de 10 mm aunque no haya síntomas, está indicada la artrodesis C1-C2.",
  },
  {
    id: 382,
    block: "raquis",
    code: "Tríada de Klippel-Feil",
    image: null,
    prompt:
      "¿Cuál es la tríada clínica clásica del síndrome de Klippel-Feil?",
    options: [
      "Implantación baja del pelo, cuello corto y disminución de la movilidad cervical",
      "Escoliosis torácica, cifosis lumbar y dolor lumbar crónico",
      "Sordera, tortícolis y luxación de cadera",
      "Pterigium colli, luxación atloaxoidea y platibasia",
    ],
    correct: 0,
    explanation:
      "La tríada clásica del síndrome de Klippel-Feil, presente en el 40-50% de los casos, es implantación baja del pelo, cuello corto y disminución de la movilidad cervical.",
  },
  {
    id: 383,
    block: "raquis",
    code: "Klippel-Feil y vía urinaria",
    image: null,
    prompt:
      "Niño con síndrome de Klippel-Feil. ¿Qué prueba complementaria es obligatoria dada la frecuencia de anomalías asociadas de las vías urinarias?",
    options: [
      "Una ecografía o pielografía intravenosa",
      "Una gammagrafía ósea",
      "Una biopsia renal percutánea",
      "Una urodinamia de rutina",
    ],
    correct: 0,
    explanation:
      "Dado que hasta un 33% de los pacientes con síndrome de Klippel-Feil presentan anomalías de las vías urinarias, es obligatorio realizar una ecografía o pielografía intravenosa.",
  },
  {
    id: 384,
    block: "raquis",
    code: "Arnold-Chiari tipo II",
    image: null,
    prompt:
      "¿Qué caracteriza a la malformación de Arnold-Chiari tipo II?",
    options: [
      "El descenso de las amígdalas cerebelosas junto con la parte inferior del vermis y del IV ventrículo, asociado a espina bífida abierta e hidrocefalia",
      "El descenso aislado de las amígdalas cerebelosas, sin otras anomalías asociadas",
      "El descenso completo del cerebelo junto con un encefalocele occipital",
      "La hipoplasia del cerebelo sin descenso de estructuras",
    ],
    correct: 0,
    explanation:
      "El Chiari tipo II se caracteriza por el descenso de las amígdalas cerebelosas junto con la parte inferior del vermis y del IV ventrículo, asociándose con espina bífida abierta e hidrocefalia.",
  },
  {
    id: 385,
    block: "raquis",
    code: "Disociación siringomiélica",
    image: null,
    prompt:
      "Paciente joven con pérdida de la sensibilidad termoalgésica en ambas extremidades superiores, con preservación de la sensibilidad táctil, y quemaduras que no llegó a percibir. ¿Qué entidad es la más probable y qué prueba de imagen es la de elección?",
    options: [
      "Siringomielia, siendo la RMN la prueba de elección",
      "Una lesión del plexo braquial, diagnosticada mediante electromiograma",
      "Un síndrome del túnel carpiano bilateral, diagnosticado con ecografía",
      "Una polineuropatía periférica, diagnosticada con estudios de conducción nerviosa",
    ],
    correct: 0,
    explanation:
      "La disociación siringomiélica, con afectación de la sensibilidad termoalgésica y preservación de la sensibilidad táctil, es característica de la siringomielia; la RMN es la prueba de elección para su diagnóstico.",
  },
  {
    id: 386,
    block: "raquis",
    code: "Definición angular de escoliosis",
    image: null,
    prompt:
      "¿A partir de qué angulación en el plano frontal se considera que una curva vertebral constituye una escoliosis?",
    options: [
      "A partir de 5 grados de angulación en el plano frontal",
      "A partir de 10 grados de angulación en el plano frontal",
      "A partir de 20 grados de angulación en el plano frontal",
      "A partir de 25 grados de angulación en el plano frontal",
    ],
    correct: 1,
    explanation:
      "Se define escoliosis cuando las curvas del plano frontal superan los 10 grados; por debajo de ese valor se considera una variante de la normalidad.",
  },
  {
    id: 387,
    block: "raquis",
    code: "Curva estructural vs. compensadora",
    image: null,
    prompt:
      "Adolescente con una curva vertebral que se corrige por completo en la radiografía en flexión lateral hacia la convexidad y sin rotación vertebral asociada. ¿Cómo se clasifica esta curva según la SRS?",
    options: [
      "Curva no estructural o compensadora",
      "Curva estructural mayor",
      "Curva estructural menor",
      "Curva mixta por fallo de segmentación",
    ],
    correct: 0,
    explanation:
      "Una curva que se corrige completamente en la flexión lateral hacia la convexidad y sin rotación vertebral corresponde, según la SRS, a una curva compensadora o no estructural.",
  },
  {
    id: 388,
    block: "raquis",
    code: "Vértebra apical y vértebra estable",
    image: null,
    prompt:
      "En el estudio radiológico de una escoliosis, ¿qué diferencia a la vértebra apical de la vértebra estable?",
    options: [
      "La apical se localiza en el extremo superior de la curva, y la estable en el extremo inferior",
      "La apical determina el nivel proximal de instrumentación, y la estable el ángulo de Cobb",
      "La apical y la estable son sinónimos, y designan el mismo punto de referencia radiológico",
      "La apical es la más rotada y alejada del eje vertical, mientras que la estable es la más caudal bisecada por la línea sacra vertical",
    ],
    correct: 3,
    explanation:
      "La vértebra apical es la que más se aleja del eje vertical y presenta mayor rotación; la vértebra estable es la más caudal de la curva, bisecada por la línea sacra vertical, y es útil para definir el nivel distal de instrumentación.",
  },
  {
    id: 389,
    block: "raquis",
    code: "Test de Adams con escoliómetro",
    image: null,
    prompt:
      "En la exploración de un adolescente con sospecha de escoliosis, el test de Adams con escoliómetro muestra una asimetría de 5 grados en la flexión del tronco. ¿Cómo se interpreta este hallazgo?",
    options: [
      "Indica una curva estructural franca que requiere estudio radiológico urgente",
      "Es diagnóstico de escoliosis idiopática del adolescente de más de 40 grados",
      "Obliga a solicitar una resonancia magnética de columna completa",
      "Se considera un valor dentro de la normalidad, ya que hasta 7 grados no indica rotación estructural",
    ],
    correct: 3,
    explanation:
      "Con el escoliómetro se acepta como normal una asimetría de hasta 7 grados en el test de Adams; por encima de ese valor se considera indicativo de rotación vertebral y curva estructurada.",
  },
  {
    id: 390,
    block: "raquis",
    code: "Escoliosis por dismetría de MMII",
    image: null,
    prompt:
      "Niña de 6 años con una dismetría de miembros inferiores de 2 cm y una curva toracolumbar larga que se objetiva sólo en bipedestación, sin rotación vertebral apreciable. ¿Cuál es el manejo más adecuado?",
    options: [
      "Tratar la dismetría de los miembros inferiores, ya que la curva es secundaria y no evoluciona a una curva estructurada",
      "Indicar un corsé tipo Boston de forma inmediata para frenar la progresión",
      "Solicitar una resonancia magnética por sospecha de anomalía intrarraquídea",
      "Programar una artrodesis vertebral precoz para evitar la progresión de la curva",
    ],
    correct: 0,
    explanation:
      "La escoliosis por dismetría de miembros inferiores es una curva no estructural que sólo está presente en bipedestación y no evoluciona a curva estructurada; el tratamiento es el de la dismetría.",
  },
  {
    id: 391,
    block: "raquis",
    code: "Curva torácica izquierda: patrón atípico",
    image: null,
    prompt:
      "Adolescente con una curva escoliótica de convexidad torácica izquierda. ¿Qué actitud diagnóstica es la más apropiada ante este patrón?",
    options: [
      "Considerarlo el patrón más habitual de la escoliosis idiopática del adolescente y proceder según la magnitud de la curva",
      "Descartar el diagnóstico de escoliosis idiopática y no realizar más pruebas complementarias",
      "Indicar tratamiento con corsé sin necesidad de pruebas de imagen adicionales",
      "Ampliar el estudio con resonancia magnética para descartar patología intrarraquídea",
    ],
    correct: 3,
    explanation:
      "Una curva torácica izquierda es un patrón atípico en la escoliosis idiopática del adolescente y obliga a descartar otras causas, como tumores intrarraquídeos o anomalías medulares, mediante resonancia magnética.",
  },
  {
    id: 392,
    block: "raquis",
    code: "Ángulo de Mehta en escoliosis infantil",
    image: null,
    prompt:
      "Lactante con escoliosis infantil en la que se mide un ángulo costovertebral de Mehta de 25 grados, con superposición de la cabeza costal sobre la vértebra. ¿Qué implica este hallazgo?",
    options: [
      "Un factor predictor de progresión de la curva",
      "Un signo de resolución espontánea de la escoliosis",
      "Ausencia de riesgo de progresión, ya que el valor es inferior a 30 grados",
      "La indicación de iniciar tratamiento con corsé de yeso de forma inmediata",
    ],
    correct: 0,
    explanation:
      "Un ángulo costovertebral de Mehta superior a 20 grados, junto con la superposición de la cabeza costal sobre la vértebra (fase 2 de Mehta), es un factor predictor de progresión en la escoliosis infantil.",
  },
  {
    id: 393,
    block: "raquis",
    code: "Evolución de la escoliosis juvenil",
    image: null,
    prompt:
      "Escolar de 7 años diagnosticado de escoliosis juvenil. Respecto a su evolución esperable, ¿qué característica es correcta?",
    options: [
      "Presenta una alta tasa de resolución espontánea, similar a la escoliosis infantil",
      "El patrón más frecuente es la curva lumbar, con bajo riesgo de progresión",
      "La mayoría progresará durante la fase de crecimiento rápido de la adolescencia, siendo las curvas torácicas las más agresivas",
      "No requiere seguimiento hasta la adolescencia, dado su curso habitualmente benigno",
    ],
    correct: 2,
    explanation:
      "En la escoliosis juvenil, hasta el 95% de los casos progresan durante la fase de crecimiento rápido de la adolescencia, siendo especialmente agresivas las curvas torácicas.",
  },
  {
    id: 394,
    block: "raquis",
    code: "Curva mayor en la clasificación de Lenke",
    image: null,
    prompt:
      "En la clasificación de Lenke de la escoliosis idiopática, ¿cómo se define la curva mayor?",
    options: [
      "Como la curva con mayor ángulo de Cobb, que por definición es estructural",
      "Como la curva situada en la región torácica proximal, independientemente de su magnitud",
      "Como cualquier curva con una rigidez mayor de 25 grados en las radiografías de lateralización",
      "Como la curva que determina el modificador sagital torácico",
    ],
    correct: 0,
    explanation:
      "La curva mayor es aquella con mayor ángulo de Cobb de las tres regiones anatómicas y, por definición, se considera estructural.",
  },
  {
    id: 395,
    block: "raquis",
    code: "Indicación de corsé según Risser y Cobb",
    image: null,
    prompt:
      "Adolescente con Risser 1 y una curva de 35 grados en su primera visita. Según las indicaciones de tratamiento de la SRS, ¿cuál es la actitud más adecuada?",
    options: [
      "Tratamiento con corsé",
      "Observación sin tratamiento ortésico",
      "Indicación quirúrgica directa",
      "Alta y revisión en dos años",
    ],
    correct: 0,
    explanation:
      "Con Risser 0-1 y una curva entre 20/25 y 40 grados, la SRS recomienda tratamiento con corsé para intentar frenar la progresión hasta alcanzar la madurez esquelética.",
  },
  {
    id: 396,
    block: "raquis",
    code: "Eficacia dosis-dependiente del corsé",
    image: null,
    prompt:
      "Respecto al tratamiento con corsé en la escoliosis idiopática del adolescente, ¿qué se sabe sobre su eficacia?",
    options: [
      "Su eficacia es independiente del número de horas de uso diario",
      "Su eficacia es dosis-dependiente, siendo mayor cuanto más horas al día se utiliza",
      "Es más eficaz cuando se utiliza menos de 10 horas al día",
      "No ha demostrado ser más eficaz que la historia natural de la enfermedad",
    ],
    correct: 1,
    explanation:
      "El resultado del tratamiento con corsé es dosis-dependiente: es más eficaz cuanto mayor es el número de horas de uso diario, con una eficacia máxima en torno a las 23 horas.",
  },
  {
    id: 397,
    block: "raquis",
    code: "Indicación quirúrgica en EIA torácica",
    image: null,
    prompt:
      "Adolescente con escoliosis idiopática y una curva torácica de 55 grados de Cobb. ¿Cuál es la actitud terapéutica más adecuada?",
    options: [
      "Corsé tipo Boston, dado que aún no ha alcanzado indicación quirúrgica",
      "Observación clínica y radiológica cada seis meses",
      "Tratamiento quirúrgico, ya que las curvas torácicas iguales o mayores de 50 grados tienen indicación de artrodesis",
      "Corsé nocturno tipo Charleston, reservando la cirugía para curvas superiores a 70 grados",
    ],
    correct: 2,
    explanation:
      "Las curvas torácicas iguales o mayores de 50 grados tienen indicación de tratamiento quirúrgico en la escoliosis idiopática del adolescente.",
  },
  {
    id: 398,
    block: "raquis",
    code: "Fenómeno del cigüeñal",
    image: null,
    prompt:
      "Paciente esqueléticamente inmaduro intervenido de artrodesis vertebral posterior aislada, en el que se observa progresión de la deformidad tras la cirugía por persistencia del crecimiento de los cuerpos vertebrales. ¿Cómo se denomina esta complicación?",
    options: [
      "Síndrome de dorso plano",
      "Fenómeno del cigüeñal",
      "Fenómeno de adding-on",
      "Enfermedad del segmento adyacente",
    ],
    correct: 1,
    explanation:
      "El fenómeno del cigüeñal ocurre en pacientes esqueléticamente inmaduros sometidos a artrodesis vertebral posterior, en los que persiste el crecimiento de los cuerpos vertebrales y se produce progresión de la deformidad.",
  },
  {
    id: 399,
    block: "raquis",
    code: "Desequilibrio coronal tipo adding-on",
    image: null,
    prompt:
      "Tras una fusión selectiva torácica en una escoliosis con doble curva, se observa un empeoramiento progresivo de la curva en la zona adyacente, inferior a la instrumentación. ¿Qué complicación describe mejor este cuadro y cuál es su tratamiento?",
    options: [
      "Fenómeno del cigüeñal, que se trata con osteotomía de sustracción pedicular",
      "Cifosis del segmento adyacente, que se trata con corsé de yeso",
      "Desequilibrio adding-on, que se trata aumentando los niveles de fusión",
      "Síndrome de dorso plano, que se trata con rehabilitación funcional",
    ],
    correct: 2,
    explanation:
      "El adding-on es un desequilibrio postoperatorio en el que la curva empeora progresivamente en la zona adyacente a la instrumentación; se trata aumentando los niveles de fusión.",
  },
  {
    id: 400,
    block: "raquis",
    code: "Clasificación de Aebi: escoliosis de novo",
    image: null,
    prompt:
      "Mujer de 68 años, sin antecedentes de escoliosis previa, que en los últimos años ha desarrollado una curva lumbar de 25 grados con degeneración asimétrica de facetas y disco, y clínica de estenosis lateral. Según la clasificación de Aebi, ¿de qué tipo de deformidad se trata?",
    options: [
      "Escoliosis idiopática del adolescente que progresa en el adulto (tipo 2)",
      "Escoliosis degenerativa primaria o de novo (tipo 1)",
      "Escoliosis secundaria a enfermedad metabólica ósea (tipo 3)",
      "Escoliosis congénita del adulto no clasificable según Aebi",
    ],
    correct: 1,
    explanation:
      "La aparición de una curva en un adulto sin antecedentes de escoliosis previa, por degeneración asimétrica de facetas y disco, corresponde al tipo 1 de Aebi o escoliosis degenerativa de novo.",
  },
  {
    id: 401,
    block: "raquis",
    code: "Dolor y ángulo de Cobb en escoliosis degenerativa",
    image: null,
    prompt:
      "En la escoliosis degenerativa del adulto, ¿qué relación existe entre la intensidad del dolor y el grado del ángulo de Cobb?",
    options: [
      "El dolor aumenta de forma proporcional al ángulo de Cobb",
      "No existe una correlación significativa entre ambos parámetros",
      "El dolor se relaciona con el grado de rotación vertebral, más que con el ángulo de Cobb",
      "El dolor disminuye a medida que aumenta el ángulo de Cobb",
    ],
    correct: 1,
    explanation:
      "En la escoliosis degenerativa del adulto, el dolor no se correlaciona significativamente con el grado del ángulo de Cobb, siendo el desequilibrio sagital un factor más determinante.",
  },
  {
    id: 402,
    block: "raquis",
    code: "Modificador de inclinación pélvica (Schwab-SRS)",
    image: null,
    prompt:
      "Dentro de los modificadores de la clasificación Schwab-SRS para la deformidad degenerativa del adulto, ¿qué parámetro se ha relacionado de forma más estrecha con los resultados de calidad de vida?",
    options: [
      "La inclinación pélvica (PT), como mecanismo compensador de retroversión pélvica",
      "El tipo de curva coronal (torácica, toracolumbar o doble curva)",
      "La incidencia pélvica (PI) de forma aislada",
      "El ángulo de Cobb coronal medido en la telemetría AP",
    ],
    correct: 0,
    explanation:
      "La inclinación pélvica (PT), como medida de retroversión pélvica compensadora, es el parámetro más asociado con los resultados en los cuestionarios de calidad de vida relacionada con la salud.",
  },
  {
    id: 403,
    block: "raquis",
    code: "Desequilibrio sagital global descompensado",
    image: null,
    prompt:
      "En un paciente con desequilibrio sagital del adulto, la línea de la plomada C7 cae 6 cm por delante del disco L5-S1 y no es capaz de compensar la deformidad, flexionando caderas y rodillas. ¿Qué tipo de desequilibrio sagital presenta?",
    options: [
      "Desequilibrio segmentario compensado",
      "Cifosis del segmento adyacente",
      "Desequilibrio global descompensado",
      "Síndrome de dorso plano postquirúrgico",
    ],
    correct: 2,
    explanation:
      "El desequilibrio global descompensado se define cuando la línea de la plomada C7 cae más de 5 cm por delante del disco L5-S1 y el paciente no puede compensar la deformidad, recurriendo a la flexión de caderas y rodillas.",
  },
  {
    id: 404,
    block: "raquis",
    code: "Causa más frecuente de dorso plano",
    image: null,
    prompt:
      "En la actualidad, ¿cuál es la causa más frecuente del síndrome de dorso plano (flatback syndrome)?",
    options: [
      "El uso de instrumentación de Harrington en procedimientos actuales",
      "La espondilitis anquilosante no tratada",
      "La cifosis congénita evolucionada sin tratamiento",
      "La falta de restitución de la lordosis lumbar en procedimientos de fusión por patología degenerativa",
    ],
    correct: 3,
    explanation:
      "Aunque históricamente se asociaba a la instrumentación distractora de Harrington, la causa más frecuente en la actualidad del dorso plano es la falta de restitución de las curvaturas fisiológicas, especialmente la lordosis lumbar, en las fusiones por patología degenerativa.",
  },
  {
    id: 405,
    block: "raquis",
    code: "Fórmula LL ≈ PI ± 9º",
    image: null,
    prompt:
      "En la planificación quirúrgica de una escoliosis degenerativa del adulto, ¿qué relación se busca entre la lordosis lumbar (LL) y la incidencia pélvica (PI) para restaurar un adecuado balance sagital?",
    options: [
      "Que la lordosis lumbar duplique el valor de la incidencia pélvica",
      "Que la lordosis lumbar sea aproximadamente igual a la incidencia pélvica, con una diferencia de hasta 9 grados",
      "Que la lordosis lumbar sea inferior en 30 grados a la incidencia pélvica",
      "Que la incidencia pélvica se modifique quirúrgicamente hasta igualar la lordosis lumbar preoperatoria",
    ],
    correct: 1,
    explanation:
      "El objetivo de la corrección quirúrgica es restaurar una lordosis lumbar acorde con la morfología pélvica del paciente, siguiendo la fórmula LL ≈ PI ± 9 grados.",
  },
  {
    id: 406,
    block: "raquis",
    code: "Dorso curvo postural vs. Scheuermann",
    image: null,
    prompt:
      "Adolescente con una cifosis dorsal redondeada, flexible, que se corrige por completo al extender el tronco y en hiperextensión en decúbito prono, sin hallazgos radiológicos significativos. ¿Qué diagnóstico es el más probable?",
    options: [
      "Enfermedad de Scheuermann torácica",
      "Cifosis congénita por fallo de segmentación",
      "Cifosis post-laminectomía",
      "Dorso curvo postural o cifosis postural del adolescente",
    ],
    correct: 3,
    explanation:
      "El dorso curvo postural se caracteriza por una cifosis redondeada y flexible que se corrige con la extensión del tronco y en hiperextensión, sin anomalías vertebrales radiológicas, a diferencia de la enfermedad de Scheuermann.",
  },
  {
    id: 407,
    block: "raquis",
    code: "Criterios de Sorensen en Scheuermann",
    image: null,
    prompt:
      "Para establecer el diagnóstico radiológico de enfermedad de Scheuermann según los criterios de Sorensen, ¿qué hallazgo es necesario?",
    options: [
      "Acuñamiento de al menos tres vértebras consecutivas con una angulación mayor de 5 grados por vértebra",
      "Acuñamiento aislado de una única vértebra con angulación mayor de 15 grados",
      "Presencia de nódulos de Schmorl sin acuñamiento vertebral asociado",
      "Escoliosis torácica mayor de 40 grados asociada a cifosis",
    ],
    correct: 0,
    explanation:
      "Los criterios de Sorensen exigen el acuñamiento de al menos tres vértebras consecutivas, con una angulación mayor de 5 grados por vértebra, junto con una cifosis rígida de inicio juvenil.",
  },
  {
    id: 408,
    block: "raquis",
    code: "Tratamiento quirúrgico en Scheuermann grave",
    image: null,
    prompt:
      "Adolescente con enfermedad de Scheuermann y una cifosis torácica de 80 grados, rígida, con dolor progresivo. ¿Cuál es el tratamiento más adecuado?",
    options: [
      "Ortesis tipo Milwaukee, manteniéndola hasta la madurez esquelética",
      "Observación clínico-radiológica, sin tratamiento activo",
      "Tratamiento quirúrgico mediante artrodesis instrumentada",
      "Fisioterapia postural como tratamiento definitivo",
    ],
    correct: 2,
    explanation:
      "En la enfermedad de Scheuermann, la cirugía está indicada en curvas torácicas superiores a 75 grados, especialmente si son rígidas y sintomáticas, como ocurre en este caso.",
  },
  {
    id: 409,
    block: "raquis",
    code: "Mecanismo de la cifosis post-laminectomía",
    image: null,
    prompt:
      "Tras una laminectomía multinivel con facetectomía amplia, un paciente desarrolla una cifosis progresiva en la zona intervenida. ¿Qué mecanismo explica principalmente esta complicación?",
    options: [
      "La hiperlaxitud ligamentosa congénita del paciente, no relacionada con la cirugía",
      "La formación de una pseudoartrosis en el nivel instrumentado",
      "La lesión de los ligamentos posteriores y la pérdida del soporte estabilizador tras la facetectomía",
      "La colocación de tornillos pediculares en una posición demasiado medial",
    ],
    correct: 2,
    explanation:
      "La cifosis postlaminectomía se relaciona con la lesión de los ligamentos posteriores y la facetectomía excesiva, que provocan una pérdida de los mecanismos estabilizadores posteriores de la columna.",
  },
  {
    id: 410,
    block: "raquis",
    code: "Capacidad de corrección de las osteotomías",
    image: null,
    prompt:
      "En el tratamiento quirúrgico de una cifosis rígida del adulto se plantea realizar una osteotomía vertebral. Respecto a la capacidad de corrección de cada técnica, ¿qué afirmación es correcta?",
    options: [
      "La osteotomía de Ponte/Smith-Petersen corrige más grados por nivel que la resección vertebral posterior",
      "La resección vertebral posterior corrige menos grados por nivel que la osteotomía de sustracción pedicular",
      "Las tres técnicas de osteotomía tienen una capacidad de corrección equivalente por nivel",
      "La osteotomía de sustracción pedicular corrige unos 30 grados por nivel, más que la osteotomía de Ponte/Smith-Petersen",
    ],
    correct: 3,
    explanation:
      "La osteotomía de sustracción pedicular corrige aproximadamente 30 grados por nivel, frente a los 10 grados de la osteotomía de Ponte/Smith-Petersen y los 60 grados de la resección vertebral posterior (PVCR), que es la técnica más agresiva.",
  },
  {
    id: 411,
    block: "raquis",
    code: "Articulaciones uncovertebrales",
    image: null,
    prompt:
      "¿Qué característica distingue a las articulaciones uncovertebrales (de Luschka) del resto de estructuras articulares de la columna?",
    options: [
      "Son articulaciones sinoviales verdaderas presentes en toda la columna vertebral",
      "Están presentes en la columna cervical, sin equivalente anatómico en el resto de la columna vertebral",
      "Son remanentes de las articulaciones interapofisarias torácicas",
      "Se localizan en la porción anterior e inferior de cada cuerpo vertebral",
    ],
    correct: 1,
    explanation:
      "Las articulaciones uncovertebrales o de Luschka se encuentran en la columna cervical, sin equivalente en el resto del raquis; son falsas articulaciones situadas en la porción superior y lateral de cada cuerpo vertebral, consideradas un remanente de las articulaciones costovertebrales.",
  },
  {
    id: 412,
    block: "raquis",
    code: "Disco intervertebral y dolor",
    image: null,
    prompt:
      "¿Por qué el disco intervertebral no suele ser una fuente directa de dolor, salvo en la hernia discal aguda o en la degeneración crónica avanzada?",
    options: [
      "Porque está aislado de las estructuras nerviosas adyacentes por el ligamento amarillo",
      "Porque carece de terminaciones nerviosas, salvo en la capa externa del anillo fibroso",
      "Porque su irrigación vascular impide la transmisión de estímulos dolorosos",
      "Porque el núcleo pulposo posee receptores que inhiben la señal dolorosa",
    ],
    correct: 1,
    explanation:
      "El disco intervertebral carece de terminaciones nerviosas, salvo en la capa externa del anillo fibroso; el dolor se produce de forma indirecta, por compresión de la raíz nerviosa o la duramadre, o por la inestabilidad mecánica que origina al herniarse.",
  },
  {
    id: 413,
    block: "raquis",
    code: "Origen del dolor cervical idiopático",
    image: null,
    prompt:
      "¿Qué estructura se considera responsable del dolor cervical idiopático hasta en un 25-75% de los casos?",
    options: [
      "El núcleo pulposo del disco intervertebral",
      "El ligamento longitudinal anterior",
      "El nervio occipital mayor",
      "Las articulaciones interapofisarias",
    ],
    correct: 3,
    explanation:
      "Las carillas y la cápsula de la articulación interapofisaria se consideran el origen del dolor cervical idiopático en un 25-75% de los casos.",
  },
  {
    id: 414,
    block: "raquis",
    code: "Radiculopatía C7",
    image: null,
    prompt:
      "Paciente con dolor irradiado al tercer dedo de la mano, debilidad para la extensión del codo y reflejo tricipital disminuido. ¿Qué raíz nerviosa está más probablemente afectada?",
    options: [
      "C5",
      "C6",
      "C7",
      "C8",
    ],
    correct: 2,
    explanation:
      "La raíz C7 se corresponde con la extensión del codo, la flexión de la muñeca, el reflejo tricipital y la distribución sensitiva del tercer dedo.",
  },
  {
    id: 415,
    block: "raquis",
    code: "Radiculopatía C5",
    image: null,
    prompt:
      "Paciente con debilidad para la abducción del hombro y alteración sensitiva en el borde radial del brazo, sin alteración de reflejos específicos. ¿Qué raíz está afectada?",
    options: [
      "C6",
      "C7",
      "C5",
      "C8",
    ],
    correct: 2,
    explanation:
      "La raíz C5 es responsable de la abducción del hombro y de la sensibilidad del borde radial del hombro, brazo y antebrazo; comparte el reflejo bicipital con la raíz C6.",
  },
  {
    id: 416,
    block: "raquis",
    code: "Sensibilidad de la maniobra de Spurling",
    image: null,
    prompt:
      "Respecto a la maniobra de Spurling en la evaluación de la patología cervical, ¿qué afirmación es correcta?",
    options: [
      "Tiene una sensibilidad relativamente baja, por lo que no debe ser el único criterio diagnóstico",
      "Presenta una sensibilidad muy alta para detectar cualquier grado de radiculopatía cervical",
      "Consiste en la tracción axial de la cabeza del paciente",
      "Se considera positiva cuando el paciente refiere mejoría de los síntomas con la maniobra",
    ],
    correct: 0,
    explanation:
      "Según la literatura reciente, la maniobra de Spurling (compresión y rotación del raquis cervical hacia el lado doloroso) tiene una sensibilidad relativamente baja, por lo que no debe ser el único criterio para diagnosticar una cervicobraquialgia.",
  },
  {
    id: 417,
    block: "raquis",
    code: "Signo de Bakody",
    image: null,
    prompt:
      "Paciente con cervicobraquialgia en el que, al colocar la mano sobre la cabeza, mejora claramente el dolor irradiado al brazo. ¿Cómo se denomina este hallazgo y qué sugiere?",
    options: [
      "Signo de Bakody, que sugiere una compresión extradural de la raíz nerviosa",
      "Signo de Lhermitte, que sugiere afectación del cordón posterior medular",
      "Signo de Hoffman, que sugiere una mielopatía cervical",
      "Maniobra de Valsalva positiva, que sugiere una lesión ocupante de espacio",
    ],
    correct: 0,
    explanation:
      "La prueba de abducción del hombro (mano sobre la cabeza) disminuye la tracción sobre las raíces nerviosas, sobre todo C4-C5; si mejora la clínica, se denomina signo de Bakody y sugiere una compresión extradural.",
  },
  {
    id: 418,
    block: "raquis",
    code: "Índice de Torg",
    image: null,
    prompt:
      "En la valoración radiológica del canal cervical, ¿qué mide el índice de Torg y qué limitación presenta?",
    options: [
      "La relación entre el diámetro sagital del canal y la anchura del cuerpo vertebral, con un pobre valor predictivo positivo",
      "La distancia entre el atlas y la odontoides, con alta sensibilidad para la inestabilidad atloaxoidea",
      "El ángulo formado entre la línea de McGregor y la punta de la odontoides",
      "La altura del disco intervertebral en la radiografía lateral en flexión",
    ],
    correct: 0,
    explanation:
      "El índice de Torg es la relación entre el diámetro sagital del canal vertebral y la anchura del cuerpo vertebral; un valor menor de 0,8 sugiere estenosis, aunque tiene un pobre valor predictivo positivo y actualmente se desaconseja su uso aislado.",
  },
  {
    id: 419,
    block: "raquis",
    code: "Test de Elvey en el desfiladero torácico",
    image: null,
    prompt:
      "Respecto a las pruebas diagnósticas del síndrome del desfiladero torácico, ¿qué papel tiene el test de Elvey (ULTT, Upper Limb Tension Test)?",
    options: [
      "Es una prueba centrada en el componente vascular, sin relación con la afectación neurológica",
      "Sustituye a la exploración clínica en el diagnóstico del síndrome neurogénico",
      "Es la prueba de cribado principal, de forma que su negatividad reduce la probabilidad de compresión neurológica",
      "Se considera positiva si desaparece el pulso radial durante la maniobra",
    ],
    correct: 2,
    explanation:
      "El test de Elvey (ULTT) sigue siendo la prueba de cribado principal para el síndrome del desfiladero torácico, ya que su negatividad reduce la probabilidad de presentar una compresión neurológica.",
  },
  {
    id: 420,
    block: "raquis",
    code: "Fisiopatología de la espondilosis cervical",
    image: null,
    prompt:
      "En la degeneración crónica de la espondilosis cervical, ¿en qué orden aparecen los osteofitos y qué consecuencia tiene la pérdida progresiva de la lordosis cervical?",
    options: [
      "Primero se forman los osteofitos posteriores y después los anteriores; la pérdida de lordosis estira la médula y favorece la lesión neurológica",
      "Primero se forman los osteofitos anteriores y después los posteriores; la pérdida de lordosis relaja la médula y reduce el riesgo de lesión neurológica",
      "Los osteofitos anteriores y posteriores aparecen de forma simultánea, sin relación con la lordosis cervical",
      "La pérdida de lordosis cervical no influye en la aparición de osteofitos ni en la tensión medular",
    ],
    correct: 0,
    explanation:
      "Al perder altura el disco, se forman inicialmente los osteofitos posteriores; al perderse progresivamente la lordosis fisiológica, la médula se estira, favoreciendo la lesión neurológica, y se sobrecargan las articulaciones uncovertebrales, formando osteofitos anteriores.",
  },
  {
    id: 421,
    block: "raquis",
    code: "Mielopatía en miembros inferiores",
    image: null,
    prompt:
      "Paciente con debilidad progresiva al caminar, hiperreflexia y Babinski positivo en miembros inferiores, con escasa alteración sensitiva. ¿Qué cuadro es más probable y qué motoneurona está afectada?",
    options: [
      "Radiculopatía cervical C8, por afectación de la segunda motoneurona",
      "Mielopatía cervical, por afectación de la primera motoneurona",
      "Neuropatía periférica de miembros inferiores",
      "Síndrome del desfiladero torácico de causa vascular",
    ],
    correct: 1,
    explanation:
      "La mielopatía espondilótica se caracteriza por una paraparesia espástica en miembros inferiores, con hiperreflexia y Babinski positivo, por afectación de la primera motoneurona, con escasos síntomas sensitivos asociados.",
  },
  {
    id: 422,
    block: "raquis",
    code: "Reflejo estilorradial invertido",
    image: null,
    prompt:
      "Al percutir la estiloides radial de un paciente con mielopatía cervical, se produce una flexión de los dedos en lugar de la respuesta esperada. ¿Cómo se denomina este hallazgo y a qué nivel suele localizarse la lesión?",
    options: [
      "Signo de Hoffman, característico de una lesión en C7-T1",
      "Signo de Lhermitte, característico de una lesión torácica alta",
      "Reflejo tricipital exaltado, característico de una lesión en C4-C5",
      "Reflejo estilorradial invertido, característico de una lesión en C5-C6",
    ],
    correct: 3,
    explanation:
      "El reflejo estilorradial invertido, con flexión de los dedos al percutir la estiloides radial, es característico de una lesión localizada en C5-C6, por abolición del reflejo estilorradial normal y exaltación de los reflejos en las raíces inferiores desinhibidas.",
  },
  {
    id: 423,
    block: "raquis",
    code: "Signo de Lhermitte",
    image: null,
    prompt:
      "¿Qué es el signo de Lhermitte y qué estructura indica que está lesionada?",
    options: [
      "Un cierre de la pinza digital al pellizcar la falange distal del tercer dedo",
      "Una flexión de los dedos al percutir la estiloides radial",
      "Una sensación de descarga eléctrica con la flexión del cuello, que indica lesión del cordón posterior medular",
      "Una debilidad progresiva de la marcha que empeora con la extensión cervical",
    ],
    correct: 2,
    explanation:
      "El signo de Lhermitte es una sensación breve de descarga eléctrica provocada por la flexión del cuello, que se irradia por la columna; indica lesión del cordón posterior de la médula espinal a nivel cervical.",
  },
  {
    id: 424,
    block: "raquis",
    code: "Escala de Nurick",
    image: null,
    prompt:
      "Paciente con mielopatía cervical que presenta una alteración de la marcha leve que no interfiere en su capacidad laboral. Según la escala de Nurick, ¿en qué grado se encuentra?",
    options: [
      "Grado 0",
      "Grado III",
      "Grado IV",
      "Grado II",
    ],
    correct: 3,
    explanation:
      "En la escala de Nurick, el grado II corresponde a una leve alteración de la marcha que no interfiere en la capacidad laboral del paciente.",
  },
  {
    id: 425,
    block: "raquis",
    code: "Disociación clínico-radiológica",
    image: null,
    prompt:
      "En un paciente asintomático mayor de 65 años se detectan hallazgos degenerativos en la radiografía cervical. ¿Qué implica este hallazgo respecto a la actitud terapéutica?",
    options: [
      "Que el paciente presenta indicación quirúrgica inmediata, independientemente de la clínica",
      "Que los hallazgos radiológicos deben correlacionarse con la clínica antes de tomar decisiones terapéuticas, dada la elevada prevalencia de hallazgos patológicos en personas asintomáticas",
      "Que debe iniciarse tratamiento con corsé cervical de forma preventiva",
      "Que los hallazgos radiológicos confirman por sí solos el diagnóstico de mielopatía",
    ],
    correct: 1,
    explanation:
      "Existe una disociación clínico-radiológica en el dolor cervical: hasta el 70-95% de las personas asintomáticas mayores de 65 años presentan manifestaciones radiológicas patológicas, por lo que los hallazgos deben correlacionarse siempre con la clínica.",
  },
  {
    id: 426,
    block: "raquis",
    code: "RMN: señal medular reversible",
    image: null,
    prompt:
      "En la RMN de un paciente con mielopatía cervical se observa una señal hiperintensa en T2, difusa y sin límites claros, sin señal en T1. ¿Qué tipo de cambio medular sugiere este hallazgo?",
    options: [
      "Un cambio irreversible, como cavitación o mielomalacia",
      "Una lesión tumoral intramedular",
      "Un cambio potencialmente reversible, como edema o desmielinización",
      "Una siringomielia establecida",
    ],
    correct: 2,
    explanation:
      "Una señal hiperintensa en T2 de límites difusos y sin señal en T1 se asocia a cambios potencialmente reversibles, como edema, degeneración walleriana, desmielinización o isquemia; la hiperintensidad en T2 con borde nítido junto a hipointensidad en T1 indica cambios irreversibles.",
  },
  {
    id: 427,
    block: "raquis",
    code: "Indicaciones quirúrgicas y plazos",
    image: null,
    prompt:
      "¿Cuáles son las dos indicaciones aceptadas de tratamiento quirúrgico en la patología degenerativa cervical, y en qué plazo se recomienda actuar en cada una?",
    options: [
      "Dolor cervical axial aislado de cualquier duración, y mielopatía progresiva tras un año de evolución",
      "Radiculopatía aguda desde el primer día de síntomas, y mielopatía en cualquier estadio evolutivo",
      "Cualquier hallazgo radiológico patológico, con independencia del tiempo de evolución clínica",
      "Mielopatía progresiva, con intervención precoz antes de 6 meses, y fracaso del tratamiento conservador de la radiculopatía tras al menos 4 semanas",
    ],
    correct: 3,
    explanation:
      "Existe acuerdo entre los autores en indicar cirugía en la mielopatía progresiva, recomendando intervención precoz antes de que se instauren cambios permanentes (menos de 6 meses desde el inicio), y en el fracaso del tratamiento conservador de la radiculopatía tras al menos 4 semanas.",
  },
  {
    id: 428,
    block: "raquis",
    code: "Elección de abordaje en mielopatía multinivel",
    image: null,
    prompt:
      "Paciente con mielopatía cervical espondilótica causada por afectación de tres espacios discales, sin cifosis cervical significativa. ¿Qué abordaje quirúrgico es el más indicado?",
    options: [
      "Abordaje anterior mediante discectomía y artrodesis de un único nivel",
      "Abordaje combinado anterior y posterior desde el inicio",
      "Tratamiento conservador exclusivo, dado que no existe cifosis asociada",
      "Abordaje posterior mediante laminoplastia o laminectomía instrumentada",
    ],
    correct: 3,
    explanation:
      "Cuando la mielopatía afecta a tres o más espacios discales y no existe una cifosis cervical marcada, la laminoplastia o la laminectomía instrumentada por vía posterior son las técnicas más indicadas.",
  },
  {
    id: 429,
    block: "raquis",
    code: "Complicación de la laminoplastia cervical",
    image: null,
    prompt:
      "¿Cuál es la complicación grave más frecuente de la laminoplastia cervical y con qué frecuencia aparece?",
    options: [
      "La afectación de la raíz C5, en un 5-12% de los casos",
      "La lesión del nervio laríngeo recurrente, en más del 20% de los casos",
      "La pseudoartrosis, en más del 70% de los casos",
      "El síndrome de Horner, en la mayoría de los pacientes",
    ],
    correct: 0,
    explanation:
      "La complicación grave más frecuente de la laminoplastia cervical es la afectación de la raíz C5, que aparece en un 5-12% de los casos.",
  },
  {
    id: 430,
    block: "raquis",
    code: "Lesión del nervio laríngeo recurrente",
    image: null,
    prompt:
      "Tras una discectomía y artrodesis cervical anterior, un paciente presenta disfonía por parálisis de la cuerda vocal. ¿Qué estructura se ha lesionado con mayor probabilidad?",
    options: [
      "El nervio laríngeo recurrente",
      "El nervio laríngeo superior",
      "La cadena simpática cervical",
      "El nervio espinal accesorio",
    ],
    correct: 0,
    explanation:
      "La lesión del nervio laríngeo recurrente, más frecuente en el abordaje por el lado derecho, provoca disfonía por parálisis de la cuerda vocal; suele ser transitoria.",
  },
  {
    id: 431,
    block: "raquis",
    code: "Inestabilidad cervical en artritis reumatoide",
    image: null,
    prompt:
      "En la artritis reumatoide, ¿qué tipo de inestabilidad cervical es la más frecuente de los tres descritos?",
    options: [
      "La impresión basilar",
      "La subluxación subaxoidea",
      "La inestabilidad occipito-C1 aislada",
      "La subluxación atlantoaxoidea",
    ],
    correct: 3,
    explanation:
      "La subluxación atlantoaxoidea es el tipo de inestabilidad más frecuente en la artritis reumatoide (19-70% de los casos), aunque la impresión basilar y la subluxación subaxoidea son las que más tienden a progresar.",
  },
  {
    id: 432,
    block: "raquis",
    code: "EDME e indicación quirúrgica en AR",
    image: null,
    prompt:
      "En un paciente con artritis reumatoide y subluxación atlantoaxoidea, ¿qué valor del espacio disponible para la médula (EDME o IPAD) se asocia a riesgo de lesión neurológica y orienta hacia el tratamiento quirúrgico?",
    options: [
      "Un valor superior a 20 mm",
      "Un valor inferior a 14 mm",
      "Un valor inferior a 3,5 mm",
      "Un valor superior a 14 mm",
    ],
    correct: 1,
    explanation:
      "Un intervalo posterior atlodentoideo (EDME o IPAD) inferior a 14 mm se asocia a riesgo de lesión neurológica y constituye una de las indicaciones de tratamiento quirúrgico.",
  },
  {
    id: 433,
    block: "raquis",
    code: "Línea de McGregor",
    image: null,
    prompt:
      "¿Qué mide la línea de McGregor y qué hallazgo sugiere el diagnóstico de impresión basilar?",
    options: [
      "La distancia entre el atlas y la odontoides, considerándose patológica una distancia superior a 5 mm",
      "La altura de la punta de la odontoides respecto a una línea entre el paladar duro y el occipucio; se considera migración superior cuando la odontoides supera 4,5 mm por encima de esta línea",
      "El espacio disponible para la médula entre C1 y C2, considerándose patológico un valor inferior a 14 mm",
      "El ángulo de inclinación de la columna cervical en la radiografía lateral en flexión",
    ],
    correct: 1,
    explanation:
      "La línea de McGregor va desde la base del paladar duro hasta la tabla externa del occipucio; se considera que existe migración superior de la odontoides (impresión basilar) cuando su punta se sitúa 4,5 mm por encima de esta línea.",
  },
  {
    id: 434,
    block: "raquis",
    code: "Osificación del ligamento vertebral común posterior",
    image: null,
    prompt:
      "¿Qué caracteriza a la osificación del ligamento vertebral común posterior y cuál es su tratamiento quirúrgico habitual cuando aparece clínica neurológica?",
    options: [
      "Es más frecuente en la población europea y se trata mediante resección del proceso estiloides",
      "Afecta al ligamento longitudinal anterior y se trata con exéresis de osteofitos",
      "Es más frecuente en países asiáticos y su tratamiento quirúrgico habitual es la laminoplastia cervical",
      "Es una entidad benigna que rara vez requiere valoración quirúrgica",
    ],
    correct: 2,
    explanation:
      "La osificación del ligamento vertebral común posterior es una enfermedad frecuente en países asiáticos; cuando aparece clínica neurológica, el tratamiento habitual es la laminoplastia cervical, salvo si existe cifosis marcada, en cuyo caso se prefiere la fusión anterior.",
  },
  {
    id: 435,
    block: "raquis",
    code: "Síndrome de Paget-Schroetter",
    image: null,
    prompt:
      "Paciente deportista joven que presenta edema, cianosis y dilatación venosa en el brazo tras ejercicio intenso de repetición. ¿Qué entidad es la más probable y a qué mecanismo corresponde?",
    options: [
      "Síndrome de Paget-Schroetter, por afectación venosa en el síndrome del desfiladero torácico",
      "Síndrome del desfiladero torácico neurogénico, sin componente vascular",
      "Isquemia arterial subclavia, por afectación de la arteria subclavia",
      "Síndrome de dolor regional complejo tipo I",
    ],
    correct: 0,
    explanation:
      "El síndrome de Paget-Schroetter es una trombosis venosa relacionada con la compresión venosa en el síndrome del desfiladero torácico, típica de deportistas o de trabajos con actividad física repetida.",
  },
  {
    id: 436,
    block: "raquis",
    code: "Unidad espinal funcional",
    image: null,
    prompt:
      "Respecto a la unidad espinal funcional, ¿qué porcentaje de la carga axial se transmite a través del cuerpo vertebral y del disco frente a las articulaciones facetarias?",
    options: [
      "Aproximadamente el 30% a través del cuerpo vertebral y el disco, y el 70% por las facetas articulares",
      "El 100% de la carga se transmite por el disco intervertebral, sin participación de las facetas",
      "La carga se reparte a partes iguales entre el disco y las facetas articulares",
      "Aproximadamente el 70% a través del cuerpo vertebral y el disco, y el 30% por las facetas articulares",
    ],
    correct: 3,
    explanation:
      "Aproximadamente el 70% de la compresión axial aplicada a la columna se transmite por el cuerpo vertebral (a través del disco) y el 30% restante por las facetas articulares.",
  },
  {
    id: 437,
    block: "raquis",
    code: "Banderas rojas: cola de caballo",
    image: null,
    prompt:
      "Paciente con lumbalgia que refiere retención urinaria, anestesia en silla de montar y debilidad bilateral de miembros inferiores. ¿Qué actitud es la más adecuada?",
    options: [
      "Iniciar tratamiento conservador con reposo breve y revisión en 6 semanas",
      "Solicitar una radiografía simple de columna lumbar como primera prueba",
      "Sospechar un síndrome de la cola de caballo y proceder a una valoración urgente",
      "Indicar fisioterapia y escuela de espalda antes de cualquier prueba de imagen",
    ],
    correct: 2,
    explanation:
      "La retención urinaria, la anestesia en silla de montar y la debilidad bilateral de miembros inferiores son signos de alarma de un síndrome de la cola de caballo, que precisa valoración y tratamiento urgentes.",
  },
  {
    id: 438,
    block: "raquis",
    code: "Dolor mecánico vs. inflamatorio",
    image: null,
    prompt:
      "¿Qué característica distingue clínicamente al dolor lumbar de tipo inflamatorio del de tipo mecánico?",
    options: [
      "El dolor inflamatorio empeora por la noche y se asocia a afectación del estado general, mientras que el mecánico empeora con el movimiento o la carga",
      "El dolor inflamatorio mejora con el reposo nocturno y aparece tras esfuerzos físicos intensos",
      "El dolor mecánico se asocia de forma característica a fiebre y pérdida de peso",
      "No existen diferencias clínicas relevantes entre ambos tipos de dolor lumbar",
    ],
    correct: 0,
    explanation:
      "El dolor mecánico empeora con el movimiento o la carga, mientras que el dolor inflamatorio empeora por la noche, es un dolor de reposo y se asocia a afectación del estado general.",
  },
  {
    id: 439,
    block: "raquis",
    code: "Indicación de radiografía lumbar",
    image: null,
    prompt:
      "¿Cuándo está indicado solicitar una radiografía simple de columna lumbar en un paciente con dolor lumbar mecánico?",
    options: [
      "En todo paciente que consulta por dolor lumbar, independientemente de su duración",
      "Cuando el dolor mecánico persiste más de 6 semanas o existen signos de alarma",
      "Cuando el paciente refiere dolor de menos de una semana de evolución",
      "Cuando el paciente ha mejorado completamente con el tratamiento conservador",
    ],
    correct: 1,
    explanation:
      "La radiografía de columna lumbar no debe realizarse de rutina; se indica cuando el dolor mecánico persiste más de 6 semanas o si existen signos de alarma o banderas rojas.",
  },
  {
    id: 440,
    block: "raquis",
    code: "RM y correlación clínica",
    image: null,
    prompt:
      "Un paciente con lumbociatalgia presenta una RM con una hernia discal evidente, pero la clínica y la exploración física no son concluyentes. ¿Cuál es la actitud correcta?",
    options: [
      "Indicar cirugía de forma directa, dado que la RM es la prueba diagnóstica definitiva",
      "Repetir la RM con contraste como único paso adicional necesario",
      "Descartar cualquier posibilidad de tratamiento quirúrgico en el futuro",
      "No sentar la indicación quirúrgica solo con el resultado de la RM, ya que debe correlacionarse con la clínica y la exploración",
    ],
    correct: 3,
    explanation:
      "La RM debe ser complementaria a la historia y la exploración física; nunca debe sentarse la indicación quirúrgica basándose solo en el resultado de la RM.",
  },
  {
    id: 441,
    block: "raquis",
    code: "TC/mielografía en material ferromagnético",
    image: null,
    prompt:
      "Paciente portador de material de osteosíntesis ferromagnético que presenta clínica de estenosis lumbar. ¿Qué prueba de imagen es la más adecuada para evaluar el canal vertebral?",
    options: [
      "RM sin contraste, ya que no se ve afectada por el material ferromagnético",
      "TC o mielo-TC, dado que la RM genera artefactos importantes con este tipo de material",
      "Discografía, para valorar directamente la presión intradiscal",
      "Electromiografía, como prueba de elección en la estenosis de canal",
    ],
    correct: 1,
    explanation:
      "En pacientes portadores de material ferromagnético, la RM no es útil por los artefactos que genera; el TC o la mielo-TC son las pruebas de elección para evaluar el canal en estos casos.",
  },
  {
    id: 442,
    block: "raquis",
    code: "Periodo ventana en la EMG",
    image: null,
    prompt:
      "¿Qué limitación presenta la electromiografía (EMG) realizada durante las dos primeras semanas tras el inicio de una radiculopatía?",
    options: [
      "Detecta con fiabilidad tanto el déficit motor como el sensitivo desde el primer día",
      "Sustituye a la exploración física en el diagnóstico de la radiculopatía",
      "No es valorable durante ese periodo, conocido como periodo ventana",
      "Es más útil para descartar una radiculopatía que para confirmarla",
    ],
    correct: 2,
    explanation:
      "Durante las 3 primeras semanas (periodo ventana) la EMG no es valorable; además, cuando resulta útil, detecta sobre todo el déficit motor y es más fiable para confirmar una radiculopatía que para descartarla.",
  },
  {
    id: 443,
    block: "raquis",
    code: "Situación actual de la discografía",
    image: null,
    prompt:
      "Respecto a la discografía como prueba diagnóstica en el dolor lumbar de origen discal, ¿cuál es su situación actual?",
    options: [
      "Su utilidad sigue siendo dudosa y en la actualidad está prácticamente abandonada",
      "Es la prueba de elección inicial para el diagnóstico de cualquier lumbalgia",
      "Ha sustituido a la RM como prueba de referencia en la degeneración discal",
      "Carece de riesgos y puede repetirse sin limitación en el seguimiento del paciente",
    ],
    correct: 0,
    explanation:
      "La discografía implica presurizar el disco para reproducir el dolor; su utilidad sigue siendo dudosa, puede causar degeneración prematura del disco y en la actualidad está prácticamente abandonada.",
  },
  {
    id: 444,
    block: "raquis",
    code: "Fisiopatología de la degeneración discal",
    image: null,
    prompt:
      "¿Qué cambio bioquímico caracteriza la degeneración discal en sus fases iniciales?",
    options: [
      "Un aumento de proteoglicanos que incrementa la hidratación del disco",
      "Una desaparición completa del anillo fibroso externo desde el inicio del proceso",
      "Una disminución de proteoglicanos que reduce la hidratación del disco",
      "Un aumento del número de células viables en el núcleo pulposo",
    ],
    correct: 2,
    explanation:
      "La degeneración discal se caracteriza por una disminución de proteoglicanos, que implica una disminución en la hidratación del disco y en el número de células viables.",
  },
  {
    id: 445,
    block: "raquis",
    code: "Cambios Modic tipo 1",
    image: null,
    prompt:
      "En la RM de un paciente con lumbalgia se observa una señal hipointensa en T1 e hiperintensa en T2 en los cuerpos vertebrales adyacentes al disco. ¿Qué tipo de cambio Modic corresponde y qué representa?",
    options: [
      "Cambio Modic tipo 2, que refleja la presencia de médula ósea amarilla",
      "Cambio Modic tipo 3, que representa tejido óseo denso y ausencia de médula ósea",
      "Un nódulo de Schmorl, que indica migración de material discal a través de la placa terminal",
      "Cambio Modic tipo 1, que corresponde a edema de médula ósea y tejido fibroso vascularizado",
    ],
    correct: 3,
    explanation:
      "El cambio Modic tipo 1 se caracteriza por disminución de señal en T1 y aumento en T2, y corresponde a edema de médula ósea y tejidos fibrosos vascularizados; se relaciona con dolor lumbar inespecífico e inestabilidad.",
  },
  {
    id: 446,
    block: "raquis",
    code: "Cascada de Kirkaldy-Willis",
    image: null,
    prompt:
      "Según la cascada degenerativa de Kirkaldy-Willis, ¿qué caracteriza a la fase de inestabilidad de la degeneración discal?",
    options: [
      "Una fase larga con relativa inestabilidad segmentaria, que provoca episodios intermitentes de lumbalgia",
      "Una incapacidad aguda importante inmediatamente tras la lesión inicial",
      "Una re-estabilización del segmento que reduce los episodios de dolor",
      "La resolución completa y definitiva de los síntomas lumbares",
    ],
    correct: 0,
    explanation:
      "En la fase II (de inestabilidad) de la cascada de Kirkaldy-Willis existe una fase larga de relativa inestabilidad en el segmento vertebral, que hace al paciente propenso a episodios intermitentes de lumbalgia.",
  },
  {
    id: 447,
    block: "raquis",
    code: "Factor de riesgo más fuerte en la DDD",
    image: null,
    prompt:
      "De los factores de riesgo asociados a la degeneración discal, ¿cuál se considera el más determinante?",
    options: [
      "La actividad física regular",
      "La exposición ambiental ocasional",
      "El tabaquismo",
      "Un traumatismo menor aislado",
    ],
    correct: 2,
    explanation:
      "Entre los factores de riesgo de la degeneración discal, el tabaquismo se considera el más fuerte, mientras que la actividad física regular más bien disminuye el riesgo asociado a la obesidad.",
  },
  {
    id: 448,
    block: "raquis",
    code: "Clasificación morfológica de la hernia",
    image: null,
    prompt:
      "En una RM lumbar se objetiva que el material discal ha atravesado por completo el anillo fibroso, pero se mantiene continuo con el resto del disco, sin atravesar el ligamento longitudinal común posterior. ¿Cómo se clasifica este tipo de hernia?",
    options: [
      "Protrusión o hernia contenida",
      "Hernia extruida subligamentaria",
      "Hernia extruida transligamentaria",
      "Hernia secuestrada",
    ],
    correct: 1,
    explanation:
      "Cuando el anillo fibroso se rompe por completo y el material discal cruza todo el anillo sin separarse del resto del disco, se denomina hernia extruida; si no atraviesa el ligamento longitudinal común posterior se clasifica como subligamentaria.",
  },
  {
    id: 449,
    block: "raquis",
    code: "Topografía más frecuente de la hernia",
    image: null,
    prompt:
      "¿Cuál es la localización topográfica más frecuente de las hernias discales lumbares?",
    options: [
      "Anterior",
      "Foraminal",
      "Extraforaminal",
      "Posterolateral (paracentral)",
    ],
    correct: 3,
    explanation:
      "La localización posterolateral, también llamada paracentral o subarticular del receso, es la más común de las hernias discales lumbares.",
  },
  {
    id: 450,
    block: "raquis",
    code: "Radiculopatía L5",
    image: null,
    prompt:
      "Paciente con dificultad para extender el dedo gordo del pie contrarresistencia y para caminar sobre los talones, con hipoestesia en el dorso del pie. ¿Qué raíz nerviosa está afectada y en qué disco se localiza la hernia paracentral más probable?",
    options: [
      "Raíz L5, con hernia paracentral más probable en el disco L4-L5",
      "Raíz S1, con hernia paracentral más probable en el disco L5-S1",
      "Raíz L4, con hernia paracentral más probable en el disco L3-L4",
      "Raíz L5, con hernia paracentral más probable en el disco L5-S1",
    ],
    correct: 0,
    explanation:
      "La raíz L5 es responsable de la extensión del dedo gordo y de caminar sobre los talones, con hipoestesia en el dorso del pie; la hernia paracentral del disco L4-L5 comprime la raíz L5, que sale por el foramen L5-S1.",
  },
  {
    id: 451,
    block: "raquis",
    code: "Hernia extraforaminal (far out syndrome)",
    image: null,
    prompt:
      "Paciente con una hernia discal extraforaminal en L5-S1. ¿Qué raíz nerviosa resulta afectada con mayor probabilidad, y cómo se denomina este cuadro?",
    options: [
      "La raíz L5, la misma que sale por el foramen L5-S1",
      "La raíz S1, por compresión directa del saco dural",
      "La raíz S2, por afectación de las raíces sacras bajas",
      "La raíz L4, en lo que se conoce como far out syndrome",
    ],
    correct: 3,
    explanation:
      "En las hernias extraforaminales (far out syndrome), la raíz afectada es la superior a la esperada; una hernia extraforaminal en L5-S1 puede irritar la raíz L4 a su paso por el lateral del disco.",
  },
  {
    id: 452,
    block: "raquis",
    code: "Maniobra de Bragard",
    image: null,
    prompt:
      "Durante la maniobra de Lasègue clásica, al llegar al punto en que aparece el dolor se desciende ligeramente la pierna y se realiza una dorsiflexión pasiva del tobillo, reproduciéndose el dolor. ¿Cómo se denomina esta maniobra complementaria y qué aporta?",
    options: [
      "Maniobra de Naffziger, que valora la presión del líquido cefalorraquídeo",
      "Lasègue invertido, que valora raíces lumbares altas",
      "Lasègue cruzado, que es patognomónico de estiramiento radicular en el lado contrario",
      "Maniobra de Bragard, que aumenta la especificidad para lesión radicular",
    ],
    correct: 3,
    explanation:
      "La maniobra de Bragard consiste en descender ligeramente la pierna tras el Lasègue y realizar dorsiflexión pasiva del tobillo; si reaparece el dolor, aumenta la especificidad para una lesión radicular.",
  },
  {
    id: 453,
    block: "raquis",
    code: "Lasègue invertido",
    image: null,
    prompt:
      "¿En qué situación clínica es útil realizar la maniobra de Lasègue invertida en lugar de la clásica?",
    options: [
      "Cuando se sospecha una discopatía en niveles lumbares altos, como L3-L4 o L2-L3",
      "Cuando se sospecha afectación de las raíces bajas L5-S1",
      "En cualquier paciente con lumbalgia, con independencia del nivel sospechado",
      "Para descartar patología de cadera asociada, sin relación con el nivel discal",
    ],
    correct: 0,
    explanation:
      "El Lasègue clásico valora raíces bajas (L5-S1); para valorar raíces más altas (L3-L4 o L2-L3) se realiza la maniobra de Lasègue invertida, con la cadera extendida y flexión de rodilla.",
  },
  {
    id: 454,
    block: "raquis",
    code: "Pruebas de Waddell",
    image: null,
    prompt:
      "Un paciente con lumbalgia presenta hipersensibilidad difusa a la palpación cutánea, hallazgos sensitivos no anatómicos y un Lasègue simulado positivo. ¿Qué sugiere este conjunto de hallazgos?",
    options: [
      "Una hernia discal secuestrada de gran tamaño",
      "La presencia de tres o más signos de Waddell positivos, sugestivos de un componente psicológico o rentista",
      "Un síndrome de la cola de caballo en fase inicial",
      "Una estenosis de canal lumbar severa",
    ],
    correct: 1,
    explanation:
      "Las pruebas funcionales de Waddell ayudan a detectar pacientes simuladores; si tres o más de estas pruebas son positivas, lo más probable es que se trate de un trastorno psicológico o rentista.",
  },
  {
    id: 455,
    block: "raquis",
    code: "Indicaciones absolutas de cirugía en HDL",
    image: null,
    prompt:
      "¿Cuáles son las indicaciones absolutas, aunque infrecuentes, de cirugía en la hernia discal lumbar?",
    options: [
      "El dolor radicular intratable y la ciática recurrente tras un episodio previo",
      "El síndrome de la cola de caballo y el déficit neurológico progresivo",
      "Cualquier hernia discal visible en la RM, con independencia de la clínica",
      "La lumbalgia crónica de más de 3 meses de evolución sin respuesta al tratamiento",
    ],
    correct: 1,
    explanation:
      "Las indicaciones absolutas de cirugía en la hernia discal lumbar, aunque infrecuentes, son el síndrome de la cola de caballo y el déficit neurológico progresivo; el resto de situaciones constituyen indicaciones relativas.",
  },
  {
    id: 456,
    block: "raquis",
    code: "Tiempo hasta la cirugía en cola de caballo",
    image: null,
    prompt:
      "En un paciente con síndrome de la cola de caballo de origen discal, ¿qué relación existe entre el tiempo hasta la cirugía y el pronóstico funcional?",
    options: [
      "Los pacientes operados antes de 24-48 horas tienen mejor pronóstico de recuperación que los intervenidos después de ese plazo",
      "El momento de la cirugía no influye en el pronóstico funcional del paciente",
      "Los pacientes intervenidos después de 48 horas presentan mejores resultados funcionales",
      "La cirugía debe demorarse varias semanas para permitir la estabilización del cuadro",
    ],
    correct: 0,
    explanation:
      "Casi el 90% de los pacientes operados con urgencia (antes de 24-48 horas) se recuperan en los primeros 6 meses, mientras que un 60% de los tratados después de ese plazo continúan con síntomas de debilidad y disfunción vesical al año.",
  },
  {
    id: 457,
    block: "raquis",
    code: "Reposo en la lumbalgia aguda",
    image: null,
    prompt:
      "En el tratamiento conservador de la lumbalgia aguda, ¿qué recomendación es correcta respecto al reposo en cama?",
    options: [
      "Debe mantenerse durante al menos 2-3 semanas para lograr la mejoría del cuadro",
      "Debe ser breve, evitando el reposo prolongado y las modalidades pasivas",
      "Es la medida terapéutica principal, por encima de la fisioterapia activa",
      "Se recomienda mantenerlo hasta la desaparición completa del dolor",
    ],
    correct: 1,
    explanation:
      "El tratamiento conservador de la lumbalgia aguda recomienda evitar el reposo en cama prolongado y las modalidades pasivas; la fisioterapia activa temprana proporciona mayor beneficio que el reposo o el tratamiento médico aislado.",
  },
  {
    id: 458,
    block: "raquis",
    code: "Arteria de Adamkiewicz",
    image: null,
    prompt:
      "Durante una cirugía de columna a nivel de T10, existe riesgo de lesionar una arteria crítica para la irrigación medular. ¿A qué estructura corresponde y qué consecuencia grave puede tener su lesión?",
    options: [
      "La arteria de Adamkiewicz, cuya lesión puede provocar un déficit neurológico grave por isquemia medular",
      "La arteria vertebral, cuya lesión provoca sobre todo síntomas vertiginosos transitorios",
      "La arteria carótida interna, cuya lesión compromete la irrigación cerebral",
      "La arteria subclavia, cuya lesión provoca isquemia del miembro superior",
    ],
    correct: 0,
    explanation:
      "La arteria de Adamkiewicz, localizada habitualmente en torno a T10, es una arteria radiculomedular crítica; su compresión o lesión crónica puede causar un déficit neurológico grave por isquemia medular.",
  },
  {
    id: 459,
    block: "raquis",
    code: "Clínica tardía tras discectomía",
    image: null,
    prompt:
      "Paciente intervenido de discectomía lumbar que, tras una mejoría inicial, comienza de nuevo con dolor radicular similar ocho meses después de la cirugía. ¿Cuál es la sospecha diagnóstica más probable?",
    options: [
      "Una discitis postoperatoria",
      "Un error en el nivel operado",
      "Una recidiva herniaria",
      "Una fibrosis perirradicular en fase inicial",
    ],
    correct: 2,
    explanation:
      "Cuando los síntomas reaparecen más de 6 meses después de la cirugía, la causa más probable es una recidiva herniaria, mientras que la discitis suele aparecer a las 3-6 semanas y la fibrosis perirradicular entre 1 y 6 meses tras la intervención.",
  },
  {
    id: 460,
    block: "raquis",
    code: "Abordaje en hernia torácica calcificada",
    image: null,
    prompt:
      "¿Qué abordaje quirúrgico se considera más adecuado para una hernia discal torácica sintomática, grande, central y calcificada?",
    options: [
      "La laminectomía estándar por vía posterior, por su menor tasa de complicaciones",
      "El abordaje posterolateral aislado, con independencia de la localización de la hernia",
      "El abordaje anterolateral (transtorácico), para evitar la retracción del elemento neuronal",
      "El tratamiento percutáneo con enzimas intradiscales",
    ],
    correct: 2,
    explanation:
      "En hernias torácicas sintomáticas, grandes, centrales y calcificadas, el abordaje anterolateral (transtorácico) es el más seguro y adecuado, ya que evita la retracción de la médula; la laminectomía estándar por vía posterior no se recomienda por su alta tasa de complicaciones neurológicas.",
  },
  {
    id: 461,
    block: "infantil",
    code: "RN con Ortolani positivo",
    image: null,
    prompt:
      "Recién nacido explorado en las primeras 72 horas de vida: al abducir la cadera con presión anterior sobre el trocánter mayor se percibe un resalte profundo, tipo \"clunk\", que indica reducción de la cabeza femoral. ¿Qué maniobra se ha realizado y qué implica el hallazgo?",
    options: [
      "Maniobra de Barlow; indica que la cadera se estaba luxando en ese momento",
      "Maniobra de Ortolani; indica que la cadera estaba luxada y se ha reducido",
      "Maniobra de Galeazzi; indica una dismetría de miembros por luxación alta",
      "Maniobra de Thomas; indica una contractura en flexión de cadera",
    ],
    correct: 1,
    explanation:
      "La maniobra de Ortolani reduce una cadera luxada empujando la cabeza femoral hacia delante mientras se abduce; el \"clunk\" percibido confirma que la cadera estaba luxada y se ha reducido.",
  },
  {
    id: 462,
    block: "infantil",
    code: "Factores de riesgo de DDC",
    image: null,
    prompt:
      "De los siguientes factores de riesgo para la displasia del desarrollo de la cadera, ¿cuál se considera, en general, el más determinante?",
    options: [
      "El alto peso al nacer",
      "La hiperlaxitud ligamentosa familiar",
      "La posición prenatal, sobre todo la presentación de nalgas",
      "El oligohidramnios",
    ],
    correct: 2,
    explanation:
      "Entre los factores de riesgo de DDC, la posición prenatal (especialmente la presentación de nalgas) se sitúa habitualmente en primer lugar de importancia, seguida de la historia familiar y la inestabilidad clínica en la exploración.",
  },
  {
    id: 463,
    block: "infantil",
    code: "Lactante de 4 meses, abducción asimétrica",
    image: null,
    prompt:
      "Lactante de 4 meses en el que las maniobras de Ortolani y Barlow ya no son útiles, pero se aprecia una abducción de cadera izquierda claramente menor que la derecha, con menos de 75º. ¿Qué sugiere este hallazgo?",
    options: [
      "Una oblicuidad pélvica con aducción funcional de la cadera derecha",
      "Una posible luxación de cadera izquierda con acortamiento de los aductores",
      "Una coxa vara del desarrollo bilateral",
      "Una deficiencia femoral focal proximal derecha",
    ],
    correct: 1,
    explanation:
      "A partir de los 2 meses, la limitación asimétrica a la abducción (por acortamiento funcional de los aductores) es un signo clave de cadera luxada, ya que las pruebas de inestabilidad de Ortolani y Barlow dejan de ser útiles.",
  },
  {
    id: 464,
    block: "infantil",
    code: "Ecografía de cribado en España",
    image: null,
    prompt:
      "Respecto al cribado de la displasia del desarrollo de la cadera en España, señale la afirmación correcta:",
    options: [
      "Se recomienda ecografía sistemática a todos los recién nacidos por ley",
      "El cribado se basa en la exploración clínica, con ecografía si hay factores de riesgo o exploración patológica",
      "El cribado se realiza mediante radiografía simple en las primeras 6 semanas de vida",
      "No existe ningún protocolo de cribado establecido para esta patología",
    ],
    correct: 1,
    explanation:
      "En España no hay legislación que obligue al cribado ecográfico universal; el modelo habitual combina exploración clínica a todos los recién nacidos con ecografía dirigida a quienes presentan alguno de los factores de riesgo principales o hallazgos patológicos.",
  },
  {
    id: 465,
    block: "infantil",
    code: "Graf tipo III",
    image: null,
    prompt:
      "En la ecografía de cadera de un lactante de 2 meses se obtiene un ángulo alfa de 40º y un ángulo beta de 80º. Según la clasificación de Graf, ¿qué tipo corresponde y qué tratamiento se plantea?",
    options: [
      "Tipo II, con seguimiento ecográfico sin tratamiento inicial",
      "Tipo IV, con indicación de artrografía y reducción cerrada",
      "Tipo III, con indicación de arnés de Pavlik",
      "Tipo I, sin necesidad de ningún tratamiento",
    ],
    correct: 2,
    explanation:
      "Un ángulo alfa menor de 43º con ángulo beta mayor de 77º corresponde al tipo III de Graf (lateralización de la cabeza femoral), cuyo tratamiento es el arnés de Pavlik.",
  },
  {
    id: 466,
    block: "infantil",
    code: "Ventana terapéutica del arnés de Pavlik",
    image: null,
    prompt:
      "Lactante de 4 semanas diagnosticado de cadera luxada, tratado con arnés de Pavlik. Tras 3 semanas de tratamiento correctamente aplicado, la cadera permanece inestable pese a un intento adicional con férula de abducción. ¿Cuál sería el siguiente paso terapéutico razonable?",
    options: [
      "Mantener el arnés de Pavlik de forma indefinida hasta lograr la estabilidad",
      "Pasar a artrografía, reducción cerrada con yeso pelvipédico y tenotomía de aductores si es necesario",
      "Indicar directamente una osteotomía de Salter sin intentar la reducción cerrada",
      "Suspender cualquier tratamiento y reevaluar a los 12 meses de edad",
    ],
    correct: 1,
    explanation:
      "Si tras 3 semanas de arnés (y, en su caso, una semana más con férula de abducción) la cadera sigue inestable, el siguiente escalón terapéutico es la artrografía con reducción cerrada, yeso pelvipédico y tenotomía de aductores cuando sea necesaria.",
  },
  {
    id: 467,
    block: "infantil",
    code: "Zona de seguridad de Ramsey",
    image: null,
    prompt:
      "¿Cómo se define la zona de seguridad de Ramsey en el contexto de la reducción cerrada de una cadera luxada?",
    options: [
      "El rango de movilidad de cadera en el que ésta se mantiene reducida y estable",
      "El grado de abducción máxima que tolera la cadera antes de producir necrosis avascular",
      "El área de la piel donde debe fijarse el arnés de Pavlik para evitar lesiones cutáneas",
      "El rango de rotación interna necesario para reducir la cabeza femoral",
    ],
    correct: 0,
    explanation:
      "La zona de seguridad de Ramsey es el rango de movilidad en el que la cadera reducida permanece estable; cuanto más amplia sea esta zona, más estable se considera la reducción obtenida.",
  },
  {
    id: 468,
    block: "infantil",
    code: "Obstáculos a la reducción cerrada",
    image: null,
    prompt:
      "De las siguientes estructuras, ¿cuál NO se considera clásicamente un obstáculo que impide la reducción abierta de una cadera luxada?",
    options: [
      "El ligamento transverso acetabular",
      "El tendón del psoas ilíaco",
      "El ligamento iliofemoral hipertrofiado",
      "El ligamento redondo hipertrofiado",
    ],
    correct: 2,
    explanation:
      "Los 6 obstáculos clásicos a la reducción son el ligamento transverso acetabular, el pulvinar, el labrum deformado, la retracción capsular inferior, el tendón del psoas ilíaco y el ligamento redondo hipertrofiado; el ligamento iliofemoral no forma parte de este grupo.",
  },
  {
    id: 469,
    block: "infantil",
    code: "Reducción abierta según la edad",
    image: null,
    prompt:
      "Niño de 8 meses con cadera luxada en el que ha fracasado el tratamiento con arnés y la artrografía descarta una reducción cerrada satisfactoria. ¿Qué vía de abordaje para la reducción abierta sería la más adecuada a esta edad?",
    options: [
      "La vía anterior de Smith-Petersen, asociando siempre osteotomía pélvica",
      "La vía medial de Ludloff, ya que a esta edad basta con la reducción sin osteotomía",
      "La vía posterolateral, por ser la de menor riesgo neurovascular",
      "La vía transtrocantérea, reservada para displasias residuales del adulto",
    ],
    correct: 1,
    explanation:
      "En menores de 1 año la vía medial (Ludloff, con la variante de Mau) permite reducir la cadera luxada aprovechando la capacidad remodeladora del acetábulo, sin necesidad de asociar osteotomía pélvica.",
  },
  {
    id: 470,
    block: "infantil",
    code: "Cadera luxada en niño de 2 años y medio",
    image: null,
    prompt:
      "Niño de 2 años y medio con cadera luxada congénita no tratada previamente. ¿Cuál es el planteamiento quirúrgico más habitual a esta edad?",
    options: [
      "Reducción abierta con osteotomía de acortamiento y derrotación femoral y osteotomía de Salter",
      "Arnés de Pavlik prolongado durante 6 meses antes de valorar cirugía",
      "Reducción cerrada bajo anestesia sin necesidad de artrografía previa",
      "Osteotomía periacetabular de Ganz como primer escalón terapéutico",
    ],
    correct: 0,
    explanation:
      "En niños de 2-3 años con cadera luxada, el tratamiento habitual combina reducción abierta, osteotomía de acortamiento y derrotación femoral, capsuloplastia y osteotomía de Salter para mejorar la cobertura acetabular.",
  },
  {
    id: 471,
    block: "infantil",
    code: "Osteotomía de Salter",
    image: null,
    prompt:
      "¿En qué consiste, de forma básica, la osteotomía de Salter para el tratamiento de la displasia acetabular?",
    options: [
      "Una osteotomía incompleta del ilíaco hasta el cartílago trirradiado, que actúa como bisagra",
      "Una osteotomía completa del ilíaco por encima del acetábulo que permite rotarlo hacia delante y lateral",
      "Una osteotomía periacetabular que respeta la columna posterior de la pelvis",
      "Una osteotomía femoral valguizante y desrotadora asociada a acortamiento",
    ],
    correct: 1,
    explanation:
      "La osteotomía de Salter secciona el ilíaco por encima del acetábulo hasta la escotadura ciática mayor, permitiendo rotar el fragmento acetabular hacia delante y lateralmente, fijándolo con un injerto óseo triangular.",
  },
  {
    id: 472,
    block: "infantil",
    code: "Osteotomía de Dega vs Pemberton",
    image: null,
    prompt:
      "¿Qué característica distingue principalmente a la osteotomía de Dega frente a la de Pemberton?",
    options: [
      "La osteotomía de Dega aumenta el volumen acetabular, al contrario que la de Pemberton",
      "La osteotomía de Dega se indica sobre todo en luxaciones de origen neurológico con déficit posterosuperior",
      "La osteotomía de Dega se realiza siempre asociada a una osteotomía femoral",
      "La osteotomía de Dega no requiere el cartílago trirradiado abierto para poder realizarse",
    ],
    correct: 1,
    explanation:
      "La osteotomía de Dega se indica principalmente en luxaciones de origen neurológico (como en la parálisis cerebral infantil) con déficit de cobertura superior y posterior, mientras que la de Pemberton se emplea sobre todo cuando hay incongruencia articular.",
  },
  {
    id: 473,
    block: "infantil",
    code: "Test de Ober en oblicuidad pélvica",
    image: null,
    prompt:
      "Lactante de 5 meses con miembro inferior derecho abducido, asimetría de pliegues y limitación moderada a la abducción del lado contralateral. Ortolani y Barlow negativos. ¿Qué exploración confirma el diagnóstico más probable?",
    options: [
      "El test de Galeazzi, que mostraría una dismetría real de miembros",
      "El test de Ober, que sería positivo al no poder llevar el muslo abducido a la línea media",
      "La maniobra de Thomas, que mostraría una contractura en flexión de cadera",
      "La prueba de limitación a la abducción bilateral simétrica",
    ],
    correct: 1,
    explanation:
      "El cuadro descrito corresponde a una oblicuidad pélvica (contractura en abducción), en la que el test de Ober positivo (imposibilidad de llevar el muslo abducido hasta la línea media) es la exploración más característica.",
  },
  {
    id: 474,
    block: "infantil",
    code: "Oblicuidad pélvica vs DDC",
    image: null,
    prompt:
      "Respecto a la oblicuidad pélvica (contractura en abducción de cadera), señale la afirmación correcta:",
    options: [
      "Es menos frecuente que la displasia del desarrollo de la cadera",
      "El acortamiento aparente aparece en la cadera abducida y no en la contralateral",
      "Es más frecuente que la DDC y puede simular displasia en la cadera contralateral aducida",
      "Los test de Ortolani y Barlow suelen ser positivos en la cadera contralateral",
    ],
    correct: 2,
    explanation:
      "La oblicuidad pélvica es mucho más frecuente que la DDC; la cadera contralateral, al mantenerse en aducción funcional, acorta sus aductores y da una falsa sensación de displasia en esa cadera.",
  },
  {
    id: 475,
    block: "infantil",
    code: "Deficiencia femoral focal proximal tipo D",
    image: null,
    prompt:
      "Recién nacido con una deficiencia femoral focal proximal clasificada como tipo D de Aitken. ¿Qué hallazgo anatómico caracteriza a este tipo, el más grave de la clasificación?",
    options: [
      "Existe cabeza y cotilo, aunque ambos son hipoplásicos",
      "No existe acetábulo ni cadera",
      "Hay acortamiento con incurvación proximal, con acetábulo adecuado",
      "El fémur proximal está ausente, pero el acetábulo es displásico",
    ],
    correct: 1,
    explanation:
      "El tipo D de Aitken (Pappas II) es el más grave de la clasificación de la deficiencia femoral focal proximal, y se caracteriza por la ausencia tanto de acetábulo como de cadera.",
  },
  {
    id: 476,
    block: "infantil",
    code: "Anomalía concomitante más frecuente",
    image: null,
    prompt:
      "En la deficiencia femoral focal proximal, las anomalías concomitantes aparecen hasta en dos tercios de los casos. ¿Cuál es la más frecuente de todas ellas?",
    options: [
      "El déficit longitudinal congénito del peroné",
      "La agenesia de los ligamentos cruzados",
      "El acortamiento aislado de tibia y peroné",
      "La rótula alta o hipoplásica",
    ],
    correct: 0,
    explanation:
      "Entre las anomalías concomitantes de la deficiencia femoral focal proximal, el déficit longitudinal congénito del peroné es el más frecuente, presente hasta en la mitad de los casos.",
  },
  {
    id: 477,
    block: "infantil",
    code: "Hipoplasia congénita de fémur",
    image: null,
    prompt:
      "Niño con hipoplasia congénita de fémur unilateral en el que, según la evolución del acortamiento, se prevé una dismetría de 4 cm al finalizar el crecimiento. ¿Qué actitud terapéutica se ajusta mejor a esta previsión?",
    options: [
      "Uso de alza en el calzado de forma exclusiva hasta el final del crecimiento",
      "Epifisiodesis contralateral programada",
      "Elongación ósea del fémur afecto en varias fases",
      "Rotación plastia de Van-Nes para igualar la longitud funcional",
    ],
    correct: 1,
    explanation:
      "Para dismetrías previstas entre 2 y 5 cm al final del crecimiento, la epifisiodesis contralateral es la opción terapéutica habitual; el alza se reserva para dismetrías menores de 2 cm y la elongación ósea para las mayores de 5 cm.",
  },
  {
    id: 478,
    block: "infantil",
    code: "Coxa vara del desarrollo, indicación quirúrgica",
    image: null,
    prompt:
      "Niño de 18 meses con coxa vara del desarrollo, ángulo cervicodiafisario de 95º y ángulo epifisario de Hilgenreiner de 65º. ¿Cuál es la actitud terapéutica más adecuada?",
    options: [
      "Tratamiento conservador con estiramientos de aductores, dado que la mayoría se resuelven espontáneamente",
      "Observación clínica y radiográfica seriada hasta los 3 años antes de decidir",
      "Tratamiento quirúrgico mediante osteotomía valguizante desrotadora",
      "Colocación de un arnés de Pavlik hasta la normalización del ángulo cervicodiafisario",
    ],
    correct: 2,
    explanation:
      "Con un ángulo epifisario de Hilgenreiner mayor de 60º y un ángulo cervicodiafisario menor de 100º, la deformidad va a progresar, por lo que está indicado el tratamiento quirúrgico mediante osteotomía valguizante, idealmente entre 1,5 y 2 años.",
  },
  {
    id: 479,
    block: "infantil",
    code: "Coxa vara congénita vs del desarrollo",
    image: null,
    prompt:
      "¿Qué diferencia fundamental permite distinguir la coxa vara congénita de la coxa vara del desarrollo?",
    options: [
      "La coxa vara congénita se manifiesta al comenzar la marcha, y la del desarrollo desde el nacimiento",
      "La coxa vara congénita está presente ya en el momento del nacimiento, asociada a displasias óseas o al déficit focal proximal del fémur",
      "La coxa vara del desarrollo es bilateral en la práctica totalidad de los casos y la congénita es siempre unilateral",
      "La coxa vara congénita no se asocia nunca a alteraciones del ángulo epifisario de Hilgenreiner",
    ],
    correct: 1,
    explanation:
      "La coxa vara congénita está presente desde el nacimiento y puede deberse a un déficit focal proximal del fémur o a displasias óseas como el Morquio, mientras que la coxa vara del desarrollo aparece por un defecto progresivo de la fisis y se manifiesta al iniciar la marcha.",
  },
  {
    id: 480,
    block: "infantil",
    code: "Marcha de Trendelenburg en coxa vara",
    image: null,
    prompt:
      "Niño de 3 años que comienza a caminar con cojera indolora y signo de Trendelenburg positivo. ¿Qué mecanismo explica principalmente esta alteración de la marcha en la coxa vara del desarrollo?",
    options: [
      "Una insuficiencia funcional del glúteo medio por disminución de su brazo de palanca",
      "Una contractura fija en flexión de la cadera afecta",
      "Una dismetría de miembros inferiores mayor de 5 cm",
      "Una parálisis del nervio femoral asociada",
    ],
    correct: 0,
    explanation:
      "En la coxa vara del desarrollo, la disminución del ángulo cervicodiafisario reduce el brazo de palanca del glúteo medio, lo que provoca una insuficiencia funcional de este músculo y el característico signo de Trendelenburg.",
  },
  {
    id: 481,
    block: "infantil",
    code: "Displasia epifisaria múltiple",
    image: null,
    prompt:
      "Niño de 7 años con talla moderadamente corta, dificultad para correr y dolor articular en caderas y rodillas que empeora con el crecimiento, con retraso bilateral en la aparición de varios núcleos epifisarios. ¿Qué diagnóstico es más probable?",
    options: [
      "Una displasia de Meyer bilateral",
      "Una displasia epifisaria múltiple de herencia autosómica dominante",
      "Una enfermedad de Perthes bilateral",
      "Una coxa vara del desarrollo bilateral",
    ],
    correct: 1,
    explanation:
      "La afectación bilateral de múltiples núcleos epifisarios, con talla corta moderada e inteligencia normal, orienta a una displasia epifisaria múltiple, un trastorno genético autosómico dominante que puede no detectarse hasta los 5-10 años.",
  },
  {
    id: 482,
    block: "infantil",
    code: "Displasia de Meyer vs Perthes",
    image: null,
    prompt:
      "Niño de 3 años en el que, de forma casual al hacer una radiografía de pelvis por otro motivo, se aprecia una irregularidad bilateral del núcleo de osificación de la cabeza femoral, sin dolor ni cojera. ¿Qué dato apoya el diagnóstico de displasia de Meyer frente a una enfermedad de Perthes?",
    options: [
      "La aparición de dolor intenso y cojera progresiva",
      "El hallazgo casual y asintomático, sin fragmentación ni colapso epifisario",
      "La afectación unilateral exclusiva de la cadera",
      "La aparición del cuadro después de los 8 años de edad",
    ],
    correct: 1,
    explanation:
      "La displasia de Meyer suele diagnosticarse de forma casual y asintomática, sin la secuencia de fragmentación, condensación y colapso epifisario propia de la enfermedad de Perthes, que sí cursa con dolor y cojera.",
  },
  {
    id: 483,
    block: "infantil",
    code: "Contraindicaciones del arnés de Pavlik",
    image: null,
    prompt:
      "¿En cuál de las siguientes situaciones debe extremarse la vigilancia o valorarse evitar el tratamiento con arnés de Pavlik?",
    options: [
      "En un recién nacido con cadera luxable detectada a las 48 horas de vida",
      "En un lactante con laxitud ligamentosa marcada, como en el síndrome de Ehlers-Danlos",
      "En un lactante con cadera displásica sin luxación franca",
      "En un recién nacido con antecedente de presentación de nalgas",
    ],
    correct: 1,
    explanation:
      "El arnés de Pavlik requiere especial vigilancia (y puede estar contraindicado) en situaciones de mayor debilidad muscular, mayor rigidez articular o gran laxitud ligamentosa, como ocurre en el síndrome de Ehlers-Danlos.",
  },
  {
    id: 484,
    block: "infantil",
    code: "Complicación del arnés de Pavlik",
    image: null,
    prompt:
      "Lactante en tratamiento con arnés de Pavlik que mantiene la cadera en una flexión superior a 120º de forma prolongada. ¿Qué complicación neurológica es más probable en este contexto?",
    options: [
      "Una parálisis del nervio ciático",
      "Una parálisis del nervio femoral",
      "Una lesión del nervio obturador",
      "Una lesión del plexo lumbosacro completo",
    ],
    correct: 1,
    explanation:
      "Una flexión excesiva y mantenida de la cadera con el arnés de Pavlik (por encima de 120º) puede provocar una parálisis del nervio femoral, una de las complicaciones descritas de este tratamiento.",
  },
  {
    id: 485,
    block: "infantil",
    code: "Diagnóstico diferencial de coxa vara",
    image: null,
    prompt:
      "Niño de 4 años con disminución progresiva del ángulo cervicodiafisario y antecedente de necrosis avascular de cabeza femoral tratada previamente. ¿Cómo se clasifica esta forma de coxa vara respecto a las descritas en el desarrollo?",
    options: [
      "Como una coxa vara del desarrollo típica, indistinguible de la idiopática",
      "Como una coxa vara congénita, ya que toda coxa vara secundaria se considera congénita",
      "Como una causa adquirida de coxa vara, diferente de la congénita y de la del desarrollo",
      "Como una variante de displasia epifisaria múltiple",
    ],
    correct: 2,
    explanation:
      "La coxa vara secundaria a necrosis avascular (por ejemplo tras una DDC o una enfermedad de Perthes) se clasifica como una causa adquirida de coxa vara, distinta tanto de la forma congénita como de la coxa vara del desarrollo propiamente dicha.",
  },
  {
    id: 486,
    block: "infantil",
    code: "Cojera indolora insidiosa en niño de 6 años",
    image: null,
    prompt:
      "Niño de 6 años con cojera indolora de inicio insidioso, limitación de la abducción y la rotación interna de cadera. La radiografía muestra una cabeza femoral más pequeña y densa, con una fractura subcondral. ¿Qué diagnóstico es más probable?",
    options: [
      "Una sinovitis transitoria de cadera en fase de resolución",
      "Una enfermedad de Perthes en fase de necrosis",
      "Una epifisiolisis femoral proximal estable",
      "Una artritis séptica de cadera de curso subagudo",
    ],
    correct: 1,
    explanation:
      "La cojera indolora de inicio insidioso junto con una cabeza femoral pequeña, densa y con fractura subcondral es característica de la fase de necrosis de la enfermedad de Perthes.",
  },
  {
    id: 487,
    block: "infantil",
    code: "Etiología actual de la enfermedad de Perthes",
    image: null,
    prompt:
      "Respecto a la etiología de la enfermedad de Perthes, señale la afirmación correcta según el conocimiento actual:",
    options: [
      "Se considera una osteonecrosis multifactorial en la que intervienen factores mecánicos, ambientales y vasculares",
      "La sinovitis transitoria de cadera se mantiene como la causa principal aceptada",
      "Se trata de una enfermedad de causa infecciosa demostrada en la mayoría de los casos",
      "Su origen es exclusivamente genético, con un patrón de herencia autosómico dominante",
    ],
    correct: 0,
    explanation:
      "La antigua hipótesis de la sinovitis transitoria como causa de la enfermedad de Perthes se considera hoy descartada; el modelo actual es multifactorial, con participación de factores mecánicos, ambientales y vasculares (trombofilias, microangiopatía epifisaria, alteración del drenaje venoso).",
  },
  {
    id: 488,
    block: "infantil",
    code: "Perthes Herring A en niño de 4 años",
    image: null,
    prompt:
      "Niño de 4 años con enfermedad de Perthes clasificada como grupo A de Herring. ¿Cuál es la actitud terapéutica más adecuada?",
    options: [
      "Osteotomía pélvica de contención de entrada",
      "Tratamiento conservador con control del dolor y fisioterapia",
      "Osteotomía femoral varizante precoz",
      "Artrodiástasis con fijador externo",
    ],
    correct: 1,
    explanation:
      "El grupo A de Herring tiene buen pronóstico a cualquier edad y se maneja con tratamiento conservador, orientado a mantener la movilidad y controlar el dolor, sin necesidad de cirugía de contención.",
  },
  {
    id: 489,
    block: "infantil",
    code: "Perthes con subluxación en niño de 7 años",
    image: null,
    prompt:
      "Niño de 7 años con enfermedad de Perthes en fase de necrosis, Herring B y signos radiográficos de subluxación lateral de la cabeza femoral. ¿Qué actitud terapéutica es la más indicada?",
    options: [
      "Observación con revisiones periódicas sin ninguna otra medida",
      "Férula de abducción de Atlanta Scottish Rite como tratamiento aislado",
      "Cirugía de contención precoz, habitualmente mediante osteotomía femoral varizante",
      "Artroplastia total de cadera diferida a la edad adulta",
    ],
    correct: 2,
    explanation:
      "En mayores de 6 años con signos radiográficos de riesgo o subluxación lateral y afectación moderada del pilar lateral (Herring B o B/C), está indicada la cirugía de contención precoz, siendo la osteotomía femoral varizante la técnica de elección actual.",
  },
  {
    id: 490,
    block: "infantil",
    code: "Contención precoz: elección técnica",
    image: null,
    prompt:
      "¿Cuál es, en la actualidad, la técnica quirúrgica más utilizada para la cirugía de contención precoz en la enfermedad de Perthes?",
    options: [
      "La osteotomía pélvica de Salter",
      "La osteotomía femoral varizante",
      "La osteotomía periacetabular de Ganz",
      "La técnica de Shelf o tectoplastia",
    ],
    correct: 1,
    explanation:
      "La osteotomía femoral varizante es la técnica de elección actual para la contención precoz, ya que disminuye la presión sobre el pilar lateral, acorta la fase de fragmentación y mejora la esfericidad final, requiriendo solo 10-15º de varización.",
  },
  {
    id: 491,
    block: "infantil",
    code: "Bisagra en abducción irreducible",
    image: null,
    prompt:
      "En un niño con enfermedad de Perthes en fase reconstructiva, la artrografía dinámica confirma una abducción en bisagra irreducible. ¿Qué tratamiento es el más adecuado en esta situación?",
    options: [
      "Una osteotomía pélvica periacetabular tipo Ganz",
      "Una osteotomía tipo Shelf o tectoplastia",
      "Una osteotomía de Chiari para aumentar la cobertura",
      "Una osteotomía femoral valguizante",
    ],
    correct: 3,
    explanation:
      "Cuando la bisagra de abducción es irreducible, el tratamiento indicado es la osteotomía femoral valguizante, que mejora la congruencia articular y alivia el dolor; las osteotomías pélvicas se reservan para la bisagra reducible.",
  },
  {
    id: 492,
    block: "infantil",
    code: "Clasificación de Herring, grupo B/C",
    image: null,
    prompt:
      "¿Qué caracteriza al grupo B/C de la clasificación del pilar lateral de Herring en la enfermedad de Perthes?",
    options: [
      "Una pérdida de aproximadamente el 50% de la altura del pilar lateral",
      "Una conservación completa de la altura y densidad del pilar lateral",
      "Un colapso completo del pilar lateral, con pérdida mayor del 50%",
      "Una afectación exclusiva de la epífisis anterior de la cabeza femoral",
    ],
    correct: 0,
    explanation:
      "El grupo B/C de Herring corresponde a una pérdida de aproximadamente el 50% de la altura del pilar lateral, situación intermedia que se subdivide a su vez en tres subgrupos según la anchura, densidad y altura del pilar.",
  },
  {
    id: 493,
    block: "infantil",
    code: "Signos de cabeza en riesgo de Catterall",
    image: null,
    prompt:
      "De los siguientes hallazgos radiográficos, ¿cuál NO forma parte de los signos clásicos de \"cabeza en riesgo\" descritos por Catterall en la enfermedad de Perthes?",
    options: [
      "La subluxación lateral de la cabeza femoral",
      "El signo de Gage",
      "El aumento de tamaño del núcleo de osificación epifisario",
      "La horizontalización de la fisis",
    ],
    correct: 2,
    explanation:
      "Los signos de cabeza en riesgo de Catterall son la subluxación lateral (el más importante), el signo de Gage, la calcificación epifisaria excéntrica, la horizontalización de la fisis y el quiste metafisario; el aumento del núcleo de osificación no forma parte de ellos y orienta más a una artritis idiopática juvenil.",
  },
  {
    id: 494,
    block: "infantil",
    code: "Resultado final: Stulberg II",
    image: null,
    prompt:
      "Tras la curación de una enfermedad de Perthes, se valora la cadera y se observa una cabeza esférica pero de mayor tamaño que la contralateral, con un cuello algo más corto. ¿Qué clase de la clasificación de Stulberg corresponde?",
    options: [
      "Clase I",
      "Clase III",
      "Clase II",
      "Clase IV",
    ],
    correct: 2,
    explanation:
      "La clase II de Stulberg se define por una cabeza esférica pero de mayor tamaño (coxa magna), con cuello corto (coxa breva) o acetábulo inclinado, a diferencia de la clase I, que es indistinguible de la cadera sana.",
  },
  {
    id: 495,
    block: "infantil",
    code: "Factor pronóstico principal en Perthes",
    image: null,
    prompt:
      "De los factores pronósticos descritos en la enfermedad de Perthes, ¿cuál se considera, junto con la gravedad radiológica, uno de los más determinantes?",
    options: [
      "El sexo masculino del paciente",
      "La edad al inicio de los síntomas",
      "La lateralidad de la cadera afectada",
      "El antecedente de traumatismo leve previo",
    ],
    correct: 1,
    explanation:
      "La edad al inicio de los síntomas es uno de los factores pronósticos más importantes en la enfermedad de Perthes: a menor edad, mejor pronóstico, especialmente por debajo de los 6 años, mientras que después de los 8 años el pronóstico empeora por la limitada capacidad de remodelación.",
  },
  {
    id: 496,
    block: "infantil",
    code: "Dolor de cadera tras catarro en niño de 3 años",
    image: null,
    prompt:
      "Niño de 3 años con dolor agudo de cadera y rechazo al apoyo, que la semana previa presentó un cuadro catarral. Está afebril, con buen estado general. La ecografía muestra un pequeño derrame articular y la radiografía es normal. ¿Cuál es el diagnóstico más probable?",
    options: [
      "Una artritis séptica de cadera en fase inicial",
      "Una sinovitis transitoria de cadera",
      "Una enfermedad de Perthes en fase de necrosis",
      "Una epifisiolisis femoral proximal aguda",
    ],
    correct: 1,
    explanation:
      "El cuadro de dolor agudo con buen estado general, antecedente catarral reciente, derrame ecográfico y radiografía normal es característico de la sinovitis transitoria de cadera, la causa más frecuente de dolor de cadera en menores de 10 años.",
  },
  {
    id: 497,
    block: "infantil",
    code: "Criterios de Kocher-Caird",
    image: null,
    prompt:
      "¿Cuál de los siguientes NO forma parte de los criterios de Kocher-Caird utilizados para predecir una artritis séptica de cadera frente a una sinovitis transitoria?",
    options: [
      "Fiebre mayor de 38,5º",
      "Incapacidad para la carga de peso",
      "PCR mayor de 2 mg/dl",
      "Antecedente de traumatismo leve en las 2 semanas previas",
    ],
    correct: 3,
    explanation:
      "Los criterios de Kocher-Caird son fiebre >38,5º, leucocitosis >12.000/mm3, incapacidad para el apoyo, VSG >40 mm/h y PCR >2 mg/dl; el antecedente traumático no forma parte de estos criterios predictivos.",
  },
  {
    id: 498,
    block: "infantil",
    code: "Niño febril con incapacidad para el apoyo",
    image: null,
    prompt:
      "Niño de 2 años con fiebre de 39º, incapacidad completa para el apoyo del miembro afecto, leucocitosis y PCR de 6 mg/dl. ¿Cuál es la actitud más adecuada ante esta sospecha diagnóstica?",
    options: [
      "Iniciar AINEs y reevaluar en 48 horas de forma ambulatoria",
      "Solicitar una resonancia magnética programada en los próximos días",
      "Indicar reposo relativo y control analítico en 1-2 semanas",
      "Realizar una artrocentesis y valorar drenaje con inicio de antibioterapia intravenosa urgente",
    ],
    correct: 3,
    explanation:
      "Con varios criterios de Kocher-Caird presentes, la sospecha de artritis séptica es alta y obliga a actuar con urgencia: artrocentesis diagnóstica, drenaje si procede e inicio de antibioterapia intravenosa, dado el riesgo de destrucción articular si se retrasa el tratamiento.",
  },
  {
    id: 499,
    block: "infantil",
    code: "Sinovitis vs artritis séptica: estado general",
    image: null,
    prompt:
      "¿Qué dato clínico ayuda mejor a diferenciar, en la exploración inicial, una sinovitis transitoria de cadera de una artritis séptica?",
    options: [
      "La lateralidad de la cadera afectada",
      "La edad del paciente en el momento de la consulta",
      "El estado general del niño, conservado en la sinovitis y afectado en la artritis séptica",
      "La presencia de dolor a la palpación inguinal",
    ],
    correct: 2,
    explanation:
      "En la sinovitis transitoria el niño mantiene un buen estado general, afebril o con febrícula, mientras que en la artritis séptica el estado general está afectado, con fiebre alta y mayor dolor y limitación global de la movilidad.",
  },
  {
    id: 500,
    block: "infantil",
    code: "Adolescente obeso con dolor de rodilla",
    image: null,
    prompt:
      "Adolescente de 12 años con obesidad que consulta por dolor de rodilla de varias semanas de evolución, sin antecedente traumático claro, con cojera y progresión externa del pie. La exploración de cadera muestra una limitación marcada de la rotación interna. ¿Qué diagnóstico es más probable?",
    options: [
      "Una condromalacia rotuliana aislada",
      "Una epifisiolisis femoral proximal con dolor referido a la rodilla",
      "Una sinovitis transitoria de cadera",
      "Una enfermedad de Osgood-Schlatter",
    ],
    correct: 1,
    explanation:
      "Hasta un 30% de las epifisiolisis femorales proximales debutan con dolor de rodilla aislado, lo que retrasa el diagnóstico; la limitación marcada de la rotación interna pasiva de cadera es el signo clínico clave que orienta al diagnóstico correcto.",
  },
  {
    id: 501,
    block: "infantil",
    code: "Signo más precoz de EFP",
    image: null,
    prompt:
      "¿Cuál es el signo clínico más precoz y significativo para sospechar una epifisiolisis femoral proximal en un adolescente con dolor de cadera atraumático?",
    options: [
      "La limitación a la rotación interna pasiva de la cadera",
      "El acortamiento del miembro afectado",
      "La atrofia del muslo por desuso",
      "La limitación a la rotación externa pasiva de la cadera",
    ],
    correct: 0,
    explanation:
      "La limitación marcada de la rotación interna pasiva de la cadera es el signo más precoz y significativo de la epifisiolisis femoral proximal, y debe explorarse de forma específica ante cualquier dolor de cadera o rodilla en la adolescencia.",
  },
  {
    id: 502,
    block: "infantil",
    code: "EFP estable, deslizamiento leve",
    image: null,
    prompt:
      "Adolescente de 13 años con epifisiolisis femoral proximal estable, crónica, con un ángulo capitodiafisario de 25º. ¿Cuál es el tratamiento de elección?",
    options: [
      "Fijación in situ percutánea con un tornillo canulado",
      "Reducción abierta mediante procedimiento de Dunn modificado",
      "Osteotomía de Southwick biplanar de entrada",
      "Tracción cutánea seguida de fijación con agujas de Kirschner",
    ],
    correct: 0,
    explanation:
      "En un deslizamiento leve (≤30º) y estable, el tratamiento de elección es la fijación in situ percutánea con un único tornillo canulado grueso, evitando la reducción forzada de la cabeza femoral.",
  },
  {
    id: 503,
    block: "infantil",
    code: "EFP inestable con deslizamiento grave",
    image: null,
    prompt:
      "Adolescente con epifisiolisis femoral proximal aguda e inestable, con incapacidad para el apoyo y un deslizamiento superior a 60º. ¿Cuál de las siguientes opciones terapéuticas es razonable en este contexto?",
    options: [
      "Reposo domiciliario con AINEs y reevaluación en 2 semanas",
      "Fijación in situ diferida hasta que el paciente recupere el apoyo espontáneamente",
      "Reducción cerrada suave con fijación percutánea, o un procedimiento abierto controlado como el de Dunn modificado",
      "Tratamiento exclusivamente rehabilitador sin cirugía",
    ],
    correct: 2,
    explanation:
      "En las formas inestables con deslizamiento grave se opta por una reducción cerrada suave con fijación percutánea, o cada vez más por procedimientos abiertos que permiten una reducción controlada, como la técnica de Parsch o el procedimiento de Dunn modificado.",
  },
  {
    id: 504,
    block: "infantil",
    code: "Clasificación de Loder",
    image: null,
    prompt:
      "¿En qué se basa la clasificación de Loder para dividir la epifisiolisis femoral proximal en estable e inestable?",
    options: [
      "En el grado de desplazamiento medido en la radiografía lateral",
      "En la capacidad del paciente para cargar peso sobre la extremidad afectada",
      "En el tiempo de evolución de los síntomas antes del diagnóstico",
      "En la edad del paciente en el momento del diagnóstico",
    ],
    correct: 1,
    explanation:
      "La clasificación de Loder divide la epifisiolisis en estable e inestable según la capacidad del paciente para cargar peso; es el mejor predictor de necrosis avascular, con un riesgo mucho mayor en las formas inestables.",
  },
  {
    id: 505,
    block: "infantil",
    code: "Fijación profiláctica contralateral",
    image: null,
    prompt:
      "Adolescente de 13 años intervenido de una epifisiolisis femoral proximal derecha. ¿En cuál de las siguientes situaciones estaría indicada la fijación profiláctica de la cadera contralateral?",
    options: [
      "Si el paciente tiene un hermano mayor con antecedente de la misma enfermedad",
      "Si existen dudas sobre la capacidad de la familia para el adecuado seguimiento del niño",
      "Si el paciente presenta una talla superior al percentil 75",
      "Si el deslizamiento de la cadera intervenida fue menor de 30º",
    ],
    correct: 1,
    explanation:
      "La fijación profiláctica de la cadera contralateral se plantea en formas atípicas asociadas a trastornos endocrinos, cuando existen dudas sobre el adecuado seguimiento familiar, o cuando el ángulo alfa o el ángulo de inclinación posterior de la cadera sana superan los valores umbral descritos.",
  },
  {
    id: 506,
    block: "infantil",
    code: "Flexo de cadera tras cirugía de EFP",
    image: null,
    prompt:
      "Adolescente intervenido de fijación in situ por epifisiolisis femoral proximal que, en el postoperatorio, desarrolla una rigidez progresiva con dolor y aparición de un flexo de cadera. ¿Qué complicación debe sospecharse en primer lugar?",
    options: [
      "Una condrólisis de cadera",
      "Un choque femoroacetabular tipo Cam",
      "Una fractura periimplante asintomática",
      "Una recidiva del deslizamiento epifisario",
    ],
    correct: 0,
    explanation:
      "La aparición de un flexo de cadera con rigidez progresiva y dolor tras el tratamiento de una epifisiolisis obliga a sospechar una condrólisis, una necrosis aguda del cartílago articular que puede evolucionar a artrosis y anquilosis si no se trata.",
  },
  {
    id: 507,
    block: "infantil",
    code: "Necrosis avascular según estabilidad",
    image: null,
    prompt:
      "Respecto a la necrosis avascular como complicación de la epifisiolisis femoral proximal, señale la afirmación correcta:",
    options: [
      "Su incidencia es similar en las formas estables e inestables",
      "Aparece con mayor frecuencia en las formas inestables que en las estables",
      "Solo se produce cuando se emplean más de dos tornillos en la fijación",
      "Es más frecuente en los deslizamientos leves que en los graves",
    ],
    correct: 1,
    explanation:
      "La necrosis avascular aparece en torno al 23% de las epifisiolisis inestables, frente a un 3% en las estables, y se relaciona también con la reducción forzada, la magnitud del desplazamiento y la mala colocación de los tornillos.",
  },
  {
    id: 508,
    block: "infantil",
    code: "Choque femoroacetabular tras EFP",
    image: null,
    prompt:
      "Adolescente con antecedente de epifisiolisis femoral proximal tratada años atrás, que consulta por dolor inguinal que aparece con la flexión, la aducción y la rotación interna de la cadera. ¿Qué complicación tardía es la más probable?",
    options: [
      "Una recidiva del deslizamiento epifisario",
      "Un choque femoroacetabular tipo Cam por la deformidad residual del cuello",
      "Una condrólisis de reciente aparición",
      "Una fractura de estrés del cuello femoral",
    ],
    correct: 1,
    explanation:
      "La deformidad residual del cuello femoral (giba anterosuperior) tras una epifisiolisis puede producir un choque femoroacetabular tipo Cam, con dolor inguinal característico al flexionar, aducir y rotar internamente la cadera (signo del choque).",
  },
  {
    id: 509,
    block: "infantil",
    code: "Ángulo capitodiafisario de Southwick",
    image: null,
    prompt:
      "En la radiografía lateral de cadera de un adolescente con epifisiolisis femoral proximal, el ángulo capitodiafisario de Southwick es de 42º. ¿Cómo se clasifica el grado de deslizamiento?",
    options: [
      "Grado I o leve",
      "Grado II o moderado",
      "Grado III o grave",
      "No es posible clasificarlo sin una radiografía anteroposterior",
    ],
    correct: 1,
    explanation:
      "Según el ángulo capitodiafisario de Southwick, valores entre 34º y 50º corresponden a un grado II o moderado, mientras que por debajo de 33º se considera leve (grado I) y por encima de 50º grave (grado III).",
  },
  {
    id: 510,
    block: "infantil",
    code: "Diagnóstico diferencial de cadera dolorosa",
    image: null,
    prompt:
      "Niño de 8 años con cojera de varios meses de evolución, sin fiebre, con limitación de la abducción y la rotación interna, y una radiografía que muestra esclerosis y fragmentación de la cabeza femoral. ¿Qué entidad, entre las causas más frecuentes de cadera dolorosa en el niño, encaja mejor con este cuadro?",
    options: [
      "Una sinovitis transitoria de cadera de curso prolongado",
      "Una artritis séptica de evolución subaguda",
      "Una enfermedad de Perthes en fase de fragmentación",
      "Una epifisiolisis femoral proximal aguda",
    ],
    correct: 2,
    explanation:
      "La evolución de varios meses, la ausencia de fiebre y los cambios radiográficos de esclerosis y fragmentación de la cabeza femoral son característicos de la enfermedad de Perthes en su fase de fragmentación, a diferencia del curso más agudo de la sinovitis o la artritis séptica.",
  },
  {
    id: 511,
    block: "cadera",
    code: "Varón con dolor inguinal bilateral no simultáneo",
    image: null,
    prompt:
      "Varón de 42 años con antecedente de consumo importante de alcohol, que refiere dolor sordo en la ingle derecha de varios meses de evolución, con movilidad de cadera bien conservada. Un año antes había presentado un cuadro similar en la cadera izquierda. ¿Qué diagnóstico es más probable?",
    options: [
      "Una coxartrosis primaria bilateral",
      "Una necrosis avascular de la cabeza femoral",
      "Una osteoporosis transitoria de cadera",
      "Una bursitis trocantérea bilateral",
    ],
    correct: 1,
    explanation:
      "El perfil de varón joven-mediana edad, consumo de alcohol, dolor sordo con movilidad conservada y afectación bilateral no simultánea es característico de la necrosis avascular de la cabeza femoral, que es bilateral hasta en el 60-80% de los casos.",
  },
  {
    id: 512,
    block: "cadera",
    code: "Signo patognomónico en la radiografía",
    image: null,
    prompt:
      "¿Qué hallazgo radiográfico se considera patognomónico de la necrosis avascular de la cabeza femoral, aunque su presencia indica ya un estadio avanzado de la enfermedad?",
    options: [
      "El estrechamiento difuso del espacio articular",
      "La osteopenia generalizada de la cabeza femoral",
      "Las imágenes radiolúcidas subcondrales (signo de la media luna)",
      "El aumento de tamaño del núcleo de osificación",
    ],
    correct: 2,
    explanation:
      "El signo de la media luna o de la uñada, correspondiente a imágenes radiolúcidas subcondrales, es patognomónico de la necrosis avascular, aunque su aparición implica ya un colapso subcondral y, por tanto, un estadio avanzado.",
  },
  {
    id: 513,
    block: "cadera",
    code: "Sospecha de necrosis con radiografía normal",
    image: null,
    prompt:
      "Paciente con dolor de cadera sugestivo de necrosis avascular y una radiografía simple normal. ¿Cuál es la prueba de imagen más adecuada para confirmar o descartar el diagnóstico?",
    options: [
      "La tomografía computarizada",
      "La gammagrafía ósea con Tc99",
      "La resonancia magnética",
      "La ecografía de cadera",
    ],
    correct: 2,
    explanation:
      "La resonancia magnética es la prueba de elección cuando la radiografía es normal y existe sospecha de osteonecrosis, con una sensibilidad y especificidad en torno al 99%, además de valor pronóstico sobre el riesgo de colapso.",
  },
  {
    id: 514,
    block: "cadera",
    code: "RM: necrosis vs osteoporosis transitoria",
    image: null,
    prompt:
      "¿Qué hallazgo en la resonancia magnética ayuda a diferenciar la necrosis avascular de la osteoporosis transitoria de cadera?",
    options: [
      "En la necrosis avascular se observa una lesión focal, mientras que en la osteoporosis transitoria el edema es difuso",
      "En la osteoporosis transitoria la lesión es siempre focal y bien delimitada",
      "En la necrosis avascular el edema óseo se extiende de forma difusa hasta el cuello femoral",
      "Ninguna de las dos entidades muestra cambios visibles en la resonancia magnética",
    ],
    correct: 0,
    explanation:
      "En la necrosis avascular la resonancia muestra una lesión focal, mientras que en la osteoporosis transitoria el edema óseo es difuso y puede extenderse al cuello femoral, lo que constituye una de las claves del diagnóstico diferencial.",
  },
  {
    id: 515,
    block: "cadera",
    code: "Varón de 38 años, Ficat II sin colapso",
    image: null,
    prompt:
      "Varón de 38 años con necrosis avascular de cadera en estadio II de Ficat, lesión de pequeño tamaño y sin signos de colapso subcondral. ¿Cuál es una opción terapéutica razonable en este momento?",
    options: [
      "La artroplastia total de cadera no cementada de entrada",
      "La descompresión del núcleo (forage), asociada o no a injerto",
      "La osteotomía de Sugioka como primera opción",
      "La observación exclusiva sin ningún tratamiento activo",
    ],
    correct: 1,
    explanation:
      "En pacientes menores de 40 años con lesiones pequeñas o moderadas sintomáticas y sin colapso (Ficat I-II), la descompresión del núcleo o forage, eventualmente asociada a injerto o precursores mesenquimales, es una opción terapéutica adecuada.",
  },
  {
    id: 516,
    block: "cadera",
    code: "Ventaja de la clasificación ARCO",
    image: null,
    prompt:
      "¿Qué ventaja aporta la clasificación de ARCO frente a la clasificación clásica de Ficat y Arlet en la necrosis avascular de cadera?",
    options: [
      "No requiere pruebas de imagen para su aplicación",
      "Diferencia mejor los estadios y distingue el hundimiento mayor o menor de 2 mm, orientando el tratamiento",
      "Sustituye por completo la necesidad de resonancia magnética",
      "Se basa exclusivamente en el ángulo combinado de necrosis",
    ],
    correct: 1,
    explanation:
      "La clasificación de ARCO discrimina mejor los cambios entre estadios que la de Ficat, guarda una relación más estrecha con la progresión de la enfermedad y diferencia el hundimiento mayor o menor de 2 mm, lo que orienta algunas decisiones terapéuticas.",
  },
  {
    id: 517,
    block: "cadera",
    code: "Ficat III con hundimiento mayor de 2 mm",
    image: null,
    prompt:
      "Paciente de 45 años con necrosis avascular de cadera en estadio III de Ficat, con un hundimiento subcondral mayor de 2 mm y afectación amplia de la cabeza femoral. ¿Qué tratamiento resulta más apropiado en este contexto?",
    options: [
      "La descompresión del núcleo de forma aislada",
      "El tratamiento conservador con bifosfonatos",
      "La artroplastia total de cadera",
      "El injerto óseo no vascularizado sin ningún otro procedimiento",
    ],
    correct: 2,
    explanation:
      "En lesiones con colapso subcondral significativo y afectación amplia, especialmente en pacientes mayores de 40 años, la artroplastia total de cadera es el tratamiento más adecuado, ya que los procedimientos conservadores de la cabeza tienen resultados pobres en estos estadios.",
  },
  {
    id: 518,
    block: "cadera",
    code: "Osteotomía intertrocantérea valguizante",
    image: null,
    prompt:
      "¿En qué localización de la lesión necrótica está indicada preferentemente la osteotomía intertrocantérea valguizante?",
    options: [
      "En lesiones mediales de la cabeza femoral",
      "En lesiones anterolaterales de la cabeza femoral",
      "En lesiones que afectan a la totalidad de la cabeza femoral",
      "En lesiones exclusivamente posteriores de la cabeza femoral",
    ],
    correct: 1,
    explanation:
      "La osteotomía intertrocantérea valguizante está indicada en lesiones anterolaterales, ya que permite alejar el segmento necrótico de la zona de mayor carga, con buenos resultados descritos en torno al 87% a los 5 años.",
  },
  {
    id: 519,
    block: "cadera",
    code: "Etiología no traumática más frecuente",
    image: null,
    prompt:
      "De las causas no traumáticas de necrosis avascular de cadera, ¿cuáles son, junto con el consumo elevado de corticoides, las más frecuentes en la actualidad?",
    options: [
      "El hipotiroidismo y la hiperuricemia",
      "El alcoholismo",
      "La arteriosclerosis generalizada",
      "Los antirretrovirales empleados en el VIH",
    ],
    correct: 1,
    explanation:
      "El consumo elevado de corticoides y el alcoholismo son, con diferencia, los factores etiológicos no traumáticos más frecuentemente relacionados con la necrosis avascular de la cabeza femoral.",
  },
  {
    id: 520,
    block: "cadera",
    code: "Mujer con dolor lateral de cadera irradiado a rodilla",
    image: null,
    prompt:
      "Mujer de 58 años, obesa, con dolor sordo en la cara lateral de la cadera que empeora al subir escaleras y al acostarse sobre ese lado, irradiado ocasionalmente hasta la rodilla. La exploración reproduce el dolor a la palpación sobre el trocánter mayor. ¿Cuál es el diagnóstico más probable?",
    options: [
      "Una necrosis avascular de la cabeza femoral",
      "Una bursitis trocantérea",
      "Un síndrome del glúteo profundo",
      "Una osteopatía dinámica de pubis",
    ],
    correct: 1,
    explanation:
      "El dolor lateral que empeora al subir escaleras o al acostarse sobre el lado afecto, con dolor reproducible a la palpación del trocánter mayor, es característico de la bursitis trocantérea, más frecuente en mujeres de mediana edad y obesas.",
  },
  {
    id: 521,
    block: "cadera",
    code: "Bursitis trocantérea: diagnóstico de exclusión",
    image: null,
    prompt:
      "Respecto a la bursitis trocantérea, señale la afirmación correcta:",
    options: [
      "Se trata de un cuadro excepcional, con una incidencia menor de 1 caso por millón de habitantes",
      "Suele confundirse con dolores propagados de la columna lumbar, por lo que es un diagnóstico de exclusión",
      "Predomina claramente en varones jóvenes deportistas",
      "Las pruebas de imagen suelen ser definitivas para confirmar el diagnóstico",
    ],
    correct: 1,
    explanation:
      "La bursitis trocantérea es un diagnóstico fundamentalmente clínico y de exclusión, ya que en esa zona son mucho más frecuentes los dolores propagados desde la columna lumbar; las pruebas de imagen aportan pocos datos concluyentes.",
  },
  {
    id: 522,
    block: "cadera",
    code: "Paciente con PTC y dolor inguinal profundo",
    image: null,
    prompt:
      "Paciente portador de una prótesis total de cadera que presenta dolor sordo y profundo en la ingle, que se reproduce al mantener la pierna elevada durante 15 segundos en decúbito supino. ¿Qué entidad es la más probable?",
    options: [
      "Una bursitis del psoas-ilíaco",
      "Una osteopatía dinámica de pubis",
      "Un síndrome del piramidal",
      "Una lesión de Morel-Lavallée",
    ],
    correct: 0,
    explanation:
      "El dolor inguinal profundo que se reproduce al mantener la pierna elevada 15 segundos, especialmente en un paciente con prótesis de cadera (por roce del tendón sobre el reborde acetabular o restos de cemento), es característico de la bursitis del psoas-ilíaco.",
  },
  {
    id: 523,
    block: "cadera",
    code: "Bailarina con chasquido lateral indoloro",
    image: null,
    prompt:
      "Bailarina de 22 años que refiere un chasquido audible en la cara lateral de la cadera con ciertos movimientos, sin dolor asociado. A la exploración, el chasquido desaparece al presionar sobre el trocánter mayor mientras se repite el movimiento. ¿Qué diagnóstico es más probable?",
    options: [
      "Una cadera en resorte intraarticular por cuerpo libre",
      "Una cadera en resorte externa por la fascia lata",
      "Una cadera en resorte interna por el psoas-ilíaco",
      "Una rotura del labrum acetabular",
    ],
    correct: 1,
    explanation:
      "El chasquido lateral que desaparece al presionar sobre el trocánter mayor durante la maniobra es característico de la cadera en resorte externa, la forma más frecuente, típica de mujeres jóvenes, bailarinas y atletas.",
  },
  {
    id: 524,
    block: "cadera",
    code: "Tratamiento del chasquido indoloro",
    image: null,
    prompt:
      "¿Cuál es el tratamiento inicial más adecuado para una cadera en resorte externa que produce únicamente chasquidos indoloros?",
    options: [
      "La infiltración con corticoides en la bolsa trocantérea",
      "El alargamiento quirúrgico en Z de la fascia lata",
      "Los estiramientos de la fascia lata",
      "La bursectomía artroscópica de entrada",
    ],
    correct: 2,
    explanation:
      "Cuando los chasquidos son indoloros, el tratamiento más habitual y suficiente son los estiramientos de la fascia lata (en el resorte externo) o del psoas-ilíaco (en el interno), reservando otras medidas para los casos dolorosos o refractarios.",
  },
  {
    id: 525,
    block: "cadera",
    code: "Cadera en resorte externa dolorosa refractaria",
    image: null,
    prompt:
      "Paciente con cadera en resorte externa dolorosa que, tras 10 meses de tratamiento conservador con estiramientos, infiltraciones y fisioterapia, no ha experimentado mejoría. ¿Qué opción quirúrgica es la más utilizada, con mejores resultados publicados?",
    options: [
      "La sección simple de la fascia lata sin reanclaje",
      "El alargamiento en Z de la fascia lata con bursectomía trocantérea",
      "La liberación del nervio femorocutáneo",
      "La tenotomía del aductor largo",
    ],
    correct: 1,
    explanation:
      "En casos de cadera en resorte externa dolorosa que no mejora tras 6-12 meses de tratamiento conservador, el alargamiento en Z de la fascia lata con bursectomía trocantérea es la técnica quirúrgica con mejores resultados publicados.",
  },
  {
    id: 526,
    block: "cadera",
    code: "Debilidad de abducción y Trendelenburg",
    image: null,
    prompt:
      "Paciente de edad avanzada con dolor lateral de cadera de meses de evolución, en quien se objetiva una disminución de fuerza en la abducción contra resistencia y marcha en Trendelenburg. ¿Qué entidad debe sospecharse en primer lugar?",
    options: [
      "Una bursitis isquiática",
      "Una rotura degenerativa del glúteo medio y menor (lesión del \"manguito\" muscular de la cadera)",
      "Una meralgia parestésica",
      "Una osteopatía dinámica de pubis",
    ],
    correct: 1,
    explanation:
      "La marcha en Trendelenburg junto con debilidad de la abducción contra resistencia es el signo más sensible y específico de una rotura degenerativa de los tendones del glúteo medio y menor, cuadro con clínica inicial similar a la bursitis trocantérea pero que puede progresar a pérdida de fuerza.",
  },
  {
    id: 527,
    block: "cadera",
    code: "Futbolista con dolor bilateral en el pubis",
    image: null,
    prompt:
      "Futbolista de alto nivel con dolor progresivo y gradual en la sínfisis púbica, bilateral, que se irradia a la zona baja del abdomen. La exploración muestra la sínfisis inflamada y dolorosa a la presión. ¿Qué diagnóstico es el más probable?",
    options: [
      "Una osteopatía dinámica de pubis",
      "Una hernia del deportista",
      "Una bursitis isquiática",
      "Un síndrome isquiotibial proximal",
    ],
    correct: 0,
    explanation:
      "El dolor progresivo y bilateral en la sínfisis púbica, con inflamación y dolor a la presión sobre la misma, en un deportista de alto nivel, es característico de la osteopatía dinámica del pubis (osteítis púbica), causada por el desequilibrio entre la musculatura aductora y la abdominal.",
  },
  {
    id: 528,
    block: "cadera",
    code: "Tratamiento quirúrgico de la osteopatía dinámica de pubis",
    image: null,
    prompt:
      "En un caso de osteopatía dinámica de pubis refractaria al tratamiento conservador, ¿cuál es la técnica quirúrgica más utilizada?",
    options: [
      "La artrodesis de la sínfisis púbica",
      "La colocación de mallas retropúbicas",
      "El curetaje aislado de la sínfisis",
      "La tenotomía del aductor largo",
    ],
    correct: 3,
    explanation:
      "La tenotomía del aductor largo es la técnica quirúrgica más utilizada en la osteopatía dinámica de pubis refractaria al tratamiento conservador; otras opciones como el curetaje, las mallas retropúbicas o la artrodesis se reservan para situaciones más específicas.",
  },
  {
    id: 529,
    block: "cadera",
    code: "Dolor inguinal que empeora al toser",
    image: null,
    prompt:
      "Jugador de hockey con dolor insidioso sobre el conducto inguinal, irradiado ocasionalmente a los testículos, que se agrava con los movimientos de cadera y al toser. La exploración no permite identificar una hernia evidente. ¿Qué entidad es la más probable?",
    options: [
      "Una hernia del deportista",
      "Una bursitis del psoas-ilíaco",
      "Un síndrome del piramidal",
      "Una lesión del labrum acetabular",
    ],
    correct: 0,
    explanation:
      "El dolor inguinal insidioso, irradiado a testículos y agravado con el esfuerzo o la tos, sin que siempre se detecte una hernia evidente en la exploración, es característico de la hernia del deportista, cuyo tratamiento definitivo es quirúrgico.",
  },
  {
    id: 530,
    block: "cadera",
    code: "Dolor lateral de muslo tras uso de cinturón ajustado",
    image: null,
    prompt:
      "Paciente que refiere dolor punzante y sensación de quemazón en la cara lateral del muslo, que se reproduce al permanecer mucho tiempo sentado con la cadera flexionada y con el uso de un cinturón ajustado. ¿Qué cuadro es el más probable?",
    options: [
      "Una compresión del nervio obturador",
      "Una meralgia parestésica por compresión del nervio femorocutáneo",
      "Un síndrome del glúteo profundo",
      "Una compresión del nervio pudendo",
    ],
    correct: 1,
    explanation:
      "El dolor punzante o quemante en la cara lateral del muslo, provocado por la sedestación prolongada con la cadera flexionada o el uso de cinturones ajustados, es característico de la meralgia parestésica, por compresión del nervio femorocutáneo cerca de la espina ilíaca anterosuperior.",
  },
  {
    id: 531,
    block: "cadera",
    code: "Ciclista con dolor glúteo y pseudociática",
    image: null,
    prompt:
      "Ciclista con dolor en la región glútea posterior que se irradia como una pseudociática, en quien la rotación interna de la cadera estando sentado reproduce el dolor. ¿Qué entidad, dentro del síndrome del glúteo profundo, es la más probable?",
    options: [
      "Un atrapamiento isquiofemoral",
      "Un síndrome isquiotibial proximal",
      "Un síndrome del piramidal",
      "Una bursitis isquiática",
    ],
    correct: 2,
    explanation:
      "El dolor glúteo con pseudociática que se reproduce al rotar internamente la cadera en sedestación (prueba de estiramiento piriforme) es característico del síndrome del piramidal, una de las causas del síndrome del glúteo profundo.",
  },
  {
    id: 532,
    block: "cadera",
    code: "Atrapamiento isquiofemoral",
    image: null,
    prompt:
      "En el atrapamiento (impingement) isquiofemoral, ¿qué maniobra exploratoria reproduce característicamente el dolor?",
    options: [
      "La rotación interna pasiva de la cadera",
      "La rotación externa pasiva de la cadera",
      "La flexión activa de la cadera contra resistencia",
      "La abducción pasiva de la cadera",
    ],
    correct: 1,
    explanation:
      "En el atrapamiento isquiofemoral, la disminución del espacio entre el isquion y el trocánter menor comprime el nervio ciático por su proximidad al cuadrado femoral, y clásicamente el dolor aumenta con la rotación externa pasiva de la cadera.",
  },
  {
    id: 533,
    block: "cadera",
    code: "Desglove traumático lateral de cadera",
    image: null,
    prompt:
      "Paciente que, tras un accidente de tráfico con mecanismo de cizallamiento sobre la cadera, presenta una zona lateral con hinchazón fluctuante, equimosis y laxitud de la piel, sin fractura asociada. ¿Qué lesión es la más probable?",
    options: [
      "Un pseudoaneurisma femoral",
      "Una lesión de Morel-Lavallée",
      "Una miositis osificante",
      "Una bursitis trocantérea postraumática",
    ],
    correct: 1,
    explanation:
      "La lesión de Morel-Lavallée es un desglobamiento traumático de partes blandas entre la piel y la fascia lata, con acumulación de líquido hemolinfático subcutáneo, hinchazón fluctuante y laxitud cutánea en la zona lateral de la cadera.",
  },
  {
    id: 534,
    block: "cadera",
    code: "Lesión del labrum acetabular",
    image: null,
    prompt:
      "Respecto a las lesiones del labrum acetabular, señale la afirmación correcta:",
    options: [
      "Son más frecuentes en pacientes con displasia acetabular, sobre todo por pinzamiento femoroacetabular",
      "El hallazgo de una rotura en la resonancia magnética siempre obliga a tratamiento quirúrgico",
      "La prueba diagnóstica de elección es la radiografía simple de pelvis",
      "El tratamiento inicial de elección es la reparación artroscópica inmediata",
    ],
    correct: 0,
    explanation:
      "Las lesiones del labrum acetabular son más frecuentes en pacientes con displasia acetabular, siendo el pinzamiento femoroacetabular la causa más habitual; muchas roturas visibles en resonancia son asintomáticas y el tratamiento inicial es conservador.",
  },
  {
    id: 535,
    block: "cadera",
    code: "Masa pulsátil en cara anterior de cadera",
    image: null,
    prompt:
      "Paciente que, tras un traumatismo en la región inguinal, desarrolla una masa pulsátil en la cara anterior de la cadera. ¿Qué entidad debe sospecharse y cómo se confirma habitualmente el diagnóstico?",
    options: [
      "Una miositis osificante, confirmada mediante gammagrafía ósea",
      "Un pseudoaneurisma femoral, confirmado mediante ecografía Doppler o arteriografía",
      "Una fibrosis glútea, confirmada mediante resonancia magnética",
      "Una bursitis isquiática, confirmada mediante tacto rectal",
    ],
    correct: 1,
    explanation:
      "Una masa pulsátil en la cara anterior de la cadera tras un traumatismo sugiere un pseudoaneurisma femoral, cuyo diagnóstico se confirma mediante ecografía Doppler o arteriografía, y cuyo tratamiento es quirúrgico.",
  },
  {
    id: 536,
    block: "cadera",
    code: "Ángulo alfa elevado",
    image: null,
    prompt:
      "En una radiografía axial pura de cadera se mide un ángulo alfa de 68º en un paciente con dolor inguinal de perfil deportivo. ¿Qué implica este hallazgo?",
    options: [
      "Un contorno cabeza-cuello anómalo compatible con choque tipo CAM, con mayor riesgo de daño condral cuanto más elevado el ángulo",
      "Una necrosis avascular incipiente de la cabeza femoral, independiente del choque femoroacetabular",
      "Una coxartrosis Tönnis grado 3 ya establecida, con indicación directa de prótesis total",
      "Una displasia acetabular con cobertura insuficiente de la cabeza femoral",
    ],
    correct: 0,
    explanation:
      "El ángulo alfa cuantifica la anesfericidad de la cabeza femoral; valores superiores a 50º indican un contorno cabeza-cuello anómalo propio del choque tipo CAM, y cuanto mayor es el ángulo, más severa suele ser la lesión condral asociada.",
  },
  {
    id: 537,
    block: "cadera",
    code: "Choque tipo pinza",
    image: null,
    prompt:
      "En el choque femoroacetabular tipo pinza, ¿dónde se localiza principalmente la alteración anatómica y qué mecanismo lesional produce?",
    options: [
      "En la cabeza femoral, con un offset cabeza-cuello reducido que cizalla el cartílago acetabular",
      "En el acetábulo, con una sobrecobertura de la cabeza femoral que hipertrofia y pinza el labrum",
      "En el cuello femoral, con una retroversión que aumenta el rango de rotación interna",
      "En el ligamento redondo, con una laxitud que favorece la subluxación anterior",
    ],
    correct: 1,
    explanation:
      "En el tipo pinza el problema principal está en el acetábulo, por un aumento de la cobertura de la cabeza femoral (retroversión acetabular, coxa profunda o protrusión) que hipertrofia el labrum y puede llegar a osificarlo, generando lesiones condrales en el lado opuesto por hiperpresión.",
  },
  {
    id: 538,
    block: "cadera",
    code: "Tönnis grado 2",
    image: null,
    prompt:
      "En una radiografía de cadera se observan pequeños quistes subcondrales, moderada disminución de la interlínea articular y moderada pérdida de esfericidad de la cabeza femoral, sin necrosis evidente. ¿A qué grado de la clasificación de Tönnis corresponde?",
    options: [
      "Grado 3",
      "Grado 0",
      "Grado 1",
      "Grado 2",
    ],
    correct: 3,
    explanation:
      "El grado 2 de Tönnis se define por pequeños quistes en cabeza o acetábulo, moderada disminución de la interlínea y moderada pérdida de esfericidad de la cabeza femoral, sin la evidencia de necrosis que caracteriza al grado 3.",
  },
  {
    id: 539,
    block: "cadera",
    code: "Cementación acetabular",
    image: null,
    prompt:
      "En la fijación cementada del componente acetabular, ¿en cuál de las siguientes situaciones estaría contraindicada esta técnica de manera aislada?",
    options: [
      "En pacientes con patología inflamatoria que comprometa la integración de un componente no cementado",
      "En hueso ebúrneo que no permite la interdigitación del cemento, salvo que se aporte injerto óseo compactado",
      "En pacientes sometidos previamente a radioterapia sobre la pelvis",
      "En pacientes con mala calidad ósea generalizada",
    ],
    correct: 1,
    explanation:
      "La fijación acetabular cementada está contraindicada en hueso ebúrneo, que impide la interdigitación del cemento, salvo que se aporte injerto óseo compactado; en cambio, la mala calidad ósea, la patología inflamatoria o la radioterapia previa son situaciones donde la cementación puede estar indicada.",
  },
  {
    id: 540,
    block: "cadera",
    code: "Artroscopia en artrosis avanzada",
    image: null,
    prompt:
      "Paciente de 58 años, obeso, con coxartrosis Tönnis grado 2, que es intervenido mediante artroscopia de cadera por sospecha de choque femoroacetabular sintomático. ¿Qué se puede esperar respecto al pronóstico de esta cirugía?",
    options: [
      "Un resultado poco predecible, con un riesgo elevado de conversión a prótesis total en los primeros años",
      "Una resolución completa y duradera del dolor, similar a la de pacientes jóvenes sin artrosis",
      "Una mejoría exclusivamente de la movilidad, sin ningún efecto sobre el dolor",
      "Un riesgo de fracaso nulo si la técnica quirúrgica es correcta",
    ],
    correct: 0,
    explanation:
      "Los resultados de la artroscopia de cadera son menos predecibles en pacientes con artrosis Tönnis 2 o mayor, obesidad o edad superior a 55 años, con un riesgo de conversión a prótesis total que puede superar el 68% a los dos años de seguimiento.",
  },
  {
    id: 541,
    block: "cadera",
    code: "Vástago tipo taper-slip",
    image: null,
    prompt:
      "Los vástagos femorales cementados tipo 1 (taper-slip o force-closed), como el Exeter, se caracterizan por:",
    options: [
      "Bloquearse de forma rígida al cemento, con un mínimo hundimiento y gran longevidad",
      "Deslizarse de forma controlada dentro del manto de cemento, transformando la tensión en compresión radial",
      "Ajustarse al canal femoral con un manto de cemento muy fino, técnica extendida en Francia",
      "Reproducir la curvatura anatómica del fémur con mantos homogéneos de 2 mm",
    ],
    correct: 1,
    explanation:
      "Los vástagos tipo 1 son pulidos y de doble o triple cuña, y se hunden de forma controlada dentro del cemento transformando las tensiones en compresión radial; ofrecen excelentes supervivencias, aunque con mayor riesgo de fractura periprotésica en hueso frágil, sobre todo los de cromo-cobalto.",
  },
  {
    id: 542,
    block: "cadera",
    code: "Par metal-metal",
    image: null,
    prompt:
      "Un paciente portador de una prótesis total de cadera con par de fricción metal-metal se encuentra asintomático en las revisiones. ¿Qué actitud de seguimiento es la recomendada?",
    options: [
      "No requiere ningún seguimiento adicional al de una prótesis convencional",
      "Retirar el implante de forma programada antes de los 10 años, independientemente de la clínica",
      "Realizar radiografías anuales y monitorizar los niveles plasmáticos de iones metálicos al menos una vez al año",
      "Solicitar una gammagrafía ósea anual como única prueba de control",
    ],
    correct: 2,
    explanation:
      "En pacientes con par metal-metal se recomienda un seguimiento estrecho con radiografías anuales y monitorización de los niveles plasmáticos de iones metálicos al menos una vez al año en los pacientes asintomáticos, recambiando a quienes presenten clínica.",
  },
  {
    id: 543,
    block: "cadera",
    code: "Tamaño de cabeza femoral",
    image: null,
    prompt:
      "En la actualidad, ¿qué tamaño de cabeza femoral presenta mejores resultados globales en los registros de artroplastia total de cadera?",
    options: [
      "36 mm",
      "22-25 mm",
      "28 mm",
      "32 mm",
    ],
    correct: 3,
    explanation:
      "Aunque las cabezas grandes mejoran la estabilidad, las de 36 mm muestran mayor tasa de revisión en los registros que las de 32 mm, por lo que el tamaño de 32 mm es actualmente el que presenta mejores resultados globales.",
  },
  {
    id: 544,
    block: "cadera",
    code: "Hipoxemia intraoperatoria",
    image: null,
    prompt:
      "Durante la cementación del componente femoral de una artroplastia de cadera, el paciente presenta de forma brusca hipoxemia, hipotensión y arritmia. ¿Qué complicación debe sospecharse en primer lugar?",
    options: [
      "Una embolia pulmonar tardía no relacionada con la cirugía",
      "Un síndrome de implantación del cemento óseo",
      "Una reacción alérgica al material de osteosíntesis",
      "Una lesión vascular por colocación de tornillos acetabulares",
    ],
    correct: 1,
    explanation:
      "El síndrome de implantación del cemento óseo se manifiesta por hipoxemia, hipotensión, arritmias o colapso cardiovascular coincidiendo con la cementación o la inserción protésica, y es de causa multifactorial, principalmente por embolización de grasa, médula y cemento.",
  },
  {
    id: 545,
    block: "cadera",
    code: "Componente acetabular no cementado",
    image: null,
    prompt:
      "Los componentes acetabulares no cementados utilizados actualmente en artroplastia total de cadera se caracterizan por:",
    options: [
      "Ser roscados o expansibles, con buenos resultados en la mayoría de los diseños",
      "Requerir de forma sistemática la colocación de tornillos para asegurar la fijación primaria",
      "Ser hemisféricos con recubrimiento poroso, fijados a presión (press-fit)",
      "Necesitar un manto de cemento de al menos 2 mm entre el implante y el hueso",
    ],
    correct: 2,
    explanation:
      "Los componentes acetabulares no cementados actuales son hemisféricos con recubrimiento poroso fijados a presión (press-fit); los diseños roscados o expansibles no han tenido buenos resultados salvo excepciones, y el uso rutinario de tornillos no se recomienda.",
  },
  {
    id: 546,
    block: "cadera",
    code: "Dolor inguinal tras PTC",
    image: null,
    prompt:
      "Paciente con prótesis total de cadera que refiere dolor inguinal desde el postoperatorio, que empeora con la flexión activa contrarresistencia y le dificulta entrar y salir del coche. ¿Qué entidad debe sospecharse?",
    options: [
      "Una irritación del tendón del psoas por extrusión anterior del componente acetabular",
      "Un aflojamiento séptico del componente femoral",
      "Una fractura de estrés del cuello femoral protésico",
      "Una osificación heterotópica grado I de Brooker",
    ],
    correct: 0,
    explanation:
      "El dolor inguinal que aumenta con la flexión activa contrarresistencia, dificultando maniobras como entrar o salir del coche, orienta a una irritación del tendón del psoas, habitualmente por extrusión anterior de la bandeja metálica del cotilo; es útil la infiltración diagnóstica.",
  },
  {
    id: 547,
    block: "cadera",
    code: "Prevención de trunionosis",
    image: null,
    prompt:
      "Para reducir el riesgo de trunionosis en una artroplastia total de cadera, ¿qué medida es la más recomendada?",
    options: [
      "Utilizar cabezas de cerámica, cuellos cortos y evitar cabezas femorales de gran diámetro",
      "Emplear cuellos modulares de forma sistemática para mejorar la versión femoral",
      "Utilizar siempre pares de fricción metal-metal por su bajo coeficiente de rozamiento",
      "Aumentar el diámetro de la cabeza femoral por encima de 36 mm en todos los casos",
    ],
    correct: 0,
    explanation:
      "Para prevenir la trunionosis, la corrosión entre el cono del vástago y la cabeza protésica, se recomienda usar cabezas de cerámica en vez de metal, cuellos cortos y cabezas no excesivamente grandes, evitando además los cuellos modulares por su elevada tasa de revisión.",
  },
  {
    id: 548,
    block: "cadera",
    code: "Cultivos intraoperatorios inesperados",
    image: null,
    prompt:
      "Durante una revisión de prótesis total de cadera por inestabilidad, sin sospecha previa de infección, los cultivos intraoperatorios de rutina resultan positivos. ¿Cuál es la actitud más adecuada?",
    options: [
      "Considerar los cultivos como contaminación y no modificar el tratamiento habitual",
      "Retirar de nuevo todos los componentes de forma inmediata sin esperar el antibiograma",
      "Mantener antibioterapia específica según el germen aislado, dado el mayor riesgo de fracaso en estos casos",
      "Suspender cualquier tratamiento antibiótico al no existir clínica infecciosa previa",
    ],
    correct: 2,
    explanation:
      "Cuando aparecen cultivos positivos de forma inesperada tras una revisión por otra causa, el riesgo de fracaso es mayor, por lo que se recomienda mantener antibióticos específicos según el germen encontrado, aunque no existen pautas predefinidas claras.",
  },
  {
    id: 549,
    block: "cadera",
    code: "DAIR precoz",
    image: null,
    prompt:
      "El tratamiento mediante desbridamiento, antibióticos y retención del implante (DAIR) en la infección periprotésica de cadera está indicado principalmente en:",
    options: [
      "Infecciones crónicas con fístula establecida y biofilm ya consolidado",
      "Infecciones agudas y de forma precoz, antes de que se estabilice el biofilm",
      "Pacientes con múltiples cirugías previas y mala calidad de partes blandas",
      "Infecciones polimicrobianas con cultivos negativos persistentes",
    ],
    correct: 1,
    explanation:
      "El DAIR está indicado en infecciones agudas y de forma precoz, idealmente antes de dos semanas y siempre antes de que se estabilice el biofilm (3-4 semanas), ya que este protege a las bacterias del efecto de los antibióticos.",
  },
  {
    id: 550,
    block: "cadera",
    code: "Luxación recidivante",
    image: null,
    prompt:
      "Paciente con luxaciones recidivantes de una prótesis total de cadera y debilidad moderada del aparato abductor, en el que se decide revisión. ¿Qué opción de reconstrucción es la más adecuada en este contexto?",
    options: [
      "Un componente acetabular constreñido, como primera opción en todos los casos de luxación",
      "Una cúpula de doble movilidad, que dificulta la luxación en los movimientos extremos",
      "Un componente acetabular no cementado estándar de mayor diámetro",
      "Una osteotomía y ascenso del trocánter mayor",
    ],
    correct: 1,
    explanation:
      "En pacientes con luxación recidivante y debilidad moderada del aparato abductor, las cúpulas de doble movilidad presentan buenos resultados, ya que dificultan la luxación en los movimientos extremos; los componentes constreñidos se reservan para casos extremos por su alto índice de aflojamiento.",
  },
  {
    id: 551,
    block: "cadera",
    code: "Fractura Vancouver B2",
    image: null,
    prompt:
      "Se diagnostica una fractura periprotésica femoral alrededor de la punta de un vástago no cementado, con el vástago aflojado pero buena calidad ósea, en un paciente joven y activo. ¿Cuál es la tendencia de tratamiento en este caso?",
    options: [
      "Osteosíntesis con placa y cerclajes, dejando el vástago aflojado sin recambiar",
      "Tratamiento conservador con carga parcial durante 8-12 semanas",
      "Revisión a un vástago largo con fijación diafisaria",
      "Colocación de un compuesto aloinjerto-prótesis como primera opción",
    ],
    correct: 2,
    explanation:
      "Ante una fractura Vancouver B2, con vástago aflojado y buena calidad ósea, la tendencia es revisar a un vástago largo con al menos dos diámetros corticales de fijación por debajo de la fractura, sobre todo en pacientes jóvenes, activos y con fractura compleja.",
  },
  {
    id: 552,
    block: "cadera",
    code: "Fractura acetabular intraoperatoria",
    image: null,
    prompt:
      "Durante la impactación del componente acetabular se detecta intraoperatoriamente una fractura de una pared acetabular, desplazada. Según la clasificación de Paprosky de fracturas periacetabulares, ¿qué actitud corresponde?",
    options: [
      "Añadir tornillos al cotilo ya colocado y permitir carga parcial durante 8-12 semanas",
      "Continuar la cirugía sin ninguna modificación, dado que el componente es estable",
      "Retirar el cotilo, sintetizar la fractura con tornillos o placas y recolocar el componente con nuevo fresado",
      "Indicar directamente una prótesis tumoral como medida de salvamento",
    ],
    correct: 2,
    explanation:
      "Una fractura acetabular intraoperatoria detectada y desplazada corresponde al tipo IB de Paprosky, cuyo tratamiento consiste en retirar el cotilo, sintetizar la fractura con tornillos o placas y recolocar el componente acetabular con un nuevo fresado y tornillos si es necesario.",
  },
  {
    id: 553,
    block: "cadera",
    code: "Profilaxis de osificación heterotópica",
    image: null,
    prompt:
      "En un paciente varón con antecedente de espondilitis anquilosante que va a ser intervenido de artroplastia de cadera por abordaje antero-lateral, ¿qué medida puede reducir el riesgo de osificación heterotópica?",
    options: [
      "El uso de antiinflamatorios en el postoperatorio",
      "Prolongar el tiempo quirúrgico para una hemostasia más exhaustiva",
      "Evitar la movilización precoz durante las primeras semanas",
      "Realizar el abordaje posterolateral en lugar del antero-lateral no modifica el riesgo",
    ],
    correct: 0,
    explanation:
      "El uso de antiinflamatorios en el postoperatorio disminuye mucho la incidencia de osificación heterotópica, lo que explica que en la práctica clínica no se observen tantos casos a pesar de la existencia de factores de riesgo como la espondilitis anquilosante o el abordaje antero-lateral.",
  },
  {
    id: 554,
    block: "cadera",
    code: "Sospecha de infección protésica",
    image: null,
    prompt:
      "Paciente con dolor progresivo en una prótesis de cadera implantada hace tres años, con elevación progresiva de VSG y PCR en analíticas seriadas. ¿Cuál es el siguiente paso más útil para confirmar el diagnóstico?",
    options: [
      "Realizar una artrografía simple sin toma de muestra",
      "Solicitar directamente una PET sin estudios previos",
      "Indicar cirugía de recambio sin más estudios, dada la alta sospecha clínica",
      "Realizar una artrocentesis para estudio bioquímico, recuento celular y cultivo del líquido articular",
    ],
    correct: 3,
    explanation:
      "Lo más útil ante la sospecha de infección protésica es combinar la clínica compatible con la elevación progresiva de VSG y PCR, confirmando con una artrocentesis para estudio bioquímico, recuento celular y cultivo, tomando además muestras intraoperatorias si se indica cirugía.",
  },
  {
    id: 555,
    block: "cadera",
    code: "Cambios anatómicos en displasia",
    image: null,
    prompt:
      "¿Cuál de los siguientes cambios anatómicos es característico de la displasia de cadera del adulto en su forma clásica?",
    options: [
      "Retroversión acetabular con aumento de la cobertura de la cabeza femoral",
      "Aumento de la anteversión del acetábulo y del cuello femoral, con verticalización acetabular",
      "Coxa profunda con protrusión acetabular",
      "Hipertrofia ósea de la cabeza femoral sin afectación del labrum",
    ],
    correct: 1,
    explanation:
      "En la forma clásica de displasia de cadera del adulto se produce un aumento de la anteversión del acetábulo y del cuello femoral junto con verticalización acetabular, inversión e hipertrofia del labrum e hipoplasia de la cabeza femoral.",
  },
  {
    id: 556,
    block: "cadera",
    code: "PTC en displasia Crowe IV",
    image: null,
    prompt:
      "En la planificación de una artroplastia total de cadera en una displasia Crowe tipo IV, ¿qué consideración es correcta respecto al fémur?",
    options: [
      "Se recomienda alargar la extremidad más de 4 cm siempre que sea posible para restaurar la longitud",
      "El canal femoral suele ser ancho, por lo que no se requieren vástagos especiales",
      "El canal femoral suele ser estrecho y no se recomienda alargar más de 3,5-4 cm por riesgo de lesión del nervio ciático",
      "El componente acetabular debe colocarse siempre en posición alta, sin excepción",
    ],
    correct: 2,
    explanation:
      "En las displasias graves el canal femoral suele ser estrecho, por lo que se necesitan vástagos finos, y no se recomienda alargar la extremidad más de 3,5-4 cm por el riesgo de parálisis del nervio ciático por estiramiento brusco, recurriendo si es preciso a acortamientos femorales.",
  },
  {
    id: 557,
    block: "cadera",
    code: "Indicación de osteotomía periacetabular",
    image: null,
    prompt:
      "¿En cuál de los siguientes pacientes con displasia de cadera sería más adecuado plantear una osteotomía periacetabular de Ganz?",
    options: [
      "Paciente de 45 años con artrosis Tönnis grado 2 y pérdida de rango de movimiento marcada",
      "Paciente esqueléticamente maduro, sin artrosis, con mala cobertura de la cabeza femoral y buena movilidad",
      "Paciente con incongruencia articular y cojera preoperatoria marcada",
      "Paciente con Tönnis grado 3 y estrechamiento avanzado del espacio articular",
    ],
    correct: 1,
    explanation:
      "La osteotomía periacetabular está indicada en pacientes jóvenes esqueléticamente maduros, sin artrosis o con Tönnis leve, con criterios radiológicos de mala cobertura de la cabeza femoral, morfología corregible y buena movilidad; la artrosis avanzada o la incongruencia articular la contraindican.",
  },
  {
    id: 558,
    block: "cadera",
    code: "Infección crónica con fístula",
    image: null,
    prompt:
      "Paciente con infección periprotésica crónica de cadera, con trayecto fistuloso establecido y mala calidad de partes blandas. ¿Qué estrategia quirúrgica es la más adecuada en este contexto?",
    options: [
      "La revisión en dos tiempos, considerada el enfoque tradicional en infecciones crónicas o complejas",
      "El desbridamiento y retención del implante (DAIR), por ser la técnica menos agresiva",
      "La revisión en un tiempo, al ofrecer menor estancia hospitalaria en todos los casos",
      "La supresión antibiótica crónica sin ningún gesto quirúrgico adicional",
    ],
    correct: 0,
    explanation:
      "En infecciones crónicas con fístula, mala calidad de partes blandas o múltiples cirugías previas, la revisión en dos tiempos mantiene su papel como el enfoque tradicional y más extendido, considerado el patrón oro en los casos complejos.",
  },
  {
    id: 559,
    block: "cadera",
    code: "Artroplastia de resección",
    image: null,
    prompt:
      "¿En cuál de las siguientes situaciones estaría indicada actualmente la artroplastia de resección tipo Girdlestone?",
    options: [
      "En pacientes jóvenes con coxartrosis primaria sin comorbilidades",
      "En pacientes con infección incurable o múltiples revisiones previas con organismos multirresistentes",
      "En pacientes con choque femoroacetabular tipo pinza sin respuesta al tratamiento conservador",
      "En pacientes con displasia de cadera Crowe tipo I candidatos a prótesis primaria",
    ],
    correct: 1,
    explanation:
      "La artroplastia de resección (Girdlestone) se reserva hoy en día para situaciones como infecciones incurables, osteonecrosis post irradiación, pacientes que no caminan o como tratamiento de rescate en pacientes con múltiples revisiones y organismos multirresistentes, dada su gran limitación funcional.",
  },
  {
    id: 560,
    block: "cadera",
    code: "Profilaxis en cirugía Fast-Track",
    image: null,
    prompt:
      "Paciente operado de artroplastia total de cadera en régimen Fast-Track, que comienza a caminar el mismo día de la intervención. Respecto a la profilaxis de enfermedad tromboembólica, es correcto que:",
    options: [
      "Se debe mantener heparina de bajo peso molecular durante al menos seis semanas en todos los casos",
      "La movilización precoz hace innecesaria cualquier otra medida de profilaxis",
      "Se está empezando a no recomendar profilaxis farmacológica en este tipo de pacientes ambulatorios",
      "Está contraindicado el uso de aspirina como profilaxis en cualquier contexto",
    ],
    correct: 2,
    explanation:
      "Se está empezando a no recomendar profilaxis farmacológica en pacientes operados en régimen Fast-Track o ambulatorio que comienzan a caminar el mismo día de la operación, mientras que en pacientes de bajo riesgo se ha introducido la aspirina como alternativa a las heparinas de bajo peso molecular.",
  },
  {
    id: 561,
    block: "cadera",
    code: "Ligamento sacroilíaco posterior",
    image: null,
    prompt:
      "De los cuatro grupos de ligamentos que estabilizan el anillo pélvico, ¿cuál se considera el más potente del cuerpo humano?",
    options: [
      "Los ligamentos de la sínfisis del pubis",
      "Los ligamentos iliolumbares",
      "El ligamento sacroilíaco posterior o interóseo",
      "El ligamento sacroespinoso",
    ],
    correct: 2,
    explanation:
      "El ligamento sacroilíaco posterior, también llamado ligamento interóseo, es el ligamento más potente del cuerpo y, por tanto, de la pelvis, aportando estabilidad tanto rotacional como vertical junto con los ligamentos sacrociáticos.",
  },
  {
    id: 562,
    block: "cadera",
    code: "Fractura de rama pubiana en anciano",
    image: null,
    prompt:
      "Paciente anciano que sufre una caída desde su propia altura y presenta dolor inguinal, con una radiografía que muestra una fractura aislada de la rama isquiopubiana derecha. ¿Qué es esperable encontrar en un estudio más completo?",
    options: [
      "Una fractura de la rama contralateral o una lesión por impactación sacra, visibles sobre todo en la TC",
      "Una luxación sacroilíaca completa asociada, con inestabilidad vertical franca",
      "Una fractura aislada sin ninguna otra lesión asociada del anillo pélvico",
      "Una rotura completa de los ligamentos del suelo de la pelvis",
    ],
    correct: 0,
    explanation:
      "La fractura aislada de una sola rama es infrecuente; suelen afectarse ambas ramas o las contralaterales, y suele existir una lesión por impactación sacra en el lado del traumatismo que con frecuencia solo es demostrable mediante TC.",
  },
  {
    id: 563,
    block: "cadera",
    code: "Diástasis púbica y estabilidad",
    image: null,
    prompt:
      "En una fractura de pelvis en libro abierto (tipo B1 de Tile), se objetiva una diástasis de la sínfisis del pubis de 3,5 cm. ¿Qué implica este hallazgo?",
    options: [
      "Que se trata de una lesión estable que no requiere ningún estudio adicional",
      "Que la fractura corresponde a una lesión tipo A de Tile, estable por definición",
      "Que probablemente existe rotura de los ligamentos del suelo de la pelvis, con inestabilidad en rotación externa",
      "Que la lesión afecta de forma exclusiva al marco posterior del anillo pélvico",
    ],
    correct: 2,
    explanation:
      "Una diástasis púbica superior a 2,5 cm implica la rotura de los ligamentos del suelo de la pelvis (sacrociáticos), lo que se asocia con una importante inestabilidad en rotación externa; las diástasis menores de 2,5 cm suelen ser estables en general.",
  },
  {
    id: 564,
    block: "cadera",
    code: "Pelvis en asa de cubo",
    image: null,
    prompt:
      "En una fractura de pelvis tipo B2.2 de Tile (pelvis en asa de cubo), ¿qué característica clínica es esperable encontrar?",
    options: [
      "Una inestabilidad vertical completa con ascenso de la hemipelvis afectada",
      "Un acortamiento del miembro inferior con conservación de la estabilidad vertical",
      "Una ausencia total de afectación del marco posterior del anillo pélvico",
      "Una rotura completa de los ligamentos sacroilíacos anteriores y posteriores",
    ],
    correct: 1,
    explanation:
      "En la fractura en asa de cubo, parte de la hemipelvis está rotada, por lo que el miembro puede presentar acortamiento, pero se conserva la estabilidad vertical, ya que los ligamentos del suelo de la pelvis permanecen intactos.",
  },
  {
    id: 565,
    block: "cadera",
    code: "Clasificación de Young-Burgess",
    image: null,
    prompt:
      "La clasificación de Young-Burgess de las fracturas de pelvis se caracteriza, a diferencia de la de Tile, por:",
    options: [
      "Basarse exclusivamente en la estabilidad vertical del anillo pélvico",
      "Requerir siempre una TC con reconstrucción 3D para su aplicación",
      "Estar dirigida al mecanismo de producción de la fractura, aplicable con una simple radiografía AP",
      "No guardar ninguna relación con la necesidad de transfusión sanguínea inicial",
    ],
    correct: 2,
    explanation:
      "La clasificación de Young-Burgess no se basa en la estabilidad, sino en el mecanismo de producción de la fractura, resultando útil en la evaluación inicial con una radiografía AP, y se correlaciona con la necesidad de transfusión y la gravedad de las lesiones asociadas.",
  },
  {
    id: 566,
    block: "cadera",
    code: "Fractura tipo APC-III",
    image: null,
    prompt:
      "Paciente politraumatizado con una fractura de pelvis por compresión anteroposterior, con separación de la sínfisis del pubis mayor de 2,5 cm y rotura completa de los ligamentos del suelo pélvico y sacroilíacos. ¿A qué tipo de lesión corresponde y qué implica?",
    options: [
      "APC-I, con lesión ligamentosa mínima y buen pronóstico",
      "APC-II, con inestabilidad limitada a la rotación externa",
      "APC-III, con inestabilidad vertical o completa del anillo pélvico",
      "LC-I, con fractura típica del anciano y buen pronóstico",
    ],
    correct: 2,
    explanation:
      "La APC-III implica una separación mayor de 2,5 cm de la sínfisis con rotura completa de los ligamentos del suelo de la pelvis y de los ligamentos sacroilíacos, produciendo una inestabilidad vertical o completa equivalente a las lesiones tipo C de Tile.",
  },
  {
    id: 567,
    block: "cadera",
    code: "Fractura LC-I típica del anciano",
    image: null,
    prompt:
      "La fractura por compresión lateral tipo LC-I, típica del paciente anciano, se caracteriza por:",
    options: [
      "Una fractura del marco anterior con posible indentación sacra, identificable sobre todo mediante TC",
      "Una luxación sacroilíaca completa con desplazamiento vertical evidente en la radiografía simple",
      "Una rotura ligamentosa completa de la sínfisis del pubis sin afectación ósea",
      "Una fractura bilateral inestable que precisa fijación espinopélvica de forma sistemática",
    ],
    correct: 0,
    explanation:
      "La LC-I se origina por un impacto en la zona más posterior del hueso ilíaco, produciendo una fractura del marco anterior con una posible indentación sacra en el lado del impacto que suele identificarse solo mediante TC.",
  },
  {
    id: 568,
    block: "cadera",
    code: "Manejo inicial del politraumatizado con fractura de pelvis",
    image: null,
    prompt:
      "Paciente politraumatizado con sospecha de fractura de pelvis que llega hemodinámicamente inestable a urgencias. ¿Cuál es la secuencia diagnóstica más adecuada?",
    options: [
      "Realizar directamente una TC pélvica sin contraste como única prueba",
      "Radiografía AP de pelvis, radiografía de tórax y ecofast en la sala de reanimación, valorando un body-TC con contraste si el estado lo permite",
      "Esperar a la estabilización hemodinámica completa antes de realizar cualquier prueba de imagen",
      "Realizar una resonancia magnética de pelvis de forma prioritaria",
    ],
    correct: 1,
    explanation:
      "En el paciente hemodinámicamente inestable se debe realizar una radiografía AP de pelvis, una radiografía de tórax y un ecofast en la misma sala de reanimación, y en muchos centros se prefiere de entrada un body-TC con contraste, que ahorra tiempo y muestra los puntos sangrantes.",
  },
  {
    id: 569,
    block: "cadera",
    code: "Colocación del cinturón pélvico",
    image: null,
    prompt:
      "A la hora de colocar un cinturón pélvico de urgencia en un paciente con fractura inestable de pelvis, ¿qué aspecto técnico es fundamental?",
    options: [
      "Colocarlo a la altura de ambos trocánteres mayores, evitando la compresión abdominal",
      "Colocarlo a nivel de las crestas ilíacas para maximizar la compresión abdominal",
      "Mantenerlo colocado de forma indefinida hasta la cirugía definitiva",
      "Retirarlo antes de realizar cualquier prueba de imagen para no enmascarar la inestabilidad",
    ],
    correct: 0,
    explanation:
      "Es muy importante colocar el cinturón pélvico a la altura de ambos trocánteres mayores para conseguir el efecto deseado y evitar la compresión abdominal, que provocaría un aumento de la presión venosa y, por tanto, mayor sangrado; no debe mantenerse más allá de las primeras 24-48 horas.",
  },
  {
    id: 570,
    block: "cadera",
    code: "Hemorragia persistente pese al cinturón pélvico",
    image: null,
    prompt:
      "Paciente con fractura inestable de pelvis y shock hemorrágico persistente pese a la colocación de un cinturón pélvico y estabilización del anillo. ¿Cuál es la actitud terapéutica más adecuada?",
    options: [
      "Realizar directamente una osteosíntesis definitiva de urgencia",
      "Realizar un empaquetado pélvico extraperitoneal, previo fijador externo, y eventualmente completar con angiografía-embolización",
      "Mantener una actitud expectante, ya que el cinturón pélvico es suficiente en todos los casos",
      "Colocar tracción transesquelética como único tratamiento de la hemorragia",
    ],
    correct: 1,
    explanation:
      "Si tras cerrar el anillo con el cinturón pélvico no se estabiliza la hemorragia, se debe realizar un empaquetado pélvico extraperitoneal, previo fijador externo, pudiendo completarse con angiografía-embolización; ambas técnicas requieren previamente el cierre y estabilización del anillo pélvico.",
  },
  {
    id: 571,
    block: "cadera",
    code: "Rotura vesical extraperitoneal",
    image: null,
    prompt:
      "Paciente con fractura de pelvis que presenta hematuria franca. Los estudios confirman una rotura vesical extraperitoneal. ¿Cuál es el tratamiento habitual de esta lesión?",
    options: [
      "Abordaje quirúrgico urgente para reparación directa de la vejiga",
      "Colostomía de descarga asociada a sondaje vesical",
      "Sondaje vesical simple, sin necesidad de abordaje quirúrgico",
      "Nefrostomía percutánea bilateral de forma sistemática",
    ],
    correct: 2,
    explanation:
      "El 85% de las roturas vesicales asociadas a fractura de pelvis son extraperitoneales y se tratan mediante simple sondaje, a diferencia de las intraperitoneales, que sí requieren abordaje quirúrgico.",
  },
  {
    id: 572,
    block: "cadera",
    code: "Sospecha de lesión uretral",
    image: null,
    prompt:
      "Varón con fractura de pelvis que presenta sangre en el meato uretral, hematoma perineal y próstata ascendida al tacto rectal. ¿Qué prueba confirma el diagnóstico?",
    options: [
      "La ecografía abdominal simple",
      "La uretrografía",
      "La cistoscopia flexible sin contraste",
      "La radiografía simple de pelvis",
    ],
    correct: 1,
    explanation:
      "La clínica de sangre en el meato distal, próstata ascendida y hematoma perineal orienta a una lesión uretral, casi exclusiva del varón, cuyo diagnóstico se confirma mediante uretrografía.",
  },
  {
    id: 573,
    block: "cadera",
    code: "Clasificación de Denis del sacro",
    image: null,
    prompt:
      "Una fractura vertical de sacro que atraviesa los agujeros de conjunción, con afectación radicular de L5, S1 y S2, corresponde según la clasificación de Denis a:",
    options: [
      "Tipo III, con mayor riesgo de lesión de la cauda equina",
      "Tipo I, la más frecuente de todas",
      "Tipo II, la segunda más frecuente",
      "Una fractura no clasificable según Denis",
    ],
    correct: 2,
    explanation:
      "El tipo II de Denis se produce a través de los agujeros de conjunción o transforaminales y es la segunda fractura sacra más frecuente, siendo típica la afectación radicular de L5, S1 y S2.",
  },
  {
    id: 574,
    block: "cadera",
    code: "Indicación quirúrgica en fractura de sacro",
    image: null,
    prompt:
      "Paciente con fractura de sacro y desplazamiento de 1,5 cm en la TC, sin clínica neurológica asociada. ¿Cuál es la actitud terapéutica más adecuada?",
    options: [
      "Tratamiento conservador con marcha según tolerancia al dolor",
      "Tratamiento quirúrgico, dado que el desplazamiento supera 1 cm",
      "Tracción transesquelética prolongada como tratamiento definitivo",
      "Observación sin ningún tipo de tratamiento activo",
    ],
    correct: 1,
    explanation:
      "El tratamiento quirúrgico de las fracturas de sacro está indicado ante desplazamientos superiores a 1 cm o clínica neurológica asociada, por lo que un desplazamiento de 1,5 cm justifica plantear la cirugía aunque no haya déficit neurológico.",
  },
  {
    id: 575,
    block: "cadera",
    code: "Fracturas de pelvis en el anciano",
    image: null,
    prompt:
      "Respecto a las fracturas de pelvis de baja energía en pacientes ancianos, es correcto afirmar que:",
    options: [
      "El diagnóstico suele ser inmediato, ya que siempre son evidentes en la radiografía simple",
      "Nunca está justificado el tratamiento quirúrgico en este grupo de edad",
      "Su mortalidad es similar a la de las fracturas de cadera, por lo que debe considerarse la cirugía en pacientes con dolor intenso que no puedan movilizarse",
      "El atornillamiento iliosacro es siempre suficiente para evitar el ascenso secundario de la hemipelvis",
    ],
    correct: 2,
    explanation:
      "Las fracturas de pelvis en ancianos suelen tener un diagnóstico demorado por la ausencia de hallazgos en las radiografías, pero su mortalidad es similar a la de las fracturas de cadera, por lo que debe considerarse el tratamiento quirúrgico en pacientes con dolor intenso que no toleren la movilización o carga precoz.",
  },
  {
    id: 576,
    block: "cadera",
    code: "Avulsión de espina ilíaca en adolescente",
    image: null,
    prompt:
      "Adolescente futbolista que, tras un esfuerzo explosivo, presenta una avulsión de la espina ilíaca anteroinferior mínimamente desplazada. ¿Cuál es el tratamiento más adecuado?",
    options: [
      "Reducción abierta y fijación interna de forma programada",
      "Extirpación del fragmento óseo avulsionado",
      "Reposo, hielo y antiinflamatorios, con reincorporación progresiva a la actividad deportiva",
      "Tracción esquelética durante varias semanas",
    ],
    correct: 2,
    explanation:
      "Las fracturas por avulsión de la pelvis en adolescentes se tratan de forma conservadora en la gran mayoría de los casos, con reposo, hielo y antiinflamatorios durante 2-3 semanas y reincorporación progresiva a la actividad deportiva; la cirugía queda reservada a casos excepcionales.",
  },
  {
    id: 577,
    block: "cadera",
    code: "Fractura de pared posterior de acetábulo",
    image: null,
    prompt:
      "¿Cuál es el tipo de fractura acetabular más frecuente y cuál su mecanismo habitual de producción?",
    options: [
      "La fractura de ambas columnas, por traumatismo lateral sobre el trocánter mayor",
      "La fractura de la pared posterior, por traumatismo sobre la rodilla con la cadera en flexión",
      "La fractura de la pared anterior, por hiperabducción de la cadera",
      "La fractura transversa, por traumatismo directo sobre la sínfisis del pubis",
    ],
    correct: 1,
    explanation:
      "La fractura de acetábulo más frecuente es la de la pared posterior, que habitualmente se produce por un traumatismo sobre la rodilla con la cadera en flexión, transmitiendo la fuerza a través del fémur hacia el acetábulo.",
  },
  {
    id: 578,
    block: "cadera",
    code: "Fractura transversa vs. ambas columnas",
    image: null,
    prompt:
      "En una fractura de acetábulo con trazo que atraviesa tanto la columna anterior como la posterior, ¿qué hallazgo permite diferenciar una fractura transversa de una fractura de ambas columnas?",
    options: [
      "El tamaño del fragmento de pared posterior asociado",
      "Que exista o no compromiso del nervio ciático",
      "Que alguna parte de la superficie articular quede en continuidad con el esqueleto axial a través de la articulación sacroilíaca",
      "El tipo de proyección radiológica utilizada para el diagnóstico",
    ],
    correct: 2,
    explanation:
      "En las fracturas transversas, aunque ambas columnas están rotas, alguna parte de la superficie articular permanece en continuidad con el fragmento proximal y con el esqueleto axial; si ninguna parte conserva esa continuidad, la fractura se denomina de las dos columnas.",
  },
  {
    id: 579,
    block: "cadera",
    code: "Signo de la gaviota",
    image: null,
    prompt:
      "En la radiografía AP de cadera de un paciente anciano con fractura de acetábulo se identifica el llamado \"signo de la gaviota\". ¿Qué representa este hallazgo?",
    options: [
      "Una impactación superomedial del acetábulo con subluxación posterosuperior, asociada a peor pronóstico si no se reduce",
      "Una fractura aislada de la pared anterior sin afectación de la columna posterior",
      "Una luxación anterior de cadera sin fractura asociada",
      "Una fractura estable de la rama isquiopubiana sin relevancia clínica",
    ],
    correct: 0,
    explanation:
      "El signo de la gaviota indica una impactación superomedial del acetábulo con subluxación posterosuperior de la cabeza femoral, hallazgo más frecuente en ancianos y asociado a malos resultados clínicos si no se consigue reducir.",
  },
  {
    id: 580,
    block: "cadera",
    code: "Momento quirúrgico en fractura de acetábulo",
    image: null,
    prompt:
      "En una fractura de acetábulo desplazada que precisa reducción abierta y osteosíntesis, ¿cuál es el momento más adecuado para realizar la cirugía?",
    options: [
      "En las primeras 24 horas, para minimizar el riesgo de sangrado",
      "Entre el cuarto y el séptimo día, evitando tanto el sangrado precoz como la dificultad de reducción tardía",
      "Después de la tercera semana, cuando el hematoma se ha reabsorbido por completo",
      "El momento de la cirugía no influye en el resultado final",
    ],
    correct: 1,
    explanation:
      "Se recomienda operar antes de 7 días por la dificultad de reducción de los fragmentos, lo que se asocia a mejores resultados, aunque la cirugía antes de 4-5 días no es aconsejable en general debido al mayor sangrado.",
  },
  {
    id: 581,
    block: "cadera",
    code: "Fractura de acetábulo compleja en anciano",
    image: null,
    prompt:
      "Paciente anciano con una fractura de acetábulo conminuta con impactación de fragmentos, considerada de gran dificultad quirúrgica para una osteosíntesis convencional. ¿Cuál es la estrategia actualmente recomendada?",
    options: [
      "El tratamiento conservador exclusivo, ya que la cirugía siempre aumenta la mortalidad en este grupo de edad",
      "La combinación, en el mismo acto quirúrgico, de reducción y fijación de los fragmentos junto con artroplastia total de cadera",
      "La osteosíntesis aislada, evitando la artroplastia por su menor supervivencia a largo plazo",
      "La tracción esquelética prolongada como tratamiento definitivo",
    ],
    correct: 1,
    explanation:
      "En fracturas acetabulares complejas del anciano, con conminución o impactación de fragmentos, se recomienda combinar en el mismo acto quirúrgico la reducción y fijación previa de los fragmentos con una artroplastia total de cadera, ya que ofrece mejores resultados en dolor que la osteosíntesis aislada.",
  },
  {
    id: 582,
    block: "cadera",
    code: "Abordaje de Kocher-Langenbeck",
    image: null,
    prompt:
      "El abordaje de Kocher-Langenbeck en la cirugía de fracturas de acetábulo se considera de elección para:",
    options: [
      "Las fracturas de la columna anterior a cualquier nivel",
      "Las fracturas de la columna o pared posterior del acetábulo",
      "Las fracturas aisladas de la lámina cuadrilátera",
      "Las fracturas de ambas columnas sin afectación posterior",
    ],
    correct: 1,
    explanation:
      "El abordaje de Kocher-Langenbeck o posterolateral es de elección en las fracturas de la columna o pared posterior del acetábulo, aunque está limitado proximalmente por los vasos y nervios glúteos superiores.",
  },
  {
    id: 583,
    block: "cadera",
    code: "Luxación posterior de cadera",
    image: null,
    prompt:
      "Paciente que tras un accidente de tráfico presenta la cadera en flexión, aducción y rotación interna, con dolor intenso e impotencia funcional. ¿Qué tipo de luxación es más probable y qué actitud terapéutica urgente requiere?",
    options: [
      "Una luxación anterior, que requiere reducción diferida tras estabilización general",
      "Una luxación posterior, que requiere reducción cerrada urgente en las primeras 6-12 horas",
      "Una luxación central, que se trata de forma conservadora sin necesidad de reducción",
      "Una fractura aislada de cadera sin componente de luxación",
    ],
    correct: 1,
    explanation:
      "La posición en flexión, aducción y rotación interna es característica de la luxación posterior de cadera, la más frecuente, que constituye una urgencia traumatológica y requiere reducción cerrada urgente en las primeras 6-12 horas para minimizar el riesgo de necrosis avascular.",
  },
  {
    id: 584,
    block: "cadera",
    code: "Fractura de cabeza femoral Pipkin III",
    image: null,
    prompt:
      "Una fractura de cabeza femoral clasificada como Pipkin III implica que:",
    options: [
      "La fractura de la cabeza femoral es craneal a la fóvea",
      "La fractura de la cabeza femoral se asocia a una fractura del cuello femoral",
      "La fractura de la cabeza femoral es caudal a la fóvea, sin más lesiones asociadas",
      "La fractura de la cabeza femoral se asocia a una fractura acetabular",
    ],
    correct: 1,
    explanation:
      "En la clasificación de Pipkin, el tipo III corresponde a una fractura de la cabeza femoral (tipo I o II) con fractura asociada del cuello femoral, mientras que el tipo IV añade además una fractura acetabular asociada.",
  },
  {
    id: 585,
    block: "cadera",
    code: "Complicación tardía de la luxación de cadera",
    image: null,
    prompt:
      "¿Cuál es la complicación tardía más frecuente tras una luxación traumática de cadera, y qué factor aumenta especialmente su incidencia?",
    options: [
      "La necrosis avascular, que aumenta si la reducción se realiza de forma inmediata",
      "La artrosis, cuya incidencia aumenta si se presenta osteonecrosis o existen fragmentos osteocondrales",
      "La recurrencia de la luxación, que ocurre en la mayoría de los pacientes",
      "La miositis osificante, presente en más de la mitad de los casos",
    ],
    correct: 1,
    explanation:
      "La artrosis es la complicación tardía más frecuente tras una luxación de cadera, alcanzando hasta el 33% a los 10 años, y su incidencia aumenta si se asocia osteonecrosis, fragmentos osteocondrales o lesiones por impacto de la cabeza femoral.",
  },
  {
    id: 586,
    block: "cadera",
    code: "Condiciones de Cummings",
    image: null,
    prompt:
      "Paciente anciana que sufre una caída lateral sobre la cadera. Según las condiciones descritas por Cummings, ¿qué factor multiplica especialmente el riesgo de que la caída termine en fractura?",
    options: [
      "La orientación lateral de la caída alrededor de la cadera",
      "La toma de anticoagulantes orales en el momento de la caída",
      "El antecedente de una fractura de cadera contralateral previa",
      "La presencia de artrosis de cadera previa a la caída",
    ],
    correct: 0,
    explanation:
      "La orientación lateral de la caída alrededor de la cadera multiplica por 10 el riesgo de fractura, siendo uno de los cuatro factores descritos por Cummings junto con reflejos protectores lentos, tejidos blandos insuficientes y calidad ósea inadecuada.",
  },
  {
    id: 587,
    block: "cadera",
    code: "Límite anatómico de fractura proximal de fémur",
    image: null,
    prompt:
      "¿Qué línea anatómica se emplea para definir el límite distal de las fracturas de la extremidad proximal del fémur?",
    options: [
      "El nivel del trocánter menor exactamente",
      "Una línea situada 5 cm por debajo del trocánter menor",
      "Una línea situada 5 cm por encima del trocánter mayor",
      "El punto medio entre ambos trocánteres",
    ],
    correct: 1,
    explanation:
      "Se consideran fracturas de la extremidad proximal del fémur todas aquellas que se producen por encima de una línea situada 5 cm por debajo del trocánter menor.",
  },
  {
    id: 588,
    block: "cadera",
    code: "Fisiopatología de la fractura subcapital",
    image: null,
    prompt:
      "Un paciente presenta una fractura subcapital de fémur desplazada. Frente a las fracturas extracapsulares, ¿cuál es la principal diferencia fisiopatológica de este tipo de lesión?",
    options: [
      "El problema principal es mecánico, por las fuerzas musculares que desplazan los fragmentos",
      "El problema principal es infeccioso, por la proximidad de la fractura a la piel",
      "El problema principal es biológico, por la interrupción de la vascularización cefálica",
      "El problema principal es neurológico, por la lesión del nervio ciático",
    ],
    correct: 2,
    explanation:
      "En las fracturas intracapsulares el principal problema es biológico, ya que se interrumpe la vascularización a la cabeza femoral, mientras que en las extracapsulares el problema es fundamentalmente mecánico.",
  },
  {
    id: 589,
    block: "cadera",
    code: "Vascularización de la cabeza femoral",
    image: null,
    prompt:
      "Tras una fractura intracapsular de cadera, ¿qué vasos son los más relevantes para preservar la vascularización de la cabeza femoral?",
    options: [
      "Los vasos intraóseos procedentes del canal medular femoral",
      "La arteria del ligamento redondo",
      "Las ramas perforantes de la arteria femoral profunda",
      "Las ramas retinaculares del anillo vascular extracapsular",
    ],
    correct: 3,
    explanation:
      "Las ramas retinaculares, especialmente los grupos posterior y lateral, son las más importantes para la vascularización cefálica; de ahí la necesidad de una reducción precisa y estable que evite lesionarlas.",
  },
  {
    id: 590,
    block: "cadera",
    code: "Clasificación de Garden",
    image: null,
    prompt:
      "En la radiografía de una fractura subcapital de cadera se observa una fractura completa, con las líneas trabeculares de la cabeza sin alinearse con las del acetábulo y angulación en varo. ¿A qué tipo de Garden corresponde?",
    options: [
      "Garden III",
      "Garden I",
      "Garden II",
      "Garden IV",
    ],
    correct: 0,
    explanation:
      "Garden III corresponde a una fractura completa con desplazamiento parcial, en la que las líneas óseas de la cabeza no se alinean con el acetábulo y adoptan una posición en varo.",
  },
  {
    id: 591,
    block: "cadera",
    code: "Ángulo de Pauwels",
    image: null,
    prompt:
      "En una fractura de cuello femoral, el trazo forma un ángulo de 55º respecto a la horizontal. ¿A qué tipo de Pauwels corresponde y qué implicación biomecánica tiene?",
    options: [
      "Pauwels I, con predominio de fuerzas de compresión y buen pronóstico",
      "Pauwels III, con mayor componente de cizallamiento e inestabilidad",
      "Pauwels II, con estabilidad intermedia y menor riesgo de fallo",
      "Pauwels IV, un patrón no recogido en la clasificación clásica",
    ],
    correct: 1,
    explanation:
      "Un trazo mayor de 50º respecto a la horizontal corresponde a Pauwels III, con mayor componente de cizallamiento sobre el foco de fractura y peor pronóstico de estabilidad.",
  },
  {
    id: 592,
    block: "cadera",
    code: "Diagnóstico de fractura oculta de cadera",
    image: null,
    prompt:
      "Paciente de 78 años con dolor inguinal tras una caída, discreto dolor a la movilización y radiografía simple sin hallazgos claros de fractura. ¿Cuál es la prueba de imagen considerada de referencia para confirmar o descartar una fractura oculta?",
    options: [
      "La ecografía de cadera",
      "La gammagrafía ósea con Tc99m",
      "La resonancia magnética",
      "Nuevas radiografías simples a las 48 horas",
    ],
    correct: 2,
    explanation:
      "Ante la sospecha de fractura oculta con radiografía simple normal, la resonancia magnética es la prueba de imagen considerada gold standard para el diagnóstico.",
  },
  {
    id: 593,
    block: "cadera",
    code: "Momento quirúrgico en el paciente frágil",
    image: null,
    prompt:
      "En un paciente anciano frágil con fractura de cadera y sin ningún proceso agudo intercurrente, ¿en qué plazo se considera adecuado programar la cirugía para reducir la morbimortalidad?",
    options: [
      "Entre el tercer y quinto día tras el ingreso",
      "Una vez transcurrida una semana, para optimizar al paciente",
      "El momento de la cirugía no influye en el pronóstico del paciente",
      "Antes de las primeras 24-48 horas",
    ],
    correct: 3,
    explanation:
      "En el paciente frágil se considera indicado operar antes de las primeras 24-48 horas, ya que se asocia a una disminución significativa de la morbimortalidad, especialmente en pacientes pluripatológicos.",
  },
  {
    id: 594,
    block: "cadera",
    code: "Manejo perioperatorio con acenocumarol",
    image: null,
    prompt:
      "Un paciente en tratamiento con acenocumarol sufre una fractura de cadera. ¿Cuál es el manejo habitualmente recomendado antes de la cirugía?",
    options: [
      "Administrar vitamina K y operar dentro de las 24 horas",
      "Suspender el fármaco y esperar 5 días sin ninguna otra medida",
      "Sustituir por heparina y demorar la cirugía dos semanas",
      "Realizar la cirugía sin corregir la coagulación",
    ],
    correct: 0,
    explanation:
      "En pacientes con acenocumarol se recomienda administrar vitamina K y operar dentro de las 24 horas, ya que el beneficio de la cirugía precoz supera al riesgo de mantener la anticoagulación.",
  },
  {
    id: 595,
    block: "cadera",
    code: "Manejo con anticoagulantes de acción directa",
    image: null,
    prompt:
      "Un paciente en tratamiento con rivaroxabán por fibrilación auricular sufre una fractura de cadera y tiene función renal normal. ¿Cuál es la actitud más adecuada respecto al momento de la cirugía?",
    options: [
      "Operar de forma inmediata, sin ninguna espera",
      "Esperar 24-48 horas desde la última ingesta y luego operar",
      "Esperar al menos 10 días para garantizar la eliminación completa",
      "No operar hasta revertir farmacológicamente el efecto",
    ],
    correct: 1,
    explanation:
      "Con los nuevos anticoagulantes orales para fibrilación auricular se recomienda esperar 24-48 horas desde la última ingesta, salvo insuficiencia renal, y operar después con las precauciones habituales.",
  },
  {
    id: 596,
    block: "cadera",
    code: "Tratamiento de la fractura Garden I",
    image: null,
    prompt:
      "En una fractura intracapsular de cadera Garden I, ¿cuál es el tratamiento habitualmente recomendado?",
    options: [
      "Tratamiento conservador con sedestación inmediata",
      "Tracción esquelética prolongada seguida de fijación diferida",
      "Fijación con tornillos canulados y carga precoz",
      "Artroplastia total de cadera de entrada",
    ],
    correct: 2,
    explanation:
      "En las fracturas no desplazadas (Garden I y II) se recomienda la fijación con tornillos canulados in situ y carga precoz, ya que el tratamiento conservador conlleva riesgo elevado de desplazamiento secundario.",
  },
  {
    id: 597,
    block: "cadera",
    code: "Indicación de artroplastia en fractura desplazada",
    image: null,
    prompt:
      "Paciente de 85 años fisiológicos con fractura de cadera Garden IV. ¿Cuál es el tratamiento más adecuado?",
    options: [
      "Reducción cerrada y fijación con tornillos canulados",
      "Tratamiento conservador con movilización precoz sin cirugía",
      "Osteosíntesis con tornillo-placa deslizante clásico",
      "Artroplastia, dado el riesgo de necrosis avascular con la fijación interna",
    ],
    correct: 3,
    explanation:
      "En pacientes mayores de 60-80 años fisiológicos con fracturas desplazadas se recomienda de inicio la artroplastia, por el elevado número de complicaciones asociadas a la fijación interna en este grupo.",
  },
  {
    id: 598,
    block: "cadera",
    code: "Ángulo de Garden en la reducción",
    image: null,
    prompt:
      "Al valorar la calidad de la reducción de una fractura intracapsular mediante el ángulo de Garden, ¿qué valores se consideran adecuados en las proyecciones AP y axial?",
    options: [
      "160º en la proyección AP y 180º en la axial",
      "180º en ambas proyecciones AP y axial",
      "140º en la proyección AP y 160º en la axial",
      "120º en la proyección AP y 150º en la axial",
    ],
    correct: 0,
    explanation:
      "El ángulo de Garden se mide entre las trabéculas de la cabeza y la diáfisis en la Rx AP, donde debe ser de 160º, y entre las trabéculas de la cabeza y el cuello en la Rx axial, donde debe ser de 180º.",
  },
  {
    id: 599,
    block: "cadera",
    code: "Técnica de fijación con tornillos canulados",
    image: null,
    prompt:
      "Durante la colocación de tres tornillos canulados en una fractura intracapsular de cadera, ¿qué disposición se recomienda para optimizar el apoyo óseo y minimizar el riesgo de colapso?",
    options: [
      "Un único tornillo central de mayor diámetro que sustituya a los tres",
      "Tornillos paralelos en configuración de triángulo invertido, con apoyo cercano a las corticales",
      "Tornillos divergentes más de 20º entre sí para mayor estabilidad rotacional",
      "Tornillos colocados en el cuadrante superior de la cabeza femoral, evitando el resto de zonas",
    ],
    correct: 1,
    explanation:
      "Se recomienda una configuración en triángulo invertido con tornillos paralelos, con menos de 5-10º de divergencia y a menos de 5 mm de las corticales, para evitar el colapso y el desplazamiento del foco.",
  },
  {
    id: 600,
    block: "cadera",
    code: "Pseudoartrosis de cuello femoral",
    image: null,
    prompt:
      "En el tratamiento de la pseudoartrosis de cuello femoral tras osteosíntesis en un paciente joven con cabeza viable, ¿qué técnica se recomienda cuando el trazo de fractura es muy vertical?",
    options: [
      "Injerto óseo aislado sin modificar la orientación del trazo",
      "Observación clínica sin tratamiento quirúrgico adicional",
      "Osteotomía subtrocantérea para horizontalizar el trazo",
      "Artroplastia total de cadera de entrada",
    ],
    correct: 2,
    explanation:
      "En jóvenes con cabeza viable en la RM y trazo de fractura muy vertical, se recomienda una osteotomía subtrocantérea para horizontalizar el trazo, reservando el injerto óseo para trazos horizontales.",
  },
  {
    id: 601,
    block: "cadera",
    code: "Biomecánica de la fractura pertrocantérea",
    image: null,
    prompt:
      "En las fracturas pertrocantéreas de cadera, a diferencia de las intracapsulares, el problema principal para su consolidación suele ser:",
    options: [
      "Biológico, por la escasa vascularización de la zona trocantérea",
      "Infeccioso, por la proximidad a estructuras contaminadas",
      "Neurológico, por la lesión frecuente del nervio femoral",
      "Mecánico, por las fuerzas musculares que tienden a desplazar los fragmentos",
    ],
    correct: 3,
    explanation:
      "Las fracturas extracapsulares tienen buena vascularización y raramente presentan problemas de consolidación; su principal problema es mecánico, por las importantes fuerzas musculares que actúan sobre el foco.",
  },
  {
    id: 602,
    block: "cadera",
    code: "Criterios de inestabilidad en fractura extracapsular",
    image: null,
    prompt:
      "Además de la conminución de la cortical posteromedial, ¿qué otro criterio se ha incorporado más recientemente para valorar la inestabilidad de una fractura pertrocantérea?",
    options: [
      "La rotura de la pared lateral",
      "El grosor del cuello femoral en la radiografía AP",
      "La presencia de fractura contralateral previa",
      "El diámetro del canal medular femoral",
    ],
    correct: 0,
    explanation:
      "Entre los criterios recientes de inestabilidad se incluye la rotura de la pared lateral, junto con las fracturas intra-extracapsulares, el trazo cervical cizallante y las fracturas basicervicales equivalentes.",
  },
  {
    id: 603,
    block: "cadera",
    code: "Tratamiento de fractura extracapsular estable",
    image: null,
    prompt:
      "En una fractura pertrocantérea estable, sin trazo vertical ni conminución significativa, ¿qué implante se considera clásicamente de elección, aunque actualmente se emplee con menor frecuencia?",
    options: [
      "El clavo intramedular largo",
      "El tornillo-placa deslizante (DHS)",
      "La prótesis parcial de cadera",
      "El fijador externo transitorio",
    ],
    correct: 1,
    explanation:
      "El tornillo-placa deslizante se considera el implante de elección en fracturas estables, con buenos resultados clínicos y menor coste que el clavo intramedular, aunque actualmente se utiliza poco.",
  },
  {
    id: 604,
    block: "cadera",
    code: "Tratamiento de fractura extracapsular inestable",
    image: null,
    prompt:
      "En una fractura pertrocantérea inestable, con conminución de la cortical posteromedial y trazo subtrocantéreo, ¿cuál es el implante considerado de elección en la actualidad?",
    options: [
      "El tornillo-placa deslizante clásico",
      "Las agujas de Kirschner percutáneas",
      "El clavo intramedular proximal",
      "La osteosíntesis con cerclajes de alambre sin otro implante asociado",
    ],
    correct: 2,
    explanation:
      "El clavo intramedular proximal se considera el implante de elección en fracturas inestables, por su ventaja biomecánica al actuar más cerca del eje de carga y reducir el acortamiento y la varización.",
  },
  {
    id: 605,
    block: "cadera",
    code: "Criterios de Chang de reducción",
    image: null,
    prompt:
      "Al aplicar los criterios de Chang para valorar la calidad de la reducción de una fractura pertrocantérea, ¿qué corresponde a una puntuación considerada excelente?",
    options: [
      "Valorar solo el contacto cortical medial positivo, sin el resto de criterios",
      "Una puntuación de 2 o 3 puntos sobre 4",
      "Una puntuación de 0 o 1 punto sobre 4",
      "La suma de los cuatro criterios evaluados, cumpliendo los cuatro ítems",
    ],
    correct: 3,
    explanation:
      "Según los criterios de Chang, la calidad de reducción se considera excelente cuando se cumplen los cuatro ítems evaluados (alineación y desplazamiento en ambas proyecciones), sumando 4 puntos.",
  },
  {
    id: 606,
    block: "cadera",
    code: "Distancia punta-vértice (TAD)",
    image: null,
    prompt:
      "Para minimizar el riesgo de cut-out del tornillo cefálico en la osteosíntesis de una fractura pertrocantérea, ¿qué valor de distancia punta-vértice (TAD) se recomienda no superar?",
    options: [
      "25 mm",
      "15 mm",
      "35 mm",
      "45 mm",
    ],
    correct: 0,
    explanation:
      "Se recomienda una distancia punta-vértice (TAD) menor a 25 mm, con el tornillo cefálico centrado en la cabeza femoral o algo inferior, para reducir el riesgo de cut-out.",
  },
  {
    id: 607,
    block: "cadera",
    code: "Migraciones del tornillo cefálico",
    image: null,
    prompt:
      "En el postoperatorio de una fractura pertrocantérea tratada con clavo intramedular, se observa migración lateral excesiva del tornillo cefálico con colapso de la fractura, sin perforación articular. ¿Cómo se denomina este fenómeno?",
    options: [
      "Cut-through",
      "Back-out",
      "Cut-in",
      "Pull-out",
    ],
    correct: 1,
    explanation:
      "El back-out es la migración lateral excesiva del tornillo cefálico asociada a un colapso excesivo de la fractura; la fractura suele consolidar, pero en varo y con acortamiento.",
  },
  {
    id: 608,
    block: "cadera",
    code: "Fractura aislada de trocánter mayor",
    image: null,
    prompt:
      "Un adulto joven presenta una fractura aislada de trocánter mayor con un desplazamiento de 1,5 cm. ¿Cuál es la actitud terapéutica más adecuada?",
    options: [
      "Tratamiento conservador con reposo y carga progresiva",
      "Observación clínica sin ningún seguimiento posterior",
      "Tratamiento quirúrgico con osteosíntesis",
      "Artroplastia de cadera de entrada",
    ],
    correct: 2,
    explanation:
      "En el adulto joven, si la fractura de trocánter mayor está desplazada más de 1 cm, se recomienda tratamiento quirúrgico mediante osteosíntesis con cerclaje de alambre o placa de reconstrucción.",
  },
  {
    id: 609,
    block: "cadera",
    code: "Clasificación de Delbet",
    image: null,
    prompt:
      "En un niño con una fractura de la extremidad proximal del fémur cuyo trazo se localiza en la zona central del cuello femoral, sin afectar a la fisis ni a la región trocantérea, ¿a qué tipo de Delbet corresponde?",
    options: [
      "Tipo I",
      "Tipo III",
      "Tipo IV",
      "Tipo II",
    ],
    correct: 3,
    explanation:
      "El tipo II de Delbet corresponde a las fracturas transcervicales, localizadas en la zona central del cuello femoral, y es el tipo más frecuente en la infancia (40-50% de los casos).",
  },
  {
    id: 610,
    block: "cadera",
    code: "Necrosis avascular en fracturas pediátricas de cadera",
    image: null,
    prompt:
      "En las fracturas de la extremidad proximal del fémur en la infancia, ¿qué tipo según Delbet presenta el mayor riesgo de necrosis avascular cuando existe luxación asociada de la cabeza femoral?",
    options: [
      "El tipo I con luxación de la cabeza (IB)",
      "El tipo IV intertrocantéreo",
      "El tipo III cervicotrocantéreo",
      "El tipo II transcervical sin desplazamiento",
    ],
    correct: 0,
    explanation:
      "Las fracturas transepifisarias (tipo I) presentan las mayores tasas de necrosis avascular, entre el 40 y el 75% de los casos, siendo el pronóstico especialmente malo en el subtipo IB, con luxación de la cabeza.",
  },
  {
    id: 611,
    block: "cadera",
    code: "Definición de fractura subtrocantérea",
    image: null,
    prompt:
      "¿Cómo se define el límite del trazo de fractura en las fracturas subtrocantéreas de fémur?",
    options: [
      "Trazo comprendido entre el trocánter menor y los 5 cm distales a este",
      "Trazo comprendido entre el trocánter mayor y el trocánter menor",
      "Trazo situado 10 cm por debajo del trocánter menor",
      "Trazo que afecta solo a la fosa piriforme, sin extenderse más distal",
    ],
    correct: 0,
    explanation:
      "Las fracturas subtrocantéreas son aquellas cuyo trazo se encuentra comprendido entre el trocánter menor y los 5 cm distales a este, pudiendo extenderse a la región trocantérica.",
  },
  {
    id: 612,
    block: "cadera",
    code: "Desplazamiento de fragmentos en fractura subtrocantérea",
    image: null,
    prompt:
      "En una fractura subtrocantérea desplazada, ¿en qué posición suele quedar el fragmento proximal por la acción muscular?",
    options: [
      "En aducción y rotación interna",
      "En flexión, abducción y rotación externa",
      "En extensión y aducción",
      "En una posición neutra, sin desplazamiento significativo",
    ],
    correct: 1,
    explanation:
      "El fragmento proximal se desplaza en flexión por la acción del psoas ilíaco, y en abducción y rotación externa por la acción de los glúteos y rotadores externos.",
  },
  {
    id: 613,
    block: "cadera",
    code: "Epidemiología de la fractura subtrocantérea",
    image: null,
    prompt:
      "Respecto a la distribución epidemiológica de las fracturas subtrocantéreas de fémur, es cierto que:",
    options: [
      "Ocurren casi en su totalidad en pacientes jóvenes politraumatizados",
      "Predominan en varones jóvenes por traumatismos de baja energía",
      "Presentan una distribución bimodal, con predominio en ancianas osteoporóticas por baja energía y en varones jóvenes por alta energía",
      "Son excepcionales en pacientes con osteoporosis",
    ],
    correct: 2,
    explanation:
      "Presentan una distribución bimodal: alrededor del 75% ocurren en ancianos con osteoporosis (predominio en mujeres) por baja energía, y el resto en jóvenes, generalmente varones, por traumatismos de alta energía.",
  },
  {
    id: 614,
    block: "cadera",
    code: "Clasificación de Russell-Taylor",
    image: null,
    prompt:
      "La clasificación de Russell-Taylor de las fracturas subtrocantéreas se basa fundamentalmente en:",
    options: [
      "El grado de conminución de la cortical",
      "La distancia del trazo respecto al trocánter menor",
      "La angulación del trazo respecto a la horizontal",
      "La afectación de la fosa piriforme y del trocánter menor",
    ],
    correct: 3,
    explanation:
      "La clasificación de Russell-Taylor distingue cuatro patrones según la afectación o no de la fosa piriforme y la unión del trocánter menor al fragmento proximal.",
  },
  {
    id: 615,
    block: "cadera",
    code: "Estabilidad de la fractura subtrocantérea",
    image: null,
    prompt:
      "Según el patrón de estabilidad de una fractura subtrocantérea, ¿qué determina que se considere estable?",
    options: [
      "La posibilidad de restablecer el contacto óseo posteromedial de forma anatómica",
      "La ausencia de cualquier conminución en la diáfisis distal",
      "Que el trocánter mayor permanezca íntegro",
      "Que el paciente sea joven y con buena calidad ósea",
    ],
    correct: 0,
    explanation:
      "Una fractura subtrocantérea se considera estable cuando se puede restablecer el contacto óseo posteromedial de forma anatómica, permitiendo repartir cargas entre esa zona y el implante.",
  },
  {
    id: 616,
    block: "cadera",
    code: "Diagnóstico ante sospecha de fractura atípica contralateral",
    image: null,
    prompt:
      "Un paciente anciano en tratamiento prolongado con bifosfonatos sufre una fractura subtrocantérea y refiere dolor en el muslo contralateral. ¿Qué actitud diagnóstica es la más adecuada?",
    options: [
      "No se requiere ninguna prueba adicional en el fémur contralateral",
      "Realizar una radiografía del fémur contralateral, y valorar RM si la sospecha clínica es alta",
      "Solicitar una gammagrafía ósea de cuerpo completo de entrada",
      "Esperar a que aparezca una fractura clínica antes de estudiar el otro fémur",
    ],
    correct: 1,
    explanation:
      "Ante una fractura femoral atípica con dolor en el muslo contralateral está indicado realizar una Rx del fémur contralateral, y si la sospecha clínica es alta, completar el estudio con RM.",
  },
  {
    id: 617,
    block: "cadera",
    code: "Consecuencias de una reducción en varo",
    image: null,
    prompt:
      "En el tratamiento quirúrgico de una fractura subtrocantérea, ¿qué consecuencia tiene una reducción incorrecta en varo del fragmento proximal?",
    options: [
      "Disminuye la carga transmitida al implante",
      "No tiene relevancia si el clavo es de gran diámetro",
      "Aumenta la carga transmitida a través del implante y el riesgo de rotura y pseudoartrosis",
      "Favorece la consolidación, al aumentar el contacto óseo medial",
    ],
    correct: 2,
    explanation:
      "Una reducción incorrecta en varo favorece el aumento de las cargas transmitidas a través del implante, incrementando el riesgo de rotura del mismo y de pseudoartrosis.",
  },
  {
    id: 618,
    block: "cadera",
    code: "Implante de elección en fractura subtrocantérea",
    image: null,
    prompt:
      "¿Cuál es el implante considerado gold standard para la mayoría de las fracturas subtrocantéreas de fémur?",
    options: [
      "La placa de estabilidad angular",
      "El tornillo-placa deslizante clásico (DHS)",
      "El fijador externo definitivo",
      "El enclavado intramedular anterógrado, fresado y bloqueado proximal y distal",
    ],
    correct: 3,
    explanation:
      "El implante de elección para la mayoría de las fracturas subtrocantéreas es el enclavado intramedular anterógrado, fresado y bloqueado a nivel proximal y distal, por su mayor resistencia biomecánica.",
  },
  {
    id: 619,
    block: "cadera",
    code: "Punto de entrada del clavo en fractura subtrocantérea",
    image: null,
    prompt:
      "Al colocar un clavo intramedular en una fractura subtrocantérea, ¿qué característica debe tener el punto de entrada para evitar la fijación en varo?",
    options: [
      "Debe ser lo más medial posible",
      "Debe ser lo más lateral posible, en la cara externa del trocánter",
      "Debe localizarse en la fosa piriforme, con independencia del tipo de clavo",
      "Su localización no influye en la alineación final de la fractura",
    ],
    correct: 0,
    explanation:
      "El punto de entrada del clavo debe ser lo más medial posible, idealmente en la unión cuello-trocánter, para evitar la fijación de la fractura en varo.",
  },
  {
    id: 620,
    block: "cadera",
    code: "Complicación más frecuente del tratamiento subtrocantéreo",
    image: null,
    prompt:
      "¿Cuál es la complicación más frecuente descrita tras el tratamiento de las fracturas subtrocantéreas de fémur?",
    options: [
      "La infección profunda del implante",
      "La consolidación viciosa en varo",
      "La lesión del nervio ciático",
      "La necrosis avascular de la cabeza femoral",
    ],
    correct: 1,
    explanation:
      "La complicación más frecuente del tratamiento de las fracturas subtrocantéreas es la consolidación viciosa en varo, que en ocasiones origina una marcha en Trendelemburg.",
  },
  {
    id: 621,
    block: "cadera",
    code: "Factores de riesgo de pseudoartrosis tras enclavado subtrocantéreo",
    image: null,
    prompt:
      "Paciente intervenido de una fractura subtrocantérea mediante clavo intramedular que a los 4 meses presenta rotura de los pernos distales del clavo. Este hallazgo se relaciona especialmente con el desarrollo de:",
    options: [
      "Osificación heterotópica",
      "Necrosis avascular de cadera",
      "Pseudoartrosis",
      "Infección aguda del implante",
    ],
    correct: 2,
    explanation:
      "La autodinamización del clavo por rotura de los pernos distales en las primeras 12 semanas es uno de los principales factores de riesgo, junto con la malalineación en varo, para desarrollar pseudoartrosis.",
  },
  {
    id: 622,
    block: "cadera",
    code: "Manejo de la infección aguda postoperatoria",
    image: null,
    prompt:
      "Un paciente presenta signos de infección aguda a los 10 días de la osteosíntesis de una fractura subtrocantérea, con el implante estable. ¿Cuál es el manejo más adecuado?",
    options: [
      "Retirar el implante de entrada y colocar un espaciador",
      "Tratar solo con antibióticos orales, sin ningún gesto quirúrgico",
      "Esperar a la cronificación de la infección antes de intervenir",
      "Desbridamiento quirúrgico, toma de cultivos y antibioterapia intravenosa, manteniendo el implante",
    ],
    correct: 3,
    explanation:
      "En la infección aguda postoperatoria con osteosíntesis estable se recomienda desbridamiento quirúrgico, toma de cultivo y tratamiento antibiótico intravenoso, manteniendo el implante (DAIR), idealmente antes de los 15 días.",
  },
  {
    id: 623,
    block: "cadera",
    code: "Vascularización de la diáfisis femoral",
    image: null,
    prompt:
      "¿Por qué se considera que el cerclaje de alambre no compromete de forma relevante la vascularización de la diáfisis femoral?",
    options: [
      "Porque el aporte vascular llega a través de vasos perpendiculares procedentes de la arteria femoral profunda por la línea áspera",
      "Porque la diáfisis femoral carece de aporte vascular propio",
      "Porque la vascularización depende del periostio anterior de forma exclusiva",
      "Porque el cerclaje se coloca lejos del foco de fractura en toda circunstancia",
    ],
    correct: 0,
    explanation:
      "La vascularización de la diáfisis femoral se realiza mediante vasos perpendiculares procedentes de la arteria femoral profunda que penetran a través de la línea áspera, por lo que el cerclaje no la compromete.",
  },
  {
    id: 624,
    block: "cadera",
    code: "Clasificación de Winquist y Hansen",
    image: null,
    prompt:
      "En una fractura diafisaria de fémur, la radiografía muestra que aproximadamente el 40% de la cortical permanece intacta, con conminución moderada. Según Winquist y Hansen, ¿a qué tipo corresponde?",
    options: [
      "Tipo I",
      "Tipo III",
      "Tipo II",
      "Tipo IV",
    ],
    correct: 1,
    explanation:
      "El tipo III de Winquist y Hansen corresponde a fracturas en las que al menos el 25% de la cortical está intacta, categoría en la que encaja una cortical intacta del 40%, al no alcanzar el 50% exigido para el tipo II.",
  },
  {
    id: 625,
    block: "cadera",
    code: "Lesiones asociadas a la fractura diafisaria de fémur",
    image: null,
    prompt:
      "En la valoración inicial de una fractura diafisaria de fémur por traumatismo de alta energía, ¿qué lesión asociada debe descartarse de forma sistemática mediante estudio de imagen específico de cadera?",
    options: [
      "La luxación de rótula ipsilateral",
      "La fractura de meseta tibial contralateral",
      "La fractura de cuello femoral ipsilateral, que puede pasar desapercibida hasta en la mitad de los casos",
      "La fractura de calcáneo ipsilateral",
    ],
    correct: 2,
    explanation:
      "Aunque solo se detecta una fractura de cuello femoral asociada en el 2,5-6% de las fracturas diafisarias, hasta la mitad de ellas pasan desapercibidas, por lo que se recomienda un estudio específico de cadera.",
  },
  {
    id: 626,
    block: "cadera",
    code: "Tratamiento de la fractura diafisaria de fémur en el adulto",
    image: null,
    prompt:
      "En un paciente politraumatizado estable con una fractura diafisaria de fémur cerrada, ¿cuál es la actitud terapéutica recomendada?",
    options: [
      "Tratamiento conservador con tracción prolongada seguida de yeso",
      "Fijación con placa de estabilidad angular como primera elección",
      "Fijador externo como tratamiento definitivo",
      "Fijación quirúrgica con clavo intramedular anterógrado, fresado y bloqueado, dentro de las primeras 24 horas",
    ],
    correct: 3,
    explanation:
      "En el paciente estable se recomienda la fijación quirúrgica con clavo intramedular anterógrado, fresado y bloqueado, dentro de las primeras 24 horas, para prevenir complicaciones como la embolia grasa.",
  },
  {
    id: 627,
    block: "cadera",
    code: "Tracción esquelética provisional en fractura diafisaria",
    image: null,
    prompt:
      "Si la cirugía de una fractura diafisaria de fémur se va a demorar más de 24 horas, ¿qué tipo de tracción y material se recomienda emplear?",
    options: [
      "Tracción esquelética con el 10-15% del peso corporal, usando agujas de Kirschner tensadas",
      "Tracción blanda cutánea con un peso superior a 5 kg",
      "Tracción esquelética con clavos de rosca para mayor fijación",
      "No se recomienda emplear tracción provisional en estos casos",
    ],
    correct: 0,
    explanation:
      "Se recomienda tracción esquelética con un peso del 10-15% del peso corporal, empleando agujas de Kirschner tensadas; los clavos con rosca no deben utilizarse para este fin.",
  },
  {
    id: 628,
    block: "cadera",
    code: "Indicaciones de fijador externo en fractura diafisaria",
    image: null,
    prompt:
      "¿En cuál de las siguientes situaciones está indicado el uso de fijador externo como manejo inicial de una fractura diafisaria de fémur?",
    options: [
      "En una fractura cerrada simple en un paciente estable",
      "En una fractura abierta grado III o en el politraumatizado grave con criterios de control de daños",
      "En una fractura de tercio medio con conminución mínima",
      "En cualquier fractura diafisaria, como tratamiento definitivo",
    ],
    correct: 1,
    explanation:
      "El fijador externo está indicado en fracturas abiertas grado III, en lesiones vasculares que requieren reparación urgente y en politraumatizados graves dentro de los principios de control de daños.",
  },
  {
    id: 629,
    block: "cadera",
    code: "Fractura ipsilateral de diáfisis y cuello femoral",
    image: null,
    prompt:
      "Paciente joven con fractura diafisaria de fémur y fractura no desplazada de cuello femoral ipsilateral, ambas confirmadas por TAC. ¿Cuál es el manejo recomendado?",
    options: [
      "Tratar ambas fracturas con un único clavo cefalodiafisario, sin valorar dispositivos independientes",
      "Tratar solo la fractura diafisaria y observar la del cuello femoral",
      "Tratar cada fractura de forma individualizada, con osteosíntesis específica de cadera y de diáfisis",
      "Indicar artroplastia total de cadera de entrada junto con clavo diafisario",
    ],
    correct: 2,
    explanation:
      "Se recomienda tratar ambas fracturas de manera individualizada, con osteosíntesis específica de la cadera (tornillos canulados o DHS) y de la diáfisis (clavo anterógrado sorteando los tornillos, clavo retrógrado o placa).",
  },
  {
    id: 630,
    block: "cadera",
    code: "Síndrome de embolia grasa",
    image: null,
    prompt:
      "¿Cuál es la tríada clínica clásicamente descrita en el síndrome de embolia grasa tras una fractura diafisaria de fémur?",
    options: [
      "Fiebre, taquicardia y edema pulmonar",
      "Dolor torácico, hemoptisis y cianosis",
      "Hipotensión, oliguria y confusión",
      "Hipoxemia, alteración del estado mental y petequias",
    ],
    correct: 3,
    explanation:
      "La tríada típica del síndrome de embolia grasa es hipoxemia, cambios del estado mental y petequias, que suele aparecer entre las 24 y 72 horas tras el traumatismo.",
  },
  {
    id: 631,
    block: "cadera",
    code: "Fractura diafisaria de fémur en lactantes",
    image: null,
    prompt:
      "Un lactante de 10 meses acude con una fractura diafisaria de fémur sin antecedente traumático claro. ¿Qué actitud se recomienda ante este hallazgo?",
    options: [
      "Descartar activamente un síndrome del niño maltratado",
      "Asumir que se trata de una fractura de baja energía sin más estudio",
      "Indicar tratamiento conservador sin investigar la causa",
      "Derivar a fisioterapia sin realizar estudio radiológico adicional",
    ],
    correct: 0,
    explanation:
      "En lactantes con fractura femoral sin antecedente traumático claro debe descartarse activamente el síndrome del niño maltratado, que para algunos autores representa hasta el 50% de las fracturas femorales en esta edad.",
  },
  {
    id: 632,
    block: "cadera",
    code: "Tratamiento de fractura de fémur en niño de 18 meses",
    image: null,
    prompt:
      "Un niño de 18 meses presenta una fractura diafisaria de fémur con un acortamiento inicial de 1 cm. ¿Cuál es el tratamiento habitualmente recomendado?",
    options: [
      "Enclavado intramedular flexible",
      "Yeso pelvipédico directo, en la posición de 30-30-30-30º",
      "Placa de osteosíntesis submuscular",
      "Fijador externo circular",
    ],
    correct: 1,
    explanation:
      "Entre los 6 meses y los 2 años, si el acortamiento es menor de 2 cm, se recomienda un yeso pelvipédico directo en la posición de 30º de flexión de cadera, 30º de abducción, 30º de rotación externa y 30º de flexión de rodilla.",
  },
  {
    id: 633,
    block: "cadera",
    code: "Entrada del clavo en adolescentes con fractura de fémur",
    image: null,
    prompt:
      "En un adolescente de 13 años con fractura diafisaria de fémur candidato a enclavado intramedular, ¿por qué se prefiere una entrada lateral, evitando la fosa piriforme?",
    options: [
      "Porque la entrada lateral acorta de forma relevante el tiempo quirúrgico",
      "Porque la entrada por fosa piriforme se asocia a mayor riesgo de necrosis avascular femoral proximal",
      "Porque la entrada lateral evita el uso de control radioscópico",
      "Porque la fosa piriforme no permite introducir clavos bloqueados",
    ],
    correct: 1,
    explanation:
      "En la población pediátrica, la entrada del clavo a través de la fosa piriforme se asocia con un mayor riesgo de osteonecrosis femoral proximal, por lo que en mayores de 12 años se recomienda la entrada lateral.",
  },
  {
    id: 634,
    block: "cadera",
    code: "Complicaciones de la fractura de fémur en la infancia",
    image: null,
    prompt:
      "Respecto a las complicaciones de la fractura diafisaria de fémur en la infancia, es cierto que:",
    options: [
      "La necrosis avascular de cadera es la complicación más frecuente",
      "Las deformidades rotacionales mayores de 20º no precisan ningún seguimiento",
      "El hipercrecimiento de la extremidad no guarda relación con la edad del paciente",
      "La dismetría de miembros inferiores por hipercrecimiento es la complicación más frecuente, sobre todo en menores de 10 años",
    ],
    correct: 3,
    explanation:
      "La dismetría de miembros inferiores por hipercrecimiento es la complicación más frecuente de la fractura diafisaria de fémur en niños, especialmente en los menores de 10 años.",
  },
  {
    id: 635,
    block: "cadera",
    code: "Fractura femoral atípica",
    image: null,
    prompt:
      "Una paciente en tratamiento con bifosfonatos durante varios años consulta por dolor progresivo en el muslo, con una radiografía que muestra un trazo horizontal en la cortical externa y engrosamiento cortical lateral, sin conminución. ¿Qué entidad sugiere este cuadro?",
    options: [
      "Una fractura femoral atípica asociada al tratamiento antirresortivo",
      "Una fractura patológica por metástasis ósea",
      "Una fractura de estrés por sobrecarga deportiva",
      "Una fractura pertrocantérea clásica por fragilidad",
    ],
    correct: 0,
    explanation:
      "El trazo horizontal en la cortical externa, la ausencia de conminución y el engrosamiento cortical lateral, junto con los síntomas prodrómicos en el muslo, son criterios característicos de la fractura femoral atípica asociada al tratamiento antirresortivo prolongado.",
  },
  {
    id: 636,
    block: "rodilla",
    code: "Fascículos del ligamento cruzado anterior",
    image: null,
    prompt:
      "Respecto a los dos fascículos descritos clásicamente en el ligamento cruzado anterior, es cierto que:",
    options: [
      "El fascículo anteromedial permanece tenso durante todo el recorrido de flexo-extensión",
      "El fascículo posterolateral es el que limita principalmente la traslación anterior de la tibia",
      "Ambos fascículos permanecen igual de tensos en todo el rango de movimiento",
      "El fascículo anteromedial se relaja por completo en extensión",
    ],
    correct: 0,
    explanation:
      "El fascículo anteromedial permanece tenso durante todo el recorrido de flexo-extensión, mientras que el posterolateral solo está tenso en extensión, siendo el responsable de controlar la rotación interna en los últimos grados de extensión.",
  },
  {
    id: 637,
    block: "rodilla",
    code: "Función del ligamento cruzado posterior",
    image: null,
    prompt:
      "¿Cuál es la función biomecánica principal del ligamento cruzado posterior?",
    options: [
      "Limitar la traslación anterior de la tibia respecto al fémur",
      "Limitar el desplazamiento posterior de la tibia y controlar la hiperflexión",
      "Proporcionar estabilidad en varo de la rodilla",
      "Controlar la rotación interna en los últimos grados de extensión",
    ],
    correct: 1,
    explanation:
      "El LCP limita el desplazamiento posterior de la tibia respecto al fémur (hasta un 95%) y controla la flexión, evitando la hiperflexión, además de limitar la rotación externa con la rodilla flexionada.",
  },
  {
    id: 638,
    block: "rodilla",
    code: "Complejo posterolateral (PAPE)",
    image: null,
    prompt:
      "¿Cuáles son las tres estructuras consideradas más importantes dentro del ángulo posterolateral o PAPE de la rodilla?",
    options: [
      "El ligamento colateral medial, el POL y el semimembranoso",
      "La banda iliotibial, el bíceps femoral y el gemelo interno",
      "El ligamento colateral lateral, el tendón del poplíteo y el ligamento arcuato",
      "El menisco externo, el ligamento de Wrisberg y el LCP",
    ],
    correct: 2,
    explanation:
      "El PAPE está compuesto por varias estructuras, siendo las tres más importantes el ligamento colateral lateral, el tendón del músculo poplíteo y el ligamento arcuato (fíbulo-poplíteo).",
  },
  {
    id: 639,
    block: "rodilla",
    code: "Ligamento anterolateral y fractura de Segond",
    image: null,
    prompt:
      "En una rotura del ligamento cruzado anterior con hallazgo radiológico de fractura de Segond, ¿qué estructura se considera implicada en la producción de esa fractura?",
    options: [
      "El ligamento colateral medial",
      "El tendón del poplíteo",
      "El menisco lateral",
      "El ligamento anterolateral",
    ],
    correct: 3,
    explanation:
      "El ligamento anterolateral, presente en la mayoría de las rodillas, podría ser el responsable de la fractura de Segond en las roturas del LCA y de la inestabilidad rotacional residual tras la cirugía.",
  },
  {
    id: 640,
    block: "rodilla",
    code: "Desplazamiento del menisco lateral en flexión",
    image: null,
    prompt:
      "Durante la flexión de la rodilla, el menisco lateral se desplaza hacia atrás en mayor medida que el interno. ¿A qué estructura se debe principalmente este movimiento?",
    options: [
      "A la tracción ejercida por el tendón del músculo poplíteo",
      "A la tracción del ligamento colateral medial",
      "A la tensión de la cápsula anterior",
      "A la tracción del ligamento rotuliano",
    ],
    correct: 0,
    explanation:
      "El menisco externo es arrastrado hacia atrás por la inserción del tendón del poplíteo, lo que evita su atrapamiento entre fémur y tibia a medida que la rodilla se flexiona.",
  },
  {
    id: 641,
    block: "rodilla",
    code: "Mecanismo de roll-back de la rodilla",
    image: null,
    prompt:
      "En el mecanismo de roll-back de la rodilla, ¿qué ocurre en los cóndilos femorales después de los primeros 30º de flexión?",
    options: [
      "Permanecen fijos, sin ningún desplazamiento sobre la tibia",
      "Se desplazan hacia atrás (ruedan), de forma más pronunciada el cóndilo externo",
      "Se desplazan hacia delante, rotando medialmente",
      "Se desplazan hacia atrás por igual en ambos cóndilos",
    ],
    correct: 1,
    explanation:
      "Después de los 30º de flexión, los cóndilos femorales ruedan hacia atrás, más el externo que el interno, lo que provoca una rotación externa de la tibia respecto al eje mecánico.",
  },
  {
    id: 642,
    block: "rodilla",
    code: "Estabilidad de la rodilla en extensión completa",
    image: null,
    prompt:
      "¿Por qué se considera que la rodilla presenta su máxima estabilidad en extensión completa?",
    options: [
      "Porque en esa posición se relajan los ligamentos colaterales",
      "Porque el menisco externo queda totalmente libre de tensión",
      "Porque los ligamentos colaterales y cruzados están tensos y la rodilla pierde capacidad de rotación",
      "Porque desaparece la función estabilizadora del cuádriceps",
    ],
    correct: 2,
    explanation:
      "En extensión completa, los ligamentos colaterales y cruzados están tensos y ambos meniscos quedan firmemente sujetos entre los cóndilos, lo que hace que la rodilla pierda su capacidad de rotación.",
  },
  {
    id: 643,
    block: "rodilla",
    code: "Inervación de la articulación de la rodilla",
    image: null,
    prompt:
      "¿De qué nervios procede fundamentalmente la inervación de la articulación de la rodilla?",
    options: [
      "Nervio femoral y nervio cutáneo femoral lateral",
      "Nervio obturador y nervio pudendo",
      "Nervio ciático y nervio genitofemoral",
      "Nervio femoral, nervio obturador y nervio ciático",
    ],
    correct: 3,
    explanation:
      "La inervación de la rodilla proviene del nervio femoral, el nervio obturador y el nervio ciático, que también inervan los distintos músculos que actúan sobre la articulación.",
  },
  {
    id: 644,
    block: "rodilla",
    code: "Epidemiología de la fractura de fémur distal",
    image: null,
    prompt:
      "Respecto a la epidemiología de las fracturas de la extremidad distal del fémur en el adulto, es cierto que:",
    options: [
      "Presentan una distribución bimodal, siendo más frecuente el pico en ancianas por traumatismos de baja energía",
      "Ocurren casi en su totalidad en jóvenes politraumatizados",
      "La mortalidad al año es netamente inferior a la de las fracturas de cadera",
      "No guardan relación alguna con la osteoporosis",
    ],
    correct: 0,
    explanation:
      "Presentan una distribución bimodal, siendo el pico en pacientes ancianas osteoporóticas por baja energía más frecuente que el de adultos jóvenes por alta energía; la mortalidad al año es comparable o incluso mayor que la de las fracturas de cadera.",
  },
  {
    id: 645,
    block: "rodilla",
    code: "Factores que aumentan la mortalidad en la fractura de fémur distal",
    image: null,
    prompt:
      "En un paciente anciano con fractura de fémur distal, ¿qué factor se asocia especialmente a un aumento de la mortalidad?",
    options: [
      "La cirugía realizada dentro de las primeras 24 horas",
      "La demora quirúrgica superior a 48 horas",
      "El uso de placas bloqueadas laterales",
      "La movilización precoz en carga parcial",
    ],
    correct: 1,
    explanation:
      "La demora quirúrgica mayor de 48 horas, el tratamiento conservador y las restricciones a la movilidad o carga postoperatoria son los factores más relevantes que aumentan la mortalidad en estos pacientes.",
  },
  {
    id: 646,
    block: "rodilla",
    code: "Línea de Blumensaat",
    image: null,
    prompt:
      "¿Para qué se utiliza principalmente la línea de Blumensaat en el tratamiento de las fracturas de fémur distal?",
    options: [
      "Para medir el ángulo cervicodiafisario del fémur",
      "Para valorar la reducción de fracturas de meseta tibial",
      "Como referencia del punto de entrada de los clavos retrógrados y para evitar penetrar la escotadura intercondílea",
      "Para clasificar el grado de conminución según Winquist",
    ],
    correct: 2,
    explanation:
      "La línea de Blumensaat es la referencia radiológica de la escotadura intercondílea: sirve para evitar penetrarla con tornillos en placas mediales y marca el punto de entrada de los clavos retrógrados.",
  },
  {
    id: 647,
    block: "rodilla",
    code: "Patrones de desplazamiento en la fractura de fémur distal",
    image: null,
    prompt:
      "En una fractura supracondílea de fémur, ¿qué efecto produce la acción de los gastrocnemios sobre el fragmento distal?",
    options: [
      "Desplazamiento en varo del fragmento distal",
      "Rotación externa del fragmento distal",
      "Acortamiento de la extremidad por tracción proximal",
      "Extensión del fragmento distal con desplazamiento posterior",
    ],
    correct: 3,
    explanation:
      "Los gastrocnemios extienden el fragmento distal, provocando su desplazamiento posterior, mientras que el cuádriceps y los isquiotibiales ejercen tracción proximal, causando acortamiento de la extremidad.",
  },
  {
    id: 648,
    block: "rodilla",
    code: "Clasificación AO/OTA de la fractura de fémur distal",
    image: null,
    prompt:
      "Una fractura de fémur distal con afectación articular completa, en la que ninguna parte de la superficie articular mantiene continuidad con la diáfisis, se clasifica según la AO/OTA como tipo:",
    options: [
      "33-C",
      "33-A",
      "33-B",
      "32-C",
    ],
    correct: 0,
    explanation:
      "El tipo 33-C corresponde a las fracturas supraintercondíleas, con afectación articular completa, en las que ninguna parte de la superficie articular mantiene continuidad con la diáfisis.",
  },
  {
    id: 649,
    block: "rodilla",
    code: "Fractura de Hoffa",
    image: null,
    prompt:
      "¿Cómo se define una fractura de Hoffa en el contexto de las fracturas de fémur distal?",
    options: [
      "Una fractura extraarticular a nivel supracondíleo",
      "Una fractura unicondílea con trazo en el plano coronal",
      "Una avulsión del epicóndilo femoral",
      "Una fractura bicondílea con trazo en T",
    ],
    correct: 1,
    explanation:
      "La fractura de Hoffa es una fractura unicondílea con trazo coronal, incluida dentro del grupo 33-B3 de la clasificación AO/OTA, y suele requerir TAC para su correcta identificación.",
  },
  {
    id: 650,
    block: "rodilla",
    code: "Indicaciones de tratamiento conservador en fractura de fémur distal",
    image: null,
    prompt:
      "¿En qué situación estaría indicado un tratamiento conservador ante una fractura de fémur distal en el adulto?",
    options: [
      "En una fractura articular completa desplazada en un paciente joven activo",
      "En una fractura conminuta con gran pérdida de partes blandas en un paciente joven",
      "En una fractura extraarticular no desplazada en un paciente colaborador",
      "En cualquier fractura de fémur distal en paciente anciano con buena calidad ósea",
    ],
    correct: 2,
    explanation:
      "El tratamiento conservador tiene pocas indicaciones actuales: fracturas extraarticulares no desplazadas en pacientes colaboradores, pacientes no operables o lesionados medulares irreversibles.",
  },
  {
    id: 651,
    block: "rodilla",
    code: "Implante de elección en la fractura de fémur distal",
    image: null,
    prompt:
      "¿Cuál es el tipo de implante más utilizado en la actualidad para el tratamiento quirúrgico de las fracturas de fémur distal?",
    options: [
      "El tornillo-placa condíleo dinámico (DCS)",
      "El fijador externo circular como tratamiento definitivo",
      "El clavo intramedular anterógrado convencional",
      "Las placas preconformadas laterales con tornillos bloqueados a la placa",
    ],
    correct: 3,
    explanation:
      "Las placas preconformadas laterales con tornillos bloqueados a la placa son actualmente los implantes más utilizados, siendo de elección en fracturas intraarticulares y periprotésicas.",
  },
  {
    id: 652,
    block: "rodilla",
    code: "Técnica MIPO en fractura de fémur distal",
    image: null,
    prompt:
      "¿Qué ventaja aporta la técnica MIPO (osteosíntesis con placa mínimamente invasiva) en el tratamiento de las fracturas de fémur distal?",
    options: [
      "Preserva la vascularización del foco, mejorando la consolidación y reduciendo la tasa de infección",
      "Permite prescindir del control radioscópico intraoperatorio",
      "Elimina la necesidad de reducir la superficie articular",
      "Evita el uso de tornillos bloqueados a la placa",
    ],
    correct: 0,
    explanation:
      "La técnica MIPO supone una ventaja biológica al preservar la vascularización, mejorando las tasas de consolidación y reduciendo además las tasas de infección, pérdida sanguínea y tiempo quirúrgico.",
  },
  {
    id: 653,
    block: "rodilla",
    code: "Indicaciones del clavo endomedular retrógrado",
    image: null,
    prompt:
      "¿En qué tipo de fractura de fémur distal está indicado habitualmente el uso de un clavo endomedular retrógrado?",
    options: [
      "En fracturas articulares muy complejas, con gran conminución intercondílea de la superficie articular",
      "En fracturas extraarticulares o intraarticulares simples, no desplazadas o poco desplazadas",
      "En fracturas periprotésicas con vástago que ocupa todo el canal medular",
      "En fracturas abiertas grado III como tratamiento definitivo inmediato",
    ],
    correct: 1,
    explanation:
      "La indicación habitual del clavo retrógrado es en fracturas extraarticulares (33-A) o intraarticulares simples no desplazadas o poco desplazadas (33-C1, C2).",
  },
  {
    id: 654,
    block: "rodilla",
    code: "Doble fijación en fractura de fémur distal",
    image: null,
    prompt:
      "¿Cuándo está indicada la doble fijación (placa medial y lateral) en el tratamiento de una fractura de fémur distal?",
    options: [
      "En toda fractura extraarticular no desplazada",
      "Cuando el paciente rechaza someterse a cirugía",
      "Cuando el uso de un solo implante no proporciona estabilidad suficiente",
      "En fracturas que se van a tratar de forma conservadora",
    ],
    correct: 2,
    explanation:
      "La indicación de la doble fijación se realiza cuando el uso de un solo implante no proporciona estabilidad suficiente, ofreciendo menor riesgo de fallo del implante y de pseudoartrosis.",
  },
  {
    id: 655,
    block: "rodilla",
    code: "Complicación más frecuente de la fractura de fémur distal",
    image: null,
    prompt:
      "¿Cuál es la complicación más frecuente tras el tratamiento de las fracturas de fémur distal en el adulto?",
    options: [
      "La pseudoartrosis",
      "La infección profunda",
      "La consolidación viciosa en deformidad de palo de golf",
      "La rigidez de la rodilla",
    ],
    correct: 3,
    explanation:
      "La pérdida de movilidad de la rodilla (rigidez) es la complicación más frecuente tras el tratamiento de las fracturas de fémur distal.",
  },
  {
    id: 656,
    block: "rodilla",
    code: "Deformidad en palo de golf",
    image: null,
    prompt:
      "La llamada 'deformidad en palo de golf' tras la osteosíntesis de una fractura de fémur distal se caracteriza por:",
    options: [
      "Traslación medial y rotación externa del segmento distal, por colocación incorrecta de la placa lateral",
      "Traslación lateral y rotación interna del segmento distal",
      "Un acortamiento aislado sin ninguna angulación",
      "Una angulación en valgo sin traslación asociada",
    ],
    correct: 0,
    explanation:
      "La deformidad en palo de golf se genera por una mala reducción con traslación medial y rotación externa del segmento distal, generalmente por colocación incorrecta de la placa lateral, aumentando el riesgo de fracaso del implante.",
  },
  {
    id: 657,
    block: "rodilla",
    code: "Epidemiología de la epifisiolisis distal de fémur",
    image: null,
    prompt:
      "Respecto a la epifisiolisis de la extremidad distal del fémur en niños, es cierto que:",
    options: [
      "Son fracturas muy frecuentes, con incidencia superior a otras fisis del cuerpo",
      "La mayoría ocurren en adolescentes, y debe descartarse malignidad subyacente por la localización del osteosarcoma",
      "Ocurren predominantemente en niños menores de 5 años",
      "No se relacionan con el mecanismo de hiperextensión de la rodilla",
    ],
    correct: 1,
    explanation:
      "Son epifisiolisis poco frecuentes, la mayoría en adolescentes, y debe descartarse malignidad subyacente porque la metáfisis femoral distal es la localización más habitual del osteosarcoma.",
  },
  {
    id: 658,
    block: "rodilla",
    code: "Epifisiolisis tipo II de Salter-Harris en fémur distal",
    image: null,
    prompt:
      "En la epifisiolisis distal de fémur, ¿cuál es el tipo de Salter-Harris más frecuente y qué caracteriza su patrón de desplazamiento?",
    options: [
      "El tipo I, con ensanchamiento de la fisis sin fragmento metafisario",
      "El tipo IV, con afectación combinada de epífisis y metáfisis",
      "El tipo II, en el que el fragmento metafisario se sitúa en la dirección del desplazamiento",
      "El tipo III, con elevada incidencia de epifisiodesis",
    ],
    correct: 2,
    explanation:
      "El tipo II de Salter-Harris es el más frecuente en la fisis femoral distal; el fragmento metafisario suele situarse en la dirección del desplazamiento, en la zona de compresión.",
  },
  {
    id: 659,
    block: "rodilla",
    code: "Complicación más frecuente de la fractura de rótula",
    image: null,
    prompt:
      "¿Cuál es la complicación más frecuente descrita tras el tratamiento de las fracturas de rótula?",
    options: [
      "La artrosis femoropatelar",
      "La pseudoartrosis",
      "La necrosis avascular",
      "La rigidez, con pérdida de algunos grados de flexión",
    ],
    correct: 3,
    explanation:
      "La rigidez, sobre todo la pérdida de algunos grados de flexión, es la complicación más frecuente tras el tratamiento de las fracturas de rótula.",
  },
  {
    id: 660,
    block: "rodilla",
    code: "Indicación quirúrgica en fractura de rótula",
    image: null,
    prompt:
      "Paciente con fractura de rótula que presenta un escalón articular de 4 mm y conserva la capacidad de extender la pierna contra gravedad. ¿Cuál es la actitud más adecuada?",
    options: [
      "Tratamiento quirúrgico, por la incongruencia articular superior a 3 mm",
      "Tratamiento conservador con calza de Böhler, dado que el aparato extensor está íntegro",
      "Observación sin ningún tipo de inmovilización",
      "Patelectomía total de entrada",
    ],
    correct: 0,
    explanation:
      "El tratamiento quirúrgico está indicado en fracturas con más de 3 mm de incongruencia articular, con independencia de que el aparato extensor se mantenga íntegro.",
  },
  {
    id: 661,
    block: "rodilla",
    code: "Ángulo de congruencia de Merchant",
    image: null,
    prompt:
      "En la proyección axial de Merchant a 45º de flexión, ¿a partir de qué valor se considera patológico el ángulo de congruencia?",
    options: [
      "Mayor de +4º",
      "Mayor de +10º",
      "Menor de -6º",
      "Mayor de +20º",
    ],
    correct: 0,
    explanation:
      "El valor normal del ángulo de congruencia es de -6º, con un límite superior de la normalidad de +4º; valores mayores indican desviación lateral patológica de la rótula.",
  },
  {
    id: 662,
    block: "rodilla",
    code: "Distancia ST-TAT",
    image: null,
    prompt:
      "Paciente con inestabilidad rotuliana recidivante en el que se plantea cirugía. En el TAC se mide una distancia surco troclear-tuberosidad anterior de la tibia (ST-TAT) de 24 mm. ¿Cómo se interpreta este hallazgo?",
    options: [
      "Es una medición indirecta del ángulo Q y se asocia a mayor inestabilidad femoropatelar",
      "Es un valor normal que no influye en la planificación quirúrgica",
      "Indica displasia troclear grave que obliga a trocleoplastia",
      "Solo tiene valor cuando se mide en radiografía simple",
    ],
    correct: 0,
    explanation:
      "La distancia ST-TAT es una medición indirecta del ángulo Q realizada en el TAC; valores superiores a 20 mm se asocian a mayor incidencia de inestabilidad femoropatelar y de dolor anterior de rodilla.",
  },
  {
    id: 663,
    block: "rodilla",
    code: "Tratamiento inicial del dolor femoropatelar",
    image: null,
    prompt:
      "Paciente joven, deportista, con dolor anterior de rodilla bilateral de meses de evolución, sin antecedente traumático, con radiografías normales. ¿Cuál debe ser el pilar del tratamiento inicial?",
    options: [
      "Reposo deportivo prolongado y AINEs como medida principal",
      "Ejercicios de potenciación del vasto medial oblicuo y modificación de actividades",
      "Infiltración de toxina botulínica en el vasto lateral",
      "Liberación artroscópica temprana del alerón rotuliano externo",
    ],
    correct: 1,
    explanation:
      "El pilar del tratamiento del dolor femoropatelar es la potenciación del vasto medial oblicuo mediante ejercicios específicos junto con la modificación de las actividades que provocan dolor.",
  },
  {
    id: 664,
    block: "rodilla",
    code: "Signos radiológicos de displasia troclear",
    image: null,
    prompt:
      "En la radiografía lateral de rodilla de un paciente con inestabilidad rotuliana, ¿cuál de los siguientes hallazgos es patognomónico de displasia troclear?",
    options: [
      "El espolón supratroclear",
      "El doble contorno",
      "La rótula alta",
      "El signo del cruce",
    ],
    correct: 3,
    explanation:
      "El signo del cruce, en el que se superponen el contorno del suelo troclear y el del cóndilo femoral lateral, es un hallazgo patognomónico de displasia troclear.",
  },
  {
    id: 665,
    block: "rodilla",
    code: "Índice de Blackburne-Peel",
    image: null,
    prompt:
      "¿En qué consiste el índice de Blackburne-Peel utilizado para valorar la altura rotuliana?",
    options: [
      "El cociente entre la longitud del tendón patelar y el eje mayor de la rótula",
      "La distancia del polo inferior de la rótula al polo anterosuperior de la tibia dividida por la longitud rotuliana",
      "El cociente entre la distancia de la carilla articular de la rótula al platillo tibial y la longitud de esa carilla",
      "La distancia entre el surco troclear y la tuberosidad tibial anterior",
    ],
    correct: 2,
    explanation:
      "El índice de Blackburne-Peel se calcula como el cociente entre la distancia del extremo inferior de la superficie articular de la rótula a la línea de la superficie articular tibial y la longitud de dicha superficie articular; es actualmente el más recomendado por su menor variabilidad interobservador.",
  },
  {
    id: 666,
    block: "rodilla",
    code: "Rótula bipartita sintomática",
    image: null,
    prompt:
      "Paciente con rótula bipartita conocida que, tras 7 meses de tratamiento conservador correctamente realizado, persiste con dolor localizado en el fragmento accesorio. ¿Cuál es la actitud más adecuada?",
    options: [
      "Mantener el tratamiento conservador de forma indefinida",
      "Realizar una patelectomía total",
      "Plantear la escisión quirúrgica del fragmento",
      "Prolongar la inmovilización con yeso varias semanas más",
    ],
    correct: 2,
    explanation:
      "El tratamiento quirúrgico de la rótula bipartita mediante escisión del fragmento se reserva a aquellos casos que persisten sintomáticos tras al menos 6 meses de tratamiento conservador correcto.",
  },
  {
    id: 667,
    block: "rodilla",
    code: "Luxación aguda de rótula, primer episodio",
    image: null,
    prompt:
      "Paciente joven con primer episodio de luxación aguda de rótula, ya reducida a su llegada a urgencias, sin fractura osteocondral asociada ni factores de riesgo anatómicos relevantes. ¿Cuál es el tratamiento más habitual?",
    options: [
      "Reconstrucción quirúrgica del ligamento femoropatelar medial",
      "Inmovilización en extensión seguida de movilización progresiva",
      "Trocleoplastia asociada a transposición de la tuberosidad tibial",
      "Movilización libre inmediata sin ningún tipo de inmovilización",
    ],
    correct: 1,
    explanation:
      "En el primer episodio de luxación de rótula, sin criterios quirúrgicos, el tratamiento habitual sigue siendo conservador, con inmovilización en extensión durante unas 3 semanas y posterior movilización progresiva.",
  },
  {
    id: 668,
    block: "rodilla",
    code: "Factores de riesgo de rotura del cuádriceps",
    image: null,
    prompt:
      "¿Cuál de los siguientes factores se asocia con mayor frecuencia a la rotura del músculo cuádriceps por encima de la rótula?",
    options: [
      "Edad menor de 30 años sin comorbilidades",
      "Práctica habitual de deportes de salto",
      "Insuficiencia renal crónica",
      "Antecedente de tendinosis rotuliana aislada",
    ],
    correct: 2,
    explanation:
      "La rotura del cuádriceps es más frecuente en pacientes mayores de 40 años con factores de riesgo médicos como diabetes, gota, insuficiencia renal, hiperparatiroidismo o uso crónico de corticoides.",
  },
  {
    id: 669,
    block: "rodilla",
    code: "Clínica del dolor femoropatelar sin inestabilidad",
    image: null,
    prompt:
      "¿Cuál de los siguientes rasgos NO es característico del dolor femoropatelar sin inestabilidad?",
    options: [
      "Dolor sordo y profundo",
      "Empeoramiento al subir o bajar escaleras",
      "Curso insidioso con periodos de mejoría y empeoramiento",
      "Aparición brusca coincidiendo con un traumatismo claro",
    ],
    correct: 3,
    explanation:
      "El dolor femoropatelar suele tener un inicio gradual o insidioso, sin un antecedente traumático claro identificable en la mayoría de los casos, a diferencia de lo descrito en esta opción.",
  },
  {
    id: 670,
    block: "rodilla",
    code: "Prevención de recidivas en Osgood-Schlatter",
    image: null,
    prompt:
      "Adolescente de 13 años con enfermedad de Osgood-Schlatter que ha mejorado tras un periodo de reposo relativo. ¿Qué medida es más útil para evitar que el dolor reaparezca al retomar el deporte?",
    options: [
      "Inmovilización con yeso antes de cada entrenamiento",
      "Estiramientos de cuádriceps previos al deporte y adaptación del entrenamiento",
      "Evitar de forma prolongada cualquier actividad física",
      "Infiltración de corticoides en la tuberosidad tibial",
    ],
    correct: 1,
    explanation:
      "Para prevenir las recidivas de la enfermedad de Osgood-Schlatter lo más importante es realizar estiramientos de cuádriceps antes del deporte y modificar los hábitos de entrenamiento.",
  },
  {
    id: 671,
    block: "rodilla",
    code: "Inserción del ligamento femoropatelar medial",
    image: null,
    prompt:
      "El ligamento femoropatelar medial se origina en el borde medial de la rótula y se inserta en:",
    options: [
      "El epicóndilo lateral del fémur",
      "La meseta tibial interna",
      "El ligamento colateral medial de la rodilla",
      "El epicóndilo medial del fémur",
    ],
    correct: 3,
    explanation:
      "El ligamento femoropatelar medial se inserta en el epicóndilo medial femoral, unos 1,9 mm anterior y 3,9 mm distal al tubérculo del aductor.",
  },
  {
    id: 672,
    block: "rodilla",
    code: "Signo de aprehensión dinámica",
    image: null,
    prompt:
      "¿Qué característica diferencia a la aprehensión patelar dinámica del clásico signo de la aprehensión (Smillie)?",
    options: [
      "Se explora con la rodilla en extensión completa fija",
      "Presenta mayor sensibilidad y especificidad que el signo de Smillie",
      "Solo puede realizarse en pacientes con luxación crónica",
      "No requiere lateralizar ni medializar la rótula",
    ],
    correct: 1,
    explanation:
      "La aprehensión patelar dinámica presenta una sensibilidad del 100% y una especificidad del 88%, muy superiores a la sensibilidad del 39% descrita para el signo de Smillie.",
  },
  {
    id: 673,
    block: "rodilla",
    code: "Reconstrucción del LFPM en luxación recidivante",
    image: null,
    prompt:
      "Paciente con tercer episodio de luxación de rótula, sin displasia troclear grave ni rótula alta. ¿Cuál es la técnica quirúrgica de elección actualmente para la inestabilidad rotuliana en tejidos blandos?",
    options: [
      "Liberación aislada del retináculo lateral",
      "Reconstrucción del ligamento femoropatelar medial con injerto tendinoso",
      "Trocleoplastia según la técnica de Dejour",
      "Realineación proximal según la técnica de Insall",
    ],
    correct: 1,
    explanation:
      "La reconstrucción del ligamento femoropatelar medial con injerto tendinoso es actualmente el procedimiento de elección en tejidos blandos, con una tasa de reluxación baja, en torno al 1,2%.",
  },
  {
    id: 674,
    block: "rodilla",
    code: "Indicación de trocleoplastia",
    image: null,
    prompt:
      "¿En qué situación estaría más justificado añadir una trocleoplastia a la reconstrucción del ligamento femoropatelar medial?",
    options: [
      "En el primer episodio de luxación rotuliana, de forma sistemática",
      "En pacientes con dolor femoropatelar sin inestabilidad",
      "En displasias trocleares severas con espolón supratroclear muy prominente y signo de la J marcado",
      "Como alternativa sistemática a la reconstrucción del LFPM",
    ],
    correct: 2,
    explanation:
      "La trocleoplastia se reserva a displasias trocleares graves, orientándose su indicación por hallazgos como un espolón supratroclear muy prominente, un signo de la J marcado o luxación con más de 20-30º de flexión.",
  },
  {
    id: 675,
    block: "rodilla",
    code: "Transposición de la tuberosidad anterior de la tibia",
    image: null,
    prompt:
      "Paciente con inestabilidad rotuliana recidivante, distancia ST-TAT de 25 mm y antecedente de meniscectomía medial. ¿Qué consideración es correcta respecto a la medialización de la tuberosidad tibial (Elmslie-Trillat)?",
    options: [
      "Está especialmente indicada por el antecedente de meniscectomía medial",
      "No guarda ninguna relación con el valor de la distancia ST-TAT medida",
      "Aumenta la presión en el compartimento medial, por lo que debe valorarse con cautela en este paciente",
      "Solo puede realizarse asociada a una osteotomía rotacional",
    ],
    correct: 2,
    explanation:
      "La medialización de la TAT está indicada cuando la distancia ST-TAT supera los 20 mm, pero aumenta la presión en el compartimento medial de la rodilla, por lo que debe valorarse con precaución en pacientes con antecedente de meniscectomía medial o artrosis en ese compartimento.",
  },
  {
    id: 676,
    block: "rodilla",
    code: "Rotura de cuádriceps frente a rotura del tendón rotuliano",
    image: null,
    prompt:
      "Paciente con dolor y tumefacción tras una caída, incapacidad para elevar la pierna recta y un defecto palpable por encima de la rótula. En la radiografía lateral se observa una rótula descendida (baja). ¿Qué lesión es más probable?",
    options: [
      "Rotura del tendón rotuliano",
      "Rotura del cuádriceps",
      "Fractura de estrés de la rótula",
      "Luxación crónica de la rótula",
    ],
    correct: 1,
    explanation:
      "Una rótula baja en el contexto de incapacidad para la extensión activa y defecto palpable proximal a la rótula orienta a una rotura del cuádriceps, mientras que la rótula alta se asocia a rotura del tendón rotuliano.",
  },
  {
    id: 677,
    block: "rodilla",
    code: "Fibrosis cuadricipital",
    image: null,
    prompt:
      "En la fibrosis cuadricipital de la infancia, ¿con qué componente muscular se correlaciona principalmente la rigidez articular en extensión?",
    options: [
      "El vasto lateral",
      "El recto anterior",
      "El vasto intermedio",
      "El vasto medial oblicuo",
    ],
    correct: 2,
    explanation:
      "La rigidez articular en la fibrosis cuadricipital se correlaciona con la fibrosis del vasto intermedio, mientras que la luxación crónica de la rótula se relaciona con la fibrosis del vasto lateral.",
  },
  {
    id: 678,
    block: "rodilla",
    code: "Osteocondritis disecante de rótula",
    image: null,
    prompt:
      "Varón adolescente deportista con osteocondritis disecante de rótula, fragmento in situ, sin esclerosis del cráter ni signos de necrosis en la RM. ¿Cuál es el tratamiento más adecuado en primera instancia?",
    options: [
      "Extirpación inmediata del fragmento por vía artroscópica",
      "Fijación con tornillos de forma programada",
      "Realizar una patelectomía parcial",
      "Reposo y rehabilitación del cuádriceps con tratamiento conservador",
    ],
    correct: 3,
    explanation:
      "En pacientes con sintomatología leve, fragmento in situ y sin signos de necrosis ósea ni interrupción del cartílago en la RM, el tratamiento inicial es conservador, con reposo y rehabilitación del cuádriceps.",
  },
  {
    id: 679,
    block: "rodilla",
    code: "Artrosis femoropatelar aislada",
    image: null,
    prompt:
      "¿En qué localización asienta con más frecuencia la artrosis femoropatelar aislada?",
    options: [
      "La carilla externa de la rótula, afectando también a la tróclea femoral",
      "La carilla medial de la rótula",
      "El polo inferior de la rótula, sin afectar a la tróclea",
      "La superficie articular tibial",
    ],
    correct: 0,
    explanation:
      "La artrosis femoropatelar aislada se localiza preferentemente en la carilla externa de la rótula y suele afectar también a la tróclea femoral.",
  },
  {
    id: 680,
    block: "rodilla",
    code: "Plica sinovial sintomática",
    image: null,
    prompt:
      "De las plicas sinoviales descritas en la rodilla (suprarrotuliana, media e infrarrotuliana), ¿cuál produce síntomas con mayor frecuencia?",
    options: [
      "La plica mediopatelar",
      "La plica suprarrotuliana",
      "La plica infrarrotuliana",
      "Las tres producen síntomas con igual frecuencia",
    ],
    correct: 0,
    explanation:
      "La plica mediopatelar es la que produce síntomas con más frecuencia, pudiendo palparse como un cordón engrosado y doloroso medial a la rótula.",
  },
  {
    id: 681,
    block: "rodilla",
    code: "Clasificación de Blazina",
    image: null,
    prompt:
      "Deportista con dolor en el tendón rotuliano que aparece solo tras finalizar el entrenamiento, sin limitar la actividad diaria. Según la clasificación de Blazina, ¿en qué grado se encuentra?",
    options: [
      "Grado 2",
      "Grado 3",
      "No puede clasificarse sin realizar una RM",
      "Grado 1",
    ],
    correct: 3,
    explanation:
      "En la clasificación de Blazina, el grado 1 corresponde al dolor que aparece después de la actividad, el grado 2 al dolor durante y después de la actividad, y el grado 3 al dolor presente en las actividades de la vida diaria.",
  },
  {
    id: 682,
    block: "rodilla",
    code: "Bursitis peripatelar",
    image: null,
    prompt:
      "¿Cuál de las bolsas sinoviales periarticulares de la rodilla se afecta con mayor frecuencia en pacientes que pasan mucho tiempo arrodillados?",
    options: [
      "La bolsa prepatelar",
      "La bolsa de la pata de ganso",
      "La bolsa infrarrotuliana profunda",
      "La bolsa suprapatelar",
    ],
    correct: 0,
    explanation:
      "La bursitis prepatelar es la más frecuente en pacientes que permanecen mucho tiempo de rodillas, con dolor localizado sobre la cara anterior de la rótula.",
  },
  {
    id: 683,
    block: "rodilla",
    code: "Síndrome de dolor regional complejo tipo I",
    image: null,
    prompt:
      "Paciente con dolor difuso e intenso en la rodilla tras una cirugía, rigidez, hinchazón y cambios de coloración cutánea. En la radiografía se observa osteoporosis moteada. ¿Qué entidad es más probable?",
    options: [
      "Síndrome de dolor regional complejo tipo I",
      "Osteocondritis disecante",
      "Artrosis femoropatelar aislada",
      "Tendinosis cuadricipital",
    ],
    correct: 0,
    explanation:
      "La osteoporosis moteada en la radiografía, junto con dolor difuso intenso, rigidez, hinchazón y cambios de coloración cutánea tras un traumatismo o cirugía, es un hallazgo característico del síndrome de dolor regional complejo tipo I.",
  },
  {
    id: 684,
    block: "rodilla",
    code: "Rigidez postraumática de rodilla",
    image: null,
    prompt:
      "Paciente con importante limitación de la flexión de rodilla tras una fractura compleja de fémur distal, secundaria a fibrosis y adherencias del cuádriceps al foco de fractura. ¿Cuál es el tratamiento indicado?",
    options: [
      "Manipulación aislada bajo anestesia, sin cirugía",
      "Infiltraciones repetidas de corticoides intraarticulares",
      "Realizar una patelectomía total de entrada",
      "Desinserción subperióstica progresiva del cuádriceps mediante técnica de Judet o Thompson",
    ],
    correct: 3,
    explanation:
      "El tratamiento de la rigidez postraumática por adherencias del cuádriceps es quirúrgico, mediante desinserción subperióstica progresiva del cuádriceps (técnica de Judet o Thompson) seguida de movilización continua pasiva.",
  },
  {
    id: 685,
    block: "rodilla",
    code: "Selección de injerto para la reconstrucción del LFPM",
    image: null,
    prompt:
      "A la hora de elegir el injerto para la reconstrucción del ligamento femoropatelar medial, ¿qué característica presenta habitualmente el autoinjerto de semitendinoso o recto interno respecto al LFPM nativo?",
    options: [
      "Mayor resistencia mecánica",
      "Menor resistencia mecánica",
      "Una resistencia mecánica prácticamente idéntica",
      "No se emplea como injerto en esta reconstrucción",
    ],
    correct: 0,
    explanation:
      "El autoinjerto de semitendinoso o recto interno, habitualmente utilizado en la reconstrucción del LFPM, presenta mayor resistencia mecánica que el ligamento femoropatelar medial nativo.",
  },
  {
    id: 686,
    block: "rodilla",
    code: "Epidemiología de las fracturas de meseta tibial",
    image: null,
    prompt:
      "¿Qué grupo de edad concentra actualmente la mayoría de las fracturas de meseta tibial?",
    options: [
      "Pacientes menores de 20 años",
      "Pacientes de 40 a 60 años",
      "Pacientes entre 20 y 30 años",
      "Pacientes mayores de 80 años",
    ],
    correct: 1,
    explanation:
      "Aunque clásicamente predominaban en jóvenes por traumatismos de alta energía o en ancianos por baja energía, actualmente la mayoría de las fracturas de meseta tibial ocurren entre los 40 y los 60 años.",
  },
  {
    id: 687,
    block: "rodilla",
    code: "Anatomía de la meseta tibial",
    image: null,
    prompt:
      "¿Cuál de las tres prominencias óseas distales a la meseta tibial sirve de inserción a la banda iliotibial?",
    options: [
      "La tuberosidad anterior de la tibia",
      "La pata de ganso",
      "La eminencia intercondílea",
      "El tubérculo de Gerdy",
    ],
    correct: 3,
    explanation:
      "El tubérculo de Gerdy, de localización lateral, permite la inserción de la banda iliotibial, mientras que la tuberosidad anterior recibe el tendón rotuliano y la pata de ganso los isquiotibiales mediales.",
  },
  {
    id: 688,
    block: "rodilla",
    code: "Mecanismo de fractura según edad",
    image: null,
    prompt:
      "Paciente joven, sin osteoporosis, con fractura de meseta tibial tras un accidente de tráfico. ¿Qué patrón de fractura es más esperable en comparación con un paciente anciano osteopénico?",
    options: [
      "Fractura por hundimiento puro, con menor riesgo ligamentoso",
      "Fractura por separación, con mayor riesgo de lesión ligamentosa asociada",
      "Fractura conminuta sin ningún componente de separación",
      "Fractura extraarticular aislada del peroné",
    ],
    correct: 1,
    explanation:
      "En los pacientes jóvenes, el hueso subcondral más resistente favorece las fracturas por separación y se asocia con mayor frecuencia a roturas ligamentosas, mientras que en ancianos predominan los hundimientos con menor afectación ligamentosa.",
  },
  {
    id: 689,
    block: "rodilla",
    code: "Lesiones meniscales asociadas",
    image: null,
    prompt:
      "En una fractura de meseta tibial tipo II de Schatzker, ¿qué menisco se lesiona con mayor frecuencia?",
    options: [
      "El menisco medial",
      "Ambos meniscos por igual",
      "El menisco lateral",
      "Ninguno, esta variedad no se asocia a lesión meniscal",
    ],
    correct: 2,
    explanation:
      "En las fracturas tipo II de Schatzker es más frecuente la lesión del menisco lateral, mientras que en las fracturas tipo IV predomina la afectación del menisco medial.",
  },
  {
    id: 690,
    block: "rodilla",
    code: "Fractura de Segond",
    image: null,
    prompt:
      "Al revisar la radiografía de un paciente con traumatismo de rodilla se identifica una fractura marginal anterior del platillo tibial lateral (fractura de Segond). ¿Qué lesión asociada se debe buscar de manera activa?",
    options: [
      "Lesión del ligamento cruzado posterior",
      "Fractura de la cabeza del peroné",
      "Rotura del tendón rotuliano",
      "Lesión del ligamento cruzado anterior",
    ],
    correct: 3,
    explanation:
      "La fractura de Segond se relaciona clásicamente con la lesión del ligamento cruzado anterior, por lo que su hallazgo obliga a descartar esta lesión asociada.",
  },
  {
    id: 691,
    block: "rodilla",
    code: "Evaluación vascular en fracturas de alta energía",
    image: null,
    prompt:
      "Paciente con fractura de meseta tibial de alta energía, pulsos distales palpables y sin signos claros de lesión arterial. ¿Cuál es el siguiente paso más adecuado?",
    options: [
      "Calcular el índice de presión tobillo-brazo y solicitar prueba de imagen si es menor de 0,9",
      "Descartar lesión vascular sin más pruebas por la presencia de pulsos",
      "Realizar arteriografía urgente de entrada en todos los casos",
      "Diferir cualquier evaluación vascular hasta pasadas 48 horas",
    ],
    correct: 0,
    explanation:
      "Cuando no hay signos claros de lesión arterial, se recomienda calcular el índice de presión tobillo-brazo; un valor inferior a 0,9 obliga a completar el estudio con una prueba de imagen.",
  },
  {
    id: 692,
    block: "rodilla",
    code: "Clasificación de Schatzker",
    image: null,
    prompt:
      "Fractura de meseta lateral con hundimiento y separación asociados, en un paciente de 68 años con hueso osteoporótico. ¿A qué tipo de la clasificación de Schatzker corresponde?",
    options: [
      "Tipo I",
      "Tipo III",
      "Tipo IV",
      "Tipo II",
    ],
    correct: 3,
    explanation:
      "El tipo II de Schatzker combina hundimiento y separación de la meseta lateral, siendo más frecuente en pacientes mayores o con osteoporosis, y representa el patrón más común de esta clasificación.",
  },
  {
    id: 693,
    block: "rodilla",
    code: "Tratamiento conservador de las fracturas de meseta tibial",
    image: null,
    prompt:
      "¿Qué combinación de criterios permite plantear tratamiento conservador en una fractura de meseta tibial?",
    options: [
      "Escalón articular menor de 2-3 mm y estabilidad menor de 10º en el plano coronal",
      "Escalón articular de 8 mm con rodilla estable",
      "Inestabilidad de 15º en varo-valgo con escalón mínimo",
      "Fractura bicondílea con síndrome compartimental asociado",
    ],
    correct: 0,
    explanation:
      "El tratamiento conservador se plantea en fracturas con menos de 2-3 mm de separación o escalón articular que además sean estables, con menos de 10º de inestabilidad en el plano coronal con la rodilla en extensión.",
  },
  {
    id: 694,
    block: "rodilla",
    code: "Determinantes del resultado en fracturas de meseta tibial",
    image: null,
    prompt:
      "Según el orden de importancia descrito para el tratamiento de las fracturas de meseta tibial, ¿cuál es el factor más determinante para el resultado funcional final?",
    options: [
      "La congruencia articular anatómica perfecta",
      "La alineación femorotibial y la corrección de la anchura articular",
      "El tratamiento de las lesiones meniscales asociadas",
      "El tipo de abordaje quirúrgico elegido",
    ],
    correct: 1,
    explanation:
      "Los principales determinantes del resultado son, por este orden, la alineación femorotibial junto con la corrección de la anchura de la superficie articular, seguidos del cuidado de las partes blandas y, en tercer lugar, las lesiones intraarticulares.",
  },
  {
    id: 695,
    block: "rodilla",
    code: "Abordaje quirúrgico según el patrón de fractura",
    image: null,
    prompt:
      "Paciente con fractura de meseta tibial tipo IV de Schatzker, con afectación de la meseta medial. ¿Qué abordaje es el más adecuado?",
    options: [
      "Abordaje anterolateral aislado",
      "Abordaje posterolateral con osteotomía de peroné",
      "Abordaje anteromedial",
      "Abordaje en línea media con osteotomía de la tuberosidad tibial",
    ],
    correct: 2,
    explanation:
      "El abordaje anteromedial se utiliza específicamente en las fracturas tipo IV de Schatzker o como parte de un doble abordaje, permitiendo reducir la fractura y colocar los implantes bajo la pata de ganso.",
  },
  {
    id: 696,
    block: "rodilla",
    code: "Fragmentos posteromediales",
    image: null,
    prompt:
      "En una fractura bicondílea con un fragmento posteromedial que compromete la corteza posteromedial, ¿qué abordaje permite mejor exposición de esta zona?",
    options: [
      "El abordaje anterolateral estándar",
      "El abordaje anteromedial aislado",
      "El abordaje en línea media",
      "El abordaje posteromedial",
    ],
    correct: 3,
    explanation:
      "El abordaje posteromedial está indicado en fracturas mediales extendidas a la cara posterior o que requieren un contrafuerte en la corteza posteromedial, mediante disección entre la cabeza medial del gastrocnemio y el semitendinoso.",
  },
  {
    id: 697,
    block: "rodilla",
    code: "Fijación externa temporal",
    image: null,
    prompt:
      "Paciente politraumatizado con fractura de meseta tibial de alta energía y edema importante de partes blandas. ¿Cuál es la conducta más adecuada antes de la fijación definitiva?",
    options: [
      "Colocar un fijador externo temporal y diferir la cirugía definitiva hasta que mejoren las partes blandas",
      "Realizar la reducción abierta y fijación interna de manera inmediata",
      "Aplicar solo un yeso circular sin ningún otro tipo de fijación",
      "Indicar tratamiento conservador de entrada por el riesgo quirúrgico",
    ],
    correct: 0,
    explanation:
      "Cuando existe mucho edema de partes blandas, es preferible diferir la cirugía definitiva y usar fijadores externos temporales con abordajes mínimamente invasivos, lo que reduce complicaciones y mejora los resultados.",
  },
  {
    id: 698,
    block: "rodilla",
    code: "Momento de la cirugía",
    image: null,
    prompt:
      "¿Qué signo clínico indica que las partes blandas están en condiciones adecuadas para proceder a la fijación definitiva de una fractura de meseta tibial?",
    options: [
      "La persistencia de edema importante sin cambios",
      "La presencia de ampollas hemorrágicas activas",
      "La aparición de arrugas en la piel y la resolución de las ampollas",
      "La ausencia de dolor a la palpación, independientemente del estado cutáneo",
    ],
    correct: 2,
    explanation:
      "La cirugía definitiva se plantea cuando aparecen arrugas en la piel (el llamado signo de la arruga) y se han resuelto las ampollas, lo que indica que las partes blandas se encuentran en buen estado.",
  },
  {
    id: 699,
    block: "rodilla",
    code: "Complicaciones: síndrome compartimental",
    image: null,
    prompt:
      "¿En qué proporción aproximada de fracturas de meseta tibial de alta energía puede aparecer un síndrome compartimental?",
    options: [
      "Hasta en el 15% de los casos",
      "En menos del 1% de los casos",
      "En aproximadamente el 50% de los casos",
      "En prácticamente la totalidad de los casos",
    ],
    correct: 0,
    explanation:
      "El síndrome compartimental puede ocurrir hasta en el 15% de las fracturas de meseta tibial por alta energía, por lo que estas fracturas deben considerarse de riesgo mientras no se demuestre lo contrario.",
  },
  {
    id: 700,
    block: "rodilla",
    code: "Complicaciones: consolidación viciosa",
    image: null,
    prompt:
      "¿En qué tipo de fractura de meseta tibial, según Schatzker, es más frecuente la consolidación viciosa en la unión metafisodiafisaria?",
    options: [
      "Tipo I",
      "Tipo III",
      "Tipo VI",
      "Tipo V",
    ],
    correct: 2,
    explanation:
      "La consolidación viciosa en la unión metafisodiafisaria es más común en las fracturas tipo VI de Schatzker, relacionándose con la conminución, la fijación inestable y la infección.",
  },
  {
    id: 701,
    block: "rodilla",
    code: "Fracturas de la espina tibial en adultos",
    image: null,
    prompt:
      "Paciente adulto con fractura de espina tibial tratada de forma conservadora. ¿Qué posición de la rodilla se debe evitar al colocar la inmovilización?",
    options: [
      "La flexión de 15-20º, por ser una posición funcional adecuada",
      "La hiperextensión, porque tensa más el ligamento cruzado anterior y desplaza los fragmentos",
      "La rotación externa moderada de la extremidad",
      "La posición neutra en extensión completa sin flexión",
    ],
    correct: 1,
    explanation:
      "En el tratamiento conservador de las fracturas de espina tibial no debe colocarse el yeso en hiperextensión, ya que tensa el ligamento cruzado anterior y favorece el desplazamiento de los fragmentos.",
  },
  {
    id: 702,
    block: "rodilla",
    code: "Indicación quirúrgica en fractura de espina tibial",
    image: null,
    prompt:
      "¿A partir de qué grado de desplazamiento se considera indicado el tratamiento quirúrgico en una fractura de espina tibial en el adulto?",
    options: [
      "Desplazamiento mayor de 10 mm",
      "Cualquier grado de desplazamiento visible en la radiografía",
      "Solo cuando existe conminución completa del fragmento",
      "Desplazamiento mayor de 2 mm",
    ],
    correct: 3,
    explanation:
      "El tratamiento quirúrgico está indicado cuando el desplazamiento supera los 2 mm, lo que corresponde a los tipos III y IV de la clasificación de Meyers-McKeever, dada la elevada incompetencia funcional del ligamento cruzado anterior.",
  },
  {
    id: 703,
    block: "rodilla",
    code: "Luxación de rodilla más frecuente",
    image: null,
    prompt:
      "Paciente con hiperextensión forzada de la rodilla tras una caída, con deformidad evidente. ¿Qué tipo de luxación de rodilla es más probable y qué estructura tiene mayor riesgo de lesión asociada?",
    options: [
      "Luxación posterior, con mayor riesgo de lesión del nervio femoral",
      "Luxación lateral, con mayor riesgo de lesión del nervio tibial",
      "Luxación rotacional, sin riesgo neurovascular relevante",
      "Luxación anterior, con mayor riesgo de lesión del nervio peroneo común",
    ],
    correct: 3,
    explanation:
      "La luxación anterior es la más frecuente y se produce por hiperextensión forzada; es también la que presenta mayor incidencia de lesión del nervio ciático poplíteo externo (peroneo común).",
  },
  {
    id: 704,
    block: "rodilla",
    code: "Luxación posterior de rodilla",
    image: null,
    prompt:
      "¿Qué tipo de luxación de rodilla presenta mayor incidencia de rotura completa de la arteria poplítea?",
    options: [
      "La luxación anterior",
      "La luxación posterior",
      "La luxación medial",
      "La luxación rotacional",
    ],
    correct: 1,
    explanation:
      "Aunque la luxación anterior es la más frecuente, la luxación posterior es la que presenta mayor incidencia de rotura completa de la arteria poplítea, al producirse por una fuerza directa sobre la tibia proximal con la rodilla flexionada.",
  },
  {
    id: 705,
    block: "rodilla",
    code: "Reducción de la luxación de rodilla",
    image: null,
    prompt:
      "Paciente con deformidad evidente de la rodilla tras un traumatismo de alta energía, sospechosa de luxación. ¿Cuál debe ser la actitud inicial más adecuada?",
    options: [
      "Esperar a completar el estudio radiográfico completo antes de reducir",
      "Inmovilizar en la posición encontrada y trasladar sin manipular",
      "Realizar la reducción cerrada de forma inmediata, sin esperar a la radiografía",
      "Solicitar una resonancia magnética antes de cualquier maniobra",
    ],
    correct: 2,
    explanation:
      "En la luxación de rodilla se recomienda la reducción cerrada inmediata, incluso antes de disponer de radiografías, valorando en todo momento el estado vascular y nervioso.",
  },
  {
    id: 706,
    block: "rodilla",
    code: "Signo del hoyuelo",
    image: null,
    prompt:
      "Durante el intento de reducción cerrada de una luxación posterolateral de rodilla, se observa una depresión cutánea en la cara medial de la rodilla que impide la reducción. ¿Qué significa este hallazgo?",
    options: [
      "Es un hallazgo sin relevancia clínica que no modifica el manejo",
      "Indica irreductibilidad por interposición de partes blandas y posible compromiso neurovascular",
      "Confirma que la reducción cerrada se ha completado con éxito",
      "Es característico de las luxaciones anteriores no complicadas",
    ],
    correct: 1,
    explanation:
      "El signo del hoyuelo, típico de la luxación posterolateral irreductible, indica el paso del cóndilo medial a través de la cápsula y obliga a una reducción abierta urgente por el riesgo de compromiso neurovascular y necrosis cutánea.",
  },
  {
    id: 707,
    block: "rodilla",
    code: "Pulsos ausentes tras la reducción de una luxación de rodilla",
    image: null,
    prompt:
      "Tras reducir una luxación de rodilla, el paciente presenta pulsos distales ausentes. ¿Cuál es la conducta más adecuada?",
    options: [
      "Derivar de forma urgente a cirugía vascular para valorar exploración quirúrgica",
      "Solicitar una arteriografía programada en las próximas 24 horas",
      "Mantener observación con reevaluación de pulsos cada 6 horas",
      "Inmovilizar y citar en consulta de revascularización en una semana",
    ],
    correct: 0,
    explanation:
      "Cuando los pulsos distales están ausentes o son claramente asimétricos tras la reducción, se debe sospechar compromiso vascular grave y derivar de inmediato a cirugía vascular para exploración quirúrgica, sin demorar el tratamiento con una arteriografía.",
  },
  {
    id: 708,
    block: "rodilla",
    code: "Complicaciones de la luxación de rodilla",
    image: null,
    prompt:
      "¿Cuál es la complicación más frecuente a largo plazo tras una luxación de rodilla?",
    options: [
      "La artrosis postraumática",
      "La osteonecrosis del cóndilo femoral",
      "La trombosis venosa profunda",
      "La pseudoartrosis",
    ],
    correct: 0,
    explanation:
      "La artrosis postraumática es la complicación más frecuente tras una luxación de rodilla, apareciendo hasta en un 87% de los casos, seguida en frecuencia por la rigidez articular a corto plazo.",
  },
  {
    id: 709,
    block: "rodilla",
    code: "Fracturas metafisarias proximales de tibia en niños (fracturas de Cozen)",
    image: null,
    prompt:
      "Niño de 6 años con fractura metafisaria proximal de tibia de baja energía, tratada de forma conservadora. Varios meses después presenta una deformidad en valgo de la rodilla. ¿Cuál es la actitud más adecuada?",
    options: [
      "Observación, ya que la mayoría de estas deformidades mejoran de forma espontánea",
      "Osteotomía correctora inmediata sin periodo de observación",
      "Epifisiodesis urgente de la fisis proximal de la tibia",
      "Amputación del segmento afectado por mal pronóstico",
    ],
    correct: 0,
    explanation:
      "El genu valgo tras una fractura de Cozen suele deberse a un sobrecrecimiento medial de la tibia proximal y la mayoría de los casos mejoran espontáneamente, por lo que la actitud inicial recomendada es la observación.",
  },
  {
    id: 710,
    block: "rodilla",
    code: "Fracturas de la tuberosidad anterior de la tibia en niños",
    image: null,
    prompt:
      "Adolescente varón de 15 años, deportista, con antecedente de enfermedad de Osgood-Schlatter, que sufre una fuerza de desaceleración brusca durante un salto y presenta incapacidad para extender activamente la rodilla. ¿Qué lesión es más probable?",
    options: [
      "Rotura del ligamento cruzado posterior",
      "Fractura de la espina tibial tipo I",
      "Fractura de la tuberosidad anterior de la tibia",
      "Luxación lateral de rótula",
    ],
    correct: 2,
    explanation:
      "La enfermedad de Osgood-Schlatter previa es un factor predisponente reconocido para la fractura de la tuberosidad anterior de la tibia, que típicamente se produce por una fuerza de aceleración o desaceleración brusca sobre el mecanismo extensor.",
  },
  {
    id: 711,
    block: "rodilla",
    code: "Estabilizador primario de la traslación tibial anterior",
    image: null,
    prompt:
      "¿Qué estructura actúa como estabilizador primario de la traslación tibial anterior en la rodilla?",
    options: [
      "El ligamento cruzado posterior",
      "El ligamento cruzado anterior",
      "El ligamento colateral medial",
      "El complejo posterolateral",
    ],
    correct: 1,
    explanation:
      "El ligamento cruzado anterior es el estabilizador primario de la traslación tibial anterior, siendo responsable de aproximadamente el 85% de esta función, reforzado por el ligamento colateral medial y la cápsula posteromedial como estabilizadores secundarios.",
  },
  {
    id: 712,
    block: "rodilla",
    code: "Instauración rápida de hemartros",
    image: null,
    prompt:
      "Paciente que tras un traumatismo deportivo presenta una rodilla tumefacta en pocos minutos. ¿Qué sustancia es la responsable habitual de este llenado tan rápido?",
    options: [
      "Sangre, por una lesión ligamentosa grave o una lesión meniscal en zona vascularizada",
      "Líquido sinovial, propio de una lesión meniscal degenerativa",
      "Grasa, característica de una lesión femoropatelar crónica",
      "Pus, indicativo de una artritis séptica subaguda",
    ],
    correct: 0,
    explanation:
      "Cuando el derrame se instaura en menos de 24 horas, la única sustancia capaz de llenar la rodilla tan rápidamente es la sangre, lo que orienta a una lesión ligamentosa grave, luxación de rótula, lesión de la plica sinovial o una desinserción meniscal en zona vascularizada.",
  },
  {
    id: 713,
    block: "rodilla",
    code: "Prueba de estrés en valgo",
    image: null,
    prompt:
      "Al realizar la prueba de estrés en valgo con la rodilla en extensión completa, se observa apertura del compartimento medial. ¿Qué estructuras están afectadas?",
    options: [
      "Solo el ligamento colateral medial en su fascículo profundo",
      "El ligamento cruzado posterior de forma aislada",
      "El ligamento colateral medial y el ligamento cruzado anterior",
      "El complejo posterolateral de la rodilla",
    ],
    correct: 2,
    explanation:
      "Si la apertura en valgo ocurre con la rodilla en extensión completa, indica que están lesionados tanto el ligamento colateral medial como el ligamento cruzado anterior; si solo se abre a 30º de flexión, la lesión del LCM es aislada.",
  },
  {
    id: 714,
    block: "rodilla",
    code: "Signo de Finochietto",
    image: null,
    prompt:
      "Durante la exploración del cajón anterior se aprecia una traslación anterior importante con un resalte característico (signo de Finochietto). ¿A qué lesión suele corresponder este hallazgo?",
    options: [
      "Rotura aislada del ligamento colateral lateral",
      "Lesión del complejo posterolateral sin otras lesiones asociadas",
      "Fractura de la espina tibial no desplazada",
      "Rotura en asa de cubo del menisco interno o rotura de la rampa meniscal interna",
    ],
    correct: 3,
    explanation:
      "Un resalte durante el cajón anterior con traslación tibial importante suele deberse a una rotura en asa de cubo del menisco interno o a una rotura de la rampa meniscal interna, que actúan como un obstáculo mecánico adicional.",
  },
  {
    id: 715,
    block: "rodilla",
    code: "Test de Lachman frente al cajón anterior",
    image: null,
    prompt:
      "¿Por qué se considera el test de Lachman más fiable que el cajón anterior clásico para valorar una rotura aguda del ligamento cruzado anterior?",
    options: [
      "Porque se realiza con la rodilla en flexión de 90º, igual que el cajón anterior",
      "Porque requiere menos experiencia por parte del explorador",
      "Porque no depende de la contractura antiálgica de la musculatura flexora",
      "Porque valora sobre todo la estabilidad rotacional de la rodilla",
    ],
    correct: 2,
    explanation:
      "El test de Lachman, realizado a 20-30º de flexión, es más sensible y específico que el cajón anterior en la lesión aguda porque no se ve condicionado por la contractura antiálgica de la musculatura isquiotibial.",
  },
  {
    id: 716,
    block: "rodilla",
    code: "Prueba de resalte lateral (Pivot Shift)",
    image: null,
    prompt:
      "¿En qué situación clínica resulta especialmente útil la prueba de Pivot Shift para el diagnóstico de la rotura del ligamento cruzado anterior?",
    options: [
      "En la lesión crónica, donde se considera una exploración patognomónica",
      "En la fase aguda inmediatamente tras el traumatismo, siendo poco útil en la fase crónica",
      "En pacientes con fracturas asociadas de meseta tibial",
      "En lesiones aisladas del menisco sin afectación ligamentosa",
    ],
    correct: 0,
    explanation:
      "El Pivot Shift es patognomónico de la lesión del ligamento cruzado anterior y resulta especialmente útil en la valoración de la lesión crónica, donde reproduce la inestabilidad rotacional característica.",
  },
  {
    id: 717,
    block: "rodilla",
    code: "Fractura de Segond",
    image: null,
    prompt:
      "En la radiografía de un paciente con traumatismo de rodilla se observa una fractura de Segond. ¿Qué lesión ligamentosa se considera patognomónica de este hallazgo?",
    options: [
      "La rotura del ligamento cruzado posterior",
      "La rotura del ligamento cruzado anterior",
      "La rotura aislada del ligamento colateral medial",
      "La rotura del tendón poplíteo",
    ],
    correct: 1,
    explanation:
      "La fractura de Segond, una avulsión ósea de la cápsula articular anteroexterna de la meseta tibial en la inserción del ligamento anterolateral, se considera patognomónica de rotura del ligamento cruzado anterior.",
  },
  {
    id: 718,
    block: "rodilla",
    code: "Rotura del LCA según la edad",
    image: null,
    prompt:
      "¿Cuál es el patrón de rotura del ligamento cruzado anterior más frecuente en un paciente esqueléticamente inmaduro?",
    options: [
      "La desinserción femoral intrasustancia",
      "La rotura en el tercio medio del ligamento",
      "La avulsión ósea de la espina tibial",
      "La avulsión del cóndilo femoral lateral",
    ],
    correct: 2,
    explanation:
      "En los niños, los ligamentos son más resistentes que las placas fisarias, por lo que la lesión típica es la avulsión ósea de la espina tibial, mientras que en adultos predomina la desinserción femoral o la rotura intrasustancia.",
  },
  {
    id: 719,
    block: "rodilla",
    code: "Rotura parcial del LCA",
    image: null,
    prompt:
      "¿Qué hallazgo en la exploración física permite descartar una rotura parcial del ligamento cruzado anterior a favor de una rotura completa?",
    options: [
      "Un test de Lachman con tope firme",
      "Una prueba de estrés en varo negativa",
      "Un Pivot Shift positivo",
      "Un cajón posterior negativo",
    ],
    correct: 2,
    explanation:
      "La presencia de un Pivot Shift positivo excluye el diagnóstico de rotura parcial del LCA, ya que este hallazgo indica una inestabilidad rotacional propia de la rotura completa del ligamento.",
  },
  {
    id: 720,
    block: "rodilla",
    code: "Momento de la reconstrucción quirúrgica del LCA",
    image: null,
    prompt:
      "Paciente joven con rotura aguda del LCA que ya ha recuperado el rango de movimiento completo y el control muscular del cuádriceps. ¿Cuál es la actitud más adecuada respecto al momento de la cirugía?",
    options: [
      "Plantear la reconstrucción, idealmente dentro de los primeros 5 meses tras la lesión",
      "Intervenir de inmediato, con inflamación activa de la rodilla todavía presente",
      "Esperar al menos 12 meses para reducir el riesgo de rigidez",
      "Realizar la cirugía solo si aparece inestabilidad en la vida diaria",
    ],
    correct: 0,
    explanation:
      "Una vez controlada la inflamación y recuperado el rango de movimiento, se recomienda realizar la reconstrucción del LCA preferiblemente dentro de los primeros 5 meses, ya que retrasarla más aumenta el riesgo de lesión meniscal y condral secundaria.",
  },
  {
    id: 721,
    block: "rodilla",
    code: "Selección del injerto en la reconstrucción del LCA",
    image: null,
    prompt:
      "En comparación con la plastia de isquiotibiales, ¿qué característica se asocia con mayor frecuencia al uso de la plastia hueso-tendón-hueso (HTH)?",
    options: [
      "Mayor morbilidad en la zona donante de los isquiotibiales",
      "Menor estabilidad objetiva medida con artrómetro",
      "Una incorporación biológica más lenta del injerto",
      "Mayor incidencia de dolor femoropatelar al arrodillarse",
    ],
    correct: 3,
    explanation:
      "La plastia hueso-tendón-hueso ofrece una incorporación más rápida y mayor estabilidad objetiva, pero se asocia con más frecuencia a dolor femoropatelar al arrodillarse y pérdida de extensión en comparación con la plastia de isquiotibiales.",
  },
  {
    id: 722,
    block: "rodilla",
    code: "Colocación de los túneles óseos en la reconstrucción del LCA",
    image: null,
    prompt:
      "¿Cuál es el factor técnico que con mayor frecuencia provoca el fallo de la plastia en la reconstrucción del ligamento cruzado anterior?",
    options: [
      "El tipo de injerto seleccionado, independientemente de su posición",
      "La ausencia de ortesis postoperatoria durante la rehabilitación",
      "El uso de suspensión cortical en lugar de tornillos interferenciales",
      "La colocación incorrecta de los túneles óseos, especialmente la verticalización del túnel femoral",
    ],
    correct: 3,
    explanation:
      "La causa técnica más frecuente de fallo de la plastia es la mala posición de los túneles óseos, sobre todo la verticalización del túnel femoral, que impide controlar adecuadamente la rotación interna de la tibia.",
  },
  {
    id: 723,
    block: "rodilla",
    code: "Ligamento anterolateral como refuerzo",
    image: null,
    prompt:
      "Paciente de 22 años, deportista de contacto, con Pivot Shift de alto grado, al que se le va a realizar una reconstrucción primaria del LCA. ¿Qué gesto adicional debe plantearse?",
    options: [
      "Una meniscectomía total profiláctica del menisco externo",
      "Una osteotomía valguizante de tibia asociada",
      "Una plastia con xenoinjerto porcino",
      "Un refuerzo extraarticular siguiendo la dirección del ligamento anterolateral",
    ],
    correct: 3,
    explanation:
      "En pacientes jóvenes con Pivot Shift de alto grado, hiperlaxitud o alta demanda deportiva, se recomienda añadir un refuerzo extraarticular anterolateral junto con la reconstrucción primaria del LCA, ya que reduce el riesgo de fallo de la plastia.",
  },
  {
    id: 724,
    block: "rodilla",
    code: "Lesión en cíclope",
    image: null,
    prompt:
      "Paciente que, tras la reconstrucción del LCA, presenta pérdida progresiva de la extensión de la rodilla. En la resonancia se observa tejido cicatricial anterior al túnel tibial. ¿Cómo se denomina esta complicación y cuál es su tratamiento?",
    options: [
      "Lesión en cíclope, que se trata con una nueva artroscopia para resecar la cicatriz",
      "Lesión de Pellegrini-Stieda, que se trata de forma conservadora con fisioterapia",
      "Signo de la muesca, que no requiere ningún tratamiento específico",
      "Fractura de Segond, que obliga a revisar la fijación de la plastia",
    ],
    correct: 0,
    explanation:
      "La pérdida de extensión por tejido cicatricial anterior al túnel tibial se conoce como lesión en cíclope, y su tratamiento habitual consiste en una nueva artroscopia para resecar dicha cicatriz.",
  },
  {
    id: 725,
    block: "rodilla",
    code: "Diagnóstico de las lesiones del LCP",
    image: null,
    prompt:
      "¿Qué característica clínica es propia de las lesiones aisladas del ligamento cruzado posterior?",
    options: [
      "Producen una inestabilidad grave desde el primer momento en la mayoría de casos",
      "Con frecuencia cursan con escasa clínica de inestabilidad y pasan desapercibidas",
      "Se diagnostican con facilidad mediante la simple inspección de la rodilla",
      "Cursan de forma característica con hemartros masivo de instauración inmediata",
    ],
    correct: 1,
    explanation:
      "La mayoría de las lesiones del LCP no se diagnostican, ya que cuando se afecta de forma aislada la clínica de inestabilidad puede ser muy escasa o incluso estar ausente.",
  },
  {
    id: 726,
    block: "rodilla",
    code: "Tratamiento conservador de las lesiones aisladas del LCP",
    image: null,
    prompt:
      "Paciente con lesión aislada del ligamento cruzado posterior y un desplazamiento en el cajón posterior de 8 mm. ¿Cuál es la actitud terapéutica más adecuada?",
    options: [
      "Reconstrucción quirúrgica urgente en las primeras 48 horas",
      "Meniscectomía total profiláctica asociada",
      "Tratamiento conservador con inmovilización inicial y fortalecimiento del cuádriceps",
      "Osteotomía valguizante de tibia de entrada",
    ],
    correct: 2,
    explanation:
      "En lesiones aisladas del LCP con menos de 10 mm de desplazamiento en el cajón posterior se recomienda tratamiento conservador, ya que este ligamento tiene mayor capacidad de cicatrización que el LCA, con inmovilización inicial y fortalecimiento progresivo del cuádriceps.",
  },
  {
    id: 727,
    block: "rodilla",
    code: "Lesión de Pellegrini-Stieda",
    image: null,
    prompt:
      "En la radiografía de un paciente con antecedente de esguince crónico en valgo de rodilla se observa una calcificación en la inserción femoral del ligamento colateral medial. ¿Cómo se denomina este hallazgo?",
    options: [
      "Lesión de Pellegrini-Stieda",
      "Signo de Segond",
      "Signo de la muesca",
      "Triada de O'Donoghue",
    ],
    correct: 0,
    explanation:
      "La lesión de Pellegrini-Stieda corresponde a una calcificación en la inserción femoral del ligamento colateral medial, hallazgo típico de las lesiones crónicas de este ligamento.",
  },
  {
    id: 728,
    block: "rodilla",
    code: "Tratamiento de las lesiones del LCM",
    image: null,
    prompt:
      "Paciente con lesión aislada del ligamento colateral medial grado II, sin otras lesiones asociadas. ¿Cuál es el tratamiento más adecuado?",
    options: [
      "Reparación quirúrgica directa en las primeras 48 horas",
      "Reconstrucción con plastia de isquiotibiales de entrada",
      "Inmovilización en yeso rígido durante 8 semanas sin movilidad",
      "Tratamiento conservador con ortesis articulada, carga parcial y fisioterapia progresiva",
    ],
    correct: 3,
    explanation:
      "El tratamiento de las lesiones del LCM grado I y II, y del grado III sin lesiones asociadas, es conservador, con ortesis articulada en los grados más graves, carga parcial inicial y fisioterapia con fortalecimiento progresivo.",
  },
  {
    id: 729,
    block: "rodilla",
    code: "Exploración del complejo posterolateral",
    image: null,
    prompt:
      "Al explorar a un paciente se objetiva un aumento de la rotación externa a 30º de flexión (dial test) que no aumenta a 90º. ¿Qué interpretación es correcta?",
    options: [
      "Lesión aislada del complejo posterolateral, con el ligamento cruzado posterior íntegro",
      "Lesión combinada del complejo posterolateral y del ligamento cruzado posterior",
      "Lesión aislada del ligamento cruzado anterior",
      "Ausencia de cualquier lesión ligamentosa relevante",
    ],
    correct: 0,
    explanation:
      "En el dial test, el aumento de la rotación externa a 30º sin aumentar a 90º indica una lesión aislada del complejo posterolateral, mientras que el aumento también a 90º de flexión sugiere lesión asociada del ligamento cruzado posterior.",
  },
  {
    id: 730,
    block: "rodilla",
    code: "Reparación del complejo posterolateral asociada al LCA",
    image: null,
    prompt:
      "Durante la reconstrucción del LCA se detecta una lesión no reparada del complejo posterolateral. ¿Qué consecuencia puede tener no tratarla en el mismo acto?",
    options: [
      "Ninguna repercusión sobre el resultado de la cirugía del LCA",
      "Una mejora en la estabilidad rotacional final de la rodilla",
      "Una reducción del riesgo de rigidez postoperatoria",
      "Un mayor riesgo de fallo de la ligamentoplastia del LCA",
    ],
    correct: 3,
    explanation:
      "Una causa frecuente de fallo en la ligamentoplastia del LCA es la presencia de una lesión del complejo posterolateral no diagnosticada ni tratada, por lo que es fundamental abordarla de forma conjunta cuando está rota.",
  },
  {
    id: 731,
    block: "rodilla",
    code: "Vascularización meniscal",
    image: null,
    prompt:
      "¿Por qué las roturas meniscales localizadas en el tercio interno del menisco tienen peor capacidad de cicatrización que las periféricas?",
    options: [
      "Porque el tercio interno recibe la mayor parte del aporte vascular de la arteria geniculada",
      "Porque el tercio interno es avascular y se nutre solo por difusión del líquido sinovial",
      "Porque el tercio interno está inervado y esto dificulta su curación",
      "Porque el tercio interno tiene mayor grosor de colágeno que el resto del menisco",
    ],
    correct: 1,
    explanation:
      "El tercio interno del menisco, denominado zona blanca, es avascular y se nutre por difusión del líquido sinovial, lo que explica su escaso poder de cicatrización en comparación con la periferia vascularizada.",
  },
  {
    id: 732,
    block: "rodilla",
    code: "Triada de O'Donoghue",
    image: null,
    prompt:
      "En una lesión aguda del ligamento cruzado anterior se objetiva también rotura del menisco interno y del ligamento lateral interno. ¿Cómo se denomina esta asociación clásica de lesiones?",
    options: [
      "Triada de Fairbank",
      "Signo del hoyuelo",
      "Triada de O'Donoghue",
      "Clasificación de Schenck",
    ],
    correct: 2,
    explanation:
      "La asociación de rotura del LCA con lesión del menisco interno y del ligamento lateral interno se conoce clásicamente como la triada de O'Donoghue, presente en aproximadamente un 25% de las lesiones agudas del LCA.",
  },
  {
    id: 733,
    block: "rodilla",
    code: "Menisco discoideo",
    image: null,
    prompt:
      "Niño de 8 años con chasquidos sordos indoloros en la rodilla al caminar, sin antecedente traumático claro. ¿Qué entidad es más probable y en qué menisco se localiza con más frecuencia?",
    options: [
      "Rotura degenerativa de menisco, casi exclusiva del menisco interno",
      "Menisco discoideo, casi exclusivo del menisco externo",
      "Quiste meniscal, más frecuente en el menisco interno",
      "Lesión de la rampa meniscal interna",
    ],
    correct: 1,
    explanation:
      "El menisco discoideo es una variación congénita, casi exclusiva del menisco externo, que suele manifestarse en la infancia con chasquidos sordos y resalte, habitualmente sin dolor asociado.",
  },
  {
    id: 734,
    block: "rodilla",
    code: "Tratamiento de las roturas meniscales degenerativas",
    image: null,
    prompt:
      "Paciente de 55 años con dolor de rodilla y hallazgo en la resonancia de una rotura degenerativa del menisco interno, sin bloqueo ni síntomas mecánicos claros. ¿Cuál es la actitud inicial más adecuada?",
    options: [
      "Meniscectomía parcial artroscópica urgente en las primeras 48 horas",
      "Tratamiento conservador durante al menos 3 meses, con analgesia y fisioterapia",
      "Reparación meniscal mediante técnica dentro-fuera de entrada",
      "Trasplante meniscal con aloinjerto como primera opción",
    ],
    correct: 1,
    explanation:
      "En pacientes mayores de 40 años con roturas degenerativas atraumáticas sin síntomas mecánicos, la tendencia actual es intentar un tratamiento conservador inicial durante al menos 3 meses antes de plantear cirugía.",
  },
  {
    id: 735,
    block: "rodilla",
    code: "Bloqueo articular por lesión meniscal",
    image: null,
    prompt:
      "Paciente joven con bloqueo articular agudo de la rodilla tras un giro brusco, que no se resuelve con maniobras de reducción bajo anestesia local intraarticular. ¿Cuál es la actitud más adecuada?",
    options: [
      "Plantear cirugía urgente para tratar el bloqueo mecánico",
      "Mantener tratamiento conservador con hielo y reposo unas semanas más",
      "Solicitar solo una radiografía simple y reevaluar en un mes",
      "Indicar reposo absoluto sin ninguna prueba de imagen adicional",
    ],
    correct: 0,
    explanation:
      "Cuando existe un bloqueo articular que no se resuelve con manipulaciones y anestesia local intraarticular, puede ser indicación de cirugía urgente para tratar la causa mecánica del bloqueo.",
  },
];




function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function OpositaCOTTest() {
  const [stage, setStage] = useState("setup"); // setup | quiz | summary
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [pool, setPool] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [picked, setPicked] = useState(null); // opción marcada pero aún no enviada
  const [answers, setAnswers] = useState([]); // {q, chosen, correct}

  const toggleBlock = (id) => {
    setSelectedBlocks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const startQuiz = () => {
    const filtered = QUESTIONS.filter((q) => selectedBlocks.includes(q.block));
    setPool(shuffle(filtered));
    setIdx(0);
    setSelected(null);
    setPicked(null);
    setAnswers([]);
    setStage("quiz");
  };

  const currentQ = pool[idx];
  const currentBlock = currentQ
    ? BLOCKS.find((b) => b.id === currentQ.block)
    : null;

  const choose = (optionIdx) => {
    if (selected !== null) return; // ya se ha enviado la respuesta, no se puede cambiar
    setPicked(optionIdx);
  };

  const submitAnswer = () => {
    if (picked === null || selected !== null) return;
    setSelected(picked);
    setAnswers((prev) => [
      ...prev,
      {
        q: currentQ,
        chosen: picked,
        correct: picked === currentQ.correct,
      },
    ]);
  };

  const next = () => {
    if (idx + 1 >= pool.length) {
      setStage("summary");
    } else {
      setIdx(idx + 1);
      setSelected(null);
      setPicked(null);
    }
  };

  const stats = useMemo(() => {
    const byBlock = {};
    BLOCKS.forEach((b) => (byBlock[b.id] = { total: 0, correct: 0 }));
    answers.forEach((a) => {
      byBlock[a.q.block].total += 1;
      if (a.correct) byBlock[a.q.block].correct += 1;
    });
    const totalCorrect = answers.filter((a) => a.correct).length;
    return { byBlock, totalCorrect, total: answers.length };
  }, [answers]);

  const scorePct =
    stats.total > 0 ? Math.round((stats.totalCorrect / stats.total) * 100) : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#F4F6FA",
        color: "#1E2A3A",
        fontFamily: "'Inter', sans-serif",
        padding: "0",
      }}
    >
      <style>{`
        ${FONT_IMPORT}
        html, body, #root {
          background: #F4F6FA !important;
          margin: 0;
          padding: 0;
          min-height: 100%;
          width: 100%;
          max-width: none !important;
          text-align: left !important;
        }
        .oct-display { font-family: 'Poppins', sans-serif; }
        .oct-card {
          transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease;
        }
        .oct-card:hover:not(.locked) {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08);
        }
        .oct-btn {
          transition: opacity 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease;
        }
        .oct-btn:hover {
          opacity: 0.92;
        }
        .oct-btn:active {
          transform: scale(0.98);
        }
        .oct-btn:disabled:hover {
          opacity: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .oct-card, .oct-btn { transition: none !important; }
        }
      `}</style>

      {/* Friendly top bar */}
      <div
        style={{
          borderBottom: "1px solid #E2E8F0",
          background: "#FFFFFF",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          position: "sticky",
          top: 0,
          zIndex: 5,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "9px",
              background: "linear-gradient(135deg, #0D9488, #0284C7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              flexShrink: 0,
            }}
          >
            OC
          </div>
          <div>
            <div
              className="oct-display"
              style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.1 }}
            >
              OpositaCOT
            </div>
            <div style={{ fontSize: "11.5px", color: "#8592A6", marginTop: "1px" }}>
              Cirugía Ortopédica y Traumatología
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
          {stage === "quiz" && (
            <div
              style={{
                fontSize: "13px",
                color: "#475569",
                textAlign: "right",
                background: "#F1F5F9",
                borderRadius: "20px",
                padding: "6px 14px",
              }}
            >
              Pregunta <strong>{idx + 1}</strong> de {pool.length}
              <span style={{ margin: "0 8px", color: "#CBD5E1" }}>·</span>
              <span style={{ color: "#0D9488", fontWeight: 600 }}>
                {stats.totalCorrect} aciertos
              </span>
            </div>
          )}
          <a
            href="https://ko-fi.com/med2792"
            target="_blank"
            rel="noopener noreferrer"
            className="oct-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "20px",
              border: "1px solid #FDBA74",
              background: "#FFF7ED",
              color: "#C2410C",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            ☕ Invítame a un café
          </a>
        </div>
      </div>

      <div style={{ padding: "32px 24px 60px", maxWidth: "720px", margin: "0 auto" }}>
        {stage === "setup" && (
          <div>
            <h1
              className="oct-display"
              style={{ fontSize: "24px", fontWeight: 700, lineHeight: 1.35, marginBottom: "8px", color: "#0F172A" }}
            >
              ¿Qué quieres repasar hoy?
            </h1>
            <p style={{ color: "#64748B", fontSize: "14.5px", lineHeight: 1.6, marginBottom: "24px" }}>
              Elige uno o varios bloques del temario para armar tu sesión de test.
              Puedes combinar los que quieras.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              {BLOCKS.map((b) => {
                const active = selectedBlocks.includes(b.id);
                const count = QUESTIONS.filter((q) => q.block === b.id).length;
                return (
                  <button
                    key={b.id}
                    className="oct-card"
                    onClick={() => toggleBlock(b.id)}
                    style={{
                      textAlign: "left",
                      padding: "16px",
                      borderRadius: "14px",
                      border: active ? `2px solid ${b.color}` : "1.5px solid #E2E8F0",
                      background: active ? b.tint : "#FFFFFF",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "9px",
                          background: b.color,
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <BlockIcon id={b.id} size={17} />
                      </div>
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "6px",
                          border: active ? "none" : "1.5px solid #CBD5E1",
                          background: active ? b.color : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontSize: "13px",
                          flexShrink: 0,
                        }}
                      >
                        {active ? "✓" : ""}
                      </div>
                    </div>
                    <div>
                      <div className="oct-display" style={{ fontSize: "15px", fontWeight: 600, color: "#1E293B" }}>
                        {b.label}
                      </div>
                      <div style={{ fontSize: "12.5px", color: "#94A3B8", marginTop: "2px" }}>
                        {count} preguntas
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              className="oct-btn"
              disabled={selectedBlocks.length === 0}
              onClick={startQuiz}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "14px",
                border: "none",
                background:
                  selectedBlocks.length === 0
                    ? "#E2E8F0"
                    : "linear-gradient(135deg, #0D9488, #0284C7)",
                color: selectedBlocks.length === 0 ? "#94A3B8" : "#FFFFFF",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: "15.5px",
                cursor: selectedBlocks.length === 0 ? "not-allowed" : "pointer",
                boxShadow:
                  selectedBlocks.length === 0 ? "none" : "0 6px 16px rgba(13, 148, 136, 0.25)",
              }}
            >
              {selectedBlocks.length === 0
                ? "Selecciona al menos un bloque"
                : `Comenzar test (${QUESTIONS.filter((q) => selectedBlocks.includes(q.block)).length} preguntas)`}
            </button>
          </div>
        )}

        {stage === "quiz" && currentQ && (
          <div>
            <div
              style={{
                width: "100%",
                height: "8px",
                background: "#E2E8F0",
                borderRadius: "20px",
                marginBottom: "20px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${((idx + (selected !== null ? 1 : 0)) / pool.length) * 100}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #0D9488, #0284C7)",
                  borderRadius: "20px",
                  transition: "width 0.25s ease",
                }}
              />
            </div>

            <div
              className="oct-display"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12.5px",
                fontWeight: 600,
                padding: "5px 12px",
                borderRadius: "20px",
                background: currentBlock ? currentBlock.tint : "#F1F5F9",
                color: currentBlock ? currentBlock.color : "#475569",
                marginBottom: "16px",
              }}
            >
              {currentQ.code}
            </div>

            <div
              style={{ fontSize: "18px", fontWeight: 600, lineHeight: 1.5, marginBottom: "20px", color: "#0F172A" }}
            >
              {currentQ.prompt}
            </div>

            {currentQ.image && (
              <div
                style={{
                  marginBottom: "20px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid #E2E8F0",
                  background: "#000",
                }}
              >
                <img
                  src={currentQ.image}
                  alt={`Imagen clínica — ${currentQ.code}`}
                  style={{ width: "100%", display: "block" }}
                />
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {currentQ.options.map((opt, i) => {
                const isPicked = picked === i;
                const isChosen = selected === i;
                const isCorrect = i === currentQ.correct;
                let borderColor = "#E2E8F0";
                let bg = "#FFFFFF";
                let icon = null;
                if (selected !== null) {
                  if (isCorrect) {
                    borderColor = "#16A34A";
                    bg = "#F0FDF4";
                    icon = "✓";
                  } else if (isChosen && !isCorrect) {
                    borderColor = "#DC2626";
                    bg = "#FEF2F2";
                    icon = "✕";
                  }
                } else if (isPicked) {
                  borderColor = "#0D9488";
                  bg = "#F0FDFA";
                }
                return (
                  <button
                    key={i}
                    className={`oct-card ${selected !== null ? "locked" : ""}`}
                    onClick={() => choose(i)}
                    style={{
                      textAlign: "left",
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: `1.5px solid ${borderColor}`,
                      background: bg,
                      color: "#1E293B",
                      cursor: selected !== null ? "default" : "pointer",
                      fontSize: "14.5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <span>{opt}</span>
                    {icon && (
                      <span
                        style={{
                          flexShrink: 0,
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: icon === "✓" ? "#16A34A" : "#DC2626",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                        }}
                      >
                        {icon}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {selected === null && (
              <button
                className="oct-btn"
                onClick={submitAnswer}
                disabled={picked === null}
                style={{
                  marginTop: "18px",
                  width: "100%",
                  padding: "14px",
                  borderRadius: "14px",
                  border: "none",
                  background:
                    picked === null
                      ? "#E2E8F0"
                      : "linear-gradient(135deg, #0D9488, #0284C7)",
                  color: picked === null ? "#94A3B8" : "#FFFFFF",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "14.5px",
                  cursor: picked === null ? "not-allowed" : "pointer",
                  boxShadow:
                    picked === null ? "none" : "0 6px 16px rgba(13, 148, 136, 0.25)",
                }}
              >
                Enviar respuesta
              </button>
            )}

            {selected !== null && (
              <div
                style={{
                  marginTop: "18px",
                  padding: "16px",
                  borderRadius: "12px",
                  background:
                    currentQ.options[selected] === currentQ.options[currentQ.correct]
                      ? "#F0FDF4"
                      : "#FEF2F2",
                  border: `1px solid ${
                    currentQ.options[selected] === currentQ.options[currentQ.correct]
                      ? "#BBF7D0"
                      : "#FECACA"
                  }`,
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: "#334155",
                }}
              >
                <span
                  className="oct-display"
                  style={{
                    color:
                      currentQ.options[selected] === currentQ.options[currentQ.correct]
                        ? "#15803D"
                        : "#B91C1C",
                    fontWeight: 700,
                  }}
                >
                  {currentQ.options[selected] === currentQ.options[currentQ.correct]
                    ? "¡Correcto! "
                    : "No es correcto. "}
                </span>
                {currentQ.explanation}
              </div>
            )}

            {selected !== null && (
              <button
                className="oct-btn"
                onClick={next}
                style={{
                  marginTop: "18px",
                  width: "100%",
                  padding: "14px",
                  borderRadius: "14px",
                  border: "none",
                  background: "linear-gradient(135deg, #0D9488, #0284C7)",
                  color: "#FFFFFF",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "14.5px",
                  cursor: "pointer",
                  boxShadow: "0 6px 16px rgba(13, 148, 136, 0.25)",
                }}
              >
                {idx + 1 >= pool.length ? "Ver resultados →" : "Siguiente pregunta →"}
              </button>
            )}
          </div>
        )}

        {stage === "summary" && (
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                marginBottom: "28px",
              }}
            >
              <div
                style={{
                  width: "116px",
                  height: "116px",
                  borderRadius: "50%",
                  background: `conic-gradient(#0D9488 ${scorePct * 3.6}deg, #E2E8F0 0deg)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    width: "92px",
                    height: "92px",
                    borderRadius: "50%",
                    background: "#FFFFFF",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="oct-display" style={{ fontSize: "26px", fontWeight: 700, color: "#0F172A" }}>
                    {scorePct}%
                  </div>
                </div>
              </div>
              <div className="oct-display" style={{ fontSize: "17px", fontWeight: 600, color: "#0F172A" }}>
                {stats.totalCorrect} de {stats.total} respuestas correctas
              </div>
              <div style={{ color: "#64748B", fontSize: "13.5px", marginTop: "2px" }}>
                Resultado de esta sesión de estudio
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "26px" }}>
              {BLOCKS.filter((b) => stats.byBlock[b.id].total > 0).map((b) => {
                const s = stats.byBlock[b.id];
                const pct = Math.round((s.correct / s.total) * 100);
                return (
                  <div
                    key={b.id}
                    style={{
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "1px solid #E2E8F0",
                      background: "#FFFFFF",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 500, color: "#334155" }}>{b.label}</span>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: b.color }}>
                        {s.correct}/{s.total}
                      </span>
                    </div>
                    <div style={{ height: "6px", background: "#F1F5F9", borderRadius: "20px", overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: b.color, borderRadius: "20px" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className="oct-btn"
              onClick={() => {
                setSelectedBlocks([]);
                setStage("setup");
              }}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "14px",
                border: "1.5px solid #0D9488",
                background: "#F0FDFA",
                color: "#0D9488",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: "14.5px",
                cursor: "pointer",
              }}
            >
              Nueva sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

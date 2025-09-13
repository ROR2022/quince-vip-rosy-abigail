import { basicDemoData } from './basic-demo-data'

// Datos demo para el paquete premium de quinceañera
export const premiumDemoData = {
  // Heredar todos los datos del básico
  ...basicDemoData,
  
  // Sobreescribir información demo con datos premium
  demo: {
    badge: "🌟 DEMO - Paquete Premium ($499)",
    description: "¡La más solicitada! - Incluye música, galería y padrinos",
    features: [
      ...basicDemoData.demo.features,
      "Música personalizada",
      "Galería de fotos", 
      "Lista de padrinos"
    ],
    cta: {
      title: "¿Te encanta el paquete Premium?",
      subtitle: "El más solicitado - Incluye TODAS las características esenciales + 3 premium exclusivas",
      buttonText: "Contratar Paquete Premium - $499",
      link: "/#pricing"
    }
  },
  
  // Configuración de música premium
  music: {
    title: "Música Especial",
    track: "/music/noCrezcas.mp3",
    autoplay: false, // Por UX, mejor no autoplay automático
    loop: true,
    description: "Música personalizada para tu evento"
  },
  
  // Información completa de invitación (característica premium)
  invitation: {
    title: "INVITACIÓN ESPECIAL",
    message: "Acompáñanos a celebrar",
    subtitle: "Mis XV años",
    blessing: "con la bendición de Dios y mis padres:",
    celebrant: basicDemoData.event.celebrant,
    parents: basicDemoData.event.parents,
    decorativeMessage: "Te esperamos en este día tan especial"
  },
  
  // Lista de padrinos (característica premium NUEVA)
  padrinos: [
    { 
      role: "Padrinos de Honor", 
      names: ["Carlos Rivera González", "María Elena Sosa Martínez"],
      description: "Quienes han sido como segundos padres"
    },
    { 
      role: "Padrinos del Vestido", 
      names: ["Roberto González Silva", "Ana Isabel Martínez López"],
      description: "Por hacer realidad mi vestido soñado"
    },
    { 
      role: "Padrinos del Ramo", 
      names: ["Luis Alberto Hernández", "Carmen Rosa López Vega"],
      description: "Por las flores más hermosas"
    },
    { 
      role: "Padrinos de la Música", 
      names: ["Jorge Eduardo Ramírez", "Sofía Alejandra Torres"],
      description: "Por llenar de melodía mi celebración"
    },
    { 
      role: "Padrinos del Vals", 
      names: ["Fernando José García", "Lucía Mercedes Herrera"],
      description: "Por hacer mágico mi primer vals"
    },
    { 
      role: "Padrinos de las Flores", 
      names: ["Miguel Ángel Ruiz", "Rosa María Jiménez"],
      description: "Por decorar este día especial"
    }
  ],
  
  // Galería de fotos (característica premium)
  gallery: {
    title: "Galería de Recuerdos",
    subtitle: "Momentos especiales",
    description: "Una colección de mis fotos favoritas preparándome para este gran día",
    images: [
      { 
        src: "/images/rosy01.jpg", 
        alt: "Sesión fotográfica 1", 
        caption: "Momentos Inolvidables",
        category: "preparacion"
      },
      { 
        src: "/images/rosy02.jpg", 
        alt: "Sesión fotográfica 2", 
        caption: "Momentos Inolvidables",
        category: "vestido"
      },
      { 
        src: "/images/rosy03.jpg", 
        alt: "Sesión fotográfica 3", 
        caption: "Momentos Inolvidables",
        category: "alegria"
      },
      { 
        src: "/images/rosy04.jpg", 
        alt: "Sesión fotográfica 4", 
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/rosy05.jpg", 
        alt: "Sesión fotográfica 5", 
        caption: "Momentos Inolvidables",
        category: "amistad"
      },
      {
        src: "/images/rosy06.jpg", 
        alt: "Sesión fotográfica 6", 
        caption: "Momentos Inolvidables",
        category: "familia"
      },
      {
        src: "/images/rosy07.jpg", 
        alt: "Sesión fotográfica 7", 
        caption: "Momentos Inolvidables",
        category: "diversion"
      },
      {
        src: "/images/rosy09.jpg", 
        alt: "Sesión fotográfica 9", 
        caption: "Momentos Inolvidables",
        category: "sonrisa"
      },
      {
        src: "/images/rosy10.jpg", 
        alt: "Sesión fotográfica 10", 
        caption: "Momentos Inolvidables",
        category: "felicidad"
      },
      {
        src: "/images/rosy11.jpg", 
        alt: "Sesión fotográfica 11", 
        caption: "Momentos Inolvidables",
        category: "magia"
      },
      {
        src: "/images/rosy12.jpg", 
        alt: "Sesión fotográfica 12", 
        caption: "Momentos Inolvidables",
        category: "sueños"
      },
      {
        src: "/images/rosy13.jpg", 
        alt: "Sesión fotográfica 13", 
        caption: "Momentos Inolvidables",
        category: "esperanza"
      },
      {
        src: "/images/rosy14.jpg", 
        alt: "Sesión fotográfica 14", 
        caption: "Momentos Inolvidables",
        category: "ilusion"
      },
      {
        src: "/images/rosy15.jpg", 
        alt: "Sesión fotográfica 15", 
        caption: "Momentos Inolvidables",
        category: "amor"
      },
      {
        src: "/images/rosy16.jpg", 
        alt: "Sesión fotográfica 16", 
        caption: "Momentos Inolvidables",
        category: "amistad"
      },
      {
        src: "/images/rosy17.jpg", 
        alt: "Sesión fotográfica 17", 
        caption: "Momentos Inolvidables",
        category: "familia"
      },
      {
        src: "/images/rosy18.jpg", 
        alt: "Sesión fotográfica 18", 
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/rosy19.jpg", 
        alt: "Sesión fotográfica 19", 
        caption: "Momentos Inolvidables",
        category: "diversion"
      },
      {
        src: "/images/rosy20.jpg", 
        alt: "Sesión fotográfica 20", 
        caption: "Momentos Inolvidables",
        category: "elegancia"
      },
      {
        src: "/images/rosy21.jpg", 
        alt: "Sesión fotográfica 21", 
        caption: "Momentos Inolvidables",
        category: "sonrisa"
      },
      {
        src: "/images/rosy22.jpg", 
        alt: "Sesión fotográfica 22", 
        caption: "Momentos Inolvidables",
        category: "felicidad"
      },
      {
        src: "/images/rosy23.jpg", 
        alt: "Sesión fotográfica 23", 
        caption: "Momentos Inolvidables",
        category: "magia"
      },
      {
        src: "/images/rosy24.jpg", 
        alt: "Sesión fotográfica 24", 
        caption: "Momentos Inolvidables",
        category: "sueños"
      },
      {
        src: "/images/rosy25.jpg", 
        alt: "Sesión fotográfica 25", 
        caption: "Momentos Inolvidables",
        category: "esperanza"
      }
    ]
  },
  
  // Mensaje final personalizado (característica premium)
  thankYou: {
    title: "¡Gracias por ser parte de uno de los mejores días de mi vida!",
    personalMessage: "Cada uno de ustedes tiene un lugar especial en mi corazón, y no puedo imaginar esta celebración sin su presencia.",
    message: "Con todo mi cariño:",
    signature: "Isabella María",
    footer: {
      year: "2024",
      name: "ISABELLA MARÍA XV",
      company: "BY INVITACIONES WEB MX",
      rights: "ALL RIGHTS RESERVED",
      cta: {
        question: "¿TIENES UN EVENTO EN PUERTA?",
        action: "DISEÑA CON NOSOTROS TU INVITACIÓN WEB DIGITAL.",
        linkText: "AQUÍ",
        link: "/"
      }
    }
  },
  
  // Configuración premium adicional
  premium: {
    hasMusic: true,
    hasGallery: true,
    hasPadrinos: true,
    hasFullInvitation: true,
    hasPersonalizedThankYou: true,
    badge: "PREMIUM",
    color: "from-purple-600 to-pink-600"
  }
}

export type PremiumDemoData = typeof premiumDemoData 
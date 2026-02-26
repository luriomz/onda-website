import heroEvent1 from "@/assets/hero-event-1.jpg";
import heroEvent2 from "@/assets/hero-event-2.jpg";
import heroEvent3 from "@/assets/hero-event-3.jpg";
import heroEvent4 from "@/assets/hero-event-4.jpg";

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  image: string;
  category: string;
  price: number;
  currency: string;
  interestedCount: number;
  organizer: Organizer;
  description: string;
  lineup?: Artist[];
  isFeatured?: boolean;
  isSoldOut?: boolean;
}

export interface Organizer {
  id: string;
  name: string;
  avatar: string;
  followerCount: number;
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  followerCount: number;
  bio: string;
}

export const categories = [
  { id: "all", label: "Tudo", icon: "✨" },
  { id: "festas", label: "Festas", icon: "🎉" },
  { id: "concertos", label: "Concertos", icon: "🎵" },
  { id: "festivais", label: "Festivais", icon: "🎪" },
  { id: "cultural", label: "Cultural", icon: "🎭" },
  { id: "desporto", label: "Desporto", icon: "⚽" },
  { id: "gastronomia", label: "Gastronomia", icon: "🍽️" },
];

export const cities = [
  "Maputo",
  "Beira",
  "Nampula",
  "Matola",
  "Vilankulo",
  "Inhambane",
  "Tofo",
];

export const artists: Artist[] = [
  { id: "a1", name: "DJ Tamele", genre: "Afro House", followerCount: 8500, bio: "Um dos DJs mais influentes de Maputo, conhecido por misturar batidas tradicionais moçambicanas com house moderno." },
  { id: "a2", name: "MC Knoz", genre: "Hip Hop", followerCount: 4200, bio: "MC e letrista de Maputo, trazendo rimas conscientes sobre a vida urbana moçambicana." },
  { id: "a3", name: "Lizha James", genre: "Pop / R&B", followerCount: 52000, bio: "Estrela pop moçambicana com múltiplos álbuns de sucesso e presença internacional." },
  { id: "a4", name: "Nástio Mosquito", genre: "Experimental", followerCount: 15000, bio: "Artista multidisciplinar angolano-moçambicano, conhecido pelas suas performances provocadoras." },
  { id: "a5", name: "Dama do Bling", genre: "Hip Hop", followerCount: 28000, bio: "Rainha do hip hop moçambicano, pioneira do rap feminino no país." },
  { id: "a6", name: "Iveth", genre: "R&B / Soul", followerCount: 9800, bio: "Voz suave e poderosa, Iveth traz soul e R&B com sabor moçambicano." },
  { id: "a7", name: "Mr. Bow", genre: "Pop / Dance", followerCount: 67000, bio: "Um dos artistas mais populares de Moçambique, com hits que dominam as rádios." },
  { id: "a8", name: "Stewart Sukuma", genre: "Marrabenta", followerCount: 31000, bio: "Lenda viva da música moçambicana, mestre da marrabenta e embaixador cultural." },
  { id: "a9", name: "Mingas", genre: "Jazz / World", followerCount: 22000, bio: "Cantora e compositora de renome internacional, misturando jazz com ritmos africanos." },
  { id: "a10", name: "DJ Satelite", genre: "Afro House", followerCount: 19000, bio: "Produtor e DJ de referência no afro house, com actuações por toda a África." },
  { id: "a11", name: "Neyma", genre: "Pop / Marrabenta", followerCount: 45000, bio: "A voz feminina mais conhecida de Moçambique, com uma carreira de duas décadas." },
  { id: "a12", name: "Dilon Djindji", genre: "Marrabenta", followerCount: 7500, bio: "Jovem talento da marrabenta, preservando e renovando a tradição musical moçambicana." },
  { id: "a13", name: "Orchestra Marrabenta Star", genre: "Marrabenta", followerCount: 18000, bio: "Orquestra icónica que mantém viva a essência da marrabenta desde os anos 80." },
  { id: "a14", name: "Moreira Chonguiça", genre: "Jazz", followerCount: 14000, bio: "Saxofonista de jazz de classe mundial, representando Moçambique nos palcos internacionais." },
  { id: "a15", name: "Ivan Mazuze", genre: "Jazz / Fusion", followerCount: 6200, bio: "Guitarrista e compositor de jazz fusion, explorando novas fronteiras sonoras." },
  { id: "a16", name: "Nix", genre: "Electronic", followerCount: 3800, bio: "DJ e produtor emergente da cena electrónica de Beira." },
];

const artistByName = (name: string) => artists.find(a => a.name === name)!;

export const organizers: Organizer[] = [
  { id: "o1", name: "Maputo Nights", avatar: "", followerCount: 12400 },
  { id: "o2", name: "Beira Sounds", avatar: "", followerCount: 8200 },
  { id: "o3", name: "Festival Moz", avatar: "", followerCount: 34500 },
  { id: "o4", name: "Club Coconut", avatar: "", followerCount: 5600 },
  { id: "o5", name: "Kultura Viva", avatar: "", followerCount: 18900 },
];

export const events: Event[] = [
  {
    id: "1",
    title: "Noite Tropical",
    date: "2026-03-15",
    time: "22:00",
    venue: "Gil Vicente",
    city: "Maputo",
    image: heroEvent1,
    category: "festas",
    price: 500,
    currency: "MZN",
    interestedCount: 342,
    organizer: organizers[0],
    description: "A maior festa tropical de Maputo está de volta! Uma noite inesquecível com os melhores DJs da cidade, drinks tropicais e muita energia.",
    lineup: [artistByName("DJ Tamele"), artistByName("MC Knoz"), artistByName("Lizha James")],
    isFeatured: true,
  },
  {
    id: "2",
    title: "Azagaia Tribute",
    date: "2026-03-20",
    time: "20:00",
    venue: "Centro Cultural Franco-Moçambicano",
    city: "Maputo",
    image: heroEvent2,
    category: "concertos",
    price: 750,
    currency: "MZN",
    interestedCount: 890,
    organizer: organizers[2],
    description: "Uma homenagem ao maior rapper moçambicano de sempre. Concerto ao vivo com artistas convidados especiais.",
    lineup: [artistByName("Nástio Mosquito"), artistByName("Dama do Bling"), artistByName("Iveth"), artistByName("Mr. Bow")],
    isFeatured: true,
  },
  {
    id: "3",
    title: "Sunset Beach Party",
    date: "2026-03-22",
    time: "16:00",
    venue: "Praia de Tofo",
    city: "Tofo",
    image: heroEvent3,
    category: "festivais",
    price: 1200,
    currency: "MZN",
    interestedCount: 1250,
    organizer: organizers[3],
    description: "O festival de praia mais esperado do ano! Dois palcos, food trucks, e uma vista incrível do Oceano Índico.",
    lineup: [artistByName("Stewart Sukuma"), artistByName("Mingas"), artistByName("DJ Satelite"), artistByName("Neyma")],
    isFeatured: true,
  },
  {
    id: "4",
    title: "Festival da Marrabenta",
    date: "2026-04-05",
    time: "14:00",
    venue: "Praça dos Trabalhadores",
    city: "Maputo",
    image: heroEvent4,
    category: "cultural",
    price: 300,
    currency: "MZN",
    interestedCount: 2100,
    organizer: organizers[4],
    description: "Celebre a música tradicional moçambicana! Um dia inteiro dedicado à marrabenta com os mestres do género.",
    lineup: [artistByName("Dilon Djindji"), artistByName("Orchestra Marrabenta Star")],
  },
  {
    id: "5",
    title: "Electro Beira",
    date: "2026-04-10",
    time: "23:00",
    venue: "Club Nautilus",
    city: "Beira",
    image: heroEvent1,
    category: "festas",
    price: 400,
    currency: "MZN",
    interestedCount: 178,
    organizer: organizers[1],
    description: "A cena electrónica de Beira cresce! Uma noite de house e techno com DJs locais e internacionais.",
    lineup: [artistByName("DJ Satelite"), artistByName("Nix")],
  },
  {
    id: "6",
    title: "Maputo Jazz Night",
    date: "2026-04-12",
    time: "19:30",
    venue: "Associação Núcleo de Arte",
    city: "Maputo",
    image: heroEvent2,
    category: "concertos",
    price: 600,
    currency: "MZN",
    interestedCount: 95,
    organizer: organizers[0],
    description: "Uma noite íntima de jazz no coração de Maputo. Cocktails artesanais e música ao vivo.",
    lineup: [artistByName("Moreira Chonguiça"), artistByName("Ivan Mazuze")],
  },
  {
    id: "7",
    title: "Copa Desporto Universitário",
    date: "2026-04-18",
    time: "09:00",
    venue: "Estádio da Machava",
    city: "Matola",
    image: heroEvent4,
    category: "desporto",
    price: 150,
    currency: "MZN",
    interestedCount: 450,
    organizer: organizers[4],
    description: "O maior torneio desportivo universitário de Moçambique. Futebol, basquete e atletismo.",
  },
  {
    id: "8",
    title: "Gastro Fest Maputo",
    date: "2026-04-25",
    time: "11:00",
    venue: "Jardim Tunduru",
    city: "Maputo",
    image: heroEvent3,
    category: "gastronomia",
    price: 200,
    currency: "MZN",
    interestedCount: 620,
    organizer: organizers[2],
    description: "Prove os melhores sabores de Moçambique! Chefs locais, food trucks e workshops culinários.",
  },
];

export const formatMZN = (amount: number): string => {
  return new Intl.NumberFormat("pt-MZ", {
    style: "currency",
    currency: "MZN",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-MZ", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

export const formatDateFull = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-MZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

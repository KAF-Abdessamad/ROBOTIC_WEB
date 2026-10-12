export interface MemberItem {
  id: string;
  firstName: string;
  lastName: string;
  roleTitle: string;
  team: string;
  bio: string;
  avatarUrl: string;
  linkedinUrl?: string;
  githubUrl?: string;
  displayOrder: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  status: "ideation" | "in_progress" | "completed" | "archived";
  statusLabel: string;
  projectDate: string;
  githubRepo?: string;
  highlights: string[];
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  location: string;
  startDate: string;
  endDate?: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  statusLabel: string;
  registrationUrl?: string;
  type: string;
}

export interface HistoryItem {
  id: string;
  year: string;
  title: string;
  description: string;
  badge?: string;
  imageUrl?: string;
  displayOrder: number;
}

export const DEMO_MEMBERS: MemberItem[] = [
  // ── LEADERSHIP ──────────────────────────────────────────────────────────────
  {
    id: "m-1",
    firstName: "BELGHITI",
    lastName: "Reda",
    roleTitle: "Président du Club",
    team: "Leadership",
    bio: "Étudiant en 4ème année IAAR. Pilote la stratégie globale du club et les relations institutionnelles avec l'UPF.",
    avatarUrl: "/reda.jpeg",
    displayOrder: 1,
  },
  {
    id: "m-2",
    firstName: "KAF",
    lastName: "Abdessamad",
    roleTitle: "Vice-Président",
    team: "Leadership",
    bio: "Étudiant en 4ème année Génie Informatique. Assure la coordination des pôles et le suivi des projets techniques.",
    avatarUrl: "/abdo.jpeg",
    displayOrder: 2,
  },
  {
    id: "m-3",
    firstName: "BALLOUK",
    lastName: "Hiba",
    roleTitle: "Membre du Bureau",
    team: "Leadership",
    bio: "Étudiante en 4ème année IAAR. Participe activement à la gouvernance et à l'animation des activités du club.",
    avatarUrl: "/hiba.jpeg",
    displayOrder: 3,
  },
  // ── COMMUNICATION & MÉDIAS ───────────────────────────────────────────────────
  {
    id: "m-4",
    firstName: "BENKIRANE",
    lastName: "Mariame",
    roleTitle: "Responsable Médias",
    team: "Communication & Médias",
    bio: "Étudiante en 3ème année Génie Informatique. Gestion des publications numériques et de la stratégie de communication digitale.",
    avatarUrl: "/mariam.jpeg",
    displayOrder: 4,
  },
  {
    id: "m-5",
    firstName: "GAIZI",
    lastName: "Ibtissam",
    roleTitle: "Responsable Médias",
    team: "Communication & Médias",
    bio: "Étudiante en 4ème année Génie Informatique. Production de contenu visuel et gestion des réseaux sociaux du club.",
    avatarUrl: "/ibtissam.jpeg",
    displayOrder: 5,
  },
  {
    id: "m-6",
    firstName: "GUISSI",
    lastName: "Malak",
    roleTitle: "Responsable Communication",
    team: "Communication & Médias",
    bio: "Étudiante en 4ème année IAAR. Coordination des partenariats et de la communication externe du Robotics Club.",
    avatarUrl: "/malak.jpeg",
    displayOrder: 6,
  },
  // ── RESSOURCES & GESTION ────────────────────────────────────────────────────
  {
    id: "m-7",
    firstName: "HAMMNE",
    lastName: "Brahim",
    roleTitle: "Responsable Ressources & Gestion",
    team: "Ressources & Gestion",
    bio: "Étudiant en 4ème année IAAR. Gestion logistique, suivi budgétaire et administration des ressources matérielles du club.",
    avatarUrl: "/brahim.jpeg",
    displayOrder: 7,
  },
  // ── EXPERTISE & CONSEIL ─────────────────────────────────────────────────────
  {
    id: "m-8",
    firstName: "EL MOUNTASSIE",
    lastName: "Imane",
    roleTitle: "Experte & Conseillère",
    team: "Expertise & Conseil",
    bio: "Étudiante en 5ème année IAAR. Référente technique sur les systèmes embarqués et l'intelligence artificielle robotique.",
    avatarUrl: "/imane.jpeg",
    displayOrder: 8,
  },
  {
    id: "m-9",
    firstName: "EL HOUARI",
    lastName: "Zakaria",
    roleTitle: "Expert & Conseiller",
    team: "Expertise & Conseil",
    bio: "Étudiant en 5ème année Génie Informatique. Conseil stratégique sur les projets R&D et l'architecture logicielle.",
    avatarUrl: "/zakaria.jpeg",
    displayOrder: 9,
  },
];

export const DEMO_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Atlas-Rover UPF : Robot Mobile Tout-Terrain",
    slug: "atlas-rover-upf",
    summary: "Plateforme mobile autonome à 6 roues indépendantes inspirée des rovers martiens pour l'exploration et la cartographie 3D.",
    description: "Le projet Atlas-Rover est conçu pour naviguer en terrain accidenté avec une suspension rocker-bogie active. Il intègre une suite de capteurs comprenant LiDAR 3D, caméras stéréoscopiques RealSense et centrale inertielle IMU 9-axes. Le contrôle est opéré via ROS 2 Iron sous Nvidia Jetson Orin Nano.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80",
    technologies: ["ROS 2", "Nvidia Jetson", "SolidWorks", "Python", "LiDAR 3D", "SLAM"],
    status: "in_progress",
    statusLabel: "En développement actif",
    projectDate: "2024 - 2025",
    githubRepo: "https://github.com/upf-robotics/atlas-rover",
    highlights: ["Suspension Rocker-Bogie", "Navigation Nav2 avec évitement dynamique", "Autonomie de 3h en charge"]
  },
  {
    id: "proj-2",
    title: "AeroBot : Drone Quadrotor d'Inspection Autonome",
    slug: "aerobot-inspection",
    summary: "Drone quadricoptère à navigation GPS-Denied pour l'inspection structurelle des bâtiments et panneaux solaires de l'UPF.",
    description: "Équipé d'une caméra thermique et d'algorithmes de détection d'anomalies en temps réel, AeroBot effectue des rondes de surveillance automatiques en intérieur et extérieur sans signal GPS grâce au Visual Inertial Odometry (VIO).",
    imageUrl: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1000&q=80",
    technologies: ["PX4 Autopilot", "Raspberry Pi 5", "OpenCV", "YOLOv8", "VIO"],
    status: "in_progress",
    statusLabel: "Phase de tests en vol",
    projectDate: "2024",
    githubRepo: "https://github.com/upf-robotics/aerobot-vision",
    highlights: ["Vol sans GPS", "Détection d'anomalies par IA", "Flux vidéo HD chiffré"]
  },
  {
    id: "proj-3",
    title: "NeuroArm : Bras Robotique Collaboratif 6-DDL",
    slug: "neuroarm-collaboratif",
    summary: "Bras manipulateur à six degrés de liberté avec commande gestuelle et préhension adaptative par vision industrielle.",
    description: "Conçu pour la manipulation d'objets fragiles et le tri intelligent, ce bras combine des servomoteurs brushless à haute précision avec une pince articulée équipée de capteurs de force piézorésistifs.",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    technologies: ["MoveIt 2", "STM32", "CAN Bus", "Capteurs de force", "Fusion Sensor"],
    status: "completed",
    statusLabel: "Projet finalisé & primé",
    projectDate: "2023 - 2024",
    githubRepo: "https://github.com/upf-robotics/neuroarm",
    highlights: ["Précision de positionnement < 0.5mm", "Cinématique inverse personnalisée", "1er Prix Innovation UPF Tech Day"]
  },
  {
    id: "proj-4",
    title: "BioHex : Robot Marcheur Hexapode Bio-Inspiré",
    slug: "biohex-robot-hexapode",
    summary: "Robot marcheur à 18 servomoteurs imitant la démarche des insectes pour franchir des escaliers et des obstacles complexes.",
    description: "BioHex teste des algorithmes de marche adaptative. Chaque patte dispose de 3 degrés de liberté permettant d'ajuster dynamiquement le centre de gravité en fonction de la topologie du sol.",
    imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1000&q=80",
    technologies: ["Arduino C++", "Modélisation inverse", "Impression 3D PETG", "Bluetooth Low Energy"],
    status: "completed",
    statusLabel: "Démonstrateur opérationnel",
    projectDate: "2023",
    githubRepo: "https://github.com/upf-robotics/biohex",
    highlights: ["18 servomoteurs asservis", "Marche tripode & ondulatoire", "Autonome avec batterie Li-ion 3S"]
  }
];

export const DEMO_EVENTS: EventItem[] = [
  {
    id: "ev-1",
    title: "UPF RoboHackathon 2026 : Drones & Robots Autonomes",
    slug: "upf-robohackathon-2026",
    description: "Compétition intensive de 48 heures rassemblant les étudiants ingénieurs pour concevoir, coder et tester un prototype robotique capable d'intervenir en zone sinistrée.",
    imageUrl: "/event1.jpg",
    location: "Campus UPF - Grand Amphithéâtre & FabLab",
    startDate: "2026-11-20T09:00:00Z",
    endDate: "2026-11-22T18:00:00Z",
    status: "upcoming",
    statusLabel: "Inscriptions ouvertes",
    registrationUrl: "/#formulaire-rejoindre",
    type: "Compétition & Hackathon"
  },
  {
    id: "ev-2",
    title: "Workshop Pratique : Démarrer avec ROS 2 & Gazebo Sim",
    slug: "workshop-ros2-gazebo",
    description: "Atelier pratique interactif pour maîtriser les concepts clés de ROS 2 (nodes, topics, services, actions) et simuler votre premier robot dans Gazebo.",
    imageUrl: "/event2.jpg",
    location: "Laboratoire d'Informatique & Systèmes UPF - Salle B204",
    startDate: "2026-12-12T14:30:00Z",
    endDate: "2026-12-12T17:30:00Z",
    status: "upcoming",
    statusLabel: "Places limitées",
    registrationUrl: "/#formulaire-rejoindre",
    type: "Atelier Technique"
  },
  {
    id: "ev-3",
    title: "Journée Portes Ouvertes Robotics Club UPF 2027",
    slug: "journee-portes-ouvertes-2027",
    description: "Venez découvrir les prototypes, assister à des démonstrations live de rovers et robots marcheurs, et intégrer les équipes techniques du club.",
    imageUrl: "/event4.jpg",
    location: "Campus UPF - Hall Principal & Patio Central",
    startDate: "2027-02-25T10:00:00Z",
    endDate: "2027-02-25T17:00:00Z",
    status: "upcoming",
    statusLabel: "À venir",
    registrationUrl: "/#formulaire-rejoindre",
    type: "Événement Club"
  },
  {
    id: "ev-4",
    title: "Conférence Tech : L'IA Embarquée dans la Robotique Industrielle",
    slug: "conference-ia-embarquee",
    description: "Table ronde avec des ingénieurs industriels et chercheurs spécialistes de l'edge computing et des systèmes mécatroniques critiques.",
    imageUrl: "/event3.jpg",
    location: "Auditorium Central UPF",
    startDate: "2026-04-18T16:00:00Z",
    endDate: "2026-04-18T19:00:00Z",
    status: "completed",
    statusLabel: "Terminé",
    type: "Conférence"
  },
  {
    id: "ev-5",
    title: "Session d'Accueil & Bootcamp Prototypage Rapide",
    slug: "bootcamp-prototypage-2025",
    description: "Week-end d'initiation à la modélisation 3D sous SolidWorks, à la découpe laser et au câblage électronique de cartes ESP32 et Arduino.",
    imageUrl: "/event1.jpg",
    location: "FabLab Universitaire UPF",
    startDate: "2025-11-15T09:30:00Z",
    endDate: "2025-11-16T17:00:00Z",
    status: "completed",
    statusLabel: "Terminé",
    type: "Formation & Atelier"
  }
];

export const DEMO_HISTORY: HistoryItem[] = [
  {
    id: "h-1",
    year: "2022",
    title: "Création du Robotics Club UPF",
    description: "Initiative portée par un groupe d'étudiants passionnés d'ingénierie et soutenue par la direction de l'Université Privée de Fès (UPF). Aménagement du premier atelier et acquisition des imprimantes 3D.",
    badge: "Fondation",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    displayOrder: 1
  },
  {
    id: "h-2",
    year: "2023",
    title: "Premier Hackathon Interne & Robot BioHex",
    description: "Organisation du premier Hackathon interne UPF avec plus de 60 participants et réalisation du robot hexapode BioHex primé.",
    badge: "Structuration",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    displayOrder: 2
  },
  {
    id: "h-3",
    year: "2024",
    title: "Victoire Nationale & Bras Robotique NeuroArm",
    description: "Le club remporte le 1er prix d'innovation technologique avec le projet NeuroArm. Adoption généralisée de ROS 2 et de cartes d'accélération Nvidia Jetson.",
    badge: "Consécration",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    displayOrder: 3
  },
  {
    id: "h-4",
    year: "2025",
    title: "Expansion Internationale & Plateforme Autonome Atlas-Rover",
    description: "Préparation pour la compétition européenne de robotique (Eurobot) et déploiement de partenariats technologiques industriels au FabLab UPF.",
    badge: "Avenir",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    displayOrder: 4
  }
];

export const CLUB_INFO = {
  name: "Robotics Club UPF",
  university: "Université Privée de Fès (UPF)",
  tagline: "Ingénierie, Intelligence Artificielle & Innovation Robotique",
  description: "Le club technologique de l'UPF dédié à la conception de systèmes mécatroniques autonomes, d'intelligence artificielle embarquée et à la formation pratique d'ingénieurs d'excellence.",
  address: "Route d'Ain Chkef, Fès 30000, Maroc",
  campus: "Campus Universitaire UPF, Bloc Ingénierie & FabLab",
  email: "robotics.club@upf.ac.ma",
  phone: "+212 5 35 61 03 20",
  socials: {
    linkedin: "https://www.linkedin.com/in/upf-robotics?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    instagram: "https://www.instagram.com/upf_robotics?vrfl=MTQxcHE3cDd6c2R1bg==",
    tiktok: "https://www.tiktok.com/@upf_robotics?_r=1&_t=ZS-9ATaF8sue0K",
    github: "https://github.com/upf-robotics"
  }
};

/**
 * Compare un événement avec la date d'aujourd'hui.
 * Retourne true si l'événement est à venir (date de début ou de fin >= maintenant), false s'il est passé.
 */
export function isEventUpcoming(event: { startDate: string; endDate?: string }): boolean {
  const now = new Date();
  const refDate = event.endDate ? new Date(event.endDate) : new Date(event.startDate);
  return refDate.getTime() >= now.getTime();
}

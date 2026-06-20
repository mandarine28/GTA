export interface CharacterData {
  slug: string
  name: string
  role: string
  roleLabel: string
  accentColor: string
  coverImage: string
  gender: string
  age: string
  origin: string
  lead: string
  histoire: string[]
  personnalite: string
  traits: string[]
  citations: string[]
  mediaImages: string[]
}

export const characters: CharacterData[] = [
  {
    slug: 'jason-duval',
    name: 'Jason Duval',
    role: 'Protagoniste principal',
    roleLabel: 'JOUABLE',
    accentColor: '#F0C040',
    coverImage: '/images/hero-char.png',
    gender: 'Homme',
    age: 'La trentaine',
    origin: 'Américain (Sud des États-Unis)',
    lead: "Jason Duval travaille pour des criminels locaux et rêve d'une vie meilleure. Sa rencontre avec Lucia Caminos à sa sortie de prison va bouleverser son existence et celle du comté de Leonida.",
    histoire: [
      "Durant son adolescence, Jason a grandi au milieu d'escrocs et d'arnaqueurs en tout genre. Un passage en prison pour braquage l'a forcé à reconsidérer ses priorités — sans pour autant renoncer définitivement à la vie criminelle.",
      "À sa libération, il se retrouve à travailler pour Brian Heder, un vétéran du trafic local qui lui accorde le gîte en échange de services. En apparence arrangé, ce deal l'oblige à racketter les commerçants du coin et à se salir les mains pour le compte d'un autre.",
      "Sa rencontre avec Lucia Caminos, qu'il va chercher à sa sortie de prison, va tout changer. Ensemble, ils décident de s'affranchir de leurs anciens employeurs et de monter leurs propres coups à travers le comté de Leonida.",
    ],
    personnalite: "Jason est le personnage le plus posé et stratégique de la franchise. Contrairement à ses prédécesseurs, il réfléchit avant d'agir — mais ça ne l'empêche pas de savoir se battre quand il le faut. Sa loyauté envers Lucia est le fil conducteur de sa personnalité, et ce qui le distingue des protagonistes précédents.",
    traits: ['Calculateur', 'Loyal', 'Protecteur', 'Stratégique', 'Pragmatique'],
    citations: [
      '"Quoiqu\'il arrive, je couvre tes arrières."',
      '"On fait ça bien, ou on ne le fait pas."',
    ],
    mediaImages: [
      '/images/gameplay1.jpg', '/images/gameplay2.jpg', '/images/gameplay3.jpg',
      '/images/gameplay4.jpg', '/images/gameplay5.jpg', '/images/gameplay6.jpg',
    ],
  },
  {
    slug: 'lucia-caminos',
    name: 'Lucia Caminos',
    role: 'Co-protagoniste',
    roleLabel: 'JOUABLE',
    accentColor: '#8B1FA5',
    coverImage: '/images/gameplay2.jpg',
    gender: 'Femme',
    age: 'La trentaine',
    origin: 'Américaine (origine hispanique)',
    lead: "Lucia Caminos est la première femme protagoniste jouable de la franchise GTA. Déterminée et impulsive, elle refuse d'accepter les limites que la société lui impose et va tout mettre en œuvre pour s'en sortir.",
    histoire: [
      "Lucia sort de prison au tout début du jeu, récupérée par Jason Duval. Son passé est marqué par des erreurs de jeunesse qui l'ont conduite derrière les barreaux pour des délits liés au trafic de stupéfiants dans le comté de Leonida.",
      "Contrairement à Jason, Lucia n'a personne sur qui compter à sa libération — ce qui la rend d'autant plus déterminée à prendre son destin en main. Sa rencontre avec Jason va donner naissance à un partenariat aussi improbable que redoutable.",
      "Inspirée des figures de Bonnie & Clyde et de Natural Born Killers, Lucia est le moteur émotionnel du duo. C'est souvent elle qui pousse à l'action quand Jason hésite, et qui maintient la pression quand les choses se compliquent.",
    ],
    personnalite: "Impulsive et passionnée, Lucia compense ce que Jason manque en énergie brute. Sa détermination sans failles et son refus du déterminisme social en font l'un des personnages les plus complexes et attachants de toute la franchise. Elle n'attend pas la permission pour agir.",
    traits: ['Impulsive', 'Déterminée', 'Courageuse', 'Ambitieuse', '1ère femme jouable GTA'],
    citations: [
      '"On a rien à perdre. Alors autant tout prendre."',
      '"Je suis pas sortie de prison pour rentrer dans le rang."',
    ],
    mediaImages: [
      '/images/gameplay2.jpg', '/images/gameplay1.jpg', '/images/gameplay4.jpg',
      '/images/gameplay3.jpg', '/images/gameplay6.jpg', '/images/gameplay5.jpg',
    ],
  },
]

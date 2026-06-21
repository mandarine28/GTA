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
  // ── PROTAGONISTES JOUABLES ────────────────────────────────────────────────
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

  // ── PERSONNAGES SECONDAIRES ──────────────────────────────────────────────
  {
    slug: 'brian-heder',
    name: 'Brian Heder',
    role: 'Patron criminel local',
    roleLabel: 'ANTAGONISTE',
    accentColor: '#EF4444',
    coverImage: '/images/gameplay3.jpg',
    gender: 'Homme',
    age: 'La cinquantaine',
    origin: 'Américain (Leonida)',
    lead: "Brian Heder est un vétéran de la pègre locale de Leonida. Il emploie Jason à sa sortie de prison, lui offrant un toit en échange de « services » — racket, collecte de dettes, intimidation. Un boss de quartier qui n'a pas vu venir la menace que représente le duo Lucia-Jason.",
    histoire: [
      "Brian Heder s'est construit une position confortable dans l'écosystème criminel du comté de Leonida : ni assez gros pour attirer l'attention des cartels, ni assez petit pour se faire écraser. Il gère ses affaires avec un pragmatisme froid et une connaissance intime du terrain.",
      "Quand Jason sort de prison, Heder lui offre une planche de salut — logement, cash, protection. En échange, Jason travaille pour lui. Cette relation de dépendance convient à Heder : il préfère les hommes redevables aux associés.",
      "L'arrivée de Lucia Caminos dans la vie de Jason va rompre cet équilibre. Heder perçoit rapidement la menace que représente ce duo qui cherche à s'émanciper, et les deux anciens employés deviennent une épine dans son pied — puis un vrai problème.",
    ],
    personnalite: "Heder est le type de criminel qui a survécu en restant dans l'ombre. Patient, rancunier et calculateur, il n'affronte jamais ses ennemis frontalement quand il peut envoyer d'autres à sa place. Sa médiocrité assumée est sa principale force — et sa limite.",
    traits: ['Manipulateur', 'Rancunier', 'Prudent', 'Opportuniste', 'Territorial'],
    citations: [
      '"T\'es chez moi, tu fais ce que je dis. C\'est simple."',
      '"J\'ai mis des années à construire ça. Personne vient le détruire."',
    ],
    mediaImages: [
      '/images/gameplay3.jpg', '/images/gameplay5.jpg', '/images/gameplay1.jpg',
      '/images/gameplay6.jpg', '/images/gameplay2.jpg', '/images/gameplay4.jpg',
    ],
  },
  {
    slug: 'cal-hampton',
    name: 'Cal Hampton',
    role: 'Shérif du comté',
    roleLabel: 'ANTAGONISTE',
    accentColor: '#3B82F6',
    coverImage: '/images/gameplay5.jpg',
    gender: 'Homme',
    age: 'La cinquantaine',
    origin: 'Américain (Leonida)',
    lead: "Cal Hampton est le shérif du comté de Leonida — un homme de loi à l'ancienne, corrompu jusqu'à l'os mais suffisamment malin pour garder les apparences. Il représente l'obstacle légal principal pour Jason et Lucia, tout en entretenant ses propres arrangements avec la pègre locale.",
    histoire: [
      "Hampton a passé trente ans dans les forces de l'ordre du comté de Leonida. Il connaît chaque racket, chaque réseau, chaque visage de la pègre locale — non pas pour les combattre, mais pour négocier sa propre part avec eux. Une corruption discrète et bien huilée.",
      "Sa relation avec Brian Heder est ancienne : Heder paie, Hampton ferme les yeux. Un équilibre qui a bien fonctionné jusqu'à ce que Jason et Lucia commencent à court-circuiter les opérations de Heder, perturbant l'écosystème soigneusement entretenu par le shérif.",
      "Face au duo, Hampton oscille entre la menace directe et la manipulation. Il préférerait les instrumentaliser plutôt que de les arrêter — des atouts potentiels contre les structures criminelles plus importantes qui commencent à empiéter sur son territoire.",
    ],
    personnalite: "Hampton incarne la corruption systémique à l'état pur : un homme qui a depuis longtemps abandonné toute notion de justice au profit de la survie institutionnelle. Cynique, pragmatique, il n'est jamais vraiment ennemi ni vraiment allié — juste intéressé.",
    traits: ['Corrompu', 'Cynique', 'Pragmatique', 'Autoritaire', 'Hypocrite'],
    citations: [
      '"Dans ce comté, c\'est moi qui décide ce qui est légal."',
      '"Je vous arrête pas, je vous surveille. C\'est différent."',
    ],
    mediaImages: [
      '/images/gameplay5.jpg', '/images/gameplay3.jpg', '/images/gameplay6.jpg',
      '/images/gameplay1.jpg', '/images/gameplay4.jpg', '/images/gameplay2.jpg',
    ],
  },
  {
    slug: 'boobie-ike',
    name: 'Boobie Ike',
    role: 'Partenaire et mentor',
    roleLabel: 'ALLIÉ',
    accentColor: '#10B981',
    coverImage: '/images/gameplay4.jpg',
    gender: 'Homme',
    age: 'La quarantaine',
    origin: 'Américain (Vice City)',
    lead: "Boobie Ike est une figure de Vice City : un opérateur mi-businessman mi-criminel qui connaît tout le monde et à qui tout le monde doit quelque chose. Pour Jason et Lucia, il sera tour à tour mentor, fournisseur de contacts et partenaire inattendu dans les coups les plus risqués.",
    histoire: [
      "Boobie Ike a grandi dans les quartiers difficiles de Vice City et s'en est sorti à sa manière : pas en fuyant la criminalité, mais en la domestiquant. Aujourd'hui, il gère plusieurs activités en façade légale et une demi-douzaine d'opérations souterraines, le tout avec un sourire et une discrétion remarquable.",
      "Sa rencontre avec Lucia remonte à l'époque où celle-ci était encore mineure — Boobie Ike l'a aidée sans rien demander en retour, et elle n'a jamais oublié. Quand le duo a besoin de contacts, de planques ou d'informations sur Vice City, c'est vers lui qu'ils se tournent en premier.",
      "Boobie Ike navigue dans les eaux troubles entre deux mondes sans jamais se mouiller vraiment — un équilibre qu'il a mis des années à atteindre et qu'il n'a aucune intention de sacrifier pour Jason et Lucia, à moins que les enjeux ne le justifient vraiment.",
    ],
    personnalite: "Charismatique et pragmatique, Boobie Ike est un survivant né. Son humour apparent cache une intelligence redoutable et une capacité à lire les situations avec une précision chirurgicale. Il sait exactement quand s'impliquer et quand disparaître.",
    traits: ['Charismatique', 'Rusé', 'Fiable', 'Ambigu', 'Survivant'],
    citations: [
      '"Je tiens pas à savoir les détails. Résultats seulement."',
      '"Dans cette ville, tout le monde a un prix. Moi j\'ai juste un tarif plus haut."',
    ],
    mediaImages: [
      '/images/gameplay4.jpg', '/images/gameplay6.jpg', '/images/gameplay2.jpg',
      '/images/gameplay5.jpg', '/images/gameplay1.jpg', '/images/gameplay3.jpg',
    ],
  },
  {
    slug: 'darnel-jones',
    name: 'Darnel Jones',
    role: 'Chef d\'organisation criminelle',
    roleLabel: 'ANTAGONISTE',
    accentColor: '#F97316',
    coverImage: '/images/gameplay6.jpg',
    gender: 'Homme',
    age: 'La quarantaine',
    origin: 'Américain (Vice City)',
    lead: "Darnel Jones contrôle une large partie du trafic de drogue dans les quartiers nord de Vice City. Ambitieux et imprévisible, il représente une menace d'une autre envergure que les petits opérateurs locaux — et un obstacle incontournable pour quiconque veut monter en puissance dans Leonida.",
    histoire: [
      "Darnel Jones a construit son empire en éliminant systématiquement la concurrence dans les quartiers nord de Port Gellhorn. Là où d'autres criminels jouent sur la discrétion, Jones joue sur la peur — une réputation de violence calculée qui lui évite la majorité des conflits.",
      "Son organisation est structurée, disciplinée, et possède des connexions remontant jusqu'aux cartels mexicains qui approvisionnent Leonida. Ce n'est pas un criminel de quartier : c'est un businessman qui a simplement choisi le marché noir comme secteur d'activité.",
      "Jason et Lucia entreront inévitablement dans son orbite à mesure qu'ils montent en puissance. Darnel Jones ne tolère pas les indépendants sur son territoire — soit ils travaillent pour lui, soit ils disparaissent.",
    ],
    personnalite: "Jones est tout en contrôle — ses émotions, ses informations, ses hommes. La colère chez lui n'est jamais une perte de contrôle mais un outil délibéré. Ce calme apparent est sa caractéristique la plus intimidante : on ne sait jamais exactement ce qu'il pense ni ce qu'il va faire.",
    traits: ['Impitoyable', 'Méthodique', 'Ambitieux', 'Intimidant', 'Stratège'],
    citations: [
      '"Je fais pas de menaces. Je fais des promesses."',
      '"Tout ce qui se passe dans cette ville, ça me concerne."',
    ],
    mediaImages: [
      '/images/gameplay6.jpg', '/images/gameplay1.jpg', '/images/gameplay4.jpg',
      '/images/gameplay3.jpg', '/images/gameplay5.jpg', '/images/gameplay2.jpg',
    ],
  },
  {
    slug: 'agent-rick-sanchez',
    name: 'Agent Rick Sanchez',
    role: 'Agent fédéral',
    roleLabel: 'ANTAGONISTE',
    accentColor: '#6366F1',
    coverImage: '/images/gameplay1.jpg',
    gender: 'Homme',
    age: 'La quarantaine',
    origin: 'Américain (Federal)',
    lead: "Rick Sanchez est un agent fédéral obsédé par la démantèlement des réseaux criminels de Leonida. Brillant et sans scrupule quand il s'agit d'obtenir des résultats, il représente la pression légale permanente sur Jason et Lucia — toujours un coup d'avance, jamais vraiment hors de portée.",
    histoire: [
      "Sanchez a consacré sa carrière à infiltrer et détruire les organisations criminelles de Floride. Ses résultats sont indéniables — plusieurs réseaux démantelés, des dizaines de condamnations. Mais ses méthodes ont plusieurs fois frôlé la ligne rouge, lui valant des plaintes classées par sa hiérarchie qui a besoin de ses résultats.",
      "Il repère Jason et Lucia comme des opérateurs potentiellement utiles : ni assez importants pour mériter une arrestation immédiate, ni assez anodins pour être ignorés. L'idée de les utiliser comme indics contre des cibles plus importantes lui trotte dans la tête depuis leur premier contact.",
      "La tension entre Sanchez et le duo est permanente : il les surveille, les menace, et parfois leur offre des arrangements qui ressemblent plus à du chantage qu'à une vraie coopération. Impossible de savoir s'il est un obstacle, un atout, ou les deux à la fois.",
    ],
    personnalite: "Sanchez a les qualités et les défauts de ceux qui ne voient que l'objectif : brillant dans son domaine, il est aussi prêt à sacrifier l'éthique pour un résultat. Sa conviction d'agir pour le bien supérieur lui permet de dormir la nuit malgré ses méthodes douteuses.",
    traits: ['Obsessionnel', 'Brillant', 'Manipulateur', 'Déterminé', 'Ambigu'],
    citations: [
      '"Je vous lâche pas. Jamais. C\'est juste une question de temps."',
      '"Travaillez avec moi et tout ça disparaît. Refusez, et ça empire."',
    ],
    mediaImages: [
      '/images/gameplay1.jpg', '/images/gameplay3.jpg', '/images/gameplay5.jpg',
      '/images/gameplay2.jpg', '/images/gameplay6.jpg', '/images/gameplay4.jpg',
    ],
  },
  {
    slug: 'ramirez',
    name: 'Ramirez',
    role: 'Contacts cartel & fournisseur',
    roleLabel: 'ALLIÉ',
    accentColor: '#EC4899',
    coverImage: '/images/gameplay2.jpg',
    gender: 'Femme',
    age: 'La trentaine',
    origin: 'Américaine (origine mexicaine)',
    lead: "Ramirez est l'interface entre les cartels mexicains et les réseaux de Vice City. Ni vraiment amie ni vraiment ennemie de Jason et Lucia, elle leur ouvre des portes que personne d'autre ne pourrait ouvrir — moyennant toujours quelque chose en retour.",
    histoire: [
      "Née à la frontière des deux mondes — le légal et l'illégal — Ramirez a grandi entre Vice City et Tijuana, apprenant très tôt à naviguer dans des espaces où la violence est un langage courant. Elle a rapidement compris que le vrai pouvoir était dans les connexions, pas dans les armes.",
      "Aujourd'hui, elle sert d'intermédiaire entre plusieurs organisations criminelles majeures et les opérateurs locaux de Leonida. Son nom n'apparaît dans aucun dossier judiciaire — une longévité qui témoigne autant de son intelligence que de sa capacité à disparaître quand les situations se compliquent.",
      "Sa relation avec Lucia est complexe : une admiration mutuelle entre deux femmes qui ont dû prouver deux fois plus pour être prises au sérieux dans un milieu masculin. Mais Ramirez ne fait jamais rien gratuitement, et Lucia le sait.",
    ],
    personnalite: "Élégante, pragmatique, et dangereuse à sous-estimer. Ramirez donne l'impression de toujours avoir une longueur d'avance sur tout le monde — et c'est généralement vrai. Sa loyauté va à ses propres intérêts, mais elle tient ses promesses quand elle en fait.",
    traits: ['Mystérieuse', 'Connectée', 'Pragmatique', 'Imprévisible', 'Ambitieuse'],
    citations: [
      '"Je vous ouvre cette porte. Ce qu\'il y a derrière, c\'est votre problème."',
      '"Les alliances dans ce milieu durent exactement le temps qu\'elles sont utiles."',
    ],
    mediaImages: [
      '/images/gameplay2.jpg', '/images/gameplay4.jpg', '/images/gameplay6.jpg',
      '/images/gameplay1.jpg', '/images/gameplay3.jpg', '/images/gameplay5.jpg',
    ],
  },
]

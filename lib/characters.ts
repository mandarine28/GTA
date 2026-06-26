export const roleLabelStyle: Record<string, { color: string; bg: string; border: string }> = {
  'JOUABLE':    { color: '#F0C040', bg: 'rgba(240,192,64,0.15)',  border: 'rgba(240,192,64,0.35)' },
  'ANTAGONISTE':{ color: '#EF4444', bg: 'rgba(239,68,68,0.15)',   border: 'rgba(239,68,68,0.35)'  },
  'ALLIÉ':      { color: '#22c55e', bg: 'rgba(34,197,94,0.15)',   border: 'rgba(34,197,94,0.35)'  },
}

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
    coverImage: '/images/characters/jason-duval.png',
    gender: 'Homme',
    age: 'La trentaine',
    origin: 'Américain (Sud des États-Unis)',
    lead: "Jason rêve d'une vie facile, mais les choses semblent se compliquer de jour en jour. Il travaille pour des trafiquants locaux dans les Keys — et il commence à se dire qu'il est peut-être temps de passer à autre chose.",
    histoire: [
      "Jason a grandi au milieu d'arnaqueurs et d'escrocs. Pour tenter de tirer un trait sur son adolescence chaotique, il s'est engagé dans l'armée — une parenthèse qui n'a pas vraiment changé la donne.",
      "De retour dans les Keys, il fait ce qu'il sait faire de mieux : bosser pour des trafiquants de drogues locaux. Brian Heder lui offre le gîte dans l'une de ses propriétés en échange de quelques services — extorsions, livraisons, sale boulot.",
      "Sa rencontre avec Lucia Caminos à sa sortie du pénitencier de Leonida va tout faire basculer. Ensemble, ils décident de s'affranchir de leurs employeurs et de monter leurs propres coups à travers le comté de Leonida.",
    ],
    personnalite: "Jason est posé, stratégique, et préfère réfléchir avant d'agir. Sa loyauté envers Lucia est le fil conducteur de sa personnalité — et ce qui le distingue des protagonistes précédents de la franchise.",
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
    coverImage: '/images/characters/lucia-caminos.png',
    gender: 'Femme',
    age: 'La trentaine',
    origin: 'Américaine (origine hispanique)',
    lead: "Le père de Lucia lui a appris à se battre dès qu'elle a pu marcher. Depuis, la vie n'a pas été tendre avec elle — et la moindre erreur peut lui coûter cher.",
    histoire: [
      "Lucia a grandi dans la dureté. Son père lui a appris à se défendre avant tout le reste. Alors qu'elle luttait pour s'occuper de sa famille, elle s'est retrouvée au pénitencier de Leonida. Elle ne doit sa sortie qu'à la chance.",
      "À sa libération, c'est Jason Duval qui vient la chercher. Lucia a retenu la leçon de la prison : chaque erreur a un prix. Mais ça ne l'empêche pas d'être déterminée à prendre son destin en main.",
      "Lucia est le moteur émotionnel du duo. C'est souvent elle qui pousse à l'action quand Jason hésite — et qui maintient la pression quand les choses se compliquent. Première femme protagoniste jouable de la franchise GTA.",
    ],
    personnalite: "Déterminée et impulsive, Lucia refuse d'accepter les limites qu'on lui impose. Sa capacité à encaisser et à rebondir — forgée par une enfance difficile et un passage en prison — en fait l'un des personnages les plus complexes de toute la franchise.",
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
    role: 'Trafiquant & employeur de Jason',
    roleLabel: 'ALLIÉ',
    accentColor: '#EF4444',
    coverImage: '/images/characters/brian-heder.png',
    gender: 'Homme',
    age: 'La cinquantaine',
    origin: 'Américain (Leonida / les Keys)',
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
    role: 'Ami de Jason & associé de Brian',
    roleLabel: 'ALLIÉ',
    accentColor: '#3B82F6',
    coverImage: '/images/characters/cal-hampton.png',
    gender: 'Homme',
    age: 'Indéterminé',
    origin: 'Américain (Leonida)',
    lead: "Cal préfère rester en sécurité chez lui, à intercepter les communications des gardes-côtes avec quelques bières et autant d'onglets de navigation privée. Et si tout ce qu'on trouvait sur Internet était vrai ?",
    histoire: [
      "Cal est l'ami de Jason et un autre associé de Brian Heder. Il se situe au bas de l'échelle de l'Amérique — et il s'en accommode très bien. Pas d'ambition démesurée, pas de grands projets : juste lui, ses bières, et ses théories.",
      "Sa paranoïa est devenue une sorte de système de surveillance amateur. Depuis chez lui, Cal intercepte les communications des gardes-côtes et traque tout ce que les gouvernements ne veulent pas que les gens sachent. Pour lui, ce sont bien les psychopathes qui commandent.",
      "Il ne demande qu'à transmettre sa paranoïa occasionnelle à son ami Jason — mais ce dernier a d'autres projets en tête. Cal reste en retrait, utile à sa façon, sans jamais vraiment chercher les ennuis.",
    ],
    personnalite: "Passif, paranoïaque et attachant malgré lui. Cal ne fait pas de bruit, ne cherche pas les conflits, et préfère la compagnie de ses théories du complot à celle des gens. Un allié improbable, mais sincère à sa façon.",
    traits: ['Paranoïaque', 'Passif', 'Loyal', 'Discret', 'Complotiste'],
    citations: [
      '"Et si tout ce qu\'on trouvait sur Internet était vrai ?"',
      '"Ce sont les psychopathes qui commandent. Il faut faire avec."',
    ],
    mediaImages: [
      '/images/gameplay5.jpg', '/images/gameplay3.jpg', '/images/gameplay6.jpg',
      '/images/gameplay1.jpg', '/images/gameplay4.jpg', '/images/gameplay2.jpg',
    ],
  },
  {
    slug: 'boobie-ike',
    name: 'Boobie Ike',
    role: 'Légende de Vice City & entrepreneur',
    roleLabel: 'ALLIÉ',
    accentColor: '#10B981',
    coverImage: '/images/characters/boobie-ike.png',
    gender: 'Homme',
    age: 'Indéterminé',
    origin: 'Américain (Vice City)',
    lead: "Boobie est une véritable légende de Vice City, et il le sait très bien. Il est l'un des seuls à avoir transformé son activité criminelle en un véritable empire légal : immobilier, club de strip-tease, studio d'enregistrement. Boobie a toujours le sourire, sauf quand il parle affaires.",
    histoire: [
      "Boobie Ike a bâti son empire à la force du poignet, en transformant chaque activité douteuse en business légal. Aujourd'hui, son empire comprend des biens immobiliers, un club de strip-tease — le Jack of Hearts — et un studio d'enregistrement à Vice City.",
      "C'est son partenariat avec le jeune magnat de la musique Dre'Quan Priest et leur label Only Raw Records qui accapare le plus son attention. Tout ce qu'il leur faut, c'est un hit. Il a déjà les infrastructures — il ne manque que le son.",
      "Boobie a peut-être l'air individualiste, mais il sait exactement quand s'impliquer. Pour Jason et Lucia, il sera tour à tour contact, fournisseur d'informations, et allié dans les moments qui comptent — toujours avec ce sourire qui ne disparaît que quand il parle affaires.",
    ],
    personnalite: "Charismatique et pragmatique, Boobie Ike est un survivant né qui a su se réinventer. Son humour apparent cache une intelligence redoutable et une capacité à lire les situations avec précision. Il sait exactement quand s'impliquer et quand disparaître.",
    traits: ['Charismatique', 'Rusé', 'Entrepreneur', 'Pragmatique', 'Survivant'],
    citations: [
      '"La qualité avant tout."',
      '"Boobie a toujours le sourire, sauf quand il parle affaires."',
    ],
    mediaImages: [
      '/images/gameplay4.jpg', '/images/gameplay6.jpg', '/images/gameplay2.jpg',
      '/images/gameplay5.jpg', '/images/gameplay1.jpg', '/images/gameplay3.jpg',
    ],
  },
  {
    slug: 'drequan-priest',
    name: "Dre'Quan Priest",
    role: 'Manager de label & entrepreneur',
    roleLabel: 'ALLIÉ',
    accentColor: '#F97316',
    coverImage: '/images/characters/drequan-priest.png',
    gender: 'Homme',
    age: 'La vingtaine (né en 1998)',
    origin: 'Américain (Leonida / Vice City)',
    lead: "Dre'Quan Priest est passé de la rue à la scène musicale sans jamais oublier d'où il vient. Manager du label Only Raw Records à Vice City, il incarne l'ambition pure : il a troqué le deal contre le deal artistique, et il entend bien faire de son label la référence de la scène Leonida.",
    histoire: [
      "Dre'Quan a grandi dans les quartiers difficiles de Leonida, où il a appris très tôt les règles non écrites de la survie. Mais contrairement à beaucoup, il a toujours su que la musique était sa vraie vocation — pas les coups fumeux.",
      "Il a commencé en programmant des artistes pour le club de Boobie Ike, apprenant les rouages de l'industrie du divertissement par la pratique. C'est là qu'il a repéré Real Dimez — Bae-Luxe et Roxy — et décidé de les signer sur son propre label.",
      "Aujourd'hui à la tête d'Only Raw Records, Dre'Quan navigue entre le milieu artistique et les réalités moins propres de Vice City. Sa relation avec Jason et Lucia n'est pas de tout repos, mais il reconnaît en eux le même appétit que le sien : monter, coûte que coûte.",
    ],
    personnalite: "Ambitieux, charismatique et toujours trois coups d'avance. Dre'Quan a le bagout d'un vendeur et la vision d'un stratège. Il préfère les résultats aux discours — et les affaires bien menées aux conflits inutiles.",
    traits: ['Ambitieux', 'Charismatique', 'Stratégique', 'Pragmatique', 'Visionnaire'],
    citations: [
      '"Les danseurs sont mes A&Rs. Si le son claque, les DJs vont le passer."',
      '"J\'ai pas quitté la rue pour finir nulle part. On monte, ou on monte."',
    ],
    mediaImages: [
      '/images/gameplay4.jpg', '/images/gameplay2.jpg', '/images/gameplay6.jpg',
      '/images/gameplay1.jpg', '/images/gameplay5.jpg', '/images/gameplay3.jpg',
    ],
  },
  {
    slug: 'bae-luxe',
    name: 'Bae-Luxe',
    role: 'Rappeuse (Real Dimez)',
    roleLabel: 'ALLIÉ',
    accentColor: '#EC4899',
    coverImage: '/images/characters/bae-luxe.png',
    gender: 'Femme',
    age: 'La vingtaine',
    origin: 'Américaine (Vice City)',
    lead: "Bae-Luxe est la moitié du duo Real Dimez avec sa complice Roxy. Venues de la rue, les deux rappeuses ont transformé leur débrouillardise en contenu viral et en hits — une ascension express de la case dealer à la une des playlists de Vice City.",
    histoire: [
      "Bae-Luxe et Roxy se connaissent depuis le lycée. Quand les options légitimes se faisaient rares, elles ont trouvé une façon bien à elles de générer du cash : retourner les petits dealers locaux tout en filmant leurs aventures pour les réseaux sociaux.",
      "Un feat avec le rappeur local DWNPLY a mis le feu aux poudres. La vidéo est devenue virale, et Real Dimez s'est retrouvé sur le radar de Dre'Quan Priest et d'Only Raw Records. Cinq ans et beaucoup d'embrouilles plus tard, elles ont signé leur contrat.",
      "Bae-Luxe est le moteur créatif du duo : elle a le sens du business et l'instinct pour repérer ce qui va cartonner avant tout le monde. Avec Roxy, elles sont à un hit de changer de dimension.",
    ],
    personnalite: "Déterminée, sharp et terriblement consciente de son image. Bae-Luxe ne laisse rien au hasard — ni ses flows, ni ses tenues, ni ses partenariats. Elle sait exactement ce qu'elle vaut et elle n'est pas là pour faire de la figuration.",
    traits: ['Déterminée', 'Créative', 'Ambitieuse', 'Charismatique', 'Stratégique'],
    citations: [
      '"Un seul hit suffit. Un seul."',
      '"Viral videos. Viral hooks. C\'est tout ce qu\'il faut."',
    ],
    mediaImages: [
      '/images/gameplay2.jpg', '/images/gameplay5.jpg', '/images/gameplay1.jpg',
      '/images/gameplay4.jpg', '/images/gameplay3.jpg', '/images/gameplay6.jpg',
    ],
  },
  {
    slug: 'roxy',
    name: 'Roxy',
    role: 'Rappeuse (Real Dimez)',
    roleLabel: 'ALLIÉ',
    accentColor: '#A855F7',
    coverImage: '/images/characters/roxy.png',
    gender: 'Femme',
    age: 'La vingtaine',
    origin: 'Américaine (Vice City)',
    lead: "Roxy forme avec Bae-Luxe le duo Real Dimez — deux rappeuses de Vice City qui ont transformé leurs galères en fuel créatif. Sa voix, son énergie scénique et sa présence en ligne ont fait de Real Dimez l'un des acts les plus prometteurs de Leonida.",
    histoire: [
      "Roxy et Bae-Luxe se sont rencontrées au lycée dans les quartiers de Vice City. Leur complicité naturelle et leur sens du terrain les ont amenées à monter des petites arnaques ensemble avant de canaliser cette énergie dans la musique.",
      "C'est Roxy qui a eu l'idée de filmer leurs aventures pour alimenter les réseaux. Son instinct pour le contenu a donné à Real Dimez son identité : authentique, brute, et toujours au bord du chaos contrôlé.",
      "Depuis la signature chez Only Raw Records, Roxy pousse le duo vers un son plus affirmé. Elle sait que la fenêtre pour percer est courte — et elle compte bien l'exploiter jusqu'au bout.",
    ],
    personnalite: "Spontanée et explosive, Roxy compense ce que Bae-Luxe manque en impulsivité. C'est souvent elle qui fonce quand il faudrait réfléchir — et souvent elle qui crée les moments les plus mémorables du duo. Son énergie brute est sa signature.",
    traits: ['Impulsive', 'Énergique', 'Authentique', 'Créative', 'Loyale'],
    citations: [
      '"On a fait ça à notre façon depuis le début. Pas question de changer maintenant."',
      '"On est à un hit de tout changer."',
    ],
    mediaImages: [
      '/images/gameplay5.jpg', '/images/gameplay3.jpg', '/images/gameplay6.jpg',
      '/images/gameplay2.jpg', '/images/gameplay4.jpg', '/images/gameplay1.jpg',
    ],
  },
  {
    slug: 'raul-bautista',
    name: 'Raul Bautista',
    role: 'Braqueur professionnel',
    roleLabel: 'ALLIÉ',
    accentColor: '#14B8A6',
    coverImage: '/images/characters/raul-bautista.png',
    gender: 'Homme',
    age: 'Indéterminé',
    origin: 'Américain (origine hispanique, Leonida)',
    lead: "Raul Bautista est un braqueur de banques chevronné, toujours à la recherche de nouveaux talents prêts à prendre les risques qui rapportent le plus. Sa rencontre avec Jason et Lucia va ouvrir la voie à des coups d'une tout autre envergure.",
    histoire: [
      "Raul Bautista a passé sa carrière à monter des braquages dans l'État de Leonida. Pas le genre à travailler seul : il construit des équipes, évalue les hommes, et ne s'associe qu'avec ceux qui ont prouvé leur valeur sous pression.",
      "Son approche est à la fois méthodique et délibérément risquée — il croit que les plus grosses récompenses viennent des opérations que tout le monde juge trop dangereuses. Cette philosophie lui a valu autant de succès retentissants que de situations qui ont failli mal tourner.",
      "Sa relation avec Jason et Lucia est celle d'un mentor qui voit en eux un potentiel rare. Mais Bautista pousse toujours plus loin — et ses partenaires doivent être prêts à le suivre, même quand les enjeux deviennent impossibles.",
    ],
    personnalite: "Confiant, charmant et calculateur. Bautista a l'assurance de quelqu'un qui a survécu à des dizaines d'opérations périlleuses — et qui sait que la prochaine sera toujours la plus difficile. Il parle peu, mais quand il parle, ça compte.",
    traits: ['Expérimenté', 'Audacieux', 'Charismatique', 'Calculateur', 'Ambitieux'],
    citations: [
      '"La vie est pleine de surprises, mon ami. On ferait bien de s\'en souvenir."',
      '"Les plus grosses récompenses vont à ceux qui prennent les risques que les autres refusent."',
    ],
    mediaImages: [
      '/images/gameplay6.jpg', '/images/gameplay4.jpg', '/images/gameplay2.jpg',
      '/images/gameplay1.jpg', '/images/gameplay5.jpg', '/images/gameplay3.jpg',
    ],
  },
]

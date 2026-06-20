import { Article, WeeklyUpdate, Vehicle, Weapon } from '@/types'

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'GTA 6 : Rockstar dévoile les nouveaux détails de Vice City',
    slug: 'rockstar-devoile-nouveaux-details-vice-city',
    summary: 'Rockstar Games a partagé de nouvelles informations sur la carte de Vice City, confirmant une taille record pour la franchise.',
    content: `Rockstar Games a officiellement confirmé que Vice City dans GTA 6 sera la plus grande carte jamais créée pour la franchise. Lors d'une présentation aux investisseurs, les développeurs ont détaillé l'ampleur du monde ouvert et les nouvelles technologies qui le font vivre.

Le comté de Leonida, cadre principal du jeu, s'étend sur une surface deux fois supérieure à celle de GTA V. Vice City occupe le centre de cette région : une métropole côtière inspirée de Miami avec ses gratte-ciels, ses plages et ses quartiers contrastés. Les développeurs ont insisté sur la densité verticale du monde, avec des intérieurs accessibles dans la quasi-totalité des bâtiments.

## Une simulation du monde sans précédent

Les PNJ de GTA 6 bénéficient d'un nouveau système comportemental baptisé RAGE-9. Chaque habitant de Vice City possède une routine quotidienne, des relations sociales et des réactions contextuelles à l'environnement. La police suit désormais des protocoles réalistes avant de recourir à la force.

La météo dynamique joue également un rôle majeur. Les ouragans saisonniers peuvent transformer radicalement le paysage urbain : inondations dans les quartiers bas, fermeture de routes, comportement modifié des PNJ. Certaines zones ne sont accessibles qu'à des conditions météorologiques spécifiques.

## Les Everglades, zone à part entière

En dehors de Vice City, les Everglades de Leonida constituent un biome à part entière avec sa faune sauvage, ses campements isolés et ses voies navigables. Rockstar a confirmé que cette zone cache plusieurs missions majeures de la campagne, accessibles uniquement par bateau ou hélicoptère.

La sortie est confirmée pour le 19 novembre 2026 sur PS5 et Xbox Series X|S. La version PC sera annoncée ultérieurement.`,
    source_name: 'Rockstar Newswire',
    source_url: 'https://www.rockstargames.com/newswire',
    category: 'news',
    cover_image: '/images/gameplay1.jpg',
    published_at: '2026-06-18T10:00:00Z',
  },
  {
    id: '2',
    title: 'Patch 1.02 : toutes les corrections et nouveautés',
    slug: 'patch-1-02-corrections-nouveautes',
    summary: 'Le second patch de GTA 6 corrige de nombreux bugs et améliore les performances sur toutes les plateformes.',
    content: `Rockstar a publié le patch 1.02 qui adresse les principaux problèmes signalés par la communauté depuis le lancement du 19 novembre. La mise à jour pèse 4.2 Go sur PS5 et 3.8 Go sur Xbox Series X|S.

## Corrections principales

Le crash systématique lors de l'entrée dans certains appartements personnels a été résolu. Ce bug touchait environ 15% des joueurs selon les rapports de la communauté. Rockstar s'excuse pour la gêne occasionnée et offre 50,000 GTA$ à tous les joueurs affectés.

Les PNJ qui se bloquaient dans la zone de Port Gellhorn Sud se déplacent désormais correctement. Le bug de duplication de récompenses lors de certaines missions VIP a également été corrigé.

## Améliorations de performances

Sur PS5 Pro, le mode Performance atteint désormais un 60 fps stable en toutes circonstances. Sur PS5 standard, des optimisations réduisent les micro-stutters en zone urbaine dense.

La version Xbox Series S reçoit des améliorations de streaming de textures qui réduisent les pop-ins visibles lors des déplacements rapides en véhicule.

## GTA Online

Plusieurs exploits permettant de dupliquer des véhicules en garage ont été colmatés. Le glitch money de session publique reste actif selon les rapports, Rockstar indique le surveiller.`,
    source_name: 'Rockstar Support',
    source_url: 'https://support.rockstargames.com',
    category: 'patch',
    cover_image: '/images/gameplay2.jpg',
    published_at: '2026-06-15T14:00:00Z',
  },
  {
    id: '3',
    title: 'Easter egg découvert : le message secret de Rockstar',
    slug: 'easter-egg-message-secret-rockstar',
    summary: 'Des joueurs ont découvert un easter egg caché dans les montagnes de Vice City renvoyant à GTA San Andreas.',
    content: `La communauté GTA 6 vient de mettre à jour un easter egg particulièrement bien caché dans les hauteurs de Vice City. Après des semaines de fouilles, le collectif de dataminers "VC Secrets" a localisé un message codé gravé dans la roche d'une montagne inaccessible sans hélicoptère.

## Comment le trouver

Le site se trouve à l'est du comté de Leonida, dans la zone montagneuse appelée Leonida Heights. En atterrissant sur le plateau à une altitude d'environ 800 mètres, une formation rocheuse en forme de croix révèle, lors des couchers de soleil uniquement, une série de coordonnées gravées à flanc de falaise.

Ces coordonnées pointent vers les coordonnées réelles de San Andreas dans GTA V, soit une référence directe à l'univers étendu de la franchise.

## Le message décodé

Le texte intégral du message, photographié par les premiers joueurs à le découvrir, indique : "Grove Street. Toujours home." Suivi du numéro de série du véhicule de CJ dans GTA San Andreas.

Rockstar n'a pas encore commenté officiellement la découverte, mais plusieurs développeurs ont liké des tweets en rapport sur les réseaux sociaux, suggérant une validation implicite de l'authenticité de l'easter egg.`,
    source_name: 'GTA6 Hub',
    category: 'easter_egg',
    cover_image: '/images/gameplay3.jpg',
    published_at: '2026-06-14T09:00:00Z',
  },
]

export const mockWeeklyUpdate: WeeklyUpdate = {
  id: '1',
  week_start: '2026-06-17',
  summary: 'Cette semaine : double argent sur les courses de rue, nouveau véhicule en concession et réductions sur les propriétés.',
  vehicles: [
    { name: 'Grotti Turismo Omnis', new: true },
    { name: 'Pegassi Zentorno Classic', discount: 40 },
  ],
  events: [
    {
      name: 'Double argent — Courses de rue',
      description: 'Gagnez 2x les récompenses sur toutes les courses de rue de Vice City.',
      end_date: '2026-06-23',
    },
    {
      name: 'Semaine de l\'aviation',
      description: 'Bonus sur toutes les missions impliquant des aéronefs.',
      end_date: '2026-06-23',
    },
  ],
  bonuses: [
    { name: 'Courses de rue', multiplier: '2x' },
    { name: 'Missions Aviation', multiplier: '1.5x' },
  ],
  new_content: [
    { name: 'Grotti Turismo Omnis', type: 'Véhicule' },
    { name: 'Appartement Oceanview Premium', type: 'Propriété' },
  ],
}

export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    slug: 'grotti-turismo-omnis',
    name: 'Grotti Turismo Omnis',
    category: 'supercar',
    manufacturer: 'Grotti',
    price_online: 1850000,
    top_speed: '340 km/h',
    stats: { speed: 95, acceleration: 88, handling: 82, braking: 79 },
    description: 'La supercar italienne qui redéfinit les standards de Vice City. Inspirée des bolides de la péninsule, elle combine aérodynamisme extrême et motorisation V12 suralimentée pour une expérience de conduite incomparable sur les boulevards de Vice City.',
  },
  {
    id: '2',
    slug: 'pegassi-zentorno-classic',
    name: 'Pegassi Zentorno Classic',
    category: 'supercar',
    manufacturer: 'Pegassi',
    price_online: 2100000,
    top_speed: '355 km/h',
    stats: { speed: 98, acceleration: 91, handling: 85, braking: 83 },
    description: 'Le retour d\'un classique entièrement revu pour GTA 6. La Zentorno Classic reprend les lignes agressives de son prédécesseur en y intégrant une technologie hybride de pointe. La voiture la plus rapide de la catégorie supercar.',
  },
  {
    id: '3',
    slug: 'vapid-dominator-gtx',
    name: 'Vapid Dominator GTX',
    category: 'muscle',
    manufacturer: 'Vapid',
    price_online: 920000,
    top_speed: '295 km/h',
    stats: { speed: 82, acceleration: 79, handling: 68, braking: 71 },
    description: 'La muscle car américaine par excellence, redessinée pour GTA 6. Moteur V8 8,4L atmosphérique, transmission manuelle 6 vitesses et un son d\'échappement qui fait vibrer les vitres. Un classique indémodable du bitume de Leonida.',
  },
]

export const mockWeapons: Weapon[] = [
  {
    id: '1',
    name: 'Pistol Mk III',
    category: 'pistol',
    price: 12000,
    ammo_capacity: 16,
    stats: { damage: 45, fire_rate: 62, accuracy: 70, range: 55, reload_speed: 80 },
    description: 'Le pistolet de base amélioré, fiable et précis.',
  },
  {
    id: '2',
    name: 'Combat MG Mk II',
    category: 'heavy',
    price: 119000,
    ammo_capacity: 100,
    stats: { damage: 85, fire_rate: 90, accuracy: 60, range: 75, reload_speed: 40 },
    description: 'Une mitrailleuse lourde dévastatrice à courte et moyenne portée.',
  },
  {
    id: '3',
    name: 'Sniper Rifle',
    category: 'sniper',
    price: 65000,
    ammo_capacity: 10,
    stats: { damage: 100, fire_rate: 20, accuracy: 98, range: 100, reload_speed: 35 },
    description: 'Précision maximale pour les longues distances.',
  },
]

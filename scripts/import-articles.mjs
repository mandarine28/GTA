#!/usr/bin/env node
// One-shot script: imports test articles into Sanity
// Run: node --env-file=.env.local scripts/import-articles.mjs

import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const articles = [
  {
    id: 'article-gta6-date-sortie',
    title: 'GTA 6 : la date de sortie confirmée pour mai 2026',
    slug: 'gta6-date-sortie-confirmee-mai-2026',
    category: 'news',
    summary: 'Rockstar Games a officiellement confirmé que Grand Theft Auto VI sortira le 26 mai 2026 sur PS5 et Xbox Series X|S. La version PC suivra dans un second temps.',
    content: `Rockstar Games a mis fin aux rumeurs en annonçant officiellement la date de sortie de GTA 6 : le 26 mai 2026 sur PlayStation 5 et Xbox Series X|S.

La firme a communiqué via un court message sur ses réseaux sociaux, accompagné d'une image de Jason et Lucia face au coucher de soleil de Leonida. Pas de nouvelle bande-annonce pour l'instant, mais la confirmation tant attendue.

La version PC n'a pas encore de date officielle. Rockstar a simplement indiqué qu'elle "suivrait dans un second temps", conformément à leur habitude depuis GTA V.

Les précommandes sont ouvertes sur le PlayStation Store et le Microsoft Store. Une édition numérique deluxe incluant des bonus en jeu est également disponible, sans que son contenu ait été détaillé pour le moment.`,
    source_url: 'https://www.rockstargames.com',
    source_name: 'Rockstar Games',
    published_at: '2026-01-15T10:00:00Z',
  },
  {
    id: 'article-trailer2-analyse',
    title: 'Trailer 2 décortiqué : tout ce qu\'on a repéré sur Leonida',
    slug: 'trailer-2-analyse-leonida-details',
    category: 'news',
    summary: 'Le second trailer de GTA 6 regorge de détails sur la map, les personnages et les mécaniques de jeu. On a tout analysé image par image.',
    content: `Le deuxième trailer de Grand Theft Auto VI est sorti et, comme d'habitude avec Rockstar, chaque seconde est chargée d'informations. Voici notre analyse complète.

**La carte de Leonida**

On aperçoit clairement plusieurs zones distinctes : les marécages du nord, le centre urbain de Port Gellhorn, les plages du sud inspirées de Miami Beach, et ce qui ressemble à une zone montagneuse à l'ouest. La map paraît significativement plus grande que celle de GTA V.

**Les personnages**

Jason et Lucia apparaissent dans plusieurs scènes d'action. On voit également Brian Heder lors d'une confrontation dans ce qui ressemble à un entrepôt portuaire. Boobie Ike fait une apparition furtive dans une boîte de nuit.

**Les mécaniques**

Le trailer confirme plusieurs mécaniques inédites : couverture dynamique améliorée, système de réputation visible sur l'interface, et ce qui ressemble à des missions co-op pour Jason et Lucia avec des objectifs distincts.

**Les véhicules**

Plusieurs nouveaux modèles sont visibles, dont un bateau de course, un pick-up modifié, et ce qui semble être une moto électrique futuriste.`,
    source_url: 'https://www.rockstargames.com',
    source_name: 'Rockstar Games',
    published_at: '2026-01-20T14:30:00Z',
  },
  {
    id: 'article-leonida-map-details',
    title: 'Leonida : ce qu\'on sait sur la nouvelle map de GTA 6',
    slug: 'leonida-map-details-gta6',
    category: 'news',
    summary: 'Vice City, les Everglades, les Keys... La carte de GTA 6 s\'annonce comme la plus ambitieuse de la série. Voici tout ce qu\'on sait.',
    content: `Leonida, l'État fictif qui accueillera GTA 6, s'inspire directement de la Floride. Mais Rockstar semble avoir repoussé les limites de ce que la franchise a jamais proposé.

**Vice City**

Le retour de Vice City est confirmé. La ville semble avoir été entièrement repensée pour l'ère moderne : architecture Art Déco, bord de mer animé, quartiers distincts avec leurs ambiances propres. On est loin de la ville de 2002.

**Les Everglades**

Une vaste zone marécageuse occupe le centre-nord de la carte. Végétation dense, faune sauvage (alligators confirmés), et ce qui ressemble à des campements isolés. Une zone idéale pour des missions de fuite ou d'embuscade.

**Les Keys**

Un archipel au sud de la carte, connecté par des routes et des ponts, avec des marinas, des resorts et des îles privées. Parfait pour les missions impliquant des bateaux.

**La taille**

D'après les leaks confirmés partiellement par Rockstar, la map de GTA 6 serait entre 2 et 3 fois plus grande que celle de GTA V. Mais Rockstar a insisté sur la densité plutôt que la superficie brute.`,
    source_url: 'https://rockstargames.com',
    source_name: 'Rockstar Games',
    published_at: '2026-02-03T09:00:00Z',
  },
  {
    id: 'article-patch-notes-beta',
    title: 'Patch notes bêta 1.0.2 : corrections et ajustements',
    slug: 'patch-notes-beta-1-0-2',
    category: 'patch',
    summary: 'Rockstar publie un premier patch pour la bêta fermée. Au programme : corrections de bugs de collision, ajustements de l\'IA des PNJ et améliorations des performances.',
    content: `Rockstar Games vient de déployer la mise à jour 1.0.2 pour les participants à la bêta fermée de GTA 6. Voici le détail des changements.

**Corrections de bugs**
- Correction d'un bug où Jason pouvait traverser certains murs dans le port de Vice City
- Fix d'un crash survenant lors du changement rapide entre Jason et Lucia
- Correction de l'affichage incorrect de la mini-carte dans les zones souterraines
- Les véhicules ne disparaissent plus aléatoirement pendant les missions principales

**IA et PNJ**
- Amélioration du comportement des PNJ en cas d'alarme : réactions plus naturelles et moins téléportées
- Les forces de l'ordre ne se désengagent plus instantanément après une poursuite
- Correction d'un bug où certains PNJ restaient figés après une explosion à proximité

**Performances**
- Optimisation du streaming de la map dans les zones de transition ville/marécages
- Réduction des temps de chargement des missions de 15% en moyenne sur PS5
- Correction de drops de framerate dans les zones très peuplées de Vice City

**Gameplay**
- Ajustement de la sensibilité de la visée automatique (légèrement réduite)
- Correction d'un bug où le système de couverture ne répondait pas après une roulade`,
    source_url: 'https://rockstargames.com',
    source_name: 'Rockstar Games',
    published_at: '2026-02-10T16:00:00Z',
  },
  {
    id: 'article-weekly-update-1',
    title: 'Weekly Update #1 : nouvelles activités et bonus de lancement',
    slug: 'weekly-update-1-activites-bonus-lancement',
    category: 'weekly_update',
    summary: 'Première mise à jour hebdomadaire de GTA Online pour GTA 6 : nouvelles activités, bonus GTA$ et réductions sur les véhicules de la semaine.',
    content: `Bienvenue dans le premier Weekly Update de GTA Online nouvelle génération. Voici ce qui est disponible cette semaine.

**Nouvelles activités**

Deux nouvelles activités font leur apparition dans le mode en ligne :
- *Course de hors-bord* : 8 joueurs s'affrontent sur un circuit dans les Keys. Durée estimée : 12 minutes.
- *Braquage coopératif - Le Casino de Leonida* : nouvelle mission à 4 joueurs avec 3 approches possibles (discret, neutre, bourrin).

**Bonus de la semaine**

- GTA$ et RP x2 sur toutes les missions de braquage
- GTA$ et RP x3 sur les courses nautiques
- 30% de réduction sur les propriétés de bord de mer

**Véhicule podium**

Cette semaine : le Pegassi Infernus Classic. Tentez votre chance sur la roue de la chance au Casino de Leonida.

**Vêtements exclusifs**

Un ensemble de vêtements "Bord de mer" est disponible gratuitement pour tous les joueurs connectés avant le 2 juin. Rendez-vous chez tous les magasins de vêtements de Vice City.`,
    source_url: 'https://rockstargames.com',
    source_name: 'Rockstar Games',
    published_at: '2026-05-27T12:00:00Z',
  },
  {
    id: 'article-easter-egg-cayo-perico',
    title: 'Easter egg : une référence cachée à Cayo Perico découverte',
    slug: 'easter-egg-reference-cayo-perico',
    category: 'easter_egg',
    summary: 'Des joueurs ont découvert une pancarte dans un bar de Vice City qui fait référence à Cayo Perico, l\'île de GTA Online. Un clin d\'œil ou un teaser ?',
    content: `La communauté GTA ne chôme pas. Quelques heures après la sortie du jeu, des joueurs ont déjà repéré un easter egg qui fait référence à Cayo Perico, l'île emblématique de GTA Online.

**La découverte**

Dans le bar "El Rubio's" situé dans le quartier de Little Havana à Vice City, une pancarte au-dessus du bar indique : "Cayo Perico — Propriété privée — Trespassers will be shot". Le nom "El Rubio" est aussi le nom du cartel de GTA Online associé à cette île.

**La théorie**

Deux interprétations circulent sur les forums :

1. Simple clin d'œil des développeurs aux fans de GTA Online, sans implication sur l'histoire
2. Indice que Cayo Perico pourrait apparaître dans des DLC ou dans le mode Online de GTA 6

**La réaction de Rockstar**

Aucune réaction officielle pour l'instant. Rockstar a l'habitude de laisser la communauté interpréter ses easter eggs sans les commenter.

**D'autres références**

Des joueurs signalent également une affiche pour "Vinewood" dans une boutique de souvenirs, et ce qui ressemble à la voiture de CJ dans un musée automobile. La chasse aux références est lancée.`,
    source_url: 'https://gtaforums.com',
    source_name: 'GTAForums',
    published_at: '2026-05-28T18:45:00Z',
  },
  {
    id: 'article-jason-lucia-gameplay',
    title: 'Jouer Jason et Lucia : ce qui change selon le personnage',
    slug: 'jouer-jason-lucia-differences-gameplay',
    category: 'news',
    summary: 'GTA 6 propose deux protagonistes jouables avec des styles de jeu distincts. On détaille ce qui différencie réellement Jason et Lucia en termes de gameplay.',
    content: `GTA 6 marque le retour des protagonistes multiples, mais avec une approche différente de GTA V. Jason et Lucia ne sont pas interchangeables à volonté — leur alternance est liée à la narration. Voici ce qui les distingue.

**Jason Duval**

Jason favorise l'approche calculée. Ses statistiques de base donnent la priorité à la conduite et à la précision au tir. Son arbre de compétences se débloque autour de missions de fuite, de gestion des contacts et de missions de vol de véhicules.

Capacité spéciale : "Sang-froid" — ralentit le temps pendant les fusillades, similaire à Michael dans GTA V mais avec une jauge qui se recharge plus vite.

**Lucia Caminos**

Lucia est plus agressive et physique. Ses statistiques de base privilégient le corps à corps et l'endurance. Son arbre de compétences s'oriente vers des missions d'infiltration, de combat rapproché et d'intimidation.

Capacité spéciale : "Furie" — augmente les dégâts infligés et réduit ceux reçus pendant 15 secondes. Idéale pour les situations désespérées.

**Les missions à deux**

Certaines missions proposent des objectifs parallèles : Jason se charge d'un côté, Lucia de l'autre, avec une synchronisation nécessaire pour le succès. Ces missions sont les plus mémorables du jeu selon les premiers retours.`,
    source_url: 'https://ign.com',
    source_name: 'IGN',
    published_at: '2026-05-26T08:00:00Z',
  },
  {
    id: 'article-vice-city-retour',
    title: 'Vice City en 2026 : comment Rockstar a réinventé la ville',
    slug: 'vice-city-2026-reinvention-rockstar',
    category: 'news',
    summary: 'Vice City est de retour mais entièrement reconstruite. Architecture, ambiance, quartiers... On explore comment Rockstar a modernisé l\'une des villes les plus iconiques du jeu vidéo.',
    content: `Vice City était l'une des villes les plus marquantes de l'histoire du jeu vidéo. En 2026, Rockstar la ressuscite dans GTA 6 — mais entièrement reconstruite de zéro. Le résultat est saisissant.

**L'architecture**

Le Miami Art Déco qui caractérisait l'original est toujours là, mais enrichi d'une strate contemporaine. Les nouveaux gratte-ciels côtoient les bâtiments pastel des années 80 rénovés. L'ensemble crée une ville visuellement cohérente malgré sa diversité.

**Les quartiers**

Vice City 2026 est divisée en plusieurs zones distinctes :

- *Ocean Drive* : la façade iconique, maintenant peuplée de restaurants branchés et d'influenceurs
- *Little Havana* : le quartier historiquement cubain, premier terrain de jeu de Lucia
- *Port Leonida* : le port industriel, QG de nombreux criminels dont Darnel Jones
- *Starfish Island* : les villas des riches, inaccessibles en début de partie
- *Downtown* : le centre d'affaires, où se concentrent les cibles des braquages les plus lucratifs

**L'ambiance**

Rockstar a capturé quelque chose de spécifique : l'excès contemporain de Miami — réseaux sociaux, gentrification, tourisme de masse — superposé à la criminalité endémique. Vice City 2026 est une satire du présent autant qu'un hommage au passé.`,
    source_url: 'https://eurogamer.net',
    source_name: 'Eurogamer',
    published_at: '2026-05-29T11:00:00Z',
  },
]

async function main() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN')
    process.exit(1)
  }

  console.log(`Importing ${articles.length} articles into Sanity...`)

  const transaction = sanity.transaction()

  for (const article of articles) {
    const doc = {
      _type: 'article',
      _id: article.id,
      title: article.title,
      slug: { _type: 'slug', current: article.slug },
      category: article.category,
      summary: article.summary,
      content: article.content,
      cover_image: article.cover_image ?? null,
      source_url: article.source_url,
      source_name: article.source_name,
      published_at: article.published_at,
    }
    transaction.createOrReplace(doc)
    console.log(`  ✓ [${article.category}] ${article.title}`)
  }

  await transaction.commit()
  console.log('\nDone! All articles are now in Sanity.')
}

main()

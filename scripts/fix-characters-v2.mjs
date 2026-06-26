#!/usr/bin/env node
// Patch Jason, Lucia, Cal Hampton, Boobie Ike, Brian Heder in Sanity with corrected data
import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const patches = [
  {
    id: 'character-jason-duval',
    lead: "Jason rêve d'une vie facile, mais les choses semblent se compliquer de jour en jour. Il travaille pour des trafiquants locaux dans les Keys — et il commence à se dire qu'il est peut-être temps de passer à autre chose.",
    histoire: [
      "Jason a grandi au milieu d'arnaqueurs et d'escrocs. Pour tenter de tirer un trait sur son adolescence chaotique, il s'est engagé dans l'armée — une parenthèse qui n'a pas vraiment changé la donne.",
      "De retour dans les Keys, il fait ce qu'il sait faire de mieux : bosser pour des trafiquants de drogues locaux. Brian Heder lui offre le gîte dans l'une de ses propriétés en échange de quelques services — extorsions, livraisons, sale boulot.",
      "Sa rencontre avec Lucia Caminos à sa sortie du pénitencier de Leonida va tout faire basculer. Ensemble, ils décident de s'affranchir de leurs employeurs et de monter leurs propres coups à travers le comté de Leonida.",
    ],
    personnalite: "Jason est posé, stratégique, et préfère réfléchir avant d'agir. Sa loyauté envers Lucia est le fil conducteur de sa personnalité — et ce qui le distingue des protagonistes précédents de la franchise.",
  },
  {
    id: 'character-lucia-caminos',
    lead: "Le père de Lucia lui a appris à se battre dès qu'elle a pu marcher. Depuis, la vie n'a pas été tendre avec elle — et la moindre erreur peut lui coûter cher.",
    histoire: [
      "Lucia a grandi dans la dureté. Son père lui a appris à se défendre avant tout le reste. Alors qu'elle luttait pour s'occuper de sa famille, elle s'est retrouvée au pénitencier de Leonida. Elle ne doit sa sortie qu'à la chance.",
      "À sa libération, c'est Jason Duval qui vient la chercher. Lucia a retenu la leçon de la prison : chaque erreur a un prix. Mais ça ne l'empêche pas d'être déterminée à prendre son destin en main.",
      "Lucia est le moteur émotionnel du duo. C'est souvent elle qui pousse à l'action quand Jason hésite — et qui maintient la pression quand les choses se compliquent. Première femme protagoniste jouable de la franchise GTA.",
    ],
    personnalite: "Déterminée et impulsive, Lucia refuse d'accepter les limites qu'on lui impose. Sa capacité à encaisser et à rebondir — forgée par une enfance difficile et un passage en prison — en fait l'un des personnages les plus complexes de toute la franchise.",
  },
  {
    id: 'character-cal-hampton',
    role: 'Ami de Jason & associé de Brian',
    roleLabel: 'ALLIÉ',
    age: 'Indéterminé',
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
  },
  {
    id: 'character-boobie-ike',
    role: 'Légende de Vice City & entrepreneur',
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
  },
  {
    id: 'character-brian-heder',
    origin: 'Américain (Leonida / les Keys)',
  },
]

async function main() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error('Missing env vars'); process.exit(1)
  }

  for (const p of patches) {
    const { id, ...fields } = p
    await sanity.patch(id).set(fields).commit()
    console.log(`✓ ${id}`)
  }
  console.log('Done.')
}

main()

#!/usr/bin/env node
// One-shot: remove 3 fictional characters, add 4 real confirmed ones
import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const toDelete = ['character-darnel-jones', 'character-agent-rick-sanchez', 'character-ramirez']

const toAdd = [
  {
    slug: 'drequan-priest',
    name: "Dre'Quan Priest",
    role: 'Manager de label & entrepreneur',
    roleLabel: 'ALLIÉ',
    accentColor: '#F97316',
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
    order: 6,
  },
  {
    slug: 'bae-luxe',
    name: 'Bae-Luxe',
    role: 'Rappeuse (Real Dimez)',
    roleLabel: 'ALLIÉ',
    accentColor: '#EC4899',
    gender: 'Femme',
    age: 'La vingtaine',
    origin: 'Américaine (Vice City)',
    lead: "Bae-Luxe est la moitié du duo Real Dimez avec sa complice Roxy. Venues de la rue, les deux rappeuses ont transformé leur débrouillardise en contenu viral et en hits — une ascension express de la case dealer à la une des playlists de Vice City.",
    histoire: [
      "Bae-Luxe et Roxy se connaissent depuis le lycée. Quand les options légitimes se faisaient rares, elles ont trouvé une façon bien à elles de générer du cash : retourner les petits dealers locaux tout en filmant leurs aventures pour les réseaux sociaux.",
      "C'est Roxy qui a eu l'idée de filmer leurs aventures pour alimenter les réseaux. Son instinct pour le contenu a donné à Real Dimez son identité : authentique, brute, et toujours au bord du chaos contrôlé.",
      "Depuis la signature chez Only Raw Records, Bae-Luxe pousse le duo vers un son plus affirmé. Elle sait que la fenêtre pour percer est courte — et elle compte bien l'exploiter jusqu'au bout.",
    ],
    personnalite: "Déterminée, sharp et terriblement consciente de son image. Bae-Luxe ne laisse rien au hasard — ni ses flows, ni ses tenues, ni ses partenariats. Elle sait exactement ce qu'elle vaut et elle n'est pas là pour faire de la figuration.",
    traits: ['Déterminée', 'Créative', 'Ambitieuse', 'Charismatique', 'Stratégique'],
    citations: [
      '"Un seul hit suffit. Un seul."',
      '"Viral videos. Viral hooks. C\'est tout ce qu\'il faut."',
    ],
    order: 7,
  },
  {
    slug: 'roxy',
    name: 'Roxy',
    role: 'Rappeuse (Real Dimez)',
    roleLabel: 'ALLIÉ',
    accentColor: '#A855F7',
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
    order: 8,
  },
  {
    slug: 'raul-bautista',
    name: 'Raul Bautista',
    role: 'Braqueur professionnel',
    roleLabel: 'ALLIÉ',
    accentColor: '#14B8A6',
    gender: 'Homme',
    age: 'Indéterminé',
    origin: 'Américain (origine hispanique, Leonida)',
    lead: "Raul Bautista est un braqueur de banques chevronné, toujours à la recherche de nouveaux talents prêts à prendre les risques qui rapportent le plus. Sa rencontre avec Jason et Lucia va ouvrir la voie à des coups d'une tout autre envergure.",
    histoire: [
      "Raul Bautista a passé sa carrière à monter des braquages dans l'État de Leonida. Pas le genre à travailler seul : il construit des équipes, évalue les hommes, et ne s'associe qu'avec ceux qui ont prouvé leur valeur sous pression.",
      "Son approche est à la fois méthodique et délibérément risquée — il croit que les plus grosses récompenses viennent des opérations que tout le monde juge trop dangereuses.",
      "Sa relation avec Jason et Lucia est celle d'un mentor qui voit en eux un potentiel rare. Mais Bautista pousse toujours plus loin — et ses partenaires doivent être prêts à le suivre, même quand les enjeux deviennent impossibles.",
    ],
    personnalite: "Confiant, charmant et calculateur. Bautista a l'assurance de quelqu'un qui a survécu à des dizaines d'opérations périlleuses. Il parle peu, mais quand il parle, ça compte.",
    traits: ['Expérimenté', 'Audacieux', 'Charismatique', 'Calculateur', 'Ambitieux'],
    citations: [
      '"La vie est pleine de surprises, mon ami. On ferait bien de s\'en souvenir."',
      '"Les plus grosses récompenses vont à ceux qui prennent les risques que les autres refusent."',
    ],
    order: 9,
  },
]

async function main() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error('Missing env vars')
    process.exit(1)
  }

  // Delete fictional characters
  console.log('Deleting fictional characters...')
  const delTx = sanity.transaction()
  for (const id of toDelete) {
    delTx.delete(id)
    console.log(`  ✗ ${id}`)
  }
  await delTx.commit()

  // Add real characters
  console.log('\nAdding real confirmed characters...')
  const addTx = sanity.transaction()
  for (const char of toAdd) {
    addTx.createOrReplace({
      _type: 'character',
      _id: `character-${char.slug}`,
      name: char.name,
      slug: { _type: 'slug', current: char.slug },
      role: char.role,
      roleLabel: char.roleLabel,
      accentColor: char.accentColor,
      gender: char.gender,
      age: char.age,
      origin: char.origin,
      lead: char.lead,
      histoire: char.histoire,
      personnalite: char.personnalite,
      traits: char.traits,
      citations: char.citations,
      order: char.order,
    })
    console.log(`  ✓ ${char.name} (${char.roleLabel})`)
  }
  await addTx.commit()

  console.log('\nDone.')
}

main()

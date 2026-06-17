export const SCENES = [
  "СИРЕНА",
  "ТИТАНА",
  "МАЯК",
  "ДАЧНЫЙ КЛУБ",
  "ЛАМПА",
  "ВАШАНА",
  "АРИЭЛЬ",
  "АРТ-АМБАР",
] as const

export type Scene = (typeof SCENES)[number]

export type Event = {
  id: string
  scene: Scene
  artist: string
  startDate: string
  endDate: string
  image?: string
}

export const SCENE_COLORS: Record<Scene, string> = {
  СИРЕНА: "#E11D48",
  ТИТАНА: "#7C3AED",
  МАЯК: "#0EA5E9",
  "ДАЧНЫЙ КЛУБ": "#22C55E",
  ЛАМПА: "#F59E0B",
  ВАШАНА: "#EC4899",
  АРИЭЛЬ: "#6366F1",
  "АРТ-АМБАР": "#84CC16",
}

export function getSceneColor(scene: Scene): string {
  return SCENE_COLORS[scene]
}

const events: Event[] = [
  // СИРЕНА
  // июнь 19
  { id: "sirena-20260619-1715", scene: "СИРЕНА", artist: "Драгни с оркестром", startDate: "2026-06-19T17:15:00+03:00", endDate: "2026-06-19T18:00:00+03:00", image: "/musician/dragni.webp" },
  { id: "sirena-20260619-1900", scene: "СИРЕНА", artist: "синдром главного героя", startDate: "2026-06-19T19:00:00+03:00", endDate: "2026-06-19T19:45:00+03:00", image: "/musician/sindrom-glavnogo-geroya.webp" },
  { id: "sirena-20260619-2000", scene: "СИРЕНА", artist: "хмыров", startDate: "2026-06-19T20:00:00+03:00", endDate: "2026-06-19T20:45:00+03:00", image: "/musician/hmirov.webp" },
  { id: "sirena-20260619-2100", scene: "СИРЕНА", artist: "IOWA", startDate: "2026-06-19T21:00:00+03:00", endDate: "2026-06-19T21:45:00+03:00", image: "/musician/iowa.webp" },
  { id: "sirena-20260619-2240", scene: "СИРЕНА", artist: "Бонд с кнопкой", startDate: "2026-06-19T22:40:00+03:00", endDate: "2026-06-19T23:25:00+03:00", image: "/musician/bond-s-knopkoy.webp" },
  // июнь 20
  { id: "sirena-20260620-1300", scene: "СИРЕНА", artist: "SOULTYLER", startDate: "2026-06-20T13:00:00+03:00", endDate: "2026-06-20T13:45:00+03:00", image: "/musician/soultyler.webp" },
  { id: "sirena-20260620-1400", scene: "СИРЕНА", artist: "MONOLYT (IL)", startDate: "2026-06-20T14:00:00+03:00", endDate: "2026-06-20T14:45:00+03:00", image: "/musician/monolyt-il.webp" },
  { id: "sirena-20260620-1500", scene: "СИРЕНА", artist: "NOMAD PUNK (KZ)", startDate: "2026-06-20T15:00:00+03:00", endDate: "2026-06-20T15:45:00+03:00", image: "/musician/nomadpunk.webp" },
  { id: "sirena-20260620-1600", scene: "СИРЕНА", artist: "Диктофон", startDate: "2026-06-20T16:00:00+03:00", endDate: "2026-06-20T16:45:00+03:00", image: "/musician/diktofon.webp" },
  { id: "sirena-20260620-1700", scene: "СИРЕНА", artist: "The OM", startDate: "2026-06-20T17:00:00+03:00", endDate: "2026-06-20T17:45:00+03:00", image: "/musician/the-om.webp" },
  { id: "sirena-20260620-1800", scene: "СИРЕНА", artist: "Sula Fray", startDate: "2026-06-20T18:00:00+03:00", endDate: "2026-06-20T18:45:00+03:00", image: "/musician/sula-fray.webp" },
  { id: "sirena-20260620-1900", scene: "СИРЕНА", artist: "Найк Борзов", startDate: "2026-06-20T19:00:00+03:00", endDate: "2026-06-20T19:45:00+03:00", image: "/musician/naik.webp" },
  { id: "sirena-20260620-2000", scene: "СИРЕНА", artist: "TMNV", startDate: "2026-06-20T20:00:00+03:00", endDate: "2026-06-20T20:45:00+03:00", image: "/musician/tmnv.webp" },
  { id: "sirena-20260620-2100", scene: "СИРЕНА", artist: "ЁЛКА", startDate: "2026-06-20T21:00:00+03:00", endDate: "2026-06-20T21:45:00+03:00", image: "/musician/elka.webp" },
  { id: "sirena-20260620-2240", scene: "СИРЕНА", artist: "Танцы Минус", startDate: "2026-06-20T22:40:00+03:00", endDate: "2026-06-20T23:25:00+03:00", image: "/musician/tancyminus.webp" },
  // июнь 21
  { id: "sirena-20260621-1300", scene: "СИРЕНА", artist: "соня хочет танцевать", startDate: "2026-06-21T13:00:00+03:00", endDate: "2026-06-21T13:45:00+03:00", image: "/musician/sonya-hochet-tantsevat.webp" },
  { id: "sirena-20260621-1400", scene: "СИРЕНА", artist: "obraza net", startDate: "2026-06-21T14:00:00+03:00", endDate: "2026-06-21T14:45:00+03:00", image: "/musician/obraza-net.webp" },
  { id: "sirena-20260621-1500", scene: "СИРЕНА", artist: "TRITIA", startDate: "2026-06-21T15:00:00+03:00", endDate: "2026-06-21T15:45:00+03:00", image: "/musician/tritia.webp" },
  { id: "sirena-20260621-1600", scene: "СИРЕНА", artist: "Нейромонах Феофан", startDate: "2026-06-21T16:00:00+03:00", endDate: "2026-06-21T16:45:00+03:00", image: "/musician/neiro.webp" },
  { id: "sirena-20260621-1700", scene: "СИРЕНА", artist: "Drummatix", startDate: "2026-06-21T17:00:00+03:00", endDate: "2026-06-21T17:45:00+03:00", image: "/musician/drummatix.webp" },
  { id: "sirena-20260621-1800", scene: "СИРЕНА", artist: "Гудтаймс", startDate: "2026-06-21T18:00:00+03:00", endDate: "2026-06-21T18:45:00+03:00", image: "/musician/goodtimes.webp" },

  // ТИТАНА
  // июнь 19
  { id: "titana-20260619-1740", scene: "ТИТАНА", artist: "Ткани", startDate: "2026-06-19T17:40:00+03:00", endDate: "2026-06-19T18:25:00+03:00", image: "/musician/tkani.webp" },
  { id: "titana-20260619-1840", scene: "ТИТАНА", artist: "Пальцева Экспириенс", startDate: "2026-06-19T18:40:00+03:00", endDate: "2026-06-19T19:25:00+03:00", image: "/musician/palceva.webp" },
  { id: "titana-20260619-1940", scene: "ТИТАНА", artist: "Sipe", startDate: "2026-06-19T19:40:00+03:00", endDate: "2026-06-19T20:25:00+03:00", image: "/musician/sipe.webp" },
  { id: "titana-20260619-2040", scene: "ТИТАНА", artist: "Рубеж Веков", startDate: "2026-06-19T20:40:00+03:00", endDate: "2026-06-19T21:25:00+03:00", image: "/musician/rubej.webp" },
  { id: "titana-20260619-2150", scene: "ТИТАНА", artist: "токсичный ансамбль лягухо", startDate: "2026-06-19T21:50:00+03:00", endDate: "2026-06-19T22:35:00+03:00", image: "/musician/lyaguho.webp" },
  // июнь 20
  { id: "titana-20260620-0020", scene: "ТИТАНА", artist: "polnalyubvi", startDate: "2026-06-20T00:20:00+03:00", endDate: "2026-06-20T01:05:00+03:00", image: "/musician/polnalyubvi.webp" },
  { id: "titana-20260620-1140", scene: "ТИТАНА", artist: "Друнк", startDate: "2026-06-20T11:40:00+03:00", endDate: "2026-06-20T12:25:00+03:00", image: "/musician/drunk.webp" },
  { id: "titana-20260620-1240", scene: "ТИТАНА", artist: "Каторга", startDate: "2026-06-20T12:40:00+03:00", endDate: "2026-06-20T13:25:00+03:00", image: "/musician/katorga.webp" },
  { id: "titana-20260620-1340", scene: "ТИТАНА", artist: "СТРИО", startDate: "2026-06-20T13:40:00+03:00", endDate: "2026-06-20T14:25:00+03:00", image: "/musician/strio.webp" },
  { id: "titana-20260620-1440", scene: "ТИТАНА", artist: "3.56 ам", startDate: "2026-06-20T14:40:00+03:00", endDate: "2026-06-20T15:25:00+03:00", image: "/musician/ampm.webp" },
  { id: "titana-20260620-1540", scene: "ТИТАНА", artist: "vestfalin", startDate: "2026-06-20T15:40:00+03:00", endDate: "2026-06-20T16:25:00+03:00", image: "/musician/vestfalin.webp" },
  { id: "titana-20260620-1640", scene: "ТИТАНА", artist: "Рушана", startDate: "2026-06-20T16:40:00+03:00", endDate: "2026-06-20T17:25:00+03:00", image: "/musician/rushana.webp" },
  { id: "titana-20260620-1740", scene: "ТИТАНА", artist: "Лолита Косс", startDate: "2026-06-20T17:40:00+03:00", endDate: "2026-06-20T18:25:00+03:00", image: "/musician/lolita-koss.webp" },
  { id: "titana-20260620-1840", scene: "ТИТАНА", artist: "Молодость Внутри", startDate: "2026-06-20T18:40:00+03:00", endDate: "2026-06-20T19:25:00+03:00", image: "/musician/molodost-vnutri.webp" },
  { id: "titana-20260620-1940", scene: "ТИТАНА", artist: "Источник", startDate: "2026-06-20T19:40:00+03:00", endDate: "2026-06-20T20:25:00+03:00", image: "/musician/istochnik.webp" },
  { id: "titana-20260620-2040", scene: "ТИТАНА", artist: "Людмил Огурченко", startDate: "2026-06-20T20:40:00+03:00", endDate: "2026-06-20T21:25:00+03:00", image: "/musician/ludmil-ogurchenko.webp" },
  { id: "titana-20260620-2150", scene: "ТИТАНА", artist: "конец солнечных дней", startDate: "2026-06-20T21:50:00+03:00", endDate: "2026-06-20T22:35:00+03:00", image: "/musician/konec.webp" },
  // июнь 21
  { id: "titana-20260621-0020", scene: "ТИТАНА", artist: "ssshhhiiittt!", startDate: "2026-06-21T00:20:00+03:00", endDate: "2026-06-21T01:05:00+03:00", image: "/musician/shit.webp" },
  { id: "titana-20260621-1220", scene: "ТИТАНА", artist: "Пилс", startDate: "2026-06-21T12:20:00+03:00", endDate: "2026-06-21T13:05:00+03:00", image: "/musician/pils.webp" },
  { id: "titana-20260621-1320", scene: "ТИТАНА", artist: "Гнев господень", startDate: "2026-06-21T13:20:00+03:00", endDate: "2026-06-21T14:05:00+03:00", image: "/musician/gnev.webp" },
  { id: "titana-20260621-1420", scene: "ТИТАНА", artist: "Inna Syberia", startDate: "2026-06-21T14:20:00+03:00", endDate: "2026-06-21T15:05:00+03:00", image: "/musician/innasyberia.webp" },
  { id: "titana-20260621-1520", scene: "ТИТАНА", artist: "Salvador", startDate: "2026-06-21T15:20:00+03:00", endDate: "2026-06-21T16:05:00+03:00", image: "/musician/salvador.webp" },
  { id: "titana-20260621-1620", scene: "ТИТАНА", artist: "Manapart", startDate: "2026-06-21T16:20:00+03:00", endDate: "2026-06-21T17:05:00+03:00", image: "/musician/manapart.webp" },
  { id: "titana-20260621-1720", scene: "ТИТАНА", artist: "ПСИХЕЯ", startDate: "2026-06-21T17:20:00+03:00", endDate: "2026-06-21T18:05:00+03:00", image: "/musician/psikheya.webp" },

  // МАЯК
  // июнь 18
  { id: "mayak-20260618-1900", scene: "МАЯК", artist: "Пахала Дала", startDate: "2026-06-18T19:00:00+03:00", endDate: "2026-06-18T19:45:00+03:00", image: "/musician/pahaladala.webp" },
  { id: "mayak-20260618-2020", scene: "МАЯК", artist: "Tabasco Band", startDate: "2026-06-18T20:20:00+03:00", endDate: "2026-06-18T21:05:00+03:00", image: "/musician/tabasco.webp" },
  { id: "mayak-20260618-2150", scene: "МАЯК", artist: "Утром Удалю", startDate: "2026-06-18T21:50:00+03:00", endDate: "2026-06-18T22:35:00+03:00", image: "/musician/utromudalyu.webp" },
  // июнь 19
  { id: "mayak-20260619-1620", scene: "МАЯК", artist: "Груша", startDate: "2026-06-19T16:20:00+03:00", endDate: "2026-06-19T17:05:00+03:00", image: "/musician/grusha.webp" },
  { id: "mayak-20260619-1720", scene: "МАЯК", artist: "Ночь на кухне", startDate: "2026-06-19T17:20:00+03:00", endDate: "2026-06-19T18:05:00+03:00", image: "/musician/noch-na-kukhne.webp" },
  { id: "mayak-20260619-1820", scene: "МАЯК", artist: "Я Софа", startDate: "2026-06-19T18:20:00+03:00", endDate: "2026-06-19T19:05:00+03:00", image: "/musician/yasofa.webp" },
  { id: "mayak-20260619-1920", scene: "МАЯК", artist: "Шатя", startDate: "2026-06-19T19:20:00+03:00", endDate: "2026-06-19T20:05:00+03:00", image: "/musician/shatya.webp" },
  { id: "mayak-20260619-2020", scene: "МАЯК", artist: "Jazzhouse Trio", startDate: "2026-06-19T20:20:00+03:00", endDate: "2026-06-19T21:05:00+03:00", image: "/musician/jazztrio.webp" },
  { id: "mayak-20260619-2150", scene: "МАЯК", artist: "Илюша", startDate: "2026-06-19T21:50:00+03:00", endDate: "2026-06-19T22:35:00+03:00", image: "/musician/ilusha.webp" },
  // июнь 20
  { id: "mayak-20260620-1120", scene: "МАЯК", artist: "видеокассета твоих родителей", startDate: "2026-06-20T11:20:00+03:00", endDate: "2026-06-20T12:05:00+03:00", image: "/musician/vktr.webp" },
  { id: "mayak-20260620-1220", scene: "МАЯК", artist: "котарды", startDate: "2026-06-20T12:20:00+03:00", endDate: "2026-06-20T13:05:00+03:00", image: "/musician/kotardy.webp" },
  { id: "mayak-20260620-1320", scene: "МАЯК", artist: "маяк", startDate: "2026-06-20T13:20:00+03:00", endDate: "2026-06-20T14:05:00+03:00", image: "/musician/mayak.webp" },
  { id: "mayak-20260620-1420", scene: "МАЯК", artist: "Гулян", startDate: "2026-06-20T14:20:00+03:00", endDate: "2026-06-20T15:05:00+03:00", image: "/musician/gulyan.webp" },
  { id: "mayak-20260620-1520", scene: "МАЯК", artist: "Maria Kon", startDate: "2026-06-20T15:20:00+03:00", endDate: "2026-06-20T16:05:00+03:00", image: "/musician/mariakon.webp" },
  { id: "mayak-20260620-1620", scene: "МАЯК", artist: "Досвидошь", startDate: "2026-06-20T16:20:00+03:00", endDate: "2026-06-20T17:05:00+03:00", image: "/musician/dosvidosh.webp" },
  { id: "mayak-20260620-1720", scene: "МАЯК", artist: "Lemium", startDate: "2026-06-20T17:20:00+03:00", endDate: "2026-06-20T18:05:00+03:00", image: "/musician/lemium.webp" },
  { id: "mayak-20260620-1820", scene: "МАЯК", artist: "Борисовский тракт", startDate: "2026-06-20T18:20:00+03:00", endDate: "2026-06-20T19:05:00+03:00", image: "/musician/boristrakt.webp" },
  { id: "mayak-20260620-1920", scene: "МАЯК", artist: "мама не узнает", startDate: "2026-06-20T19:20:00+03:00", endDate: "2026-06-20T20:05:00+03:00", image: "/musician/mamane.webp" },
  { id: "mayak-20260620-2020", scene: "МАЯК", artist: "The Legendary Flower Punk", startDate: "2026-06-20T20:20:00+03:00", endDate: "2026-06-20T21:05:00+03:00", image: "/musician/tlfp.webp" },
  { id: "mayak-20260620-2150", scene: "МАЯК", artist: "DenDerty", startDate: "2026-06-20T21:50:00+03:00", endDate: "2026-06-20T22:35:00+03:00", image: "/musician/denderty.webp" },
  // июнь 21
  { id: "mayak-20260621-1140", scene: "МАЯК", artist: "Девица", startDate: "2026-06-21T11:40:00+03:00", endDate: "2026-06-21T12:25:00+03:00", image: "/musician/devica.webp" },
  { id: "mayak-20260621-1240", scene: "МАЯК", artist: "Местный Бездарь", startDate: "2026-06-21T12:40:00+03:00", endDate: "2026-06-21T13:25:00+03:00", image: "/musician/mestnyi.webp" },
  { id: "mayak-20260621-1340", scene: "МАЯК", artist: "Ragged Boots", startDate: "2026-06-21T13:40:00+03:00", endDate: "2026-06-21T14:25:00+03:00", image: "/musician/ragged.webp" },
  { id: "mayak-20260621-1440", scene: "МАЯК", artist: "Мелекесс", startDate: "2026-06-21T14:40:00+03:00", endDate: "2026-06-21T15:25:00+03:00", image: "/musician/melekess.webp" },
  { id: "mayak-20260621-1540", scene: "МАЯК", artist: "Дикие Цветы", startDate: "2026-06-21T15:40:00+03:00", endDate: "2026-06-21T16:25:00+03:00", image: "/musician/wildflowers.webp" },
  { id: "mayak-20260621-1640", scene: "МАЯК", artist: "Шлюз", startDate: "2026-06-21T16:40:00+03:00", endDate: "2026-06-21T17:25:00+03:00", image: "/musician/shluz.webp" },
  { id: "mayak-20260621-1800", scene: "МАЯК", artist: "Джинсы Тарковского", startDate: "2026-06-21T18:00:00+03:00", endDate: "2026-06-21T18:45:00+03:00", image: "/musician/tarkovsky.webp" },

  // ДАЧНЫЙ КЛУБ
  // июнь 18
  { id: "dachny-klub-20260618-2300", scene: "ДАЧНЫЙ КЛУБ", artist: "МИЧ", startDate: "2026-06-18T23:00:00+03:00", endDate: "2026-06-18T23:45:00+03:00", image: "/musician/mich.webp" },
  // июнь 19
  { id: "dachny-klub-20260619-0010", scene: "ДАЧНЫЙ КЛУБ", artist: "Lomany Russky", startDate: "2026-06-19T00:10:00+03:00", endDate: "2026-06-19T00:55:00+03:00", image: "/musician/lomany.webp" },
  { id: "dachny-klub-20260619-0130", scene: "ДАЧНЫЙ КЛУБ", artist: "Driada", startDate: "2026-06-19T01:30:00+03:00", endDate: "2026-06-19T02:15:00+03:00", image: "/musician/driada.webp" },
  { id: "dachny-klub-20260619-1600", scene: "ДАЧНЫЙ КЛУБ", artist: "Суперкозлы", startDate: "2026-06-19T16:00:00+03:00", endDate: "2026-06-19T16:45:00+03:00", image: "/musician/superkozly.webp" },
  { id: "dachny-klub-20260619-1800", scene: "ДАЧНЫЙ КЛУБ", artist: "неаринаменя", startDate: "2026-06-19T18:00:00+03:00", endDate: "2026-06-19T18:45:00+03:00", image: "/musician/nearinamenya.webp" },
  { id: "dachny-klub-20260619-2000", scene: "ДАЧНЫЙ КЛУБ", artist: "Ответы внутри!", startDate: "2026-06-19T20:00:00+03:00", endDate: "2026-06-19T20:45:00+03:00", image: "/musician/otvety.webp" },
  { id: "dachny-klub-20260619-2200", scene: "ДАЧНЫЙ КЛУБ", artist: "Black Lama", startDate: "2026-06-19T22:00:00+03:00", endDate: "2026-06-19T22:45:00+03:00", image: "/musician/black-lama.webp" },
  // июнь 20
  { id: "dachny-klub-20260620-0010", scene: "ДАЧНЫЙ КЛУБ", artist: "ParadigmA", startDate: "2026-06-20T00:10:00+03:00", endDate: "2026-06-20T00:55:00+03:00", image: "/musician/paradigma.webp" },
  { id: "dachny-klub-20260620-0130", scene: "ДАЧНЫЙ КЛУБ", artist: "Три вторых", startDate: "2026-06-20T01:30:00+03:00", endDate: "2026-06-20T02:15:00+03:00", image: "/musician/trivtoryh.webp" },
  { id: "dachny-klub-20260620-1400", scene: "ДАЧНЫЙ КЛУБ", artist: "ПАТЛЫ", startDate: "2026-06-20T14:00:00+03:00", endDate: "2026-06-20T14:45:00+03:00", image: "/musician/patly.webp" },
  { id: "dachny-klub-20260620-1600", scene: "ДАЧНЫЙ КЛУБ", artist: "Архитектура", startDate: "2026-06-20T16:00:00+03:00", endDate: "2026-06-20T16:45:00+03:00", image: "/musician/architecture.webp" },
  { id: "dachny-klub-20260620-1800", scene: "ДАЧНЫЙ КЛУБ", artist: "СЕЙЙЕС", startDate: "2026-06-20T18:00:00+03:00", endDate: "2026-06-20T18:45:00+03:00", image: "/musician/sayyes.webp" },
  { id: "dachny-klub-20260620-2000", scene: "ДАЧНЫЙ КЛУБ", artist: "Савеличи", startDate: "2026-06-20T20:00:00+03:00", endDate: "2026-06-20T20:45:00+03:00", image: "/musician/savelichi.webp" },
  { id: "dachny-klub-20260620-2200", scene: "ДАЧНЫЙ КЛУБ", artist: "Питоны 3000", startDate: "2026-06-20T22:00:00+03:00", endDate: "2026-06-20T22:45:00+03:00", image: "/musician/python3000.webp" },
  // июнь 21
  { id: "dachny-klub-20260621-0010", scene: "ДАЧНЫЙ КЛУБ", artist: "БРЕЙКПИЛЗ", startDate: "2026-06-21T00:10:00+03:00", endDate: "2026-06-21T00:55:00+03:00", image: "/musician/breikpillz.webp" },
  { id: "dachny-klub-20260621-0130", scene: "ДАЧНЫЙ КЛУБ", artist: "Крими Край", startDate: "2026-06-21T01:30:00+03:00", endDate: "2026-06-21T02:15:00+03:00", image: "/musician/creemecry.webp" },
  { id: "dachny-klub-20260621-1200", scene: "ДАЧНЫЙ КЛУБ", artist: "Солнечно Дождливо", startDate: "2026-06-21T12:00:00+03:00", endDate: "2026-06-21T12:45:00+03:00", image: "/musician/solnechno.webp" },
  { id: "dachny-klub-20260621-1400", scene: "ДАЧНЫЙ КЛУБ", artist: "VODOPADY", startDate: "2026-06-21T14:00:00+03:00", endDate: "2026-06-21T14:45:00+03:00", image: "/musician/vdpdy.webp" },
  { id: "dachny-klub-20260621-1600", scene: "ДАЧНЫЙ КЛУБ", artist: "Хвоя", startDate: "2026-06-21T16:00:00+03:00", endDate: "2026-06-21T16:45:00+03:00", image: "/musician/xvoya.webp" },
  { id: "dachny-klub-20260621-2000", scene: "ДАЧНЫЙ КЛУБ", artist: "Дела Поважнее", startDate: "2026-06-21T20:00:00+03:00", endDate: "2026-06-21T20:45:00+03:00", image: "/musician/delapovazhnee.webp" },

  // ЛАМПА
  // июнь 19
  { id: "lampa-20260619-1700", scene: "ЛАМПА", artist: "Танцевальные мастер-классы от BM1", startDate: "2026-06-19T17:00:00+03:00", endDate: "2026-06-19T21:00:00+03:00" },
  { id: "lampa-20260619-2200", scene: "ЛАМПА", artist: "The Hatters", startDate: "2026-06-19T22:00:00+03:00", endDate: "2026-06-19T22:45:00+03:00", image: "/musician/electronika.webp" },
  { id: "lampa-20260619-2300", scene: "ЛАМПА", artist: "видеокассета твоих родителей", startDate: "2026-06-19T23:00:00+03:00", endDate: "2026-06-19T23:45:00+03:00", image: "/musician/vktr.webp" },
  // июнь 20
  { id: "lampa-20260620-0000", scene: "ЛАМПА", artist: "Драгни", startDate: "2026-06-20T00:00:00+03:00", endDate: "2026-06-20T00:45:00+03:00", image: "/musician/dragni.webp" },
  { id: "lampa-20260620-0100", scene: "ЛАМПА", artist: "Рубеж Веков", startDate: "2026-06-20T01:00:00+03:00", endDate: "2026-06-20T01:45:00+03:00", image: "/musician/rubej.webp" },
  { id: "lampa-20260620-1100", scene: "ЛАМПА", artist: "МартГорит Спектакль «Мечтать»", startDate: "2026-06-20T11:00:00+03:00", endDate: "2026-06-20T11:45:00+03:00", image: "/musician/martgorit.webp" },
  { id: "lampa-20260620-1300", scene: "ЛАМПА", artist: "Свадебные церемонии", startDate: "2026-06-20T13:00:00+03:00", endDate: "2026-06-20T13:45:00+03:00" },
  { id: "lampa-20260620-1500", scene: "ЛАМПА", artist: "Творческая встреча", startDate: "2026-06-20T15:00:00+03:00", endDate: "2026-06-20T15:45:00+03:00" },
  { id: "lampa-20260620-1700", scene: "ЛАМПА", artist: "Танцевальные мастер-классы от BM1", startDate: "2026-06-20T17:00:00+03:00", endDate: "2026-06-20T21:00:00+03:00" },
  { id: "lampa-20260620-2200", scene: "ЛАМПА", artist: "SOULTYLER", startDate: "2026-06-20T22:00:00+03:00", endDate: "2026-06-20T22:45:00+03:00", image: "/musician/soultyler.webp" },
  { id: "lampa-20260620-2300", scene: "ЛАМПА", artist: "ищикосьеву", startDate: "2026-06-20T23:00:00+03:00", endDate: "2026-06-20T23:45:00+03:00" },
  // июнь 21
  { id: "lampa-20260621-0000", scene: "ЛАМПА", artist: "NECHAEV", startDate: "2026-06-21T00:00:00+03:00", endDate: "2026-06-21T00:45:00+03:00" },
  { id: "lampa-20260621-0100", scene: "ЛАМПА", artist: "ROFMAN", startDate: "2026-06-21T01:00:00+03:00", endDate: "2026-06-21T01:45:00+03:00" },
  { id: "lampa-20260621-1100", scene: "ЛАМПА", artist: "Спектакль для детей «Цирк из Чулана!»", startDate: "2026-06-21T11:00:00+03:00", endDate: "2026-06-21T11:45:00+03:00" },
  { id: "lampa-20260621-1500", scene: "ЛАМПА", artist: "Творческая встреча", startDate: "2026-06-21T15:00:00+03:00", endDate: "2026-06-21T15:45:00+03:00" },

  // ВАШАНА
  // июнь 19
  { id: "vashana-20260619-1400", scene: "ВАШАНА", artist: "DJ NOXEN", startDate: "2026-06-19T14:00:00+03:00", endDate: "2026-06-19T14:25:00+03:00" },
  { id: "vashana-20260619-1430", scene: "ВАШАНА", artist: "MARGO", startDate: "2026-06-19T14:30:00+03:00", endDate: "2026-06-19T14:55:00+03:00" },
  { id: "vashana-20260619-1500", scene: "ВАШАНА", artist: "VARCHEV", startDate: "2026-06-19T15:00:00+03:00", endDate: "2026-06-19T15:25:00+03:00" },
  { id: "vashana-20260619-1530", scene: "ВАШАНА", artist: "LUTAYA SELD", startDate: "2026-06-19T15:30:00+03:00", endDate: "2026-06-19T15:55:00+03:00" },
  { id: "vashana-20260619-1600", scene: "ВАШАНА", artist: "AISET", startDate: "2026-06-19T16:00:00+03:00", endDate: "2026-06-19T16:25:00+03:00" },
  { id: "vashana-20260619-1630", scene: "ВАШАНА", artist: "SMARTS", startDate: "2026-06-19T16:30:00+03:00", endDate: "2026-06-19T16:55:00+03:00" },
  { id: "vashana-20260619-1700", scene: "ВАШАНА", artist: "DJ NEDROCK", startDate: "2026-06-19T17:00:00+03:00", endDate: "2026-06-19T17:25:00+03:00" },
  { id: "vashana-20260619-1730", scene: "ВАШАНА", artist: "NOVAX", startDate: "2026-06-19T17:30:00+03:00", endDate: "2026-06-19T17:55:00+03:00" },
  { id: "vashana-20260619-1800", scene: "ВАШАНА", artist: "Банкир МС / OMAKI", startDate: "2026-06-19T18:00:00+03:00", endDate: "2026-06-19T18:25:00+03:00" },
  { id: "vashana-20260619-1830", scene: "ВАШАНА", artist: "GREENISE", startDate: "2026-06-19T18:30:00+03:00", endDate: "2026-06-19T18:55:00+03:00", image: "/musician/greenise.webp" },
  { id: "vashana-20260619-1900", scene: "ВАШАНА", artist: "TANYA ELISEEVA", startDate: "2026-06-19T19:00:00+03:00", endDate: "2026-06-19T19:25:00+03:00" },
  { id: "vashana-20260619-1930", scene: "ВАШАНА", artist: "EVDOKIMOVA", startDate: "2026-06-19T19:30:00+03:00", endDate: "2026-06-19T19:55:00+03:00" },
  { id: "vashana-20260619-2000", scene: "ВАШАНА", artist: "SHUMILOVA", startDate: "2026-06-19T20:00:00+03:00", endDate: "2026-06-19T20:25:00+03:00" },
  { id: "vashana-20260619-2040", scene: "ВАШАНА", artist: "ELLA", startDate: "2026-06-19T20:40:00+03:00", endDate: "2026-06-19T21:05:00+03:00", image: "/musician/ella.webp" },
  { id: "vashana-20260619-2120", scene: "ВАШАНА", artist: "SOFT SKILLA", startDate: "2026-06-19T21:20:00+03:00", endDate: "2026-06-19T21:45:00+03:00", image: "/musician/softskilla.webp" },
  { id: "vashana-20260619-2200", scene: "ВАШАНА", artist: "DJ GROOVE", startDate: "2026-06-19T22:00:00+03:00", endDate: "2026-06-19T22:25:00+03:00", image: "/musician/djgroove.webp" },
  { id: "vashana-20260619-2240", scene: "ВАШАНА", artist: "SAINT RIDER", startDate: "2026-06-19T22:40:00+03:00", endDate: "2026-06-19T23:05:00+03:00", image: "/musician/saintrider.webp" },
  { id: "vashana-20260619-2310", scene: "ВАШАНА", artist: "LIRA", startDate: "2026-06-19T23:10:00+03:00", endDate: "2026-06-19T23:35:00+03:00", image: "/musician/lira.webp" },
  { id: "vashana-20260619-2340", scene: "ВАШАНА", artist: "ANDROID", startDate: "2026-06-19T23:40:00+03:00", endDate: "2026-06-20T00:05:00+03:00", image: "/musician/djandroid.webp" },
  // июнь 20
  { id: "vashana-20260620-1200", scene: "ВАШАНА", artist: "DJ SOLO", startDate: "2026-06-20T12:00:00+03:00", endDate: "2026-06-20T12:25:00+03:00" },
  { id: "vashana-20260620-1230", scene: "ВАШАНА", artist: "AQVILA D.O.", startDate: "2026-06-20T12:30:00+03:00", endDate: "2026-06-20T12:55:00+03:00" },
  { id: "vashana-20260620-1300", scene: "ВАШАНА", artist: "EVGENY OTTO", startDate: "2026-06-20T13:00:00+03:00", endDate: "2026-06-20T13:25:00+03:00" },
  { id: "vashana-20260620-1330", scene: "ВАШАНА", artist: "Pavliashvili David", startDate: "2026-06-20T13:30:00+03:00", endDate: "2026-06-20T13:55:00+03:00" },
  { id: "vashana-20260620-1400", scene: "ВАШАНА", artist: "ETHER", startDate: "2026-06-20T14:00:00+03:00", endDate: "2026-06-20T14:25:00+03:00" },
  { id: "vashana-20260620-1430", scene: "ВАШАНА", artist: "ANNA VANINA", startDate: "2026-06-20T14:30:00+03:00", endDate: "2026-06-20T14:55:00+03:00" },
  { id: "vashana-20260620-1500", scene: "ВАШАНА", artist: "Andry Born", startDate: "2026-06-20T15:00:00+03:00", endDate: "2026-06-20T15:25:00+03:00" },
  { id: "vashana-20260620-1530", scene: "ВАШАНА", artist: "GUMMY LOVE", startDate: "2026-06-20T15:30:00+03:00", endDate: "2026-06-20T15:55:00+03:00" },
  { id: "vashana-20260620-1600", scene: "ВАШАНА", artist: "SANDRA RAVE", startDate: "2026-06-20T16:00:00+03:00", endDate: "2026-06-20T16:25:00+03:00" },
  { id: "vashana-20260620-1630", scene: "ВАШАНА", artist: "R136A1", startDate: "2026-06-20T16:30:00+03:00", endDate: "2026-06-20T16:55:00+03:00", image: "/musician/risi6.webp" },
  { id: "vashana-20260620-1700", scene: "ВАШАНА", artist: "Kos Chello", startDate: "2026-06-20T17:00:00+03:00", endDate: "2026-06-20T17:25:00+03:00" },
  { id: "vashana-20260620-1730", scene: "ВАШАНА", artist: "JONYNITE", startDate: "2026-06-20T17:30:00+03:00", endDate: "2026-06-20T17:55:00+03:00" },
  { id: "vashana-20260620-1800", scene: "ВАШАНА", artist: "IN-GENIUM", startDate: "2026-06-20T18:00:00+03:00", endDate: "2026-06-20T18:25:00+03:00" },
  { id: "vashana-20260620-1830", scene: "ВАШАНА", artist: "Dj Shavo", startDate: "2026-06-20T18:30:00+03:00", endDate: "2026-06-20T18:55:00+03:00" },
  { id: "vashana-20260620-1900", scene: "ВАШАНА", artist: "BEAT SAIBOT", startDate: "2026-06-20T19:00:00+03:00", endDate: "2026-06-20T19:25:00+03:00" },
  { id: "vashana-20260620-1935", scene: "ВАШАНА", artist: "RICKO", startDate: "2026-06-20T19:35:00+03:00", endDate: "2026-06-20T20:00:00+03:00" },
  { id: "vashana-20260620-2005", scene: "ВАШАНА", artist: "SOROKOVA", startDate: "2026-06-20T20:05:00+03:00", endDate: "2026-06-20T20:30:00+03:00", image: "/musician/sorokova.webp" },
  { id: "vashana-20260620-2040", scene: "ВАШАНА", artist: "Dj KATYA ZEMSKAYA", startDate: "2026-06-20T20:40:00+03:00", endDate: "2026-06-20T21:05:00+03:00", image: "/musician/katya.webp" },
  { id: "vashana-20260620-2115", scene: "ВАШАНА", artist: "SPARTAK", startDate: "2026-06-20T21:15:00+03:00", endDate: "2026-06-20T21:40:00+03:00" },
  { id: "vashana-20260620-2150", scene: "ВАШАНА", artist: "Электроника - The Hatters", startDate: "2026-06-20T21:50:00+03:00", endDate: "2026-06-20T22:15:00+03:00", image: "/musician/electronika.webp" },
  { id: "vashana-20260620-2230", scene: "ВАШАНА", artist: "SADRIIL", startDate: "2026-06-20T22:30:00+03:00", endDate: "2026-06-20T22:55:00+03:00", image: "/musician/sadrill.webp" },
  { id: "vashana-20260620-2300", scene: "ВАШАНА", artist: "AKS", startDate: "2026-06-20T23:00:00+03:00", endDate: "2026-06-20T23:25:00+03:00", image: "/musician/djaks.webp" },
  { id: "vashana-20260620-2330", scene: "ВАШАНА", artist: "SOMNIA", startDate: "2026-06-20T23:30:00+03:00", endDate: "2026-06-20T23:55:00+03:00", image: "/musician/somnia.webp" },
  // июнь 21
  { id: "vashana-20260621-1200", scene: "ВАШАНА", artist: "DJ Lyach", startDate: "2026-06-21T12:00:00+03:00", endDate: "2026-06-21T12:25:00+03:00" },
  { id: "vashana-20260621-1230", scene: "ВАШАНА", artist: "DJ PERETSE", startDate: "2026-06-21T12:30:00+03:00", endDate: "2026-06-21T12:55:00+03:00", image: "/musician/djperetse.webp" },
  { id: "vashana-20260621-1300", scene: "ВАШАНА", artist: "Kristina Kossta", startDate: "2026-06-21T13:00:00+03:00", endDate: "2026-06-21T13:25:00+03:00" },
  { id: "vashana-20260621-1330", scene: "ВАШАНА", artist: "ANNA SHIPULINA", startDate: "2026-06-21T13:30:00+03:00", endDate: "2026-06-21T13:55:00+03:00" },
  { id: "vashana-20260621-1400", scene: "ВАШАНА", artist: "M.PRAVDA", startDate: "2026-06-21T14:00:00+03:00", endDate: "2026-06-21T14:25:00+03:00", image: "/musician/mpravda.webp" },
  { id: "vashana-20260621-1430", scene: "ВАШАНА", artist: "TATIANA", startDate: "2026-06-21T14:30:00+03:00", endDate: "2026-06-21T14:55:00+03:00" },
  { id: "vashana-20260621-1500", scene: "ВАШАНА", artist: "AVI", startDate: "2026-06-21T15:00:00+03:00", endDate: "2026-06-21T15:25:00+03:00" },
  { id: "vashana-20260621-1530", scene: "ВАШАНА", artist: "Alyona Axyonova", startDate: "2026-06-21T15:30:00+03:00", endDate: "2026-06-21T15:55:00+03:00", image: "/musician/alyona.webp" },
  { id: "vashana-20260621-1600", scene: "ВАШАНА", artist: "SENSORIA", startDate: "2026-06-21T16:00:00+03:00", endDate: "2026-06-21T16:25:00+03:00" },
  { id: "vashana-20260621-1630", scene: "ВАШАНА", artist: "KRIS_S", startDate: "2026-06-21T16:30:00+03:00", endDate: "2026-06-21T16:55:00+03:00" },
  { id: "vashana-20260621-1700", scene: "ВАШАНА", artist: "DJ BullyGenie", startDate: "2026-06-21T17:00:00+03:00", endDate: "2026-06-21T17:25:00+03:00" },

  // АРИЭЛЬ
  // июнь 19
  { id: "ariel-20260619-1000", scene: "АРИЭЛЬ", artist: "Хела", startDate: "2026-06-19T10:00:00+03:00", endDate: "2026-06-19T10:45:00+03:00" },
  { id: "ariel-20260619-1045", scene: "АРИЭЛЬ", artist: "The Dorothy", startDate: "2026-06-19T10:45:00+03:00", endDate: "2026-06-19T11:30:00+03:00" },
  { id: "ariel-20260619-1130", scene: "АРИЭЛЬ", artist: "Викодин", startDate: "2026-06-19T11:30:00+03:00", endDate: "2026-06-19T12:15:00+03:00" },
  { id: "ariel-20260619-1215", scene: "АРИЭЛЬ", artist: "Атомы", startDate: "2026-06-19T12:15:00+03:00", endDate: "2026-06-19T13:00:00+03:00" },
  { id: "ariel-20260619-1300", scene: "АРИЭЛЬ", artist: "Синхронизация", startDate: "2026-06-19T13:00:00+03:00", endDate: "2026-06-19T13:45:00+03:00" },
  { id: "ariel-20260619-1345", scene: "АРИЭЛЬ", artist: "Хром", startDate: "2026-06-19T13:45:00+03:00", endDate: "2026-06-19T14:30:00+03:00" },
  { id: "ariel-20260619-1430", scene: "АРИЭЛЬ", artist: "Деловой вопрос", startDate: "2026-06-19T14:30:00+03:00", endDate: "2026-06-19T15:15:00+03:00" },
  { id: "ariel-20260619-1515", scene: "АРИЭЛЬ", artist: "Новый звук", startDate: "2026-06-19T15:15:00+03:00", endDate: "2026-06-19T16:00:00+03:00" },
  { id: "ariel-20260619-1600", scene: "АРИЭЛЬ", artist: "Пылинки", startDate: "2026-06-19T16:00:00+03:00", endDate: "2026-06-19T16:45:00+03:00" },
  { id: "ariel-20260619-1645", scene: "АРИЭЛЬ", artist: "Меланхолия под кожей", startDate: "2026-06-19T16:45:00+03:00", endDate: "2026-06-19T17:30:00+03:00" },
  { id: "ariel-20260619-1730", scene: "АРИЭЛЬ", artist: "Мяутеоры", startDate: "2026-06-19T17:30:00+03:00", endDate: "2026-06-19T18:15:00+03:00" },
  { id: "ariel-20260619-1815", scene: "АРИЭЛЬ", artist: "Atomic Fallouts", startDate: "2026-06-19T18:15:00+03:00", endDate: "2026-06-19T19:00:00+03:00" },
  { id: "ariel-20260619-1900", scene: "АРИЭЛЬ", artist: "LXPunk", startDate: "2026-06-19T19:00:00+03:00", endDate: "2026-06-19T19:45:00+03:00" },
  { id: "ariel-20260619-1945", scene: "АРИЭЛЬ", artist: "The Bamboo", startDate: "2026-06-19T19:45:00+03:00", endDate: "2026-06-19T20:30:00+03:00" },
  // июнь 20
  { id: "ariel-20260620-1000", scene: "АРИЭЛЬ", artist: "По Тормозам!", startDate: "2026-06-20T10:00:00+03:00", endDate: "2026-06-20T10:45:00+03:00" },
  { id: "ariel-20260620-1045", scene: "АРИЭЛЬ", artist: "Электрочайник", startDate: "2026-06-20T10:45:00+03:00", endDate: "2026-06-20T11:30:00+03:00" },
  { id: "ariel-20260620-1130", scene: "АРИЭЛЬ", artist: "Нет сети", startDate: "2026-06-20T11:30:00+03:00", endDate: "2026-06-20T12:15:00+03:00" },
  { id: "ariel-20260620-1215", scene: "АРИЭЛЬ", artist: "eto-МЫ!", startDate: "2026-06-20T12:15:00+03:00", endDate: "2026-06-20T13:00:00+03:00" },
  { id: "ariel-20260620-1300", scene: "АРИЭЛЬ", artist: "Воздушная КуКуРуЗа", startDate: "2026-06-20T13:00:00+03:00", endDate: "2026-06-20T13:45:00+03:00" },
  { id: "ariel-20260620-1345", scene: "АРИЭЛЬ", artist: "Sound Waves", startDate: "2026-06-20T13:45:00+03:00", endDate: "2026-06-20T14:30:00+03:00" },
  { id: "ariel-20260620-1430", scene: "АРИЭЛЬ", artist: "БЕЗ ВАРИАНТОВ", startDate: "2026-06-20T14:30:00+03:00", endDate: "2026-06-20T15:15:00+03:00" },
  { id: "ariel-20260620-1515", scene: "АРИЭЛЬ", artist: "Послезавтра", startDate: "2026-06-20T15:15:00+03:00", endDate: "2026-06-20T16:00:00+03:00" },
  { id: "ariel-20260620-1600", scene: "АРИЭЛЬ", artist: "Тигры", startDate: "2026-06-20T16:00:00+03:00", endDate: "2026-06-20T16:45:00+03:00" },
  { id: "ariel-20260620-1645", scene: "АРИЭЛЬ", artist: "БЭНД «ДЭНЗ»", startDate: "2026-06-20T16:45:00+03:00", endDate: "2026-06-20T17:30:00+03:00" },
  { id: "ariel-20260620-1730", scene: "АРИЭЛЬ", artist: "КонFuss", startDate: "2026-06-20T17:30:00+03:00", endDate: "2026-06-20T18:15:00+03:00" },
  { id: "ariel-20260620-1815", scene: "АРИЭЛЬ", artist: "SuperДетки", startDate: "2026-06-20T18:15:00+03:00", endDate: "2026-06-20T19:00:00+03:00" },
  { id: "ariel-20260620-1900", scene: "АРИЭЛЬ", artist: "Не дождётесь", startDate: "2026-06-20T19:00:00+03:00", endDate: "2026-06-20T19:45:00+03:00" },
  { id: "ariel-20260620-1945", scene: "АРИЭЛЬ", artist: "Горизонт событий", startDate: "2026-06-20T19:45:00+03:00", endDate: "2026-06-20T20:30:00+03:00" },
  { id: "ariel-20260620-2030", scene: "АРИЭЛЬ", artist: "The Bumbles", startDate: "2026-06-20T20:30:00+03:00", endDate: "2026-06-20T21:15:00+03:00" },
  { id: "ariel-20260620-2115", scene: "АРИЭЛЬ", artist: "Рок и Точка", startDate: "2026-06-20T21:15:00+03:00", endDate: "2026-06-20T22:00:00+03:00" },
  { id: "ariel-20260620-2200", scene: "АРИЭЛЬ", artist: "Спички", startDate: "2026-06-20T22:00:00+03:00", endDate: "2026-06-20T22:45:00+03:00" },
  // июнь 21
  { id: "ariel-20260621-1000", scene: "АРИЭЛЬ", artist: "Помогите Одри", startDate: "2026-06-21T10:00:00+03:00", endDate: "2026-06-21T10:45:00+03:00" },
  { id: "ariel-20260621-1045", scene: "АРИЭЛЬ", artist: "Децибелки", startDate: "2026-06-21T10:45:00+03:00", endDate: "2026-06-21T11:30:00+03:00" },
  { id: "ariel-20260621-1130", scene: "АРИЭЛЬ", artist: "Конец сезона", startDate: "2026-06-21T11:30:00+03:00", endDate: "2026-06-21T12:15:00+03:00" },
  { id: "ariel-20260621-1215", scene: "АРИЭЛЬ", artist: "Рок-н-блэк", startDate: "2026-06-21T12:15:00+03:00", endDate: "2026-06-21T13:00:00+03:00" },
  { id: "ariel-20260621-1300", scene: "АРИЭЛЬ", artist: "В облаках", startDate: "2026-06-21T13:00:00+03:00", endDate: "2026-06-21T13:45:00+03:00" },
  { id: "ariel-20260621-1345", scene: "АРИЭЛЬ", artist: "VыSTREL", startDate: "2026-06-21T13:45:00+03:00", endDate: "2026-06-21T14:30:00+03:00" },
  { id: "ariel-20260621-1430", scene: "АРИЭЛЬ", artist: "Электра", startDate: "2026-06-21T14:30:00+03:00", endDate: "2026-06-21T15:15:00+03:00" },
  { id: "ariel-20260621-1515", scene: "АРИЭЛЬ", artist: "Всё начиналось с обычного плеера", startDate: "2026-06-21T15:15:00+03:00", endDate: "2026-06-21T16:00:00+03:00" },
  { id: "ariel-20260621-1600", scene: "АРИЭЛЬ", artist: "До Вечера", startDate: "2026-06-21T16:00:00+03:00", endDate: "2026-06-21T16:45:00+03:00" },
  { id: "ariel-20260621-1645", scene: "АРИЭЛЬ", artist: "Искры безумия", startDate: "2026-06-21T16:45:00+03:00", endDate: "2026-06-21T17:30:00+03:00" },
  { id: "ariel-20260621-1730", scene: "АРИЭЛЬ", artist: "Как ты чувствуешь", startDate: "2026-06-21T17:30:00+03:00", endDate: "2026-06-21T18:15:00+03:00" },
  { id: "ariel-20260621-1815", scene: "АРИЭЛЬ", artist: "Метроном", startDate: "2026-06-21T18:15:00+03:00", endDate: "2026-06-21T19:00:00+03:00" },
  { id: "ariel-20260621-1900", scene: "АРИЭЛЬ", artist: "Тигры Синергия", startDate: "2026-06-21T19:00:00+03:00", endDate: "2026-06-21T19:45:00+03:00" },

  // АРТ-АМБАР
  // июнь 19
  { id: "art-ambur-20260619-1200", scene: "АРТ-АМБАР", artist: "Аудиошкола DJ Грува", startDate: "2026-06-19T12:00:00+03:00", endDate: "2026-06-20T00:00:00+03:00" },
  // июнь 20
  { id: "art-ambur-20260620-0000", scene: "АРТ-АМБАР", artist: "Despersion and Friends", startDate: "2026-06-20T00:00:00+03:00", endDate: "2026-06-20T00:45:00+03:00", image: "/musician/despersion.webp" },
  { id: "art-ambur-20260620-1200", scene: "АРТ-АМБАР", artist: "Аудиошкола DJ Грува", startDate: "2026-06-20T12:00:00+03:00", endDate: "2026-06-20T21:30:00+03:00" },
  { id: "art-ambur-20260620-2130", scene: "АРТ-АМБАР", artist: "Lion (SLK)", startDate: "2026-06-20T21:30:00+03:00", endDate: "2026-06-20T22:15:00+03:00" },
  { id: "art-ambur-20260620-2230", scene: "АРТ-АМБАР", artist: "Йоп Шоу", startDate: "2026-06-20T22:30:00+03:00", endDate: "2026-06-20T23:15:00+03:00" },
  // июнь 21
  { id: "art-ambur-20260621-0000", scene: "АРТ-АМБАР", artist: "Asenssia при поддержке Broosnica, Andy Scream и Cry 4 me", startDate: "2026-06-21T00:00:00+03:00", endDate: "2026-06-21T00:45:00+03:00", image: "/musician/asenssia.webp" },

]

export { events }
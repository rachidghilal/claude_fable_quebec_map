import type { CategoryId } from "./categories";

export type MapId = "city" | "oldQuebec";

export type MapPoint = {
  x: number;
  y: number;
};

export type Place = {
  id: string;
  name: string;
  category: CategoryId;
  tagline: string;
  description: string;
  history: string;
  funFact: string;
  practical: {
    neighborhood: string;
    duration: string;
    price: string;
    tip: string;
  };
  essential?: boolean;
  city?: MapPoint;
  oldQuebec?: MapPoint;
};

export const places: Place[] = [
  // ——— Vieux-Québec · Haute-Ville ———
  {
    id: "chateau-frontenac",
    name: "Château Frontenac",
    category: "monuments",
    tagline: "L'hôtel-château emblématique de Québec",
    description:
      "Silhouette emblématique de Québec, ce grand hôtel de style château domine le fleuve du haut du cap Diamant. Ses toits de cuivre vert-de-gris et ses tourelles définissent la carte postale de la ville.",
    history:
      "Inauguré en 1893 par le Canadien Pacifique sur les plans de Bruce Price, il porte le nom de Louis de Buade, comte de Frontenac, gouverneur de la Nouvelle-France. Les conférences de Québec de 1943 et 1944, qui réunirent Churchill et Roosevelt, s'y sont tenues.",
    funFact:
      "Souvent présenté comme l'un des hôtels les plus photographiés au monde, il se visite aussi sans y dormir grâce aux visites guidées.",
    practical: {
      neighborhood: "Vieux-Québec, Haute-Ville",
      duration: "30 à 60 min",
      price: "Extérieur gratuit, visite guidée payante",
      tip: "Le plus beau point de vue sur le château s'obtient depuis le traversier de Lévis ou la terrasse Pierre-Dugua-De-Mons.",
    },
    essential: true,
    city: { x: 978, y: 556 },
    oldQuebec: { x: 1030, y: 430 },
  },
  {
    id: "terrasse-dufferin",
    name: "Terrasse Dufferin",
    category: "panoramas",
    tagline: "Le balcon de Québec sur le fleuve",
    description:
      "Longue promenade de bois au pied du Château Frontenac, suspendue au-dessus du fleuve. Musiciens, kiosques et vues spectaculaires en font le lieu de flânerie par excellence.",
    history:
      "Aménagée en 1879 à l'initiative de Lord Dufferin, gouverneur général, elle repose sur les vestiges des châteaux Saint-Louis, résidences des gouverneurs, dont les fondations se visitent sous la promenade.",
    funFact:
      "Chaque hiver depuis 1884, la glissade « Les Glissades de la Terrasse » propulse les traîneaux à plus de 70 km/h face au fleuve.",
    practical: {
      neighborhood: "Vieux-Québec, Haute-Ville",
      duration: "30 min",
      price: "Gratuit",
      tip: "Venez-y deux fois : en plein jour pour le panorama, puis à la tombée de la nuit quand le château s'illumine.",
    },
    essential: true,
    oldQuebec: { x: 1000, y: 520 },
  },
  {
    id: "citadelle",
    name: "Citadelle de Québec",
    category: "monuments",
    tagline: "La forteresse étoilée du cap Diamant",
    description:
      "Plus grande forteresse britannique d'Amérique du Nord encore occupée par une garnison, la Citadelle déploie son plan en étoile au sommet du cap Diamant. On y visite le musée du Royal 22e Régiment.",
    history:
      "Érigée entre 1820 et 1850 selon les principes de Vauban pour protéger Québec d'une invasion américaine qui ne vint jamais. Elle abrite une résidence officielle du gouverneur général du Canada.",
    funFact:
      "Les cérémonies estivales du Royal 22e Régiment y mettent souvent en vedette Batisse, le bouc mascotte de l'unité.",
    practical: {
      neighborhood: "Vieux-Québec, cap Diamant",
      duration: "1 h 30",
      price: "Visite guidée payante",
      tip: "Arrivez pour la relève de la garde à 10 h en été, puis enchaînez avec la promenade des Gouverneurs.",
    },
    essential: true,
    oldQuebec: { x: 880, y: 640 },
  },
  {
    id: "fortifications",
    name: "Fortifications & portes",
    category: "monuments",
    tagline: "Seule ville fortifiée au nord du Mexique",
    description:
      "Près de 4,6 km de remparts ceinturent encore le Vieux-Québec, ponctués des portes Saint-Louis, Kent, Saint-Jean et Prescott. On peut marcher au sommet des murs pour une visite à ciel ouvert.",
    history:
      "Commencées sous le Régime français et achevées par les Britanniques, les fortifications ont valu au Vieux-Québec son inscription au patrimoine mondial de l'UNESCO en 1985, en tant que seule ville fortifiée subsistant au nord du Mexique.",
    funFact:
      "C'est l'intervention de Lord Dufferin qui sauva les murs de la démolition au XIXe siècle, alors que la ville voulait s'en débarrasser pour « se moderniser ».",
    practical: {
      neighborhood: "Vieux-Québec, ceinture des remparts",
      duration: "1 h",
      price: "Gratuit (centre d'interprétation payant)",
      tip: "Montez sur les remparts à la porte Saint-Jean et suivez-les jusqu'à la Citadelle au coucher du soleil.",
    },
    essential: true,
    oldQuebec: { x: 590, y: 440 },
  },
  {
    id: "basilique-notre-dame",
    name: "Basilique-cathédrale Notre-Dame",
    category: "monuments",
    tagline: "Berceau de la plus vieille paroisse au nord du Mexique",
    description:
      "Cathédrale somptueuse au cœur de la Haute-Ville, riche de dorures, de toiles anciennes et d'un baldaquin lumineux. Sa crypte abrite gouverneurs et évêques de la Nouvelle-France.",
    history:
      "Première église paroissiale érigée ici dès 1647, détruite par les bombardements de 1759 puis par un incendie en 1922, et chaque fois rebâtie. Saint François de Laval, premier évêque de Québec, y repose.",
    funFact:
      "Elle possède une porte sainte, l'une des rares au monde hors d'Europe, ouverte lors d'années jubilaires.",
    practical: {
      neighborhood: "Vieux-Québec, Haute-Ville",
      duration: "30 min",
      price: "Entrée libre",
      tip: "Levez les yeux vers le baldaquin doré, puis sortez par la rue du Trésor toute proche.",
    },
    oldQuebec: { x: 952, y: 322 },
  },
  {
    id: "seminaire-quebec",
    name: "Séminaire de Québec",
    category: "monuments",
    tagline: "Berceau de l'éducation francophone en Amérique",
    description:
      "Ensemble conventuel aux cours intérieures paisibles, derrière la basilique. Ses bâtiments blancs aux toits d'argent comptent parmi les plus anciens du pays.",
    history:
      "Fondé en 1663 par Mgr François de Laval pour former le clergé de la Nouvelle-France, il donna naissance en 1852 à l'Université Laval, première université francophone d'Amérique.",
    funFact:
      "Les collections du Séminaire comptent parmi les plus anciennes collections muséales du pays.",
    practical: {
      neighborhood: "Vieux-Québec, Haute-Ville",
      duration: "30 à 45 min",
      price: "Cour intérieure gratuite",
      tip: "Franchissez le porche de la cour intérieure : un havre de silence à deux pas de l'agitation touristique.",
    },
    oldQuebec: { x: 1000, y: 282 },
  },
  {
    id: "hotel-de-ville",
    name: "Hôtel de ville de Québec",
    category: "monuments",
    tagline: "Le cœur civique de la capitale",
    description:
      "Édifice de 1896 mêlant influences néoromanes et château, entouré de jardins où se tiennent spectacles et marchés saisonniers.",
    history:
      "Il s'élève sur le site de l'ancien collège des Jésuites, fondé en 1635 — avant Harvard. La place qui le borde a longtemps servi de marché public.",
    funFact:
      "Sous la place de l'hôtel de ville se cache un stationnement creusé dans le roc du promontoire.",
    practical: {
      neighborhood: "Vieux-Québec, Haute-Ville",
      duration: "15 min",
      price: "Gratuit",
      tip: "En décembre, ses jardins s'animent des illuminations du marché de Noël allemand.",
    },
    oldQuebec: { x: 898, y: 362 },
  },
  {
    id: "holy-trinity",
    name: "Cathédrale Holy Trinity",
    category: "monuments",
    tagline: "Première cathédrale anglicane hors des îles Britanniques",
    description:
      "Élégante église palladienne nichée près de la place d'Armes, inspirée de St Martin-in-the-Fields à Londres. Son clocher pointe au-dessus des toits de la Haute-Ville.",
    history:
      "Consacrée en 1804, elle fut la première cathédrale anglicane construite hors des îles Britanniques, témoignage du Régime anglais à Québec.",
    funFact:
      "Un banc royal y est réservé en permanence au monarque britannique ou à son représentant.",
    practical: {
      neighborhood: "Vieux-Québec, Haute-Ville",
      duration: "20 min",
      price: "Entrée libre",
      tip: "L'été, des artisans installent leurs ateliers dans le parc attenant.",
    },
    oldQuebec: { x: 942, y: 408 },
  },
  {
    id: "monastere-augustines",
    name: "Monastère des Augustines",
    category: "musees",
    tagline: "Là où est née la médecine en Amérique du Nord",
    description:
      "Monastère restauré devenu musée et hôtellerie de ressourcement. Ses collections racontent quatre siècles de soins prodigués par les Augustines.",
    history:
      "Les Augustines fondèrent ici en 1639 l'Hôtel-Dieu de Québec, premier hôpital d'Amérique du Nord au nord du Mexique. Le monastère attenant a été converti en 2015 en lieu de mémoire habité.",
    funFact:
      "On peut dormir dans les anciennes cellules des religieuses, réaménagées en chambres contemporaines.",
    practical: {
      neighborhood: "Vieux-Québec, Haute-Ville",
      duration: "1 h",
      price: "Musée / visite payants",
      tip: "Le restaurant du monastère sert des déjeuners santé pris en silence, une expérience à part.",
    },
    oldQuebec: { x: 820, y: 260 },
  },
  {
    id: "rue-du-tresor",
    name: "Rue du Trésor",
    category: "shopping",
    tagline: "La galerie d'art à ciel ouvert",
    description:
      "Ruelle piétonne minuscule où les artistes exposent aquarelles, gravures et vues de Québec, beau temps mauvais temps.",
    history:
      "Son nom rappelle que les colons venaient y acquitter leurs redevances au Trésor royal sous le Régime français. Les artistes l'occupent depuis les années 1960.",
    funFact:
      "Cette galerie d'art à ciel ouvert ne fait que quelques dizaines de mètres, mais concentre une vraie tradition d'artistes de rue.",
    practical: {
      neighborhood: "Vieux-Québec, Haute-Ville",
      duration: "15 min",
      price: "Gratuit",
      tip: "Une estampe signée d'un artiste local fait un souvenir bien plus durable qu'un aimant de frigo.",
    },
    oldQuebec: { x: 998, y: 366 },
  },
  {
    id: "rue-saint-jean",
    name: "Rue Saint-Jean",
    category: "shopping",
    tagline: "L'artère vivante du Vieux-Québec",
    description:
      "Boutiques indépendantes, librairies, chocolatiers et pubs se succèdent sur cette rue animée qui traverse la porte Saint-Jean vers le faubourg.",
    history:
      "Axe commercial depuis le XVIIIe siècle, elle relie le Vieux-Québec au quartier Saint-Jean-Baptiste. On y trouve l'épicerie J.A. Moisan, fondée en 1871.",
    funFact:
      "J.A. Moisan se présente comme la plus ancienne épicerie encore en activité en Amérique du Nord.",
    practical: {
      neighborhood: "Vieux-Québec & Saint-Jean-Baptiste",
      duration: "1 h",
      price: "Gratuit",
      tip: "Poursuivez au-delà de la porte : la partie du faubourg est celle que fréquentent les gens de Québec.",
    },
    oldQuebec: { x: 700, y: 330 },
  },

  // ——— Vieux-Québec · Basse-Ville ———
  {
    id: "petit-champlain",
    name: "Quartier Petit-Champlain",
    category: "shopping",
    tagline: "Le vieux quartier commerçant au pied du cap",
    description:
      "Ruelles pavées, enseignes de bois, ateliers d'artisans et bistros se blottissent au pied du cap Diamant. Le quartier, géré en coopérative, privilégie les créateurs québécois.",
    history:
      "Cœur du premier port de la Nouvelle-France, le quartier ouvrier fut sauvé de la ruine dans les années 1970 par une coopérative d'artisans qui le restaura maison par maison.",
    funFact:
      "L'hiver, la rue du Petit-Champlain illuminée est régulièrement citée parmi les plus belles rues de Noël au monde.",
    practical: {
      neighborhood: "Vieux-Québec, Basse-Ville",
      duration: "1 à 2 h",
      price: "Gratuit",
      tip: "Levez les yeux dans l'escalier du Quêteux pour la fresque du Petit-Champlain, puis suivez le boulevard Champlain vers le fleuve.",
    },
    essential: true,
    oldQuebec: { x: 1120, y: 520 },
  },
  {
    id: "place-royale",
    name: "Place Royale",
    category: "monuments",
    tagline: "Le berceau de l'Amérique française",
    description:
      "Place pavée bordée de maisons de pierre aux toits pentus, dominée par l'église Notre-Dame-des-Victoires. C'est ici que bat le cœur historique de la ville.",
    history:
      "Samuel de Champlain y érigea son « Habitation » en 1608, acte de naissance de Québec. L'église Notre-Dame-des-Victoires (1688) compte parmi les plus anciennes églises de pierre d'Amérique du Nord.",
    funFact:
      "Le buste de Louis XIV qui trône au centre est une copie offerte en 1948 — l'original de 1686 avait été retiré car il gênait... la circulation des charrettes.",
    practical: {
      neighborhood: "Vieux-Québec, Basse-Ville",
      duration: "30 min",
      price: "Gratuit",
      tip: "À deux pas, la fresque des Québécois (420 m²) met en scène quatre siècles de personnages historiques.",
    },
    essential: true,
    oldQuebec: { x: 1170, y: 442 },
  },
  {
    id: "musee-civilisation",
    name: "Musée de la civilisation",
    category: "musees",
    tagline: "Le grand musée des cultures d'ici et d'ailleurs",
    description:
      "Expositions immersives sur l'histoire du Québec, les Premiers Peuples et les grandes questions de société, dans un bâtiment signé Moshe Safdie intégrant des maisons anciennes.",
    history:
      "Inauguré en 1988 dans le Vieux-Port, il a renouvelé la muséologie québécoise avec une approche participative. L'exposition permanente « C'est notre histoire » est co-conçue avec les Onze Nations autochtones.",
    funFact:
      "Une barque du XVIIIe siècle découverte lors des fouilles du chantier est exposée là même où elle fut déterrée.",
    practical: {
      neighborhood: "Vieux-Port",
      duration: "2 à 3 h",
      price: "Billet adulte payant",
      tip: "Idéal les jours de pluie ; gardez du temps pour la vue depuis la terrasse du toit.",
    },
    essential: true,
    oldQuebec: { x: 1190, y: 370 },
  },
  {
    id: "funiculaire",
    name: "Funiculaire du Vieux-Québec",
    category: "transport",
    tagline: "59 mètres d'ascension entre deux mondes",
    description:
      "Cabines vitrées reliant la terrasse Dufferin au quartier Petit-Champlain le long de la falaise, avec vue plongeante sur les toits de la Basse-Ville et le fleuve.",
    history:
      "En service depuis 1879, d'abord mû par contrepoids d'eau puis électrifié, il grimpe aujourd'hui 59,4 m sur une course de 64 m à 45°. Sa gare basse occupe la maison de l'explorateur Louis Jolliet (1683).",
    funFact:
      "Louis Jolliet, dont la maison sert d'entrée au funiculaire, fut le premier Européen à cartographier le Mississippi.",
    practical: {
      neighborhood: "Vieux-Québec, entre Haute et Basse-Ville",
      duration: "5 min",
      price: "~6 $ le trajet",
      tip: "Montez en funiculaire, redescendez par l'escalier Casse-Cou : le meilleur des deux points de vue.",
    },
    oldQuebec: { x: 1080, y: 490 },
  },
  {
    id: "escalier-casse-cou",
    name: "Escalier Casse-Cou",
    category: "attractions",
    tagline: "Le plus vieil escalier de la ville",
    description:
      "Volée d'escaliers rouge et acier dévalant la falaise vers la rue du Petit-Champlain, encadrée de boutiques et de terrasses étagées.",
    history:
      "Un passage existait ici dès 1635 ; l'escalier actuel date de 1893, dessiné par Charles Baillairgé. Son surnom vient des chutes mémorables des passants sur ses marches glacées.",
    funFact:
      "Au XIXe siècle, un règlement municipal obligeait les riverains à déneiger leurs marches sous peine d'amende — déjà !",
    practical: {
      neighborhood: "Vieux-Québec, Basse-Ville",
      duration: "10 min",
      price: "Gratuit",
      tip: "Le point photo classique se trouve à mi-hauteur, cadrant la rue du Petit-Champlain en contrebas.",
    },
    oldQuebec: { x: 1104, y: 452 },
  },
  {
    id: "rue-saint-paul",
    name: "Rue Saint-Paul & antiquaires",
    category: "shopping",
    tagline: "Brocantes, galeries et cafés du Vieux-Port",
    description:
      "L'artère des antiquaires de Québec aligne brocantes, galeries d'art et cafés dans d'anciens entrepôts portuaires aux façades de pierre.",
    history:
      "Construite sur des quais remblayés du XIXe siècle, la rue desservait les commerces de gros du port avant de devenir, dès les années 1970, le repaire des chineurs.",
    funFact:
      "Sous les fondations de plusieurs boutiques dorment encore les vestiges des quais de bois d'origine.",
    practical: {
      neighborhood: "Vieux-Port",
      duration: "45 min",
      price: "Gratuit",
      tip: "Le samedi matin, faites la tournée des antiquaires puis cap sur un café de torréfacteur local.",
    },
    oldQuebec: { x: 1080, y: 270 },
  },
  {
    id: "vieux-port",
    name: "Vieux-Port & bassin Louise",
    category: "attractions",
    tagline: "La façade maritime de la capitale",
    description:
      "Marina, agora de spectacles, marché de Noël nordique et terminal de croisières animent les quais où accostaient jadis les grands voiliers.",
    history:
      "Porte d'entrée de la Nouvelle-France puis plaque tournante du commerce du bois au XIXe siècle, quand Québec comptait parmi les grands ports du monde. Le bassin Louise fut creusé pour accueillir les navires à quai constant.",
    funFact:
      "Au plus fort du XIXe siècle, plus de 1 000 navires par an mouillaient devant Québec, et les chantiers navals y lançaient un bateau par semaine.",
    practical: {
      neighborhood: "Vieux-Port",
      duration: "45 min",
      price: "Gratuit",
      tip: "En septembre-octobre, guettez les paquebots : leurs silhouettes géantes frôlent les toits de la Basse-Ville.",
    },
    oldQuebec: { x: 1160, y: 250 },
  },
  {
    id: "gare-du-palais",
    name: "Gare du Palais",
    category: "transport",
    tagline: "Une gare en habit de château",
    description:
      "Gare ferroviaire et terminus d'autocars au look de petit château fort, avec toits de cuivre, tourelles et grande verrière intérieure.",
    history:
      "Ouverte en 1915 par le Canadien Pacifique dans le style châteauesque cher aux grandes gares canadiennes, elle tire son nom du palais de l'intendant de la Nouvelle-France, dont les vestiges sont voisins.",
    funFact:
      "Fermée aux trains de 1976 à 1985, elle a frôlé la démolition avant d'être classée gare ferroviaire patrimoniale.",
    practical: {
      neighborhood: "Vieux-Port / Saint-Roch",
      duration: "15 min",
      price: "Gratuit",
      tip: "Entrez admirer la verrière du hall même sans billet de train.",
    },
    city: { x: 948, y: 505 },
    oldQuebec: { x: 920, y: 170 },
  },
  {
    id: "traversier-levis",
    name: "Traversier Québec–Lévis",
    category: "transport",
    tagline: "La plus belle vue de Québec coûte le prix d'un café",
    description:
      "En douze minutes de traversée, le traversier offre le panorama définitif sur le cap Diamant, le Château Frontenac et les toits du Vieux-Québec.",
    history:
      "Un service de traverse relie Québec et Lévis depuis le début du XIXe siècle, d'abord à rames et à voile, puis à vapeur dès 1818. Il fonctionne à l'année, même à travers les glaces.",
    funFact:
      "L'hiver, la traversée au milieu des glaces en dérive est un spectacle en soi — les coques sont renforcées exprès.",
    practical: {
      neighborhood: "Basse-Ville → Lévis",
      duration: "30 min aller-retour",
      price: "Billet aller-retour payant",
      tip: "Embarquez piéton au coucher du soleil et restez sur le pont supérieur, côté Québec.",
    },
    essential: true,
    city: { x: 1005, y: 615 },
    oldQuebec: { x: 1210, y: 430 },
  },

  // ——— Colline parlementaire & les Plaines ———
  {
    id: "parlement",
    name: "Hôtel du Parlement",
    category: "monuments",
    tagline: "Le siège de l'Assemblée nationale du Québec",
    description:
      "Majestueux édifice Second Empire dont la façade célèbre l'histoire nationale : 26 statues de bronze y veillent, de Champlain à Frontenac. Les débats parlementaires se visitent gratuitement.",
    history:
      "Construit de 1877 à 1886 sur les plans d'Eugène-Étienne Taché, qui fit graver au-dessus de la porte la devise qu'il venait de composer : « Je me souviens », devenue celle du Québec.",
    funFact:
      "Le restaurant du Parlement, Le Parlementaire, est ouvert au public — on peut dîner sous les ors de la République... parlementaire.",
    practical: {
      neighborhood: "Colline parlementaire",
      duration: "1 h",
      price: "Visite guidée gratuite",
      tip: "Réservez la visite guidée en ligne et combinez avec la fontaine de Tourny juste devant.",
    },
    essential: true,
    city: { x: 898, y: 528 },
    oldQuebec: { x: 520, y: 540 },
  },
  {
    id: "fontaine-tourny",
    name: "Fontaine de Tourny",
    category: "monuments",
    tagline: "Un trésor bordelais devant le Parlement",
    description:
      "Fontaine monumentale aux figures de bronze, illuminée le soir, qui compose avec le Parlement l'un des tableaux les plus photographiés de la colline.",
    history:
      "Médaillée d'or à l'Exposition universelle de Paris en 1855, elle orna les allées de Tourny à Bordeaux avant d'être offerte à Québec par la maison Simons pour le 400e anniversaire de la ville, en 2008.",
    funFact:
      "Elle fut retrouvée démontée chez un antiquaire parisien... par le PDG de Simons lui-même, qui cherchait un cadeau à la hauteur de sa ville.",
    practical: {
      neighborhood: "Colline parlementaire",
      duration: "10 min",
      price: "Gratuit",
      tip: "Le soir venu, la fontaine illuminée avec le Parlement en arrière-plan vaut le détour photo.",
    },
    oldQuebec: { x: 468, y: 515 },
  },
  {
    id: "manege-militaire",
    name: "Manège militaire des Voltigeurs",
    category: "monuments",
    tagline: "Le château des Voltigeurs sur la Grande Allée",
    description:
      "Spectaculaire bâtiment militaire de style château fort, quartier général des Voltigeurs de Québec, le plus ancien régiment canadien-français.",
    history:
      "Élevé en 1887 sur les plans d'Eugène-Étienne Taché, ravagé par un incendie en 2008, il a été reconstruit à l'identique et rouvert en 2018 avec un centre d'expositions.",
    funFact:
      "Sa silhouette crénelée a inspiré le style « château » qui a ensuite essaimé jusque dans les gares et hôtels du pays.",
    practical: {
      neighborhood: "Colline parlementaire, Grande Allée",
      duration: "15 min",
      price: "Extérieur gratuit",
      tip: "Il marque l'entrée des plaines d'Abraham : combinez les deux dans la même promenade.",
    },
    oldQuebec: { x: 520, y: 620 },
  },
  {
    id: "observatoire-capitale",
    name: "Observatoire de la Capitale",
    category: "panoramas",
    tagline: "Québec à 360° depuis le 31e étage",
    description:
      "Au sommet de l'édifice Marie-Guyart, le plus haut gratte-ciel de la ville, une galerie d'observation embrasse le Vieux-Québec, le fleuve et les Laurentides à 221 mètres d'altitude.",
    history:
      "L'édifice, achevé en 1972 pour loger l'administration publique, porte le nom de la fondatrice des Ursulines. L'observatoire occupe son dernier étage depuis 1986.",
    funFact:
      "Par temps clair, le regard porte jusqu'au massif de Charlevoix, à plus de 100 km.",
    practical: {
      neighborhood: "Colline parlementaire",
      duration: "45 min",
      price: "Adulte 14,75 $",
      tip: "Montez-y en début de séjour : rien de tel pour comprendre la géographie de la ville d'un seul regard.",
    },
    oldQuebec: { x: 370, y: 500 },
  },
  {
    id: "grande-allee",
    name: "Grande Allée",
    category: "gastronomie",
    tagline: "Les Champs-Élysées de Québec",
    description:
      "Enfilade de maisons victoriennes converties en restaurants, terrasses et bars, des grills aux tables gastronomiques. L'artère s'embrase les soirs d'été et de Carnaval.",
    history:
      "Ancien chemin rural menant aux seigneuries, la Grande Allée devint au XIXe siècle la vitrine bourgeoise de la ville, d'où ses façades ouvragées aujourd'hui classées.",
    funFact:
      "Sous la Grande Allée court un tunnel piétonnier reliant les édifices parlementaires — réservé, hélas, aux élus et fonctionnaires.",
    practical: {
      neighborhood: "Montcalm / Colline parlementaire",
      duration: "Soirée",
      price: "Selon la table choisie",
      tip: "Apéro en terrasse sur la Grande Allée, puis souper dans le quartier Montcalm voisin, plus local.",
    },
    essential: true,
    oldQuebec: { x: 300, y: 570 },
  },
  {
    id: "plaines-abraham",
    name: "Plaines d'Abraham",
    category: "nature",
    tagline: "Le Central Park de Québec, théâtre de l'histoire",
    description:
      "Immense parc urbain suspendu au-dessus du fleuve : pelouses, jardins, pistes de ski de fond l'hiver et grands concerts l'été, dont ceux du Festival d'été de Québec.",
    history:
      "C'est ici que se joua en 1759 la bataille décisive entre les généraux Wolfe et Montcalm, scellant le sort de la Nouvelle-France. Le parc des Champs-de-Bataille fut créé en 1908 pour le tricentenaire.",
    funFact:
      "Le nom vient d'Abraham Martin, pilote du Saint-Laurent et ami de Champlain, qui y faisait paître ses bêtes au XVIIe siècle.",
    practical: {
      neighborhood: "Montcalm, au-dessus du fleuve",
      duration: "1 à 2 h",
      price: "Gratuit",
      tip: "Louez des skis de fond l'hiver ; l'été, le belvédère de la promenade des Gouverneurs offre une arrivée spectaculaire depuis la Citadelle.",
    },
    essential: true,
    city: { x: 880, y: 572 },
    oldQuebec: { x: 450, y: 720 },
  },
  {
    id: "mnbaq",
    name: "Musée national des beaux-arts (MNBAQ)",
    category: "musees",
    tagline: "L'art québécois, des origines à aujourd'hui",
    description:
      "Quatre pavillons en bordure des Plaines, dont le lumineux pavillon Pierre Lassonde, rassemblent la plus grande collection d'art québécois au monde, de Riopelle aux artistes inuits.",
    history:
      "Fondé en 1933 dans le parc des Champs-de-Bataille, le musée a annexé l'ancienne prison de Québec (1867), dont des cellules sont conservées, puis s'est doté en 2016 du pavillon signé OMA.",
    funFact:
      "Une aile du musée occupe une vraie prison du XIXe siècle — les cellules se visitent entre deux salles d'exposition.",
    practical: {
      neighborhood: "Montcalm, plaines d'Abraham",
      duration: "2 h",
      price: "Billet adulte payant",
      tip: "L'entrée du hall du pavillon Lassonde et son grand escalier valent le coup d'œil même sans billet.",
    },
    oldQuebec: { x: 180, y: 690 },
  },
  {
    id: "tours-martello",
    name: "Tours Martello",
    category: "monuments",
    tagline: "Sentinelles rondes des Plaines",
    description:
      "Tours de défense circulaires aux murs massifs, plantées sur les plaines d'Abraham, vestiges du système défensif britannique.",
    history:
      "Quatre tours furent élevées entre 1808 et 1812 pour parer une attaque américaine. Leurs murs font face au fleuve avec près de quatre mètres d'épaisseur côté exposé.",
    funFact:
      "Les tours servent régulièrement de décor à des activités d'interprétation historique sur les Plaines.",
    practical: {
      neighborhood: "Plaines d'Abraham",
      duration: "20 min",
      price: "Extérieur gratuit",
      tip: "La tour no 1 offre l'un des plus beaux premiers plans pour photographier le fleuve.",
    },
    oldQuebec: { x: 390, y: 705 },
  },
  {
    id: "terrasse-pierre-dugua",
    name: "Terrasse Pierre-Dugua-De Mons",
    category: "panoramas",
    tagline: "Le point de vue secret sur le Château",
    description:
      "Petit belvédère discret entre la Citadelle et la terrasse Dufferin, prisé des photographes pour son cadrage parfait sur le Château Frontenac et le fleuve.",
    history:
      "Il honore Pierre Dugua de Mons, lieutenant-général de la Nouvelle-France, qui finança et organisa l'expédition de Champlain en 1608 — le fondateur dans l'ombre.",
    funFact:
      "La quasi-totalité des photos « carte postale » du Château Frontenac que vous avez vues sont prises exactement d'ici.",
    practical: {
      neighborhood: "Vieux-Québec, cap Diamant",
      duration: "15 min",
      price: "Gratuit",
      tip: "Y monter par la promenade des Gouverneurs depuis la terrasse Dufferin, à l'heure dorée.",
    },
    oldQuebec: { x: 940, y: 700 },
  },

  // ——— La ville & ses environs ———
  {
    id: "chute-montmorency",
    name: "Parc de la Chute-Montmorency",
    category: "nature",
    tagline: "30 mètres plus haute que Niagara",
    description:
      "Cascade spectaculaire de 83 mètres plongeant dans le Saint-Laurent, enjambée par un pont suspendu et survolée par un téléphérique et une double tyrolienne.",
    history:
      "Nommée par Champlain en l'honneur du duc de Montmorency, la chute a aussi servi très tôt à produire de l'électricité pour la région de Québec.",
    funFact:
      "L'hiver, les embruns gelés forment le « pain de sucre », cône de glace que les plus braves escaladent en crampons.",
    practical: {
      neighborhood: "Beauport, 15 min du centre",
      duration: "2 à 3 h",
      price: "Accès et activités payants",
      tip: "Montez en téléphérique, traversez le pont suspendu et redescendez par l'escalier panoramique de 487 marches.",
    },
    essential: true,
    city: { x: 1272, y: 318 },
  },
  {
    id: "ile-orleans",
    name: "Île d'Orléans",
    category: "nature",
    tagline: "Le garde-manger de Québec",
    description:
      "Île agricole de six villages classée d'arrondissement historique : fraises, vignobles, cidreries, cassis et églises tricentenaires se succèdent le long du chemin Royal.",
    history:
      "Peuplée dès les années 1650, l'île a conservé son paysage seigneurial. Le pont de 1935 l'a ouverte aux visiteurs sans briser son caractère rural, jalousement protégé.",
    funFact:
      "Félix Leclerc, qui y vécut, chantait que l'île, c'est « quarante-deux milles de choses tranquilles » — la formule tient toujours.",
    practical: {
      neighborhood: "À 20 min du Vieux-Québec",
      duration: "Demi-journée",
      price: "Gratuit (dégustations en sus)",
      tip: "Faites le tour par le chemin Royal dans le sens horaire et arrêtez-vous aux kiosques fermiers — argent comptant utile.",
    },
    city: { x: 1420, y: 420 },
  },
  {
    id: "baie-de-beauport",
    name: "Baie de Beauport",
    category: "nature",
    tagline: "La plage urbaine de la capitale",
    description:
      "Plage de sable, volleyball, kayak et planche à pagaie à dix minutes du Vieux-Québec, avec vue sur l'île d'Orléans et les navires qui remontent le fleuve.",
    history:
      "Réaménagée pour le 400e anniversaire en 2008, la baie a rendu aux citadins un accès au fleuve confisqué un siècle durant par les installations portuaires.",
    funFact:
      "On s'y baigne dans le Saint-Laurent — eau surveillée et, oui, rafraîchissante même en juillet.",
    practical: {
      neighborhood: "Beauport / port de Québec",
      duration: "Demi-journée l'été",
      price: "Accès payant en saison",
      tip: "Les soirs d'été, les « apéros plage » avec DJ font le plein : arrivez tôt.",
    },
    city: { x: 1120, y: 440 },
  },
  {
    id: "domaine-maizerets",
    name: "Domaine de Maizerets",
    category: "nature",
    tagline: "Jardins et arboretum trois fois centenaires",
    description:
      "Grand parc de Limoilou mêlant manoir ancien, marais, arboretum et labyrinthe végétal ; patinage et ski de fond y prennent le relais l'hiver.",
    history:
      "Propriété du Séminaire de Québec dès 1705, le domaine servait de ferme et de maison de repos aux prêtres avant de devenir parc public.",
    funFact:
      "Son labyrinthe de cèdres est l'un des rares vrais labyrinthes végétaux ouverts gratuitement au Canada.",
    practical: {
      neighborhood: "Limoilou",
      duration: "1 à 2 h",
      price: "Gratuit",
      tip: "Combinez avec une virée gourmande sur la 3e Avenue de Limoilou toute proche.",
    },
    city: { x: 1000, y: 400 },
  },
  {
    id: "promenade-champlain",
    name: "Promenade Samuel-De Champlain",
    category: "nature",
    tagline: "Le fleuve rendu aux promeneurs",
    description:
      "Parc linéaire de plusieurs kilomètres au ras du Saint-Laurent : quais contemplatifs, miroir d'eau, plage et bassins de baignade face aux ponts.",
    history:
      "Offerte par le gouvernement du Québec pour le 400e de la ville en 2008 puis prolongée par phases, elle a métamorphosé une ancienne friche autoroutière en vitrine du fleuve.",
    funFact:
      "Sa station de la Plage permet de se baigner face au fleuve dans un bassin chauffé... à deux pas des cargos.",
    practical: {
      neighborhood: "Sillery / Cap-Blanc",
      duration: "1 à 2 h",
      price: "Gratuit",
      tip: "Louez un vélo et filez du quai des Cageux jusqu'à la Basse-Ville : le parcours longe tout le pied de la falaise.",
    },
    city: { x: 548, y: 605 },
  },
  {
    id: "aquarium-quebec",
    name: "Aquarium du Québec",
    category: "attractions",
    tagline: "Ours blancs, morses et fonds marins du Saint-Laurent",
    description:
      "Quelque 10 000 animaux marins, des phoques aux méduses, avec passerelles extérieures où évoluent ours polaires et morses — rare en Amérique du Nord.",
    history:
      "Né en 1959 d'un centre de recherche sur les poissons, l'aquarium s'est réinventé en 2002 en grand parc thématique dédié aux écosystèmes nordiques et du fleuve.",
    funFact:
      "Le tunnel vitré permet d'observer les morses sous l'eau, un moment rarement offert dans un aquarium.",
    practical: {
      neighborhood: "Sainte-Foy, près des ponts",
      duration: "3 h",
      price: "Adulte 24,50–33,50 $",
      tip: "Visez l'heure des repas des morses et des ours, annoncée à l'entrée.",
    },
    city: { x: 175, y: 610 },
  },
  {
    id: "universite-laval",
    name: "Université Laval",
    category: "monuments",
    tagline: "La doyenne francophone des Amériques",
    description:
      "Vaste campus moderne de Sainte-Foy, héritier du Séminaire de Québec, avec son stade, ses pavillons d'époque variée et son réseau de tunnels piétonniers.",
    history:
      "Issue du Séminaire fondé en 1663 par Mgr de Laval, l'université reçut sa charte royale en 1852, devenant la première université de langue française d'Amérique.",
    funFact:
      "Plus de dix kilomètres de tunnels relient les pavillons : on traverse le campus en plein janvier sans mettre le nez dehors.",
    practical: {
      neighborhood: "Sainte-Foy",
      duration: "1 h",
      price: "Gratuit",
      tip: "Les matchs du Rouge et Or au stade TELUS offrent une vraie ambiance de football universitaire.",
    },
    city: { x: 390, y: 520 },
  },
  {
    id: "centre-videotron",
    name: "Centre Vidéotron",
    category: "attractions",
    tagline: "L'amphithéâtre des grands soirs",
    description:
      "Aréna de 18 000 places accueillant les Remparts de Québec, les grands spectacles internationaux et les tournois majeurs de hockey.",
    history:
      "Inauguré en 2015 sur le site d'ExpoCité pour ramener les ligues majeures à Québec, il perpétue la flamme laissée par le mythique Colisée, antre des Nordiques.",
    funFact:
      "Sa construction visait ouvertement le retour des Nordiques dans la LNH — le rêve reste entier, l'aréna aussi.",
    practical: {
      neighborhood: "ExpoCité, Limoilou",
      duration: "Soirée",
      price: "Selon l'événement",
      tip: "Un match des Remparts en famille reste l'une des sorties les moins chères et les plus survoltées en ville.",
    },
    city: { x: 840, y: 290 },
  },
  {
    id: "grand-marche",
    name: "Grand Marché de Québec",
    category: "gastronomie",
    tagline: "Le terroir québécois sous un même toit",
    description:
      "Halle gourmande réunissant une centaine de producteurs : fromages, cidres de glace, produits de l'île d'Orléans, érable et microbrasseries.",
    history:
      "Ouvert en 2019 à ExpoCité, il a pris la relève du marché du Vieux-Port pour donner aux fermiers de la région une vitrine à l'année.",
    funFact:
      "On y trouve du caviar d'esturgeon... de l'Abitibi, et des alcools de petits fruits nordiques introuvables ailleurs.",
    practical: {
      neighborhood: "ExpoCité, Limoilou",
      duration: "1 h",
      price: "Entrée libre",
      tip: "Composez-y un pique-nique de produits locaux avant de filer vers les plaines ou la baie de Beauport.",
    },
    city: { x: 868, y: 332 },
  },
  {
    id: "quartier-saint-roch",
    name: "Quartier Saint-Roch",
    category: "gastronomie",
    tagline: "Le repaire créatif et gourmand de la Basse-Ville",
    description:
      "Microbrasseries, torréfacteurs, restos de quartier et studios de jeux vidéo animent la rue Saint-Joseph, artère phare de ce faubourg réinventé.",
    history:
      "Quartier ouvrier des tanneries et de la chaussure, tombé en désuétude puis spectaculairement revitalisé depuis les années 2000 autour des arts et du numérique.",
    funFact:
      "La rue Saint-Joseph fut un temps couverte d'un toit géant pour en faire un « centre commercial » — démoli depuis, au grand soulagement du quartier.",
    practical: {
      neighborhood: "Saint-Roch, Basse-Ville",
      duration: "Soirée",
      price: "Selon la table",
      tip: "Tournée de microbrasseries sur Saint-Joseph, puis remontez vers la Haute-Ville par l'ascenseur du Faubourg.",
    },
    city: { x: 770, y: 450 },
  },
  {
    id: "galeries-capitale",
    name: "Galeries de la Capitale & Méga Parc",
    category: "shopping",
    tagline: "Magasiner avec grande roue intérieure",
    description:
      "L'un des plus grands centres commerciaux de l'Est du Canada, célèbre pour son Méga Parc : manèges, grande roue et patinoire... à l'intérieur.",
    history:
      "Ouvertes en 1981, les Galeries ont fait du parc d'attractions couvert leur signature ; il a été entièrement réinventé en 2019 dans un esprit steampunk.",
    funFact:
      "Sa grande roue intérieure de 18 mètres serait la plus haute du genre au Canada.",
    practical: {
      neighborhood: "Lebourgneuf",
      duration: "Demi-journée",
      price: "Entrée libre, manèges payants",
      tip: "Parfait plan B en famille les jours de pluie ou de grand froid.",
    },
    city: { x: 640, y: 150 },
  },
  {
    id: "laurier-quebec",
    name: "Laurier Québec",
    category: "shopping",
    tagline: "Le grand pôle magasinage de Sainte-Foy",
    description:
      "Plus de 250 boutiques font de Laurier Québec une destination magasinage majeure, voisine de deux autres centres sur le même boulevard.",
    history:
      "Pionnier des centres commerciaux québécois à son ouverture en 1961, il n'a cessé de s'agrandir avec le développement de Sainte-Foy.",
    funFact:
      "Le trio Laurier–Place Sainte-Foy–Place de la Cité forme l'une des plus fortes concentrations commerciales au Canada.",
    practical: {
      neighborhood: "Sainte-Foy",
      duration: "2 h",
      price: "Entrée libre",
      tip: "Pratique à jumeler avec l'Aquarium ou la promenade Samuel-De Champlain, tout près des ponts.",
    },
    city: { x: 330, y: 585 },
  },
  {
    id: "pont-de-quebec",
    name: "Ponts de Québec & Pierre-Laporte",
    category: "transport",
    tagline: "Le géant de fer et son voisin suspendu",
    description:
      "Côte à côte au-dessus du fleuve, le pont de Québec, monument d'acier de 1919, et le pont Pierre-Laporte, plus long pont suspendu du Canada, relient les deux rives.",
    history:
      "Le pont de Québec détient toujours la plus longue travée cantilever au monde (549 m). Sa construction fut endeuillée par deux effondrements, en 1907 et 1916, qui firent près de 90 victimes.",
    funFact:
      "Les ingénieurs canadiens portent un anneau de fer en mémoire de la catastrophe de 1907 — la légende veut qu'il provienne de l'acier du pont effondré.",
    practical: {
      neighborhood: "Sainte-Foy / Saint-Nicolas",
      duration: "Vue en passant",
      price: "Gratuit",
      tip: "Le belvédère du quai des Cageux, sur la promenade Samuel-De Champlain, offre le meilleur point de vue sur les deux ponts.",
    },
    city: { x: 240, y: 760 },
  },
];

const placeIndex = new Map(places.map((place) => [place.id, place]));

export const TOUR_STEPS = [
  "chateau-frontenac",
  "terrasse-dufferin",
  "citadelle",
  "fortifications",
  "parlement",
  "plaines-abraham",
  "petit-champlain",
  "place-royale",
  "musee-civilisation",
  "traversier-levis",
  "chute-montmorency",
] as const;

export function getPlaceById(id: string): Place {
  const place = placeIndex.get(id);
  if (!place) {
    throw new Error(`Lieu inconnu : ${id}`);
  }
  return place;
}

export function placesForMap(mapId: MapId): Place[] {
  return places.filter((place) => place[mapId] !== undefined);
}

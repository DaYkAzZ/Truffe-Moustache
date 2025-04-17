/**
 * Extrait les filtres de recherche à partir des entités Wit.ai
 * Gère différentes structures et formats d'entités
 */
export const extractFiltersFromEntities = (entities) => {
  // Fonction améliorée pour extraire les valeurs avec fallback
  const getValue = (keys) => {
    if (!entities || typeof entities !== "object") return null;

    // Si keys est une chaîne unique, la convertir en tableau
    const keyList = Array.isArray(keys) ? keys : [keys];

    for (const key of keyList) {
      // Cherche les correspondances exactes
      if (entities[key]?.[0]) {
        return (
          entities[key][0].value ||
          entities[key][0].name ||
          entities[key][0].body
        );
      }

      // Cherche les correspondances partielles
      for (const entityKey in entities) {
        if (entityKey.includes(key) && entities[entityKey][0]) {
          return (
            entities[entityKey][0].value ||
            entities[entityKey][0].name ||
            entities[entityKey][0].body
          );
        }
      }
    }

    return null;
  };

  // Extraire les valeurs avec plusieurs alternatives
  return {
    // Type d'animal avec multiples entités possibles
    espece: getValue(["espece:espece", "espece", "type_animal", "animal"]),

    // Race avec variations possibles
    race: getValue(["race:race", "race", "breed"]),

    // Gabarit/taille avec synonymes
    gabarit: getValue(["gabarit:gabarit", "gabarit", "taille", "size"]),

    // Type de logement
    logement: getValue(["logement:logement", "logement", "habitat", "housing"]),

    // Sexe de l'animal
    sexe: getValue(["sexe:sexe", "sexe", "gender"]),

    // Âge avec différentes notations
    age: getValue(["age:age", "age", "années"]),

    // Couleur avec variations
    couleur: getValue(["couleur:couleur", "couleur", "color"]),

    // Caractéristiques de sociabilité
    sociabilite: getValue(["sociabilite", "temperament", "caractere"]),

    // Niveau de besoin/entretien
    besoin: getValue(["besoin", "entretien", "maintenance"]),

    // Traitement des poils
    poils: getValue(["poils", "pelage", "fur"]),
  };
};

/**
 * Convertit les filtres extraits en critères de recherche compréhensibles
 * par les fonctions de filtrage
 */
export const convertToSearchCriteria = (filters) => {
  // Normalisation des types d'animaux
  const normalizeAnimalType = (type) => {
    if (!type) return null;

    const typeLC = type.toLowerCase();

    // Mapping des types communs et leurs variations
    const typeMap = {
      chien: ["chien", "chiot", "canin", "dog", "puppy"],
      chat: ["chat", "chaton", "felin", "cat", "kitten"],
      rongeur: [
        "rongeur",
        "hamster",
        "rat",
        "souris",
        "cochon d'inde",
        "gerbille",
        "chinchilla",
      ],
      reptile: [
        "reptile",
        "serpent",
        "lézard",
        "iguane",
        "gecko",
        "python",
        "snake",
      ],
    };

    // Trouver la correspondance
    for (const [normalizedType, variations] of Object.entries(typeMap)) {
      if (variations.some((v) => typeLC.includes(v))) {
        return normalizedType;
      }
    }

    return type; // Retourner le type original si aucune correspondance
  };

  // Normalisation des tailles
  const normalizeGabarit = (size) => {
    if (!size) return null;

    const sizeLC = size.toLowerCase();

    if (sizeLC.includes("petit") || sizeLC.includes("small")) return "petit";
    if (sizeLC.includes("moyen") || sizeLC.includes("medium")) return "moyen";
    if (sizeLC.includes("grand") || sizeLC.includes("large")) return "grand";

    return size;
  };

  // Normalisation des âges (conversion en nombre si possible)
  const normalizeAge = (age) => {
    if (!age) return null;

    // Si c'est déjà un nombre
    if (typeof age === "number") return age;

    // Si c'est une chaîne, essayer de la convertir
    if (typeof age === "string") {
      // Extraire les chiffres
      const match = age.match(/(\d+)/);
      if (match) return parseInt(match[1], 10);
    }

    return null;
  };

  return {
    typeAnimal: normalizeAnimalType(filters.espece),
    race: filters.race,
    ageValue: normalizeAge(filters.age),
    gabarit: normalizeGabarit(filters.gabarit),
    logement: filters.logement,
    sexe: filters.sexe,
    couleur: filters.couleur,
    sociabilite: filters.sociabilite,
    besoin: filters.besoin,
    poils: filters.poils,
  };
};

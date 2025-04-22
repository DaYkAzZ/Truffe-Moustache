import path from "path";
import fs from "fs";

// Résolution correcte du chemin du fichier de données
let data;
try {
  const dataPath = path.join(process.cwd(), "src", "app", "data", "data.json");
  data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
} catch (error) {
  console.error("Erreur lors du chargement des données:", error);
  // Fallback vers un import direct si le chemin pose problème
  const dataImport = require("../../data/data.json");
  data = dataImport;
}

export async function POST(request) {
  try {
    const { message } = await request.json();

    const WIT_AI_TOKEN = process.env.WIT_AI_TOKEN;

    if (!WIT_AI_TOKEN) {
      return Response.json(
        { error: "Wit.ai token is not configured" },
        { status: 500 }
      );
    }

    const encodedMessage = encodeURIComponent(message);

    const response = await fetch(
      `https://api.wit.ai/message?v=20240415&q=${encodedMessage}`,
      {
        headers: {
          Authorization: `Bearer ${WIT_AI_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Wit.ai API responded with status: ${response.status}`);
    }

    const witData = await response.json();
    console.log("Wit.ai response:", JSON.stringify(witData, null, 2));

    let processedResponse;
    let matchingAnimals = [];

    // Traitement des intentions et des entités
    if (witData.intents && witData.intents.length > 0) {
      const primaryIntent = witData.intents[0].name;
      const confidence = witData.intents[0].confidence;

      // Extraction des entités clés
      const typeAnimal =
        extractEntity(witData, "type_animal") ||
        extractEntity(witData, "espece:espece");
      const race = extractEntity(witData, "race:race");
      const age =
        extractEntity(witData, "age") || extractEntity(witData, "age:age");
      const ageValue = age ? parseInt(age) : null;
      const caracteristique = extractEntity(witData, "caracteristique");
      const couleur =
        extractEntity(witData, "couleur:couleur") ||
        extractEntity(witData, "couleur");
      const gabarit =
        extractEntity(witData, "gabarit:gabarit") ||
        extractEntity(witData, "taille") ||
        extractEntity(witData, "gabarit");
      const logement =
        extractEntity(witData, "logement:logement") ||
        extractEntity(witData, "habitat");
      const sexe = extractEntity(witData, "sexe:sexe");
      const sociabilite =
        extractEntity(witData, "sociabilite") ||
        extractEntity(witData, "temperament");
      const besoin = extractEntity(witData, "besoin");

      switch (primaryIntent) {
        case "recherche_animaux":
          // Recherche avancée avec gestion des synonymes et correspondances approximatives
          matchingAnimals = findMatchingAnimals({
            typeAnimal,
            race,
            ageValue,
            caracteristique,
            couleur,
            gabarit,
            logement,
            sexe,
            sociabilite,
            besoin,
          });

          if (matchingAnimals.length === 0) {
            // Recherche plus souple si aucun résultat
            matchingAnimals = findMatchingAnimals(
              {
                typeAnimal,
                race,
                ageValue,
                caracteristique,
                couleur,
                gabarit,
                logement,
                sexe,
                sociabilite,
                besoin,
              },
              true
            );

            if (matchingAnimals.length === 0) {
              processedResponse = `Désolé, je n'ai pas trouvé d'animaux correspondant exactement à votre recherche. Pourriez-vous élargir vos critères ?`;
            } else {
              processedResponse =
                `J'ai trouvé ${matchingAnimals.length} animal(aux) qui correspondent approximativement à vos critères :\n\n` +
                formatAnimalResults(matchingAnimals);
            }
          } else {
            processedResponse =
              `Voici ${matchingAnimals.length} animal(aux) correspondant à votre recherche :\n\n` +
              formatAnimalResults(matchingAnimals);
          }
          break;

        case "information_adoption":
          processedResponse =
            "Pour adopter un animal, vous devez suivre ces étapes :\n" +
            "1. Créer un compte sur notre plateforme\n" +
            "2. Consulter nos animaux disponibles et filtrer selon vos critères\n" +
            "3. Une fois votre choix fait, nous organiserons une rencontre avec l'animal\n" +
            "4. Si l'entente est bonne, nous procéderons aux formalités d'adoption\n\n" +
            "N'hésitez pas à me poser des questions sur un animal en particulier !";
          break;

        case "conseil_animal":
          // Conseils sur les animaux selon leurs caractéristiques
          if (typeAnimal) {
            processedResponse = generateAnimalAdvice(
              typeAnimal,
              logement,
              gabarit
            );
          } else {
            processedResponse =
              "Pour vous conseiller au mieux, pouvez-vous me préciser quel type d'animal vous intéresse ?";
          }
          break;

        case "salutation":
          processedResponse =
            "Bonjour ! Je suis Truffe, votre assistant pour trouver le compagnon idéal. Je peux vous aider à trouver un animal selon vos critères (type, âge, taille, couleur...) ou vous donner des informations sur l'adoption. Comment puis-je vous aider aujourd'hui ?";
          break;

        case "remerciement":
          processedResponse =
            "Je vous en prie ! C'est toujours un plaisir de vous aider à trouver votre compagnon idéal. N'hésitez pas si vous avez d'autres questions.";
          break;

        default:
          // Si l'intention est détectée mais pas dans nos cas spécifiques
          if (confidence > 0.6) {
            // Tentative de recherche basée sur les entités malgré l'intention non reconnue
            if (typeAnimal || couleur || gabarit || logement) {
              matchingAnimals = findMatchingAnimals(
                {
                  typeAnimal,
                  race,
                  ageValue,
                  caracteristique,
                  couleur,
                  gabarit,
                  logement,
                  sexe,
                  sociabilite,
                  besoin,
                },
                true
              );

              if (matchingAnimals.length > 0) {
                processedResponse =
                  `J'ai trouvé ces animaux qui pourraient vous intéresser :\n\n` +
                  formatAnimalResults(matchingAnimals);
              } else {
                processedResponse =
                  "Je comprends que vous recherchez un animal. Pourriez-vous me donner plus de détails sur ce que vous cherchez ? Par exemple : type d'animal (chien, chat...), âge, taille, couleur, etc.";
              }
            } else {
              processedResponse =
                "Je comprends que vous cherchez un animal de compagnie. Pouvez-vous me préciser quel type d'animal vous intéresse (chien, chat, rongeur, reptile) et vos préférences en termes de taille, âge ou couleur ?";
            }
          } else {
            processedResponse =
              "Je ne suis pas sûr de comprendre votre demande. Voulez-vous chercher un animal à adopter, avoir des informations sur l'adoption, ou des conseils sur un type d'animal en particulier ?";
          }
      }
    } else {
      // Analyse contextuelle si aucune intention n'est détectée
      const messageLC = message.toLowerCase();

      if (
        messageLC.includes("chien") ||
        messageLC.includes("chat") ||
        messageLC.includes("rongeur") ||
        messageLC.includes("reptile")
      ) {
        // Extraction manuelle de critères simples
        const typeMapping = {
          chien: "chien",
          chiot: "chien",
          chat: "chat",
          chaton: "chat",
          rongeur: "rongeur",
          reptile: "reptile",
          serpent: "serpent",
          lézard: "lézard",
        };

        const couleurMapping = {
          blanc: "blanc",
          noir: "noir",
          gris: "gris",
          roux: "roux",
          brun: "brun",
          marron: "marron",
          beige: "beige",
        };

        let detectedType = null;
        for (const [keyword, animalType] of Object.entries(typeMapping)) {
          if (messageLC.includes(keyword)) {
            detectedType = animalType;
            break;
          }
        }

        let detectedColor = null;
        for (const [keyword, color] of Object.entries(couleurMapping)) {
          if (messageLC.includes(keyword)) {
            detectedColor = color;
            break;
          }
        }

        // Extraction basique de l'âge
        const ageMatch = messageLC.match(/(\d+)\s*an/);
        const detectedAge = ageMatch ? parseInt(ageMatch[1]) : null;

        matchingAnimals = findMatchingAnimals(
          {
            typeAnimal: detectedType,
            ageValue: detectedAge,
            couleur: detectedColor,
          },
          true
        );

        if (matchingAnimals.length > 0) {
          processedResponse =
            `Voici quelques animaux qui pourraient correspondre à votre recherche :\n\n` +
            formatAnimalResults(matchingAnimals);
        } else {
          processedResponse =
            "Je comprends que vous vous intéressez à un animal, mais je n'ai pas trouvé de correspondance exacte. Pourriez-vous me donner plus de détails sur ce que vous recherchez ?";
        }
      } else {
        processedResponse =
          "Je ne suis pas sûr de comprendre votre demande. Puis-je vous aider à trouver un animal à adopter ? Vous pouvez me préciser le type (chien, chat, rongeur, reptile), l'âge, la taille ou la couleur que vous recherchez.";
      }
    }

    return Response.json({
      response: processedResponse,
      animals: matchingAnimals.slice(0, 5),
    });
  } catch (error) {
    console.error("Error processing Wit.ai request:", error);
    return Response.json(
      { error: "Failed to process your request", details: error.message },
      { status: 500 }
    );
  }
}

// Fonction optimisée d'extraction d'entités avec gestion des alias et structure complexe
function extractEntity(data, entityName) {
  // Vérifier le format witai v2
  if (data.entities && entityName in data.entities) {
    const entity = data.entities[entityName][0];
    if (entity) {
      return entity.value || entity.name || entity.body;
    }
  }

  // Recherche récursive dans les entités pour gérer différentes structures possibles
  for (const key in data.entities || {}) {
    if (key.startsWith(entityName) || key.includes(entityName)) {
      const entity = data.entities[key][0];
      if (entity) {
        return entity.value || entity.name || entity.body;
      }
    }
  }

  // Recherche dans les traits (certaines versions de Wit.ai)
  if (data.traits) {
    for (const traitName in data.traits) {
      if (traitName.includes(entityName) && data.traits[traitName][0]) {
        return data.traits[traitName][0].value;
      }
    }
  }

  return null;
}

// Fonction de recherche améliorée avec correspondance partielle et flexible
function findMatchingAnimals(criteria, flexibleMatch = false) {
  const {
    typeAnimal,
    race,
    ageValue,
    caracteristique,
    couleur,
    gabarit,
    logement,
    sexe,
    sociabilite,
    besoin,
  } = criteria;

  const results = [];

  // Mapper les types d'animaux aux catégories dans nos données
  const typeToCategory = {
    chien: "Chiens",
    chat: "Chats",
    rongeur: "Rongeur",
    reptile: "Reptiles",
    serpent: "Reptiles",
    lézard: "Reptiles",
  };

  // Déterminer les catégories à rechercher
  let categoriesToSearch = [];

  if (typeAnimal && typeToCategory[typeAnimal.toLowerCase()]) {
    categoriesToSearch.push(typeToCategory[typeAnimal.toLowerCase()]);
  } else {
    // Si pas de type spécifié ou non reconnu, chercher dans toutes les catégories
    categoriesToSearch = Object.values(typeToCategory);
    // Éliminer les doublons
    categoriesToSearch = [...new Set(categoriesToSearch)];
  }

  // Fonction pour vérifier la correspondance de texte (exacte ou partielle)
  const textMatches = (text, pattern) => {
    if (!text || !pattern) return flexibleMatch; // Si flexible, autoriser null

    if (typeof text !== "string" || typeof pattern !== "string") {
      return flexibleMatch;
    }

    text = text.toLowerCase();
    pattern = pattern.toLowerCase();

    if (flexibleMatch) {
      return text.includes(pattern) || pattern.includes(text);
    } else {
      return text.includes(pattern);
    }
  };

  // Fonction pour comparer les âges (exact ou approximatif)
  const ageMatches = (animalAge, targetAge) => {
    if (!targetAge) return true;
    if (flexibleMatch) {
      return Math.abs(animalAge - targetAge) <= 2; // Tolérance de 2 ans en mode flexible
    } else {
      return Math.abs(animalAge - targetAge) <= 1; // Tolérance de 1 an en mode strict
    }
  };

  // Parcourir les catégories pertinentes
  for (const category of categoriesToSearch) {
    const animals = data[category] || [];

    for (const animal of animals) {
      // Critères de correspondance
      const matchRace = !race || textMatches(animal.race, race);
      const matchAge = !ageValue || ageMatches(animal.age, ageValue);
      const matchGabarit = !gabarit || textMatches(animal.gabarit, gabarit);
      const matchLogement = !logement || textMatches(animal.logement, logement);
      const matchSexe = !sexe || textMatches(animal.sexe, sexe);
      const matchCouleur = !couleur || textMatches(animal.couleur, couleur);
      const matchSociabilite =
        !sociabilite || textMatches(animal.sociabilite, sociabilite);
      const matchCaracteristique =
        !caracteristique ||
        textMatches(animal.sociabilite, caracteristique) ||
        textMatches(animal.gabarit, caracteristique) ||
        textMatches(animal.couleur, caracteristique);
      const matchBesoin =
        !besoin ||
        (animal.besoin && animal.besoin.startsWith(besoin.charAt(0)));

      // Calculer le score de correspondance pour trier les résultats par pertinence
      let matchScore = 0;
      if (matchRace) matchScore += 3;
      if (matchAge) matchScore += 2;
      if (matchGabarit) matchScore += 2;
      if (matchLogement) matchScore += 1;
      if (matchSexe) matchScore += 1;
      if (matchCouleur) matchScore += 2;
      if (matchSociabilite) matchScore += 2;
      if (matchCaracteristique) matchScore += 1;
      if (matchBesoin) matchScore += 1;

      // En mode strict, tous les critères doivent correspondre
      const matches = flexibleMatch
        ? matchScore > 0 // En mode flexible, au moins un critère doit correspondre
        : matchRace &&
          matchAge &&
          matchGabarit &&
          matchLogement &&
          matchSexe &&
          matchCouleur &&
          matchSociabilite &&
          matchBesoin;

      if (matches) {
        results.push({
          ...animal,
          matchScore, // Ajouter le score pour le tri
        });
      }
    }
  }

  // Trier par score de correspondance (du plus élevé au plus bas)
  return results.sort((a, b) => b.matchScore - a.matchScore);
}

// Formater les résultats en texte lisible
function formatAnimalResults(animals) {
  return animals
    .map(
      (animal) =>
        `🐾 ${animal.name} (${animal.race}, ${animal.age} ans, ${animal.sexe})\n` +
        `📏 ${animal.gabarit}, 🏠 ${
          animal.logement || "tout type de logement"
        }, 🎨 ${animal.couleur}\n` +
        `💭 ${animal.description}`
    )
    .join("\n\n");
}

// Fonction pour générer des conseils selon le type d'animal
function generateAnimalAdvice(typeAnimal, logement, gabarit) {
  const typeLC = typeAnimal?.toLowerCase() || "";

  if (typeLC.includes("chien")) {
    if (logement?.toLowerCase() === "appartement") {
      if (gabarit?.toLowerCase() === "grand") {
        return "Un grand chien en appartement nécessite beaucoup d'exercice quotidien. Prévoyez au moins 2 longues promenades par jour et un accès régulier à des espaces où il pourra courir librement. Certaines races comme le Greyhound peuvent s'adapter à l'appartement malgré leur taille.";
      } else {
        return "Pour un appartement, les chiens de petite ou moyenne taille sont idéaux. Assurez-vous de sortir votre chien 3-4 fois par jour et prévoyez des jeux d'intelligence pour le stimuler mentalement. Les races comme le Bichon, le Carlin ou le Shiba Inu s'adaptent généralement bien à la vie en appartement.";
      }
    } else {
      return "Les chiens ont besoin d'exercice quotidien, d'interactions sociales et d'une éducation cohérente. Prévoyez un budget pour la nourriture, les soins vétérinaires et le toilettage. L'espérance de vie moyenne est de 10-15 ans selon les races.";
    }
  } else if (typeLC.includes("chat")) {
    return "Les chats sont relativement indépendants mais ont besoin d'interactions et de jeux. Prévoyez un arbre à chat, des zones en hauteur et des jouets. Un chat vivra en moyenne 12-15 ans et nécessite des visites vétérinaires régulières, un toilettage selon la longueur de son poil et une alimentation de qualité.";
  } else if (typeLC.includes("rongeur")) {
    return "Les rongeurs sont des animaux sociables qui nécessitent une cage spacieuse, des accessoires pour grimper et se cacher, ainsi que des jouets à ronger. Leur durée de vie varie de 2-3 ans pour les hamsters et gerbilles à 5-8 ans pour les cochons d'Inde. Ils sont parfaits pour les personnes avec un petit espace.";
  } else if (
    typeLC.includes("reptile") ||
    typeLC.includes("serpent") ||
    typeLC.includes("lézard")
  ) {
    return "Les reptiles nécessitent un terrarium adapté avec des zones de température différentes, un éclairage UV spécifique et une alimentation adaptée à l'espèce. Ce sont des animaux de compagnie à long terme (10-30 ans selon les espèces) qui demandent peu d'interactions mais des conditions de vie très précises.";
  } else {
    return "Pour bien choisir votre animal de compagnie, considérez votre style de vie, le temps que vous pouvez lui consacrer et votre espace disponible. Chaque animal a des besoins spécifiques en termes d'alimentation, d'exercice et de soins médicaux.";
  }
}

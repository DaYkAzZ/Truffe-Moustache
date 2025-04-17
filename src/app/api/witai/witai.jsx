import { readFileSync } from "fs";
import path from "path";

const filePath = path.resolve("../../data/data.json");
const data = JSON.parse(readFileSync(filePath, "utf-8"));

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

    const dataWit = await response.json();

    let processedResponse;

    if (dataWit.intents && dataWit.intents.length > 0) {
      const intent = dataWit.intents[0].name;

      switch (intent) {
        case "recherche_animaux":
          const typeAnimal = extractEntity(dataWit, "type_animal");
          const age = parseInt(extractEntity(dataWit, "age"));
          const caracteristique = extractEntity(dataWit, "caracteristique");

          const results = findMatchingAnimals(typeAnimal, age, caracteristique);

          if (results.length === 0) {
            processedResponse = `Désolé, je n’ai pas trouvé d’animaux correspondant à votre recherche.`;
          } else {
            processedResponse =
              `Voici ce que j’ai trouvé pour vous :\n\n` +
              results
                .map(
                  (animal) =>
                    `🐾 ${animal.name} (${animal.race}, ${animal.age} ans)\n📝 ${animal.description}`
                )
                .join("\n\n");
          }
          break;

        case "information_adoption":
          processedResponse =
            "Pour adopter un animal, vous devez d'abord vous inscrire sur notre plateforme, puis consulter nos animaux disponibles. Une fois votre choix fait, nous planifierons une visite pour vous faire rencontrer l'animal.";
          break;

        case "salutation":
          processedResponse =
            "Bonjour ! Je suis Truffe, votre assistant pour trouver le compagnon idéal. Comment puis-je vous aider aujourd'hui ?";
          break;

        default:
          processedResponse =
            "Je comprends que vous cherchez un animal. Pouvez-vous me préciser quel type d'animal vous intéresse ?";
      }
    } else {
      processedResponse =
        "Je ne suis pas sûr de comprendre. Pourriez-vous reformuler votre demande concernant les animaux ?";
    }

    return Response.json({ response: processedResponse });
  } catch (error) {
    console.error("Error processing Wit.ai request:", error);
    return Response.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}

function extractEntity(data, entityName) {
  if (data.entities && data.entities[entityName]) {
    const entity = data.entities[entityName][0];
    return entity.value || entity.name;
  }
  return null;
}

function findMatchingAnimals(typeAnimal, age, caracteristique) {
  const result = [];

  const categories = {
    chien: "Chiens",
    chat: "Chats",
    rongeur: "Rongeurs",
    reptile: "Reptiles",
  };

  const categoryKey = categories[typeAnimal?.toLowerCase()] || null;

  const animals = categoryKey ? data[categoryKey] : Object.values(data).flat();

  for (const animal of animals) {
    const matchAge = age ? Math.abs(animal.age - age) <= 1 : true;
    const matchCarac = caracteristique
      ? animal.sociabilite
          ?.toLowerCase()
          .includes(caracteristique.toLowerCase()) ||
        animal.gabarit?.toLowerCase().includes(caracteristique.toLowerCase()) ||
        animal.couleur?.toLowerCase().includes(caracteristique.toLowerCase())
      : true;

    if (matchAge && matchCarac) {
      result.push(animal);
    }
  }

  return result;
}

export const extractFiltersFromEntities = (entities) => {
  const getValue = (key) => entities[key]?.[0]?.value || null;

  return {
    espece: getValue("espece:espece"),
    race: getValue("race:race"),
    gabarit: getValue("gabarit:gabarit"),
    logement: getValue("logement:logement"),
    sexe: getValue("sexe:sexe"),
  };
};

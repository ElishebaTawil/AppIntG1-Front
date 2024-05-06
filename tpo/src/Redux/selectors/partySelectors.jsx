

// Selector para obtener los detalles de una fiesta por su ID
export const getPartyById = (state, partyId) => {
    // Suponiendo que el estado tiene una propiedad 'parties' que almacena un arreglo de fiestas
    const { parties } = state;
    // Buscar la fiesta por su ID
    return parties.find(party => party.id === parseInt(partyId));
  };
  
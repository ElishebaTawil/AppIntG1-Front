import all_parties from '../../Components/Assets/all_parties';

// Define el estado inicial del reducer
const initialState = {
  parties: all_parties
};

// Define el reducer
const partyReducer = (state = initialState, action) => {
  switch (action.type) {
    // Puedes añadir casos de acción aquí si necesitas realizar cambios en los datos de las fiestas
    default:
      return state;
  }
};

export default partyReducer;

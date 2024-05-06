import { getPartyById } from '../selectors/partySelectors'; // Asegúrate de que la ruta sea correcta

// Resto del código


// Acción para solicitar los detalles de una fiesta por su ID
export const FETCH_PARTY_BY_ID_REQUEST = 'FETCH_PARTY_BY_ID_REQUEST';
export const FETCH_PARTY_BY_ID_SUCCESS = 'FETCH_PARTY_BY_ID_SUCCESS';
export const FETCH_PARTY_BY_ID_FAILURE = 'FETCH_PARTY_BY_ID_FAILURE';

export const fetchPartyByIdRequest = () => ({
  type: FETCH_PARTY_BY_ID_REQUEST,
});

export const fetchPartyByIdSuccess = (party) => ({
  type: FETCH_PARTY_BY_ID_SUCCESS,
  payload: party,
});

export const fetchPartyByIdFailure = (error) => ({
  type: FETCH_PARTY_BY_ID_FAILURE,
  payload: error,
});

// Acción para buscar los detalles de una fiesta por su ID
export const fetchPartyById = (partyId) => {
    return (dispatch, getState) => {
      dispatch(fetchPartyByIdRequest());
      try {
        // Obtener las fiestas del estado usando un selector
        const party = getPartyById(getState(), partyId); // Suponiendo que tienes un selector 'getPartyById'
        // Verificar si se encontró la fiesta
        if (party) {
          dispatch(fetchPartyByIdSuccess(party));
        } else {
          // Si la fiesta no se encuentra, lanzar un error
          throw new Error('Party not found');
        }
      } catch (error) {
        dispatch(fetchPartyByIdFailure(error.message));
      }
    };
  };

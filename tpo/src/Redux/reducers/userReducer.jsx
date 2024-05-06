// userReducer.js

const initialState = {
    user: { name: "", email: "", password: "", isLogged: false }
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_USER':
        return {
          ...state,
          user: action.payload
        };
      case 'LOGOUT_USER':
        return {
          ...state,
          user: { name: "", email: "", password: "", isLogged: false }
        };
      case 'REGISTER_USER':
        return {
          ...state,
          user: action.payload
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  
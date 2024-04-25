
const initialState = {
  isLoggedIn: false,
  isLoading: false,
  userCred: {},
  companyId: '',
  error: { isError: false, message: "", type: "error" },
};

// Define the global reducer function that handles state updates
const globalReducer = (state, action) => {
  switch (action.type) {

    case "TOGGLE_SPINNER":
      return { ...state, isLoading: action.payload };

    case "SET_MESSAGE":
      return {
        ...state,
        error: {
          ...state.error,
          isError: action.payload.isError,
          message: action.payload.message,
          type: action.payload.type,
        },
      }

    case "USER_PROFILE":
      return { ...state, userCred: action.data };

    case "COMPANY_ID":
      return { ...state, companyId: action.data };

    case "LOGIN_USER":
      return { ...state, isLoggedIn: true, userCred: action.payload.userCred }

    case "LOGOUT_USER":
      // Remove token from localStorage and update isLoggedIn
      localStorage.removeItem("token");
      localStorage.removeItem("companyId");
      return { ...state, isLoggedIn: false }

    default:
      return state;
  }
};

export { globalReducer, initialState };

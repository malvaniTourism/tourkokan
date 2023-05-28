import {
  SaveAccess_token,
  SaveLoginUser,
  SetDestination,
  SetLoader,
  SetSource,
} from "./Types";

const initialState = {
  loginUser: [],
  access_token: "",
  isLoading: false,
  source: {},
  destination: {},
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SaveLoginUser:
      return {
        ...state,
        loginUser: action.payload,
      };
    case SaveAccess_token:
      return {
        ...state,
        access_token: action.payload,
      };
    case SetLoader:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SetSource:
      return {
        ...state,
        source: action.payload,
      };
    case SetDestination:
      return {
        ...state,
        destination: action.payload,
      };
    default:
      return state;
  }
};

export default commonReducer;

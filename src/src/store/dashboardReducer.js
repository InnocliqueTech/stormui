// action - state management
import { GETDASHBOARD } from './actions';

// initial state
export const initialState = {
  dashboardData
};

// ==============================|| AUTH REDUCER ||============================== //

const auth = (state = initialState, action) => {
  switch (action.type) {
    case GETDASHBOARD: {
      return {
        ...state,
        
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default auth;

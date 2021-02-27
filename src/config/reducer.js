const initialState = {
    isLogin:false,
    userData: {

    },
    openPanel:false,
    balance:{
      money:0,
      rates:0
    }
  };
  
  const reduce = (state = initialState, action) => {
    switch (action.type) {
      case "IS_LOGIN": {
        return {
          ...state,
          isLogin: !state.isLogin
        };
      }

      case "OPEN_PANEL": {
        return {
          ...state,
          openPanel: !state.openPanel
        };
      }

      case "SET_DATA": {
        return {
          ...state,
          userData: {
            ...state.userData,
            ...action.payload
          }
        };
      }

      case "REL_BALANCE": {
        return {
          ...state,
          balance: action.payload
        };
      }
  
      default:
        return state;
    }
  };
  
  export default reduce;
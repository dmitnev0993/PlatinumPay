const initialState = {
    isLogin:false,
    created:false,
    idForRef:null,
    pageForRef:1,
    scrollPr:0,
    backToProducts:false,
    backLabel: '',
    dataProducts:{

    },
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

      case "SET_DATA_PRODUCTS": {
        return {
          ...state,
          dataProducts: {
            ...state.dataProducts,
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

      case "SET_ID_FOR_REF": {
        return {
          ...state,
          idForRef: action.payload
        };
      }

      case "SET_PAGE_FOR_REF": {
        return {
          ...state,
          pageForRef: action.payload
        };
      }

      case "IS_CREATED": {
        return {
          ...state,
          created: !state.created
        };
      }

      case "IS_BACK_TO_PR": {
        return {
          ...state,
          backToProducts: !state.backToProducts
        };
      }

      case "SET_SCROLL_PR": {
        return {
          ...state,
          scrollPr: action.payload
        };
      }

      case "SET_LABEL": {
        return {
          ...state,
          backLabel: action.payload
        };
      }
  
      default:
        return state;
    }
  };
  
  export default reduce;
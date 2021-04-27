const initialState = {
    isLogin:false,
    created:false,
    idForRef:null,
    idForUrl:null,
    idForPrices:null,
    isInvite:false,
    inviteId:null,
    pageForRef:1,
    scrollPr:0,
    index:null,
    backToProducts:false,
    backLabel: '',
    dataProducts:{

    },
    product:{

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

      case "SET_INVITE": {
        return {
          ...state,
          isInvite: !state.isInvite
        };
      }

      case "SET_ID_FOR_REF": {
        return {
          ...state,
          idForRef: action.payload
        };
      }

      case "SET_ID_FOR_URL": {
        return {
          ...state,
          idForUrl: action.payload
        };
      }

      case "SET_ID_FOR_PRICES": {
        return {
          ...state,
          idForPrices: action.payload
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

      case "SET_PRODUCT": {
        return {
          ...state,
          product: action.payload
        };
      }

      case "SET_INDEX": {
        return {
          ...state,
          index: action.payload
        };
      }

      case "SET_INVITE_ID": {
        return {
          ...state,
          inviteId: action.payload
        };
      }
  
      default:
        return state;
    }
  };
  
  export default reduce;
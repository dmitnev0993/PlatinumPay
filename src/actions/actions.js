export const setLogin = () => ({
    type:'IS_LOGIN'
});

export const setData = data => ({
    type:'SET_DATA',
    payload:data
});

export const setDataProducts = data => ({
    type:"SET_DATA_PRODUCTS",
    payload:data
});

export const setOpenPanel = () => ({
    type:'OPEN_PANEL'
});

export const isCreated = () => ({
    type:'IS_CREATED'
});

export const setBalance = (money,rates) => ({
    type:'REL_BALANCE',
    payload:{
        money:money,
        rates:rates
    }
});

export const setIdForRef = id => ({
    type:'SET_ID_FOR_REF',
    payload:id
});

export const setIdForUrl = id => ({
    type:'SET_ID_FOR_URL',
    payload:id
});

export const setIdForPrices = id => ({
    type:'SET_ID_FOR_PRICES',
    payload:id
});

export const setInviteId = id => ({
    type:'SET_INVITE_ID',
    payload:id
});

export const setInvite = () => ({
    type:'SET_INVITE'
});

export const setPageForRef = page => ({
    type:'SET_PAGE_FOR_REF',
    payload:page
});

export const setScrollPr = scroll => ({
    type:'SET_SCROLL_PR',
    payload:scroll
});


export const isBackToPr = () => ({
    type:'IS_BACK_TO_PR'
});

export const setBackLabel = label => ({
    type:'SET_LABEL',
    payload: label
});

export const setProduct = data => ({
    type:'SET_PRODUCT',
    payload: data
});

export const setIndex = data => ({
    type:'SET_INDEX',
    payload: data
});
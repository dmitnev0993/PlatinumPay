export const setLogin = () => ({
    type:'IS_LOGIN'
})

export const setData = data => ({
    type:'SET_DATA',
    payload:data
})

export const setOpenPanel = () => ({
    type:'OPEN_PANEL'
})

export const setBalance = (money,rates) => ({
    type:'REL_BALANCE',
    payload:{
        money:money,
        rates:rates
    }
})
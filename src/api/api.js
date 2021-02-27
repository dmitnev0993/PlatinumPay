export const checkToken = (token, isLogin, myHistory) => {
    setInterval(() => {
        if(isLogin){     
        fetch(`https://secure.platinumpay.cc/v1/client/auth/token`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then((res) => {
            return res.json()
          })
          .then(data => {
            if (myHistory.location.pathname !== '/' && myHistory.location.pathname !== '/login' && myHistory.location.pathname !== '/register') {
              if (!data.result) {
                exit()
              }
              else {
                dispatch(setData({
                  token: token,
                  level: data.response.level,
                }))
              }
            }
          })
        }
      }, 10000);
}
import React, { useReducer, Suspense, lazy, useState,useEffect,useRef } from "react";
import { Route, Switch } from "react-router-dom";

// import Register from "./components/Auth/Register/Register.jsx";
// import Dashboard from "./components/Dashboard/Dashboard.jsx";
 import MainHeader from "./components/MainPage/header/MainHeader.jsx";
// import MainPage from "./components/MainPage/MainPage.jsx";
// import Profile from "./components/Dashboard/Pages/Profile/Profile";
import { ThemeContext } from "./context/themeContext.js";
import { useLocalStorageTheme } from "./hooks/useLocalStorageTheme.js";
import { DARK, LIGHT, theme } from "./state/consts.js";
import { mainReducer } from "./state/mainReducer.js";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./config/reducer";
import LoadingBar from 'react-top-loading-bar'

const Login = lazy(()=> import("./components/Auth/Login/Login.jsx"));
const Register = lazy(()=> import("./components/Auth/Register/Register.jsx"));
const Dashboard = lazy(()=> import("./components/Dashboard/Dashboard.jsx"));
const MainPage = lazy(()=> import("./components/MainPage/MainPage.jsx"));
const Profile = lazy(()=> import("./components/Dashboard/Pages/Profile/Profile"));
const Products = lazy(()=> import("./components/Dashboard/Pages/Products/Products"));
const Subscriptions = lazy(()=> import("./components/Dashboard/Pages/Subscriptions/Subscriptions"));
const Users = lazy(()=> import("./components/Dashboard/Pages/Users/Users"));
const CreateProduct = lazy(()=> import("./components/Dashboard/Pages/Products/CreateProduct"));
const CreateURL = lazy(()=> import("./components/Dashboard/Pages/Products/CreateURL"));

function App({ sound, flag }) {
  const { currentTheme } = useLocalStorageTheme("theme");
  const [progress, setProgress] = useState(0);
  const initialState = {
    theme: currentTheme === "light" ? theme.light : theme.dark,
  };

  const [state, dispatch] = useReducer(mainReducer, initialState);
  document.body.style.backgroundColor = state.theme;

  const themeChanger = () => {
    dispatch({
      type: state.theme === theme.light ? DARK : LIGHT,
    });
    document.body.style.backgroundColor = state.theme;
  };

  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  const ref = useRef(null)

  const LazyLoad = () => {
    useEffect(() => {
      ref.current.continuousStart()
        return () => {
          ref.current.complete()
        };
    });

    return '';
};
  return (
    <>
      <ThemeContext.Provider value={{ currentTheme }}>
        <Provider store={store}>
        <LoadingBar color="rgb(249, 185, 66)" ref={ref}  height={3} loaderSpeed={1000} waitingTime={400}   onLoaderFinished={() => setProgress(0)}/>
          <MainHeader themeChanger={themeChanger}/>
          <Suspense fallback={<LazyLoad/>}
          >
          <Switch>
            <Route path="/" exact>
              <MainPage themeChanger={themeChanger} sound={sound} />
            </Route>
            <Route path="/login" exact component={Login}/>
            
            <Route path="/register" exact component={Register}/>

            <Route path="/dashboard" exact component={Dashboard}/>

            <Route path="/dashboard/profile" exact component={Profile}/>

            <Route path="/dashboard/products" exact component={Products}/>

            <Route path="/dashboard/users" exact component={Users}/>

            <Route path="/dashboard/products/create" exact component={CreateProduct}/>

            <Route path="/dashboard/products/url" exact component={CreateURL}/>

            <Route path="/dashboard/products/subscriptions" exact component={Subscriptions}/>



          </Switch>
          </Suspense>
        </Provider>
      </ThemeContext.Provider>

    </>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import { Component, Suspense, lazy } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Loading from "./Loading";

import { check_token } from "./Toolkit/authSlice";





const Header = lazy(() => import("./Pages/Layout/Header/Header"));
const Registration = lazy(() =>
  import("./Pages/Auth/Registration/Registration")
);
const Login = lazy(() => import("./Pages/Auth/Login/Login"));
const Home = lazy(() => import("./Pages/CMS/Home/Home"));
const Create=lazy(()=>import("./Pages/CMS/Create/Create"))
const  UpDate=lazy(()=>import("./Pages/CMS/UpDate/UpDate"))
const Product=lazy(()=>import("./Pages/CMS/Product/Product"))
function Private({children}) {
  const token=localStorage.getItem("token") || sessionStorage.getItem("token")
  return token!=null || token!=undefined?(<>{children}</>):(<>
  <Navigate to={"/"}/>
  {toast.error("Login First")}
  
  </>)
  
}
const publicRoutesName = [
  {
    path: "/",
    Component: <Login />,
  },
  {
    path: "/registration",
    Component: <Registration />,
  },
];
const privateRoutesName = [
  {
    path: "/home",
    Component: <Home />,
  },
  {
    path:"/create",
    Component:<Create/>
  },{
    path:"/Product",
    Component:<Product/>
  },{
    path:"/Product/:id",
    Component:<UpDate/>
  }
];
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(check_token())

  },[])
  return (
    <Suspense fallback={<h1><Loading/></h1>}>
      <Router>
        <Header />
        <Routes>
          {publicRoutesName.map((item) => (
            <Route path={item.path} element={item.Component} />
          ))}
          {privateRoutesName.map((item) => (
            <Route path={item.path} element={<Private>{item.Component}</Private>} />
          ))}
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;

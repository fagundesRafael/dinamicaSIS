import "./style/dark.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import ClientsList from "./pages/list/ClientsList"
import ProductsList from "./pages/list/ProductsList"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Configuration from "./pages/system/Configuration";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to="/login"/>
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
              <Route index element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="users">
              <Route index element={<RequireAuth><ClientsList /></RequireAuth>} />
              <Route path=":userId" element={<RequireAuth><Single /></RequireAuth>} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Inserir novo cliente" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<RequireAuth><ProductsList /></RequireAuth>} />
              <Route path=":productId" element={<RequireAuth><Single /></RequireAuth>} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Adicionar novo produto" />}
              />
            </Route>
            <Route path="configuration">
              <Route index element={<RequireAuth><Configuration /></RequireAuth>} />
              <Route path=":configurationId" element={<RequireAuth><Single /></RequireAuth>} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Atualizar configurações" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

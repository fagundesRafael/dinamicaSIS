import "./style/dark.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NewProduct from "./pages/new/NewProduct";
import NewClient from "./pages/new/NewClient";
import NewSales from "./pages/new/NewSales";
import SingleUser from "./pages/single/SingleUser";
import SingleProduct from "./pages/single/SingleProduct";
import SingleSale from "./pages/single/SingleSale";
import ClientsList from "./pages/list/ClientsList"
import ProductsList from "./pages/list/ProductsList"
import ProductEdit from "./pages/edit/ProductEdit";
import UserEdit from "./pages/edit/UserEdit";
import SalesList from "./pages/list/SalesList";
import Configurations from "./pages/system/Configurations";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, salesInputs } from "./formSource";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";


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
              <Route path=":userId" element={<RequireAuth><SingleUser /></RequireAuth>} />
              <Route path="edit/:userId" element={<RequireAuth><UserEdit inputs={productInputs} topTitle="Atualize as informações" /></RequireAuth>} />

              <Route
                path="new"
                element={<NewClient titleTop="Inserir novo cliente" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<RequireAuth><ProductsList /></RequireAuth>} />
              <Route path=":productId" element={<RequireAuth><SingleProduct /></RequireAuth>} />
              <Route path="edit/:productId" element={<RequireAuth><ProductEdit inputs={productInputs} topTitle="Atualize as informações" /></RequireAuth>} />
              <Route
                path="new"
                element={<NewProduct titleTop="Adicionar novo produto" />}
              />
            </Route>
            <Route path="sales">
              <Route index element={<RequireAuth><SalesList /></RequireAuth>} />
              <Route path=":saleId" element={<RequireAuth><SingleSale /></RequireAuth>} />
              <Route
                path="new"
                element={<NewSales inputs={salesInputs} title="Registrar nova transação" />}
              />
            </Route>
            <Route path="configurations">
              <Route index element={<RequireAuth><Configurations /></RequireAuth>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

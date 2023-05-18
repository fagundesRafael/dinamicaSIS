import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import logoDinamica from "../../assets/logoDinamica.png"

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo"><img src={logoDinamica} alt="" style={{ width: "130px", marginTop: "8px", marginRight: "8px"}}/></span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Principal</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Painel de Controle</span>
          </li>
          <p className="title">Listas</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Clientes</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Produtos</span>
            </li>
          </Link>
          <Link to="/sales" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span>Vendas</span>
          </li>
          </Link>
          <li style={{cursor: "not-allowed"}}>
            <LocalShippingIcon className="icon" />
            <span>Entregas</span>
          </li>
          <p className="title">Utilitários</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Gráficos</span>
          </li>
          <li style={{cursor: "not-allowed"}}>
            <NotificationsNoneIcon className="icon" />
            <span>Notificações</span>
          </li>
          <p className="title">Sistema</p>
          <Link
            to="https://console.firebase.google.com/u/0/project/lamafirebase-d19be/overview?hl=pt-br"
            style={{ textDecoration: "none" }}
          >
            <li style={{ textDecoration: "none"}}>
              <SettingsSystemDaydreamOutlinedIcon className="icon" />
              <span>Banco de dados</span>
            </li>
          </Link>
            <Link to="/configurations" style={{ textDecoration: "none" }}>
            <li style={{ textDecoration: "none" }}>
              <SettingsApplicationsIcon className="icon" />
              <span>Configurações</span>
            </li>
            </Link>
          <p className="title">Usuário</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Perfil</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Sair</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;

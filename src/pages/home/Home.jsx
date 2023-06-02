import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import DatatableHistory from "../../components/datatable/DatatableHistory";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="product" />
          <Widget type="order" />
          <Widget type="earning" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Movimentações gerais da empresa:" aspect={1.8 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Últimas Transações</div>
          <DatatableHistory/>
        </div>
      </div>
    </div>
  );
};

export default Home;

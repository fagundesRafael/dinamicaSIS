import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableClients from "../../components/datatable/DatatableClients"

const ClientsList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableClients/>
      </div>
    </div>
  )
}

export default ClientsList
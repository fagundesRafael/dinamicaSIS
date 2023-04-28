import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./Configuration.scss"
import DatatableConfiguration from "../../components/datatable/DatatableConfiguration"

const Configuration = () => {
    return (
        <div className="configuration">
          <Sidebar/>
          <div className="configurationContainer">
            <Navbar/>
            <DatatableConfiguration/>
          </div>
        </div>
      )
}

export default Configuration
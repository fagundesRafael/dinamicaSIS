import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableProducts from "../../components/datatable/DatatableProducts"

const ProductsList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableProducts/>
      </div>
    </div>
  )
}

export default ProductsList
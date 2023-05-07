import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const SingleProduct = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProductData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (productData === null) {
      return fetchData();
    }
    console.log(productData);
  }, [productId, productData]);

  const goToEdit = () => {
    navigate(`/products/edit/${productId}`)
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={goToEdit}>Editar</div>
            <h1 className="title">Informações</h1>
            <div className="item">
              <img
                src={productData ? (productData.img) : ("https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg")}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{productData && (productData.title)}</h1>
                <div className="detailItem">
                  <span className="itemKey">Tipo:</span>
                  <span className="itemValue">{productData && (productData.type)}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Marca:</span>
                  <span className="itemValue">{productData && (productData.brand)}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <span className="itemValue">
                    {productData && (productData.status)}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Custo:</span>
                  <span className="itemValue">{productData && (productData.cost)}</span>
                  <span className="itemKey"><br /><hr />Preço:</span>
                  <span className="itemValue">{productData && (productData.price)}</span>
                  <span className="itemKey"><br /><hr />Unidades:</span>
                  <span className="itemValue">{productData && (productData.quantity)}<br /><hr /></span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

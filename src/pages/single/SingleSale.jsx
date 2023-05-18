import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const SingleSale = () => {
  const { saleId } = useParams();
  const [saleData, setSaleData] = useState(null);
  console.log(saleId);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "sales", saleId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSaleData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (saleData === null) {
      return fetchData();
    }
    console.log(saleData);
  }, [saleId, saleData]);

  const goToEdit = () => {
    navigate(`/sales/edit/${saleId}`);
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={goToEdit}>
              Editar
            </div>
            {/* <h1 className="title">Dados gerais da transação</h1> */}
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{saleData && saleData.client}</h1>
                <div className="detailItem">
                  <span className="itemKey">Item:</span>
                  <span className="itemValue">{saleData && saleData.item}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Unidades vendidas:</span>
                  <span className="itemValue">
                    {saleData && saleData.quantity}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Data da transação:</span>
                  <span className="itemValue">
                    {saleData && saleData.timeString}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Forma de pagamento:</span>
                  <span className="itemValue">
                    {saleData && saleData.paymentForm}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Serviços:</span>
                  <span className="itemValue">
                    {saleData && saleData.service}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Observações:</span>
                  <span className="itemValue">
                    {saleData && saleData.observations}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Custo unitário R$:</span>
                  <span className="itemValue">
                    {" "}
                    - {saleData && saleData.cost}
                  </span>
                  <span className="itemKey">
                    <br />
                    <hr />
                    Preço unitário R$:
                  </span>
                  <span className="itemValue">
                    + {saleData && saleData.price}
                  </span>
                  <span className="itemKey">
                    <br />
                    <hr />
                    Acréscimos / descontos R$ :
                  </span>
                  <span className="itemValue">
                    {saleData && saleData.discount}
                  </span>
                  <span className="itemKey">
                    <br />
                    <hr />
                    Lucro final R$:
                  </span>
                  <span className="itemValue">
                     = {saleData &&
                      saleData.quantity *
                        (saleData.price - saleData.cost + saleData.discount)}
                    <hr />
                  </span>
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

export default SingleSale;

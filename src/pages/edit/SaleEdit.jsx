import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const SaleEdit = ({ inputs, topTitle }) => {
  const { saleId } = useParams();
  const { document, loading } = useFetchDocument("sales", saleId);
  const { updateDocument, response } = useUpdateDocument("sales");

  const [dataUsers, seDataUsers] = useState([""]);
  const [dataProducts, setDataProducts] = useState([""]);
  const [client, setClient] = useState("");
  const [service, setService] = useState("");
  const [item, setItem] = useState("");
  const [cost, SetCost] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("");
  const [observations, setObservations] = useState("");
  const [discount, setDiscount] = useState("");
  const [paymentForm, setPaymentForm] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");
  const [carShop, setCarShop] = useState();

  const hoje = new Date()
  const dia = hoje.getDate().toString().padStart(2, "0")
  const mes = String(hoje.getMonth() + 1).padStart(2, "0")
  const ano = hoje.getFullYear()
  const dataAtual = `${dia}/${mes}/${ano}`

  useEffect(() => {
    // FETCH USERS
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        seDataUsers(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    // FETCH PRODUCTS
    const unsub = onSnapshot(
      collection(db, "products"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setDataProducts(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const navigate = useNavigate();

  const data = {
    client,
        service,
        item,
        cost,
        price,
        quantity,
        paymentForm,
        observations,
        discount,
  };

  const handleUpDate = async (e) => {
    e.preventDefault();

    updateDocument(saleId, data);

    navigate(-1);
  };

  useEffect(() => {
    if (document) {
      setClient(document.client)
      setService(document.service);
      setItem(document.item);
      setPrice(document.price);
      setQuantity(document.quantity);
      setPaymentForm(document.paymentForm);
      setObservations(document.observations);
      setDiscount(document.discount);
      setTotalCost(document.totalCost);
      setTotalPrice(document.totalPrice);
    }
  }, [document]);

  return (
    <div className="edit">
      <Sidebar />
      <div className="editContainer">
        <Navbar />
        <div className="top">
          <h1>{topTitle}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            
          </div>
          <div className="right">
          <form >
              <div className="formInput">
                <label>Cliente:</label>
                <select
                  name="client"
                  id="client"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  required
                >
                  <option value="" key="N.I.">
                    Não informado
                  </option>
                  {dataUsers.map((option) => (
                    <option key={option.id + 1}>{option.userName}</option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label>Serviços (se houver):</label>
                <input
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Item:</label>
                <select
                  name="item"
                  id="item"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  required
                >
                  <option value="" key="N.I..">
                    Não informado
                  </option>
                  {dataProducts.map((option) => (
                    <option key={option.id + 1}>{`${option.title}`}</option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label>Quantidade:</label>
                <input
                  type="number"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>
              <div className="formInput">
                <label>Observações (se houver):</label>
                <textarea
                  name="observations"
                  id="observations"
                  cols="20"
                  rows="3"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                ></textarea>
              </div>
              <div className="formInput">
                <label>Desconto(s) e/ou acréscimo(s):</label>
                <input
                  type="number"
                  placeholder="R$"
                  value={discount}
                  onChange={(e) => setDiscount(parseInt(e.target.value))}
                />
              </div>
              {carShop ? (<button type="submit">Registrar outro</button>) : (<button type="submit">Atualizar</button>)}
              {error && <h2 className="error">{error}</h2>}
            </form>
          </div>
          <div className="right">
              {carShop && (
                <form>
                <div className="itemList">
                  <h5>{carShop.item}</h5>
                  <h6>{carShop.quantity} unidade(s) selecionada(s)</h6>
                  <h6>Comprador(a){carShop.client}</h6>
                  {carShop.observations && <h6>OBS: {carShop.observations}</h6>}
                  <h6>Custo unitário = R$: {carShop.cost}</h6>
                  <h6>Preço unitário = R$: {carShop.price}</h6>
                  {carShop.service && <h6>Serviços: {carShop.service}</h6>}
                  {carShop.discount && (
                    <h6>Desc(s) / acréscimo(s) = R$: {carShop.discount}</h6>
                  )}
                  <h6>
                    Lucro total = R$:{" "}
                    {carShop.price * carShop.quantity -
                      carShop.cost * carShop.quantity +
                      carShop.discount}
                  </h6>
                </div>
                <div className="formInput">
                  <select
                    name="paymentForm"
                    id="paymentForm"
                    value={paymentForm}
                    onChange={(e) => setPaymentForm(e.target.value)}
                    required
                  >
                    <option value="">Forma de pagamento</option>
                    <option value="dinheiro">dinheiro</option>
                    <option value="debito">debito</option>
                    <option value="credito">credito</option>
                    <option value="pix">pix</option>
                    <option value="transferencia">transferencia</option>
                    <option value="permuta">permuta</option>
                    <option value="outros">outros</option>
                  </select>
                </div>
                <div className="formInput">
                  <button>Confirmar compra</button>
                </div>
              </form>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleEdit;

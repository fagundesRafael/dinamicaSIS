import "./new2.scss";
import shopCar from "../../assets/shopCar.jpg";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import {
  addDoc,
  serverTimestamp,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const New2 = ({ inputs, title }) => {
  const [dataUsers, seDataUsers] = useState([""]);
  const [dataProducts, setDataProducts] = useState([""]);
  const [client, setClient] = useState("");
  const [service, setService] = useState("");
  const [item, setItem] = useState("");
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

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");

    let findItem = dataProducts.filter(
      (selectedElement) => selectedElement.title === item
    );
    let findCost = findItem.find((selectedElement) => selectedElement.cost);
    let findPrice = findItem.find((selectedElement) => selectedElement.price);
    let findQuantity = findItem.find(
      (selectedElement) => selectedElement.quantity
    );
    let numberCheck = parseInt(findQuantity.quantity);

    if (quantity > numberCheck) {
      setError(
        `Apenas ${findQuantity.quantity} unidade(s) disponível(eis) para ${item}.`
      );
      return;
    } else {
      let itemsAdd = {
        client,
        service,
        item,
        cost: parseInt(findCost.cost),
        price: parseInt(findPrice.price),
        quantity,
        paymentForm,
        observations,
        discount,
      };

      setTotalCost(parseInt((findCost.cost)));
      setTotalPrice(parseInt((findPrice.price)));
      setCarShop(itemsAdd);
      
      
    }
    setError("");
      setService("");
      setItem("");
      setQuantity("");
      setObservations("");
      setDiscount("");

  };

  const handleShopExecute = async (e) => {
    e.preventDefault();

    try {
      // --------------write a document (insert sale)---------------------//
      const docRef = await addDoc(collection(db, "sales"), {
        ...carShop,
        paymentForm,
        timeStamp: serverTimestamp(),
        timeString: dataAtual
      });
      console.log("Document written with ID: ", docRef.id);
      // ---------------------------------------------------------------//
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new2">
      <Sidebar />
      <div className="newContainer2">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <form onSubmit={handleAdd}>
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
                  cols="30"
                  rows="4"
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
              {carShop ? (<button type="submit">Registrar outro</button>) : (<button type="submit">Adicionar</button>)}
              {error && <h2 className="error">{error}</h2>}
            </form>
          </div>
          <div className="right">
              {carShop && (
                <form onSubmit={handleShopExecute}>
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
              <img src={shopCar} alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default New2;

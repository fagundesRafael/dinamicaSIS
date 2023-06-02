import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const ProductEdit = ({ inputs, topTitle }) => {
  const { productId } = useParams();
  const { document, loading } = useFetchDocument("products", productId);
  const { updateDocument, response } = useUpdateDocument("products");

  const [brand, setBrand] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [dataType, setDataType] = useState([""]);
  const [dataBrand, setDataBrand] = useState([""]);
  

  useEffect(() => {
    // FETCH TYPES
    const unsub = onSnapshot(
      collection(db, "types"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setDataType(list);
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
    // FETCH BRANDS
    const unsub = onSnapshot(
      collection(db, "brands"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setDataBrand(list);
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
    brand,
    cost,
    price,
    quantity,
    title,
    type,
    color,
    status
  };

  const handleUpDate = async (e) => {
    e.preventDefault();

    updateDocument(productId, data);

    navigate(-1);
  };

  useEffect(() => {
    if (document) {
      setBrand(document.brand);
      setCost(document.cost);
      setPrice(document.price);
      setQuantity(document.quantity);
      setStatus(document.status);
      setTitle(document.title);
      setType(document.type);
      setColor(document.color);
      setStatus(document.status)
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
            <img src={document && document.img} alt="" />
            <p style={{ width: "260px", margin: "auto", marginTop: "30px", color: "red" }}>
              IMAGEM NÃO RE-EDITÁVEL
            </p>
          </div>
          <div className="right">
            <form onSubmit={handleUpDate}>
              <div className="formInput">
                <label>Produto:</label>
                <input
                  type="text"
                  placeholder="atualize o nome do produto"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="formInput">
                <label>Tipo:</label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="_N.I." key="_N.I.">N.I.</option>
                  {dataType.map((option) => (
                    <option key={option.id}>{option.dataType}</option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label>Marca:</label>
                <select
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  <option value="N.I._" key="N.I._">N.I.</option>
                  {dataBrand.map((option) => (
                    <option key={option.id}>{option.dataBrand}</option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label>Custo:</label>
                <input
                  type="number"
                  placeholder="R$"
                  value={cost}
                  onChange={(e) => setCost(parseInt(e.target.value))}
                />
              </div>
              <div className="formInput">
                <label>Cor:</label>
                {inputs.map((input) => (
                  <>
                  {input.type === "selectColor" && (
                    <select
                      id={input.id}
                      name={input.id}
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    >
                      {input.options.map((option) => (
                        <option key={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )} </>
                ))}
              </div>
              <div className="formInput">
                <label>Preço:</label>
                <input
                  type="number"
                  placeholder="R$"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                />
              </div>
              <div className="formInput">
                <label>Qunatidade:</label>
                <input
                  type="number"
                  placeholder="em estoque"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>
              <div className="formInput">
              </div>
              <button
                disabled={response === true || loading === true}
                type="submit"
              >
                Atualizar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;

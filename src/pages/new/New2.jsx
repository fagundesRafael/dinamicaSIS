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
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const New2 = ({ inputs, title }) => {
  const [data, setData] = useState({});
  const [dataUsers, seDataUsers] = useState([""]);
  const [dataProducts, setDataProducts] = useState([""]);
  const [dataServices, setDataServices] = useState([""]);

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

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      // --------------write a document (insert sale)---------------------//
      const docRef = await addDoc(collection(db, inputs[0].setDocumentPath), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      // ---------------------------------------------------------------//
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
          <form onSubmit={handleAdd}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "text" && (
                    <input
                      id={input.id}
                      type={input.type}
                      autoComplete="on"
                      placeholder={input.placeholder}
                      onChange={handleInput}
                    />
                  )}
                  {input.type === "number" && (
                    <input
                      id={input.id}
                      type={input.type}
                      autoComplete="on"
                      placeholder={input.placeholder}
                      onChange={handleInput}
                    />
                  )}
                  {input.type === "selectUsers" && (
                    <select
                      id={input.id}
                      name={input.id}
                      onChange={handleInput}
                    >
                      <option value="_N.I." key="_N.I.">
                        N.I.
                      </option>
                      {dataUsers.map((option) => (
                        <option key={option.id + 1}>{option.userName}</option>
                      ))}
                    </select>
                  )}
                  {input.type === "selecForm" && (
                    <select
                      id={input.id}
                      name={input.id}
                      onChange={handleInput}
                    >
                      {input.options.map((option) => (
                        <option key={option.value}>{option.label}</option>
                      ))}
                    </select>
                  )}
                  {input.type === "selectItems" && (
                    <select
                      id={input.id}
                      name={input.id}
                      onChange={handleInput}
                    >
                      <option value="N.I._" key="N.I._">
                        N.I.
                      </option>
                      {dataProducts.map((option) => (
                        <option key={option.id + 1}>
                          {`${option.title}, R$ ${option.cost} a unidade.`}
                        </option>
                      ))}
                    </select>
                  )}
                  {input.type === "selectServices" && (
                    <select
                      id={input.id}
                      name={input.id}
                      onChange={handleInput}
                    >
                      <option value="N.I._" key="N.I._">
                        N.I.
                      </option>
                      {dataServices.map((option) => (
                        <option key={option.id + 1}>{option.title}</option>
                      ))}
                    </select>
                  )}
                  {input.type === "number_qtt" && (
                    <input
                      id={input.id}
                      type="number"
                      autoComplete="on"
                      placeholder={input.placeholder}
                      onChange={handleInput}
                      required
                    />
                  )}
                </div>
              ))}
              <button type="submit">Registrar venda</button>
            </form>
             </div>
          <div className="right">
          <img src={shopCar} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default New2;

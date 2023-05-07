import "./config.scss";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const Configurations = () => {
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [safe, setSafe] = useState(false);
  const [dataType, setDataType] = useState([]);
  const [dataBrand, setDataBrand] = useState([]);
  const [error, setError] = useState("");

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

  function clearError() {
    setSafe(false);
    setError(null);
    setType("");
    setBrand("");
  }

  function setSafeOut() {
    setTimeout(() => {
      setSafe(false);
    }, 1000);
  }

  const insertType = async () => {
    setSafe(true);
    const safeTest = dataType.filter((doc) => doc.dataType === type);
    if (safeTest.length !== 0) {
      return setError(
        `Já consta a existência do tipo ${type} no banco de dados. Por favor informe tipos não repetidos para que não haja problemas no banco de dados!`
      );
    }
    await addDoc(collection(db, "types"), {
      dataType: type,
    });
    setType("");
    setSafeOut();
  };

  const insertBrand = async () => {
    setSafe(true);
    const safeTest = dataBrand.filter((doc) => doc.dataBrand === brand);
    if (safeTest.length !== 0) {
      return setError(
        `Já consta a existência da marca ${brand} no banco de dados. Por favor informe tipos não repetidos para que não haja problemas no banco de dados!`
      );
    }
    await addDoc(collection(db, "brands"), {
      dataBrand: brand,
    });
    setBrand("");
    setSafeOut();
  };

  function typeSubmit(e) {
    e.preventDefault();
    insertType();
  }

  function brandSubmit(e) {
    e.preventDefault();
    insertBrand();
  }

  const typeDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "types", id));
      setDataType(dataType.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const brandDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "brands", id));
      setDataBrand(dataBrand.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="config">
      <Sidebar />
      <div className="configContainer">
        <Navbar />
        <div className="top">
          <h1>Configurações básicas</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={typeSubmit}>
              <div className="formInput">
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType((e.target.value).toLowerCase())}
                  placeholder="INSERIR NOVO TIPO DE OBJETO:"
                  required
                />
              </div>
              <button type="submit" disabled={safe}>
                NOVO TIPO
              </button>
            </form>
            <form onSubmit={brandSubmit}>
              <div className="formInput">
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="INSERIR NOVA MARCA DE OBJETO:"
                  required
                />
              </div>
              <button type="submit" disabled={safe}>
                NOVA MARCA
              </button>
            </form>
          </div>
        </div>
        <div className="bottom">
          <div className="containerArray">
            {error && (
              <div className="errorArea">
                <p>{error}</p>
                <button onClick={clearError}>RETORNAR</button>
              </div>
            )}
            <div className="sideType">
              <h2>Tipos:</h2>
              {dataType ? (
                dataType.map((item) => (
                  <p
                    key={item.id}
                    style={{
                      background: "rgba(4, 4, 4, 0.1)",
                      padding: "4px",
                      margin: "4px",
                    }}
                  >
                    {item.dataType} <button onClick={() => typeDelete(item.id)}>Deletar</button>
                  </p>
                ))
              ) : (
                <p>NÃO HÁ TIPOS LISTADOS</p>
              )}
            </div>
            <div className="sideBrand">
              <h2>Marcas:</h2>
              {dataBrand ? (
                dataBrand.map((item) => (
                  <p
                    key={item.id}
                    style={{
                      background: "rgba(4, 200, 4, 0.1)",
                      padding: "4px",
                      margin: "4px",
                    }}
                  >
                    {item.dataBrand} <button onClick={() => brandDelete(item.id)}>Deletar</button>
                  </p>
                ))
              ) : (
                <p>NÃO HÁ MARCAS LISTADAS</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurations;

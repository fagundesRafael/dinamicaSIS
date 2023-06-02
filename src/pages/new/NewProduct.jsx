import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
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

const NewProduct = ({ inputs, titleTop }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);
  const [dataType, setDataType] = useState([""]);
  const [dataBrand, setDataBrand] = useState([""]);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [cost, setCost] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");

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

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPer(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleAdd = async (e) => {
    e.preventDefault();

    setData({ ...data });

    try {
      // --------------write a document (insert in products)---------------------//
      const docRef = await addDoc(collection(db, "products"), {
        ...data,
        title,
        type,
        brand,
        cost,
        color,
        price,
        status,
        quantity,
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
          <h1>{titleTop}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  autoComplete="on"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput">
                <label>Produto:</label>
                <input
                  type="text"
                  id="productName"
                  placeholder="Informe o nome do produto"
                  autoComplete="on"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Tipo:</label>
                <select
                  name="type"
                  id="type"
                  required
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                >
                  <option value="N.I." key="_N.I.">
                    N.I.
                  </option>
                  {dataType.map((option) => (
                    <option key={option.dataType + 1}>{option.dataType}</option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label>Marca:</label>
                <select
                  name="brand"
                  id="brand"
                  required
                  onChange={(e) => setBrand(e.target.value)}
                  value={brand}
                >
                  <option value="N.I." key="N.I._">
                    N.I.
                  </option>
                  {dataBrand.map((option) => (
                    <option key={option.dataBrand + 1}>
                      {option.dataBrand}
                    </option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label>Custo:</label>
                <input
                  type="number"
                  id="cost"
                  name="cost"
                  autoComplete="on"
                  placeholder="$"
                  required
                  value={cost}
                  onChange={(e) => setCost(parseInt(e.target.value))}
                />
              </div>
              <div className="formInput">
                <label>Color:</label>
                <select
                  name="color"
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="N.I." key="_N.I._">
                    N.I.
                  </option>
                  <option value="branco" key="branco">
                    branco
                  </option>
                  <option value="amarelo" key="amarelo">
                    amarelo
                  </option>
                  <option value="azul" key="azul">
                    azul
                  </option>
                  <option value="preto" key="preto">
                    preto
                  </option>
                  <option value="cinza" key="cinza">
                    cinza
                  </option>
                  <option value="roxo" key="roxo">
                    roxo
                  </option>
                  <option value="vermelho" key="vermelho">
                    vermelho
                  </option>
                  <option value="verde" key="verde">
                    verde
                  </option>
                  <option value="prata" key="prata">
                    prata
                  </option>
                  <option value="transparente" key="transparente">
                    transparente
                  </option>
                </select>
              </div>
              <div className="formInput">
                <label>Status:</label>
                <select
                  name="color"
                  id="color"
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" key="_N.I.__">
                    N.I.
                  </option>
                  <option value="novo" key="novo">
                    novo
                  </option>
                  <option value="usado" key="usado">
                    usado
                  </option>
                  <option value="vitrine" key="vitrine">
                    vitrine
                  </option>
                </select>
              </div>
              <div className="formInput">
                <label>Preço:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  autoComplete="on"
                  required
                  placeholder="$"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                />
              </div>
              <div className="formInput">
                <label>Quantidade:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  autoComplete="on"
                  placeholder="Unid(s)"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>

              <button disabled={per !== null && per < 100} type="submit">
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;

import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { addDoc, serverTimestamp, collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);
  const [dataType, setDataType] = useState([""])
  const [dataBrand, setDataBrand] = useState([""])

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

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value});
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      // --------------write a document (inser user)---------------------//
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

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "text" &&  (
                    <input
                      id={input.id}
                      type={input.type}
                      autoComplete="on"
                      placeholder={input.placeholder}
                      onChange={handleInput}
                    />
                  )}
                  {input.type === "number" &&  (
                    <input
                      id={input.id}
                      type='number'
                      autoComplete="on"
                      placeholder={input.placeholder}
                      onChange={handleInput}
                    />
                  )}
                  {input.type === "mail" &&  (
                    <input
                      id={input.id}
                      type={input.type}
                      autoComplete="on"
                      placeholder={input.placeholder}
                      onChange={handleInput}
                    />
                  )}
                  {input.type === "selectColor" && (
                    <select
                      id={input.id}
                      name={input.id}
                      onChange={handleInput}
                    >
                      {input.options.map((option) => (
                        <option key={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )} 
                  {input.type === "selectType" && (
                    <select
                      id={input.id}
                      name={input.id}
                      onChange={handleInput}
                    >
                      <option value="_N.I." key="_N.I.">N.I.</option>
                      {dataType.map((option) => (
                        <option key={option.id}>
                          {option.dataType}
                        </option>
                      ))}
                    </select>
                  )}
                  {input.type === "selectBrand" && (
                    <select
                      id={input.id}
                      name={input.id}
                      onChange={handleInput}
                    >
                      <option value="N.I._" key="N.I._">N.I.</option>
                      {dataBrand.map((option) => (
                        <option key={option.id}>
                          {option.dataBrand}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
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

export default New;

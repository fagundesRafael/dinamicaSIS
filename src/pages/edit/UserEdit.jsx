import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const UserEdit = ({ inputs, topTitle }) => {
  const { userId } = useParams();
  const { document, loading } = useFetchDocument("users", userId);
  const { updateDocument, response } = useUpdateDocument("users");

  const [userName, setUserName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const data = {
    userName,
    displayName,
    email,
    address,
    phone,
  };

  const handleUpDate = async (e) => {
    e.preventDefault();

    updateDocument(userId, data);

    navigate(-1);
  };


  useEffect(() => {
    if (document) {
      setUserName(document.userName);
      setDisplayName(document.displayName);
      setEmail(document.email);
      setAddress(document.address);
      setPhone(document.phone.split(" ").join(""));
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
            <p
              style={{
                width: "260px",
                margin: "auto",
                marginTop: "30px",
                color: "red",
              }}
            >
              IMAGEM NÃO RE-EDITÁVEL
            </p>
          </div>
          <div className="right">
            <form onSubmit={handleUpDate}>
              <div className="formInput">
                <label>Nome:</label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  placeholder="informe o nome do usuário"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Cliente:</label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="informe o nome completo do usuário"
                  autoComplete="on"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="informe o email do cliente"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Endereço:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="rua, número, bairro, cidade"
                  autoComplete="on"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Telefone:</label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  placeholder="(69)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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

export default UserEdit;

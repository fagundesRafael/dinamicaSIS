import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const SingleUser = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (userData === null) {
      return fetchData();
    }
    console.log(userData);
  }, [userId, userData]);

  const goToEdit = () => {
    navigate(`/users/edit/${userId}`)
  }

  const backButton = () => {
    navigate(-1)
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
          <div className="editButton" onClick={goToEdit}>Editar</div>
            <div className="backButton" onClick={backButton}>Voltar</div>
            <h1 className="title">Informações</h1>
            <div className="item">
              <img
                src={userData ? (userData.img) : ("https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg")}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{userData && (userData.userName)}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{userData && (userData.email)}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Telefone:</span>
                  <span className="itemValue">{userData && (userData.phone)}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Endereço:</span>
                  <span className="itemValue">
                    {userData && (userData.address)}
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

export default SingleUser;

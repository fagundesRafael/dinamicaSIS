import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

const Featured = () => {
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);
  let data;

  const [dataSales, setDataSales] = useState([]);

  useEffect(() => {
    // --------------query sales (real time)---------------------//
    const unsub = onSnapshot(
      collection(db, "sales"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setDataSales(list);
        // ---------------------------------------------------------//
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
    const fetchData = async () => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

      const lastMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", today),
        where("timeStamp", ">", lastMonth)
      );
      const prevMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", lastMonth),
        where("timeStamp", ">", prevMonth)
      );

      const lastMonthData = await getDocs(lastMonthQuery);
      const prevMonthData = await getDocs(prevMonthQuery);

      setAmount(lastMonthData.docs.length);
      setDiff(
        ((lastMonthData.docs.length - prevMonthData.docs.length) /
          prevMonthData.docs.length) *
          100
      );
    };
    fetchData();
  }, []);

  // New variables based on dataSales
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const startOfThisWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  const startOfLastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() - 7
  );
  const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfLastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  );

  const totalSalesToday = dataSales.reduce((total, sale) => {
    const saleTimestamp = sale.timeStamp.toDate(); // Assuming the timestamp is stored as a Firestore Timestamp
    if (saleTimestamp >= startOfToday) {
      return total + sale.profit;
    }
    return total;
  }, 0);

  const totalSalesThisWeek = dataSales.reduce((total, sale) => {
    const saleTimestamp = sale.timeStamp.toDate();
    if (saleTimestamp >= startOfThisWeek) {
      return total + sale.profit;
    }
    return total;
  }, 0);

  const totalSalesLastWeek = dataSales.reduce((total, sale) => {
    const saleTimestamp = sale.timeStamp.toDate();
    if (saleTimestamp >= startOfLastWeek && saleTimestamp < startOfThisWeek) {
      return total + sale.profit;
    }
    return total;
  }, 0);

  const totalSalesThisMonth = dataSales.reduce((total, sale) => {
    const saleTimestamp = sale.timeStamp.toDate();
    if (saleTimestamp >= startOfThisMonth) {
      return total + sale.profit;
    }
    return total;
  }, 0);

  const totalSalesLastMonth = dataSales.reduce((total, sale) => {
    const saleTimestamp = sale.timeStamp.toDate();
    if (saleTimestamp >= startOfLastMonth && saleTimestamp < startOfThisMonth) {
      return total + sale.profit;
    }
    return total;
  }, 0);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Rendimento total (apenas lucro)</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Lucro total consolidado hoje</p>
        <p className="amount">R$ {totalSalesToday}</p>
        <p className="desc">
          Transações realizadas anteriormente não serão inclusas neste
          processamento.
        </p>
        <div className="summary">
          <div className="groupItem">
            <div className="item">
              <div className="itemTitle">Semana anterior</div>
              <div
                className={`itemResult ${
                  totalSalesLastWeek > totalSalesThisWeek
                    ? "positive"
                    : "negative"
                }`}
              >
                {totalSalesLastWeek > totalSalesThisWeek ? (
                  <KeyboardArrowUpOutlinedIcon fontSize="small" />
                ) : (
                  <KeyboardArrowDownIcon fontSize="small" />
                )}
                <div className="resultAmount">R$ {totalSalesLastWeek}</div>
              </div>
            </div>
            <div className="item">
              <div className="itemTitle">Semana atual</div>
              <div
                className={`itemResult ${
                  totalSalesThisWeek > totalSalesLastWeek
                    ? "positive"
                    : "negative"
                }`}
              >
                {totalSalesThisWeek > totalSalesLastWeek ? (
                  <KeyboardArrowUpOutlinedIcon fontSize="small" />
                ) : (
                  <KeyboardArrowDownIcon fontSize="small" />
                )}
                <div className="resultAmount">R$ {totalSalesThisWeek}</div>
              </div>
            </div>
          </div>
          <div className="groupItem">
            <div className="item">
              <div className="itemTitle">Mês anterior</div>
              <div
                className={`itemResult ${
                  totalSalesLastMonth > totalSalesThisMonth
                    ? "positive"
                    : "negative"
                }`}
              >
                {totalSalesLastMonth > totalSalesThisMonth ? (
                  <KeyboardArrowUpOutlinedIcon fontSize="small" />
                ) : (
                  <KeyboardArrowDownIcon fontSize="small" />
                )}
                <div className="resultAmount">R$ {totalSalesLastMonth}</div>
              </div>
            </div>
            <div className="item">
              <div className="itemTitle">Mês atual</div>
              <div
                className={`itemResult ${
                  totalSalesThisMonth > totalSalesLastMonth
                    ? "positive"
                    : "negative"
                }`}
              >
                {totalSalesThisMonth > totalSalesLastMonth ? (
                  <KeyboardArrowUpOutlinedIcon fontSize="small" />
                ) : (
                  <KeyboardArrowDownIcon fontSize="small" />
                )}
                <div className="resultAmount">R$ {totalSalesThisMonth}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;

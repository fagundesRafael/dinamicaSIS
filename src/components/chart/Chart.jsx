import { useEffect, useState } from "react";
import "./chart.scss";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const Chart = ({ aspect, title }) => {
  const [dataSales, setDataSales] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedOption, setSelectedOption] = useState("all");
  const [chartMode, setChartMode] = useState("line");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesRef = collection(db, "sales");
        let salesQuery = query(salesRef);

        if (selectedYear !== "") {
          salesQuery = query(
            salesRef,
            where("timeStamp", ">=", new Date(selectedYear, 0, 1)),
            where("timeStamp", "<=", new Date(selectedYear, 11, 31))
          );
        }

        const unsubscribe = onSnapshot(salesQuery, (snapshot) => {
          const salesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDataSales(salesData);
        });

        return unsubscribe;
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedYear]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleChartModeChange = (e) => {
    setChartMode(e.target.value);
  };

  const renderChart = () => {
    if (chartMode === "line") {
      return (
        <LineChart
          width={730}
          height={250}
          data={getChartData()}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <XAxis dataKey="name" stroke="gray" />
          <YAxis />
          <Tooltip />
          <Legend />
          {renderChartLines()}
        </LineChart>
      );
    } else if (chartMode === "bar") {
      return (
        <BarChart
          width={730}
          height={250}
          data={getChartData()}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <XAxis dataKey="name" stroke="gray" />
          <YAxis />
          <Tooltip />
          <Legend />
          {renderChartBars()}
        </BarChart>
      );
    }
  };

  const getChartData = () => {
    const months = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    const data = [];

    for (let i = 0; i < 12; i++) {
      const monthData = {
        name: months[i],
        Lucro: getTotalForMonth(i, "profit"),
        Custos: getTotalForMonth(i, "cost"),
        Bruto: getTotalForMonth(i, "price"),
      };

      data.push(monthData);
    }

    return data;
  };

  const getTotalForMonth = (monthIndex, property) => {
    const salesForMonth = dataSales.filter((sale) => {
      const saleMonth = sale.timeStamp.toDate().getMonth();
      return saleMonth === monthIndex;
    });

    return salesForMonth.reduce((total, sale) => total + sale[property], 0);
  };

  const renderChartLines = () => {
    return (
      <>
        <Line
          type="monotone"
          dataKey="Lucro"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#total)"
        />
        <Line
          type="monotone"
          dataKey="Custos"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#total)"
        />
        <Line
          type="monotone"
          dataKey="Bruto"
          stroke="#ffc658"
          fillOpacity={1}
          fill="url(#total)"
        />
      </>
    );
  };

  const renderChartBars = () => {
    return (
      <>
        <Bar dataKey="Lucro" fill="#8884d8" />
        <Bar dataKey="Custos" fill="#82ca9d" />
        <Bar dataKey="Bruto" fill="#ffc658" />
      </>
    );
  };

  const getAvailableYears = () => {
    const years = dataSales.map((sale) => {
      const saleYear = sale.timeStamp.toDate().getFullYear();
      return saleYear;
    });
    return [...new Set(years)];
  };

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <div className="controls">
        <div className="singleSelect">
          <label>Ano:</label>
          <select
            id="yearSelect"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="">Todos</option>
            {getAvailableYears().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="singleSelect">
          <label>Opção:</label>
          <select
            id="optionSelect"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="all">Todos</option>
            <option disabled value="profits">Lucro</option>
            <option disabled value="costs">Custos</option>
            <option disabled value="price">Bruto</option>
          </select>
        </div>
        <div className="singleSelect">
          <label>Modo de visualização:</label>
          <select
            id="chartModeSelect"
            value={chartMode}
            onChange={handleChartModeChange}
          >
            <option value="line">Linear</option>
            <option value="bar">Colunar</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

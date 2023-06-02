import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { SalesColumns } from "../../datatablesource";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const DatableHistory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // --------------query document (real time)---------------------//
    const unsub = onSnapshot(
      collection(db, "sales"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
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

  console.log(data);

  const actionColumn = [
  ];
  return (
    <div className="datatable2">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={SalesColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatableHistory;

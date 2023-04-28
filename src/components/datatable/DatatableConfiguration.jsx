import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { FeaturesColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const DatatableConfiguration = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // --------------fetch document (normal time)---------------------//
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({id: doc.id, ...doc.data()});
    //     });
    //     setData(list);
    //     console.log(list)
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchData()
    // -------------------------------------------------------------//

    // --------------query document (real time)---------------------//
    const unsub = onSnapshot(
      collection(db, "features"),
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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "features", id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Ação",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Tipos e marcas existentes
        <Link to="/configuration/new" className="link">
          Informar novo tipo ou marca
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={FeaturesColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableConfiguration;
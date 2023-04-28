export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "Usuário",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.userName}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "address",
    headerName: "Endereço",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Telefone",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.phone}`}>
          {params.row.phone}
        </div>
      );
    },
  },
];

export const ProductsColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "item",
    headerName: "Item",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "brand",
    headerName: "Marca",
    width: 115,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.brand}
        </div>
      );
    },
  },
  {
    field: "type",
    headerName: "Tipo",
    width: 115,
  },
  {
    field: "cost",
    headerName: "Custo",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.cost}`}>
          {params.row.cost}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Preço",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.price}`}>
          {params.row.price}
        </div>
      );
    },
  },
  {
    field: "quantity",
    headerName: "Unid(s)",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.quantity}`}>
          {params.row.quantity}
        </div>
      );
    },
  },
];

export const FeaturesColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "brands",
    headerName: "Marca",
    width: 340,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.brands}
        </div>
      );
    },
  },
  {
    field: "types",
    headerName: "Tipos",
    width: 340,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.types}`}>
          {params.row.types}
        </div>
      );
    },
  },
];


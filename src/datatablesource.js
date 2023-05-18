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
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.type}`}>
          {params.row.type}
        </div>
      );
    },
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

export const SalesColumns = [
  { field: "id", headerName: "ID", width: 40 },
  {
    field: "client",
    headerName: "Cliente",
    width: 120,
    renderCell: (params) => {
      return (
        <div className="cellWithStatus">
          {params.row.client}
        </div>
      );
    },
  },
  {
    field: "resume",
    headerName: "Resumo da(s) compra(s) e/ou do(s) serviço(s)",
    width: 400,
    renderCell: (params) => {
      return (
        <div className="cellWithStatus">
          {`${params.row.quantity} unid(s) - ${params.row.item}`}
          {params.row.service && (` - ${params.row.service}`)}

          
        </div>
      );
    },
  },
  {
    field: "date",
    headerName: "Data",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.cost}`}>
          {params.row.timeString}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Preço ($)",
    width: 80,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.price}`}>
          {`R$ ${params.row.price * params.row.quantity}`}
        </div>
      );
    },
  },
  {
    field: "profit",
    headerName: "Lucro ($)",
    width: 80,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.price}`}>
          {`R$ ${(params.row.price - params.row.cost)*(params.row.quantity)}`}
        </div>
      );
    },
  },
];


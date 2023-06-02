const userInputs = [
  {
    setDocumentPath: "users",
    id: "userName",
    label: "Usuário(a):",
    type: "text",
    placeholder: "nome",
  },
  {
    id: "displayName",
    label: "Nome completo:",
    type: "text",
    placeholder: "fulano(a) de tal",
  },
  {
    id: "email",
    label: "Email:",
    type: "mail",
    placeholder: "exemplo@gmail.com",
  },
  {
    id: "phone",
    label: "Contato telefônico:",
    type: "text",
    placeholder: "(69) 9 9999-9999",
  },
  {
    id: "address",
    label: "Endereço:",
    type: "text",
    placeholder: "Rua ou avenida - nº - bairro - cidade.",
  },
];

const productInputs = [
  {
    setDocumentPath: "products",
    id: "title",
    label: "Nome:",
    type: "text",
    placeholder: "nome do produto",
  },
  {
    id: "type",
    label: "Tipo:",
    type: "selectType",
    options: [
      // firebase resource
    ],
  },
  {
    id: "brand",
    label: "Marca:",
    type: "selectBrand",
    options: [
      // firebase resource
    ],
  },
  {
    id: "cost",
    label: "Custo:",
    type: "numberCost",
    placeholder: "R$",
  },
  {
    id: "color",
    label: "Cor:",
    type: "selectColor",
    options: [
      { value: "_N.I._", label: "N.I." },
      { value: "branco", label: "branco" },
      { value: "amarelo", label: "amarelo" },
      { value: "azul", label: "azul" },
      { value: "preto", label: "preto" },
      { value: "cinza", label: "cinza" },
      { value: "roxo", label: "roxo" },
      { value: "vermelho", label: "vermelho" },
      { value: "verde", label: "verde" },
      { value: "prata", label: "prata" },
    ],
  },
  {
    id: "price",
    label: "Preço:",
    type: "numberPrice",
    placeholder: "R$",
  },
  {
    id: "quantity",
    label: "Quantidade",
    type: "numberQuantity",
    placeholder: "em estoque",
  },
];

const salesInputs = [
  {
    setDocumentPath: "sales",
    id: "client",
    label: "Cliente:",
    type: "selectUsers",
    options: [
      // firebase resource
    ],
  },
  {
    id: "item",
    label: "Item:",
    type: "selectItems",
    options: [
      // firebase resource
    ],
  },
  {
    id: "qtt",
    label: "Quantidade:",
    type: "number_qtt",
    placeholder: "informe a quantidade do item"
  },
  {
    id: "service",
    label: "Serviço:",
    type: "selectServices",
    options: [
      // firebase resource
    ],
  },
  {
    id: "discount",
    label: "Desconto(s) e/ou acréscimo(s):",
    type: "number",
    placeholder: "$",
  },
  {
    id: "observations",
    label: "Observações:",
    type: "text",
    placeholder: "anotações importantes",
  }
  
];

export { userInputs, productInputs, salesInputs };

const userInputs = [
  {
    setDocumentPath: "users",
    id: "userName",
    label: "Usuário(a)",
    type: "text",
    placeholder: "nome",
  },
  {
    id: "displayName",
    label: "Nome completo",
    type: "text",
    placeholder: "fulano(a) de tal",
  },
  {
    id: "email",
    label: "Email",
    type: "mail",
    placeholder: "exemplo@gmail.com",
  },
  {
    id: "phone",
    label: "Contato telefônico",
    type: "text",
    placeholder: "(69) 9 9999-9999",
  },
  {
    id: "address",
    label: "Endereço",
    type: "text",
    placeholder: "Rua ou avenida - nº - bairro - cidade.",
  },
];

const productInputs = [
  {
    setDocumentPath: "products",
    id: "title",
    label: "Nome",
    type: "text",
    placeholder: "nome do produto",
  },
  {
    id: "type",
    label: "Tipo",
    type: "selectType",
    options: [
      // { value: "outro", label: "outro" },
      // { value: "celular", label: "celular" },
      // { value: "capinha", label: "capinha" },
      // { value: "película", label: "película" },
      // { value: "carregador", label: "carregador" },
      // { value: "cabo", label: "cabo" },
      // { value: "tela", label: "tela" },
      // { value: "headphone", label: "headphone" },
      // { value: "caixinha", label: "caixinha" },
      // { value: "bateria", label: "bateria" },
    ],
  },
  {
    id: "brand",
    label: "Marca",
    type: "selectBrand",
    options: [
      // { value: "Outro", label: "Outro" },
      // { value: "Apple", label: "Apple" },
      // { value: "Samsung", label: "Samsung" },
      // { value: "Motorola", label: "Motorola" },
      // { value: "Lg", label: "Lg" },
      // { value: "Asus", label: "Asus" },
      // { value: "Nokia", label: "Nokia" },
      // { value: "Xiaomi", label: "Xiaomi" },
      // { value: "Mi", label: "Mi" },
    ],
  },
  {
    id: "cost",
    label: "Custo",
    type: "number",
    placeholder: "R$",
  },
  {
    id: "color",
    label: "Cor",
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
    label: "Preço",
    type: "number",
    placeholder: "R$",
  },
  {
    id: "quantity",
    label: "Quantidade",
    type: "number",
    placeholder: "em estoque",
  },
];

export { userInputs, productInputs };

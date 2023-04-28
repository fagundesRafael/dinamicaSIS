const userInputs = [
  {
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
    id: "title",
    label: "Nome",
    type: "text",
    placeholder: "nome do produto",
  },
  {
    id: "type",
    label: "Tipo",
    type: "select",
    options: [
      { value: "other", label: "Outro" },
      { value: "celular", label: "celular" },
      { value: "case", label: "capinha" },
      { value: "film", label: "película" },
      { value: "charger", label: "carregador" },
      { value: "cable", label: "cabo" },
      { value: "screen", label: "tela" },
      { value: "work", label: "serviços" },
      { value: "headphone", label: "fone de ouvido" },
      { value: "boxphone", label: "caixa de som" },
      { value: "batery", label: "bateria" },
    ],
  },
  {
    id: "brand",
    label: "Marca",
    type: "select",
    options: [
      { value: "Other", label: "Outro" },
      { value: "Apple", label: "Apple" },
      { value: "Samsung", label: "Samsung" },
      { value: "Motorola", label: "Motorola" },
      { value: "Lg", label: "Lg" },
      { value: "Asus", label: "Asus" },
      { value: "Nokia", label: "Nokia" },
      { value: "Xiaomi", label: "Xiaomi" },
      { value: "Mi", label: "Mi" },
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
    type: "select",
    options: [
      { value: "Other", label: "Outro" },
      { value: "white", label: "branco" },
      { value: "yellow", label: "amarelo" },
      { value: "blue", label: "azul" },
      { value: "black", label: "preto" },
      { value: "gray", label: "cinza" },
      { value: "purple", label: "roxo" },
      { value: "red", label: "vermelho" },
      { value: "green", label: "verde" },
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

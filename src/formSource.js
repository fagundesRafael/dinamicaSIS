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
    type: "number",
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
    id: "paymentForm",
    label: "Forma de pagamento:",
    type: "selecForm",
    options: [
      { value: "NII", label: "N.I." },
      { value: "dinheiro", label: "dinheiro" },
      { value: "pix", label: "pix" },
      { value: "transferência", label: "transferência" },
      { value: "débito", label: "débito" },
      { value: "crédito", label: "crédito" },
      { value: "permuta", label: "permuta" },
      { value: "outros", label: "outros" },
    ],
  },
  {
    id: "item1",
    label: "Item 01:",
    type: "selectItems",
    options: [
      // firebase resource
    ],
  },
  {
    id: "qtt_1",
    label: "Quantidade:",
    type: "number_qtt",
    placeholder: "informe a quantidade do item 01"
  },
  {
    id: "item2",
    label: "Item 02:",
    type: "selectItems",
    options: [
      // firebase resource
    ],
  },
  {
    id: "qtt_2",
    label: "Quantidade:",
    type: "number_qtt",
    placeholder: "informe a quantidade do item 2"
  },
  {
    id: "item3",
    label: "Item 03:",
    type: "selectItems",
    options: [
      // firebase resource
    ],
  },
  {
    id: "qtt_3",
    label: "Quantidade:",
    type: "number_qtt",
    placeholder: "informe a quantidade do item 03"
  },
  {
    id: "service1",
    label: "Serviço 01:",
    type: "selectServices",
    options: [
      // firebase resource
    ],
  },
  {
    id: "service2",
    label: "Serviço 02:",
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
  },
  {
    id: "cost",
    label: "Custo:",
    type: "number",
    placeholder: "R$",
  },
  {
    id: "total",
    label: "Total:",
    type: "number",
    placeholder: "R$",
  },
  {
    id: "profit",
    label: "Lucro:",
    type: "number",
    placeholder: "R$",
  },
  {
    id: "price",
    label: "Preço:",
    type: "number",
    placeholder: "R$",
  },
  
];

export { userInputs, productInputs, salesInputs };

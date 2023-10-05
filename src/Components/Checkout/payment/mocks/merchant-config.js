// Document reference: https://staticpg.paytm.in/checkoutjs/21/docs/#/configuration?id=handler
export const merchantConfig = {
  style: {
    bodyBackgroundColor: "#fafafb",
    bodyColor: "",
    themeBackgroundColor: "#dfa231",
    themeColor: "#ffffff",
    headerBackgroundColor: "#284055",
    headerColor: "#ffffff",
    errorColor: "",
    successColor: "",
    card: {
      padding: "",
      backgroundColor: "",
    },
  },
  jsFile: "",
  data: {
    tokenType: "TXN_TOKEN",
  },
  merchant: {
    // mid: "ShHjlp86557738620324",
    mid: "UxiZJC39894231915636",
    name: "CityNect",
    logo: "emenities/logo.png",
    redirect: false,
  },
  mapClientMessage: {},
  labels: {},
  payMode: {
    labels: {},
    filter: {
      exclude: [],
    },
    order: ["CC", "DC", "NB", "UPI", "PPBL", "PPI", "BALANCE"],
  },
  flow: "DEFAULT",
};

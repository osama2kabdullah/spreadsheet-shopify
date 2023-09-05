const express = require("express");

const SHOPIF_API_PASS_WITH_TOKEN = process.env.SHOPIF_API_PASS_WITH_TOKEN;
const SHOPIF_API_KEY = process.env.SHOPIF_API_KEY;
const SHOPIF_API_SECRET = process.env.SHOPIF_API_SECRET;
const STORE_URL = process.env.STORE_URL;
const port = process.env.PORT || 8080;
const app = express();
let endpoint = "products";

app.use(express.json());

app.get("/data", (req, res)=>{
    res.send("Hello I am running");
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
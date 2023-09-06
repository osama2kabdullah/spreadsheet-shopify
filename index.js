require("dotenv").config();
const express = require("express");
const request = require("request");
const { google } = require("googleapis");

const SHOPIF_API_PASS_WITH_TOKEN = process.env.SHOPIF_API_PASS_WITH_TOKEN;
const SHOPIF_API_KEY = process.env.SHOPIF_API_KEY;
const SHOPIF_API_SECRET = process.env.SHOPIF_API_SECRET;
const STORE_URL = process.env.STORE_URL;
const port = process.env.PORT || 8080;
const app = express();
let endpoint = "products";

//middlewere
app.use(express.json());

// googl sheet
const spreadsheetId = process.env.SHEETS_ID;
const sheetArguments = {
  "keyFile" : "sheets-credentials.json",
  "scopes" : "https://www.googleapis.com/auth/spreadsheets"
}
const auth = new google.auth.GoogleAuth(sheetArguments);

// the API
app.get("/data", async (req, res)=>{

  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const metaData = await googleSheets.spreadsheets.get({
    auth, spreadsheetId
  });
  const getRow = await googleSheets.spreadsheets.values.get({
    auth, spreadsheetId, range: "Sheet1"
  });

  // shopify api essential
  let productId = 8326422233384;
  const updateBody = {
    "product": {
      "id": productId,
      "title": "Antique Drawers I am here"
    }
  };
  // product update
  const updateString = {
    "method": "PUT",
    "url": `https://${SHOPIF_API_KEY}:${SHOPIF_API_PASS_WITH_TOKEN}@${STORE_URL}/admin/api/2023-10/${endpoint}/${productId}.json`,
    "headers": {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updateBody)
  }

  request(updateString,(err, resp)=>{
    if (err) {
      throw new Error(err);
    }
    res.send(resp.body)
  })
  
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
require("dotenv").config();
const express = require("express");
const { google } = require("googleapis");

const SHOPIF_API_PASS_WITH_TOKEN = process.env.SHOPIF_API_PASS_WITH_TOKEN;
const SHOPIF_API_KEY = process.env.SHOPIF_API_KEY;
const SHOPIF_API_SECRET = process.env.SHOPIF_API_SECRET;
const STORE_URL = process.env.STORE_URL;
const port = process.env.PORT || 8080;
const app = express();
let endpoint = "products";

app.use(express.json());

const spreadsheetId = process.env.SHEETS_ID;
const sheetArguments = {
  "keyFile" : "sheets-credentials.json",
  "scopes" : "https://www.googleapis.com/auth/spreadsheets"
}
const auth = new google.auth.GoogleAuth(sheetArguments);

app.get("/data", async (req, res)=>{

  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const metaData = await googleSheets.spreadsheets.get({
    auth, spreadsheetId
  });
  const getRow = await googleSheets.spreadsheets.values.get({
    auth, spreadsheetId, range: "Sheet1"
  });
  
  res.send(getRow.data);

})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
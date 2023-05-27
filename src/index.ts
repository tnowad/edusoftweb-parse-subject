import cheerio from "cheerio";
import fs from "fs";

const htmlFilePath = "data.html";
const html = fs.readFileSync(htmlFilePath, "utf8");
const $ = cheerio.load(html);
const divTDK = $("#divTDK");

console.log(divTDK);

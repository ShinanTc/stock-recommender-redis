import fs from "fs";

export function sendDataToClient(res, filePath, fieldName, values) {
  fs.readFile(filePath, "utf8", (err, html) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Server error");
    }

    const stocksData = values
      .map((value) => {
        const [stockName, ltp, target, profit] = value.split("|");
        return `
              <tr>
                  <td>${stockName}</td>
                  <td>${ltp}</td>
                  <td>${target}</td>
                  <td>${profit}</td>
              </tr>
          `;
      })
      .join("");

    const modifiedHtml = html.replace(`{{${fieldName}}}`, stocksData);

    res.send(modifiedHtml);
  });
}
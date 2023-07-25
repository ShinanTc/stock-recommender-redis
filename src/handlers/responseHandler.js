export function sendArrayDataToClient(res, filePath, fieldName, values) {
  fs.readFile(filePath, "utf8", (err, html) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Server error");
    }

    // Replace placeholder in HTML file with fetched data
    const modifiedHtml = html.replace(
      `{{${fieldName}}}`,
      JSON.stringify(values)
    );

    res.send(modifiedHtml);
  });
}
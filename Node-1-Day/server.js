const express = require("express");
// used to parse JSON payloads in incoming request,
// make it available in req.body
const bodyParser = require("body-parser");
// file operations, create, read folder, folder/file exists or not
const fs = require("fs-extra");
// manage file and directory paths
const path = require("path");

const app = express();
const PORT = 3000;
const folderPath = path.join(__dirname, "texts");

// Check whether the folder is there or not
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

// Enpoint to create a text file
app.post("/createFile", async (req, res) => {
  try {
    await fs.ensureDir(folderPath);
    const time = new Date().toISOString();
    const fileName = `${time}.txt`;
    const filePath = path.join(folderPath, fileName);

    await fs.writeFile(filePath, time);
    res.send("File created successfully!");
  } catch (error) {
    res.status(500).send("Error writing a file");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

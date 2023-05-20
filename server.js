const express = require("express");
const { spawn } = require("child_process");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/execute", async (req, res) => {
  const { code, language, input } = req.body;

  let output = "";
  let error = "";
  const subprocess = spawn(language, ["-c", code]);

  if (input) {
    subprocess.stdin.write(input);
    subprocess.stdin.end();
  }

  subprocess.stdout.on("data", (data) => {
    output += data.toString();
  });

  subprocess.stderr.on("data", (data) => {
    error += data.toString();
  });

  subprocess.on("close", () => {
    if (error) {
      res.status(400).json({ error });
    } else {
      res.json({ output });
    }
  });
});

// Serve the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

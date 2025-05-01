const express = require("express");
const app = express();

// Basic route to confirm it's working
app.get("/", (req, res) => {
  res.send("I'm alive!");  // This will display "I'm alive!" in the browser
});

const port = process.env.PORT || 5000;  // Use Replit's assigned port or 5000 as a fallback
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

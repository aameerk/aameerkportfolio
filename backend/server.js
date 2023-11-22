
const express = require('express');
const app = express();

app.use(express.static('./dist/portfolio'));

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: 'dist/portfolio/' });
});

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

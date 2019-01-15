const app = require('./server.js');
const port = 3013;


app.listen(port, () => {
  console.log(`Reviews RESTful API listing on http://localhost:${port}`)
})
const app = require('./server.js');
const port = process.env.PORT || 3013;

app.listen(port, () => {
  console.log(`Reviews RESTful API listing on ${port}`)
})
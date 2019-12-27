const express = require('express');
const bodyParser = require('body-parser');
const port = 3009;

const models = require('../db/models.js');

const app = express();
//middleware
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../client/dist/`));
// return a list of videos with information needed to render videolist and chart
app.get('/api/videos', (req, res) => {
  const { name } = req.query;
  const params = [];
  params[0] = name;
  models.get(params)
    .then((results) => {
      res.send(results).status(201);
    })
    .catch((err) => {
      res.send('an error has ocurred: ', err).status(400);
      process.exit(1);
    });
});

// update database records only when no conflict is present
app.put('/api/videos', (req, res) => {
  const newVideos = req.body;
  models.update(newVideos)
    .then((results) => {
      res.send(results).status(202);
    }).catch((err) => {
      console.log('error has ocurred: ', err);
      res.status(500).send('an error has ocurred: ');
      process.exit(1);
    });
});

app.listen(port, () => console.log(`listening on port : ${port}`));

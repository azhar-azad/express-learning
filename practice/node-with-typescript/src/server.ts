import express from 'express';

const app = express();
const port: Number = 3000;
app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
app.listen((port:Number, err:String) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
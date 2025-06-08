import express from 'express';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(`Server running in ${__dirname}`);

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/promociones', (req, res) => {
  res.render('promociones');
});
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
"/"
"/promociones"
"/contacto"
"/servicios"
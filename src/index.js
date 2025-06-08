import express from 'express';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import router from './routes/index.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(`Server running in ${__dirname}`);

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(router);
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
"/"
"/promociones"
"/contacto"
"/servicios"
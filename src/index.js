import express from 'express';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import router from './routes/index.js';
import { conectar } from './public/services/conexion.js'; 

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(`Server running in ${__dirname}`);

app.set('views', join(__dirname, 'views'));
app.use(express.static(join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(router);
conectar()
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
  
});
"/"
"/promociones"
"/contacto"
"/servicios"
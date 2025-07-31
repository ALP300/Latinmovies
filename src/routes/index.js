import { Router } from "express";
const router = Router();
import { RegistrarCliente , ConsultarProductos, LoginCliente } from "../public/services/conexion.js";  
import bodyParser from "body-parser"; 

router.get("/", (req, res) => {
    res.render("index", { title: "Inicio" });
});
router.get("/promociones", (req, res) => {
    res.render("promociones", { title: "Promociones" });
});
router.get("/cartelera", (req, res) => {
    res.render("cartelera", { title: "Cartelera de películas" });
});
router.get("/registro", (req, res) => {
    res.render("registrarCliente", { title: "Registro" });
});
router.get("/login", (req, res) => {
    res.render("loginCliente", { title: "Login" });
});


router.get('/api/get-productos', async (req, res) => {
    console.log('Request received for /api/get-productos');
    try {
        const productos = await ConsultarProductos();
        console.log('Productos from DB:', productos); // Log raw result
        if (!productos || productos.length === 0) {
            console.log('No products found, returning empty array');
            return res.status(200).json([]); // Return empty array instead of 404
        }
        console.log('Sending products:', productos);
        res.status(200).json(productos);
    } catch (error) {
        console.error('Error in /api/get-productos:', error);
        res.status(500).json({ error: 'Error al consultar los productos', details: error.message });
    }
});

router.post("/api/registrar-cliente", async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
    const resultado = await RegistrarCliente(username, password, email);
    if (resultado.success) {
        res.status(201).json({ message: resultado.message, user: resultado.user });
    } else {
        res.status(400).json({ error: resultado.message });
    }
});

router.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Usuario y contraseña son obligatorios' });
    }

    try {
        const resultado = await LoginCliente(username, password);

        if (resultado.success) {
            res.status(200).json(resultado);
        } else {
            res.status(401).json(resultado);
        }
    } catch (error) {
        console.error("❌ Error en /api/login:", error); // Muestra el error en consola
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


export default router;
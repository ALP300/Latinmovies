import { Router } from "express";
const router = Router();
import { ConsultarProductos } from "../public/services/conexion.js";   

router.get("/", (req, res) => {
    res.render("index", { title: "Inicio" });
});
router.get("/promociones", (req, res) => {
    res.render("promociones", { title: "Promociones" });
});
router.get("/cartelera", (req, res) => {
    res.render("cartelera", { title: "Cartelera de películas" });
});

router.get('/api/get-productos', async (req, res) => {
    console.log('Request received for /api/get-productos'); // Debug log
    try {
        const productos = await ConsultarProductos();
        if (!productos || productos.length === 0) {
            console.log('No products found');
            return res.status(404).json({ message: 'No se encontraron productos' });
        }
        console.log('Products sent:', productos);
        res.status(200).json(productos);
    } catch (error) {
        console.error('Error in /api/get-productos:', error);
        res.status(500).json({ error: 'Error al consultar los productos' });
    }
});


export default router;
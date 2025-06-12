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
    const productos = await ConsultarProductos();
    res.status(200).json(productos);
});


export default router;
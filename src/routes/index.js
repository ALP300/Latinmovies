import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
    res.render("index", { title: "Inicio" });
});
router.get("/promociones", (req, res) => {
    res.render("promociones", { title: "Promociones" });
});

export default router;
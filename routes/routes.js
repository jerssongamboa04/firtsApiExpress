const express = require("express")
const router = express.Router();
const middleware = require("../middleware/middleware")
const { v4: uuidv4 } = require("uuid");

let authToken = null;

const authenticateMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7); // Eliminar el prefijo 'Bearer ' del token

        if (token === authToken) {
            next();
        } else {
            res.status(401).json({ error: 'Token inválido' });
        }
    } else {

        res.status(401).json({ error: 'Token de autenticación no proporcionado' });
    }
};

router.get("/auth", (req, res) => {
    const token = uuidv4();
    authToken = token;

    res.json({ token });
});

router.get("/protected", authenticateMiddleware, (req, res) => {
    res.json({ message: 'Ruta protegida' });
});



//importacion de funciones
const {
    getAllStudents,
    addStudents,
    studentsById,
    studentsByParams,
    studentsReplace,
    studentsUpdate,
    studentsDelete
} = require("../controllers/controllers");

router.get("/",  getAllStudents);
router.post("/",middleware, addStudents);
router.get("/user/:id", studentsById);
router.get("/user/", studentsByParams);
router.put("/users/replace/:id", studentsReplace);
router.patch("/users/update/:id", studentsUpdate);
router.delete("/users/delete/:id", studentsDelete);

module.exports = router;
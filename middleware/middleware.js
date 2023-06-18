const middleware = (req, res, next) => {
    const { first_name, last_name, major, age, gpa } = req.body;

    // Verificar que los campos requeridos no estén vacíos
    if (!first_name || !last_name || !major || !age || !gpa) {
        return res.status(400).json({ error: 'Incomplete field' });
    }

    // Verificar los tipos de datos
    if (typeof first_name !== 'string' ||
        typeof last_name !== 'string' ||
        typeof major !== 'string' ||
        typeof age !== 'number' ||
        typeof gpa !== 'number') {
        return res.status(400).json({ error: 'Tipos de datos inválidos' });
    }

    next();
};



module.exports = middleware;

const express = require('express');
const { v4: uuidv4 } = require("uuid")
const app = express();
const PORT = 8000
app.use(express.json());



const Students =
    [{
        "student_id": "1",
        "first_name": "Mile",
        "last_name": "Louca",
        "age": 29,
        "email": "mlouca0@ibm.com",
        "major": "Computer Science",
        "gpa": 0.22
    }, {
        "student_id": "2",
        "first_name": "Jeannette",
        "last_name": "Vedenyapin",
        "age": 20,
        "email": "jvedenyapin1@umich.edu",
        "major": "Business",
        "gpa": 0.67
    }, {
        "student_id": "3",
        "first_name": "Esma",
        "last_name": "Ballaam",
        "age": 23,
        "email": "eballaam2@nasa.gov",
        "major": "Psychology",
        "gpa": 3.07
    }];

//----------------- EJERCICIO #1 ---------------//
//METODO GET

app.get("/", (req, res) => {
    res.json({ response: true, Students });
})

//----------------- EJERCICIO #2 ---------------//
//METODO POST

app.post("/", (req, res) => {

    const body = req.body;
    const first_name = req.body.first_name
    if (body) {
        const id = uuidv4();
        res.json({ response: true, data: Students });
        Students.push(body);

    } else {
        res.send('Missing Students data');
    }

});

//----------------- EJERCICIO #3 ---------------//
//METODO GET/USER/:ID

app.get("/user/:id", (req, res) => {
    const studentId = req.params.id;
    const student = Students.find((student) => student.student_id == studentId);

    if (student) {
        res.json({ response: true, data: student });
    } else {
        res.json({ error: "No student with such id" });
    }
});


//----------------- EJERCICIO #4 ---------------//
//GET "/users?lastname=lastname&major=major"
// Recibe por query params apellido y asignatura de un estudiante, y devuelve el estudiante que coincida con dichos parámetros.
// Puede recibir un parámetro, dos, o ninguno.
// Si no hay ningún estudiante con esos parámetros, o no se reciben query params, se devuelve "No student with such parameters"

app.get("/user/", (req, res) => {
    const lastName = req.query.lastname;
    const major = req.query.major;

    if (!lastName && !major) {
        return res.send("No student with such parameters");
    }

    const filteredStudents = Students.filter((student) => {
        if (lastName && major) {
            return student.last_name === lastName && student.major === major;
        } else if (lastName) {
            return student.last_name === lastName;
        } else if (major) {
            return student.major === major;
        }
    });

    if (filteredStudents.length === 0) {
        return res.send("No student with such parameters");
    }

    res.json(filteredStudents);
});

//----------------- EJERCICIO #5 ---------------//
// PUT "/users/replace/:id":
// Recibe por el body de la request los 6 campos del objeto de estudiante, y por URL params el id de un estudiante existente en la base de datos. Deberás buscar dicho estudiante por id y sustituir sus campos, sin cambiar el student_id.
// Devuelve el estudiante modificado.
// Si no hay ningún estudiante con ese id, devolverá "No student with such id".

app.put("/users/replace/:id", (req, res) => {
    const id = req.params.id;
    const { first_name, last_name, age, email, major, gpa } = req.body;

    const studentIndex = Students.findIndex((student) => student.student_id === id);

    if (studentIndex === -1) {
        return res.send("No student with such id");
    }

    const updatedStudent = {
        student_id: id,
        first_name,
        last_name,
        age,
        email,
        major,
        gpa
    };

    Students[studentIndex] = updatedStudent;

    res.json(updatedStudent);
});

//----------------- EJERCICIO #6 ---------------//
// PATCH "/users/update/:id":
// Recibe por el body de la request algún campo del objeto de estudiante, y por URL params el id de un estudiante existente en la base de datos. Deberás buscar dicho estudiante por id y sustituir los campos enviados, sin cambiar el resto de campos.
// Devuelve el estudiante modificado.
// Si no hay ningún estudiante con ese id, devolverá "No student with such id".

app.patch("/users/update/:id", (req, res) => {
    const id = req.params.id;
    const fieldsToUpdate = req.body;

    const studentIndex = Students.findIndex((student) => student.student_id == id);

    if (studentIndex === -1) {
        return res.send("No student with such id");
    }

    const updatedStudent = { ...Students[studentIndex], ...fieldsToUpdate };
    // console.log(Students[studentIndex]);
    Students[studentIndex] = updatedStudent;

    res.json(updatedStudent);
});

//----------------- EJERCICIO #7 ---------------//
// DELETE "/users/delete/:id":
// Recibe el student_id por URL params y elimina dicho student de la base de datos. Devuelve el estudiante eliminado.
// Si no hay ningún estudiante con ese id, devolverá "No student with such id".

app.delete("/users/delete/:id", (req, res) => {

    const studentsId = req.params.id

    const student = Students.filter((student) => student.student_id == studentsId);
    if (student) {
        res.json({ response: true, data: student });
    } else {
        res.json({ error: "No student with such id" });
    }

})




app.listen(PORT, () => {
    console.log(`server listering on port ${PORT}`);

});





const Students = require("../Student");
const { v4: uuidv4 } = require("uuid")

//----------------- EJERCICIO #1 ---------------//
//METODO GET
const getAllStudents = (req, res) => {
    res.json({ response: true, data: Students });
}

//----------------- EJERCICIO #2 ---------------//
//METODO POST

const addStudents = (req, res) => {
  const body = req.body;

  if (Object.keys(body).length === 0) {
    return res.status(400).json({ error: 'Missing student data' });
  }

  const id = uuidv4();
  const newStudent = { id, ...body };
  Students.push(newStudent);

  res.json(newStudent);
};

module.exports = addStudents;


//----------------- EJERCICIO #3 ---------------//
//METODO GET/USER/:ID

const studentsById = (req, res) => {
    const studentId = req.params.id;
    const student = Students.find((student) => student.student_id == studentId);

    if (student) {
        res.json({ response: true, data: student });
    } else {
        res.json({ error: "No student with such id" });
    }

}

//----------------- EJERCICIO #4 ---------------//
//GET "/users?lastname=lastname&major=major"
// Recibe por query params apellido y asignatura de un estudiante, y devuelve el estudiante que coincida con dichos parámetros.
// Puede recibir un parámetro, dos, o ninguno.
// Si no hay ningún estudiante con esos parámetros, o no se reciben query params, se devuelve "No student with such parameters"

const studentsByParams = (req, res) => {
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
}

//----------------- EJERCICIO #5 ---------------//
// PUT "/users/replace/:id":
// Recibe por el body de la request los 6 campos del objeto de estudiante, y por URL params el id de un estudiante existente en la base de datos. Deberás buscar dicho estudiante por id y sustituir sus campos, sin cambiar el student_id.
// Devuelve el estudiante modificado.
// Si no hay ningún estudiante con ese id, devolverá "No student with such id".

const studentsReplace = (req, res) => {

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

}

//----------------- EJERCICIO #6 ---------------//
// PATCH "/users/update/:id":
// Recibe por el body de la request algún campo del objeto de estudiante, y por URL params el id de un estudiante existente en la base de datos. Deberás buscar dicho estudiante por id y sustituir los campos enviados, sin cambiar el resto de campos.
// Devuelve el estudiante modificado.
// Si no hay ningún estudiante con ese id, devolverá "No student with such id".

const studentsUpdate = (req, res) => {

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
}

//----------------- EJERCICIO #7 ---------------//
// DELETE "/users/delete/:id":
// Recibe el student_id por URL params y elimina dicho student de la base de datos. Devuelve el estudiante eliminado.
// Si no hay ningún estudiante con ese id, devolverá "No student with such id".

const studentsDelete = (req, res) => {
    const studentsId = req.params.id

    const student = Students.filter((student) => student.student_id == studentsId);
    if (student) {
        res.json({ response: true, data: student });
    } else {
        res.json({ error: "No student with such id" });
    }

}

module.exports = {
    getAllStudents, addStudents,
    studentsById, studentsByParams, studentsReplace,
    studentsUpdate, studentsDelete
};
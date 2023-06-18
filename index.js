const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000
app.use(express.json());

const router = require("./routes/routes")
app.use("/", router);


app.listen(PORT, () => {
    console.log(`server listering on port ${PORT}`);

});




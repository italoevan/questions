const express = require("express");
const db = require("./database/database");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use((express.urlencoded()));
app.use(express.json());

app.get("/perguntar", (req, res) => {
    res.render('perguntar');
});

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/salvarpergunta", (req, res) => {
    var title = req.body.title;
    var value = req.body.value;

    res.send(title + " > " + value);

});

app.get("/mysql", async (req, res) => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
        const result = await db.query("SELECT * FROM PERGUNTAS");
        res.send(result[0]);

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }


});

app.post("/mysql", async (req, res) => {
    if (!req.body.title || !req.body.texto) {
        res.send("Erro");
    }

    let title = req.body.title;
    let texto = req.body.texto;


    await db.query("INSERT INTO perguntas (title,texto) values ( '" +
        title + "' , '" +
        texto + "'" + ")"

    ), { type: db.QueryTypes.INSERT };
    res.end();
});

app.listen(3000, () => {
    console.log("Sucesso");
}); 
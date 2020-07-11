const HTTP_PORT = 3000;

const express = require("express");
const path = require("path");
const expHbs = require("express-handlebars");
const bodyParser = require("body-parser");
// const mongodb = require("mongodb");

const app = express();

const moviesDB = require("./moviesDB.js");


// ----------------------------------------------------------
// Configuración de Handlebars
app.set("view engine", "handlebars");

app.engine("handlebars", expHbs({
    defaultLayout: "home",
    layoutsDir: path.join(__dirname, "views/layouts")
}));

app.set("views", path.join(__dirname, "views"));
// ----------------------------------------------------------

// Ruta base de recursos estáticos
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));

//-----------------------------------------------------------

app.get("/", (req, res) => {
    res.render("index", { layout: "home" });
  });


app.get("/movie-list", (req,res) =>{
    moviesDB.getAll(movieList =>{
        if(movieList){
            res.render("movie-list" , {movies: movieList});
        } else{
            res.status(500).send("error fuerte")
        }
       
    })
})


app.get("/movie-detail/:id", (req, res) => {

    // Consulta una persona que tenga ese id (si no está, retorna undefined)
    moviesDB.getById(req.params.id, movieFound => {
      // Con ese dato renderizo "profile"
      if (movieFound){
        res.render("movie-detail", { movies: movieFound });
      }else{console.log("error")}

    })  
  });


// app.get("/testdb", (req,res) =>{
//     const mongoClient = mongodb.MongoClient;
//     const uri = "mongodb+srv://m3sch:Paraguay0@moviesdb-irhan.mongodb.net/movies?retryWrites=true&w=majority";


//     mongoClient.connect(uri, (err,client) =>{
//         if (err){
//             res.status(500).send(err);
//         }else{
//             const testdb = client.db("movies");
//             const testCollection = testdb.collection("movies-list");
//             testCollection.find({id : 1}).toArray((err, movieList) =>{
//                 res.status(200).send(movieList);
//                 client.close();
//             })
//         }
//     })
// })


app.listen(HTTP_PORT, () => {
    console.log(`servidor iniciado en http://localhost:${HTTP_PORT}`)
})

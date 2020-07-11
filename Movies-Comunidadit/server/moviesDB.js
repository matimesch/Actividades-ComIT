const mongodb = require('mongodb');
const uri = "mongodb+srv://m3sch:admin@moviesdb-irhan.mongodb.net/movies?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:3000"


const getAll = cbResult => {
    mongodb.MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            cbResult(undefined);
            console.log("error en la db1");
            client.close();
        }
        else {
            const moviesdb = client.db("movies");
            const moviesCollection = moviesdb.collection("movies-list");

            moviesCollection.find().toArray((err, moviesList) => {
                if (err) {
                    cbResult(undefined);
                    console.log("error en la db2");
                }
                else {
                    cbResult(moviesList);
                }
                client.close();
            });
        }

    });
}

const getById = (filterId, cbResult) => {
    mongodb.MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            cbResult(undefined);
            console.log("error en filtros 1");
            client.close();
        }
        else {
            const moviesdb = client.db("movies");
            const moviesCollection = moviesdb.collection("movies-list");

            moviesCollection.findOne({ id: parseInt(filterId)}, (err, movieFound) => {
                if (err) {
                    cbResult(undefined);
                    console.log("error en filtros 2");
                }
                else {
                    cbResult(movieFound);
                }
                client.close();
            });
        }
    });
}

module.exports = {
    getAll,
    getById
};
const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const genres = [
    {
        type: "Actions",
    },
    {
        type: "Adventures",
    },
    {
        type: "Comedy",
    },
    {
        type: "Crime-Thriller",
    },
    {
        type: "Science Fiction (Sci-Fi)",
    },
    {
        type:"Horror"
    }
]

const actions = [
    {
        id : 1,
        name : "Die Hard",
    },
    {
        id : 2,
        name : "Mad Max: Fury Road",
    },
    {
        id: 3,
        name : "The Dark Knight",
    },
    {
        id:4,
        name : "John Wick",
    },
    {
        id: 5,
        name : "Terminator"
    }
]

const adventures = [
    {
        id : 1,
        name : "Indiana Jones",
    },
    {
        id : 2,
        name : "The Lord of the Rings",
    },
    {
        id: 3,
        name : "Pirates of the Caribbeant",
    },
    {
        id:4,
        name : "Jurassic Park",
    },
    {
        id: 5,
        name : "The Goonies"
    }
]


app.get("/", (req,res) => {
    res.send("Hello World !, Today we are gooing to learn EXPRESS JS")
})

app.get("/api/genres", (req, res) => {
    res.send(genres);
})





app.get("/api/genres/actions", (req, res) => {
    res.send(actions);
})

app.get("/api/genres/actions/:id", (req,res) => {
    const action = actions.find( a => a.id === parseInt(req.params.id));
    if(!action) return res.status(404).send("The action movie with given id was not found!");
    res.send(action);
})

app.post("/api/genres/actions",(req,res) => {
    const {error} = validateAction(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const action = {
        id : actions.length+1,
        name : req.body.name
    };
    actions.push(action);
    res.send(action);
})

app.put("/api/genres/actions/:id", (req,res) => {
    const action = actions.find(a => a.id === parseInt(req.params.id))
    if (!action) return res.status(404).send("The action movie with given id was not found!")

    const {error} = validateAction(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    action.name = req.body.name;
    res.send(action);
})

app.delete("/api/genres/actions/:id", (req,res) => {
    const action = actions.find(a => a.id === parseInt(req.params.id));
    if (!action) return res.status(404).send("The action movie with given id was not found!");

    const index = actions.indexOf(action);
    actions.splice(index,1);

    res.send(action);
})


function validateAction(action) {
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    });

    return schema.validate(action); 
}






app.get("/api/genres/adventures", (req, res) => {
    res.send(adventures);
})

app.get("/api/genres/adventures/:id", (req,res) => {
    const adventure = adventures.find(a => a.id === parseInt(req.params.id));
    if(!adventure) return res.status(404).send("The adventures movie with given id was not found")
    res.send(adventure);
})

app.post("/api/genres/adventures", (req,res) => {
    const {error} = validateAdventure(req.body);
    if (error) return res.status(400).send("The adventure movie with given id was not found!")

    const adventure = {
        id: adventures.length+1,
        name : req.body.name
    };

    adventures.push(adventure);
    res.send(adventure);
})

app.put("/api/genres/adventures/:id", (req,res) => {
    const adventure = adventures.find(a => a.id === parseInt(req.params.id))
    if(!adventure) return res.status(404).send("The action movie with given id was not found!")

    const {error} = validateAction(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    adventure.name = req.body.name;
    res.send(adventure);
})


app.delete("/api/genres/adventures/:id",(req,res) => {
    const adventure = adventures.find(a => a.id === parseInt(req.params.id));
    if (!adventure) return res.status(404).send("The action movie with given id was not found!");

    const index = adventures.indexOf(adventure);
    adventures.splice(index,1)

    res.send(adventure);
})

function validateAdventure(adventure){
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    });
    return schema.validate(adventure);

}


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`listening to ${port}....`);
})
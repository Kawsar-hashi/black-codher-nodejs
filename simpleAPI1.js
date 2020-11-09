let express = require('express'); 
let app = express();
const fs = require("fs");

    
const fruit =["apples", "bananas","pears"];
const names =["Jane","Yvonne","Tommy"];


const people = [{name: names[0], hobbies: "football", age: 99}, {name: names[1], hobbies:"knitting", age:22}];


const person = [
    { name:"Iris",
      age: "15",
      eyeColour:"Brown"
    },
    {
        name:"Hafsa",
        age:"6",
        eyeColour:"Blue"
    },
    {   name: "Tom",
        age:"12",
        eyeColour:"Hazel",
    }   
]

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.raw());

let animals =["cat","dog","hamster"];

app.delete("/api/profiles/:id", (req, res) => {
    console.log(animals);
    let id = req.params.id;
    animals.splice(id,1);
    console.log(animals);
    res.send("Its all done!");

})



app.put("/api/profiles/", (req, res) => {
   console.log(req.body);
   let text= req.body;
   fs.appendFile("file.txt", JSON.stringify(text), (err, data ) => { 
       if(err){return "Cannot write" + data;}
   })

   res.send("Well done, You did it");

});





app.get("/person/:id", (req, res) => {
   let id = req.params.id;
   res.send( person[id].eyeColour);
});

app.patch("/person"), (req, res) => {


}


app.get("/api/names", (req, res) => {
    res.send(names);
});

app.get("/api/profiles", (req, res) => {
    res.send(profiles);
});

app.get("/profiles", (req, res) => {
    fs.readFile("models/profiles.json", "utf8", (err, data) =>{
        res.send(data);
    });
})

app.get("/profiles/view", (req, res) => {
    fs.readFile("models/profiles.json", "utf8", (err, data) => {
        let output = "<h1>Profiles:</h1>";
        let profiles = JSON.parse(data);
        for(const key of Object.keys(profiles)){
            output += `<h2>${profiles[key].firstname}${profiles[key].secondname}</h2><p>${profiles[key].bio}</p>`;
        }
        res.send(output);
    });

})

app.post("/person", (req, res) => {
    person.push({
        name:req.body.name,
        age:14,
        eyeColour:"Elephant",
    })
    res.send(person);
});


const server = app.listen(5000, function () {
    console.log('Node server is running http://localhost:5000 ...');
    });

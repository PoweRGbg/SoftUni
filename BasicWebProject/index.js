let express = require(`express`);
const app = express();
const port = 3000;

app.get("/", function(req, res){
    console.log("Name passed is: "+name);
    res.send("Hello world!" + name);
});

app.get("/:name", function(req, res){
    
    let name = req.params.name;
    console.log("Name passed is: "+name);
    res.send("Hello world!" + name);
});

app.listen(port, () => 
    console.log("Server listening on port "+ port));
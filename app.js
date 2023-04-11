const express = require("express");
const bodyparser = require("body-parser");
var mongoose = require("mongoose");
const cliente_route = require("./routes/cliente");
const admin_route = require("./routes/admin");
const producto_route = require("./routes/producto");
const app = express();
const port = process.env.PORT || 4201;
mongoose.connect('mongodb+srv://akarnis:Slenderman.500@angularamazon.tjl2ztc.mongodb.net/?retryWrites=true&w=majority')
    .then((res) => {
        console.log('Servidor corriendo');
        app.listen(port, function(){
            console.log("Servidor corriendo en el puerto" + port);
        });
    })
    .catch((err) => {
        console.log(err);
    })


    app.use(bodyparser.urlencoded({limit: '50mb',extended:true}));
    app.use(bodyparser.json({limit: '50mb', extended: true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use("/api", cliente_route);
app.use("/api", admin_route);
app.use("/api", producto_route);

module.exports = app;
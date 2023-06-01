const express = require("express");
const bodyparser = require("body-parser");
var mongoose = require("mongoose");
const cliente_route = require("./routes/cliente");
const admin_route = require("./routes/admin");
const producto_route = require("./routes/producto");
const cupon_route = require("./routes/cupon");
const config_route = require("./routes/config");
const carrito_route = require("./routes/carrito");
const venta_route = require("./routes/venta");
const api = require("./routes/cliente");
const app = express();
const port = process.env.PORT || 4201;

var server = require('http').createServer(app);
var io = require('socket.io')(server,{
    cors: {origin: '*'}
});
io.on('connection',function(socket){
    socket.on('delete-carrito', function(data){
        io.emit('new-carrito',data);
        console.log(data);
    });
    socket.on('add-carrito-add', function(data){
        io.emit('new-carrito-add',data);
        console.log(data);
    });
});
mongoose.connect('mongodb+srv://akarnis:Slenderman.500@angularamazon.tjl2ztc.mongodb.net/?retryWrites=true&w=majority')
    .then((res) => {
        console.log('Servidor corriendo');
        server.listen(port, function(){
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
app.use("/api", cupon_route);
app.use("/api",config_route);
app.use("/api", carrito_route);
app.use("/api", venta_route);

module.exports = app;
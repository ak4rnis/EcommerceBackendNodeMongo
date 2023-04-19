const Producto = require("../models/producto");
const fs = require("fs");
const path = require('path');
const Inventario = require("../models/inventario");
const registro_producto_admin = async function(req, res){
    if(req.user){
        if(req.user.role == 'admin'){
            let data = req.body;
            var img_path = req.files.portada ? req.files.portada.path : null;

            if (img_path !== null) {
                var name = img_path.split('\\');
                // Resto del código que usa la variable 'name'
              }
              if (typeof name !== 'undefined' && name.length >= 3) {
                var portada_name = name[2];
                // Resto del código que usa la variable 'portada_name'
              }
            data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
            data.portada = portada_name;
            let reg = await Producto.create(data);
            let inventario = await Inventario.create({
                admin: req.user.sub,
                cantidad: data.stock,
                proveedor:"Primer registro",
                producto: reg._id
            })
            res.status(200).send({data:reg, inventario: inventario});
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const listar_productos_admin = async function(req, res){
    if(req.user){
        if(req.user.role == "admin"){
            var filtro = req.params['filtro'];
            let reg = await Producto.find({titulo: new RegExp(filtro, 'i')});
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}    

const obtener_portada = async function(req, res){
    var img = req.params['img'];
    fs.stat('./uploads/productos/'+img, function(err){
        if(!err){
            let path_img = './uploads/productos/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/default.png';
            res.status(200).sendFile(path.resolve(path_img));
        }
    })
    
}

const obtener_producto_admin = async function(req, res){
    if(req.user){
        if(req.user.role == 'admin'){
            var id = req.params['id'];
            try{
                var reg = await Producto.findById({_id:id});
                res.status(200).send({data:reg});
            }catch(error){
                res.status(200).send({data:undefined});
            }
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const actualizar_producto_admin = async function(req, res){
    if(req.user){
        if(req.user.role == 'admin')
        {
            let id = req.params['id'];
            let data = req.body;
            if(req.files){
                var img_path = req.files.portada ? req.files.portada.path : null;

                if (img_path !== null) {
                    var name = img_path.split('\\');
                // Resto del código que usa la variable 'name'
                }
                if (typeof name !== 'undefined' && name.length >= 3) {
                    var portada_name = name[2];
                // Resto del código que usa la variable 'portada_name'
                }
                let reg = await Producto.findByIdAndUpdate({_id:id},{
                    titulo: data.titulo,
                    stock: data.stock,
                    precio: data.precio,
                    categoria: data.categoria,
                    descripcion: data.descripcion,
                    contenido: data.contenido,
                    portada: portada_name
                });
                fs.stat('./uploads/productos/'+reg.portada, function(err){
                    if(!err){
                        fs.unlink('./uploads/productos/'+img, (err) => {
                            if(err) throw err;
                        })
                    }
                })
                res.status(200).send({data:reg});
            }else{
                let reg = await Producto.findByIdAndUpdate({_id:id},{
                    titulo: data.titulo,
                    stock: data.stock,
                    precio: data.precio,
                    categoria: data.categoria,
                    descripcion: data.descripcion,
                    contenido: data.contenido
                });
                res.status(200).send({data:reg});
            }
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const eliminar_producto_admin = async function(req, res){
    if(req.user){
        if(req.user.role == "admin")
        {
            var id = req.params['id'];
            let reg = await Producto.findByIdAndRemove({_id: id});
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message: 'NoAccess'});
        
        }
    }else{
        res.status(500).send({message: 'NoAccess'});

    }
}

const listar_inventario_producto_admin = async function(req, res){
    if(req.user){
        if(req.user.role == "admin")
        {
            var id = req.params['id'];
            var reg = await Inventario.find({producto:id}).populate('admin').sort({createdAt:-1});
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const eliminar_inventario_producto_admin = async function(req, res){
    if(req.user){
        if(req.user.role == "admin")
        {
            var id = req.params['id'];
            let reg = await Inventario.findByIdAndRemove({_id:id});
            let prod = await Producto.findById({_id:reg.producto});
            let nuevo_stock = parseInt(prod.stock) - parseInt(reg.cantidad);
            let producto = await Producto.findByIdAndUpdate({_id: reg.producto}, {
                stock: nuevo_stock
            });
            res.status(200).send({data:producto});
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const registro_inventario_producto_admin = async function(req, res){
    if(req.user)
    {
        if(req.user.role == "admin")
        {
            let data = req.body;
            let reg = await Inventario.create(data);
            let prod = await Producto.findById({_id: reg.producto});
            let nuevo_stock = parseInt(prod.stock) + parseInt(reg.cantidad);
            let producto = await Producto.findByIdAndUpdate({_id: reg.producto}, {
                stock: nuevo_stock
            })
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

module.exports = {
    registro_producto_admin,
    listar_productos_admin,
    obtener_portada,
    obtener_producto_admin,
    actualizar_producto_admin,
    eliminar_producto_admin,
    listar_inventario_producto_admin,
    eliminar_inventario_producto_admin,
    registro_inventario_producto_admin
    
}
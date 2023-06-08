const Descuento = require("../models/descuento");
const fs = require("fs");
const path = require("path");

const registro_descuento_admin = async function(req,res){
    if(req.user){
        if(req.user.role == 'admin'){
            let data = req.body;
            var img_path = req.files.banner ? req.files.banner.path : null;

            if (img_path !== null) {
                var name = img_path.split('\\');
                // Resto del código que usa la variable 'name'
              }
              if (typeof name !== 'undefined' && name.length >= 3) {
                var banner_name = name[2];
                // Resto del código que usa la variable 'portada_name'
              }
              data.banner = banner_name;
              let reg = await Descuento.create(data);
              res.status(200).send({data:reg});
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const listar_descuentos_admin = async function(req,res){
    if(req.user){
        if(req.user.role == 'admin'){
            var filtro = req.params['filtro'];
            let reg = await Descuento.find({titulo: new RegExp(filtro, 'i')}).sort({createdAt:-1});
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const obtener_banner_descuento = async function(req,res){
    var img = req.params['img'];
    fs.stat(',/uploads/descuentos/'+img, function(err){
        if(!err){
            let path_img = './uploads/descuentos'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/default.png';
            res.status(200).sendFile(path.resolve(path_img));
        }
    })
    
}

const obtener_descuento_admin = async function(req,res){
    if(req.user){
        if(req.user.role == 'admin')
        {
            var id = req.params['id'];
            try{
                var reg = await Descuento.findById({_id: id});
                res.status(200).send({data:reg});
            }catch(error){
                res.status({data:undefined});
            }
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const actualizar_descuento_admin = async function(req, res){
    if(req.user){
        if(req.user.role == 'admin')
        {
            let id = req.params['id'];
            let data = req.body;
            if(req.files){
                var img_path = req.files.banner ? req.files.banner.path : null;

                if (img_path !== null) {
                    var name = img_path.split('\\');
                // Resto del código que usa la variable 'name'
                }
                if (typeof name !== 'undefined' && name.length >= 3) {
                    var banner_name = name[2];
                // Resto del código que usa la variable 'portada_name'
                }
                let reg = await Descuento.findByIdAndUpdate({_id:id},{
                    titulo: data.titulo,
                    descuento: data.descuento,
                    fecha_inicio: data.fecha_inicio,
                    fecha_fin: data.fecha_fin,
                    banner: banner_name
                });
                fs.stat('./uploads/descuentos/'+reg.banner, function(err){
                    if(!err){
                        fs.unlink('./uploads/descuentos/'+img, (err) => {
                            if(err) throw err;
                        })
                    }
                })
                res.status(200).send({data:reg});
            }else{
                let reg = await Descuento.findByIdAndUpdate({_id:id},{
                    titulo: data.titulo,
                    descuento: data.descuento,
                    fecha_inicio: data.fecha_inicio,
                    fecha_fin: data.fecha_fin,
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

const eliminar_descuento_admin = async function(req,res){
    if(req.user){
        if(req.user.role == "admin"){
            var id = req.params['id'];
            let reg = await Descuento.findByIdAndRemove({_id: id});
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

module.exports = {
    registro_descuento_admin,
    listar_descuentos_admin,
    obtener_banner_descuento,
    obtener_descuento_admin,
    actualizar_descuento_admin,
    eliminar_descuento_admin,
}
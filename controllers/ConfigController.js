const Config = require("../models/config");
const fs = require("fs");
const path = require("path");

const obtener_config_admin = async function(req, res){
    if(req.user){
        if(req.user.role == "admin")
        {
            
            let reg = await Config.findById({_id: "643e277e886d03f8c61ebea1"});
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const actualiza_config_admin = async function(req,res){
    if(req.user){
        if(req.user.role == "admin")
        {
            var id = req.params['id'];
            let data = req.body;
            if(req.files){
                console.log("si hay imagen")
                var img_path = req.files.logo ? req.files.logo.path : null;

                if (img_path !== null) {
                    var name = img_path.split('\\');
                    // Resto del código que usa la variable 'name'
                }
                if (typeof name !== 'undefined' && name.length >= 3) {
                    var logo_name = name[2];
                    // Resto del código que usa la variable 'portada_name'
                }
                let reg = await Config.findByIdAndUpdate({_id: "643e277e886d03f8c61ebea1"},{
                    categorias: data.categorias,
                    titulo: data.titulo,
                    serie: data.serie,
                    logo: logo_name,
                    correlativo: data.correlativo
                })
                fs.stat('./uploads/configuraciones/'+reg.logo, function(err){
                    if(!err){
                        if(err) throw err;
                    }
                });
                res.status(200).send({data:reg});
            }else{
                console.log("no hay imagen");
                let reg = await Config.findByIdAndUpdate({_id: "643e277e886d03f8c61ebea1"},{
                    categorias: data.categorias,
                    titulo: data.titulo,
                    serie: data.serie,
                    
                    correlativo: data.correlativo
                })
                res.status(200).send({data:reg});
            }
            
            
           
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const registrar_configuracion_admin = async function(req,res){
    await Config.create({
        categorias: [],
        titulo: 'Createx',
        logo: 'logo.png',
        serie: "0001",
        correlativo: "000001",
    });
} 

const obtener_logo = async function(req, res){
    var img = req.params['img'];
    fs.stat('./uploads/configuraciones/'+img, function(err){
        if(!err){
            let path_img = './uploads/configuraciones/'+img;
            console.log("existoso")
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/default.png';
            console.log("fallido")
            res.status(200).sendFile(path.resolve(path_img));
        }
    })
}

module.exports = {
    actualiza_config_admin,
    obtener_config_admin,
    registrar_configuracion_admin,
    obtener_logo
}
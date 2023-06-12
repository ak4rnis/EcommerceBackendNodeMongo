const Admin = require("../models/admin");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../helpers/jwt");
const Contacto = require("../models/contacto");
const registro_admin = async function(req, res){
    let data = req.body;
    let admin_arr = [];
    admin_arr = await Admin.find({email: data.email});
    if(admin_arr.length == 0)
    {
        if(data.password){
            bcrypt.hash(data.password, null, null, async function(err, hash){
                if(hash){
                    data.password = hash;
                    console.log(hash);
                    let reg = await Admin.create(data);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({message: "ErrorServer", data:undefined});
                }
            })
        }else{
            res.status(200).send({message: 'No hay una contraseña', data: undefined})
        }
        
    }else{
        res.status(200).send({message: "El correo ya existe en la base de datos", data: undefined});
    }
}

const login_admin = async function(req,res){
    var data = req.body;
    var admin_arr = [];

    admin_arr = await Admin.find({email:data.email});

    if(admin_arr.length == 0){
        res.status(200).send({message: 'El correo electrónico no existe', data: undefined});
    }else{
        //LOGIN
        let user = admin_arr[0];

        bcrypt.compare(data.password, user.password, async function(error,check){
            if(check){
                res.status(200).send({
                    data:user,
                    token: jwt.createToken(user)
                });
            }else{
                res.status(200).send({message: 'Las credenciales no coinciden', data: undefined}); 
            }
        });
 
    } 
}

const obtener_mensajes_admin = async function(req,res){
    if(req.user){
        if(req.user.role == 'admin'){
            let reg = await Contacto.find().sort({createdAt:-1});
            res.status(200).send({data:reg}); 
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const cerrar_mensaje_admin = async function(req,res){
    if(req.user){
        if(req.user.role == 'admin'){
            let id = req.params['id'];
            let reg = await Contacto.findByIdAndUpdate({_id: id}, {estado: 'Cerrado'});
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}



module.exports = {
    registro_admin,
    login_admin,
    obtener_mensajes_admin,
    cerrar_mensaje_admin,
}
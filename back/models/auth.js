const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt= require("jsonwebtoken")
const crypto= require("crypto")

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Debe ingresar el nombre"],
        maxlength: [120, "No puede exceder 120 caracteres"]
    },
    email: {
        type: String,
        required: [true, "Debe ingresar el correo electronico"],
        unique: true,
        validate: [validator.isEmail, "Ingrese un email valido"]
    },
    password: {
        type: String,
        required: [true, "Debe registrar una contraseña"],
        minlength: [6, "Su contraseña debe tener al menos 6 caracteres"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

//EENCRIPTAR CONTRASEÑA ANTES DE GUARDAR
usuarioSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//DECODIFICAR CONTRASEÑA PARA COMPARAR
usuarioSchema.methods.compararPass = async function (passDada){
    return await bcrypt.compare(passDada, this.password)
}

//Retornar un JWT token
usuarioSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIEMPO_EXPIRACION
    })
}

//GENERAR TOKEN PARA RESET DE CONTRASEÑA
usuarioSchema.methods.genResetPasswordToken = function () {
    const resetToken= crypto.randomBytes(20).toString('hex')

    //Hashear y setear resetToken
    this.resetPasswordToken= crypto.createHash("sha256").update(resetToken).digest('hex')

    //Setear fecha de expiracion del token
    this.resetPasswordExpire= Date.now() + 30*60*1000 //el token dura 30 min

    return resetToken
}

module.exports = mongoose.model("auth", usuarioSchema)
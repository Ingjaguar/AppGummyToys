const mongoose=require("mongoose")

const productosSchema=mongoose.Schema({
    nombre:{
        type:String,
        required:[true,"Debe registart el nombre del producto."],
        trim:true,
        maxLength:[120,"El nombre no debe exceder 120 caracteres."]
    },
    precio:{
        type: Number,
        required:[true,"Debe registrar el precio del producto."],
        maxLength:[8, "El precio del producto no puede estar por encima de 99'999.999"],
        default: 0.0
    },
    descripcion:{
      type:String,
      required:[true,"Debe registrar una descripcion para el producto."]
    },
    calificacion:{
        type: Number,
        default: 0
    },
    imagen:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    categoria:{
        type:String,
        required:[true,"Seleccione la categoria del producto."],
        enum:{
            values:[
                "Juegos de mesa",
                "Juegos didacticos",
                "Vehiculos electricos",
                "Muñecas y peluches",
                "Juguetes para bebes",
                "Bloques y construccion",
                "Figuras de accion y robots"
            ]
        }
    },
    vendedor:{
        type:String,
        required:[true,"Registre el vendedor del producto"]
    },
    inventario:{
        type: Number,
        required:[true, "Registre el stock del producto"],
        maxLength:[5,"Cantidad maxima del producto no puede sobrepasar 99999"],
        default:0
    },
    numCalificaciones:{
        type:Number,
        default:0
    },
    opiniones:[
        {
            nombreCliente:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comentario:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    fechaCreacion:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model("productos",productosSchema)
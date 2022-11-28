class APIFeatures{
    constructor(query, queryStr){
        this.query=query;
        this.queryStr=queryStr
    }

//buscar por palabra clave
search(){
    const keyword= this.queryStr.keyword ? {
        nombre:{
            $regex:this.queryStr.keyword,
            $options:'i'
        }
    }:{}

    this.query= this.query.find({...keyword});
    return this
}

//filtros

filter(){
    const queryCopy ={...this.queryStr};

    //Eliminar filtros anteriores (los campos que vienen de otras consultas)
    const removeFields =["keyword","limit","page"]
    removeFields.forEach(el=> delete queryCopy[el])

    //Filtro avanzado por precio
    let queryStr= JSON.stringify(queryCopy)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match =>
    `$${match}`)

    this.query= this.query.find(JSON.parse(queryStr))
    return this


}

//paginacion que se vean una cantidad determinada de productos por pagina
pagination(resPerPage){
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage-1);

    this.query= this.query.limit(resPerPage).skip(skip)
    return this
}
}

module.exports = APIFeatures
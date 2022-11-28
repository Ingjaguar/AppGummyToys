import React from 'react'

const ListReviews = ({ opiniones }) => {
    return (
        <div className="reviews w-75">
            <h3>Opiniones de Otros clientes:</h3>
            <hr />
            {opiniones && opiniones.map(opinion => (
                <div key={opinion._id} className="review-card my-3">
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(opinion.rating / 5) * 100}%` }}></div>
                    </div>
                    <p className="review_user">por {opinion.nombreCliente}</p>
                    <p className="review_comment">{opinion.comentario}</p>

                    <hr />
                </div>
            ))}
        </div>
    )
}

export default ListReviews
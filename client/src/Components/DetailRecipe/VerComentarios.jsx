import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReviews, getComentarios } from "../../actions";
import PutReview from "./PutReview";

export function VerComentarios({id}){

        const comments = useSelector(state => state.comments)
        const token = useSelector(state => state.token);
        const user = useSelector(state => state.user);
        const toggleReviews = useSelector(state => state.toggleReviews)
 
        const dispatch = useDispatch()
        
      useEffect(() => {
              console.log(id,'id')
             dispatch(getComentarios(id));
      }, [dispatch,id,toggleReviews])

      function borrar(idr){
        const ok= window.confirm('Deseas borrar este comentario?')
        if(ok)dispatch(deleteReviews(idr,token));
      }
 
        return (
                <div className={style.contentAllComent}>
                        {comments?.map((e)=>{
                                const fecha = new Date(e.date)
                                const mes= fecha.getMonth()+1
                                const dia= fecha.getDate()
                                const anio= fecha.getFullYear()
                                return (
                                        
                                        <div className={style.coment}>
                                                        <div>
                                
                                        {e?.owner.name
                                        }:</div>
                                                <label id={style.diaComent} className={style.textLabel} type='date'>{`${dia}/${mes}/${anio}`}</label>     
                                                <span className={style.dateComent}>{e.comment}</span>
                                        {(!!token && user.id === e?.owner.id)? 
                                                <div>
                                                <button onClick={()=>borrar(e.id)}>Eliminar</button> 
                                                <PutReview comm={e.comment} idReview={e.id} /> </div> : null
                                        }
                                        </div>
                                )
                        })}

                </div>
        );
}






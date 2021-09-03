import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from '../../Styles/StyleCards.module.css';
import { Link } from 'react-router-dom';
import { getDetail } from '../../actions/index'

export default function Cards(){
    //Traigo todo
    const allRecipes = useSelector((state) => state.recipes)
    const dispatch = useDispatch()
    
    //Existen recetas? Mandale mecha.
    return (
        <div class={style.content} >
        {allRecipes?.map((e) => {
            return(
                <div class="card" id={style.carData} Key={e.id}>
                    <Link to={`/recipe/${e.id}`}
              onClick={() => dispatch(getDetail(e.id))} id={style.normal}>
                    <img class="card-img-top" src={e.img} alt="No sé encuentra la imagen" />
                    <div class="card-body" >
                        <h1 class="card-title" >{e.name.toUpperCase()}</h1>
                        <h4 class="card-text" >Dificultad: {e.difficulty}</h4>
                    </div>       
                </Link>
                </div>
            )
        })}
     </div>
    )
}
import axios from "axios";
import { GET_RECIPES, GET_INGREDIENTS, SEARCH_RECIPES, ORDER_ZA, ORDER_AZ, GET_DETAIL,UPDATE_RECIPE} from "./constants";
import { RECIPES_URL, INGREDIENTS_URL, RECIPES_DETAIL_URL } from "../routes";

export function getRecipes() {

//me trae las recetas de la db
  return async function (dispatch) {
    const recipes = await axios.get(RECIPES_URL);
    return dispatch({
      type: GET_RECIPES,
      payload: recipes.data,
    });
  };
}
//me trae los ingredientes de la db
export function getIngredients() {

  return async function (dispatch) {
    const ingredients = await axios.get(INGREDIENTS_URL);
    return dispatch({
      type: GET_INGREDIENTS,
      payload: ingredients.data,
    });
  };
}
//obtener el detalle de la receta
export function getDetail (id){
  return async function (dispatch) {
    const detail = await axios.get(RECIPES_DETAIL_URL + id);
      return dispatch({
      type: GET_DETAIL,
      payload: detail.data
    });
  };
}
// Despues voy a realizar cambios en la function y el el axios
export function searchRecipes(name) {
  return async  (dispatch) => {
    try{
      const filtRecipes = await axios.get(RECIPES_URL + `/search/${name}`);
       dispatch({ type: SEARCH_RECIPES, payload: filtRecipes.data});
    }catch(error){
      console.log(error)
    }
  };
}

export function orderZA(){
  return {type:ORDER_ZA}
}
export function orderAZ(){
  return {type:ORDER_AZ}
}
//modificar la receta
export function putRecipe(value){
  return async (dispatch)=>{
    try{
      const update = await axios.put(RECIPES_URL + `/${value.id}`, value);
      return dispatch ({ 
        type: UPDATE_RECIPE,
      payload:update.data})
    }catch(error){
      console.log(error)
    }
  }
}
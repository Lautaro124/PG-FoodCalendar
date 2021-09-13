import axios from "axios";
import {
  GET_RECIPES,
  GET_UNIT,
  GET_INGREDIENTS,
  GET_DETAIL,
  GET_CATEGORY,
  ORDER_ZA,
  ORDER_AZ,
  ORDER_BY_DIFFICULTY,
  ORDER_BY_DIFFICULTY_INV,
  SEARCH_RECIPES,
  FILTERED_BY_INGREDIENT,
  FILTERED_BY_DIFFICULTY,
  FILTERED_BY_CATEGORY,
  SET_FORM_INGREDIENTS,
  RECIPE_CALENDAR,
  UPDATE_RECIPE,
  PAGE,
  CREATE_INGREDIENT,
  SET_FORM_CATEGORY,
  CREATE_CATEGORY,
  CLEAN_NEW_RECIPE,
  DELETE_INVENTARY,
  CLEAR_INVENTARY,
  GET_CALENDAR,
  GET_CALENDAR_DETAIL,
  GET_CALENDAR_USER,
  DELETE_RECIPE,
  CLEAN_DELETE_RECIPE
} from "./constants";

import {
  RECIPES_URL,
  CATEGORY_URL,
  INGREDIENTS_URL,
  UNIT_URL,
  RECIPES_DETAIL_URL,
  RECIPES_SEARCH_URL,
  RECIPES_BY_INGREDIENTS_URL,
  RECIPES_BY_CATEGORY_URL,
  REGISTER,
  LOGIN,
  CALENDAR_URL,
} from "../routes";

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
  return async (dispatch) => {
    try {
      const ingredients = await axios.get(INGREDIENTS_URL);
      dispatch({ type: GET_INGREDIENTS, payload: ingredients.data, });
    } catch (error) {
      console.log("No hay  ingredientes")
    }
  };
}

export function getCategory() {
  return async (dispatch) => {
    try {
      const category = await axios.get(CATEGORY_URL);
      dispatch({ type: GET_CATEGORY, payload: category.data, });
    } catch (error) {
      console.log("No hay  categoria")
    }
  };
}

//obtener el detalle de la receta
export function getDetail(id) {
  return async function (dispatch) {
    const detail = await axios.get(RECIPES_DETAIL_URL + id);
    return dispatch({
      type: GET_DETAIL,
      payload: detail.data
    });
  };
}

export function searchRecipes(name) {
  return async (dispatch) => {
    try {
      const filtRecipes = await axios.get(RECIPES_SEARCH_URL + `${name}`);
      console.log(filtRecipes)
      return dispatch({ type: SEARCH_RECIPES, payload: filtRecipes.data });
    } catch (error) {
      alert("No se encontraron recetas")
    }
  };
}

export function getUnit() {
  return async function (dispatch) {
    const unit = await axios.get(UNIT_URL)

    dispatch({ type: GET_UNIT, payload: unit.data })
  }
}

export function FilterRecipeByIngredient(name) {
  return async (dispatch) => {
    try {
      const filtRecipes = await axios.get(RECIPES_BY_INGREDIENTS_URL + `${name}`);
      dispatch({ type: FILTERED_BY_INGREDIENT, payload: filtRecipes.data });
    } catch (error) {
      alert("No hay Receta con ese ingrediente")
    }
  };
}
export function FilterRecipeByDifficulty(payload) {
  return  {
    type: FILTERED_BY_DIFFICULTY, 
    payload  
  };
}
export function FilterRecipeByCategory(name) {
  return async (dispatch) => {
    try {
      const filtRecipes = await axios.get(RECIPES_BY_CATEGORY_URL + `${name}`);
      dispatch({ type: FILTERED_BY_CATEGORY, payload: filtRecipes.data });
    } catch (error) {
      alert("No hay Receta con esa Categoria")
    }
  };
}

// Creacion de Receta

export function createRecipe(recipe){
 return async (dispatch)=>{
    try{
      const newRecipe = await axios.post(RECIPES_URL, {...recipe,rating: 0})
      return dispatch ({ 
        type: UPDATE_RECIPE,
      payload:newRecipe.data})
    }catch(error){
      console.log(error)
   }}
}

export function orderAZ() {
  return { type: ORDER_AZ }
}

export function orderZA() {
  return { type: ORDER_ZA }
}

export function orderByDifficulty() {
  return { type: ORDER_BY_DIFFICULTY }
}
export function orderByDifficultyInv() {
  return { type: ORDER_BY_DIFFICULTY_INV }
}

//modificar la receta
export function putRecipe(id,value){
  return async (dispatch)=>{
    try{
      const update = await axios.put(RECIPES_URL + `/${id}`, value);
      return dispatch ({ 
        type: UPDATE_RECIPE,
      payload:update.data})
    }catch(error){
      console.log(error)
   }}}

export function setFormIngredients(payload){
    return {type: SET_FORM_INGREDIENTS, payload}
}

export function register(usuer){
  return async function(dispatch){
    const reg = await axios.post(REGISTER, usuer)
    return dispatch(reg)
  }
}

export function login(user){
  return async function(dispatch){
    const reg = await axios.post(LOGIN, user)
    return dispatch(reg)
  }
}
export function createIngredient(ingredient){
  return async function(dispatch){
    try{
      const newIngredient = await axios.post(INGREDIENTS_URL, {...ingredient})
      console.log(newIngredient)
      return dispatch({type:CREATE_INGREDIENT})
    }catch(error){
      alert("No se creó el ingrediente")
    }
  }
}

// Enviar recetas  al stack del Calendario

export function setRecipeCalendar(payload){
   return { 
    type: RECIPE_CALENDAR,
    payload 
  }
}

export function page(payload){
  return{
    type: PAGE,
    payload
  }
}

export function postcalendar(obj){
  return async function (dispatch){
    const aux = await axios.post(CALENDAR_URL,obj)
    return dispatch(aux)
  }
}

export function setFormCategory(payload){
  return {type: SET_FORM_CATEGORY, payload}
}

export function createCategory(category){
  return async function(dispatch){
    try{
      const newCategory = await axios.post(CATEGORY_URL, {...category})
      console.log(newCategory)
      return dispatch({type:CREATE_CATEGORY})
    }catch(error){
      alert("No se creó la categoría")
    }
  }
}

export function cleanNewRecipe(){
  return {type: CLEAN_NEW_RECIPE}
}

export function deleteInventary(i){
  return {
    type: DELETE_INVENTARY,
    payload:i
  }
}

export function clearInventary(id){
  return {
    type: CLEAR_INVENTARY,
    payload:id
  }
}

export  function getCalendar(){
  return async function (dispatch){
    const calendary=await axios.get(CALENDAR_URL);
    return dispatch ({
      type: GET_CALENDAR,
      payload:calendary.data
    })
  }
}

export function getCalendarDetail(id){
  return async function (dispatch) {
    const calendarDetail = await axios.get(CALENDAR_URL + '/' + id);
    return dispatch({
      type: GET_CALENDAR_DETAIL,
      payload: calendarDetail.data
    });
  }; 
}

export function getCalendarUser(id){
  return async function (dispatch){
    const calendaruser = await axios.get (CALENDAR_URL +'/user');
    return dispatch ({
      type : GET_CALENDAR_USER,
      payload: calendaruser.data
    });
  };
}

export function deleteRecipe(id){
  return async function (dispatch){
    const borrar = await axios.delete (RECIPES_URL +'/' + id );
    return dispatch ({
      type : DELETE_RECIPE,
      payload: borrar.data
    });
  };
}

export function cleanDeleteRecipe(){
  return{ type: CLEAN_DELETE_RECIPE}
}

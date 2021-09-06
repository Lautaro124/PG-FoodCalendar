import React ,{useState,useEffect}from "react";
import style from "../../Styles/StyleFrom.module.css"
import { putRecipe, getIngredients } from "../../actions/index";
import { Formik, useFormik,setValues} from "formik";
import { useDispatch, useSelector } from "react-redux";
import SelectCard from "../CreateRecipe/SelectCard/SelectCard";



export default function UpdateForm() {

  const dispatch = useDispatch();
  const update = useSelector(state => state.detail)
  
  const ingre = useSelector((state) => state.ingredients);
  const ingre2 = update.ingredients;
  
      console.log(ingre2,'ingre')

         useEffect(() => {
          dispatch(getIngredients());
        }, [dispatch]);
            
        
      function  eliminar(e){
          console.log ((e.target.value),'entre')
          console.log((update.ingredients[2].ingredient.name))
           var arr=[]
          for(let i=0;i<update.ingredients.length;i++){
            if(update.ingredients[i].ingredient.name !== e.target.value){
              arr.push(update.ingredients[i])}
          }
          console.log(arr,'arraynuevo')
                    
          }

          function addIngre(){}
          
   return (
      <div class={style.centrado}>
        <Formik
          initialValues = {{}}
          
            validate ={ (values) => {
              //aca van las validaciones
              let error = {};
          
              if (!/^[a-zA-Z\s]*$/.test(values.name)) {
                error.name = "No es texto";
              }
          
            if (!/^[a-zA-Z\s]*$/.test(values.preparation)) {
                error.preparation = "No es texto";
              }

             return error;
            }}

          onSubmit={(valores)=>{ //valores me da los datos que ingreso en el form
             dispatch(putRecipe(update.id,valores))
              console.log(valores)
              }}
        >
    {({values,errors,handleSubmit,handleChange,handleBlur,touched})=>(
          <form class={style.forms} onSubmit={handleSubmit}>
          <div div class="mb-3">
            <label class="form-label">Nombre</label>
            <input
              type='text'
              id='name'
              value={values.name||update.name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
              class="form-control"
            />
            {errors.name && touched.name === true &&<div class="cosoForm">{errors.name}</div>}

          </div>
  
          <div >
          {/*   <label class="form-label">Ingredientes</label>
          <div
              defaultValue="none"
              onChange={handleChange}
              name={`ingredients[${values?.ingredients?.length}].ingredient`}
              id="ingredients"
              class="form-control"
              value={values?.ingredients||update.ingredients}
            >
              {ingre2?.map((e) => {
                return (
                  <span>{e.ingredient.name} {e.amount} {e.unit.name}{'  '}
                  <button onClick={(e)=>eliminar(e)} value={e.ingredient.name} key={e.ingredient.id}>   
                        X    
                    </button><br/>
                   </span>
                );
              })}
             </div>  */}

              <h3>Agregar ingredientes</h3>
              <select
            onChange={handleChange}
            name={`ingredients[${values?.ingredients?.length}].ingredient`}
            id="disabledSelect"
            class="form-select"
          >
            {ingre?.map((e) => {
              return (
                <option name="ingredients" value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>

          <div class={style.buttonsRemove}>
              
            {values?.ingredients?.length > 0 &&
              values?.ingredients?.map((e, index) => {

                return <SelectCard ingredient={e.ingredient} name={`ingredients[${index}]`}
                  handleChange={handleChange} />
              })}
        
            </div>
          </div>
        
  
          <div class="mb-3">
            <label class="form-label">Dificultad</label>
            <select
              defaultValue="Fácil"
              onChange={handleChange}
              name="difficulty"
              class="form-control"
            >
              <option defaultValue={update.difficulty}>{update.difficulty}</option>
              <option name="difficulty" value="Fácil"> 
                Fácil
              </option>
              <option name="difficulty" value="Moderado">  
                Moderado
              </option>
              <option name="difficulty" value="Difícil">
                Difícil
              </option>
            </select>
          </div>
  
          <div class="mb-3">
            <label class="form-label">Preparacion</label>
            <textarea
              onChange={handleChange}
              value={values.preparation||update.preparation}
              onBlur={handleBlur}
              class="form-control"
              name="preparation"
              type="text"
              placeholder={update.preparation}
            />
            {errors.preparation && touched.preparation && <div class="cosoForm">{errors.preparation}</div>}
          </div>
  
          <div class="mb-3">
            <label class="form-label">Imagen</label>
            <input
              onChange={handleChange}
              value={values.img||update.img}
              onBlur={handleBlur}
              class="form-control"
              name="img"
              type="text"
              placeholder="write here..."
            />
            {errors.img && touched.img && <div class="cosoForm">{errors.img}</div>}
          </div>

          <div class="col-auto">
            <button type="submit" class="btn btn-primary mb-3">
              Actualizar
            </button>
          </div>
        </form>

        )}
        </Formik>
      </div>
    );
  
}

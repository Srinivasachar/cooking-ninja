//import Recipe from '../pages/recipe/Recipe'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import DeleteIcon from '../assets/deleteicon.svg'
import { projectFirestore } from '../firebase/config'
import './RecipeList.css'

export default function RecipeList({ recipes }) {
 const { mode } = useTheme()
 if(recipes.length === 0){
    return <div className='error'>No recipes to load...</div>
 }

 const handleRecipeDelete = async (id) => {
  try{
   await projectFirestore.collection('recipes').doc(id).delete()
  } catch (err) {
    console.log(err)
  }
 }
  return (
    <div className='recipe-list'>
        {recipes.map(recipe =>(
            <div key={recipe.id} className={`card ${mode}`}>
            <h3>{recipe.title}</h3>
            <p>{recipe.cookingTime} to make.</p>
            <div>{recipe.method.substring(2, 100)}</div>
            <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
            <img 
            className='delete'
            src={DeleteIcon}
            onClick={() => handleRecipeDelete(recipe.id)}/>
        </div>
        ))}
    </div>
  )
}

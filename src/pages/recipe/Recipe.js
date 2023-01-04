import { useParams } from 'react-router-dom'
//import { useFetch } from '../../hooks/useFetch'
import { useTheme } from '../../hooks/useTheme'
import { useState, useEffect } from 'react'
import { projectFirestore } from '../../firebase/config'
import './Recipe.css'

export default function Recipe() {

const { id } = useParams()
const { mode } = useTheme()
//const url = "http://localhost:3000/recipes/"+ id
//const {data: recipe, isPending, error } = useFetch(url)
const [recipe, setRecipe] = useState(null)
const [isPending, setIsPending] = useState(false)
const [error, setError] = useState(false)

useEffect( () => {
  setIsPending(true)
  projectFirestore.collection('recipes').doc(id).get().then((doc) => {
    if(doc.exists){
      setRecipe(doc.data())
    } else {
      setError("Couldn't find the recipe")
    }
    setIsPending(false)
  }).catch((err) => {
    setError(err.message)
    setIsPending(false)
  })
},[id])

  return (
    <div className={`recipe ${mode}`}>
        {error && <p className='error'>{error}</p>}
        {isPending && <p className='pending'>Loading...</p>}
        {recipe && (
            <>
                <h2 className='page-title'>{recipe.title}</h2>
                <p>Take {recipe.cookingTime} to cook.</p>
                <ul>
                    {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                </ul>
                <p className='method'>{recipe.method}</p>
            </>
        )}
    </div>
  )
}

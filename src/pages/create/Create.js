import { useState, useRef, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useHistory } from 'react-router-dom'
import './Create.css'

export default function Create() {
  const [ title, setTitle ] = useState('')
  const [ method, setMethod ] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredients, setNewIngredients] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingredientsInput = useRef(null)
  const history = useHistory()
  
  const { postData, data, error } = useFetch('http://localhost:3000/recipes', 'POST')

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + ' minutes'
    })
  }
  //Redirect to home screen after creation
  useEffect(() =>{
    if(data){
      history.push("/")
    }
  },[data, history])

  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredients.trim()

    if(ing && !ingredients.includes(ing)){
      setIngredients(prevIngredients => [...prevIngredients, ing])
    }
    ingredientsInput.current.focus()
    setNewIngredients('')
    
  }

  return (
    <div className='create'>
      <h2 className='page-title'>Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required/>
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className='ingredients'>
            <input
            type="text"
            value={newIngredients}
            onChange={(e) => setNewIngredients(e.target.value)}
            ref={ingredientsInput}/>
            <button onClick={handleAdd} className='btn'>Add</button>
          </div>
        </label>
        <p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

        <label>
          <span>Recipe Method:</span>
          <input
          type="text"
          onChange={(e) => setMethod(e.target.value)}
          value={method}
          required
          ></input>
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input
          type="number"
          onChange={(e) => setCookingTime(e.target.value)}
          value={cookingTime}
          required
          ></input>
        </label>

        <button className='btn'>Submit</button>
      </form>


    </div>
  )
}

import './Home.css'
//import { useFetch } from '../../hooks/useFetch'
import RecipeList from '../../components/RecipeList'
import { projectFirestore } from '../../firebase/config'
import { useEffect, useState } from 'react'

export default function Home() {
    //const { data, isPending, error } = useFetch('http://localhost:3000/recipes')

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)

    useEffect( ()=> {
      setIsPending(true)
      projectFirestore.collection('recipes').get().then((snapshot) => {
        if(snapshot.empty){
          setError("No recipes to load")
        } else {
          let results = []
          snapshot.docs.forEach( doc => {
            results.push({ id: doc.id, ...doc.data() })
          })
          setData(results)
        }
        setIsPending(false)
      }).catch(err => {
        setError(err.message)
        setIsPending(false)
      })
    }, [])
  return (
    <div className='home'>
        {error && <p className='error'>{error}</p>}
        {isPending && <p className='loading'>Loading data....</p>}
        {data && <RecipeList recipes={data}/>}
    </div>
  )
}

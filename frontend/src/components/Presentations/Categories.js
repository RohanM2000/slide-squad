import { useState } from "react";
import './Categories.css';
export default function Categories ({setStateCategories}) {
   const [categories,setCategories] = useState(['']);
    const handleKeyDown = (event)=>{
        
        if (event.key==='Enter'){
            event.preventDefault();
            setTimeout(()=>{
            setCategories(state=>{
                return [...state,'']})
            },0
            )
       
    }
}
    const handleChange  = (event)=>{
        console.log(event);
        event.preventDefault();
        // each input will have a data-type identifier to update the state
        const updatedState=[...categories];
        updatedState[event.target.dataset.type]=event.target.value
            setCategories(updatedState);
            setStateCategories(updatedState);
            // setStateCategories(state=>{
            //     return categories.join('#');
            // })
            console.log(categories);
        }
    
    const handleClick = ()=>{
        setCategories(state=>{
            return [...state,'']})
    }

    const handleRemove = (event) =>{
        console.log(event.target.dataset.type);
        let target = parseInt(event.target.dataset.type);
        let newState=categories.filter((c,index)=>index!==target);
        setCategories(newState);
    }
    console.log(categories);
   return (
    <>
    <h3>Categories</h3>
    <div className='category'>
    {categories.map((category,index)=>{
        return(
            <>
            <div key={index} data-type={index} className='category-container'>
                <button key={index} onClick={event=>handleRemove(event)} data-type={index} className='category-remove'>
                    <i key={index} data-type={index}  className="fa-solid fa-x"></i>
                </button>
                <div>
                <input
                    className='category-input'
                    placeholder={`category ${index+1}`}
                    data-type={index} 
                    value={categories[index]}
                    onChange={event=>handleChange(event)}
                    onKeyDown={event=>handleKeyDown(event)}
                >
                </input>
                </div>
            </div>
            </>
        )
    })}
        
    <div onClick={handleClick} className='add-category'></div>
    </div>
    </>
    
   )
}
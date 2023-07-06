import { useState } from "react";
import './Categories.css';
export default function Categories () {
   const [categories,setCategories] = useState(['']);
    const handleInput = (event)=>{
        if (event.key==='Enter'){
            event.preventDefault();
            setCategories(state=>{
                return [...state,'']})
            let sibling
        }
    }
    const handleChange  = (event)=>{
        console.log(event.key)
        // each input will have a data-type identifier to update the state
            setCategories[event.target.dataset.dataType] = event.target.value;
            // setStateCategories(state=>{
            //     return categories.join('#');
            // })
        }
    
    const handleClick = ()=>{
        setCategories(state=>{
            return [...state,'']})
    }

    const handleRemove = (event) =>{
        console.log(event.target.dataset.dataType);
        let target = event.target.dataset.dataType 
        let firstHalf = categories.slice(0,target);
        let secondHalf=categories.slice(target);
        setCategories(firstHalf.concat(secondHalf));
    }
   return (
    <>
    <div className='category'>
    {categories.map((category,index)=>{
        return(
            <>
            <div datatype={index} className='category-container'>
            <button onClick={event=>handleRemove(event)} datatype={index} className='category-remove'>
            <i datatype={index}  className="fa-solid fa-x"></i>
            </button>
            <div className-='category-text-container'>
                <span
                    contentEditable='true'
                    className='category-input' 
                    value={category}
                    onChange={(event)=>handleChange(event)}
                >{categories[index]}</span>
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
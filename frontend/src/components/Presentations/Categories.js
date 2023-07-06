import { useState } from "react";
import './Categories.css';
export default function Categories () {
   const [categories,setCategories] = useState(['']);
    const handleInput = (event)=>{
        console.log(event.key)
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
            setCategories[event.target.dataset.type] = event.target.value;
            // setStateCategories(state=>{
            //     return categories.join('#');
            // })
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
   return (
    <>
    <div className='category'>
    {categories.map((category,index)=>{
        return(
            <>
            <div key={index} data-type={index} className='category-container'>
            <button key={index} onClick={event=>handleRemove(event)} data-type={index} className='category-remove'>
            <i key={index} data-type={index}  className="fa-solid fa-x"></i>
            </button>
            <div key={index} className-='category-text-container'>
                <span
                    onInput={(event)=>handleInput(event)}
                    key={index}
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
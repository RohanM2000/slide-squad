export default function myDebounce (func,interval) {
    let stack = 0;
    return ((event)=>{
        stack+=1;
        setTimeout(()=>{
            stack-=1;
            if (stack===0){
                func(event);
            }
        },interval)
    })
}
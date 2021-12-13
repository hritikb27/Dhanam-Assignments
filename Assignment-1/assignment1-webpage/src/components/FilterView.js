import React, { useContext } from "react";
import {DateContext} from "./Context";

const FilterView = (props)=>{
    const {select, custom} = useContext(DateContext);
    const [selectValue, setSelectValue] = select;
    const [customDate, setCustomDate] = custom;
    

    const handleChange=(event)=>{
        setSelectValue(event.target.value)
        setCustomDate()
    }

    const handleCustomDate = (event)=>{
        setCustomDate(event.target.value)
        setSelectValue()
    }

    if(props.filter){
        return(
            <div>
                <form>
                    <select value={selectValue} onChange={handleChange}>
                        <option value="1" selected>Yesterday</option>
                        <option value="7" >Last Week</option>
                        <option value="30" >Last Month</option>
                    </select>
                    <input type="date" name="custom-date" value={customDate} onChange={handleCustomDate}/>
                </form>                
            </div>
        )
    }
    else{
        return(
            <div>
                
            </div>
        )
    }
}

export default FilterView
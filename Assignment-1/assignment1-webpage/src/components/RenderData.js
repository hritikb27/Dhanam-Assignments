import moment from "moment";
import React from "react";

const RenderData = ({england, scotland, ireland, date, customDate })=>{


    const filteredEngland = england.filter(event=>{
        return moment(event.date).format("YYYY-MM-DD")===customDate;
    })
    const filteredScotland = scotland.filter(event=>{
        return moment(event.date).format("YYYY-MM-DD")===customDate;
    })
    const filteredIreland = ireland.filter(event=>{
        return (date?moment(event.date).format("YYYY-MM-DD")===date : moment(event.date).format("YYYY-MM-DD")===customDate);
    })

    return(
        <div>
            {filteredEngland.map((event, index)=> <div><h1>England:</h1> <p>{index+1}. {event.title}</p></div>)}
            
            {filteredScotland.map((event, index)=> <div><h1>Scotland:</h1> <p>{index+1}. {event.title}</p></div>)}
            
            {filteredIreland.map((event, index)=> <div><h1>Ireland:</h1> <p>{index+1}. {event.title}</p></div>)}
        </div>
    )
}

export default RenderData
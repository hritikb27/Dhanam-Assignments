import React, {useContext, useEffect, useState } from "react";
import moment from "moment";
import { DateContext } from "./Context";
import RenderData from "./RenderData";

const ApiData = () => {
    const { select, custom } = useContext(DateContext);
	const [selectValue] = select;
	const [customDate] = custom;

	const [data, setData] = useState(null);

	useEffect(() => {
		const getData = () => {
            fetch("https://www.gov.uk/bank-holidays.json")
			.then((res) => res.json())
			.then((res) => setData(res))
			.catch((error) => console.log(error))
        };

        getData();

	}, []);

    const formatSelectDate = moment().subtract(`${selectValue}`, "days").format("YYYY-MM-DD");
	const formatCustomDate = moment(`${customDate}`).format("YYYY-MM-DD");

    console.log(formatSelectDate)

	return <div>
        {data && <RenderData scotland={data.scotland.events} england={data["england-and-wales"].events} ireland={data["northern-ireland"].events} date={formatSelectDate} customDate={formatCustomDate} />}
        </div>;
};

export default ApiData;

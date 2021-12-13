import { React, createContext, useState } from "react";

const DateContext = createContext();

const ContextProvider = (props) => {
	const [selectValue, setSelectValue] = useState("1");
	const [customDate, setCustomDate] = useState();

	return (
		<DateContext.Provider
			value={{
				select: [selectValue, setSelectValue],
				custom: [customDate, setCustomDate],
			}}
		>
			{props.children}
		</DateContext.Provider>
	);
};

export { DateContext, ContextProvider };

import React, { useState } from "react";
import ApiData from "./components/ApiData";
import { ContextProvider } from "./components/Context";
import FilterView from "./components/FilterView";

function App() {
	const [filterDrop, setFilterDrop] = useState(undefined);

	const changeFilterState = () => {
		setFilterDrop((prevState) => !prevState);
	};

	return (
		<div className="App">
			{<button onClick={changeFilterState}>Filter</button>}

			<ContextProvider>
				<FilterView filter={filterDrop} />
        <ApiData />
			</ContextProvider>
		</div>
	);
}

export default App;

import React from "react";

import donutData from "../data/donutData.json";

function ShowData() {
  console.log(donutData);
  return (
    <div>
      <h1>ShowData</h1>
      <pre>{JSON.stringify(donutData, null, 2)}</pre>
    </div>
  );
}

export default ShowData;

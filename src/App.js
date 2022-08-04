import React from "react";
import "./App.css";
import ProgessIndicator from "./components/ProgressIndicator/ProgessIndicator";
import TextField from "./components/TextField/TextField";
import { mockApiCall } from "./utils/requests";
import { isJSON } from "./utils/utils";

const steps = [
  {
    name: "Step 1",
    component: TextField,
  },
  {
    name: "Step 2",
    component: TextField,
  },
  {
    name: "Step 3",
    component: TextField,
  },
  {
    name: "Step 4",
    component: TextField,
  },
];
function App() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {}, [data]);
  console.log("thedata", data);

  const handlePromise = async () => {
    const success = (Math.floor(Math.random() * 2) + 1) % 2 === 0;
    try {
      const res = await mockApiCall(success);
      console.log("success", res);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="App">
      <div>HOMEPAGE</div>
      <ProgessIndicator steps={steps} setData={setData} validator={isJSON} />
      {/* <form> */}
      <input
        type="text"
        id="fname"
        name="fname"
        onChange={(e) => console.log(e.target.value)}
      ></input>
      <button onClick={handlePromise}>Submit</button>
      {/* </form> */}
    </div>
  );
}

export default App;

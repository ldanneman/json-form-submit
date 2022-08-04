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
];
function App() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {}, [data]);

  const handleApiCall = async () => {
    const success = (Math.floor(Math.random() * 2) + 1) % 2 === 0;
    try {
      const res = await mockApiCall(success);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="App">
      <ProgessIndicator
        steps={steps}
        data={data}
        setData={setData}
        validator={isJSON}
        onSubmit={handleApiCall}
      />
    </div>
  );
}

export default App;

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

  const handlePromise = async (data) => {
    const success = (Math.floor(Math.random() * 2) + 1) % 2 === 0;
    // const success2 = (Math.floor(Math.random() * 2) + 1) % 2 === 0;
    // const success3 = (Math.floor(Math.random() * 2) + 1) % 2 === 0;
    // const success = 1 + 1 === 2;
    // const success2 = 1 + 1 === 2;
    // const success3 = 1 + 1 === 2;
    // Promise.all([
    //   mockApiCall(success),
    //   mockApiCall(success2),
    //   mockApiCall(success3),
    // ])
    //   .then((responses) => {
    //     console.log("responses", responses);
    //   })
    //   .catch((error) => {
    //     console.log("error: ", error);
    //   });
    try {
      const res = await mockApiCall(success);
      console.log("success", res);
      return res;
    } catch (error) {
      console.log("error", error);
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
        onSubmit={handlePromise}
      />
    </div>
  );
}

export default App;

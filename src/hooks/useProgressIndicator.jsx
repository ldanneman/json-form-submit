import React from "react";
import ProgressIndicator from "../components/ProgressIndicator/ProgressIndicator";

function useProgressIndicator(steps) {
  const [data, setData] = React.useState([]);


  const onNext = () => {
    setData((prevData) => [...prevData, steps[data.length]]);
  }
  return (
    <div>
      <ProgressIndicator steps={steps} />
    </div>
  );
}

export default useProgressIndicator;

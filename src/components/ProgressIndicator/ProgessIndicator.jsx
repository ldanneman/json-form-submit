import React from "react";
import "./progressIndicator.css";
import Button from "../Button/Button";

function ProgessIndicator({ steps, data, setData, validator, onSubmit }) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [currentData, setCurrentData] = React.useState("");
  const [results, setResults] = React.useState([]);
  
  const Item = steps[currentStep]?.component || null;

  React.useEffect(() => {}, [results]);
  const onNext = () => {
    if (currentData.length === 0 || !validator(currentData)) {
      alert("Your submission is invalid");
      return;
    }
    setCurrentStep((prevStep) => prevStep + 1);
    setData((prevData) => [...prevData, { data: currentData }]);
    setCurrentData("");
  };

  const onBack = (e) => {
    setCurrentData("");
    setCurrentStep((prevStep) => prevStep - 1);
    setData((prevData) =>
      prevData.filter((_, index) => index !== prevData.length - 1)
    );
  };

  const handleSubmit = async () => {
    if (currentData.length === 0 || !validator(currentData)) {
      alert("Your submission is invalid");
      return;
    }
    for (let i = 0; i < data.length; i++) {
      const result = await onSubmit(data[i].data);
      setResults((prevResults) => [...prevResults, result]);
    }
    setCurrentStep(steps.length);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setResults([]);
    setData([]);
    setCurrentData("");
  };

  return (
    <>
      <div className="stepper-wrapper">
        {steps.map((step, i) => (
          <div
            className={
              currentStep === i
                ? "stepper-item active"
                : i < currentStep
                ? "stepper-item completed"
                : "stepper-item"
            }
          >
            <div className="step-counter">{i + 1}</div>
            <div className="step-name">{step.name}</div>
          </div>
        ))}
      </div>
      {currentStep !== steps.length && (
        <Item
          onChange={(e) => setCurrentData(e.target.value)}
          value={currentData}
        />
      )}

      {currentStep === steps.length && (
        <div className="results-wrapper">
          {results.map((result, i) => (
            <div>
              <div
                className="result"
                style={{
                  ...(result.message
                    ? { backgroundColor: "#4bb543" }
                    : { backgroundColor: "red" }),
                }}
              ></div>
              {result?.message ? <div>Completed</div> : <div>Failed</div>}
            </div>
          ))}
        </div>
      )}

      <div>
        {currentStep !== steps.length ? (
          <div>
            <div>
              {currentStep !== 0 && (
                <Button type="click" onClick={onBack}>
                  Back
                </Button>
              )}
              {currentStep === steps.length - 1 ? (
                <Button onClick={handleSubmit}>Submit</Button>
              ) : (
                <Button onClick={onNext}>Next</Button>
              )}
            </div>
          </div>
        ) : (
          <Button onClick={handleReset}>Reset</Button>
        )}
      </div>
    </>
  );
}

export default ProgessIndicator;

import React from "react";
import "./progressIndicator.css";
import Button from "../Button/Button";

function ProgessIndicator({ steps, data, setData, validator, onSubmit }) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [currentData, setCurrentData] = React.useState("{}");
  const [results, setResults] = React.useState([]);

  const Item = steps[currentStep]?.component || null;

  React.useLayoutEffect(() => {}, [results, setResults, data]);
  const onNext = async () => {
    if (currentData.length < 3 || !validator(currentData)) {
      alert("Your submission is invalid");
      return;
    }
    setCurrentStep((prevStep) => prevStep + 1);
    setData((prevData) => [...prevData, { data: currentData }]);
    setCurrentData("{}");
  };

  const onBack = (e) => {
    setCurrentData("{}");
    setCurrentStep((prevStep) => prevStep - 1);
    setData((prevData) =>
      prevData.filter((_, index) => index !== prevData.length - 1)
    );
  };
  const showresults = async () => {
    const resData = [...data, { data: currentData }];
    resData.forEach(async (item) => {
      const result = await onSubmit();
      setResults((prevResults) => [...prevResults, result]);
    });
  };
  const handleSubmit = async () => {
    if (currentData.length === 0 || !validator(currentData)) {
      alert("Your submission is invalid");
      return;
    }
    onNext();
    showresults();
    setCurrentStep(steps.length);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setResults([]);
    setData([]);
    setCurrentData("{}");
  };

  return (
    <div className="container">
      <div className="border">
        <div className="title">Upload Parts</div>
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
              <div className="results-container">
                <div
                  className="result"
                  style={{
                    ...(result.message
                      ? { backgroundColor: "#4bb543" }
                      : { backgroundColor: "red" }),
                  }}
                ></div>
                {result?.message ? (
                  <div>{`Part ${i + 1} success`}</div>
                ) : (
                  <div>{`Part ${i + 1} fail`}</div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="buttons-container">
          {currentStep !== steps.length ? (
            <div>
              <div>
                {currentStep !== 0 && (
                  <Button id="button-left" type="click" onClick={onBack}>
                    Back
                  </Button>
                )}
                {currentStep === steps.length - 1 ? (
                  <Button id="button-right" onClick={handleSubmit}>
                    Submit
                  </Button>
                ) : (
                  <Button id="button-right" onClick={onNext}>
                    Next
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <Button onClick={handleReset}>Reset</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgessIndicator;

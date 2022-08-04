import React from "react";
import "./progressIndicator.css";
import Button from "../Button/Button";

function ProgessIndicator({ steps, data, setData, validator }) {
  console.log(steps.length);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [currentData, setCurrentData] = React.useState("");
  // const [data, setData] = React.useState([]);
  const Item = steps[currentStep].component;

  const onNext = () => {
    if (currentData.length === 0 || !validator(currentData)) {
      alert("Your submission is invalid");
      return;
    }
    setCurrentStep((prevStep) => prevStep + 1);
    setData((prevData) => [...prevData, { data: currentData }]);
    setCurrentData("");
  };

  console.log("current step", currentStep);

  const onBack = (e) => {
    setCurrentData("");
    setCurrentStep((prevStep) => prevStep - 1);
    setData((prevData) =>
      prevData.filter((_, index) => index !== prevData.length - 1)
    );
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
      <Item
        onChange={(e) => setCurrentData(e.target.value)}
        value={currentData}
      />

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
                <Button onClick={setCurrentStep(steps.length)}>Submit</Button>
              ) : (
                <Button onClick={onNext}>Next</Button>
              )}
            </div>
          </div>
        ) : (
          <Button onClick={() => setCurrentStep(0)}>Reset</Button>
        )}
      </div>
    </>
  );
}

export default ProgessIndicator;

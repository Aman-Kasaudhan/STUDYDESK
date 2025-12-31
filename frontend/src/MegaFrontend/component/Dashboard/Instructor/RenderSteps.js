import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseData from "./CourseData";
import BuilderForm from "./BuilderForm";
import PublishForm from "./PublishForm";
import "./RenderStep.css";

const steps = [
  { id: 1, title: "Course Information" },
  { id: 2, title: "Course Builder" },
  { id: 3, title: "Publish" },
];

function RenderSteps() {
  const { step } = useSelector((state) => state.course);

  return (
    <div>
      {/* <button>s</button> */}
    <div className="stepper-container">
      {/* Step circles */}
      <div className="steps-container">
        {steps.map((item, index) => {
          const stateClass =
            step === item.id
              ? "step-active"
              : step > item.id
              ? "step-completed"
              : "step-future";

          return (
            <div key={item.id} className="flex items-center gap-2">
              <div className={`step-circle ${stateClass}`}>
                {step > item.id ? <FaCheck /> : item.id}
              </div>
              {index !== steps.length - 1 && <div className="step-line" />}
            </div>
          );
        })}
      </div>

      {/* Titles */}
      <div className="step-titles">
        {steps.map((item) => (
          <p
            key={item.id}
            className={`step-title ${
              step === item.id ? "step-title-active" : ""
            }`}
          >
            {item.title}
          </p>
        ))}
      </div>

      {/* Step content */}
    
    </div> 
     <div>
        {step === 1 && <CourseData />}
        {step === 2 && <BuilderForm />}
        {step === 3 && <PublishForm />}
      </div>
    </div>
  );
}

export default RenderSteps;

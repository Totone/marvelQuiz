import React, {useState, useEffect} from 'react';
import Stepper from 'react-stepper-horizontal';

const Levels = ({
  levelNames,
  currentLevel
}) => {
  const [steps, setSteps] = useState([]);
  console.log("Levels", levelNames, currentLevel, steps);
  
  useEffect(() => {
    const output = levelNames.map(level => ({title: level.toUpperCase()}));
    setSteps(output);
  }, [levelNames]);  

  return (
    <section className="levelsContainer" style={{background: "transparent"}}>
        <Stepper 
          steps={steps}
          activeStep={currentLevel}
          circleTop={0}
          activeTitleColor={"#d31017"}
          activeColor={"#d31017"}
          completeTitleColor={"#E0E0E0"}
          defaultTitleColor={"#E0E0E0"}
          completeColor={"#E0E0E0"}
          size={45}
        />
    </section>
  );
}

export default React.memo(Levels);


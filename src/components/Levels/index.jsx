import React, {useState, useEffect} from 'react';
import Stepper from './Stepper';
import style from './style';
const Levels = ({
  levelNames,
  currentLevel
}) => {
  const [steps, setSteps] = useState([]);
  
  useEffect(
    () => {
      const output = levelNames.map(
        level => ({title: level.toUpperCase()})
      );
      setSteps(output);
    }, [levelNames]
  );  

  return (
    <section className="levelsContainer" style={style.levels}>
      <Stepper stepsList={steps} activeStep={currentLevel}/>
    </section>
  );
}

export default React.memo(Levels);


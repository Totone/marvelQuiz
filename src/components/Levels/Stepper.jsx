import React from 'react';
import StepperHorizontal from 'react-stepper-horizontal';
import style from './style';

const Stepper = ({
  stepsList,
  activeStep
}) => {
  const {
    circleTop,
    activeTitleColor,
    activeColor,
    completeTitleColor,
    defaultTitleColor,
    completeColor,
    size
  } = style.stepper;
  return (
    <React.Fragment>
      <StepperHorizontal 
        steps={stepsList}
        activeStep={activeStep}
        circleTop={circleTop}
        activeTitleColor={activeTitleColor}
        activeColor={activeColor}
        completeTitleColor={completeTitleColor}
        defaultTitleColor={defaultTitleColor}
        completeColor={completeColor}
        size={size}
      />
    </React.Fragment>
  );
};

export default React.memo(Stepper);

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
  );
};

export default React.memo(Stepper);

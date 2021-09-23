import React, { FC } from 'react';
import { VscLoading } from 'react-icons/vsc';
import { FaCheck } from 'react-icons/fa';

interface ButtonWithAnimationProps {
  animationClassName: string;
  onTransitionEnd?: Function;
  transitionEndClass?: string;
}

const ButtonWithAnimation: FC<ButtonWithAnimationProps> = ({
  animationClassName,
  onTransitionEnd,
  transitionEndClass = 'btn btn--loader finished',
}) => {
  return (
    <button
      className={animationClassName}
      onTransitionEnd={() => onTransitionEnd?.(transitionEndClass)}
      type="button"
    >
      <span className="submit"></span>
      <span className="loading">
        <VscLoading className="icon color-white verySmall-icon" />
      </span>
      <span className="check">
        <FaCheck className="icon color-white verySmall-icon" />
      </span>
    </button>
  );
};

export default ButtonWithAnimation;

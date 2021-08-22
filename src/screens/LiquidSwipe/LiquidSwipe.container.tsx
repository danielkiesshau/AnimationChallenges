import React, { useState } from 'react';

import slides from '@screens/LiquidSwipe/modules/mocks/slides';

import SlideNative from './Slide/Slide.native';
import SliderAnimated from './Slider/Slider.animated';
import { Platform } from 'react-native';

const LiquidSwipe: React.FC<{}> = () => {
  const [index, setIndex] = useState(2);
  const [curr, setCurrentIndex] = useState(index);
  const [isTransition, setTransition] = useState(false);
  const [transitionI, setTransitionIndex] = useState(-1);

  const toggleIndex = (num: number): void => {
    setTransition(true);
    setIndex(num);
    setTransition(false);
  };

  const previous = slides[index - 1];
  const current = slides[curr];
  const next = slides[index + 1];
  const transition = slides[transitionI];

  return (
    <SliderAnimated
      key={Platform.OS === 'android' ? index : null}
      current={<SlideNative slide={current} />}
      previous={previous && <SlideNative slide={previous} />}
      next={next && <SlideNative slide={next} />}
      transition={
        transition && (
          <SlideNative
            slide={transition}
            style={{ zIndex: isTransition ? 99 : 0 }}
          />
        )
      }
      index={index}
      setIndex={toggleIndex}
      setCurrIndex={setCurrentIndex}
      setTransitionIndex={setTransitionIndex}
    />
  );
};

export default LiquidSwipe;

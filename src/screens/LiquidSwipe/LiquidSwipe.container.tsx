import React, { useState } from 'react';

import slides from '@screens/LiquidSwipe/modules/mocks/slides';

import SlideNative from './Slide/Slide.native';
import SliderAnimated from './Slider/Slider.animated';

const LiquidSwipe: React.FC<{}> = () => {
  const [index, setIndex] = useState(2);
  const [curr, setCurrentIndex] = useState(index);

  const toggleIndex = (num: number): void => {
    setTimeout(() => {
      setIndex(num);
    }, 500);
  };

  const previous = slides[index - 1];
  const current = slides[curr];
  const next = slides[index + 1];

  return (
    <SliderAnimated
      current={<SlideNative slide={current} />}
      previous={previous && <SlideNative slide={previous} />}
      next={next && <SlideNative slide={next} />}
      index={index}
      setIndex={toggleIndex}
      setCurrIndex={setCurrentIndex}
    />
  );
};

export default LiquidSwipe;

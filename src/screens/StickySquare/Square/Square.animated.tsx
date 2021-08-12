import React from 'react';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import {
  addCurve,
  addLine,
  createPath,
  mix,
  serialize,
} from 'react-native-redash';
import Svg, { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const SQUARE_SIZE = 150;
const H_FACTOR = 0.35;
const V_FACTOR = 2.5;
export const MAX_HEIGHT = SQUARE_SIZE * V_FACTOR;

interface SquareProps {
  progress: Animated.SharedValue<number>;
}

const Square: React.FC<SquareProps> = ({ progress }) => {
  const animatedProps = useAnimatedProps(() => {
    const distortion = {
      x: mix(progress.value, 0, SQUARE_SIZE * H_FACTOR),
      y: mix(progress.value, 1, V_FACTOR),
    };

    const p1 = { x: 0, y: 0 };
    const p2 = { x: SQUARE_SIZE, y: 0 };
    const p3 = {
      x: SQUARE_SIZE - distortion.x,
      y: SQUARE_SIZE * distortion.y,
    };
    const p4 = { x: distortion.x, y: SQUARE_SIZE * distortion.y };

    const path = createPath(p1);
    addLine(path, p2);
    addCurve(path, {
      c1: { x: p2.x, y: 0 },
      c2: { x: p3.x, y: 0 },
      to: p3,
    });
    addLine(path, p4);
    addCurve(path, {
      c1: { x: p4.x, y: 0 },
      c2: { x: p1.x, y: 0 },
      to: p1,
    });

    return {
      d: serialize(path),
      fill: '#7EDAB9',
    };
  });

  return (
    <Svg>
      <AnimatedPath animatedProps={animatedProps} />
    </Svg>
  );
};

export default Square;

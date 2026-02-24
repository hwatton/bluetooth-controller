import { useRef, useState } from "react";
import { Animated, PanResponder, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

type Coord = { x: number; y: number };

export default function TabTwoScreen() {
  //const [gS, setGs] = useState<PanResponderGestureState | null>(null);
  const pan = useRef(new Animated.ValueXY()).current;

  const [xY, setXy] = useState({ x: 0, y: 0 });
  const [coordList, setCoordList] = useState<Coord[]>([]);
  const [dragComplete, setDragComplete] = useState(false);

  pan.addListener(({ x, y }) => {
    //setXy({ x: x, y: y });
    setCoordList((prev) => [...prev, ...[{ x: x, y: y }]]);
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      setDragComplete(false);
      setCoordList([]);

      // The gesture has started. Show visual feedback so the user knows
      // what is happening!
      // gestureState.d{x,y} will be set to zero now
    },
    onPanResponderMove: (event, gestureState) => {
      //   setGs(gestureState);
      return Animated.event([null, { moveX: pan.x, moveY: pan.y }])(
        event,
        gestureState,
      );
    },
    onPanResponderRelease: (evt, gestureState) => {
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
      setDragComplete(true);
    },
  });
  return (
    <Animated.View {...panResponder.panHandlers} style={styles.touchContainer}>
      {pan && (
        <Svg>
          {/* {xy.map((el, i) => {
          return (
            <Circle
              key={`${el.x}_${el.y}_${i}_circle`}
              cx={el.x}
              cy={el.y}
              r={1}
              fill={"red"}
            />
          );
        })} */}
          {/* <Circle cx={xY.x} cy={xY.y} r={10} fill={"red"} /> */}
          {dragComplete &&
            coordList.map((el, i) => {
              return (
                <Circle
                  key={`${el.x}_${el.y}_${i}_circle`}
                  cx={el.x}
                  cy={el.y}
                  r={2}
                  fill={"red"}
                />
              );
            })}
        </Svg>
      )}
      {/* {xy.map((el, i) => {
        return <Text key={`${el.x}_${el.y}_${i}`}>{`${el.x} ${el.y}`}</Text>;
      })} */}
      {/* {gS && (
        <>
          <Text>{`x0: ${gS.x0} ${gS.y0}`}</Text>
          <Text>{`moveX: ${gS.moveX} ${gS.moveX}`}</Text>
          <Text>{`dx: ${gS.dx} ${gS.dy}`}</Text>
        </>
      )} */}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  touchContainer: {
    flex: 1,
    backgroundColor: "magenta",
  },
});

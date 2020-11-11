import * as React from 'react';
import {
    Easing,
    TextInput,
    Animated,
    Text,
    View,
    StyleSheet,
} from 'react-native';
// import Constants from 'expo-constants';
import Svg, { G, Circle, Rect } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function Donut({
                                  percentage = 30,
                                  radius = 35,
                                  strokeWidth = 8,
                                  duration = 1000,
                                  // color = "#8b0401",
                                  color = "#8b0401",
                                  delay = 0.2,
                                  textColor,
                                  max = 40,
                                  type = "Аттестационная ведомость (баллы)",
                              }) {

    const fixText = percentage
    percentage = Number(percentage)
    const isNum = !isNaN(percentage)

    if (fixText === "Зач") {
        percentage = 40
    } else if (!isNum) {
        percentage = 0
    }

    if (type === "Экзаменационная ведомость") {
        max = 5
    }

    const animated = React.useRef(new Animated.Value(0)).current;
    const circleRef = React.useRef();
    const inputRef = React.useRef();
    const circumference = 2 * Math.PI * radius;
    const halfCircle = radius + strokeWidth;

    const animation = (toValue) => {
        return Animated.timing(animated, {
            delay: 1000,
            toValue,
            duration,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
        }).start();
        // }).start(() => {
        //     animation(toValue === 0 ? percentage : 0);
        // });
    };

    React.useEffect(() => {
        animation(percentage);

        animated.addListener((v) => {
            const maxPerc = 100 * v.value / max;
            const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
            if (inputRef?.current) {
                if (isNum) {
                    inputRef.current.setNativeProps({
                        text: `${Math.round(v.value)}`,
                    });
                } else {
                    inputRef.current.setNativeProps({
                        // text: `${Math.round(v.value)}`,
                        text: fixText,
                    });
                }

            }
            if (circleRef?.current) {
                circleRef.current.setNativeProps({
                    strokeDashoffset,
                });
            }
        }, [max, percentage]);

        return () => {
            animated.removeAllListeners();
        };
    });

    return (
        <View style={{ width: radius * 2, height: radius * 2 }}>
            <Svg
                height={radius * 2}
                width={radius * 2}
                viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
                <G
                    rotation="-90"
                    origin={`${halfCircle}, ${halfCircle}`}>
                    <Circle
                        ref={circleRef}
                        cx="50%"
                        cy="50%"
                        r={radius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDashoffset={circumference}
                        strokeDasharray={circumference}
                    />
                    <Circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeLinejoin="round"
                        strokeOpacity=".1"
                    />
                </G>
            </Svg>
            <AnimatedTextInput
                ref={inputRef}
                underlineColorAndroid="transparent"
                editable={false}
                defaultValue="0"
                style={[
                    StyleSheet.absoluteFillObject,
                    { fontSize: radius / 2, color: textColor ?? color },
                    styles.text,
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    text: { fontWeight: 'bold', textAlign: 'center' },
});

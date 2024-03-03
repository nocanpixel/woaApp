import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import Ionicons from '@expo/vector-icons/Ionicons';
import useColorChoosen from "../store/useColorsChoosen";

export const MyTabBar = ({ state, descriptors, navigation }) => {
    const { colors } = useColorChoosen();
    return (
        <View style={[styles.myTabBar, {backgroundColor:colors[1]}]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.barItems}
                    >
                        <View>
                            <Ionicons name={label.toLowerCase() + '-outline'} size={25} color={isFocused ? colors[0] : '#9ba1a6'} />
                        </View>
                        <Text style={{ color: isFocused ? colors[0] : '#9ba1a6', marginTop: 2, fontSize: 12 }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}
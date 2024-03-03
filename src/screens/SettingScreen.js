import { StyleSheet, View, Modal, Platform, Button } from "react-native";
import { ButtonGo, ModalContainer, SettingsColor, SettingsContainer, SettingsOptions, SettingsText, SettingsTitle } from "../styles";
import { TouchableOpacity } from "react-native";
import { Divider, Portal, Text } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useEffect, useState } from "react";
import ColorPicker, { BlueSlider, BrightnessSlider, GreenSlider, HueSlider, LuminanceCircular, OpacitySlider, Panel1, Panel3, Preview, RedSlider, Swatches, colorKit } from "reanimated-color-picker";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import useColorChoosen from "../store/useColorsChoosen";



const options = [
    { name: "Title", value: 'primary', color:'' },
    { name: "Background", value: 'secondary', color: '' },
    { name: "Card", value: 'tertiary', color: ''},
    { name: "Text", value: 'quaternary', color: ''},
]

export const SettingScreen = () => {
    const [modalVisibilities, setModalVisibilities] = useState(options.map(() => false));
    const { colors, updateColor } = useColorChoosen();
    const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());
    const selectedColor = useSharedValue(customSwatches[0]);

    const toggleModal = (index) => {
        const newVisibilities = [...modalVisibilities];
        newVisibilities[index] = !newVisibilities[index];
        setModalVisibilities(newVisibilities);
    };

    const onColorSelect = (color) => {
        'worklet';
        console.log(color)
        selectedColor.value = color.hex;
    };

    const handleColor = (index) => {
        toggleModal(index)
        updateColor(index,selectedColor.value)
    }


    return (
        <View style={[styles.container, {backgroundColor:colors[1]}]}>
            <View>
                <SettingsTitle color={colors[0]}>{'Colour preferences'}</SettingsTitle>
            </View>
            <SettingsContainer color={colors[0]} >
                {options.map((option, index) => (
                    <View key={index}>
                        <View>
                            <TouchableOpacity onPress={() => toggleModal(index)} key={index}>
                                <SettingsOptions style={{ padding: 8 }}>
                                    <SettingsText color={colors[0]} key={index} >{option.name}</SettingsText>
                                    <SettingsColor index={index} color={colors} />
                                </SettingsOptions>
                                <Divider style={{ display: index !== options.length - 1 ? 'block' : 'none' }} />
                            </TouchableOpacity>
                        </View>
                        <Modal
                            onRequestClose={() => toggleModal(index)}
                            visible={modalVisibilities[index]}
                            transparent={true}
                            animationType='slide'>
                            <TouchableOpacity
                                onPress={() => toggleModal(index)}
                                style={{
                                    height: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0)',
                                    alignItems: 'center',
                                    zIndex:9,
                                }}>
                            </TouchableOpacity>
                            <View style={styles.modalContainer}>
                                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 14 }}>
                                    <ColorPicker
                                        value={colors[index]}
                                        sliderThickness={30}
                                        thumbSize={30}
                                        thumbShape='circle'
                                        onChange={onColorSelect}
                                        thumbAnimationDuration={100}
                                        adaptSpectrum
                                        boundedThumb
                                        style={styles.colorPicker}
                                    >
                                        <Preview/>
                                        <View>
                                            <Text style={{fontWeight:'bold'}}>{`${option.name} colour`}</Text>
                                        </View>
                                        <View style={styles.barsContainer}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={styles.sliderTitle}>R</Text>
                                                <RedSlider style={styles.sliderStyle} vertical reverse />
                                            </View>
                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={styles.sliderTitle}>G</Text>
                                                <GreenSlider style={styles.sliderStyle} vertical reverse />
                                            </View>

                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={styles.sliderTitle}>B</Text>
                                                <BlueSlider style={styles.sliderStyle} vertical reverse />
                                            </View>
                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={styles.sliderTitle}>
                                                    <Ionicons name="sunny-outline" size={19} />
                                                </Text>
                                                <BrightnessSlider style={styles.sliderStyle} vertical reverse />
                                            </View>
                                        </View>
                                        <View>
                                            <Swatches style={styles.swatchesContainer} swatchStyle={styles.swatchStyle} colors={customSwatches} />
                                        </View>
                                        <View>
                                        <ButtonGo onPress={()=> handleColor(index)}>
                                            <Text style={{fontSize:18,fontWeight:'500',letterSpacing:1,color:'white'}}>Select color</Text>
                                            <Ionicons name="color-wand-outline" size={26} color={'white'} style={{transform:[{rotate:'90deg'}]}} />
                                        </ButtonGo>
                                        </View>
                                    </ColorPicker>
                                </View>
                            </View>

                        </Modal>
                    </View>
                ))}
            </SettingsContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 12,
        paddingRight: 12,
        position: 'relative',
        paddingTop: 65,
    },
    modalContainer: {
        height: '62%',
        marginTop: 'auto',
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        zIndex:10,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
        }),
    },
    colorPicker: {
        alignItems: 'center',
        gap: 20,
        position: 'relative'
    },
    sliderTitle: {
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 5,
        paddingHorizontal: 4,
    },
    sliderStyle: {
        height: 200,
        borderRadius: 20,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    barsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
    },
    colorPreviewContainer:{
        position: 'absolute',
        right: 0,
        top:20,
    },
    colorPreview: {
        width: 50,
        height: 50,
        borderRadius:100,
    },

});
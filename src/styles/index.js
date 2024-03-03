import { StyleSheet } from "react-native";
import { styled } from 'styled-components/native';

export const SettingsContainer = styled.View`
    border: 1px solid ${props => props.color};
    padding-top: 8px;
    padding-left: 12px;
    padding-bottom: 8px;
    border-radius: 10px;
    margin-top: 4%;
`

export const SettingsOptions = styled.View`
    padding: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const SettingsText = styled.Text`
    font-size: 17px;
    font-weight: 500;
    color: ${props=>props.color}
`

export const SettingsColor = styled.View`
    border: 1px solid ${props=>props.color[0]};
    width: 20px;
    height: 20px;
    background-color: ${props=>props.color[props.index]};
    border-radius: 10px;
`

export const SettingsTitle = styled.Text`
    font-size: 25px;
    margin-top: 10%;
    padding-left: 8px;
    font-weight: bold;
    color: ${props=>props.color};
`

export const ButtonGo = styled.TouchableOpacity`
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    background-color: black;
`

export const styles = StyleSheet.create({
    myTabBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: 88,
        paddingBottom:32,
    },
    barItems: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})
import { Image, StyleSheet, Text, View } from "react-native";
import CircularProgress from 'react-native-circular-progress-indicator';
import { database } from '../model/database';
import { useEffect, useState } from "react";
import moment from "moment";
import { Q } from "@nozbe/watermelondb";
import { Dimensions } from "react-native";
import useColorChoosen from "../store/useColorsChoosen";

const dataWeek = [
    { day: 'M', value: 'monday', completed: '' },
    { day: 'T', value: 'tuesday', completed: '' },
    { day: 'W', value: 'wednesday', completed: '' },
    { day: 'T', value: 'thursday', completed: '' },
    { day: 'F', value: 'friday', completed: '' },
    { day: 'S', value: 'saturday', completed: '' },
    { day: 'S', value: 'sunday', completed: '' }
]

export const WeekendProgress = ({ currentDate, flag }) => {
    const [total, setTotal] = useState([]);
    const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('isoWeek'));
    const [daysOfWeek, setDaysOfWeek] = useState(dataWeek);
    const {colors} = useColorChoosen();

    const fetchRows = async () => {
        const mondayDate = currentWeekStart;
        const sundayDate = moment(currentWeekStart).endOf('isoWeek');
        const datesInRange = [];
        const currentDate = mondayDate.clone();

        while (currentDate.isSameOrBefore(sundayDate, 'day')) {
            datesInRange.push(currentDate.format('YYYY-MM-DD'));
            currentDate.add(1, 'day');
        }

        const allCups = await database.get('cups').query(
            Q.where('date', Q.oneOf(datesInRange))
        ).fetch();

        if (allCups.length > 0) {
            setTotal(allCups);
        } else {
            setTotal([]);
        }
    }

    useEffect(() => {
        fetchRows();
    }, [currentWeekStart, flag])

    // Update currentWeekStart if currentDate changes
    useEffect(() => {
        setCurrentWeekStart(moment(currentDate).startOf('isoWeek'));
    }, [currentDate]);

    useEffect(() => {
        const updatedDaysOfWeek = daysOfWeek.map((day, index) => {
            const found = total.find(el => moment(el.date).format('dddd').toLowerCase() === day.value);
            if (found && found.total === 8) {
                return { ...day, completed: true };
            } else {
                return { ...day, completed: false }; // Make sure to handle the case when the day is not found or total is not 8
            }
        });
        setDaysOfWeek(updatedDaysOfWeek);
    }, [total])


    return (
        <View style={styles.container}>
            <View style={[styles.dayTrend, {backgroundColor:colors[2]}]}>
                {daysOfWeek.map((day, index) => (
                    <View key={index} style={{ width: 40, alignItems: 'center' }}>
                        {day.completed ? (
                            <View>
                                 <Image resizeMode="contain" style={{height:40,width:40}} source={require('../../assets/water.png')} />
                            </View>
                        ) : (

                            <CircularProgress
                                value={total.find(el =>
                                    moment(el.date).format('dddd').toLowerCase() === day.value
                                )?.total || 0}
                                maxValue={8}
                                activeStrokeColor={colors[0]}
                                progressValueColor={colors[3]}
                                // inActiveStrokeColor={colors[4]}
                                radius={20} // Adjust the radius to change the size
                            />
                        )}
                        <Text style={{ fontSize: 10, fontWeight: 'bold', marginTop: 2, color: colors[3] }}>{day.day}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    dayTrend: {
        height: 90,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
})
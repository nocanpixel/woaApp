import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import moment from 'moment';
import { useEffect, useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Checkbox, RadioButton } from 'react-native-paper';
import { database } from '../model/database';
import { useForm, Controller } from "react-hook-form"
import { Q } from '@nozbe/watermelondb'
import { checkboxes, defaultValues } from "../utils/data";
import { WeekendProgress } from "../components/WeekendProgress";
import useColorChoosen from "../store/useColorsChoosen";


export const HomeScreen = () => {
    const [currentDate, setCurrentDate] = useState(moment());
    const { control, handleSubmit, setValue, getValues } = useForm();
    const [total, setTotal] = useState(0);
    const [flag, setFlag] = useState(false);
    const {colors} = useColorChoosen();

    const formattedDate = currentDate.format('dddd Do MMMM'); // Format the date as desired
    const todayFormattedDate = moment().format('dddd Do MMMM');
    const isToday = formattedDate === todayFormattedDate;

    const fetchRows = async () => {
        const date = currentDate.format('YYYY-MM-DD');
        const allCups = await database.get('cups').query(Q.where('date', date)).fetch();
        const totalupdate = allCups.map(ele => ele.total);
        if (allCups.length > 0) {
            setTotal(totalupdate);
            allCups.map((val) => {
                Object.entries(val._raw).forEach(([key, value]) => {
                    setValue(key, value)
                })
            })
        } else {
            // Clear all form field values
            setTotal(0);
            Object.keys(defaultValues).forEach(key => {
                setValue(key, ''); // You can set it to null if you prefer
            });
        }
    }

    const createOrUpdate = async (data) => {
        await database.write(async () => {
            const existingCup = await database.get('cups').query(Q.where('date', data.date)).fetch();

            if (existingCup.length > 0) {
                setFlag(prev => !prev);
                const cupToUpdate = existingCup[0];
                await cupToUpdate.update(record => {
                    record.glass1 = data.glass1;
                    record.glass2 = data.glass2;
                    record.glass3 = data.glass3;
                    record.glass4 = data.glass4;
                    record.glass5 = data.glass5;
                    record.glass6 = data.glass6;
                    record.glass7 = data.glass7;
                    record.glass8 = data.glass8;
                    record.total = data.total;
                });
            } else {
                setFlag(prev => !prev);
                await database.get('cups').create(cup => {
                    cup.date = data.date;
                    cup.glass1 = data.glass1;
                    cup.glass2 = data.glass2;
                    cup.glass3 = data.glass3;
                    cup.glass4 = data.glass4;
                    cup.glass5 = data.glass5;
                    cup.glass6 = data.glass6;
                    cup.glass7 = data.glass7;
                    cup.glass8 = data.glass8;
                    cup.total = data.total;
                });
            }
        })
    }

    const onSubmit = (data) => {
        createOrUpdate(data);
    };

    const sendData = () => {
        handleSubmit(onSubmit)();
    }

    const handleCheckboxChange = (name) => {
        const date = currentDate.format('YYYY-MM-DD');
        setValue('date', date);
        const trueValues = Object.entries(getValues()).filter(([key, value]) => value === true);
        setTotal(trueValues.length);
        setValue('total', trueValues.length);
        setFlag(prev => !prev);
    };

    const deleteRecord = async () => {
        await database.write(async () => {
            database.unsafeResetDatabase();
        });
    }


    const goToNextDate = () => {
        setFlag(prev => !prev);
        setCurrentDate(currentDate.clone().add(1, 'day'));
    };

    const goToPreviousDate = () => {
        setFlag(prev => !prev);
        setCurrentDate(currentDate.clone().subtract(1, 'day'));
    };

    useEffect(() => {
        //deleteRecord();
        fetchRows();
    }, [currentDate])

    useEffect(() => {
        if (flag) {
            sendData()
        }
    }, [flag])

    return (
        <View style={[styles.container, {backgroundColor:colors[1]}]}>
            <View style={styles.header}>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity title="Previous" onPress={goToPreviousDate} >
                        <Ionicons name="chevron-back" size={25} color={colors[0]} />
                    </TouchableOpacity>
                    <TouchableOpacity title="Next" onPress={goToNextDate}>
                        <Ionicons name="chevron-forward" size={25} color={colors[0]} />
                    </TouchableOpacity>
                </View>
                <View style={isToday ? [styles.headerBadge,{color:colors[0],borderColor:colors[0]}] : styles.headerBadgeHidden}>
                    <Text style={{color:colors[0]}}>{'Today'}</Text>
                </View>
                <Text style={[styles.headerText, {color:colors[0]}]}>{formattedDate}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title,{color:colors[0]}]}>{'Current cups'}</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        {/* <Image resizeMode="contain" style={{width: windowWidth * 0.1,height:windowHeight*0.1,aspectRatio: 1}} source={require('../../assets/water.png')} /> */}
                        <Text style={[styles.amount, {color:colors[0]}]}>{total}</Text>
                    </View>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ maxHeight: '100%' }}
                >
                    {checkboxes.map((checkbox, index) => (
                        <Controller
                            key={index}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        onChange(!value);
                                        handleCheckboxChange();
                                    }}
                                >
                                    <View style={[styles.checkboxStyles, {backgroundColor:colors[2]}]}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                            {value ? (
                                                <Ionicons name="water" size={20} color={colors[0]} />
                                            ):(
                                                <Ionicons name="water-outline" size={20} color={colors[0]} />
                                            )}
                                            <View>
                                                <Text style={{ fontSize: 16, color: colors[3] }}>{checkbox.time}</Text>
                                            </View>
                                        </View>
                                        <Checkbox.Item
                                            status={value ? 'checked' : 'unchecked'}
                                            color={colors[3]}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )}
                            name={checkbox.value}
                            defaultValue={false}
                        />
                    ))}
                </ScrollView>
            </View>
            <WeekendProgress currentDate={currentDate} flag={flag} />
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
    header: {
        minHeight: 55,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: 16,

    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 2,
    },


    buttonsContainer: {
        width: '90%',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 0,
    },


    headerBadge: {
        borderWidth: 1,
        padding: 1,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 4,
        top: 0,
        position: 'absolute',
    },
    headerBadgeHidden: {
        opacity: 0,
        position: 'absolute',
    },

    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },

    amount: {
        fontSize: 25,
        fontWeight: 'bold',
        width: 16,
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },

    checkboxStyles: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 6,
        marginBottom: 16,
        paddingLeft:15,
    },

    body: {
        maxHeight: '62%',
    }
});
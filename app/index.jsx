import { Button, FlatList, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import GoalItem from '../components/GoalItem';
import GoalInput from '../components/GoalInput';

const Index = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [courseGoals, setCourseGoals] = useState([]);
    
    function startAddGoalHandler(){
        setModalVisible(true);
    }

    function endAddGoalHandler(){
        setModalVisible(false);
    }

    function addGoalHandler(enteredGoalText) {
        setCourseGoals((currentCourseGoals) => [...currentCourseGoals, {text: enteredGoalText, id: Math.random().toString()}]);
        endAddGoalHandler();
    };

    function deleteGoalHandler(id){
        setCourseGoals((currentCourseGoals) => {
            return currentCourseGoals.filter((goal) => goal.id !== id);
        });
    }
    
    return(
        <>
            <StatusBar style='light'/>
            <View style={styles.appContainer}>
                <Button title='Add New Goal' color="#a065ec" onPress={startAddGoalHandler}/>
                <GoalInput visible={modalVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler}/>
                <View style={styles.goalsContainer}>
                    <FlatList 
                        data={courseGoals} 
                        renderItem={(itemData) => { 
                            return <GoalItem text={itemData.item.text} id={itemData.item.id} onDeleteItem={deleteGoalHandler}/>
                        }}
                        keyExtractor={(item, index) => {
                            return item.id;
                        }} 
                        alwaysBounceVertical={false}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </>
    )
}

export default Index;

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
        backgroundColor: '#1e085a',
    },
    goalsContainer: {
        flex: 5,
    },
})
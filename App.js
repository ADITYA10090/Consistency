import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Alert,Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StreakTracker from './Task.js';
import FlatButton from './FlatButton.js';
const TASKS_KEY = '@tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = await AsyncStorage.getItem(TASKS_KEY);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    };
    loadTasks();
  }, []);

  const saveTasks = async (tasks) => {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  };

  const addTask = () => {
    if (newTaskName.trim() === '') {
      Alert.alert('Error', 'Task name cannot be empty.');
      return;
    }

    const newTask = { id: Date.now().toString(), name: newTaskName };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setNewTaskName('');
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text></Text>
      <Text style={styles.header}>STREAK TRACKER</Text>

      {tasks.map(task => (
        <View key={task.id} style={styles.taskContainer}>
          <StreakTracker taskName={task.name} />
          <Text></Text>
          <FlatButton text="Delete" c="#7FB069" onPress={() => deleteTask(task.id)} />
        </View>
      ))}

      <TextInput
        style={styles.input}
        placeholder="New Task"
        value={newTaskName}
        onChangeText={setNewTaskName}
      />
      {/* <Button title="Add Task" onPress={addTask} /> */}
      <FlatButton text="Add Task" c="#E6AA68" onPress={addTask} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    color:'#774C60',
    // fontFamily:'sans-sarif',
  },
  taskContainer: {
    width: '100%',
    marginBottom: 18,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius:9,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    width: '75%',
    textAlign:'center',
    fontSize:16,
    fontWeight:'bold',
  },
});

export default App;

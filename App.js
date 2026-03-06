import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import Task from "./Components/Task";
import Color from "./Constants/Color";
import { useState } from "react";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    setTaskItems([...taskItems, task]); // ...taskItems means all the previous tasks
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems]; // copy the taskItems
    itemsCopy.splice(index, 1); // remove the task from the array
    setTaskItems(itemsCopy); // set the array to the new array
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("./assets/Chrono.png")} />
      <View style={styles.tasksWrapper}>
        {/* Today's Tasks */}
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.taskContainer}>
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
    width: 200,
    height: 50,
    marginTop: 80,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  taskContainer: {
    marginTop: 30,
  },
  tasksWrapper: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: Color.taskBackground,
    borderRadius: 60,
    borderColor: Color.borderColor,
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: Color.taskBackground,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Color.borderColor,
    borderWidth: 1,
  },
  addText: {
    fontSize: 30,
    color: Color.indicator,
  },
});

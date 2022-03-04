import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from "react-native";
import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState(""); //estado para armazenar as novas skill
  const [mySkills, setMySkills] = useState<SkillData[]>([]); //estado para armazenar TODAS skill
  const [gretting, setGretting] = useState("");
  const [error, setError] = useState(false);

  function handleAddNewSkill() {
    if (newSkill === "") {
      setError(true);

      return;
    }

    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    };

    setMySkills((oldState) => [...oldState, data]); //pega o estado anterior e junta com o novo estado "newSkill"
    setNewSkill("");
  }

  function handleRemoveSkill(id: string) {
    setMySkills((oldState) => oldState.filter((skill) => skill.id !== id));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGretting("Good Morning");
    } else if (currentHour <= 12 && currentHour < 18) {
      setGretting("Good Afternoon");
    } else {
      setGretting("Good Night");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Larissa</Text>

      <Text style={styles.greetings}>{gretting}</Text>

      <TextInput
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#555"
        value={newSkill}
        onChangeText={(value) => {
          setError(false);
          setNewSkill(value);
        }}
      />
      {error == true && (
        <Text style={[styles.greetings, { alignSelf: "center" }]}>
          Você precisa digitar o nome da skill
        </Text>
      )}

      <Button onPress={handleAddNewSkill} title="Add New Skill" />

      <Text style={[styles.title, { marginVertical: 50 }]}>My Skills</Text>

      <FlatList
        data={mySkills}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SkillCard
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121015",
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "#1F1E25",
    color: "#fff",
    fontSize: 18,
    padding: Platform.OS === "ios" ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },

  greetings: {
    color: "#fff",
  },
});

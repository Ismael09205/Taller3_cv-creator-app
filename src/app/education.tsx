// app/education.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "expo-router";
import { InputField } from "../components/InputField";
import { DatePickerField } from "../components/DatePickerField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../../context/CVContext";
import { Education } from "../../types/cv.types";

const educationSchema = z.object({
  institution: z
    .string()
    .trim()
    .min(1, "La institución es obligatoria")
    .max(100, "La institución no puede superar 100 caracteres"),
  degree: z
    .string()
    .trim()
    .min(1, "El título o grado es obligatorio")
    .max(100, "El título o grado no puede superar 100 caracteres"),
  field: z.string().max(100, "El área no puede superar 100 caracteres"),
  graduationYear: z
    .string()
    .refine(
      (value) => value === "" || /^\d{4}$/.test(value),
      "Selecciona un año de graduación válido"
    ),
});

export default function EducationScreen() {
  const router = useRouter();
  const { cvData, addEducation, deleteEducation } = useCVContext();
  const { control, handleSubmit, reset } = useForm<Omit<Education, "id">>({
    defaultValues: {
      institution: "",
      degree: "",
      field: "",
      graduationYear: "",
    },
    resolver: zodResolver(educationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleAdd = () => {
    const id = Date.now().toString();
    void handleSubmit((formData) => {
      const newEducation: Education = {
        id,
        ...formData,
      };

      addEducation(newEducation);
      reset();
      Alert.alert("Éxito", "Educación agregada correctamente");
    })();
  };

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar esta educación?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteEducation(id),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Agregar Nueva Educación</Text>

        <Controller
          control={control}
          name="institution"
          render={({ field, fieldState }) => (
            <InputField
              label="Institución *"
              placeholder="Nombre de la universidad/institución"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              maxLength={100}
            />
          )}
        />

        <Controller
          control={control}
          name="degree"
          render={({ field, fieldState }) => (
            <InputField
              label="Título/Grado *"
              placeholder="Ej: Licenciatura, Maestría"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              maxLength={100}
            />
          )}
        />

        <Controller
          control={control}
          name="field"
          render={({ field, fieldState }) => (
            <InputField
              label="Área de Estudio"
              placeholder="Ej: Ingeniería en Sistemas"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              maxLength={100}
            />
          )}
        />

        <Controller
          control={control}
          name="graduationYear"
          render={({ field, fieldState }) => (
            <DatePickerField
              label="Año de Graduación"
              placeholder="Selecciona un año"
              value={field.value}
              onChangeText={field.onChange}
              error={fieldState.error?.message}
              precision="year"
              clearable
            />
          )}
        />

        <NavigationButton title="Agregar Educación" onPress={handleAdd} />

        {cvData.education.length > 0 && (
          <>
            <Text style={styles.listTitle}>Educación Agregada</Text>
            {cvData.education.map((edu) => (
              <View key={edu.id} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{edu.degree}</Text>
                  <Text style={styles.cardSubtitle}>{edu.field}</Text>
                  <Text style={styles.cardInstitution}>{edu.institution}</Text>
                  <Text style={styles.cardDate}>{edu.graduationYear}</Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(edu.id)}
                >
                  <Text style={styles.deleteButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        <NavigationButton
          title="Volver"
          onPress={() => router.back()}
          variant="secundary"
          style={{ marginTop: 16 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 4,
  },
  cardInstitution: {
    fontSize: 14,
    color: "#95a5a6",
    marginBottom: 2,
  },
  cardDate: {
    fontSize: 12,
    color: "#95a5a6",
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

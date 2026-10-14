import React, { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "expo-router";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../../context/CVContext";
import { PersonalInfo } from "../../types/cv.types";
//zod y react hook form 
const personalInfoSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .refine(
      (value) => Array.from(value).length <= 30,
      "El nombre no puede superar los 30 caracteres"
    )
    .regex(
      /^[\p{L}\p{M} ]+$/u,
      "El nombre solo puede contener letras y espacios"
    ),
  email: z
    .string()
    .trim()
    .min(1, "El email es obligatorio")
    .max(254, "El email no puede superar 254 caracteres")
    .email("Ingresa un email válido"),
  phone: z
    .string()
    .max(15, "El teléfono no puede superar los 15 dígitos")
    .regex(/^\d*$/, "El teléfono solo debe contener números"),
  location: z.string().max(100, "La ubicación no puede superar 100 caracteres"),
  summary: z
    .string()
    .max(500, "El resumen no puede superar los 500 caracteres"),
});

export default function PersonalInfoScreen() {
  const router = useRouter();
  const { cvData, updatePersonalInfo } = useCVContext();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
  } = useForm<PersonalInfo>({
    defaultValues: cvData.personalInfo,
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    reset(cvData.personalInfo);
  }, [cvData.personalInfo, reset]);

  const handleSave = handleSubmit((values) => {
    updatePersonalInfo(values);
    Alert.alert("Éxito", "Información guardada correctamente", [
      { text: "OK", onPress: () => router.back() },
    ]);
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Controller
          control={control}
          name="fullName"
          render={({ field, fieldState }) => (
            <InputField
              label="Nombre Completo *"
              placeholder="Juan Pérez"
              value={field.value}
              onChangeText={(text) => {
                if (/[^\p{L}\p{M} ]/u.test(text)) {
                  setError("fullName", {
                    type: "validate",
                    message: "El nombre solo puede contener letras y espacios",
                  });
                  return;
                }

                if (Array.from(text).length > 30) {
                  setError("fullName", {
                    type: "validate",
                    message: "El nombre no puede superar los 30 caracteres",
                  });
                  return;
                }

                clearErrors("fullName");
                field.onChange(text);
              }}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              autoCapitalize="words"
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <InputField
              label="Email *"
              placeholder="juan@email.com"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={254}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field, fieldState }) => (
            <InputField
              label="Teléfono"
              placeholder="0999999999"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              keyboardType="phone-pad"
              maxLength={15}
            />
          )}
        />
        <Controller
          control={control}
          name="location"
          render={({ field, fieldState }) => (
            <InputField
              label="Ubicación"
              placeholder="Quito, Ecuador"
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
          name="summary"
          render={({ field, fieldState }) => (
            <InputField
              label="Resumen Profesional"
              placeholder="Describe brevemente tu perfil profesional..."
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              multiline
              numberOfLines={4}
              maxLength={500}
              style={{ height: 100, textAlignVertical: "top" }}
            />
          )}
        />

        <NavigationButton
          title="Guardar Información"
          onPress={handleSave}
        />
        <NavigationButton
          title="Cancelar"
          onPress={() => router.back()}
          variant="secundary"
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
});
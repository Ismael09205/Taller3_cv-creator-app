# Contexto Completo del Proyecto CV-CREATOR-APP


================================================
ðŸ“„ ARCHIVO: .github\agents\agent-ui-implement.md
================================================



================================================
ðŸ“„ ARCHIVO: .github\copilot-instructions.md
================================================



================================================
ðŸ“„ ARCHIVO: .gitignore
================================================

# Learn more https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files

# dependencies
node_modules/

# Expo
.expo/
dist/
web-build/
expo-env.d.ts

# Native
.kotlin/
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Metro
.metro-health-check*

# debug
npm-debug.*
yarn-debug.*
yarn-error.*

# macOS
.DS_Store
*.pem

# local env files
.env*.local

# typescript
*.tsbuildinfo

example

# generated native folders
/ios
/android


================================================
ðŸ“„ ARCHIVO: AGENTS.md
================================================

This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md


================================================
ðŸ“„ ARCHIVO: app.json
================================================

{
  "expo": {
    "name": "cv-creator-app",
    "slug": "cv-creator-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "cvcreatorapp",
    "userInterfaceStyle": "automatic",
    "ios": {
      "icon": "./assets/expo.icon"
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "predictiveBackGestureEnabled": false
    },
    "web": {
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#208AEF",
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 76
        }
      ],
      "@react-native-community/datetimepicker"
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    }
  }
}


================================================
ðŸ“„ ARCHIVO: context\CVContext.tsx
================================================

import React, { createContext, useContext, useState, ReactNode } from "react";
import { CVData, PersonalInfo, Experience, Education } from "../types/cv.types";

interface CVContextType {
  cvData: CVData;
  updatePersonalInfo: (info: PersonalInfo) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Experience) => void;
  deleteExperience: (id: string) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Education) => void;
  deleteEducation: (id: string) => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export const CVProvider = ({ children }: { children: ReactNode }) => {
  const [cvData, setCVData] = useState<CVData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    experiences: [],
    education: [],
  });

  const updatePersonalInfo = (info: PersonalInfo) => {
    setCVData((prev) => ({ ...prev, personalInfo: info }));
  };

  const addExperience = (exp: Experience) => {
    setCVData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, exp],
    }));
  };

  const updateExperience = (id: string, exp: Experience) => {
    setCVData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) => (e.id === id ? exp : e)),
    }));
  };

  const deleteExperience = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));
  };

  const addEducation = (edu: Education) => {
    setCVData((prev) => ({
      ...prev,
      education: [...prev.education, edu],
    }));
  };

  const updateEducation = (id: string, edu: Education) => {
    setCVData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? edu : e)),
    }));
  };

  const deleteEducation = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  return (
    <CVContext.Provider
      value={{
        cvData,
        updatePersonalInfo,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};

export const useCVContext = () => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error("useCVContext debe usarse dentro de CVProvider");
  }
  return context;
};


================================================
ðŸ“„ ARCHIVO: docs\Requerimiento\Requerimiento-UI.md
================================================

# Requisito de diseño: identidad visual EPN

## Descripción

La aplicación móvil `cv-creator-app` debe mantener una identidad visual coherente basada en la paleta de colores de referencia de la Escuela Politécnica Nacional (EPN).

Esta identidad debe aplicarse de manera uniforme en todas las pantallas y componentes de la aplicación, garantizando una presentación visual consistente, una adecuada legibilidad del contenido y una diferenciación clara de los elementos interactivos.

## Criterios de cumplimiento

- **Uso de la paleta:** los elementos de la interfaz deben utilizar los colores de referenciados dentro de la SKILL pertinente
- **Consistencia visual:** los componentes que cumplen funciones equivalentes deben mantener criterios de color y presentación uniformes en toda la aplicación.
- **Legibilidad:** las combinaciones de colores deben proporcionar contraste suficiente para distinguir los textos, iconos y controles sobre sus respectivos fondos.
- **Aplicación transversal:** la identidad visual debe mantenerse en fondos, encabezados, botones, menús, modales, campos y demás elementos de la interfaz.
- **Continuidad del diseño:** las nuevas pantallas y las modificaciones de componentes existentes deben conservar la identidad visual establecida, evitando variaciones de color injustificadas.

## Verificación

El requisito se considera cumplido cuando las pantallas y los componentes de la aplicación mantienen una identidad visual consistente, utilizan adecuadamente la paleta de referencia y permiten identificar y leer claramente sus elementos.

================================================
ðŸ“„ ARCHIVO: expo-env.d.ts
================================================

/// <reference types="expo/types" />

// NOTE: This file should not be edited and should be in your git ignore

================================================
ðŸ“„ ARCHIVO: implementacion_validaciones.md
================================================

# Estrategia de Validacion en Tiempo Real

Para lograr que los formularios muestren errores de inmediato al escribir, usaremos 3 herramientas clave:

## 1. Dependencias Necesarias
Ejecuta el siguiente comando en tu proyecto:
`npx expo install react-hook-form zod @hookform/resolvers`

## 2. Componentes de la Solucion

*   **Zod (Las Reglas):** 
    Sirve para crear un "esquema". Aqui dictas que el telefono solo lleve numeros o que el email tenga el formato correcto (`z.object(...)`).
*   **React Hook Form (El Motor):** 
    Controla el formulario sin volver lenta la aplicacion. La clave es usarlo con la configuracion `mode: "onChange"` para que reaccione a cada tecla presionada.
*   **Resolvers (El Puente):** 
    Une Zod con React Hook Form para que los errores fluyan automaticamente.

## 3. Pasos de Implementacion

1.  **Importar dependencias** en tu pantalla (ej. `personal-info.tsx`).
2.  **Crear el esquema Zod** fuera del componente principal.
3.  **Llamar a useForm** con el esquema y el modo "onChange".
4.  **Envolver cada InputField** con el componente `<Controller />` de React Hook Form.
5.  **Inyectar el error** mandando `errors.campo?.message` a la propiedad `error` que ya tiene tu `InputField`.

De esta forma, si el usuario escribe una letra en el telefono, la pantalla pintara el error en rojo en ese mismo instante.

================================================
ðŸ“„ ARCHIVO: package.json
================================================

{
  "name": "cv-creator-app",
  "main": "expo-router/entry",
  "version": "1.0.0",
  "dependencies": {
    "@expo/ui": "~57.0.24",
    "@hookform/resolvers": "^5.9.1",
    "@react-native-community/datetimepicker": "9.1.0",
    "expo": "~57.0.29",
    "expo-constants": "~57.0.22",
    "expo-device": "~57.0.2",
    "expo-font": "~57.0.4",
    "expo-glass-effect": "~57.0.4",
    "expo-image": "~57.0.5",
    "expo-linking": "~57.0.13",
    "expo-router": "~57.0.27",
    "expo-splash-screen": "~57.0.10",
    "expo-status-bar": "~57.0.1",
    "expo-symbols": "~57.0.3",
    "expo-system-ui": "~57.0.4",
    "expo-web-browser": "~57.0.3",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-hook-form": "^7.90.0",
    "react-native": "0.86.3",
    "react-native-gesture-handler": "~2.32.0",
    "react-native-reanimated": "4.5.1",
    "react-native-safe-area-context": "~5.7.0",
    "react-native-screens": "~4.26.0",
    "react-native-web": "~0.21.0",
    "react-native-worklets": "0.10.1",
    "zod": "^4.6.7"
  },
  "devDependencies": {
    "@types/react": "~19.2.2",
    "typescript": "~6.0.3"
  },
  "scripts": {
    "start": "expo start",
    "reset-project": "node ./scripts/reset-project.js",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "expo lint"
  },
  "private": true
}


================================================
ðŸ“„ ARCHIVO: README.md
================================================

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


================================================
ðŸ“„ ARCHIVO: scripts\reset-project.js
================================================

#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It deletes or moves the /src and /scripts directories to /example based on user input and creates a new /src/app directory with an index.tsx and _layout.tsx file.
 * You can remove the `reset-project` script from package.json and safely delete this file after running it.
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const root = process.cwd();
const oldDirs = ["src", "scripts"];
const exampleDir = "example";
const newAppDir = "src/app";
const exampleDirPath = path.join(root, exampleDir);

const indexContent = `import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
`;

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const moveDirectories = async (userInput) => {
  try {
    if (userInput === "y") {
      // Create the app-example directory
      await fs.promises.mkdir(exampleDirPath, { recursive: true });
      console.log(`📁 /${exampleDir} directory created.`);
    }

    // Move old directories to new app-example directory or delete them
    for (const dir of oldDirs) {
      const oldDirPath = path.join(root, dir);
      if (fs.existsSync(oldDirPath)) {
        if (userInput === "y") {
          const newDirPath = path.join(root, exampleDir, dir);
          await fs.promises.rename(oldDirPath, newDirPath);
          console.log(`➡️ /${dir} moved to /${exampleDir}/${dir}.`);
        } else {
          await fs.promises.rm(oldDirPath, { recursive: true, force: true });
          console.log(`❌ /${dir} deleted.`);
        }
      } else {
        console.log(`➡️ /${dir} does not exist, skipping.`);
      }
    }

    // Create new /src/app directory
    const newAppDirPath = path.join(root, newAppDir);
    await fs.promises.mkdir(newAppDirPath, { recursive: true });
    console.log("\n📁 New /src/app directory created.");

    // Create index.tsx
    const indexPath = path.join(newAppDirPath, "index.tsx");
    await fs.promises.writeFile(indexPath, indexContent);
    console.log("📄 src/app/index.tsx created.");

    // Create _layout.tsx
    const layoutPath = path.join(newAppDirPath, "_layout.tsx");
    await fs.promises.writeFile(layoutPath, layoutContent);
    console.log("📄 src/app/_layout.tsx created.");

    console.log("\n✅ Project reset complete. Next steps:");
    console.log(
      `1. Run \`npx expo start\` to start a development server.\n2. Edit src/app/index.tsx to edit the main screen.\n3. Put all your application code in /src, only screens and layout files should be in /src/app.${
        userInput === "y"
          ? `\n4. Delete the /${exampleDir} directory when you're done referencing it.`
          : ""
      }`
    );
  } catch (error) {
    console.error(`❌ Error during script execution: ${error.message}`);
  }
};

rl.question(
  "Do you want to move existing files to /example instead of deleting them? (Y/n): ",
  (answer) => {
    const userInput = answer.trim().toLowerCase() || "y";
    if (userInput === "y" || userInput === "n") {
      moveDirectories(userInput).finally(() => rl.close());
    } else {
      console.log("❌ Invalid input. Please enter 'Y' or 'N'.");
      rl.close();
    }
  }
);


================================================
ðŸ“„ ARCHIVO: src\app\education.tsx
================================================

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
  institution: z.string().trim().min(1, "La institución es obligatoria"),
  degree: z.string().trim().min(1, "El título o grado es obligatorio"),
  field: z.string(),
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


================================================
ðŸ“„ ARCHIVO: src\app\experience.tsx
================================================

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
import { isPickerValueBefore } from "../../types/datePickerUtils";
import { useCVContext } from "../../context/CVContext";
import { Experience } from "../../types/cv.types";

const experienceSchema = z
  .object({
    company: z.string().trim().min(1, "La empresa es obligatoria"),
    position: z.string().trim().min(1, "El cargo es obligatorio"),
    startDate: z.string().min(1, "La fecha de inicio es obligatoria"),
    endDate: z.string(),
    description: z.string(),
  })
  .superRefine((values, context) => {
    if (
      values.startDate &&
      values.endDate &&
      isPickerValueBefore(values.endDate, values.startDate, "month")
    ) {
      context.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "La fecha de fin no puede ser anterior al inicio",
      });
    }
  });

export default function ExperienceScreen() {
  const router = useRouter();
  const { cvData, addExperience, deleteExperience } = useCVContext();
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<Omit<Experience, "id">>({
    defaultValues: {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    },
    resolver: zodResolver(experienceSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleAdd = () => {
    const id = Date.now().toString();
    void handleSubmit((formData) => {
      const newExperience: Experience = {
        id,
        ...formData,
      };

      addExperience(newExperience);
      reset();
      Alert.alert("Éxito", "Experiencia agregada correctamente");
    })();
  };

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar esta experiencia?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteExperience(id),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Agregar Nueva Experiencia</Text>

        <Controller
          control={control}
          name="company"
          render={({ field, fieldState }) => (
            <InputField
              label="Empresa *"
              placeholder="Nombre de la empresa"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="position"
          render={({ field, fieldState }) => (
            <InputField
              label="Cargo *"
              placeholder="Tu posición"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="startDate"
          render={({ field, fieldState }) => (
            <DatePickerField
              label="Fecha de Inicio *"
              placeholder="Selecciona mes y año"
              value={field.value}
              onChangeText={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="endDate"
          render={({ field, fieldState }) => (
            <DatePickerField
              label="Fecha de Fin"
              placeholder="Opcional; vacío significa Actual"
              value={field.value}
              onChangeText={field.onChange}
              error={fieldState.error?.message}
              clearable
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field, fieldState }) => (
            <InputField
              label="Descripción"
              placeholder="Describe tus responsabilidades y logros..."
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              multiline
              numberOfLines={4}
              style={{ height: 100, textAlignVertical: "top" }}
            />
          )}
        />

        <NavigationButton title="Agregar Experiencia" onPress={handleAdd} />

        {cvData.experiences.length > 0 && (
          <>
            <Text style={styles.listTitle}>Experiencias Agregadas</Text>
            {cvData.experiences.map((exp) => (
              <View key={exp.id} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{exp.position}</Text>
                  <Text style={styles.cardSubtitle}>{exp.company}</Text>
                  <Text style={styles.cardDate}>
                    {exp.startDate} - {exp.endDate || "Actual"}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(exp.id)}
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


================================================
ðŸ“„ ARCHIVO: src\app\explore.tsx
================================================

import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function TabTwoScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Explore</ThemedText>
          <ThemedText style={styles.centerText} themeColor="textSecondary">
            This starter app includes example{'\n'}code to help you get started.
          </ThemedText>

          <ExternalLink href="https://docs.expo.dev" asChild>
            <Pressable style={({ pressed }) => pressed && styles.pressed}>
              <ThemedView type="backgroundElement" style={styles.linkButton}>
                <ThemedText type="link">Expo documentation</ThemedText>
                <SymbolView
                  tintColor={theme.text}
                  name={{ ios: 'arrow.up.right.square', android: 'link', web: 'link' }}
                  size={12}
                />
              </ThemedView>
            </Pressable>
          </ExternalLink>
        </ThemedView>

        <ThemedView style={styles.sectionsWrapper}>
          <Collapsible title="File-based routing">
            <ThemedText type="small">
              This app has two screens: <ThemedText type="code">src/app/index.tsx</ThemedText> and{' '}
              <ThemedText type="code">src/app/explore.tsx</ThemedText>
            </ThemedText>
            <ThemedText type="small">
              The layout file in <ThemedText type="code">src/app/_layout.tsx</ThemedText> sets up
              the tab navigator.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              <ThemedText type="linkPrimary">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Android, iOS, and web support">
            <ThemedView type="backgroundElement" style={styles.collapsibleContent}>
              <ThemedText type="small">
                You can open this project on Android, iOS, and the web. To open the web version,
                press <ThemedText type="smallBold">w</ThemedText> in the terminal running this
                project.
              </ThemedText>
              <Image
                source={require('@/assets/images/tutorial-web.png')}
                style={styles.imageTutorial}
              />
            </ThemedView>
          </Collapsible>

          <Collapsible title="Images">
            <ThemedText type="small">
              For static images, you can use the <ThemedText type="code">@2x</ThemedText> and{' '}
              <ThemedText type="code">@3x</ThemedText> suffixes to provide files for different
              screen densities.
            </ThemedText>
            <Image source={require('@/assets/images/react-logo.png')} style={styles.imageReact} />
            <ExternalLink href="https://reactnative.dev/docs/images">
              <ThemedText type="linkPrimary">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Light and dark mode components">
            <ThemedText type="small">
              This template has light and dark mode support. The{' '}
              <ThemedText type="code">useColorScheme()</ThemedText> hook lets you inspect what the
              user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
              <ThemedText type="linkPrimary">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Animations">
            <ThemedText type="small">
              This template includes an example of an animated component. The{' '}
              <ThemedText type="code">src/components/ui/collapsible.tsx</ThemedText> component uses
              the powerful <ThemedText type="code">react-native-reanimated</ThemedText> library to
              animate opening this hint.
            </ThemedText>
          </Collapsible>
        </ThemedView>
        {Platform.OS === 'web' && <WebBadge />}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
  },
  titleContainer: {
    gap: Spacing.three,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  centerText: {
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  linkButton: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    justifyContent: 'center',
    gap: Spacing.one,
    alignItems: 'center',
  },
  sectionsWrapper: {
    gap: Spacing.five,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  collapsibleContent: {
    alignItems: 'center',
  },
  imageTutorial: {
    width: '100%',
    aspectRatio: 296 / 171,
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
  },
  imageReact: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});


================================================
ðŸ“„ ARCHIVO: src\app\index.tsx
================================================

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useCVContext } from "../../context/CVContext";

export default function HomeScreen() {
  const router = useRouter();
  const { cvData } = useCVContext();

  console.log("CV Data cargado:", cvData); // Para debugging

  const isPersonalInfoComplete =
    cvData.personalInfo.fullName && cvData.personalInfo.email;
  const hasExperience = cvData.experiences.length > 0;
  const hasEducation = cvData.education.length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crea tu CV Profesional</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Información Personal</Text>
        <Text style={styles.status}>
          {isPersonalInfoComplete ? "✓ Completado" : "Pendiente"}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/personal-info")}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Experiencia</Text>
        <Text style={styles.status}>
          {hasExperience
            ? `✓ ${cvData.experiences.length} agregada(s)`
            : "Pendiente"}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/experience")}
        >
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Educación</Text>
        <Text style={styles.status}>
          {hasEducation
            ? `✓ ${cvData.education.length} agregada(s)`
            : "Pendiente"}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/education")}
        >
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 30 }}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#2ecc71" }]}
          onPress={() => router.push("/preview")}
        >
          <Text style={styles.buttonText}>Ver Vista Previa del CV</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
  },
  section: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    color: "#27ae60",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});



================================================
ðŸ“„ ARCHIVO: src\app\personal-info.tsx
================================================

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

const personalInfoSchema = z.object({
  fullName: z.string().trim().min(1, "El nombre es obligatorio"),
  email: z
    .string()
    .trim()
    .min(1, "El email es obligatorio")
    .email("Ingresa un email válido"),
  phone: z
    .string()
    .regex(/^\d*$/, "El teléfono solo debe contener números"),
  location: z.string(),
  summary: z.string(),
});

export default function PersonalInfoScreen() {
  const router = useRouter();
  const { cvData, updatePersonalInfo } = useCVContext();
  const {
    control,
    handleSubmit,
    reset,
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
              onChangeText={field.onChange}
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

================================================
ðŸ“„ ARCHIVO: src\app\preview.tsx
================================================

import React from "react";
import {View,StyleSheet} from "react-native";
import { useCVContext} from "../../context/CVContext";
import {CVPreview} from "@/components/CVPreview"

export default function PrevviewScreen (){
    const {cvData}=useCVContext();
    return (
        <View>
            <CVPreview cvData={cvData}/>

        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },

})

================================================
ðŸ“„ ARCHIVO: src\app\_layout.tsx
================================================

import {Stack} from "expo-router";
import {CVProvider} from "../../context/CVContext";

export default function RootLayout(){
  return(
    <CVProvider>
      <Stack
        screenOptions={{
          headerStyle:{
            backgroundColor:"#3498db",
          },
          headerTintColor:"#fff",
          headerTitleStyle:{
            fontWeight:"bold",
          },
        }}
      
      >
        <Stack.Screen
        name="indez"
        options={{
          title:"Crear CV",
          headerShown:true,

        }}
      />
      <Stack.Screen
        name="personal-info"
        options={{
          title:"Experiencia Laboral",
        }}
      />
      <Stack.Screen
        name="preview"
        options={{
          title:"Vista Previa",
          presentation: "modal",
        }}
/>
</Stack>
</CVProvider>
  )

}

================================================
ðŸ“„ ARCHIVO: src\components\animated-icon.tsx
================================================

import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { Easing, Keyframe } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const INITIAL_SCALE_FACTOR = Dimensions.get('screen').height / 90;
const DURATION = 600;

export function AnimatedSplashOverlay() {
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const splashKeyframe = new Keyframe({
    0: {
      transform: [{ scale: 1 }],
      opacity: 1,
    },
    20: {
      opacity: 1,
    },
    70: {
      opacity: 0,
      easing: Easing.elastic(0.7),
    },
    100: {
      opacity: 0,
      transform: [{ scale: 1 }],
      easing: Easing.elastic(0.7),
    },
  });

  const image = <Image style={styles.image} source={require('@/assets/images/expo-logo.png')} />;

  return animate ? (
    <Animated.View
      entering={splashKeyframe.duration(DURATION).withCallback((finished) => {
        'worklet';
        if (finished) {
          scheduleOnRN(setVisible, false);
        }
      })}
      style={styles.splashOverlay}>
      {image}
    </Animated.View>
  ) : (
    <View
      onLayout={() => {
        SplashScreen.hideAsync().finally(() => {
          setAnimate(true);
        });
      }}
      style={styles.splashOverlay}>
      {image}
    </View>
  );
}

const keyframe = new Keyframe({
  0: {
    transform: [{ scale: INITIAL_SCALE_FACTOR }],
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
  },
  40: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
    easing: Easing.elastic(0.7),
  },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const glowKeyframe = new Keyframe({
  0: {
    transform: [{ rotateZ: '0deg' }],
  },
  100: {
    transform: [{ rotateZ: '7200deg' }],
  },
});

export function AnimatedIcon() {
  return (
    <View style={styles.iconContainer}>
      <Animated.View entering={glowKeyframe.duration(60 * 1000 * 4)} style={styles.glow}>
        <Image style={styles.glow} source={require('@/assets/images/logo-glow.png')} />
      </Animated.View>

      <Animated.View entering={keyframe.duration(DURATION)} style={styles.background} />
      <Animated.View style={styles.imageContainer} entering={logoKeyframe.duration(DURATION)}>
        <Image style={styles.image} source={require('@/assets/images/expo-logo.png')} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    width: 201,
    height: 201,
    position: 'absolute',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 128,
    height: 128,
    zIndex: 100,
  },
  image: {
    width: 76,
    height: 71,
  },
  background: {
    borderRadius: 40,
    experimental_backgroundImage: `linear-gradient(180deg, #3C9FFE, #0274DF)`,
    width: 128,
    height: 128,
    position: 'absolute',
  },
  splashOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#208AEF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\animated-icon.web.tsx
================================================

import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import Animated, { Keyframe, Easing } from 'react-native-reanimated';

import classes from './animated-icon.module.css';
const DURATION = 300;

export function AnimatedSplashOverlay() {
  return null;
}

const keyframe = new Keyframe({
  0: {
    transform: [{ scale: 0 }],
  },
  60: {
    transform: [{ scale: 1.2 }],
    easing: Easing.elastic(1.2),
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(1.2),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    opacity: 0,
  },
  60: {
    transform: [{ scale: 1.2 }],
    opacity: 0,
    easing: Easing.elastic(1.2),
  },
  100: {
    transform: [{ scale: 1 }],
    opacity: 1,
    easing: Easing.elastic(1.2),
  },
});

const glowKeyframe = new Keyframe({
  0: {
    transform: [{ rotateZ: '-180deg' }, { scale: 0.8 }],
    opacity: 0,
  },
  [DURATION / 1000]: {
    transform: [{ rotateZ: '0deg' }, { scale: 1 }],
    opacity: 1,
    easing: Easing.elastic(0.7),
  },
  100: {
    transform: [{ rotateZ: '7200deg' }],
  },
});

export function AnimatedIcon() {
  return (
    <View style={styles.iconContainer}>
      <Animated.View entering={glowKeyframe.duration(60 * 1000 * 4)} style={styles.glow}>
        <Image style={styles.glow} source={require('@/assets/images/logo-glow.png')} />
      </Animated.View>

      <Animated.View style={styles.background} entering={keyframe.duration(DURATION)}>
        <div className={classes.expoLogoBackground} />
      </Animated.View>

      <Animated.View style={styles.imageContainer} entering={logoKeyframe.duration(DURATION)}>
        <Image style={styles.image} source={require('@/assets/images/expo-logo.png')} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    zIndex: 1000,
    position: 'absolute',
    top: 128 / 2 + 138,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    width: 201,
    height: 201,
    position: 'absolute',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 128,
    height: 128,
  },
  image: {
    position: 'absolute',
    width: 76,
    height: 71,
  },
  background: {
    width: 128,
    height: 128,
    position: 'absolute',
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\app-tabs.tsx
================================================

import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}


================================================
ðŸ“„ ARCHIVO: src\components\app-tabs.web.tsx
================================================

import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { SymbolView } from 'expo-symbols';
import { Pressable, useColorScheme, View, StyleSheet } from 'react-native';

import { ExternalLink } from './external-link';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton>Home</TabButton>
          </TabTrigger>
          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton>Explore</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'backgroundElement'}
        style={styles.tabButtonView}>
        <ThemedText type="small" themeColor={isFocused ? 'text' : 'textSecondary'}>
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView type="backgroundElement" style={styles.innerContainer}>
        <ThemedText type="smallBold" style={styles.brandText}>
          Expo Starter
        </ThemedText>

        {props.children}

        <ExternalLink href="https://docs.expo.dev" asChild>
          <Pressable style={styles.externalPressable}>
            <ThemedText type="link">Docs</ThemedText>
            <SymbolView
              tintColor={colors.text}
              name={{ ios: 'arrow.up.right.square', web: 'link' }}
              size={12}
            />
          </Pressable>
        </ExternalLink>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    width: '100%',
    padding: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.five,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
  },
  brandText: {
    marginRight: 'auto',
  },
  pressed: {
    opacity: 0.7,
  },
  tabButtonView: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
  externalPressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.one,
    marginLeft: Spacing.three,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\CVPreview.tsx
================================================

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { CVData } from "../../types/cv.types";

interface CVPreviewProps {
  cvData: CVData;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  const { personalInfo, experiences, education } = cvData;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header con información personal */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {personalInfo.fullName || "Tu Nombre"}
          </Text>
          <View style={styles.contactInfo}>
            {personalInfo.email && (
              <Text style={styles.contactText}>📧 {personalInfo.email}</Text>
            )}
            {personalInfo.phone && (
              <Text style={styles.contactText}>📱 {personalInfo.phone}</Text>
            )}
            {personalInfo.location && (
              <Text style={styles.contactText}>📍 {personalInfo.location}</Text>
            )}
          </View>
        </View>

        {/* Resumen profesional */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>RESUMEN PROFESIONAL</Text>
            <Text style={styles.summaryText}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Experiencia laboral */}
        {experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EXPERIENCIA LABORAL</Text>
            {experiences.map((exp) => (
              <View key={exp.id} style={styles.item}>
                <Text style={styles.itemTitle}>{exp.position}</Text>
                <Text style={styles.itemSubtitle}>{exp.company}</Text>
                <Text style={styles.itemDate}>
                  {exp.startDate} - {exp.endDate || "Actual"}
                </Text>
                {exp.description && (
                  <Text style={styles.itemDescription}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Educación */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCACIÓN</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.item}>
                <Text style={styles.itemTitle}>{edu.degree}</Text>
                {edu.field && (
                  <Text style={styles.itemSubtitle}>{edu.field}</Text>
                )}
                <Text style={styles.itemInstitution}>{edu.institution}</Text>
                {edu.graduationYear && (
                  <Text style={styles.itemDate}>{edu.graduationYear}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Mensaje si no hay datos */}
        {!personalInfo.fullName &&
          experiences.length === 0 &&
          education.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                No hay información para mostrar.{"\n"}
                Completa las secciones para ver tu CV.
              </Text>
            </View>
          )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#3498db",
    paddingBottom: 16,
    marginBottom: 24,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 12,
  },
  contactInfo: {
    gap: 4,
  },
  contactText: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3498db",
    marginBottom: 12,
    letterSpacing: 1,
  },
  summaryText: {
    fontSize: 14,
    color: "#34495e",
    lineHeight: 20,
  },
  item: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 4,
  },
  itemInstitution: {
    fontSize: 14,
    color: "#95a5a6",
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 12,
    color: "#95a5a6",
    fontStyle: "italic",
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 13,
    color: "#34495e",
    lineHeight: 18,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#95a5a6",
    textAlign: "center",
    lineHeight: 24,
  },
});



================================================
ðŸ“„ ARCHIVO: src\components\DatePickerField.tsx
================================================

import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
  type DatePickerPrecision,
  formatPickerValue,
  parseInputDate,
  parsePickerValue,
  pickerValueToInputDate,
} from "../../types/datePickerUtils";

const webInputStyle: React.CSSProperties = {
  boxSizing: "border-box",
  width: "100%",
  minHeight: 48,
  padding: 12,
  borderRadius: 8,
  backgroundColor: "#fff",
  fontSize: 16,
};

const webClearButtonStyle: React.CSSProperties = {
  display: "block",
  marginLeft: "auto",
  marginTop: 8,
  border: 0,
  padding: 0,
  background: "transparent",
  color: "#3498db",
  fontSize: 14,
  cursor: "pointer",
};

export interface DatePickerFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  precision?: DatePickerPrecision;
  clearable?: boolean;
}

export const DatePickerField = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  precision = "month",
  clearable = false,
}: DatePickerFieldProps) => {
  const [show, setShow] = useState(false);

  const handleNativeChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (Platform.OS === "android") {
      setShow(false);
    }

    if (event.type !== "dismissed" && selectedDate) {
      onChangeText(formatPickerValue(selectedDate, precision));
    }
  };

  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        {React.createElement("input", {
          type: precision === "month" ? "month" : "date",
          "aria-label": label,
          value: pickerValueToInputDate(value, precision),
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            const date = parseInputDate(event.currentTarget.value, precision);
            onChangeText(date ? formatPickerValue(date, precision) : "");
          },
          style: {
            ...webInputStyle,
            border: `1px solid ${error ? "#e74c3c" : "#ddd"}`,
          },
        })}
        {!value && placeholder ? (
          <Text style={styles.placeholder}>{placeholder}</Text>
        ) : null}
        {clearable && value !== "" ? (
          React.createElement(
            "button",
            {
              type: "button",
              onClick: () => onChangeText(""),
              style: webClearButtonStyle,
            },
            "Quitar fecha"
          )
        ) : null}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={label}
        style={[styles.input, error && styles.inputError]}
        onPress={() =>
          setShow((isShowing) => (Platform.OS === "ios" ? !isShowing : true))
        }
        activeOpacity={0.7}
      >
        <Text style={{ color: value ? "#000" : "#999", fontSize: 16 }}>
          {value || placeholder || "Seleccionar fecha"}
        </Text>
      </TouchableOpacity>

      {clearable && value !== "" && (
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => onChangeText("")}
          style={styles.clearButton}
        >
          <Text style={styles.clearButtonText}>Quitar fecha</Text>
        </TouchableOpacity>
      )}

      {show && (
        <DateTimePicker
          value={parsePickerValue(value, precision)}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleNativeChange}
        />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    minHeight: 48,
  },
  inputError: {
    borderColor: "#e74c3c",
  },
  placeholder: {
    color: "#999",
    fontSize: 12,
    marginTop: 4,
  },
  clearButton: {
    alignSelf: "flex-end",
    paddingTop: 8,
  },
  clearButtonText: {
    color: "#3498db",
    fontSize: 14,
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 12,
    marginTop: 4,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\external-link.tsx
================================================

import { Href, Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { type ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href & string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (process.env.EXPO_OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    />
  );
}


================================================
ðŸ“„ ARCHIVO: src\components\hint-row.tsx
================================================

import type { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';

type HintRowProps = {
  title?: string;
  hint?: ReactNode;
};

export function HintRow({ title = 'Try editing', hint = 'app/index.tsx' }: HintRowProps) {
  return (
    <View style={styles.stepRow}>
      <ThemedText type="small">{title}</ThemedText>
      <ThemedView type="backgroundSelected" style={styles.codeSnippet}>
        <ThemedText themeColor="textSecondary">{hint}</ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeSnippet: {
    borderRadius: Spacing.two,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\InputField.tsx
================================================

import React from "react"
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TextInputProps,
} from "react-native"

interface InputFieldProps extends TextInputProps{
    label: string;
    error?: string;
}

export const InputField =({label, error, ...props}: InputFieldProps)=>{
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholderTextColor="#999"
                accessibilityLabel={label}
                accessibilityHint={error}
                {...props}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    inputError: {
        borderColor: "#e74c3c",
    },
    errorText: {
        color: "#e74c3c",
        fontSize: 12,
        marginTop: 4,
    },
});

================================================
ðŸ“„ ARCHIVO: src\components\NavigationButton.tsx
================================================

import React from "react";
import {TouchableOpacity,Text,StyleSheet,ViewStyle} from "react-native";
interface NavigationButtonProps{
title: string;
onPress:()=>void;
variant?:"primary"|"secundary"|"denger";
style?:ViewStyle;
}

export const NavigationButton=({
    title,
    onPress,
    variant="primary",
    style,

}:NavigationButtonProps)=>{
    return(
        <TouchableOpacity
            style={[styles.button,styles[variant],style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
        <Text
            style={[styles.text, variant === "secundary" && styles.textSecundary]}

        >
            {title}
        </Text>
       </TouchableOpacity> 
    );

};
const styles=StyleSheet.create({
    button:{
        padding:16,
        borderRadius:8,
        alignItems:"center",
        marginVertical:8,
    },
    primary:
    {
        backgroundColor:"#3498db",

    },
    secundary:{
        backgroundColor:"transparent",
        borderWidth:2,
        borderColor:"#3498db"
    },
    denger:{
        backgroundColor:"#e74c3c",

    },
    text:{
        color:"#fff",
        fontSize:16,
        fontWeight:"600",
    },
    textSecundary:{
        color:"#3498db"
    },


});

================================================
ðŸ“„ ARCHIVO: src\components\themed-text.tsx
================================================

import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
  },
  title: {
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 52,
  },
  subtitle: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: 600,
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    lineHeight: 30,
    fontSize: 14,
    color: '#3c87f7',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\themed-view.tsx
================================================

import { View, type ViewProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

export function ThemedView({ style, lightColor, darkColor, type, ...otherProps }: ThemedViewProps) {
  const theme = useTheme();

  return <View style={[{ backgroundColor: theme[type ?? 'background'] }, style]} {...otherProps} />;
}


================================================
ðŸ“„ ARCHIVO: src\components\ui\collapsible.tsx
================================================

import { SymbolView } from 'expo-symbols';
import { PropsWithChildren, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  return (
    <ThemedView>
      <Pressable
        style={({ pressed }) => [styles.heading, pressed && styles.pressedHeading]}
        onPress={() => setIsOpen((value) => !value)}>
        <ThemedView type="backgroundElement" style={styles.button}>
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            size={14}
            weight="bold"
            tintColor={theme.text}
            style={{ transform: [{ rotate: isOpen ? '-90deg' : '90deg' }] }}
          />
        </ThemedView>

        <ThemedText type="small">{title}</ThemedText>
      </Pressable>
      {isOpen && (
        <Animated.View entering={FadeIn.duration(200)}>
          <ThemedView type="backgroundElement" style={styles.content}>
            {children}
          </ThemedView>
        </Animated.View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  pressedHeading: {
    opacity: 0.7,
  },
  button: {
    width: Spacing.four,
    height: Spacing.four,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: Spacing.three,
    borderRadius: Spacing.three,
    marginLeft: Spacing.four,
    padding: Spacing.four,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\web-badge.tsx
================================================

import { version } from 'expo/package.json';
import { Image } from 'expo-image';
import { useColorScheme, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';

export function WebBadge() {
  const scheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="code" themeColor="textSecondary" style={styles.versionText}>
        v{version}
      </ThemedText>
      <Image
        source={
          scheme === 'dark'
            ? require('@/assets/images/expo-badge-white.png')
            : require('@/assets/images/expo-badge.png')
        }
        style={styles.badgeImage}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.five,
    alignItems: 'center',
    gap: Spacing.two,
  },
  versionText: {
    textAlign: 'center',
  },
  badgeImage: {
    width: 123,
    aspectRatio: 123 / 24,
  },
});


================================================
ðŸ“„ ARCHIVO: src\constants\theme.ts
================================================

/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;


================================================
ðŸ“„ ARCHIVO: src\hooks\use-color-scheme.ts
================================================

export { useColorScheme } from 'react-native';


================================================
ðŸ“„ ARCHIVO: src\hooks\use-color-scheme.web.ts
================================================

import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}


================================================
ðŸ“„ ARCHIVO: src\hooks\use-theme.ts
================================================

/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useTheme() {
  const scheme = useColorScheme();
  const theme = scheme === 'unspecified' ? 'light' : scheme;

  return Colors[theme];
}


================================================
ðŸ“„ ARCHIVO: tsconfig.json
================================================

{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": [
        "./src/*"
      ],
      "@/assets/*": [
        "./assets/*"
      ]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}


================================================
ðŸ“„ ARCHIVO: types\cv.types.ts
================================================

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationYear: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
}

================================================
ðŸ“„ ARCHIVO: types\datePickerUtils.ts
================================================

export type DatePickerPrecision = "month" | "year";

export const parsePickerValue = (
  value: string,
  precision: DatePickerPrecision
): Date => {
  if (precision === "year" && /^\d{4}$/.test(value)) {
    return new Date(Number(value), 0, 1, 12);
  }

  const monthYearMatch = /^(\d{1,2})\/(\d{4})$/.exec(value);
  if (monthYearMatch) {
    return new Date(Number(monthYearMatch[2]), Number(monthYearMatch[1]) - 1, 1, 12);
  }

  const webMonthMatch = /^(\d{4})-(\d{2})$/.exec(value);
  if (webMonthMatch) {
    return new Date(Number(webMonthMatch[1]), Number(webMonthMatch[2]) - 1, 1, 12);
  }

  const isoDateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (isoDateMatch) {
    return new Date(
      Number(isoDateMatch[1]),
      Number(isoDateMatch[2]) - 1,
      Number(isoDateMatch[3]),
      12
    );
  }

  return new Date();
};

export const formatPickerValue = (
  date: Date,
  precision: DatePickerPrecision
): string => {
  const year = date.getFullYear().toString();
  if (precision === "year") {
    return year;
  }

  return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${year}`;
};

export const pickerValueToInputDate = (
  value: string,
  precision: DatePickerPrecision
): string => {
  if (!value) {
    return "";
  }

  if (precision === "year" && /^\d{4}$/.test(value)) {
    return `${value}-01-01`;
  }

  if (precision === "month" && /^\d{1,2}\/\d{4}$/.test(value)) {
    const [month, year] = value.split("/");
    return `${year}-${month.padStart(2, "0")}`;
  }

  const monthYearMatch = /^(\d{1,2})\/(\d{4})$/.exec(value);
  if (monthYearMatch) {
    const month = monthYearMatch[1].padStart(2, "0");
    return `${monthYearMatch[2]}-${month}-01`;
  }

  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : "";
};

export const parseInputDate = (
  value: string,
  precision: DatePickerPrecision
): Date | null => {
  if (precision === "month") {
    const match = /^(\d{4})-(\d{2})$/.exec(value);
    if (!match) {
      return null;
    }

    return new Date(Number(match[1]), Number(match[2]) - 1, 1, 12);
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }

  return new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
    12
  );
};

export const isPickerValueBefore = (
  value: string,
  otherValue: string,
  precision: DatePickerPrecision
): boolean => {
  const date = parsePickerValue(value, precision);
  const otherDate = parsePickerValue(otherValue, precision);

  if (precision === "year") {
    return date.getFullYear() < otherDate.getFullYear();
  }

  return (
    date.getFullYear() * 12 + date.getMonth() <
    otherDate.getFullYear() * 12 + otherDate.getMonth()
  );
};

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
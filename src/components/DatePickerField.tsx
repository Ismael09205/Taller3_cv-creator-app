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

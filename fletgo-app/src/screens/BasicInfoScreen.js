import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useUserMode } from '../context/UserModeContext';

export function BasicInfoScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const { updateDriverVerification } = useUserMode();

  const validateDate = (text) => {
    // Permitir solo números y /
    const cleaned = text.replace(/[^\d/]/g, '');
    
    // Formatear automáticamente como DD/MM/AAAA
    let formatted = cleaned;
    if (cleaned.length >= 2 && !cleaned.includes('/')) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    if (cleaned.length >= 5 && cleaned.split('/').length === 2) {
      const parts = cleaned.split('/');
      formatted = parts[0] + '/' + parts[1].slice(0, 2) + '/' + parts[1].slice(2);
    }

    setBirthDate(formatted);
  };

  const handleSave = () => {
    if (!fullName.trim() || !email.trim() || !birthDate.trim()) {
      alert('Por favor complete todos los campos');
      return;
    }

    // Validar formato de fecha DD/MM/AAAA
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!datePattern.test(birthDate)) {
      alert('Por favor ingrese una fecha válida en formato DD/MM/AAAA');
      return;
    }
    
    updateDriverVerification('basicInfo', true);
    navigation.navigate('DriverVerification');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('DriverVerification')}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Información Básica</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formIcon}>
          <MaterialCommunityIcons name="account-edit" size={64} color={colors.primary} />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre Completo</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Ingrese su nombre completo"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Fecha de nacimiento</Text>
          <TextInput
            style={styles.input}
            value={birthDate}
            onChangeText={validateDate}
            placeholder="DD/MM/AAAA"
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Ingrese su correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>GUARDAR</Text>
        </TouchableOpacity>

        <Text style={styles.helpText}>
          Si tiene preguntas, por favor, contacte servicio de asistencia.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBg,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formIcon: {
    alignItems: 'center',
    marginVertical: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.inputBg,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#00BCD4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  helpText: {
    marginTop: 16,
    textAlign: 'center',
    color: colors.text,
    opacity: 0.7,
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useUserMode } from '../context/UserModeContext';

export function LicenseScreen({ navigation }) {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const { updateDriverVerification } = useUserMode();

  const handleSave = () => {
    if (!frontImage || !backImage) {
      alert('Por favor suba ambas imágenes de la licencia');
      return;
    }
    
    updateDriverVerification('driversLicense', true);
    navigation.navigate('DriverVerification');
  };

  const handleImageUpload = (side) => {
    // Aquí iría la lógica para subir imágenes
    // Por ahora solo simularemos que se subió una imagen
    if (side === 'front') {
      setFrontImage('placeholder');
    } else {
      setBackImage('placeholder');
    }
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
        <Text style={styles.headerTitle}>Licencia de Conducir</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.imageSection}>
          <Text style={styles.imageTitle}>Licencia de Conducir (frente)</Text>
          <TouchableOpacity 
            style={[styles.uploadButton, frontImage && styles.uploadComplete]}
            onPress={() => handleImageUpload('front')}
          >
            {frontImage ? (
              <MaterialCommunityIcons name="check-circle" size={32} color={colors.darkGreen} />
            ) : (
              <MaterialCommunityIcons name="cloud-upload" size={32} color={colors.text} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.imageSection}>
          <Text style={styles.imageTitle}>Licencia de Conducir (parte trasera)</Text>
          <TouchableOpacity 
            style={[styles.uploadButton, backImage && styles.uploadComplete]}
            onPress={() => handleImageUpload('back')}
          >
            {backImage ? (
              <MaterialCommunityIcons name="check-circle" size={32} color={colors.darkGreen} />
            ) : (
              <MaterialCommunityIcons name="cloud-upload" size={32} color={colors.text} />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[
            styles.saveButton,
            (!frontImage || !backImage) && styles.saveButtonDisabled
          ]}
          onPress={handleSave}
          disabled={!frontImage || !backImage}
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
  imageSection: {
    marginBottom: 24,
  },
  imageTitle: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
  },
  uploadButton: {
    height: 120,
    backgroundColor: colors.inputBg,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.inputBg,
    borderStyle: 'dashed',
  },
  uploadComplete: {
    backgroundColor: '#F5F5F5',
    borderColor: colors.darkGreen,
    borderStyle: 'solid',
  },
  saveButton: {
    backgroundColor: '#00BCD4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
  },
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
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
    marginBottom: 24,
  },
});

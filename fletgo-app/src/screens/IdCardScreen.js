import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../theme/colors';
import { useUserMode } from '../context/UserModeContext';

export function IdCardScreen({ navigation }) {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const { updateDriverVerification } = useUserMode();

  const takePicture = async (side) => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Se requiere permiso para usar la cámara');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        if (side === 'front') {
          setFrontImage(result.assets[0].uri);
        } else {
          setBackImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo tomar la foto');
    }
  };

  const pickImage = async (side) => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Se requiere permiso para acceder a la galería');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        if (side === 'front') {
          setFrontImage(result.assets[0].uri);
        } else {
          setBackImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
  };

  const showOptions = (side) => {
    Alert.alert(
      'Seleccionar imagen',
      '¿Qué deseas hacer?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Tomar foto', onPress: () => takePicture(side) },
        { text: 'Subir foto', onPress: () => pickImage(side) }
      ],
      { cancelable: true }
    );
  };

  const handleSave = () => {
    if (!frontImage || !backImage) {
      Alert.alert('Error', 'Por favor suba ambas imágenes de la identificación');
      return;
    }
    updateDriverVerification('idCard', true);
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
        <Text style={styles.headerTitle}>Identificación</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.imageSection}>
          <Text style={styles.imageTitle}>Tarjeta de Identificación (frente)</Text>
          <TouchableOpacity 
            style={[styles.uploadButton, frontImage && styles.uploadComplete]}
            onPress={() => showOptions('front')}
          >
            {frontImage ? (
              <Image source={{ uri: frontImage }} style={styles.previewImage} />
            ) : (
              <View style={styles.placeholder}>
                <MaterialCommunityIcons name="camera-plus" size={40} color="#666" />
                <Text style={styles.placeholderText}>Toca para agregar foto</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.imageSection}>
          <Text style={styles.imageTitle}>Tarjeta de Identificación (parte trasera)</Text>
          <TouchableOpacity 
            style={[styles.uploadButton, backImage && styles.uploadComplete]}
            onPress={() => showOptions('back')}
          >
            {backImage ? (
              <Image source={{ uri: backImage }} style={styles.previewImage} />
            ) : (
              <View style={styles.placeholder}>
                <MaterialCommunityIcons name="camera-plus" size={40} color="#666" />
                <Text style={styles.placeholderText}>Toca para agregar foto</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.saveButton, (!frontImage || !backImage) && styles.saveButtonDisabled]}
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
    fontWeight: '500',
    color: colors.text,
    marginBottom: 12,
  },
  uploadButton: {
    height: 200,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  uploadComplete: {
    borderStyle: 'solid',
    borderColor: colors.darkGreen,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
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

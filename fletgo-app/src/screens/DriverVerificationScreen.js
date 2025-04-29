import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useUserMode } from '../context/UserModeContext';

const VerificationItem = ({ title, icon = "cloud-upload", onPress, isCompleted }) => (
  <TouchableOpacity 
    style={[
      styles.itemContainer,
      isCompleted && styles.itemCompleted
    ]} 
    onPress={onPress}
  >
    <View style={styles.itemContent}>
      <MaterialCommunityIcons 
        name={isCompleted ? "check-circle" : icon} 
        size={24} 
        color={isCompleted ? colors.darkGreen : colors.text} 
      />
      <Text style={[
        styles.itemText,
        isCompleted && styles.itemTextCompleted
      ]}>
        {title}
      </Text>
    </View>
    <MaterialCommunityIcons 
      name="chevron-right" 
      size={24} 
      color={isCompleted ? colors.darkGreen : colors.text} 
    />
  </TouchableOpacity>
);

export function DriverVerificationScreen({ navigation }) {
  const { 
    driverVerificationData, 
    checkVerificationStatus, 
    completeDriverRegistration 
  } = useUserMode();

  const handleSubmit = () => {
    if (completeDriverRegistration()) {
      navigation.goBack();
    } else {
      // Mostrar mensaje de campos faltantes
      alert('Por favor complete todos los campos requeridos');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verificación</Text>
      </View>

      <ScrollView style={styles.content}>
        <VerificationItem 
          title="Información básica"
          icon="account-outline"
          onPress={() => navigation.navigate('BasicInfo')}
          isCompleted={driverVerificationData.basicInfo}
        />
        <VerificationItem 
          title="Tarjeta de identificación"
          icon="card-account-details-outline"
          onPress={() => navigation.navigate('IdCard')}
          isCompleted={driverVerificationData.idCard}
        />
        <VerificationItem 
          title="Licencia de conducir"
          icon="car-key"
          onPress={() => navigation.navigate('BasicInfo')}
          isCompleted={driverVerificationData.driversLicense}
        />
        <VerificationItem 
          title="Carta de antecedentes Penales/Policiales"
          icon="file-document-outline"
          onPress={() => navigation.navigate('BasicInfo')}
          isCompleted={driverVerificationData.backgroundCheck}
        />
        <VerificationItem 
          title="Información acerca del vehículo"
          icon="car-outline"
          onPress={() => navigation.navigate('BasicInfo')}
          isCompleted={driverVerificationData.vehicleInfo}
        />
        <VerificationItem 
          title="Cuenta Bancaria"
          icon="bank-outline"
          onPress={() => navigation.navigate('BasicInfo')}
          isCompleted={driverVerificationData.bankAccount}
        />

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            Al tocar «Enviar», acepto los Términos y condiciones, así como reconozco y acepto el procesamiento y la transferencia de datos personales de acuerdo con la Política de privacidad
          </Text>
        </View>

        <TouchableOpacity 
          style={[
            styles.acceptButton,
            !checkVerificationStatus().isComplete && styles.acceptButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!checkVerificationStatus().isComplete}
        >
          <Text style={styles.acceptButtonText}>ACEPTAR</Text>
        </TouchableOpacity>
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
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBg,
  },
  itemCompleted: {
    backgroundColor: '#F5F5F5',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemText: {
    marginLeft: 16,
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  itemTextCompleted: {
    color: colors.darkGreen,
  },
  termsContainer: {
    padding: 16,
    marginTop: 16,
  },
  termsText: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.7,
    textAlign: 'center',
  },
  acceptButton: {
    backgroundColor: '#00BCD4',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import React, { createContext, useContext, useState } from 'react';

const UserModeContext = createContext();

export function UserModeProvider({ children }) {
  const [isDriverMode, setIsDriverMode] = useState(false);
  const [isDriverRegistered, setIsDriverRegistered] = useState(false);
  const [driverVerificationData, setDriverVerificationData] = useState({
    basicInfo: false,
    idCard: false,
    driversLicense: false,
    backgroundCheck: false,
    vehicleInfo: false,
    bankAccount: false
  });

  const toggleDriverMode = (navigation) => {
    if (!isDriverMode && !isDriverRegistered) {
      // Si intenta cambiar a modo conductor y no está registrado,
      // la navegación se maneja en el DrawerContent
      return;
    }
    setIsDriverMode(prev => !prev);
  };

  const updateDriverVerification = (field, value) => {
    setDriverVerificationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const completeDriverRegistration = () => {
    // Verificar que todos los campos requeridos estén completos
    const isComplete = Object.values(driverVerificationData).every(value => value);
    if (isComplete) {
      setIsDriverRegistered(true);
      setIsDriverMode(true);
      return true;
    }
    return false;
  };

  const checkVerificationStatus = () => {
    return {
      isComplete: Object.values(driverVerificationData).every(value => value),
      data: driverVerificationData
    };
  };

  return (
    <UserModeContext.Provider 
      value={{ 
        isDriverMode,
        isDriverRegistered,
        driverVerificationData,
        toggleDriverMode,
        updateDriverVerification,
        completeDriverRegistration,
        checkVerificationStatus
      }}
    >
      {children}
    </UserModeContext.Provider>
  );
}

export function useUserMode() {
  const context = useContext(UserModeContext);
  if (!context) {
    throw new Error('useUserMode must be used within a UserModeProvider');
  }
  return context;
}

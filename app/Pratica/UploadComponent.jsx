import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Alert,
  Platform,
  PermissionsAndroid
} from "react-native";

const UploadImage = ({ onImageSelect }) => {
  const [imageUri, setImageUri] = useState(null);

  // Solicitar permissão para acessar a câmera no Android
  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Permissão para usar a câmera",
          message: "O app precisa de acesso à câmera para tirar fotos.",
          buttonNeutral: "Perguntar depois",
          buttonNegative: "Cancelar",
          buttonPositive: "OK"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  // Função para simular a captura de imagem
  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      Alert.alert("Permissão negada", "Não foi possível acessar a câmera.");
      return;
    }

    // Simular captura de imagem
    const simulatedUri = "https://via.placeholder.com/200"; // URI simulada
    setImageUri(simulatedUri);
    if (onImageSelect) onImageSelect(simulatedUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Upload de Imagem</Text>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text>Nenhuma imagem selecionada</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Abrir Câmera" onPress={openCamera} />
        <Button
          title="Selecionar Imagem"
          onPress={() => Alert.alert("Funcionalidade não implementada")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10
  }
});

export default UploadImage;

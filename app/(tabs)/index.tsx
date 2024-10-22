import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert, Animated } from 'react-native'; 
import { Audio } from 'expo-av';

export default function HomeScreen() {
  const [rotation, setRotation] = useState(new Animated.Value(0)); 
  const [scale, setScale] = useState(new Animated.Value(1));
  const [sound, setSound] = useState(null);

  async function playSound() {
    if (sound) {
      await sound.unloadAsync();
    }

    console.log('Loading Sound');
    const { sound: newSound } = await Audio.Sound.createAsync(
      require('@/assets/pedro-pedro-pe.mp3')
    );
    setSound(newSound);

    console.log('Playing Sound');
    await newSound.playAsync();
  }

  const rotateImage = () => {
    Animated.timing(rotation, {
      toValue: 3, 
      duration: 10000, 
      useNativeDriver: true, // Optimización nativa
    }).start(() => {
      rotation.setValue(0); 
    });
  };
  const scaleImage = () => {
    scale.setValue(1);
    Animated.timing(scale, {
      toValue: 2,
      duration: 10000,
      useNativeDriver: true,
    }).start(() => {
      scale.setValue(1); 
    });
  };

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>
        Pedro Pedro pedro pe
      </Text>
      <Animated.Image
        source={require('@/assets/images/Pedro.jpeg')} 
        style={[styles.myImage, { transform: [{ rotate: spin }, { scale: scale }] }]} 
      /> 
      <View style={styles.pedroButon}>
        <Button
          color='brown' 
          title="Press me for Pedro pedro..."
          onPress={() => {
            rotateImage();
            scaleImage(); 
            playSound();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column', // Para que el texto y la imagen estén en columna
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  titleText: {
    fontSize: 50,  // Tamaño de fuente para el texto
    fontWeight: 'bold',  // Estilo de texto en negrita
    color: '#000',  // Color del texto (negro)
  },
  myImage: {
    width: 200,  // Ancho de la imagen
    height: 200, // Alto de la imagen
    marginTop: 20,  // Espacio superior entre el texto y la imagen
    borderRadius: 100, // Hace la imagen redonda (opcional)
  },
  pedroButon: {
    marginTop: 50, 
  }
});

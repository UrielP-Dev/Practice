import React, { useState } from 'react';
import { Audio } from 'expo-av';
import { View, Text, StyleSheet, Button, Animated } from 'react-native';

export default function TabTwoScreen() {
  const [rotation, setRotation] = useState(new Animated.Value(0)); 
  const [scale, setScale] = useState(new Animated.Value(1));
  const [mirror, setMirror] = useState(new Animated.Value(1)); // Animación para el efecto espejo
  const [sound, setSound] = useState<Audio.Sound | null>(null); 

  async function playSound() {
    if (sound) {
      await sound.unloadAsync();
    }

    console.log('Loading Sound');
    const { sound: newSound } = await Audio.Sound.createAsync(
      require('@/assets/Ouia.mp3')
    );
    setSound(newSound);

    console.log('Playing Sound');
    await newSound.playAsync();
  }

  const rotateImage = () => {
    Animated.timing(rotation, {
      toValue: 3, 
      duration: 10000, 
      useNativeDriver: true, 
    }).start(() => {
      rotation.setValue(0); 
    });
  };

  const scaleImage = () => {
    scale.setValue(1);
    Animated.timing(scale, {
      toValue: 2,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      scale.setValue(1); 
    });
  };

  const mirrorImage = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(mirror, {
          toValue: -1, // Cambia a reflejo horizontal
          duration: 50, // Duración de cada cambio (en ms)
          useNativeDriver: true,
        }),
        Animated.timing(mirror, {
          toValue: 1, // Vuelve al estado normal
          duration: 5, // Duración del reflejo inverso
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: 20, // El número de veces que se repite la animación (3 loops completos)
      }
    ).start();
  };

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>
        Auia auia 
      </Text>
      <Animated.Image
        source={require('@/assets/images/Auai.png')} 
        style={[styles.myImage, { 
          transform: [
            { rotate: spin }, 
            { scale: scale }, 
            { scaleX: mirror } // Aplica la animación espejo
          ] 
        }]} 
      /> 
      <View style={styles.pedroButton}>
        <Button
          color='brown' 
          title="Press me for..."
          onPress={() => {
            mirrorImage(); // Llamamos la animación de espejo con loop
            playSound();
          }}  
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  titleText: {
    fontSize: 50, 
    fontWeight: 'bold', 
    color: '#000', 
  },
  myImage: {
    width: 200, 
    height: 200, 
    marginTop: 20, 
    borderRadius: 100, 
  },
  pedroButton: {
    marginTop: 50, 
  }
});

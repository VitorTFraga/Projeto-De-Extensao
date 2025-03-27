import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import {GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const buttonWidth = screenWidth * 0.7;

const trainingSchedule = {
  segunda: [
    { name: 'Kung Fu/Sanda', time: '18:00' },
    { name: 'Muay Thai', time: '19:15' },
  ],
  terça: [
    { name: 'Kung Fu/Sanda', time: '10:00' },
    { name: 'Kung Fu/Sanda', time: '19:30' },
    { name: 'Muay Thai', time: '09:00' },
    { name: 'Muay Thai', time: '18:00' },
  ],
  quarta: [
    { name: 'Kung Fu/Sanda', time: '18:00' },
    { name: 'Muay Thai', time: '19:15' },
  ],
  quinta: [
    { name: 'Kung Fu/Sanda', time: '10:00' },
    { name: 'Kung Fu/Sanda', time: '19:30' },
    { name: 'Muay Thai', time: '09:00' },
    { name: 'Muay Thai', time: '18:00' },
  ],
  sexta: [
    { name: 'Kung Fu/Sanda', time: '18:00' },
    { name: 'Muay Thai', time: '19:15' },
  ],
};

const getTodayTrainings = () => {
  const days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const today = new Date().getDay();
  return trainingSchedule[days[today]] || [];
};

const timeDifferenceInMinutes = (trainTime) => {
  const now = new Date();
  const [hours, minutes] = trainTime.split(':').map(Number);
  const trainDate = new Date();
  trainDate.setHours(hours);
  trainDate.setMinutes(minutes);
  
  const diff = trainDate - now;
  return diff / 1000 / 60;
};

const DraggableButtons = () => {
  const router = useRouter();
  const translateX = useSharedValue(0);
  const lastOffset = useSharedValue(0);

  const trainingsToday = getTodayTrainings();

  const panGesture = Gesture.Pan()
    .onStart(() => {
      lastOffset.value = translateX.value;
    })
    .onUpdate((event) => {
      const maxTranslation = 0;
      const minTranslation = -(buttonWidth * (trainingsToday.length - 1));

      const newTranslateX = event.translationX + lastOffset.value;

      translateX.value = Math.min(Math.max(newTranslateX, minTranslation), maxTranslation);
    })
    .onEnd(() => {
      lastOffset.value = translateX.value;
      translateX.value = withSpring(lastOffset.value);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (    
    <View style={styles.container}>
      <View style={styles.grayBackground} />

      <Text style={styles.textAboveButtons}>Proximos Treinos:</Text>

      <GestureDetector gesture={panGesture}>
        
        <Animated.View style={[styles.buttonContainer, animatedStyle]}>
        {trainingsToday.map((training, index) => {
            const minutesToTraining = timeDifferenceInMinutes(training.time);
            const isDisabled = minutesToTraining < 15;
            const buttonStyle = isDisabled ? styles.buttonDisabled : styles.button;
            const buttonText = isDisabled
              ? `${training.name} - ${training.time}`
              : `${training.name} - ${training.time}`;

            return (
              <TouchableOpacity
                key={index}
                style={buttonStyle}
                onPress={() => {
                  if (!isDisabled) {
                    router.push(`/CheckIn?treino=${training.name}&horario=${training.time}`);
                  }
                }}
                disabled={isDisabled}
              >
                <Text style={styles.textButton}>{buttonText}</Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default DraggableButtons;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 90,
  },
  grayBackground: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: screenHeight / 3,
    backgroundColor: '#D3D3D3',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: buttonWidth * 1.4,
    zIndex: 1,
    marginTop: 3,
  },
  button: {
    width: buttonWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(212, 122, 122)',
    padding: 60,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonDisabled: {
    width: buttonWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(184, 179, 179)',  
    padding: 60,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  textButton: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textAboveButtons: {
    fontSize: 26,
    fontWeight: 'bold',
    marginRight:150,
    marginTop: 20,
  },
});


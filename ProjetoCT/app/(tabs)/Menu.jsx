import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const buttonWidth = screenWidth * 0.7;

// Lista de treinos organizados por dia da semana
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

// Obtém o dia atual e mapeia para os treinos correspondentes
const getTodayTrainings = () => {
  const days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const today = new Date().getDay();
  return trainingSchedule[days[today]] || [];
};

const DraggableButtons = () => {
  const navigation = useNavigation(); // Hook para navegação
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
    <GestureHandlerRootView style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.grayBackground} />

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.buttonContainer, animatedStyle]}>
            {trainingsToday.map((training, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => navigation.navigate('checkIn', { treino: training.name, horario: training.time })}
              >
                <Text style={styles.textButton}>{`${training.name} - ${training.time}`}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
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
    marginTop: 59,
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
  textButton: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


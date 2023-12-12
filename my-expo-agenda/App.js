import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, FlatList } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import useCalendar from '@atiladev/usecalendar';

import {
  AgendaItem,
  Header,
  ModalNewEvent,
  ModalError,
  ModalRemove,
  ModalNoCalendar,
} from './components';

import { Calendar } from 'expo-calendar';

const App = () => {
  const [granted, setGranted] = useState(false);
  const calendarName = 'my-expo-agenda';
  const {
    getPermission,
    createCalendar,
    addEventsToCalendar,
    deleteCalendar,
    openSettings,
    getEvents,
    getCalendarId,
  } = useCalendar(calendarName, 'purple', calendarName);

  const askPermission = async () => {
    const isGranted = await getPermission();
    setGranted(isGranted);
  };

  useEffect(() => {
    askPermission();
  }, []);

  const createCalAndEvent = async () => {
    // Assuming 'state' is declared and contains selectedDate and eventTitle
    if (granted) {
      const calendarId = await getCalendarId();
      if (!calendarId) {
        await createCalendar();
      }

      if (state.selectedDate) {
        try {
          addEventsToCalendar(
            state.eventTitle,
            new Date(state.selectedDate.toString()),
            new Date(state.selectedDate.toString())
          );
          const listEvent = await getEvents();
          dispatch({ type: 'setEvents', payload: listEvent });
        } catch (e) {
          // Handle errors
        }
      }
    } else {
      openSettings();
    }
  };

  const removeCalendar = () => deleteCalendar();

  return (
    <View style={styles.container}>
      {/* Your components here */}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

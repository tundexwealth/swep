import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, View } from 'react-native';
import useCalendar from '@atiladev/usecalendar';

const YourComponent = () => {
  const {
    getPermission,
    createCalendar,
    addEventsToCalendar,
    deleteCalendar,
    openSettings,
    isThereEvents,
  } = useCalendar('MyExpoApp', '#5351e0', 'Calendar_Example_Name');

  const createCalAndEvent = async () => {
    const granted = await getPermission();

    if (granted) {
      await createCalendar();
      let eventExists = await isThereEvents();

      if (!eventExists) {
        try {
          addEventsToCalendar('Event title', new Date(), new Date());
        } catch (e) {
          // Something went wrong
        }
      }
    } else {
      openSettings();
    }
  };

  const RemoveCalendar = () => deleteCalendar();

  return (
    <View style={{ marginTop: 100 }}>
      <Button title='Create' onPress={createCalAndEvent} />
      <View style={{ marginTop: 60 }} />
      <Button title='Remove' onPress={RemoveCalendar} />
      <StatusBar style='auto' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Your styles here
  },
});

export default YourComponent;

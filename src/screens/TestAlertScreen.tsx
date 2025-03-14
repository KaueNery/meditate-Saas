import React from 'react';
import { View, Button, Alert } from 'react-native';

const TestAlertScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Show Alert"
        onPress={() =>
          setTimeout(() => {
            Alert.alert('Test Alert', 'This is an Alert.alert() test');
          }, 100)
        }
      />
    </View>
  );
};

export default TestAlertScreen;

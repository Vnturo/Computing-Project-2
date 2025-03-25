import React from 'react';
import { View, Text, Button, StyleSheet, Linking, Alert } from 'react-native';

const EmailScreen = () => {
  const openOutlook = () => {
    //Open default email service
    const emailUrl = 'mailto:'

    Linking.canOpenURL(emailUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(emailUrl);
        } else {
          Alert.alert(
            "Cannot find email app",
            "Install Outlook or setup a default mail app."
          );
        }
      })
      .catch((err) => console.error("Error with opening email:", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check Your Email</Text>
      <Button title="Open Outlook" onPress={openOutlook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#257f66',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
});

export default EmailScreen;

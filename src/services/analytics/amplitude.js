import * as Amplitude from 'expo-analytics-amplitude';

export const setAmplitudeUserData = (user, event) => {
  Amplitude.setUserId(user.id.toString());
  Amplitude.setUserProperties({
    email: user.email,
    name: user.firstName + ' ' + user.lastName,
  });
  if (event) {
    Amplitude.logEvent(event);
  }
};

export const setAmplitudeEventWithProperties = (event, properties) => {
  try {
    Amplitude.logEventWithProperties(event, properties);
  } catch (e) {
    Amplitude.logEvent(event);
    console.log(e.message);
  } 
};
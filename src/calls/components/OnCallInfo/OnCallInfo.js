import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';

import HangupButton from '../HangupButton/HangupButton';
import Timer from '../Timer/Timer';

const styles = StyleSheet.create({
  container: { alignItems: 'center', flex: 1 },
  ongoingCall: {
    fontSize: 20,
    opacity: 0.6,
    position: 'absolute',
    top: '20%'
  },
  remoteInfo: {
    alignItems: 'center',
    position: 'absolute',
    transform: [{ translateY: 0.5 }],
    top: '30%'
  },
  remoteName: {
    fontSize: 25
  },
  remoteNumber: {
    fontSize: 20
  }
});

function OnCallInfo({ remote }) {
  return (
    <View style={styles.container}>
      <Text style={styles.ongoingCall}>ONGOING CALL WITH</Text>
      <View style={styles.remoteInfo}>
        {remote.name && <Text style={styles.remoteName}>{remote.name}</Text>}
        <Text style={styles.remoteNumber}>{remote.phoneNumber}</Text>
        <Timer />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: '10%'
        }}
      >
        <HangupButton />
      </View>
    </View>
  );
}

OnCallInfo.propTypes = {
  remote: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired
  }).isRequired
};

export default OnCallInfo;

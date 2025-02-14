import * as React from 'react';
import { Html, Head, Body, Container, Heading, Text, Link } from '@react-email/components';

const EmergencyEmail = ({ emergency }) => {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', padding: '20px' }}>
        <Container style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
          <Heading as="h2" style={{ color: '#d9534f' }}>🚨 Emergency Alert!</Heading>
          <Text>Hello,</Text>
          <Text>The following emergency has been reported by <strong>{emergency.userId}</strong>:</Text>

          <Text><strong>Location:</strong> {emergency.address}</Text>
          <Text><strong>Coordinates:</strong> {emergency.location.latitude}, {emergency.location.longitude}</Text>
          <Text><strong>Battery Level:</strong> {emergency.batteryLevel}%</Text>
          <Text><strong>Network Status:</strong> {emergency.networkInfo.isConnected ? 'Connected' : 'Disconnected'}</Text>
          <Text><strong>Fall Detected:</strong> {emergency.fallDetected ? 'Yes' : 'No'}</Text>
          <Text><strong>Impact Detected:</strong> {emergency.impactDetected ? 'Yes' : 'No'}</Text>
          <Text><strong>Altitude Change:</strong> {emergency.altitudeChange ? 'Yes' : 'No'}</Text>

          <Text>You can listen to the emergency recording here:</Text>
          <Link href={emergency.recordingUri} style={{ color: '#d9534f', fontWeight: 'bold' }}>
            Listen to Recording
          </Link>

          <Text>Please take immediate action if necessary.</Text>
          <Text>Stay Safe.</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default EmergencyEmail;

/* eslint-disable react/no-unescaped-entities */

import * as React from 'react';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import { Section } from '@react-email/section';
import { Container } from '@react-email/container';

export default function OTPEmail(props) {
  const { firstName, otp } = props;

  return (
    <Html lang="en">
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Email Verification</Text>
          <Text style={paragraph}>Hello {firstName},</Text>
          <Text style={paragraph}>
            Your verification code is:
          </Text>
          <Text style={otpCode}>{otp}</Text>
          <Text style={paragraph}>
            This code will expire in 10 minutes. If you didn&apos;t request this code, 
            please ignore this email.
          </Text>
        </Container>
      </Section>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  padding: '40px 0',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  borderRadius: '5px',
  margin: '0 auto',
  padding: '20px',
  maxWidth: '480px',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#1a1a1a',
  marginBottom: '20px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#4a5568',
  margin: '16px 0',
};

const otpCode = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#2563eb',
  textAlign: 'center',
  letterSpacing: '0.25em',
  padding: '20px',
  margin: '20px 0',
  backgroundColor: '#f8fafc',
  borderRadius: '4px',
};

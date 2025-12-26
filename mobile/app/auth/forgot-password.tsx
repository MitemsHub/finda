import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TEAL = '#14B8A6';
const CHARCOAL = '#121212';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReset = () => {
    // Logic to send reset email would go here
    setIsSubmitted(true);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            {/* Icon Header */}
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name={isSubmitted ? "mail-unread" : "lock-open"} size={32} color={TEAL} />
              </View>
            </View>

            <Text style={styles.title}>
              {isSubmitted ? 'Check your email' : 'Forgot Password?'}
            </Text>
            <Text style={styles.subtitle}>
              {isSubmitted 
                ? `We've sent a password reset link to ${email}`
                : "No worries! Enter your email address below and we'll send you a link to reset your password."}
            </Text>

            {!isSubmitted ? (
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="you@example.com"
                      placeholderTextColor="#ccc"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleReset}>
                  <Text style={styles.submitButtonText}>Send Reset Link</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.form}>
                <TouchableOpacity style={styles.submitButton} onPress={() => router.push('/auth/sign-in')}>
                  <Text style={styles.submitButtonText}>Back to Sign In</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.resendButton} onPress={() => setIsSubmitted(false)}>
                  <Text style={styles.resendText}>Didn't receive email? <Text style={styles.resendLink}>Resend</Text></Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Back to Login */}
            {!isSubmitted && (
              <View style={styles.footerRow}>
                <Ionicons name="arrow-back" size={16} color="#6B7280" />
                <Link href="/auth/sign-in" asChild>
                  <TouchableOpacity>
                    <Text style={styles.footerLink}>Back to Sign In</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 480,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0FDFA', // Light teal bg
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  title: {
    fontSize: 24,
    color: CHARCOAL,
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'PlayfairDisplay_700Bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
    fontFamily: 'Inter_500Medium',
  },
  form: {
    width: '100%',
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: CHARCOAL,
    marginBottom: 2,
    fontFamily: 'Inter_600SemiBold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 54,
    backgroundColor: 'white',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: CHARCOAL,
    fontFamily: 'Inter_500Medium',
    outlineStyle: 'none',
  },
  submitButton: {
    backgroundColor: TEAL,
    borderRadius: 14,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: TEAL,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    gap: 8,
  },
  footerLink: {
    color: '#6B7280',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  resendButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  resendText: {
    color: '#6B7280',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  resendLink: {
    color: TEAL,
    fontFamily: 'Inter_700Bold',
  },
});

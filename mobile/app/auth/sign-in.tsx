import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Logo } from '../../components/Logo';

const TEAL = '#14B8A6';
const CHARCOAL = '#121212';
const INDIGO = '#6366F1';

export default function SignIn() {
  const router = useRouter();
  const { initialRole } = useLocalSearchParams<{ initialRole: string }>();
  const [role, setRole] = useState<'user' | 'business'>('user');

  React.useEffect(() => {
    if (initialRole === 'business') {
      setRole('business');
    } else if (initialRole === 'user') {
      setRole('user');
    }
  }, [initialRole]);

  const handleSignIn = () => {
    // Navigate to the main app (Explore tab)
    router.replace('/(tabs)/explore');
  };

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header Removed */}
          
          {/* Main Card */}
          <View style={styles.card}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              {role === 'business' ? 'Sign in to manage your business' : 'Sign in to discover amazing businesses'}
            </Text>

            {/* Role Toggle */}
            <View style={styles.roleContainer}>
              <TouchableOpacity
                style={[styles.roleButton, role === 'user' && styles.roleButtonActive]}
                onPress={() => setRole('user')}
              >
                <Ionicons name="person" size={16} color={role === 'user' ? CHARCOAL : '#666'} />
                <Text style={[styles.roleText, role === 'user' && styles.roleTextActive]}>User</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.roleButton, role === 'business' && styles.roleButtonActive]}
                onPress={() => setRole('business')}
              >
                <Ionicons name="briefcase" size={16} color={role === 'business' ? TEAL : '#666'} />
                <Text style={[styles.roleText, role === 'business' && styles.roleTextActive]}>Business Owner</Text>
              </TouchableOpacity>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Conditional Fields for Business */}
              {role === 'business' ? (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Business Email</Text>
                    <View style={styles.inputContainer}>
                      <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="business@company.com"
                        placeholderTextColor="#ccc"
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>
                  </View>
                </>
              ) : (
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
                    />
                  </View>
                </View>
              )}

              {/* Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#ccc"
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Remember Me & Forgot Password */}
              <View style={styles.rowBetween}>
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                    {rememberMe && <Ionicons name="checkmark" size={12} color="white" />}
                  </View>
                  <Text style={styles.checkboxLabel}>Remember me</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Link href="/auth/forgot-password" asChild>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                  </Link>
                </TouchableOpacity>
              </View>

              {/* Sign In Button */}
              <TouchableOpacity style={styles.submitButton} onPress={handleSignIn}>
                <Text style={styles.submitButtonText}>
                  {role === 'business' ? 'Sign In to Dashboard' : 'Sign In'}
                </Text>
              </TouchableOpacity>

              {/* Business Upsell (Only on Business Tab) */}
              {role === 'business' && (
                <View style={styles.upsellCard}>
                  <View style={styles.upsellIconBg}>
                    <Ionicons name="storefront" size={20} color="white" />
                  </View>
                  <View style={styles.upsellContent}>
                    <Text style={styles.upsellTitle}>New Business Owner?</Text>
                    <Text style={styles.upsellText}>Register your business and reach thousands of customers</Text>
                    <Link href={{ pathname: "/auth/sign-up", params: { initialRole: 'business' } }} asChild>
                      <TouchableOpacity style={styles.upsellLink}>
                        <Text style={styles.upsellLinkText}>Apply Here</Text>
                        <Ionicons name="arrow-forward" size={14} color={INDIGO} />
                      </TouchableOpacity>
                    </Link>
                  </View>
                </View>
              )}

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or continue with</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login */}
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="google" size={20} color="#EA4335" />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>

              {/* Footer Links */}
              {role === 'user' && (
                <View style={styles.footerRow}>
                  <Text style={styles.footerText}>
                    Don't have an account?{'\u00A0'}
                  </Text>
                  <Link href={{ pathname: "/auth/sign-up", params: { initialRole: 'user' } }} asChild>
                    <TouchableOpacity>
                      <Text style={[styles.footerLink, { color: TEAL }]}>Sign Up</Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              )}
            </View>
          </View>

          {/* Legal */}
          <View style={styles.legalContainer}>
            <Text style={styles.legalText}>By continuing, you agree to Finda's </Text>
            <View style={styles.legalRow}>
              <TouchableOpacity><Text style={styles.legalLink}>Terms of Service</Text></TouchableOpacity>
              <Text style={styles.legalText}> and </Text>
              <TouchableOpacity><Text style={styles.legalLink}>Privacy Policy</Text></TouchableOpacity>
            </View>
          </View>

          {/* Bottom Nav Links */}
          <View style={styles.bottomNav}>
            <Text style={styles.bottomLink}>Help Center</Text>
            <Text style={styles.bottomDot}>•</Text>
            <Text style={styles.bottomLink}>Contact Support</Text>
            <Text style={styles.bottomDot}>•</Text>
            <Text style={styles.bottomLink}>About Finda</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Changed to white for full screen feel
    minHeight: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60, // Add top padding for status bar space
    paddingBottom: 40,
    // justifyContent: 'center', // Allow top alignment
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40, // More space
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 24,
    color: CHARCOAL,
    fontFamily: 'PlayfairDisplay_700Bold',
  },
  headerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    display: 'none', 
  },
  linkText: {
    fontSize: 14,
    color: '#666',
  },
  linkHighlight: {
    color: TEAL,
    fontWeight: '600',
  },
  card: {
    // Removed card shadow/bg styles to make it flat and full
    width: '100%',
  },
  title: {
    fontSize: 28,
    color: CHARCOAL,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'PlayfairDisplay_700Bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    fontFamily: 'Inter_500Medium',
  },
  roleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 6,
    marginBottom: 32,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  roleButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  roleText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter_600SemiBold',
  },
  roleTextActive: {
    color: CHARCOAL,
  },
  form: {
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
    outlineStyle: 'none', // Remove default web outline
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: TEAL,
    borderColor: TEAL,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#4B5563',
    fontFamily: 'Inter_500Medium',
  },
  forgotPassword: {
    fontSize: 14,
    color: TEAL,
    fontFamily: 'Inter_600SemiBold',
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
  upsellCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF', // light indigo tint
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  upsellIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: INDIGO,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upsellContent: {
    flex: 1,
  },
  upsellTitle: {
    fontSize: 14,
    color: CHARCOAL,
    marginBottom: 2,
    fontFamily: 'Inter_700Bold',
  },
  upsellText: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 16,
    marginBottom: 8,
    fontFamily: 'Inter_400Regular',
  },
  upsellLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  upsellLinkText: {
    fontSize: 13,
    color: INDIGO,
    fontFamily: 'Inter_700Bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '500',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    height: 54,
    gap: 12,
    backgroundColor: 'white',
  },
  socialButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: CHARCOAL,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  footerLink: {
    color: TEAL,
    fontWeight: '700',
    fontSize: 14,
  },
  legalContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  legalText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: 'Inter_400Regular',
  },
  legalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legalLink: {
    fontSize: 12,
    color: TEAL,
    fontFamily: 'Inter_500Medium',
  },
  bottomNav: {
    flexDirection: 'row',
    marginTop: 48,
    gap: 12,
    alignItems: 'center',
  },
  bottomLink: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter_500Medium',
  },
  bottomDot: {
    fontSize: 12,
    color: '#D1D5DB',
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Logo } from '../../components/Logo';

const TEAL = '#14B8A6';
const CHARCOAL = '#121212';
const INDIGO = '#6366F1';

export default function SignUp() {
  const router = useRouter();
  const { initialRole } = useLocalSearchParams<{ initialRole: string }>();
  const [role, setRole] = useState<'user' | 'business'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  React.useEffect(() => {
    if (initialRole === 'business') {
      setRole('business');
    } else if (initialRole === 'user') {
      setRole('user');
    }
  }, [initialRole]);

  const handleSignUp = () => {
    // Navigate to verify code
    router.push({
      pathname: '/auth/verify-code',
      params: { email: 'user@example.com' } // Pass actual email state here
    });
  };

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
            <Text style={styles.title}>Join Finda</Text>
            <Text style={styles.subtitle}>
              {role === 'business' ? 'Create your business account and be discovered' : 'Create your account and start discovering'}
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
              
              {/* Business Name Field (Conditional) */}
              {role === 'business' && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Business Name</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="storefront-outline" size={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Your Business Name"
                      placeholderTextColor="#ccc"
                    />
                  </View>
                </View>
              )}

              {/* Name Row */}
              <View style={styles.rowBetween}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>First Name</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="John"
                      placeholderTextColor="#ccc"
                    />
                  </View>
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.label}>Last Name</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Doe"
                      placeholderTextColor="#ccc"
                    />
                  </View>
                </View>
              </View>

              {/* Email (Business or Personal) */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{role === 'business' ? 'Business Email' : 'Email Address'}</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder={role === 'business' ? "business@company.com" : "you@example.com"}
                    placeholderTextColor="#ccc"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Phone Number */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{role === 'business' ? 'Business Phone' : 'Phone Number'}</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="call-outline" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="+1 (555) 123-4567"
                    placeholderTextColor="#ccc"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {/* Business Category (Conditional) */}
              {role === 'business' && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Business Category</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="pricetag-outline" size={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Select Category"
                      placeholderTextColor="#ccc"
                    />
                    <Ionicons name="chevron-down" size={20} color="#999" />
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
                    placeholder="Create a strong password"
                    placeholderTextColor="#ccc"
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm your password"
                    placeholderTextColor="#ccc"
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Business Premium Banner (Conditional) */}
              {role === 'business' && (
                <View style={styles.premiumBanner}>
                  <View style={styles.premiumIconBg}>
                    <Ionicons name="ribbon" size={20} color="white" />
                  </View>
                  <View style={styles.premiumContent}>
                    <Text style={styles.premiumTitle}>Premium Features Available</Text>
                    <Text style={styles.premiumText}>Upgrade to get verified badge, priority listing, and analytics dashboard</Text>
                  </View>
                </View>
              )}

              {/* Terms Checkbox */}
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => setAgreeTerms(!agreeTerms)}
              >
                <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
                  {agreeTerms && <Ionicons name="checkmark" size={12} color="white" />}
                </View>
                <View style={styles.termsTextContainer}>
                  <Text style={styles.checkboxLabel}>I agree to Finda's </Text>
                  <TouchableOpacity><Text style={styles.linkHighlight}>Terms of Service</Text></TouchableOpacity>
                  <Text style={styles.checkboxLabel}>, </Text>
                  <TouchableOpacity><Text style={styles.linkHighlight}>Privacy Policy</Text></TouchableOpacity>
                  {role === 'business' && (
                    <>
                      <Text style={styles.checkboxLabel}>, and </Text>
                      <TouchableOpacity><Text style={styles.linkHighlight}>Business Guidelines</Text></TouchableOpacity>
                    </>
                  )}
                </View>
              </TouchableOpacity>

              {/* Sign Up Button */}
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>
                  {role === 'business' ? 'Create Business Account' : 'Create Account'}
                </Text>
              </TouchableOpacity>

              {/* Already have an account? (Moved Up) */}
              <View style={styles.inlineFooterRow}>
                 <Text style={styles.footerText}>
                   {role === 'business' ? 'Already have a business account? ' : 'Already have an account? '}
                 </Text>
                 <Link href={{ pathname: "/auth/sign-in", params: { initialRole: role } }} asChild>
                   <TouchableOpacity>
                     <Text style={styles.footerLink}>Sign In</Text>
                   </TouchableOpacity>
                 </Link>
              </View>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or sign up with</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login */}
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="google" size={20} color="#EA4335" />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Cross Navigation Footer (Removed) */}
          
          {/* Marketing Opt-in text */}
          <View style={styles.legalContainer}>
            <Text style={styles.legalText}>
              By creating an account, you agree to receive promotional emails from Finda.
              {'\n'}You can unsubscribe at any time.
            </Text>
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
    backgroundColor: 'white',
    minHeight: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  inlineFooterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#6B7280',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  footerLink: {
    color: TEAL,
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
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
    fontSize: 14,
  },
  card: {
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
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginTop: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: TEAL,
    borderColor: TEAL,
  },
  termsTextContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
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
    fontFamily: 'Inter_500Medium',
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
  legalContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  legalText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
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
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  premiumIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: INDIGO,
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumContent: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: CHARCOAL,
    marginBottom: 2,
  },
  premiumText: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 16,
  },
});

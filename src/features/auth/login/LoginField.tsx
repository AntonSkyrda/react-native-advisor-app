import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Controller} from 'react-hook-form';
import type {Control, FieldPath, RegisterOptions} from 'react-hook-form';

import type {LoginFormValues} from './loginForm';

type LoginFieldProps = {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  control: Control<LoginFormValues>;
  error?: string;
  keyboardType?: 'default' | 'email-address';
  label: string;
  name: FieldPath<LoginFormValues>;
  placeholder?: string;
  rightElement?: React.ReactNode;
  rules: RegisterOptions<LoginFormValues, FieldPath<LoginFormValues>>;
  secureTextEntry?: boolean;
  textContentType?: 'username' | 'password';
};

function LoginField({
  autoCapitalize = 'none',
  control,
  error,
  keyboardType = 'default',
  label,
  name,
  placeholder,
  rightElement,
  rules,
  secureTextEntry,
  textContentType,
}: LoginFieldProps): React.JSX.Element {
  const inputRef = React.useRef<TextInput>(null);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {onBlur, onChange, value}}) => (
          <View
            onTouchStart={() => inputRef.current?.focus()}
            style={[styles.inputWrap, error ? styles.inputWrapError : null]}>
            <TextInput
              ref={inputRef}
              autoCapitalize={autoCapitalize}
              autoCorrect={false}
              keyboardType={keyboardType}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder={placeholder}
              placeholderTextColor="#8F9AAB"
              secureTextEntry={secureTextEntry}
              selectionColor="#FF873D"
              style={[styles.input, rightElement ? styles.inputWithIcon : null]}
              textContentType={textContentType}
              value={value}
            />
            {rightElement ? (
              <View style={styles.inputIcon}>{rightElement}</View>
            ) : null}
          </View>
        )}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 18,
  },
  label: {
    marginBottom: 8,
    color: '#6B7280',
    fontSize: 13,
    lineHeight: 17,
  },
  inputWrap: {
    height: 48,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D8DEE8',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  inputWrapError: {
    borderColor: '#FF873D',
  },
  input: {
    height: 46,
    paddingHorizontal: 13,
    color: '#111827',
    fontSize: 13,
    lineHeight: 18,
  },
  inputWithIcon: {
    paddingRight: 46,
  },
  inputIcon: {
    position: 'absolute',
    right: 14,
    height: 46,
    justifyContent: 'center',
  },
  errorText: {
    marginTop: 6,
    color: '#E45F2B',
    fontSize: 11,
    lineHeight: 14,
  },
});

export default LoginField;

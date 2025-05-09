import React from 'react';
import { View, KeyboardTypeOptions } from 'react-native';
import TC_Input from './TC_Input';
import { TC_Dropdown } from './TC_Dropdown';
import { AppButton } from '../components/common/AppButton';

// Updated FormField type
export interface FormField {
  type: 'text' | 'password' | 'dropdown';
  name: string;
  placeholder: string;
  value: string;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  options?: { label: string; value: string }[]; // Only for dropdown
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean; // Optional override for password visibility
  editable?: boolean; // ✅ New prop
}

interface TCFormProps {
  fields: FormField[];
  onChange: (fieldName: string, value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  buttonTitle?: string;
}

const TC_Form: React.FC<TCFormProps> = ({ fields, onChange, onSubmit, loading, buttonTitle = 'Submit' }) => {
  return (
    <View style={{ gap: 16, width: '100%' }}>
      {fields.map((field) => {
        if (field.type === 'dropdown') {
          return (
            <TC_Dropdown
              key={field.name}
              selectedValue={field.value}
              onValueChange={(value) => onChange(field.name, value)}
              options={field.options || []}
              placeholderTextColor="#333"
              textStyle={{ fontSize: 16, color: '#333' }}
              style={{ marginBottom: 8 }}
              editable={field.editable !== false} // ✅ Apply editable logic
            />
          );
        }

        return (
          <TC_Input
            key={field.name}
            placeholder={field.placeholder}
            value={field.value}
            onChangeText={(text) => onChange(field.name, text)}
            keyboardType={field.keyboardType || 'default'}
            autoCapitalize={field.autoCapitalize || 'none'}
            isPassword={field.secureTextEntry !== undefined ? field.secureTextEntry : field.type === 'password'}
            error={field.error}
          />
        );
      })}

      <AppButton title={buttonTitle} loading={loading} onPress={onSubmit} />
    </View>
  );
};

export default TC_Form;
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LanguageSelectionScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const languages = [
    { label: 'English', value: 'english' },
    { label: 'Hindi हिंदी', value: 'hindi' },
    { label: 'Telugu తెలుగు', value: 'telugu' },
    { label: 'Kannada ಕನ್ನಡ', value: 'kannada' },
    { label: 'Tamil தமிழ்', value: 'tamil' },
    { label: 'Malayalam മലയാളം', value: 'malayalam' },
    { label: 'Bengali বাংলা', value: 'bengali' },
  ];

  const handleLanguageSelect = (value: string) => {
    setSelectedLanguage(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Language</Text>
      <Text style={styles.subtitle}>Select one from below</Text>
      <View style={styles.languageList}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.value}
            style={[
              styles.languageOption,
              selectedLanguage === lang.value && styles.selectedOption,
            ]}
            onPress={() => handleLanguageSelect(lang.value)}
          >
            <Text style={styles.languageText}>{lang.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={() => alert(`Selected: ${selectedLanguage}`)}>
        <Text style={styles.nextButtonText}>Next →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  languageList: {
    flex: 1,
    justifyContent: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: '#e0f7fa',
    borderColor: '#00796b',
  },
  languageText: {
    fontSize: 18,
  },
  nextButton: {
    backgroundColor: '#00796b',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LanguageSelectionScreen;

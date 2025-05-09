import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import CommonHeader from '../../component/CommonHeader';
import { AppInput } from '../../component/AppInput';
import { AppButton } from '../../component/AppButton';
import { BASE_URL } from '../../utils/constants';
import { showAlert } from '../../utils/alert/Alert';
import { RootStackParamList } from '../../navigation/Navigations';
import { featureService } from '../../data/service/ApiServiceFactory';

const EditFeature: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'EditFeature'>>();
  const { feature } = route.params || {};

  const [form, setForm] = useState({
    name: feature?.name?.trim() || '',
    description: feature?.description?.trim() || '',
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const trimmedName = form.name.trim();
    const trimmedDesc = form.description.trim();

    if (!trimmedName || !trimmedDesc) {
      showAlert('Validation Error', 'Feature name and description are required.');
      return;
    }

    try {
    
      await  featureService.update(feature.uuid,{ name: trimmedName,description: trimmedDesc});
      showAlert('Success', 'Feature updated successfully');
      navigation.goBack();
    } catch (err: any) {
      console.error('Feature update error:', err.response?.data || err.message);
      showAlert('Error', err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <CommonHeader title="Edit Feature" onBackPress={() => navigation.goBack()} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <AppInput
            placeholder="Feature Name"
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
          />
          <AppInput
            placeholder="Short Description"
            value={form.description}
            onChangeText={(text) => handleChange('description', text)}
          />
          <AppButton title="Update Feature" onPress={handleSubmit} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditFeature;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2', // matches AddFeature outer style
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // card-like container
  },
});

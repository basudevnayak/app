import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import Toolbar from '../../components/Toolbar';
import { TC_InputWText } from '../../component/TC_TextInputWText';
import { AppButton } from '../../components/common/AppButton';
import { updateFeature } from '../../data/service/FeatureService';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Feature } from '../../data/models/Feature';
import { showAlert } from '../../utils/alert/Alert';

type RouteParams = {
  params: {
    feature: Feature;
  };
};

const EditFeatureScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'params'>>();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [command, setCommand] = useState('');
  const [loading, setLoading] = useState(false);

  const feature = route.params?.feature;

  useEffect(() => {
    if (feature) {
      setName(feature.name);
      setDescription(feature.description);
      setCommand(feature.commands?.[0] || '');
    }
  }, [feature]);

  const handleUpdate = async () => {
    if (!name.trim()) {
      showAlert('Validation Error', 'Feature name is required.');
      return;
    }

    try {
      setLoading(true);
      await updateFeature(feature._id, { name, description, commands: [command] });
      showAlert('Success', 'Feature updated successfully');
      navigation.goBack();
    } catch (error: any) {
      showAlert('Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Toolbar title="Create New Feature" showBackButton />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <TC_InputWText
          label={undefined}
          input={{ label: 'Enter feature name', style: {} }}
          value={name}
          setValue={setName}
          keyboardTypeOptions="default"
        />
        <TC_InputWText
          label={undefined}
          input={{ label: 'Enter feature description', style: {} }}
          value={description}
          setValue={setDescription}
          keyboardTypeOptions="default"
        />
        <TC_InputWText
          label={undefined}
          input={{ label: 'Enter feature command', style: {} }}
          value={command}
          setValue={setCommand}
          keyboardTypeOptions="default"
        />
        <View style={{ height: 32 }} />
        <AppButton title="Submit" onPress={handleUpdate} loading={loading} />
      </ScrollView>
    </View>
  );
};

export default EditFeatureScreen;

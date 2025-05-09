import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import EntityList from '../../component/EntityList';
import { Feature } from '../../data/models/Feature';
import Card from '../../component/Card';
import { featureService } from '../../data/service/ApiServiceFactory';
import { RootStackParamList } from '../../navigation/Navigations';
import { sendSMS } from '../../utils/SMSHelper';

const FeatureList = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'FeatureList'>>();
  const {productUuid,isDevice,device} = route.params;
  const handleView = (feature: Feature) => {
    if(isDevice)
    {
      if(feature.input)
      {
        navigation.navigate('SendSMS1', { feature,phoneNumber:device.simNumber });
      }
      else
      {
         const phoneNumber = device.simNumber;
         const message = feature.name;
         sendSMS(phoneNumber,message);
      }
      
    }
    else
    {
      navigation.navigate('FeatureDetail', { feature });
    }
    
    
  };

  const handleEdit = (feature: Feature) => {
    navigation.navigate('EditFeature', { feature, fUuid: feature.uuid });
  };

  const handleDelete = async (fUuid: string) => {
    await featureService.delete(fUuid);
  };

  return (
    <EntityList<Feature>
      title="Feature"
      fetchData={async () => {
        const response = await featureService.filter({
           productUuid}
        ,"filter");
        return response.data || [];
      }}
      deleteData={handleDelete}
      onAddNavigate="AddFeature"
      renderCard={(item, onPress, onEdit, onDelete) => (
        <Card
          item={item}
          onPress={() => handleView(item)}
          onEdit={() => handleEdit(item)}
          onDelete={() => onDelete(item.uuid)}
        />
      )}
    />
  );
};

export default FeatureList;

import React from "react";
import { useNavigation } from "@react-navigation/native";
import { deviceService } from "../../data/service/ApiServiceFactory";
import { Device } from "../../data/models/Device";
import EntityList from "../../component/EntityList";
import Card from "../../component/Card";

const DeviceList: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleView = (device: Device) => {
    navigation.navigate("DeviceDetails", { device });
  };

  const handleEdit = (device: Device) => {
    navigation.navigate("EditDevice", { deviceUuid: device.uuid });
  };

  const handleDelete = async (uuid: string) => {
    await deviceService.delete(uuid);
  };

  return (
    <EntityList<Device>
      title="Device"
      fetchData={async () => {
        const response = await deviceService.getAll();
        return response.data || [];
      }}
      deleteData={handleDelete}
      onAddNavigate="AddDevice"
      renderCard={(item, _onPress, _onEdit, onDelete) => (
        <Card
          item={item}
          onPress={() => handleView(item)}
          onEdit={() => handleEdit(item)}
          onDelete={() => onDelete(item.uuid!)}
        />
      )}
    />
  );
};

export default DeviceList;

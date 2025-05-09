import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { User } from '../../data/models/User';
import EntityList from '../../component/EntityList';
import Card from '../../component/Card';
import { userService } from '../../data/service/ApiServiceFactory';
import { RootStackParamList } from '../../navigation/Navigations';



const UserListDetails = () => {
  const navigation = useNavigation<any>();
   const route = useRoute<RouteProp<RootStackParamList, 'UserListDetails'>>();

   const {role} = route.params; 

  const handleView = (user: User) => {
    navigation.navigate('UserDetail', { user });
  };

  const handleEdit = (user: User) => {
    navigation.navigate('EditUser', {
      user,
      onUserDeleted: async () => {
        navigation.setParams({ refresh: Date.now() }); 
      },
    });
  };
  

  

  const handleDelete = async (uuid: string) => {
    await userService.delete(uuid);
    navigation.setParams({ refresh: Date.now() });
  };

  return (
    <EntityList<User>
      title="User"
      fetchData={async () => {
        const response = await userService.filter({role},'filter');
        return response.data || [];
      }}
      deleteData={handleDelete}
      onAddNavigate="AddUser"
      renderCard={(item, onPress, onEdit, onDelete) => (
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

export default UserListDetails;

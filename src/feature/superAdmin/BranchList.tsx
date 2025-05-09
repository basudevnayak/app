
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Branch } from '../../data/models/Branch';
import { branchService } from '../../data/service/ApiServiceFactory';
import Card from '../../component/Card';
import EntityList from '../../component/EntityList';
import { RootStackParamList } from '../../navigation/Navigations';

const BranchList = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'BranchList'>>();
  
  const {bankUuid} =route.params;
  const handleView = (item: Branch) => {
    navigation.navigate('BranchDetails', { branch: item });
  };

  const handleEdit = (item: Branch) => {
    navigation.navigate('EditBranch', {
      branch: item,
    });
  };

  const handleDelete = async (uuid: string) => {
    try {
      await branchService.delete(uuid);
    }
    catch (error) {
      console.error('Failed to delete branch:', error);
    }
  };
  const fetchBranches = async (): Promise<Branch[]> => {
    try {
      const response = await branchService.filter({ bankUuid }, 'filter');
      
      const branches: Branch[] = response.data.branches; // ✅ Correct property access
      return branches;
    } catch (error) {
      console.error('Failed to fetch branches:', error);
      return [];
    }
  };
  
  
  return (
    <EntityList<Branch>
      title="Branch"
      fetchData={fetchBranches}
      deleteData={handleDelete}
      onAddNavigate="AddBranch"
      renderCard={(item, onPress, onEdit, onDelete) => (
        <Card
          item={item}
          onPress={() => handleView(item)}
          onEdit={() => handleEdit(item)}
          onDelete={() => onDelete(item.uuid!)} // Make sure your API returns `uuid`
        />
      )}
    />
  );
};

export default BranchList;

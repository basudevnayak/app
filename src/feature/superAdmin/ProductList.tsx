import { Product } from '../../data/models/Product';
import Card from '../../component/Card';
import EntityList from '../../component/EntityList';
import { useNavigation } from '@react-navigation/native';
import { productService } from '../../data/service/ApiServiceFactory';
import AsyncStorageHelper from '../../utils/data/local/AsyncStorageHelper';
import { KEYS } from '../../utils/constants';

const ProductList = () => {
  const navigation = useNavigation<any>();

  const handleView = async (item: Product) => {
    await AsyncStorageHelper.setItem<Product>(KEYS.SELECTED_PRODUCT,item);
    navigation.navigate("ProductDetailScreen", { product: item });
  };

  const handleEdit = (item: Product) => {
    navigation.navigate("EditProductScreen", { product: item });
  };

  const handleDelete = async (uuid: string) => {
    await productService.delete(uuid);
  };

  return (
    <EntityList<Product>
      title="Product"
      fetchData={async () => {
        const response = await productService.getAll();
        return response.data;
      }}
      deleteData={handleDelete}
      onAddNavigate="AddProductScreen"
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

export default ProductList;

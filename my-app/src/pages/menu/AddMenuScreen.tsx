import AddMenu from "../../components/add-menu/AddMenu";
import MenuCategory from "../../components/add-menu/MenuCategory";
import CustomizeSection from "../../components/add-menu/customize/CustomizeSection";

const AddMenuScreen: React.FC = () => {
  return (
    <div>
      <MenuCategory />
      <AddMenu />
      <CustomizeSection />
    </div>
  );
};

export default AddMenuScreen;

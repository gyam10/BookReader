import { MenuComponent } from "../../component/front/menu.component";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { syncLocalFav } from "../../reducer/fav.reducer";

const HomeLayout = () => {
  let dispatch = useDispatch();
  dispatch(syncLocalFav());
  return (
    <>
      <MenuComponent />
      <Outlet />
    </>
  );
};

export default HomeLayout;

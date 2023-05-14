import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Front from "../pages/front";
import HomeLayout from "../pages/layout/home.layout";
import AdminLayout from "../pages/layout/admin.layout";
import ReaderLayout from "../pages/layout/reader.layout";
import AdminPages from "../pages/cms/admin";
import ReaderDashboard from "../pages/cms/reader/reader.page";
import store from "../store";
import { Provider, useDispatch } from "react-redux";
import { setUserDetail } from "../reducer/user.reducer";

const AdminPrivateRoute = ({ component }) => {
  let localUser = JSON.parse(localStorage.getItem("auth_user")) ?? null;
  const dispatch = useDispatch();

  if (!localUser) {
    return <Navigate to="/login" />;
  } else {
    let access_token = localStorage.getItem("auth_token");
    if (!access_token) {
      localStorage.removeItem("auth_user");
      return <Navigate to="/login" />;
    } else {
      dispatch(setUserDetail(localUser));
      return component;
    }
  }
};

const RoutingComponent = () => {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<Front.HomePage />} />
              <Route path="login" element={<Front.LoginPage />} />
              <Route path="register" element={<Front.RegisterPage />} />
              <Route
                path="book/byslug/:slug"
                element={<Front.BookDetailPage />}
              />
              <Route path="/fav" element={<Front.FavPage />} />
              <Route path="*" element={<Front.ErrorPage />} />
            </Route>
            <Route
              path="/admin"
              element={<AdminPrivateRoute component={<AdminLayout />} />}
            >
              <Route index element={<AdminPages.AdminDashboard />} />
              <Route path="book" element={<AdminPages.BookPage />} />
              <Route path="book/create" element={<AdminPages.BookAdd />} />
              <Route path="book/:id" element={<AdminPages.BookEdit />} />

              <Route path="user" element={<AdminPages.UserPage />} />
              <Route path="user/create" element={<AdminPages.UserAdd />} />
              <Route path="user/:id" element={<AdminPages.UserEdit />} />
            </Route>

            <Route
              path="/reader"
              element={<AdminPrivateRoute component={<ReaderLayout />} />}
            >
              <Route index element={<ReaderDashboard />} />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
};
export default RoutingComponent;

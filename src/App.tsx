import { Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Registration from "./Components/Auth/Registration";
import EditProfile from "./Components/Dashboard/EditProfile";
import Profile from "./Components/Dashboard/Profile";
import Layout from "./Components/Layout/Layout";
import CategoriesPost from "./Components/Pages/CatagoriesPost";
import EditPost from "./Components/Pages/EditPost";
import Home from "./Components/Pages/Home";
import NewPost from "./Components/Pages/NewPost";
import NotFound from "./Components/Pages/NotFound";
import SinglePost from "./Components/Pages/SinglePost";
import UserContextProvider from "./UserContext";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/users/:id" element={<Profile />} />
          <Route path="/users/edit/:id" element={<EditProfile />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route
            path="/posts/:categories"
            element={<CategoriesPost userId={""} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;

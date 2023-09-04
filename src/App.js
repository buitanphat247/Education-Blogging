import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import useAuth from "./context/auth-context";
import Mobile from "./pages/Mobile";
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const OverViewPage = lazy(() => import("./pages/OverViewPage"));
const Album = lazy(() => import("./Components/photos/Album"));
const HomePage = lazy(() => import("./pages/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const DetailPage = lazy(() => import("./pages/DetailPage"));
const Main = lazy(() => import("./Components/layout/Main"));
const MainDashBoard = lazy(() => import("./Components/layout/MainDashBoard"));
const ManagePost = lazy(() => import("./modules/Manager/Posts/ManagePost"));
const WritePosts = lazy(() => import("./modules/Manager/Posts/WritePosts"));
const Category = lazy(() => import("./modules/Manager/Category/Category"));
const AddCategory = lazy(() =>
  import("./modules/Manager/Category/AddCategory")
);
const CategoryUpdate = lazy(() =>
  import("./modules/Manager/Category/CategoryUpdate")
);
const ManageUsers = lazy(() => import("./modules/Manager/User/ManageUsers"));
const CreateNewUsers = lazy(() =>
  import("./modules/Manager/User/CreateNewUsers")
);
const UserUpdate = lazy(() => import("./modules/Manager/User/UserUpdate"));
const PostsUpdate = lazy(() => import("./modules/Manager/Posts/PostsUpdate"));
const About = lazy(() => import("./pages/About"));
const Profile = lazy(() => import("./modules/Manager/User/Profile"));

function App() {
  const [userInfor] = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Hàm kiểm tra kích thước màn hình và cập nhật trạng thái isMobile
    const checkScreenSize = () => {
      if (window.innerWidth <= 1300) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    // Gắn sự kiện resize để kiểm tra kích thước màn hình khi nó thay đổi
    window.addEventListener("resize", checkScreenSize);
    // Kiểm tra kích thước màn hình khi trang web được tải lần đầu
    checkScreenSize();
    // Hủy sự kiện khi component bị hủy
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <Mobile></Mobile>
      ) : (
        <Suspense>
          <Routes>
            <Route path="/" element={<Main></Main>}>
              <Route path="/" element={<HomePage></HomePage>}></Route>
              <Route
                path="/details-posts"
                element={<DetailPage></DetailPage>}
              ></Route>
              <Route path="/about-page" element={<About></About>}></Route>
              <Route
                path="/view-all-posts"
                element={<OverViewPage></OverViewPage>}
              ></Route>
              <Route
                path="/view-all-posts/album-ba-ria-vung-tau"
                element={<Album></Album>}
              ></Route>
            </Route>
            {userInfor ? (
              <Route path="/manage" element={<MainDashBoard></MainDashBoard>}>
                <Route
                  path="/manage/posts"
                  element={<ManagePost></ManagePost>}
                ></Route>

                <Route
                  path="/manage/writenewpost"
                  element={<WritePosts></WritePosts>}
                >
                  {" "}
                </Route>

                <Route
                  path="/manage/update-post"
                  element={<PostsUpdate></PostsUpdate>}
                >
                  {" "}
                </Route>

                <Route path="/manage/category" element={<Category></Category>}>
                  {" "}
                </Route>
                <Route
                  path="/manage/add-category"
                  element={<AddCategory></AddCategory>}
                >
                  {" "}
                </Route>

                <Route
                  path="/manage/addcategory"
                  element={<AddCategory></AddCategory>}
                ></Route>

                <Route
                  path="/manage/update-category"
                  element={<CategoryUpdate></CategoryUpdate>}
                >
                  {" "}
                </Route>
                <Route
                  path="/manage/manage-users"
                  element={<ManageUsers></ManageUsers>}
                ></Route>
                <Route
                  path="/manage/update-users"
                  element={<UserUpdate></UserUpdate>}
                ></Route>
                <Route
                  path="/manage/add-users"
                  element={<CreateNewUsers></CreateNewUsers>}
                ></Route>

                <Route
                  path="/manage/profile-user"
                  element={<Profile></Profile>}
                ></Route>
              </Route>
            ) : (
              <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
            )}
            <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/signin" element={<SignInPage></SignInPage>}></Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          </Routes>
        </Suspense>
      )}
    </>
  );
}

export default App;

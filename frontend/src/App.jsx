import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LayoutPage from "./components/Layout";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import RegisterPage from "./pages/Register";
import Page404 from "./pages/404";

const router = createBrowserRouter([
	{
		path: "login",
		element: <LoginPage />,
	},
	{
		path: "register",
		element: <RegisterPage />,
	},
	{
		path: "profile",
		element: (
			<LayoutPage>
				<ProfilePage />
			</LayoutPage>
		),
	},
	{
		errorElement: (
			<LayoutPage>
				<Page404 />
			</LayoutPage>
		),
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

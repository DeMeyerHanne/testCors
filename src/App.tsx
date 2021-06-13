import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AddUser from "./screens/AddUser";
import ConnectWatch from "./screens/ConnectWatch";
import Dashboard from "./screens/Dashboard";
import EditUser from "./screens/EditUser";

//link route pages
import ErrorPage from "./screens/Error";
import FailedSetup from "./screens/FailedSetup";
import ForgotPassword from "./screens/ForgotPassword";
import Login from "./screens/Login";
import Setup from "./screens/Setup";
import SuccessfulSetup from "./screens/SuccessfulSetup";
import UserPage from "./screens/UserPage";
import Test from "./screens/test";

//css
import "./styles/screen.scss";

function App() {
	return (
		<Router>
			<main className="c-app u-bg-color-theme-500">
				<Switch>
					<Route path="/test">
						<Test />
					</Route>

					<Route path="/failed">
						<FailedSetup />
					</Route>
					<Route path="/succes">
						<SuccessfulSetup />
					</Route>
					<Route path="/setup">
						<Setup />
					</Route>
					<Route path="/error">
						<ErrorPage />
					</Route>
					<Route path="/users">
						<UserPage />
					</Route>
					<Route path="/adduser">
						<AddUser />
					</Route>
					<Route path="/edituser">
						<EditUser />
					</Route>
					<Route path="/dashboard/:id">
						<Dashboard />
					</Route>
					<Route path="/connectwatch/:id">
						<ConnectWatch />
					</Route>
					<Route path="/forgotpassword">
						<ForgotPassword />
					</Route>
					<Route path="*">
						<Login />
					</Route>
				</Switch>
			</main>
		</Router>
	);
}

export default App;

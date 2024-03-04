import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./app/store";
import "./index.css";

const config = {
	token: {
		borderRadius: 3,
	},
	components: {
		Form: {
			itemMarginBottom: 8,
			verticalLabelPadding: 0,
		},
	},
};

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ConfigProvider theme={config}>
			<Provider store={store}>
				<App />
			</Provider>
		</ConfigProvider>
	</React.StrictMode>
);

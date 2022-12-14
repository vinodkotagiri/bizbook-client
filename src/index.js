import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { StrictMode } from 'react'
const root = createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<StrictMode>
				<App />
			</StrictMode>
		</BrowserRouter>
	</Provider>
)

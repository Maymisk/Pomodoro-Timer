import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
import { defaulTheme } from './styles/themes/default';
import { Router } from './Router';

export function App() {
	return (
		<ThemeProvider theme={defaulTheme}>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
			<GlobalStyle />
		</ThemeProvider>
	);
}

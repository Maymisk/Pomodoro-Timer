import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
import { defaulTheme } from './styles/themes/default';

export function App() {
	return (
		<ThemeProvider theme={defaulTheme}>
			<div>text</div>

			<GlobalStyle />
		</ThemeProvider>
	);
}

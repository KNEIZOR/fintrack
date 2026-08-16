import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './providers/router/AppRouter';

const App = () => {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;

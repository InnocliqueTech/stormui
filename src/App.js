import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// auth provider

import routes, { renderRoutes } from './routes';
import { ClientsProvider } from './views/dashboard/context';
import { FilterProvider } from './views/dashboard/context/filter';

const App = () => {
  return (
    <React.Fragment>
      <ClientsProvider>
        <FilterProvider>
          <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>{renderRoutes(routes)}</BrowserRouter>
        </FilterProvider>
      </ClientsProvider>
    </React.Fragment>
  );
};

export default App;

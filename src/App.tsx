import React from 'react';

import { Provider } from 'mobx-react';
import './App.scss';

import httpClient from './services/http.client';
import IdentityStore from './stores/identity.store';
import IdentityService from './services/identity.service';
import Routes from './routes';

import 'bootstrap/dist/css/bootstrap.min.css';

const identityService = new IdentityService(httpClient);

const stores = {
  identityStore: new IdentityStore(identityService)
}


const App: React.FC = () => {
  return (
    <div className="App">
      <Provider {...stores}>
          <Routes />
        </Provider>
    </div>
  );
}

export default App;

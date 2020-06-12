import React from 'react';

import { Provider } from 'mobx-react';
import './App.scss';

import Routes from './routes';
import httpClient from './services/http.client';
import IdentityService from './services/identity.service';
import IdentityStore from './stores/identity.store';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BASE_API_URL } from './config/api.config';
import BaseApiService from './services/base.api.service';
import { CookieOven } from './services/CookieOven';
import { UsersService } from './services/users.service';
import UsersStore from './stores/users.store';

const cookieOven = new CookieOven();
const apiService = new BaseApiService(BASE_API_URL, httpClient);
const identityService = new IdentityService(apiService, cookieOven);
const usersService = new UsersService(apiService);

const stores = {
  identityStore: new IdentityStore(identityService),
  usersStore: new UsersStore(usersService),
  apiStore: apiService,
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

import Chance from 'chance';

import UsersStore from './users.store';
import {mockUser} from '../../__tests__/mocks/data.mock';
import { UsersService } from '../services/users.service';

describe('Users Store', () => {
    const chance = Chance();

    describe('User', () => {
        it('Should be a user', async () => {

            const user = mockUser();
            const response = UsersStore.fetchAllUsers();
        

        // identityService.preformLogin.mockReturnValue({
        //     data: {
        //         token
        //     }
        // })
        // const credentials: TryLogigArgs = {
        //     email,
        //     password
        // }

        // await identityStore.preformLogin(credentials);

        // expect(identityStore.token).toBe(token);
        // expect(identityService.preformLogin).toBeCalledWith(credentials);
        // expect(identityService.setTokenToStorage).toBeCalledWith(token);
    })
})

import * as React from 'react';
import { observer, inject } from 'mobx-react';
import IdentityStore from '../../stores/identity.store';

interface Props {
    identityStore: IdentityStore
}

@inject('identityStore')
@observer
export class LoginPage extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Login Page</h1>
            </div>
        )
    }
}
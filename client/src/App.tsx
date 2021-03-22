import React from 'react';
import Container from '@material-ui/core/Container';

import Header from './components/Header';
import Transactions from './pages/transactions/Transactions';

const App = () => (
    <>
        <Header/>
        <Container maxWidth="lg">
            <Transactions />
        </Container>
    </>
)

export default App;

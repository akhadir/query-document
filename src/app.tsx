import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import SecretDialog from './components/secret-dialog';
import { getConfig, setCredentials } from './services';
import AppRoutes from './app-routes';
import './app.css';

function App() {
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [secret, setSecret] = useState('');
    const [secretSuccess, setSecretSuccess] = useState<boolean>(!!getConfig().secret);
    useEffect(() => {
        if (secret) {
            const out = setCredentials(secret);
            if (!out) {
                setErrorMsg('Wrong secret. Enter it again.');
                setSecret('');
            } else {
                setErrorMsg('');
                setSecretSuccess(true);
            }
        }
    }, [secret]);
    const [collapsed, setCollapsed] = useState(false);
    return (
        <BrowserRouter>
            <header className="app-header">
                <img src="/images/k.png" alt="Query Document" width="80px" height="60px" />
                <span>Query Document</span>
                <Link to="/" className="home-link">
                    <HomeIcon />
                </Link>
            </header>
            <div className="app">
                <Sidebar collapsed={collapsed}>
                    <Menu>
                        <MenuItem title="Parse Online Transactions" className="document">
                            <img src="/images/k.png" alt="Query Document" />
                        </MenuItem>
                        <MenuItem title="Parse Online Transactions" className="document">
                            <img src="/images/k.png" alt="Query Document" />
                        </MenuItem>
                        <MenuItem icon={<ReceiptIcon />} title="Upload Bills">
                            <Link to="/">Upload Documents</Link>
                        </MenuItem>
                    </Menu>
                    <div className="sb-footer">
                        {!collapsed &&
                            <KeyboardDoubleArrowLeftIcon onClick={() => setCollapsed(true)} />}
                        {collapsed &&
                            <KeyboardDoubleArrowRightIcon onClick={() => setCollapsed(false)} />}
                    </div>
                </Sidebar>
                <div className="workspace">
                    {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                    {!secretSuccess && (
                        <SecretDialog errorMsg={errorMsg} handleSecret={setSecret} />
                    )}
                    {secretSuccess && <AppRoutes />}
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

type Props = {
    isOpen: boolean;
    autoHideDuration?: number;
    onClose: () => void;
    text: string;
    severity: 'error' | 'info' | 'success' | 'warning';
}

const Toast = ({ isOpen, autoHideDuration = 2000, onClose, severity, text }: Props) => (
    <div>
        <Snackbar open={isOpen} autoHideDuration={autoHideDuration} onClose={onClose}>
            <MuiAlert variant="filled" severity={severity} >
                {text}
            </MuiAlert>
        </Snackbar>
    </div>
)

export default Toast;
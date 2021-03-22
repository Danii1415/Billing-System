import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Input from '@material-ui/core/Input';

type Props = {
    row: any;
    name: string;
    onChange: (e: any, row: any) => void;
    isEditRow: boolean;
}

const CustomTableCell = ({ row, name, onChange, isEditRow }: Props) => {
    return (
        <TableCell>
            {isEditRow ? (
                <Input
                    value={row[name]}
                    name={name}
                    onChange={e => onChange(e, row)}
                />
            ) : (
                row[name]
            )}
        </TableCell>
    );
}

export default CustomTableCell;

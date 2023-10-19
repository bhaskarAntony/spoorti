import React, { useState } from 'react';
import { colors } from '../../theme';
import TableCell from '@mui/material/TableCell';
import { Button, Image, StatusIndicator, Text } from '../atoms';
import { TableRow } from '@mui/material';
import userImage from '../../assets/images/user_image.png';
import userImage2x from '../../assets/images/user_image_2x.png';
import userImage3x from '../../assets/images/user_image_3x.png';

export const CustomTableRow = ({ row, headCells, index, labelId, ...props }) => {
    const [rejectReason, setRejectReason] = useState('');
    const handleClick = (event, labelName, pageRedirection, bookingId, tableId, eventId) => {
        if (props.tableAction) {
            props.tableAction(labelName);
        } else if ((window.location.pathname === '/admin/room') && labelName !== 'Action') {
            if (!props.subNavIndex) {
                props.updateUserDataToOpen(bookingId)
            }
        } else if ((window.location.pathname === '/admin/event') && labelName !== 'Action') {
            if (!props.subNavIndex) {
                props.updateUserDataToOpen(eventId)
            }
        } else if ((window.location.pathname === '/admin/dine_in') && labelName !== 'Action') {
            if (!props.subNavIndex) {
                props.updateUserDataToOpen(tableId)
            }
        }

        if (pageRedirection) {
            window.location.href = pageRedirection;
        }
    };
    const handleRejectReasonChange = (event) => {
        setRejectReason(event.target.value);
    };

    const tableBtnAction = (status, rowData) => {
        props.approveReject(status, rowData);
    };

    const updateProductStatus = (event, rowData) => {
        props.updateProductStatus(event, rowData);
    };

    return (
        <>
            <TableRow
                role="checkbox"
                tabIndex={-1}
                key={row.name}
                className={row.is_active !== null && row.is_active === false ? "in-active-row" : "active-row"}
            >
                {headCells.map((cell, cellIndex) => {
                    let txnTypeColor = colors.coralRed;
                    let statusClassName = '';
                    if (cell.id === 'Status' || cell.id === 'status') {
                        if (row[cell.id]?.toUpperCase() === 'DELETED' || row[cell.id]?.toUpperCase() === 'REJECTED' || row[cell.id]?.toUpperCase() === 'CANCELLED') {
                            statusClassName = 'status-rejected';
                        } else if (row[cell.id]?.toUpperCase() === 'COMPLETED') {
                            statusClassName = 'status-completed';
                        }
                    }
                    if (cell.id === 'txnType') {
                        if (row[cell.id] === 'Deposit') {
                            txnTypeColor = colors.brightLimeGreen;
                        } else if (row[cell.id] === 'Withdrawal') {
                            txnTypeColor = colors.pureOrange;
                        }
                    } else if (cell.id === 'txnDesc') {
                        txnTypeColor = colors.brightLimeGreen;
                    }

                    return (
                        (cell.id !== 'action' && cell.id !== 'is_booking_allowed' && cell.id !== 'is_active') ?
                            <TableCell
                                key={index + '.' + cellIndex} id={labelId}
                                onClick={(event) => handleClick(event, cell.label, props.pageRedirection, row.booking_id, row.table_id, row.event_id)}
                                scope="row">
                                {(cell.id === 'txnType' || cell.id === 'txnDesc') &&
                                    <div className="txn-type-indicator">
                                        <StatusIndicator bgcolor={txnTypeColor} bordercolor={txnTypeColor} />
                                        {row[cell.id]}
                                    </div>
                                }
                                {cell.id !== 'action' &&
                                    cell.id !== 'txnPG' &&
                                    cell.id !== 'txnAction' &&
                                    cell.id !== 'txnDesc' &&
                                    cell.id !== 'userImg' &&
                                    cell.id !== 'Status' &&
                                    cell.id !== 'status' &&
                                    cell.id !== 'ResetAllowed' &&
                                    cell.id !== 'starred' &&
                                    row[cell.id]
                                }
                                {cell.id === 'ResetAllowed' && (row[cell.id] ? 'Yes' : 'No')}

                                {cell.id === 'profileImg' &&
                                    <div className='table-user-image'>
                                        <Image mobilesrcfile={row[cell.id]} tabletsrcfile={row[cell.id]} desktopsrcfile={row[cell.id]} />
                                    </div>
                                }

                                {((cell.id === 'Status' || cell.id === 'status') && row[cell.id]) &&
                                    <div className={`status-container ${statusClassName}`}>
                                        {row[cell.id]}
                                    </div>
                                }
                            </TableCell>
                            :
                            <TableCell
                                key={index + '.' + cellIndex}
                                id={labelId}
                                scope="row"
                            >
                                {(cell.id !== 'is_booking_allowed' && cell.id !== 'is_active') ? (
                                    <div className='action-btn-cont'>
                                        <Button action={() => tableBtnAction('APPROVED', row)} className="table-approve-action" text="Approve" />
                                        <Button action={() => tableBtnAction('REJECTED', row, rejectReason)} className="table-reject-action" text="Reject" />
                                        {/* Render the reason input only if the action is 'Reject' */}
                                        {cell.id === 'action' && rejectReason && (
                                            <input
                                                type="text"
                                                value={rejectReason}
                                                onChange={handleRejectReasonChange}
                                                placeholder="Enter reason for rejection"
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={row[cell.id]}
                                            onChange={(event) => updateProductStatus(event, row)}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                )}
                            </TableCell>
                    )
                }
                )}
            </TableRow>
            {row.userOpen && <TableRow>
                <TableCell colSpan={headCells.length}>
                    <div className='detail-view'>
                        <div className='detail-view-left'>
                            <div className='detail-view-user'>
                                <Image mobilesrcfile={userImage} tabletsrcfile={userImage2x} desktopsrcfile={userImage3x} />
                            </div>
                            <Text className='detail-view-left-user-name' tag="h6" text={`${row.user.first_name} ${row.user.last_name}`} />
                            <Text className='detail-view-left-user-mobile' tag="p" text={row.user.mobile} />
                        </div>
                        <div className='detail-view-right'>
                            <Text className="detail-view-right-heading" tag="h6" text="User Information" />
                            <div className='detail-view-info'>
                                <div className='detail-view-info-list'>
                                    <Text className='detail-view-right-label' tag="h6" text="First Name" />
                                    <Text className='detail-view-right-value' tag="p" text={`${row.user.first_name || '-'}`} />
                                </div>
                                <div className='detail-view-info-list'>
                                    <Text className='detail-view-right-label' tag="h6" text="Middle Name" />
                                    <Text className='detail-view-right-value' tag="p" text={`${row.user.middle_name || '-'}`} />
                                </div>
                                <div className='detail-view-info-list'>
                                    <Text className='detail-view-right-label' tag="h6" text="Last Name" />
                                    <Text className='detail-view-right-value' tag="p" text={`${row.user.last_name || '-'}`} />
                                </div>
                                <div className='detail-view-info-list'>
                                    <Text className='detail-view-right-label' tag="h6" text="Phone number" />
                                    <Text className='detail-view-right-value' tag="p" text={row.user.mobile || '-'} />
                                </div>
                                <div className='detail-view-info-list'>
                                    <Text className='detail-view-right-label' tag="h6" text="kgid id/uid" />
                                    <Text className='detail-view-right-value' tag="p" text={row.user.kg_id || '-'} />
                                </div>
                                <div className='detail-view-info-list'>
                                    <Text className='detail-view-right-label' tag="h6" text="Email" />
                                    <Text className='detail-view-right-value' tag="p" text={row.user.email_id || '-'} />
                                </div>
                                <div className='detail-view-info-list'>
                                    <Text className='detail-view-right-label' tag="h6" text="Registration" />
                                    <Text className='detail-view-right-value' tag="p" text={row.user.createdAt || '-'} />
                                </div>
                                <div className='detail-view-info-list'>
                                    <Text className='detail-view-right-label' tag="h6" text="Last Login" />
                                    <Text className='detail-view-right-value' tag="p" text={`${row.user.lastLogin || '-'}`} />
                                </div>
                                <div className='detail-view-info-list'>
                                    <Text className='detail-view-right-label' tag="h6" text="Status" />
                                    <Text className='detail-view-right-value' tag="p" text={row.user.status || '-'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </TableCell>
            </TableRow>
            }
        </>
    );
};

CustomTableRow.defaultProps = {};

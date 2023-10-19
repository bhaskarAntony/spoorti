import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import styled from 'styled-components/macro';
import { colors } from '../theme';
import { SignInWrapper } from '../components/views/SignInWrapper';
import { EnhancedTable, HeaderSubNavSignIn } from '../components/organisms';
import { useDispatch, useSelector } from 'react-redux';
import { getService, postService, putService } from '../service';
import { apiList } from '../util/apiList';
import { selectSubNav } from '../redux/common/action';
import { Input, Text } from '../components/atoms';
import { SearchContWrapper } from './AdminEvent';

export const ContentContWrapper = styled.section`
  background: ${colors.white};
  padding: 0 30px 30px;
`;

export const ContentInnerWrapper = styled.section`
  background: rgba(42, 56, 150, 0.03);
  padding: 0 50px;
  position: relative;

  .no-data-found{
    font-size: 24px;
    width: 100%;
    text-align: center;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Room = (props) => {
  const dispatch = useDispatch();
  const { selectedSubNav } = useSelector(({ common }) => ({ ...common }));
  const status = selectedSubNav === 0 ? 'New' : 'COMPLETED,APPROVED,REJECTED,CANCELLED';

  const [responseData, setResponseData] = useState({});
  const [baseData, setBaseData] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchByUserIdText, setSearchByUserIdText] = useState('');
  const [loading, setLoading] = useState(true);
  const [subNavIndex, setSubNavIndex] = useState(0);
  const fetch = async (status, index = 0) => {
    if (index === 2) {
      const data = await getService(`${apiList.roomProducts}`, true);
      setResponseData(data[0]);
      setBaseData(data[0]);
    } else {
      const data = await getService(`${apiList.adminRooms}/0/1000?status=${status}`, true);
      await data[0].response.map((item, index) => {
        item.userId = item.user.user_id;
        if (status === 'New') {
          item.action = '';
        } else {
          item.Status = item.status;
        }
        return null;
      });

      data[0].response.forEach(function (element) {
        element.userOpen = false;
      });

      setResponseData(data[0].response);
      setBaseData(data[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetch(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUserDataToOpen = (bookingId) => {
    const updatedResponse = [...responseData];
    const itemIndex = updatedResponse.findIndex(item => item.booking_id === bookingId);
    updatedResponse[itemIndex].userOpen = !updatedResponse[itemIndex].userOpen;
    setResponseData(updatedResponse);
  }

  const headCells = [];
  const exceptKeys = ['room', 'user', 'createdAt', 'updatedAt', 'status', 'products', 'media', 'userOpen'];
  if (responseData?.[0] && Object.keys(responseData[0]).length) {
    for (let key in responseData[0]) {
      if (!exceptKeys.includes(key)) {
        const value = key === 'roomBookingId' ? key.replace(/([A-Z])/g, ' $1').replace('room', '').replace(/-/g, ' ').replace(/_/g, ' ').trim() : key.replace(/([A-Z])/g, ' $1').replace(/-/g, ' ').replace(/_/g, ' ').replace(/ dt/g, ' Date').trim();
        headCells.push(
          {
            "id": key,
            "numeric": false,
            "label": value.charAt(0).toUpperCase() + value.substring(1)
          }
        )
      }
    }
  }

  const updateActiveNav = (index) => {
    setSubNavIndex(index)
    dispatch(selectSubNav(index));
    setSearchText('');
    setSearchByUserIdText('');
    fetch(index === 0 ? 'New' : 'COMPLETED,APPROVED,REJECTED,CANCELLED', index);
  };

  const search = (event, searchType) => {
    if (searchType === "mobile") {
      setSearchText(event.target.value);
    } else {
      setSearchByUserIdText(event.target.value);
    }

    const filterData = baseData.response.filter(data => data?.user?.mobile?.includes(searchText) && String(data?.user?.user_id)?.includes(searchByUserIdText));
    setResponseData(filterData);
  };

  // const approveReject = async(status, rowData) => {
  //   const requestParam = {
  //     "user_id": rowData.userId,
  //     "booking_id": rowData.booking_id,
  //     "status": status
  //   };
  //   const data = await postService(`${apiList.adminApproveRooms}`, requestParam, true);
  //   if (data[0] !== null && data[1] === null) {
  //     fetch('New');
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Successful',
  //       text: status === 'APPROVED' ? 'Approved' : "Rejected",
  //       showConfirmButton: false,
  //       timer: 3000
  //     });
  //   }
  // };
  const approveReject = async (status, rowData) => {
    if (status === 'REJECTED') {
      const { value: reason } = await Swal.fire({
        icon: 'warning',
        title: 'Reject',
        text: 'Please provide a reason for rejection:',
        input: 'text',
        inputPlaceholder: 'Reason...',
        showCancelButton: true,
        confirmButtonText: 'Reject',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'Reason is required!';
          }
        },
      });

      if (reason) {
        // The user provided a reason, proceed with the rejection
        performRejectAction(rowData.userId, rowData.booking_id, status, reason);
      }
    } else {
      // For actions other than "Reject," proceed without showing the input prompt
      performRejectAction(rowData.userId, rowData.booking_id, status, '');
    }
  };

  const performRejectAction = async (userId, bookingId, status, reason) => {
    const requestParam = {
      user_id: userId,
      booking_id: bookingId,
      status: status,
      reason: reason, // Pass the reason to the API
    };

    const data = await postService(`${apiList.adminApproveRooms}`, requestParam, true);
    if (data[0] !== null && data[1] === null) {
      fetch('New');
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: status === 'APPROVED' ? 'Approved' : 'Rejected',
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const updateProductStatus = async (event, productItem) => {
    const requestParam = {
      "room_prd_id": productItem.room_prd_id,
      "is_active": event.target.checked
    };

    const data = await putService(`${apiList.updateRoomProductStatus}`, requestParam, true);
    if (data[0] !== null && data[1] === null) {
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: 'Updated Successfully',
        showConfirmButton: false,
        timer: 3000
      });

      fetch('', 2);
    }
  };

  if (!loading)
    return <SignInWrapper>
      <HeaderSubNavSignIn action={updateActiveNav} />
      <ContentContWrapper>
        <ContentInnerWrapper>
          {selectedSubNav <= 0 &&
            <SearchContWrapper>
              <Text
                className="search-label"
                tag="label"
                text="Phone number"
              />
              <Input
                value={searchText}
                className="search-input"
                action={search}
                color={colors.cyan}
                bg={colors.white}
                type="text"
                searchType="mobile"
                placeholder="Search by mobile number" />
              <Text
                className="search-label"
                tag="label"
                text="User Id"
              />
              <Input
                value={searchByUserIdText}
                className="search-input"
                action={search}
                color={colors.cyan}
                bg={colors.white}
                type="text"
                searchType="userId"
                placeholder="Search by User Id" />
            </SearchContWrapper>
          }
          {responseData.length !== 0 &&
            <EnhancedTable
              rows={responseData}
              headCells={headCells}
              approveReject={approveReject}
              updateProductStatus={updateProductStatus}
              updateUserDataToOpen={updateUserDataToOpen}
              subNavIndex = {subNavIndex === 2 ? true : false} />
          }
          {!responseData.length && <Text className="no-data-found" tag="h5" text="No data found" />}
        </ContentInnerWrapper>
      </ContentContWrapper>
    </SignInWrapper>;
};

export default Room;

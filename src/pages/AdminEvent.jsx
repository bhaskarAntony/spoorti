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

export const SearchContWrapper = styled.div`
  position: absolute;
  right: 50px;
  top: -60px;
  display: flex;
  align-items: center;

  .search-label{
    margin: 0 15px;
  }

  .search-input{
    border-radius: 4px;
    padding: 12px;
  }
`;

export const AdminEvent = (props) => {
  const dispatch = useDispatch();
  const { selectedSubNav } = useSelector(({ common }) => ({ ...common }));
  const status = selectedSubNav === 0 ? 'New' : 'COMPLETED,APPROVED,REJECTED,CANCELLED';

  const [responseData, setResponseData] = useState({});
  // const [baseData, setBaseData] = useState({});
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [subNavIndex, setSubNavIndex] = useState(0);
  const fetch = async(status, index = 0) => {
    if (index === 2) {
      const data = await getService(`${apiList.eventProducts}`, true);
      setResponseData(data[0]);
      // setBaseData(data[0]);
    } else {
      const data = await getService(`${apiList.adminEvents}/0/1000?status=${status}`, true);
      await data[0]?.response?.map((item, index) => {
        // item.user = {
        //   user_id: 555,
        //   first_name: "ANIL",
        //   middle_name: "test",
        //   last_name: "test",
        //   mobile: "9901992200",
        //   email_id: "anil@gmail.com",
        //   kg_id: "PC1467",
        //   password: "****",
        //   status: "test"
        
        // };
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
      console.log('responseData', responseData);
      // setBaseData(data[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetch(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headCells = [];
  const exceptKeys = ['media', 'description_ka', 'name_ka', 'createdDate', 'status', 'user', 'event_prd','amen_inst'];
  if (responseData?.[0] && Object.keys(responseData[0]).length) {
    for (let key in responseData[0]) {
      if (!exceptKeys.includes(key)) {
        const value = key.includes('_en') ? key.replace(/([A-Z])/g, ' $1').replace('_en', '').replace(/-/g, ' ').replace(/_/g, ' ').trim() : key.replace(/([A-Z])/g, ' $1').replace(/-/g, ' ').replace(/_/g, ' ').trim();
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
    fetch(index === 0 ? 'New' : 'COMPLETED,APPROVED,REJECTED,CANCELLED', index);
  };

  const updateUserDataToOpen = (eventId) => {
    console.log(eventId);
    const updatedResponse = [...responseData];
    const itemIndex = updatedResponse.findIndex(item => item.event_id === eventId);
    updatedResponse[itemIndex].userOpen = !updatedResponse[itemIndex].userOpen;
    setResponseData(updatedResponse);
  }

  const search = async(event) => {
    setSearchText(event.target.value);
    const data = await getService(`${apiList.adminEvents}/0/1000?status=${status}&mobile=${searchText}`, true);
    await data[0].response.map((item, index) => {
      item.user = {
        user_id: 555,
        first_name: "ANIL",
        middle_name: null,
        last_name: null,
        mobile: "9901992200",
        email_id: "anil@gmail.com",
        kg_id: "PC1467",
        password: null,
        status: null
      };

      if (status === 'New') {
        item.action = '';
      } else {
        item.Status = item.status;
      }
      return null;
    });
    setResponseData(data[0]);
  };

  // const approveReject = async(status, rowData) => {
  //   const requestParam = {
  //     "event_id": rowData.event_id,
  //     "status": status
  //   };
  //   const data = await postService(`${apiList.adminApproveEvents}`, requestParam, true);
  //   if (data[0] !== null && data[1] === null) {
  //     fetch('New');
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Successful',
  //       text: status === 'APPROVED' ? 'Approved' : "Rejected",
  //       showConfirmButton: false,
  //       timer: 3000
  //   });
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
        performRejectAction(rowData.event_id, status, reason);
      }
    } else {
      // For actions other than "Reject," proceed without showing the input prompt
      performRejectAction(rowData.event_id, status, '');
    }
  };

  const performRejectAction = async (eventId, status, reason) => {
    const requestParam = {
      event_id: eventId,
      status: status,
      reason: reason, // Pass the reason to the API
    };

    const data = await postService(`${apiList.adminApproveEvents}`, requestParam, true);
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

  const updateProductStatus = async(event, productItem) => {
    const requestParam = {
        "event_prd_id": productItem.event_prd_id,
        "is_active": event.target.checked
    };

    const data = await putService(`${apiList.updateEventProductStatus}`, requestParam, true);
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
          <SearchContWrapper>
            <Input 
              value={searchText}
              className="search-input" 
              action={search}
              color={colors.cyan} 
              bg={colors.white} 
              type="text" 
              placeholder="Search by mobile number" />
          </SearchContWrapper>
          {responseData?.length !== 0 && 
            <EnhancedTable 
              rows={responseData}
              headCells={headCells} 
              approveReject={approveReject}
              updateProductStatus={updateProductStatus}
              updateUserDataToOpen={updateUserDataToOpen}
              subNavIndex = {subNavIndex === 2 ? true : false} />
          }
          {!responseData?.length && <Text className="no-data-found" tag="h5" text="No data found" />}
        </ContentInnerWrapper>
      </ContentContWrapper>
  </SignInWrapper>;
};

export default AdminEvent;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { colors } from '../theme';
import { SignInWrapper } from '../components/views/SignInWrapper';
import { EnhancedTable, HeaderSubNavSignIn, ProductList } from '../components/organisms';
import { getService, putService } from '../service';
import { apiList } from '../util/apiList';
import { selectSubNav } from '../redux/common/action';
import Swal from 'sweetalert2';
import { Input, Text } from '../components/atoms';
import { SearchContWrapper } from './Food';

export const ContentContWrapper = styled.section`
  background: ${colors.white};
  padding: 0 30px 30px;
`;

export const ContentInnerWrapper = styled.section`
  background: rgba(42, 56, 150, 0.03);
  padding: 0 50px;
  position: relative;
`;

export const DineIn = (props) => {
  const dispatch = useDispatch();
  const { selectedSubNav } = useSelector(({ common }) => ({ ...common }));
  const status = selectedSubNav === 0 ? 'New' : 'COMPLETED,REJECTED,APPROVED,REQUESTED,DELETED';
  const [responseData, setResponseData] = useState({});

  // const [baseData, setBaseData] = useState({});
  // const [searchText, setSearchText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchByUserIdText, setSearchByUserIdText] = useState('');
  const [baseData, setBaseData] = useState({});
  const [loading, setLoading] = useState(true);
  const [subNavIndex, setSubNavIndex] = useState(0);
  const fetch = async (status, index = 0) => {
    if (index === 2) {
      const data = await getService(`${apiList.tableProducts}`, true);
      console.log('data', data);
      setResponseData(data[0]);
      // setBaseData(data[0]);
    } else {
      const data = await getService(`${apiList.adminTables}/0/1000?status=${status}`, true);
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
    
    // setBaseData(data[0]);
    setLoading(false);
  };

  useEffect(() => {
    fetch(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headCells = [];
  const exceptKeys = ['room', 'user', 'createdAt', 'updatedAt', 'status', 'products', 'type_id'];
  if (responseData?.[0] && Object.keys(responseData[0]).length) {
    for (let key in responseData[0]) {
      if (!exceptKeys.includes(key)) {
        const value = key.replace(/([A-Z])/g, ' $1').replace(/-/g, ' ').replace(/_/g, ' ').replace(/ dt/g, ' Date').replace(/tbl/g, ' Table').replace(/prd/g, ' Product').trim();
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
    // setSearchText('');
    fetch(index === 0 ? 'New' : 'COMPLETED,REJECTED,APPROVED,REQUESTED,DELETED', index);
  };

  const updateUserDataToOpen = (tableId) => {
    const updatedResponse = [...responseData];
    const itemIndex = updatedResponse.findIndex(item => item.table_id === tableId);
    updatedResponse[itemIndex].userOpen = !updatedResponse[itemIndex].userOpen;
    setResponseData(updatedResponse);
  }

  // const approveReject = async(status, rowData) => {
  //   const requestParam = {
  //     "table_id": rowData.table_id,
  //     "status": status
  //   };
    
  //   const data = await putService(`${apiList.adminApproveTable}`, requestParam, true);
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
        performRejectAction(rowData.table_id, status, reason);
      }
    } else {
      // For actions other than "Reject," proceed without showing the input prompt
      performRejectAction(rowData.table_id, status, '');
    }
  };
  
  const performRejectAction = async (tableId, status, reason) => {
    const requestParam = {
      table_id: tableId,
      status: status,
      reason: reason, // Pass the reason to the API
    };
  
    const data = await putService(`${apiList.adminApproveTable}`, requestParam, true);
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
        "tbl_prd_id": productItem.tbl_prd_id,
        "is_active": event.target.checked
    };

    const data = await putService(`${apiList.updateTableProductStatus}`, requestParam, true);
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

  const search = (event, searchType) => {
    if (searchType === "mobile") {
      setSearchText(event.target.value);
    } else {
      setSearchByUserIdText(event.target.value);
    }

    const filterData = baseData.response.filter(data => data?.user?.mobile?.includes(searchText) && String(data?.user?.user_id)?.includes(searchByUserIdText));
    setResponseData(filterData);
  };

  if (!loading)
  return <SignInWrapper>
      <HeaderSubNavSignIn action={updateActiveNav} />
      <ContentContWrapper>
        <ContentInnerWrapper className={selectedSubNav === 2 ? "dinein-product-cont" : ""}>
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
          
          {
          responseData.length !== 0 && 
            <EnhancedTable 
              className={selectedSubNav === 2 ? "dinein-product" : ""} 
              rows={responseData} headCells={headCells} 
              approveReject={approveReject}
              updateProductStatus={updateProductStatus} 
              updateUserDataToOpen={updateUserDataToOpen}
              subNavIndex = {subNavIndex === 2 ? true : false} />
          }
          {!responseData.length && <Text className="no-data-found" tag="h5" text="No data found" />}
          {selectedSubNav === 2 && 
            <ProductList prodcuts={responseData} />
          }
        </ContentInnerWrapper>
      </ContentContWrapper>
  </SignInWrapper>;
};

export default DineIn;

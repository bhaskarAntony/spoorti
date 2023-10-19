import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import styled from 'styled-components/macro';
import { colors } from '../theme';
import { SignInWrapper } from '../components/views/SignInWrapper';
import { EnhancedTable, HeaderSubNavSignIn } from '../components/organisms';
import { useSelector } from "react-redux";
import { getService, postService } from '../service';
import { apiList } from '../util/apiList';
import { useDispatch } from "react-redux";
import { selectSubNav } from "../redux/common/action";
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


export const UserApproval = (props) => {
  const dispatch = useDispatch();
  const { selectedSubNav } = useSelector(({ common }) => ({ ...common }));
  const status = selectedSubNav === 0 ? 'New' : 'COMPLETED,APPROVED,REJECTED';

  const [responseData, setResponseData] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchByUserIdText, setSearchByUserIdText] = useState('');
  const [baseData, setBaseData] = useState({});
  const [loading, setLoading] = useState(true);
  const fetch = async(status) => {
    const data = await getService(`${apiList.adminUserApprovals}/0/1000?status=${status}`, true);
    await data[0].response.map((item, index) => {
      if (status === 'New') {
        item.action = '';
      } else {
        item.Status = item.status;
        item.ResetAllowed = item.resetAllowed;
      }
      return null;
    });
    setResponseData(data[0].response);
    setBaseData(data[0]);
    setLoading(false);
  };

  useEffect(() => {
    fetch(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headCells = [];
  const exceptKeys = ['password', 'roles', 'resetAllowed', 'approved', 'status'];
  //resetAllowed, approved is required for transactions
  if(responseData?.[0] && Object.keys(responseData[0]).length) {
    for(let key in responseData[0]) {
      if(!exceptKeys.includes(key)) {
        const value = key.replace(/([A-Z])/g, ' $1').trim();
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
    dispatch(selectSubNav(index));
    setSearchText('');
    fetch(index === 0 ? 'New' : 'COMPLETED,APPROVED,REJECTED');
  };

  const search = async(event, searchType) => {
    if (searchType === "mobile") {
      setSearchText(event.target.value);
    } else {
      setSearchByUserIdText(event.target.value);
    }

    const filterData = baseData.response.filter(data => String(data?.mobile)?.includes(searchText) && String(data?.user_id)?.includes(searchByUserIdText));
    setResponseData(filterData);
  };

  const approveReject = async(status, rowData) => {
    const requestParam = {
      "user_id": rowData.user_id,
      "status": status
    };
    const data = await postService(`${apiList.adminApproveUsers}`, requestParam);
    if (data[0] !== null && data[1] === null) {
      fetch('New');
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: status === 'APPROVED' ? 'Approved' : "Rejected",
        showConfirmButton: false,
        timer: 3000
    });
    }
  };

  if (!loading)
  return <SignInWrapper>
      <HeaderSubNavSignIn action={updateActiveNav} />
      <ContentContWrapper>
        <ContentInnerWrapper>
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

          {responseData.length !== 0 && <EnhancedTable rows={responseData} headCells={headCells} approveReject={approveReject}/>}
          {!responseData.length && <Text className="no-data-found" tag="h5" text="No data found" />}
        </ContentInnerWrapper>
      </ContentContWrapper>
  </SignInWrapper>;
};

export default UserApproval;

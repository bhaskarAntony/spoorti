import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { colors } from '../theme';
import { SignInWrapper } from '../components/views/SignInWrapper';
import { EnhancedTable } from '../components/organisms';
import { useSelector } from "react-redux";
import { getService } from '../service.js';
import { apiList } from '../util/apiList';
import { Input, Text } from '../components/atoms';
import { SearchContWrapper } from './Food';

export const ContentContWrapper = styled.section`
  background: ${colors.white};
  padding: 0 30px 30px;
`;

export const ContentInnerWrapper = styled.section`
  background: rgba(42, 56, 150, 0.03);
  padding: 100px 50px 0;
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

  [class*='Food__SearchContWrapper'] {
    top: 30px;
  }
`;

export const UserQueries = (props) => {
  const { selectedSubNav } = useSelector(({ common }) => ({ ...common }));
  const status = selectedSubNav === 0 ? 'New' : 'COMPLETED';

  const [responseData, setResponseData] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchByQueryIdText, setSearchByQueryIdText] = useState('');
  const [baseData, setBaseData] = useState({});
  const [loading, setLoading] = useState(true);
  const fetch = async(status) => {
    const data = await getService(`${apiList.adminQueries}/0/1000?status=${status}`, true);
    setResponseData(data[0]);
    setBaseData(data[0]);
    setLoading(false);
  };

  useEffect(() => {
    fetch(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headCells = [];
  const exceptKeys = ["createdDate", "updatedDate"];
  if (responseData?.response?.[0] && Object.keys(responseData.response[0]).length) {
    for (let key in responseData.response[0]) {
      if (!exceptKeys.includes(key)) {
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

  const search = async(event, searchType) => {
    if (searchType === "mobile") {
      setSearchText(event.target.value);
    } else {
      setSearchByQueryIdText(event.target.value);
    }

    const filterData = baseData.response.filter(data => String(data?.mobile)?.includes(searchText) && (data?.queryId)?.includes(searchByQueryIdText));
    setResponseData({
      response: filterData
    });
  };

  if (!loading)
  return <SignInWrapper>
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
              text="Query Id" 
            />
            <Input 
              value={searchByQueryIdText}
              className="search-input" 
              action={search}
              color={colors.cyan} 
              bg={colors.white} 
              type="text" 
              searchType="userId"
              placeholder="Search by Query Id" />
          </SearchContWrapper>

          {responseData.response.length !== 0 && <EnhancedTable rows={responseData.response} headCells={headCells} />}
          {!responseData.response.length && <Text className="no-data-found" tag="h5" text="No data found" />}
        </ContentInnerWrapper>
      </ContentContWrapper>
  </SignInWrapper>;
};

export default UserQueries;

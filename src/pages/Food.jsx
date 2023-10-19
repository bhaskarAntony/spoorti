import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import Swal from 'sweetalert2';
import { colors } from '../theme';
import { SignInWrapper } from '../components/views/SignInWrapper';
import { FoodList, FoodProductList, HeaderSubNavSignIn } from '../components/organisms';
import { useDispatch, useSelector } from 'react-redux';
import { getService, postService, putService } from '../service';
import { apiList } from '../util/apiList';
import { selectSubNav } from '../redux/common/action';
import { Input, Text } from '../components/atoms';
// import { SearchContWrapper } from './AdminEvent';

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

export const Food = (props) => {
  const dispatch = useDispatch();
  const { selectedSubNav } = useSelector(({ common }) => ({ ...common }));
  const status = selectedSubNav === 0 ? 'New' : 'DELIVERED,APPROVED,COMPLETED,REJECTED,CANCELLED,DELETED';
  const [responseData, setResponseData] = useState({});
  const [productListData, setProductListData] = useState([]);
  const [productCategories, setProductCategories] = useState([]);

  const [baseData, setBaseData] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchByOrderIdText, setSearchByOrderIdText] = useState('');
  
  const [loading, setLoading] = useState(true);
  const fetch = async (status) => {
    const data = await getService(`${apiList.adminFood}/0/1000?status=${status}`, true);
    data[0].response.forEach(function (element) {
      element.userOpen = false;
    });
    setResponseData(data[0].response);
    setBaseData(data[0]);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedSubNav === 0 || selectedSubNav === 1) {
      fetch(status);
    } else {
      getProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateActiveNav = async(index) => {
    dispatch(selectSubNav(index));
    setSearchText('');
    setSearchByOrderIdText('');
    if (index === 0 || index === 1) {
      await setResponseData([]);
      await setLoading(true);
      fetch(index === 0 ? 'New' : 'DELIVERED,APPROVED,COMPLETED,REJECTED,CANCELLED,DELETED');
    } else {
      getProducts();
    }
  };

  const search = (event, searchType) => {
    if (searchType === "mobile") {
      setSearchText(event.target.value);
    } else {
      setSearchByOrderIdText(event.target.value);
    }

    const filterData = baseData.response.filter(data => String(data.user.mobile).includes(searchText) && String(data.order_id).includes(searchByOrderIdText));
    setResponseData(filterData);
  };

  const getProducts = async() => {
    const data = await getService(`${apiList.foodProducts}`, true);
    setProductListData(data[0]);
    const category = data[0].map( (item) => item.category);
    setProductCategories([...new Set(category)]);
  };

  const updateUserDataToOpen = (orderId) => {
    const updatedResponse = [...responseData];
    const itemIndex = updatedResponse.findIndex(item => item.order_id === orderId);
    updatedResponse[itemIndex]['userOpen'] = !updatedResponse[itemIndex].userOpen;
    setResponseData(updatedResponse);
  }

  // const approveReject = async (status, orderId) => {
  //   const requestParam = {
  //     "status": status,
  //     "order_id": orderId
  //   };
    
  //   const data = await postService(`${apiList.adminApproveFood}`, requestParam, true);
  //   if (data[0] !== null && data[1] === null) {
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Successful',
  //       text: status === 'APPROVED' ? 'Approved' : "Rejected",
  //       showConfirmButton: false,
  //       timer: 3000
  //     });
  //     fetch('New');
  //   } else {
  //     getProducts();
  //   }
  // };
  const approveReject = async (status, orderId) => {
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
        performRejectAction(status, orderId, reason);
      }
    } else {
      // For actions other than "Reject," proceed without showing the input prompt
      performRejectAction(status, orderId, '');
    }
  };

  const performRejectAction = async (status, orderId, reason) => {
    const requestParam = {
      status: status,
      order_id: orderId,
      reason: reason, // Pass the reason to the API
    };

    const data = await postService(`${apiList.adminApproveFood}`, requestParam, true);
    if (data[0] !== null && data[1] === null) {
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: status === 'APPROVED' ? 'Approved' : 'Rejected',
        showConfirmButton: false,
        timer: 3000,
      });
      fetch('New');
    } else {
      getProducts();
    }
  };

  const updateProductStatus = async(event, productItem) => {
    const requestParam = {
        "food_prd_id": productItem.prd_id,
        "is_active": event.target.checked
    };

    const data = await putService(`${apiList.updateProductStatus}`, requestParam, true);
    if (data[0] !== null && data[1] === null) {
        Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: 'Updated Successfully',
            showConfirmButton: false,
            timer: 3000
        });
        getProducts();
    }
  };

  if (!loading)
    return <SignInWrapper>
      <HeaderSubNavSignIn action={updateActiveNav} />
      <ContentContWrapper>
        <ContentInnerWrapper>
          {(selectedSubNav === 0 || selectedSubNav === 1) && 
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
                text="Order Id" 
              />
              <Input 
                value={searchByOrderIdText}
                className="search-input" 
                action={search}
                color={colors.cyan} 
                bg={colors.white} 
                searchType="orderId"
                type="text" 
                placeholder="Search by order id" />
            </SearchContWrapper>
          }

          {(selectedSubNav === 0 || selectedSubNav === 1) && 
            <>
              {responseData.length ? 
                <FoodList action={approveReject} foodData={responseData} selectedSubNav={selectedSubNav} updateUserDataToOpen={updateUserDataToOpen}/> : 
                <Text className="no-data-found" tag="h5" text="No data found" />
              }
            </>
          }

          {selectedSubNav === 2 && <FoodProductList updateProductStatus={updateProductStatus} productCategories={productCategories} productListData={productListData} />} 

        </ContentInnerWrapper>
      </ContentContWrapper>
    </SignInWrapper>;
};

export default Food;

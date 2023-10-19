import moment from 'moment/moment';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { colors, fonts } from '../../theme';
import { Button, Image, Text } from '../atoms';
import userImage from '../../assets/images/user_image.png';
import userImage2x from '../../assets/images/user_image_2x.png';
import userImage3x from '../../assets/images/user_image_3x.png';

export const FoodListContWrapper = styled.section`
    background: transparent;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
`;

export const FoodListWrapper = styled.div`
    width: 100%;
    max-height: calc(100vh - 315px);
    overflow: auto;
`;

export const FoodWrapper = styled.div`
  background: ${colors.white};
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  margin-bottom: 15px;

    .food-value{
        font-family: ${fonts.default};
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.2px;
        color: ${colors.black};
        min-width: 70px;
    }
`;

export const FoodWrapperLeft = styled.div`
    width: 70%;

    .food-label{
        font-family: ${fonts.default};
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.2px;
        color: ${colors.veryDarkGrayishRed};
        min-width: 70px;
    }
`;

export const FoodWrapperRight = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;

    .food-value{
        text-align: right;
    }

    .food-price{
        font-family: ${fonts.default};
        font-style: normal;
        font-weight: 800;
        font-size: 20px;
        line-height: 24px;
        letter-spacing: 0.2px;
        color: ${colors.black};
    }
`;

export const FoodLabelList = styled.div`
    display: flex;
    margin-bottom: 10px;

    &:last-child{
        margin-bottom: 0;
    }
`;

export const FoodOrderInfo = styled.div`
    background: ${colors.white};
    padding: 30px;
    margin-left: 15px;
    border-radius: 8px;
    min-width: 430px;
    margin-bottom: 20px;
`;

export const FoodOrderHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 25px;
    border-bottom: 1px solid #260051;
`;

export const FoodOrderHeaderLeft = styled.div`
    .food-order-label{
        font-family: ${fonts.default};
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        letter-spacing: 0.2px;
        color: ${colors.black};
    }

    .food-order-number{
        font-family: ${fonts.default};
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.2px;
        color: #333333;
        margin-top: 5px;
    }
`;

export const FoodOrderHeaderRight = styled.div`
    display: flex;
    margin-bottom: auto;

    .food-approve-btn, .food-reject-btn{
        background: ${colors.darkBlue};
        border-radius: 8px;
        font-family: ${fonts.default};
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.2px;
        color: ${colors.white};
        white-space: nowrap;
        border: solid 2px ${colors.darkBlue};
        padding: 10px;
        &:hover{
          background: ${colors.white};
          color: ${colors.darkBlue};
        }
    }
    
    .food-reject-btn{
        background: transparent;
        border: solid 2px ${colors.darkBlue};
        color: ${colors.darkBlue};
        margin-left: 15px;
    }
`;

export const FoodOrderGrandTotal = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 25px;
    border-top: 1px solid #260051;
    margin-bottom: 20px;

    .food-order-total-label{
        font-family: ${fonts.default};
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.2px;
        color: #666666;
    }

    .food-order-total-price{
        font-family: ${fonts.default};
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 19px;
        letter-spacing: 0.2px;
        color: #666666;
    }
`;

export const FoodOrderItemList = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 25px 0;
    border-bottom: 1px solid #EBEBEB;
    background-color: ${(props) => props.isActive ? '#fff' : '#ffe5e5' }; 
    margin-top: 5px;

    &:last:child{
        border-bottom: 0;
    }
`;

export const FoodOrderItemImg = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 20px;
`;

export const FoodOrderItemRight = styled.div`
    width: calc(100% - 84px);

    .food-non-veg-icon, .food-veg-icon{
        width: 10px;
        height: 10px;
        border: solid 1px #008300;
        margin-left: 10px;
        position: relative;

        &::after {
            position: absolute;
            width: 4px;
            height: 4px;
            left: calc(50% - 2px);
            top: calc(50% - 2px);
            content: "";
            background: #008300;
            border-radius: 50%;
        }
    }

    .food-non-veg-icon {
        border-color: #D10000;

        &::after {
            background: #D10000;
        }
    }

    picture{
        width: 100%;
        height: 100%;
    }

    .food-item-image{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .food-item-name{
        font-family: ${fonts.default};
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        color: #151515;
        margin-bottom: 5px;
    }

    .food-item-name-list{
        font-family: ${fonts.default};
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 15px;
        color: #979797;
        margin-bottom: 10px;
    }

    .food-item-price-list, .food-item-price{
        font-family: ${fonts.default};
        font-style: normal;
        font-weight: 600;
        font-size: 11px;
        line-height: 15px;
        color: #6F6D6D;
    }
`;

export const FoodNameCont = styled.div`
    display: flex;
`;

export const FoodPriceCont = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const FoodOrderItemListCont = styled.div`
    max-height: 400px;
    overflow: auto;
`;

export const FoodStatusCont = styled.div`
    background: rgba(42, 56, 150, 0.1);
    border-radius: 8px;
    padding: 10px;
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #2A3896;

    &.food-order-rejected{
        background: #EF3836;
        color: #FFFFFF;
    }
`;

export const FoodList = ({ ...props }) => {
    const [selectedFood, setSelectedFood] = useState(null);

    const selectedItemHandler = (item) => {
        setSelectedFood(item)
        props.updateUserDataToOpen(item.order_id)
    }

    return (
        <FoodListContWrapper>
            <FoodListWrapper>
                {props.foodData.map((item, index) => {
                    return (
                        <>
                            <FoodWrapper key={index} onClick={() => selectedItemHandler(item)}>
                                <FoodWrapperLeft>
                                    <FoodLabelList>
                                        <Text className='food-label' tag="label" text="User Id" />
                                        <Text className='food-value' tag="p" text={`: #${item.user.user_id}`} />
                                    </FoodLabelList>
                                    <FoodLabelList>
                                        <Text className='food-label' tag="label" text="Room no" />
                                        <Text className='food-value' tag="p" text={`: #${item.room_no}`} />
                                    </FoodLabelList>
                                    <FoodLabelList>
                                        <Text className='food-label' tag="label" text="Order Id" />
                                        <Text className='food-value' tag="p" text={`: #${item.order_id}`} />
                                    </FoodLabelList>
                                </FoodWrapperLeft>
                                <FoodWrapperRight>
                                    <Text className='food-label' tag="label" text={moment(item.ordered_date).format("hh:mm A")} />
                                    <Text className='food-value' tag="p" text={`₹ ${item.grand_total}`} />
                                </FoodWrapperRight>
                            </FoodWrapper>
                            {item.userOpen && <FoodWrapper><div className='detail-view'>
                                <div className='detail-view-left'>
                                    <div className='detail-view-user'>
                                        <Image mobilesrcfile={userImage} tabletsrcfile={userImage2x} desktopsrcfile={userImage3x} />
                                    </div>
                                    <Text className='detail-view-left-user-name' tag="h6" text={`${item.user.first_name} ${item.user.last_name}`} />
                                    <Text className='detail-view-left-user-mobile' tag="p" text={item.user.mobile} />
                                </div>
                                <div className='detail-view-right'>
                                    <Text className="detail-view-right-heading" tag="h6" text="User Information" />
                                    <div className='detail-view-info'>
                                        <div className='detail-view-info-list'>
                                            <Text className='detail-view-right-label' tag="h6" text="First Name" />
                                            <Text className='detail-view-right-value' tag="p" text={`${item.user.first_name || '-'}`} />
                                        </div>
                                        <div className='detail-view-info-list'>
                                            <Text className='detail-view-right-label' tag="h6" text="Middle Name" />
                                            <Text className='detail-view-right-value' tag="p" text={`${item.user.middle_name || '-'}`} />
                                        </div>
                                        <div className='detail-view-info-list'>
                                            <Text className='detail-view-right-label' tag="h6" text="Last Name" />
                                            <Text className='detail-view-right-value' tag="p" text={`${item.user.last_name || '-'}`} />
                                        </div>
                                        <div className='detail-view-info-list'>
                                            <Text className='detail-view-right-label' tag="h6" text="Phone number" />
                                            <Text className='detail-view-right-value' tag="p" text={item.user.mobile || '-'} />
                                        </div>
                                        <div className='detail-view-info-list'>
                                            <Text className='detail-view-right-label' tag="h6" text="kgid id/uid" />
                                            <Text className='detail-view-right-value' tag="p" text={item.user.kg_id || '-'} />
                                        </div>
                                        <div className='detail-view-info-list'>
                                            <Text className='detail-view-right-label' tag="h6" text="Email" />
                                            <Text className='detail-view-right-value' tag="p" text={item.user.email_id || '-'} />
                                        </div>
                                        <div className='detail-view-info-list'>
                                            <Text className='detail-view-right-label' tag="h6" text="Status" />
                                            <Text className='detail-view-right-value' tag="p" text={item.user.status || '-'} />
                                        </div>
                                    </div>
                                </div>
                            </div></FoodWrapper>}</>
                    )

                }
                )}
            </FoodListWrapper>
            {selectedFood &&
                <FoodOrderInfo>
                    <FoodOrderHeader>
                        <FoodOrderHeaderLeft>
                            <Text className='food-order-label' tag="label" text="Order Id" />
                            <Text className='food-order-number' tag="p" text={`# ${selectedFood.order_id}`} />
                        </FoodOrderHeaderLeft>
                        {props.selectedSubNav === 0 ?
                            <FoodOrderHeaderRight>
                                <div onClick={() => {
                                    props.action("APPROVED", selectedFood.order_id);
                                    setSelectedFood(null);
                                }
                                }>
                                    <Button className="food-approve-btn" text="Approve" />
                                </div>
                                <div onClick={() => {
                                    props.action("REJECTED", selectedFood.order_id);
                                    setSelectedFood(null);
                                }
                                }>
                                    <Button className="food-reject-btn" text="Reject" />
                                </div>
                            </FoodOrderHeaderRight>
                            :
                            <FoodStatusCont
                                className={selectedFood.status === 'REJECTED' || selectedFood.status === 'CANCELLED' || selectedFood.status === 'DELETED' ? 'food-order-rejected' : ''}
                            >{selectedFood.status}</FoodStatusCont>
                        }
                    </FoodOrderHeader>
                    <FoodOrderItemListCont>
                        {selectedFood.items.map((item, index) => {
                            return (
                                <FoodOrderItemList key={index} isActive = {item.is_active}>
                                    <FoodOrderItemImg>
                                        <Image className="food-item-image"
                                            mobilesrcfile={item.image_url}
                                            tabletsrcfile={item.image_url}
                                            desktopsrcfile={item.image_url}
                                        />
                                    </FoodOrderItemImg>
                                    <FoodOrderItemRight>
                                        <FoodNameCont>
                                            <Text className="food-item-name" tag="h3" text={item.category} />
                                            {item?.type && <span className={`${item?.type?.trim()?.toUpperCase() === "NON-VEG" ? 'food-non-veg-icon' : 'food-non-veg-icon'}`}></span>}
                                        </FoodNameCont>
                                        <Text tag="h4" className="food-item-name-list" text={item.description} />
                                        <FoodPriceCont>
                                            <Text tag="p" className="food-item-price-list" text={`₹ ${item.price} * ${item.quantity}`} />
                                            <Text tag="p" className="food-item-price" text={`₹ ${item.price * item.quantity}`} />
                                        </FoodPriceCont>
                                    </FoodOrderItemRight>
                                </FoodOrderItemList>
                            )
                        }
                        )}
                    </FoodOrderItemListCont>
                    <FoodOrderGrandTotal>
                        <Text className='food-order-total-label' tag="label" text="Grand Total" />
                        <Text className='food-order-total-price' tag="p" text={`₹ ${selectedFood.grand_total}`} />
                    </FoodOrderGrandTotal>
                    <FoodOrderHeaderLeft>
                        <Text className="food-order-label" tag="h3" text="Special Cooking Instructions:" />
                        <Text className='food-order-number' tag="p" text={selectedFood.instructions} />
                    </FoodOrderHeaderLeft>
                </FoodOrderInfo>
            }
        </FoodListContWrapper>
    );
};

FoodList.defaultProps = {};

import React from 'react';
import styled from 'styled-components/macro';
import { colors, fonts } from '../../theme';
import { Icon, Image, Text } from '../atoms';

export const FoodProductListContWrapper = styled.section`
    background: transparent;
    width: 100%;
    margin: 0 auto;
    display: flex;
    overflow-y: auto;
    padding-bottom: 50px;

    .switch {
        position: relative;
        display: inline-block;
        width: 25px;
        height: 15px;
        margin-right: 10px;
    }
      
    .switch input { 
        opacity: 0;
        width: 0;
        height: 0;
    }
      
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }
      
    .slider:before {
        position: absolute;
        content: "";
        height: 12px;
        width: 12px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }
      
    input:checked + .slider {
        background-color: #2196F3;
    }
      
    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }
      
    input:checked + .slider:before {
        -webkit-transform: translateX(10px);
        -ms-transform: translateX(10px);
        transform: translateX(10px);
    }
      
      /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }
      
    .slider.round:before {
        border-radius: 50%;
    }

    .food-more-option {
        position: absolute;
        right: 10px;
        top: 10px;
    }
`;

export const FoodCategoryListCont = styled.div`
    background: ${colors.white};
    padding: 30px;
    border-radius: 8px;
    filter: drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.06));
    margin-right: 15px;

    &:last-child{
        margin-right: 0px;
    }

    .food-category-title {
        font-family: ${fonts.default};
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: ${colors.black};
    }
`;

export const FoodCategoryList = styled.div`
    padding: 15px 20px;
    border-radius: 8px;
    filter: drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.06));
    margin-top: 15px;
    background: ${(props) => props.isActive ? `${colors.white}` : '#ffe5e5' };
    min-width: 240px;
    display: flex;
`;

export const FoodItemImg = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 20px;
`;

export const FoodItemRight = styled.div`
    width: calc(100% - 70px);
    position: relative;

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
        margin-bottom: 10px;
        width: 70%;
    }

    .food-item-name-list{
        font-family: ${fonts.default};
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 15px;
        color: #979797;
        margin-bottom: 25px;
    }

    .food-item-price{
        font-family: ${fonts.default};
        font-style: normal;
        font-weight: 600;
        font-size: 11px;
        line-height: 15px;
        color: #000000;
    }

    .food-type{
        font-family: ${fonts.default};
        font-style: normal;
        font-weight: 600;
        font-size: 10px;
        line-height: 15px;
        color: #000000;
        margin-left: 5px;
    }
`;

export const FoodNameCont = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const FoodTypeCont = styled.div`
    display: flex;
    position: absolute;
    right: 0;
    bottom: 0;
    align-items: center;
`;

export const FoodProductList = ({...props}) => {


    const getImageUrl = (imageUrl) => {
        var croppedString = imageUrl.replace('master/db/food/','')
        return `/images/food/${croppedString}`
    }

    return (
        <FoodProductListContWrapper>
            {props.productCategories.map((item, index) => {
                return (
                    <FoodCategoryListCont key={index}>
                        <Text className="food-category-title" tag="h2" text={item} />
                        {props.productListData.map((productItem, productIndex) => {
                            return (
                                productItem.category === item && <FoodCategoryList key={productIndex} isActive = {productItem.is_active}>
                                    <Icon className="food-more-option" name="moreOption" />
                                    <FoodItemImg>
                                        <Image className="food-item-image" 
                                            mobilesrcfile={getImageUrl(productItem.image_url)} 
                                            tabletsrcfile={getImageUrl(productItem.image_url)} 
                                            desktopsrcfile={getImageUrl(productItem.image_url)}
                                        />
                                    </FoodItemImg>
                                    <FoodItemRight>
                                        <FoodNameCont>
                                            <Text className="food-item-name" tag="h3" text={productItem.name} />
                                            <label className="switch">
                                                <input type="checkbox" checked={productItem.is_active} onChange={(event) => props.updateProductStatus(event, productItem)}/>
                                                <span className="slider round"></span>
                                            </label>
                                        </FoodNameCont>
                                        <Text tag="h4" className="food-item-name-list" text={`Id: ${productItem.prd_id}`} />
                                        <Text tag="h4" className="food-item-name-list" text={`${productItem.quantity} ${productItem.description}`} />
                                        <Text tag="p" className="food-item-price" text={`₹ ${productItem.price}`} />
                                        {productItem?.type && 
                                            <FoodTypeCont>
                                                <span className={`${productItem?.type?.trim()?.toUpperCase() === "NON-VEG" ? 'food-non-veg-icon' : 'food-veg-icon'}`}></span>
                                                <Text className="food-type" tag="span" text={productItem.type} />
                                            </FoodTypeCont>
                                        }
                                    </FoodItemRight>
                                </FoodCategoryList>
                            )}
                        )}
                    </FoodCategoryListCont>
    
                )}
            )}
        </FoodProductListContWrapper>
    );
};

FoodProductList.defaultProps = {};

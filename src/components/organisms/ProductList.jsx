import React from 'react';
import styled from 'styled-components/macro';
import { colors } from '../../theme';
import { Icon } from '../atoms';

export const ProductListContWrapper = styled.section`
    background: ${colors.white};
    width: calc(50% - 20px);
    display: flex;
    border-radius: 16px;
    padding: 50px;
    flex-wrap: wrap;
    margin-bottom: 50px;
`;

export const ProductListWrapper = styled.div`
    width: 130px;
    height: 130px;
    background: rgba(41, 185, 81, 0.15);
    align-items: center;
    justify-content: center;
    display: flex;
    margin-right: 50px;
    margin-bottom: 50px;

    &:nth-child(3n) {
        margin-right: 0;
    }

    &.product-disable{
        background: rgba(239, 56, 54, 0.08);
    }

    &:nth-last-child(3), &:nth-last-child(2), &:last-child {
        margin-bottom: 0;
    }
`;

export const ProductList = ({...props}) => {
    return (
        <ProductListContWrapper>
            {props.prodcuts.map((item, index) => {
                return (
                    <ProductListWrapper className={item.is_active ? '' : 'product-disable'} key={index}>
                        <Icon name={item.is_active ? "table" : "tableSlash"} width="67" height="67" />
                    </ProductListWrapper>
                )}
            )}
      
        </ProductListContWrapper>
    );
};

ProductList.defaultProps = {};

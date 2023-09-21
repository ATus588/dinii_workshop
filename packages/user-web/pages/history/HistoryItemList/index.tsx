import { Spacer } from "components/Spacer";
import { HistoryItems } from "hooks/useHistoryItems/types";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { CartItem } from "hooks/useCartItems/types";
import { useAuth } from "hooks/useAuth";
import { Add, Remove } from "@material-ui/icons";

import { Badge, Typography } from "@material-ui/core";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(1)}px;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => theme.spacing(1)}px;
`;

const StyledImage = styled(Image)`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`;

// const CardActions = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   align-items: flex-end;
//   justify-content: flex-end;
//   position: absolute;
//   padding: ${({ theme }) => theme.spacing(1)}px;
//   color: ${({ theme }) => theme.palette.common.white};
// `;

// const CartActionButton = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 48px;
//   height: 48px;
//   border-radius: 50%;
//   background: rgba(128, 128, 128, 0.5);
// `;

const Name = styled(Typography).attrs({ variant: "body2" })`
  font-weight: bold;
  flex: 1;
`;

const Description = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

const Price = styled.div`
  opacity: 0.7
`
const User = styled.div`
  color: red;
`
const Quantity = styled.div`
display: flex;
`
const Reorder = styled.input`
  text-align: center;
  width: 30px;
`

type Props = {
  historyItems: HistoryItems[];
  cartItems: CartItem[];
  onAdd: (menuId: string) => void;
  onRemove: (menuId: string) => void;
};

type TimeProps = {
  orderedAt: string
}

const Time = ({orderedAt}: TimeProps) => {

  const dateOrderedAt =  new Date(orderedAt);

  const time = {
    hour: dateOrderedAt.getHours(),
    min: dateOrderedAt.getMinutes(),
    month: dateOrderedAt.getMonth(),
    day: dateOrderedAt.getDay(),
    year: dateOrderedAt.getFullYear()
  }

  return (
    <span>{`${time.hour}:${time.min}  ${time.year}年${time.month}月${time.day}日`}</span>
  )
}

export const HistoryItemList = ({ historyItems, cartItems, onAdd, onRemove }: Props) => {

  const userId = useAuth().userId;
  
  const cartCountMap = cartItems.reduce((acc, { menuId, quantity, user }) => {
    if (user.id !== userId) return acc;
    acc[menuId] = (acc[menuId] ?? 0) + quantity;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Container>
      {historyItems.map(({ id, name, price, quantity, menu, orderedAt, user }) => (
        <Card key={id}>
          <Badge badgeContent={quantity} color="secondary">
            <StyledImage key={menu.image} src={`/images/${menu.image}`} width={64} height={64} alt={name} />
          </Badge>
          <Spacer size={1} />
          <Remove onClick={() => onRemove(menu.id)} />
          <Reorder type="text" value={cartCountMap[menu.id] ?? 0} readOnly={true} />
          <Add onClick={() => onAdd(menu.id)} />
          <Spacer size={1} />
          <Description>
            <Name>{name}</Name>
            <Spacer size={1} />
            <User>{user.name}</User>
            <Spacer size={1} />
            <Time orderedAt={orderedAt} />
            <Spacer size={1} />
            <Quantity>{quantity}</Quantity>
            <Spacer size={1} />
            <Price>￥ {price*quantity}</Price>
          </Description>
        </Card>
      ))}
    </Container>
  );
}
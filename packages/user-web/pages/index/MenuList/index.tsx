import React, { useState } from "react";
import { CartItem } from "hooks/useCartItems/types";
import { useAuth } from "hooks/useAuth";

import { Menu } from "pages/index/types";
import { formatPrice } from "util/formatPrice";
import styled from "styled-components";
import Image from "next/image";
import { Badge, Typography, Modal, Divider } from "@material-ui/core";
import { Add, Remove, Visibility, Star } from "@material-ui/icons";
import { Spacer } from "components/Spacer";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(1)}px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 160px;
  margin: ${({ theme }) => theme.spacing(1)}px;
`;

const CardImage = styled.div`
  width: 160px;
  height: 160px;
  position: relative;
`;

const StyledImage = styled(Image)`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`;

const CardActions = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  position: absolute;
  padding: ${({ theme }) => theme.spacing(1)}px;
  color: ${({ theme }) => theme.palette.common.white};
`;

const CartActionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(128, 128, 128, 0.5);
`;

const Name = styled(Typography).attrs({ variant: "body2" })`
  font-weight: bold;
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Rating = styled.span`
  border: 1px solid yellow;
  color: yellow;
  padding: 5px;
  display: flex;
  align-items: center;
`
const Reviews = styled.div`
  width: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid black;
`

type Props = {
  menus: Menu[];
  cartItems: CartItem[];
  onAdd: (menuId: string) => void;
  onRemove: (menuId: string) => void;
};

type ReviewListProps = {
  reviews: Array<{ comment: string, createdAt: string, rating: number, user: { name: string, id: string } } | null>,
  close: () => void
}


const ReviewList = ({ reviews, close }: ReviewListProps) => {

  if (reviews.length == 0) return <>No reviews yet</>
  return (
    <Reviews>
      <button onClick={close}>Close</button>
      {reviews.map((review) => (
        <>
          <div>{review?.user.name}</div>
          <div>{review?.comment}</div>
          <div>{review?.rating}</div>
        </>
      ))}
    </Reviews>
  )
}

export const MenuList = ({ menus, cartItems, onAdd, onRemove }: Props) => {
  const userId = useAuth().userId;
  const cartCountMap = cartItems.reduce((acc, { menuId, quantity, addedUserId }) => {
    if (addedUserId !== userId) return acc;
    acc[menuId] = (acc[menuId] ?? 0) + quantity;
    return acc;
  }, {} as Record<string, number>);
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <Container>
      {menus.map(({ id, name, price, image }) => (
        <Card key={id}>
          <Badge badgeContent={cartCountMap[id] ?? 0} color="secondary">
            <CardImage>
              <StyledImage key={image} src={`http://localhost:3000/images/${image}`} width={160} height={160} alt={name} />
            </CardImage>
            <CardActions>
              <CartActionButton onClick={() => handleOpen()}>
                <Visibility />
              </CartActionButton>
              <Spacer size={1} />
              {cartCountMap[id] > 0 && (
                <CartActionButton onClick={() => onRemove(id)}>
                  <Remove />
                </CartActionButton>
              )}
              <Spacer size={1} />
              <CartActionButton onClick={() => onAdd(id)}>
                <Add />
              </CartActionButton>
            </CardActions>
          </Badge>
          <Spacer size={1} />
          <Description>
            <Name>{name}</Name>
            <Spacer size={1} />
            <Typography variant="caption">{formatPrice(price)}</Typography>
          </Description>
        </Card>
      ))}
      {open && <ReviewList reviews={[]} close={handleClose}/>}
    </Container>
  );
};

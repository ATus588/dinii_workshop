import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import { HistoryOutlined, MoreVertOutlined } from "@material-ui/icons";
import { useSignOut } from "hooks/useSignOut";
import React, { useState, useCallback } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.palette.common.white};
  background: ${({ theme }) => theme.palette.primary.main};
  padding: ${({ theme }) => theme.spacing(2)}px ${({ theme }) => theme.spacing(1)}px 0;
  position: relative;
`;


export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);


  const { signOut } = useSignOut();


  return (
    <Container>
      <a href="/history" style={{ textDecoration: "none" }}>
        <Button color="inherit" startIcon={<HistoryOutlined />} >
          履歴
        </Button>
      </a>
      <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertOutlined />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={signOut}>ログアウト</MenuItem>
      </Menu>
    </Container>
  );
};

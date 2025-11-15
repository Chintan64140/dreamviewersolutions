"use client";
import React from "react";
import Header from "../Components/Header";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const ShowHeader = pathname !== "/";
  return (
    <Box
      sx={{
        padding: ShowHeader ? "20px" : "0px",
      }}
      className="bg-[#f2faff] h-screen"
    >
      {ShowHeader && <Header />}
      {children}
    </Box>
  );
};
export default Layout;

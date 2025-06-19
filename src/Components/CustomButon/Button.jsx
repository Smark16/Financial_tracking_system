import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({text = '', icon = null ,onClick, variant ='contained',sx = {}, ...props}) => {

const defaultStyles = {
      borderRadius: 2,
      textTransform: 'none',
      px: 3,
      py: 1.5,
      bgcolor: '#800020',
      boxShadow: (theme) => theme.shadows[4],
      '&:hover': {
        bgcolor: '#600018', // Darker shade for hover
      }
    };

    return (
        <Button
        variant={variant}
        startIcon={icon}
        onClick={onClick}
        sx={{...defaultStyles, ...sx}}
        {...props}
     >
      {text}
    </Button>
    )
}

export default CustomButton
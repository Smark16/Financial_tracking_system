"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { styled } from "@mui/material/styles"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Avatar,
  Divider,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  Money as FeesIcon,
  Receipt,
  People as UsersIcon,
  EventNote as CalendarIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material"
import "bootstrap/dist/css/bootstrap.min.css"

// Custom styled components
const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}))

const SidebarFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: "auto",
}))

const StyledListItemButton = styled(ListItemButton)(({ theme, active }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(0.5),
  backgroundColor: active ? theme.palette.action.selected : "transparent",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}))

function Sidebar() {
  const theme = useTheme()
  const location = useLocation()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [isOpen, setIsOpen] = useState(!isMobile)

  useEffect(() => {
    // Close sidebar on mobile when location changes
    if (isMobile) {
      setIsOpen(false)
    }
  }, [location, isMobile])

  useEffect(() => {
    // Update isOpen state when screen size changes
    setIsOpen(!isMobile)
  }, [isMobile])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const navigationItems = [
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      href: "/accounts/account_dashboard",
    },
    {
      title: "Tution Tracking",
      icon: <FeesIcon />,
      href: "/accounts/fees",
    },
    {
      title: "Expense Management",
      icon: <Receipt/>,
      href: "/accounts/expense",
    },
    {
      title: "Reports",
      icon: <CalendarIcon />,
      href: "/accounts/account_reports",
    },
    {
      title: "Settings",
      icon: <SettingsIcon />,
      href: "/admin/settings",
    },
  ]

  const drawer = (
    <>
      <SidebarHeader className="border-bottom">
        <Avatar alt="Admin" src="/placeholder.jpg" />
        <Box>
          <Typography variant="caption" color="text.secondary">
            Admin
          </Typography>
          <Typography
            variant="body2"
            component={Link}
            to="/accounts/account_profile"
            className="d-flex ms-auto"
            sx={{ textDecoration: "none", fontWeight: "medium" }}
          >
            View Profile
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={toggleSidebar} sx={{ marginLeft: "auto" }} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </SidebarHeader>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography variant="overline" color="text.secondary" sx={{ fontWeight: "bold" }}>
          Navigation
        </Typography>
        <List component="nav" sx={{ px: 0 }}>
          {navigationItems.map((item) => (
            <ListItem key={item.title} disablePadding>
              <StyledListItemButton component={Link} to={item.href} active={location.pathname === item.href ? 1 : 0}>
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </StyledListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider />

      <SidebarFooter>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<LogoutIcon />}
          component={Link}
          to="/admin/logout"
          sx={{ justifyContent: "flex-start" }}
        >
          Log out
        </Button>
      </SidebarFooter>
    </>
  )

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && !isOpen && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleSidebar}
          edge="start"
          className="position-fixed"
          sx={{ m: 2, zIndex: 1100 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Mobile drawer */}
      {isMobile ? (
        <Drawer
          anchor="left"
          open={isOpen}
          onClose={toggleSidebar}
          sx={{
            width: 280,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 280,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        /* Desktop permanent drawer */
        <Drawer
          variant="permanent"
          sx={{
            width: 280,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 280,
              boxSizing: "border-box",
              borderRight: "1px solid rgba(0, 0, 0, 0.12)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </>
  )
}

export default Sidebar

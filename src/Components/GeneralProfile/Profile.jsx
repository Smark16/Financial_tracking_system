"use client"

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  IconButton,
  Paper,
  Container,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Person, Edit, Email, CalendarToday, Close, AccountCircle } from "@mui/icons-material";
import CustomButton from "../CustomButon/Button";

export default function Profile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "Smark",
    lastName: "Kagwa",
    email: "User@gmail.com",
    role: "Accountant",
    dateJoined: "07/23/2025",
    status: "Accounts",
  });

  const [editData, setEditData] = useState(userData);

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setUserData(editData);
    setModal(false);
  };

  const handleCancel = () => {
    setEditData(userData);
    setModal(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: "linear-gradient(128deg, #030101 43%, #f2295b 100%)",
          opacity:0.86,
          color: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold" textAlign="center">
          User Profile
        </Typography>
      </Paper>

      {/* Profile Card */}
      <Card elevation={3} sx={{ borderRadius: 3, overflow: "visible" }}>
        {/* Profile Header */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            p: 3,
            position: "relative",
          }}
        >
          <Stack direction={isMobile ? "column" : "row"} spacing={3} alignItems={isMobile ? "center" : "flex-start"}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor:" #f2295b",
                fontSize: "3rem",
                boxShadow: theme.shadows[8],
              }}
            >
              <Person sx={{ fontSize: "4rem" }} />
            </Avatar>

            <Box sx={{ flex: 1, textAlign: isMobile ? "center" : "left" }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {userData.firstName} {userData.lastName}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {userData.role}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent={isMobile ? "center" : "flex-start"}
              >
                <Email fontSize="small" />
                <Typography variant="body1">{userData.email}</Typography>
              </Stack>
            </Box>

            <CustomButton text="Edit Profile" icon={<Edit/>} onClick={() => setModal(true)}/>

          </Stack>
        </Box>

        {/* Profile Information */}
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
            User Information
          </Typography>

          <div className="row g-4">
            <div className="col-md-6">
            <Box>
                <Typography variant="body2" color="text.secondary">
                  First Name
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  Smark
                </Typography>
              </Box>
            </div>

            <div className="col-md-6">
            <Box>
                <Typography variant="body2" color="text.secondary">
                  Last Name
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  Kagwa
                </Typography>
              </Box>
            </div>

            <div className="col-md-6">
            <Box>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  User@gmail.com
                </Typography>
              </Box>
            </div>

            <div className="col-md-6">
            <Box>
                <Typography variant="body2" color="text.secondary">
                  Date Joined
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  07/23/2025
                </Typography>
              </Box>
            </div>

            <div className="col-md-6">
            <Box>
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                label= "Accounts"
                  color="primary"
                  sx={{
                    bgcolor: "#9c27b0",
                    fontWeight: "medium",
                  }}
                />
              </Box>
            </div>

        </div>

          <Divider sx={{ my: 4 }} />

          {/* Summary Card */}
          <Paper
            elevation={1}
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: "primary.50",
              border: `1px solid ${theme.palette.primary.light}`,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                sx={{
                  bgcolor:" #f2295b",
                  width: 56,
                  height: 56,
                }}
              >
                <AccountCircle />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {userData.email}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CalendarToday fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Member since {userData.dateJoined}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </CardContent>
      </Card>

      {/* Edit Profile Dialog */}
      <Dialog
        open={modal}
        onClose={handleCancel}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="bold">
              Edit Profile
            </Typography>
            <IconButton onClick={handleCancel} size="small">
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={editData.firstName}
                onChange={(e) => handleEditChange("firstName", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={editData.lastName}
                onChange={(e) => handleEditChange("lastName", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={editData.email}
                onChange={(e) => handleEditChange("email", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Role"
                value={editData.role}
                onChange={(e) => handleEditChange("role", e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button onClick={handleCancel} variant="contained"  sx={{ borderRadius: 2, textTransform: "none", px: 3, py: 1.5, bgcolor: '#FFC000'}}>
            Cancel
          </Button>
         
          <CustomButton onClick={handleSave} text="Save Changes"/>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
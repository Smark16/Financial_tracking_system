"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Switch,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  Paper,
  Avatar,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert,
  Tabs,
  Tab,
  Slider,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material"
import {
  Settings as SettingsIcon,
  Person,
  Security,
  Notifications,
  Palette,
  Email,
  Sms,
  DarkMode,
  LightMode,
  Save,
  RestoreFromTrash,
  CloudUpload,
  Download,
  Shield,
  Key,
  Fingerprint,
  Visibility,
  VisibilityOff,
  Close,
  Payment,
  Assessment,
  AdminPanelSettings,
  Backup,
  Update,
  BugReport,
  Warning,
  CheckCircle,
} from "@mui/icons-material"

// Initial settings data
const initialSettings = {
  profile: {
    name: "John Administrator",
    email: "admin@school.edu",
    role: "System Administrator",
    avatar: "",
    phone: "+256 700 123 456",
    department: "IT Department",
  },
  preferences: {
    theme: "light",
    language: "English",
    timezone: "Africa/Kampala",
    dateFormat: "DD/MM/YYYY",
    currency: "UGX",
  },
  notifications: {
    email: true,
    sms: false,
    push: true,
    paymentReminders: true,
    systemUpdates: true,
    securityAlerts: true,
    reportGeneration: false,
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginNotifications: true,
  },
  system: {
    autoBackup: true,
    backupFrequency: "daily",
    dataRetention: 365,
    maintenanceMode: false,
  },
}

const settingsTabs = [
  { label: "Profile", icon: <Person />, value: 0 },
  { label: "Preferences", icon: <Palette />, value: 1 },
  { label: "Notifications", icon: <Notifications />, value: 2 },
  { label: "Security", icon: <Security />, value: 3 },
  { label: "System", icon: <AdminPanelSettings />, value: 4 },
]

export default function Settings() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [activeTab, setActiveTab] = useState(0)
  const [settings, setSettings] = useState(initialSettings)
  const [showPassword, setShowPassword] = useState(false)
  const [changePasswordDialog, setChangePasswordDialog] = useState(false)
  const [backupDialog, setBackupDialog] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [backupType, setBackupType] = useState("full")
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  const handleSettingChange = (category, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }))
    setUnsavedChanges(true)
  }

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSaveSettings = async () => {
    try {
      // Simulate API call to save settings
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Save to localStorage as a fallback
      localStorage.setItem("schoolSettings", JSON.stringify(settings))
      console.log("Settings saved:", settings)
      setUnsavedChanges(false)
      setError("")
    } catch (err) {
      setError("Failed to save settings. Please try again.")
    }
  }

  const handleResetSettings = () => {
    setSettings(initialSettings)
    setUnsavedChanges(false)
    setError("")
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New password and confirmation do not match")
      return
    }
    if (passwordData.newPassword.length < 8) {
      setError("New password must be at least 8 characters long")
      return
    }
    try {
      // Simulate API call to change password
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Password changed successfully")
      setChangePasswordDialog(false)
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setError("")
    } catch (err) {
      setError("Failed to change password. Please check your current password.")
    }
  }

  const handleCreateBackup = async () => {
    try {
      // Simulate API call to create backup
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log(`Creating ${backupType} backup`)
      setBackupDialog(false)
      setBackupType("full")
      setError("")
    } catch (err) {
      setError("Failed to create backup. Please try again.")
    }
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: 3,
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <SettingsIcon />
              System Settings
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
              Configure your system preferences and security settings
            </Typography>
          </Box>
          {unsavedChanges && (
            <Alert
              severity="warning"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                "& .MuiAlert-icon": { color: "white" },
              }}
            >
              You have unsaved changes
            </Alert>
          )}
        </Stack>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Settings Navigation */}
        <Grid item xs={12} md={3}>
          <Card elevation={2} sx={{ borderRadius: 3, position: "sticky", top: 20 }}>
            <CardContent sx={{ p: 0 }}>
              <Tabs
                orientation={isMobile ? "horizontal" : "vertical"}
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  "& .MuiTab-root": {
                    minHeight: 60,
                    justifyContent: "flex-start",
                    textAlign: "left",
                    px: 3,
                  },
                }}
              >
                {settingsTabs.map((tab) => (
                  <Tab
                    key={tab.value}
                    icon={tab.icon}
                    label={tab.label}
                    iconPosition="start"
                    sx={{
                      "&.Mui-selected": {
                        bgcolor: "primary.50",
                        color: "primary.main",
                      },
                    }}
                  />
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </Grid>

        {/* Settings Content */}
        <Grid item xs={12} md={9}>
          {/* Profile Settings */}
          {activeTab === 0 && (
            <Stack spacing={3}>
              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                    Profile Information
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ textAlign: "center" }}>
                        <Avatar
                          sx={{
                            width: 120,
                            height: 120,
                            mx: "auto",
                            mb: 2,
                            bgcolor: "primary.main",
                            fontSize: "3rem",
                          }}
                        >
                          {settings.profile.name.charAt(0)}
                        </Avatar>
                        <Button variant="outlined" startIcon={<CloudUpload />} sx={{ textTransform: "none" }}>
                          Upload Photo
                        </Button>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={8}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Full Name"
                            value={settings.profile.name}
                            onChange={(e) => handleSettingChange("profile", "name", e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={settings.profile.email}
                            onChange={(e) => handleSettingChange("profile", "email", e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Phone Number"
                            value={settings.profile.phone}
                            onChange={(e) => handleSettingChange("profile", "phone", e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <InputLabel>Department</InputLabel>
                            <Select
                              value={settings.profile.department}
                              label="Department"
                              onChange={(e) => handleSettingChange("profile", "department", e.target.value)}
                            >
                              <MenuItem value="IT Department">IT Department</MenuItem>
                              <MenuItem value="Finance Department">Finance Department</MenuItem>
                              <MenuItem value="Academic Department">Academic Department</MenuItem>
                              <MenuItem value="Administration">Administration</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Role"
                            value={settings.profile.role}
                            onChange={(e) => handleSettingChange("profile", "role", e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                    Account Security
                  </Typography>
                  <Stack spacing={2}>
                    <Button
                      variant="outlined"
                      startIcon={<Key />}
                      onClick={() => setChangePasswordDialog(true)}
                      sx={{ textTransform: "none", justifyContent: "flex-start" }}
                    >
                      Change Password
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Download />}
                      sx={{ textTransform: "none", justifyContent: "flex-start" }}
                    >
                      Download Account Data
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          )}

          {/* Preferences Settings */}
          {activeTab === 1 && (
            <Stack spacing={3}>
              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                    Display Preferences
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Theme</InputLabel>
                        <Select
                          value={settings.preferences.theme}
                          label="Theme"
                          onChange={(e) => handleSettingChange("preferences", "theme", e.target.value)}
                        >
                          <MenuItem value="light">
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <LightMode />
                              <span>Light</span>
                            </Stack>
                          </MenuItem>
                          <MenuItem value="dark">
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <DarkMode />
                              <span>Dark</span>
                            </Stack>
                          </MenuItem>
                          <MenuItem value="auto">Auto</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Language</InputLabel>
                        <Select
                          value={settings.preferences.language}
                          label="Language"
                          onChange={(e) => handleSettingChange("preferences", "language", e.target.value)}
                        >
                          <MenuItem value="English">English</MenuItem>
                          <MenuItem value="Luganda">Luganda</MenuItem>
                          <MenuItem value="Swahili">Swahili</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Timezone</InputLabel>
                        <Select
                          value={settings.preferences.timezone}
                          label="Timezone"
                          onChange={(e) => handleSettingChange("preferences", "timezone", e.target.value)}
                        >
                          <MenuItem value="Africa/Kampala">East Africa Time (EAT)</MenuItem>
                          <MenuItem value="UTC">UTC</MenuItem>
                          <MenuItem value="America/New_York">Eastern Time</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Date Format</InputLabel>
                        <Select
                          value={settings.preferences.dateFormat}
                          label="Date Format"
                          onChange={(e) => handleSettingChange("preferences", "dateFormat", e.target.value)}
                        >
                          <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                          <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                          <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Currency</InputLabel>
                        <Select
                          value={settings.preferences.currency}
                          label="Currency"
                          onChange={(e) => handleSettingChange("preferences", "currency", e.target.value)}
                        >
                          <MenuItem value="UGX">UGX - Ugandan Shilling</MenuItem>
                          <MenuItem value="USD">USD - US Dollar</MenuItem>
                          <MenuItem value="EUR">EUR - Euro</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Stack>
          )}

          {/* Notifications Settings */}
          {activeTab === 2 && (
            <Stack spacing={3}>
              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                    Notification Preferences
                  </Typography>

                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Email />
                      </ListItemIcon>
                      <ListItemText primary="Email Notifications" secondary="Receive notifications via email" />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={settings.notifications.email}
                          onChange={(e) => handleSettingChange("notifications", "email", e.target.checked)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <Sms />
                      </ListItemIcon>
                      <ListItemText primary="SMS Notifications" secondary="Receive notifications via SMS" />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={settings.notifications.sms}
                          onChange={(e) => handleSettingChange("notifications", "sms", e.target.checked)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <Notifications />
                      </ListItemIcon>
                      <ListItemText primary="Push Notifications" secondary="Receive browser push notifications" />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={settings.notifications.push}
                          onChange={(e) => handleSettingChange("notifications", "push", e.target.checked)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>

                    <Divider sx={{ my: 2 }} />

                    <ListItem>
                      <ListItemIcon>
                        <Payment />
                      </ListItemIcon>
                      <ListItemText primary="Payment Reminders" secondary="Notifications for overdue payments" />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={settings.notifications.paymentReminders}
                          onChange={(e) => handleSettingChange("notifications", "paymentReminders", e.target.checked)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <Update />
                      </ListItemIcon>
                      <ListItemText primary="System Updates" secondary="Notifications about system updates" />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={settings.notifications.systemUpdates}
                          onChange={(e) => handleSettingChange("notifications", "systemUpdates", e.target.checked)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <Shield />
                      </ListItemIcon>
                      <ListItemText primary="Security Alerts" secondary="Important security notifications" />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={settings.notifications.securityAlerts}
                          onChange={(e) => handleSettingChange("notifications", "securityAlerts", e.target.checked)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <Assessment />
                      </ListItemIcon>
                      <ListItemText primary="Report Generation" secondary="Notifications when reports are ready" />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={settings.notifications.reportGeneration}
                          onChange={(e) => handleSettingChange("notifications", "reportGeneration", e.target.checked)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Stack>
          )}

          {/* Security Settings */}
          {activeTab === 3 && (
            <Stack spacing={3}>
              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                    Security Settings
                  </Typography>

                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Fingerprint />
                      </ListItemIcon>
                      <ListItemText
                        primary="Two-Factor Authentication"
                        secondary="Add an extra layer of security to your account"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={settings.security.twoFactorAuth}
                          onChange={(e) => handleSettingChange("security", "twoFactorAuth", e.target.checked)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <Notifications />
                      </ListItemIcon>
                      <ListItemText primary="Login Notifications" secondary="Get notified of new login attempts" />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={settings.security.loginNotifications}
                          onChange={(e) => handleSettingChange("security", "loginNotifications", e.target.checked)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>

                  <Divider sx={{ my: 3 }} />

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Session Timeout (minutes)
                      </Typography>
                      <Slider
                        value={settings.security.sessionTimeout}
                        onChange={(e, value) => handleSettingChange("security", "sessionTimeout", value)}
                        min={5}
                        max={120}
                        step={5}
                        marks={[
                          { value: 5, label: "5m" },
                          { value: 30, label: "30m" },
                          { value: 60, label: "1h" },
                          { value: 120, label: "2h" },
                        ]}
                        valueLabelDisplay="auto"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Password Expiry (days)
                      </Typography>
                      <Slider
                        value={settings.security.passwordExpiry}
                        onChange={(e, value) => handleSettingChange("security", "passwordExpiry", value)}
                        min={30}
                        max={365}
                        step={30}
                        marks={[
                          { value: 30, label: "30d" },
                          { value: 90, label: "90d" },
                          { value: 180, label: "180d" },
                          { value: 365, label: "1y" },
                        ]}
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                    Active Sessions
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Current Session"
                        secondary="Chrome on Windows • Kampala, Uganda • Active now"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Warning color="warning" />
                      </ListItemIcon>
                      <ListItemText primary="Mobile Session" secondary="Safari on iPhone • Last active 2 hours ago" />
                      <ListItemSecondaryAction>
                        <Button size="small" color="error">
                          Revoke
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Stack>
          )}

          {/* System Settings */}
          {activeTab === 4 && (
            <Stack spacing={3}>
              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                    System Configuration
                  </Typography>

                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Backup />
                      </ListItemIcon>
                      <ListItemText primary="Automatic Backup" secondary="Automatically backup system data" />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={settings.system.autoBackup}
                          onChange={(e) => handleSettingChange("system", "autoBackup", e.target.checked)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <Warning />
                      </ListItemIcon>
                      <ListItemText primary="Maintenance Mode" secondary="Enable maintenance mode for system updates" />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={settings.system.maintenanceMode}
                          onChange={(e) => handleSettingChange("system", "maintenanceMode", e.target.checked)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>

                  <Divider sx={{ my: 3 }} />

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Backup Frequency</InputLabel>
                        <Select
                          value={settings.system.backupFrequency}
                          label="Backup Frequency"
                          onChange={(e) => handleSettingChange("system", "backupFrequency", e.target.value)}
                        >
                          <MenuItem value="hourly">Hourly</MenuItem>
                          <MenuItem value="daily">Daily</MenuItem>
                          <MenuItem value="weekly">Weekly</MenuItem>
                          <MenuItem value="monthly">Monthly</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Data Retention (days)
                      </Typography>
                      <Slider
                        value={settings.system.dataRetention}
                        onChange={(e, value) => handleSettingChange("system", "dataRetention", value)}
                        min={30}
                        max={2555}
                        step={30}
                        marks={[
                          { value: 30, label: "30d" },
                          { value: 365, label: "1y" },
                          { value: 1095, label: "3y" },
                          { value: 2555, label: "7y" },
                        ]}
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                    System Actions
                  </Typography>
                  <Stack spacing={2}>
                    <Button
                      variant="outlined"
                      startIcon={<Backup />}
                      onClick={() => setBackupDialog(true)}
                      sx={{ textTransform: "none", justifyContent: "flex-start" }}
                    >
                      Create System Backup
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Update />}
                      sx={{ textTransform: "none", justifyContent: "flex-start" }}
                    >
                      Check for Updates
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<BugReport />}
                      sx={{ textTransform: "none", justifyContent: "flex-start" }}
                    >
                      Generate System Report
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          )}

          {/* Action Buttons */}
          <Card elevation={2} sx={{ borderRadius: 3, mt: 4 }}>
            <CardContent>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  startIcon={<RestoreFromTrash />}
                  onClick={handleResetSettings}
                  disabled={!unsavedChanges}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSaveSettings}
                  disabled={!unsavedChanges}
                >
                  Save Changes
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Change Password Dialog */}
      <Dialog open={changePasswordDialog} onClose={() => setChangePasswordDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              Change Password
            </Typography>
            <IconButton onClick={() => setChangePasswordDialog(false)} size="small">
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Current Password"
              type={showPassword ? "text" : "password"}
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setChangePasswordDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleChangePassword}>
            Update Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Backup Dialog */}
      <Dialog open={backupDialog} onClose={() => setBackupDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              Create System Backup
            </Typography>
            <IconButton onClick={() => setBackupDialog(false)} size="small">
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Alert severity="info">
              This will create a complete backup of your system data including student records, payment information, and
              system settings.
            </Alert>
            <FormControl>
              <Typography variant="body2" gutterBottom>
                Backup Type
              </Typography>
              <RadioGroup value={backupType} onChange={(e) => setBackupType(e.target.value)}>
                <FormControlLabel value="full" control={<Radio />} label="Full Backup (Recommended)" />
                <FormControlLabel value="incremental" control={<Radio />} label="Incremental Backup" />
                <FormControlLabel value="settings" control={<Radio />} label="Settings Only" />
              </RadioGroup>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setBackupDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" startIcon={<Backup />} onClick={handleCreateBackup}>
            Create Backup
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
"use client"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Container,
  Stack,
  IconButton,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  People,
  CheckCircle,
  Schedule,
  AccountBalance,
  Architecture,
  Landscape,
  Home,
  Build,
  ElectricalServices,
  Palette,
  MoreVert,
  Visibility,
} from "@mui/icons-material"

// Sample data
const statsData = [
  {
    title: "Total Income",
    value: "UGX 22,300,000",
    icon: <AccountBalance />,
    color: "#4caf50",
    trend: "+12.5%",
  },
  {
    title: "Total Students",
    value: "500",
    icon: <People />,
    color: "#2196f3",
    trend: "+8.2%",
  },
  {
    title: "Paid Students",
    value: "200",
    icon: <CheckCircle />,
    color: "#ff9800",
    trend: "+15.3%",
  },
  {
    title: "Pending Students",
    value: "300",
    icon: <Schedule />,
    color: "#f44336",
    trend: "-2.1%",
  },
]

const transactionData = [
  {
    id: 1,
    name: "SMark Opio",
    date: "11 July, 2025",
    studentId: "A98261",
    time: "11:00 PM",
    amount: "UGX 1,500,000",
    ref: "agsh45566444",
    status: "Successful",
  },
  {
    id: 2,
    name: "Jane Doe",
    date: "10 July, 2025",
    studentId: "A98262",
    time: "09:30 AM",
    amount: "UGX 1,200,000",
    ref: "bfth56677555",
    status: "Successful",
  },
  {
    id: 3,
    name: "John Smith",
    date: "09 July, 2025",
    studentId: "A98263",
    time: "02:15 PM",
    amount: "UGX 1,800,000",
    ref: "cgui67788666",
    status: "Pending",
  },
  {
    id: 4,
    name: "Mary Johnson",
    date: "08 July, 2025",
    studentId: "A98264",
    time: "04:45 PM",
    amount: "UGX 1,350,000",
    ref: "dhjk78899777",
    status: "Successful",
  },
  {
    id: 5,
    name: "David Wilson",
    date: "07 July, 2025",
    studentId: "A98265",
    time: "10:20 AM",
    amount: "UGX 1,650,000",
    ref: "eikl89900888",
    status: "Failed",
  },
]

const departmentData = [
  {
    name: "3D Architectural Design",
    revenue: "UGX 2,300,000",
    completed: 35,
    total: 100,
    icon: <Architecture />,
    color: "#1976d2",
  },
  {
    name: "Landscape Design",
    revenue: "UGX 1,800,000",
    completed: 42,
    total: 100,
    icon: <Landscape />,
    color: "#388e3c",
  },
  {
    name: "Interior Design",
    revenue: "UGX 2,100,000",
    completed: 28,
    total: 100,
    icon: <Home />,
    color: "#f57c00",
  },
  {
    name: "Structural Design",
    revenue: "UGX 1,950,000",
    completed: 55,
    total: 100,
    icon: <Build />,
    color: "#7b1fa2",
  },
  {
    name: "Mechanical and Plumbing Design",
    revenue: "UGX 1,650,000",
    completed: 38,
    total: 100,
    icon: <Build />,
    color: "#5d4037",
  },
  {
    name: "Electrical and Wiring Design",
    revenue: "UGX 1,750,000",
    completed: 45,
    total: 100,
    icon: <ElectricalServices />,
    color: "#fbc02d",
  },
  {
    name: "Graphics Design",
    revenue: "UGX 2,200,000",
    completed: 62,
    total: 100,
    icon: <Palette />,
    color: "#e91e63",
  },
]

export default function Dashboard() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "successful":
        return "success"
      case "pending":
        return "warning"
      case "failed":
        return "error"
      default:
        return "default"
    }
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 1,  color: "linear-gradient(128deg, #030101 43%, #f2295b 100%)"}}>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          Welcome back, Admin 👋
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={2}
              sx={{
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Chip
                      label={stat.trend}
                      size="small"
                      color={stat.trend.startsWith("+") ? "success" : "error"}
                      sx={{ fontSize: "0.75rem" }}
                    />
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: stat.color,
                      width: 56,
                      height: 56,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 4 }} />

      {/* Recent Transactions */}
      <Card elevation={2} sx={{ borderRadius: 3, mb: 4 }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight="bold">
                Recent Transactions
              </Typography>
              <IconButton size="small" color="primary">
                <Visibility />
              </IconButton>
            </Stack>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.50" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Student ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Reference</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionData.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    sx={{
                      "&:hover": { bgcolor: "grey.50" },
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                          {transaction.name.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" fontWeight="medium">
                          {transaction.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {transaction.studentId}
                      </Typography>
                    </TableCell>
                    <TableCell>{transaction.time}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold" color="success.main">
                        {transaction.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace" color="text.secondary">
                        {transaction.ref}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={transaction.status}
                        color={getStatusColor(transaction.status)}
                        size="small"
                        sx={{ fontWeight: "medium" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Divider sx={{ mb: 4 }} />

      {/* Department Performance */}
      <Box>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
          Department Performance
        </Typography>

        <Grid container spacing={3}>
          {departmentData.map((dept, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                elevation={1}
                sx={{
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: dept.color,
                        width: 48,
                        height: 48,
                      }}
                    >
                      {dept.icon}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {dept.name}
                      </Typography>
                      <Typography variant="body1" color="success.main" fontWeight="bold">
                        {dept.revenue}
                      </Typography>
                    </Box>
                    <IconButton size="small">
                      <MoreVert />
                    </IconButton>
                  </Stack>

                  <Box sx={{ mb: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Progress
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {dept.completed}/{dept.total} completed
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={(dept.completed / dept.total) * 100}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: "grey.200",
                        "& .MuiLinearProgress-bar": {
                          bgcolor: dept.color,
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}
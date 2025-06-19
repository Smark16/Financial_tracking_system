"use client"

import { useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Container,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Avatar,
  Paper,
  Grid,
  Divider,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material"
import {
  Search,
  FilterList,
  Visibility,
  Close,
  School,
  Payment,
  CalendarToday,
  Person,
  CheckCircle,
  Schedule,
  Warning,
} from "@mui/icons-material"
import CustomButton from "../../CustomButon/Button"

// Sample data
const transactionData = [
  {
    id: 1,
    name: "SMark Opio",
    date: "11 July, 2025",
    studentId: "A98261",
    time: "11:00 PM",
    amount: "UGX 1,500,000",
    reference: "agsh45566444",
    balance: "UGX 3,000",
    status: "Successful",
    course: "3D Architecture Design",
    year: "2025",
    semester: "Semester 2",
    currentStatus: "Paid",
    currentYear: "2025",
    currentSemester: "Semester 2",
  },
  {
    id: 2,
    name: "Jane Doe",
    date: "10 July, 2025",
    studentId: "A98262",
    time: "09:30 AM",
    amount: "UGX 1,200,000",
    reference: "bfth56677555",
    balance: "UGX 0",
    status: "Waiting Approval",
    course: "Interior Design",
    year: "2025",
    semester: "Semester 1",
    currentStatus: "Pending",
    currentYear: "2025",
    currentSemester: "Semester 1",
  },
  {
    id: 3,
    name: "John Smith",
    date: "09 July, 2025",
    studentId: "A98263",
    time: "02:15 PM",
    amount: "UGX 1,800,000",
    reference: "cgui67788666",
    balance: "UGX 150,000",
    status: "Approved",
    course: "Landscape Design",
    year: "2024",
    semester: "Semester 2",
    currentStatus: "Approved",
    currentYear: "2024",
    currentSemester: "Semester 2",
  },
  {
    id: 4,
    name: "Mary Johnson",
    date: "08 July, 2025",
    studentId: "A98264",
    time: "04:45 PM",
    amount: "UGX 1,350,000",
    reference: "dhjk78899777",
    balance: "UGX 300,000",
    status: "Waiting Approval",
    course: "Structural Design",
    year: "2025",
    semester: "Semester 1",
    currentStatus: "Pending",
    currentYear: "2025",
    currentSemester: "Semester 1",
  },
  {
    id: 5,
    name: "David Wilson",
    date: "07 July, 2025",
    studentId: "A98265",
    time: "10:20 AM",
    amount: "UGX 1,650,000",
    reference: "eikl89900888",
    balance: "UGX 0",
    status: "Approved",
    course: "Graphics Design",
    year: "2024",
    semester: "Semester 2",
    currentStatus: "Approved",
    currentYear: "2024",
    currentSemester: "Semester 2",
  },
]

const studentPaymentInfo = {
  name: "Smark Kagwa",
  studentId: "A98261",
  program: "3D Architecture Design (Year 2, Semester 2)",
  enrollmentStatus: "Active",
  academicYears: [
    {
      year: "2023 - 2024",
      semesters: [
        { semester: "Semester 1", paid: "UGX 2,350,000", balance: "UGX 0" },
        { semester: "Semester 2", paid: "UGX 1,350,000", balance: "UGX 300,000" },
      ],
    },
    {
      year: "2024 - 2025",
      semesters: [
        { semester: "Semester 1", paid: "UGX 2,350,000", balance: "UGX 0" },
        { semester: "Semester 2", paid: "UGX 1,350,000", balance: "UGX 300,000" },
      ],
    },
  ],
}

const courses = [
  "3D Architecture Design",
  "Landscape Design",
  "Interior Design",
  "Structural Design",
  "Mechanical And Plumbing Design",
  "Electrical And Wiring Design",
  "Graphics Design",
]

const dateFilters = ["Yesterday", "Today", "Last week", "This Month"]

export default function Fees() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [detailModal, setDetailModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedDateFilter, setSelectedDateFilter] = useState("")
  const [tabValue, setTabValue] = useState(0)
  const [transactions, setTransactions] = useState(transactionData)

  const getStatusColor = (status) => {
    switch (status) {
      case "Successful":
        return "success"
      case "Approved":
        return "success"
      case "Waiting Approval":
        return "warning"
      case "Pending":
        return "error"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Successful":
      case "Approved":
        return <CheckCircle />
      case "Waiting Approval":
        return <Schedule />
      case "Pending":
        return <Warning />
      default:
        return <Schedule />
    }
  }

  const handleViewDetails = (transaction) => {
    setSelectedStudent(studentPaymentInfo)
    setDetailModal(true)
  }

  const handleStatusChange = (transactionId, newStatus) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === transactionId ? { ...t, currentStatus: newStatus } : t))
    )
  }

  const handleYearChange = (transactionId, newYear) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === transactionId ? { ...t, currentYear: newYear } : t))
    )
  }

  const handleSemesterChange = (transactionId, newSemester) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === transactionId ? { ...t, currentSemester: newSemester } : t))
    )
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = !selectedCourse || transaction.course === selectedCourse
    return matchesSearch && matchesCourse
  })

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 1, color: "linear-gradient(128deg, #030101 43%, #f2295b 100%)" }}>
          Tuition Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage student tuition efficiently and track payment records
        </Typography>
      </Box>

      {/* Filters Section */}
      <Card elevation={2} sx={{ borderRadius: 3, mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
            <FilterList />
            Filter Transactions
          </Typography>

          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Filter by Course</InputLabel>
                <Select
                  value={selectedCourse}
                  label="Filter by Course"
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <MenuItem value="">All Courses</MenuItem>
                  {courses.map((course) => (
                    <MenuItem key={course} value={course}>
                      {course}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {dateFilters.map((filter) => (
                  <Chip
                    key={filter}
                    label={filter}
                    onClick={() => setSelectedDateFilter(filter === selectedDateFilter ? "" : filter)}
                    sx = {{
                      bgcolor: selectedDateFilter === filter ? "#f2295b" : "default"
                    }}
                    variant={selectedDateFilter === filter ? "filled" : "outlined"}
                    
                  />
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                placeholder="Search by Student ID or Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card elevation={2} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Typography variant="h6" fontWeight="bold">
              Tuition Transactions ({filteredTransactions.length})
            </Typography>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.50" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Student</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Date & Time</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Course</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Reference</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Balance</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTransactions.map((transaction) => (
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
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "#f2295b" }}>
                          {transaction.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {transaction.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" fontFamily="monospace">
                            {transaction.studentId}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">{transaction.date}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {transaction.time}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 150 }}>
                        {transaction.course}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold" color="success.main">
                        {transaction.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace" color="text.secondary">
                        {transaction.reference}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color={transaction.balance === "UGX 0" ? "success.main" : "warning.main"}
                      >
                        {transaction.balance}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(transaction.status)}
                        label={transaction.status}
                        color={getStatusColor(transaction.status)}
                        size="small"
                        sx={{ fontWeight: "medium" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="column" spacing={1} sx={{ minWidth: 200 }}>
                        <Stack direction="row" spacing={1}>
                          <FormControl size="small" sx={{ minWidth: 90 }}>
                            <Select
                              value={transaction.currentStatus}
                              onChange={(e) => handleStatusChange(transaction.id, e.target.value)}
                              displayEmpty
                            >
                              <MenuItem value="Pending">Pending</MenuItem>
                              <MenuItem value="Paid">Paid</MenuItem>
                              <MenuItem value="Approve">Approve</MenuItem>
                            </Select>
                          </FormControl>
                         
                          <CustomButton text="View" icon={<Visibility/>} onClick={() => handleViewDetails(transaction)}/>

                        </Stack>
                        <Stack direction="row" spacing={1}>
                          <FormControl size="small" sx={{ minWidth: 90 }}>
                            <Select
                              value={transaction.currentYear}
                              onChange={(e) => handleYearChange(transaction.id, e.target.value)}
                              displayEmpty
                            >
                              <MenuItem value="" disabled>
                                Choose Year
                              </MenuItem>
                              <MenuItem value="2024">2024</MenuItem>
                              <MenuItem value="2025">2025</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl size="small" sx={{ minWidth: 90 }}>
                            <Select
                              value={transaction.currentSemester}
                              onChange={(e) => handleSemesterChange(transaction.id, e.target.value)}
                              displayEmpty
                            >
                              <MenuItem value="" disabled>
                                Choose Semester
                              </MenuItem>
                              <MenuItem value="Semester 1">Semester 1</MenuItem>
                              <MenuItem value="Semester 2">Semester 2</MenuItem>
                            </Select>
                          </FormControl>
                        </Stack>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Student Payment Details Dialog */}
      <Dialog
        open={detailModal}
        onClose={() => setDetailModal(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="bold">
              Student Payment Details
            </Typography>
            <IconButton onClick={() => setDetailModal(false)} size="small">
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          {selectedStudent && (
            <Box>
              {/* Student Information */}
              <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: "primary.50" }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Avatar sx={{ width: 64, height: 64, bgcolor: "#f2295b" }}>
                    <Person sx={{ fontSize: "2rem" }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {selectedStudent.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontFamily="monospace">
                      StudentID: {selectedStudent.studentId}
                    </Typography>
                    
                    <Chip label={selectedStudent.enrollmentStatus} color="success" size="small" sx={{ mt: 1 }} />
                  </Box>
                </Stack>
                <Typography variant="body1" fontWeight="medium">
                  <School sx={{ mr: 1, verticalAlign: "middle" }} />
                  {selectedStudent.program}
                </Typography>
              </Paper>

              {/* Payment Information */}
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <Payment />
                Payment History
              </Typography>

              <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 2, color:"#f2295b" }}>
                {selectedStudent.academicYears.map((yearData) => (
                  <Tab key={yearData.year} label={yearData.year} sx={{color:"#f2295b"}}/>
                ))}
              </Tabs>

              {selectedStudent.academicYears.map((yearData, yearIndex) => (
                <Box key={yearData.year} hidden={tabValue !== yearIndex}>
                  <List>
                    {yearData.semesters.map((semester, semesterIndex) => (
                      <ListItem key={semesterIndex} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <CalendarToday sx={{color:"#f2295b"}} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body1" fontWeight="medium">
                              {semester.semester}
                            </Typography>
                          }
                          secondary={
                            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                              <Chip label={`Paid: ${semester.paid}`} color="success" variant="outlined" size="small" />
                              <Chip
                                label={`Balance: ${semester.balance}`}
                                color={semester.balance === "UGX 0" ? "success" : "warning"}
                                variant="outlined"
                                size="small"
                              />
                            </Stack>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                  {yearIndex < selectedStudent.academicYears.length - 1 && <Divider sx={{ my: 2 }} />}
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={() => setDetailModal(false)}
            variant="conatained"
            sx={{ borderRadius: 2, textTransform: "none", px: 3, py: 1.5, bgcolor:"#FFC000"}}
          >
            Close
          </Button>
          {/* <Button variant="contained" sx={{ borderRadius: 2, textTransform: "none" }}>
            Generate Report
          </Button> */}
          <CustomButton text="Generate Report"/>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
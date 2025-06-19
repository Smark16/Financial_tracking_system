"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Grid,
  Box,
  Container,
  Avatar,
} from "@mui/material"
import {
  Print as PrintIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import logo from '../../Images/jodah.png'
import CustomButton from "../../CustomButon/Button"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#9c27b0",
    },
    success: {
      main: "#2e7d32",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
  },
})

const courses = [
  "3D Architecture Design",
  "Landscape Design",
  "Interior Design",
  "Structural Design",
  "Mechanical And Plumbing Design",
  "Electrical And Wiring Design",
  "Graphics Design",
]

const sampleStudents = [
  { id: 1, firstName: "John", lastName: "Smith", studentId: "A98261", status: "Cleared" },
  { id: 2, firstName: "Sarah", lastName: "Johnson", studentId: "A98262", status: "Cleared" },
  { id: 3, firstName: "Michael", lastName: "Brown", studentId: "A98263", status: "Cleared" },
  { id: 4, firstName: "Emily", lastName: "Davis", studentId: "A98264", status: "Cleared" },
  { id: 5, firstName: "David", lastName: "Wilson", studentId: "A98265", status: "Cleared" },
]

export default function TuitionClearanceList() {
  const [selectedCourse, setSelectedCourse] = useState("3D Architecture Design")
  const [selectedYear, setSelectedYear] = useState("Year 1")
  const [selectedSemester, setSelectedSemester] = useState("Semester 2")

  const handlePrintPDF = () => {
    window.print()
  }

  const handleCourseSelect = (course) => {
    setSelectedCourse(course)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,rgb(253, 246, 227) 0%,rgb(240, 187, 251) 100%)",
          backgroundColor:"transparent",
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          {/* Header Section */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 2 }}>
              <Avatar sx={{ bgcolor: "#FFC000", width: 56, height: 56 }}>
                <SchoolIcon fontSize="large" />
              </Avatar>
              <Typography variant="h3" component="h1" sx={{ fontWeight: "bold", color: "text.primary" }}>
                Tuition Clearance System
              </Typography>
            </Box>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto", mb: 3 }}>
              View students who have fully cleared tuition fees for a particular semester
            </Typography>
            <Chip
              icon={<CalendarIcon />}
              label="Current Academic Year 2024-2025"
              color="primary"
              variant="filled"
              sx={{ px: 2, py: 1, fontSize: "0.9rem", bgcolor:"#800020" }}
            />
          </Box>

          {/* Course Selection Section */}
          <Card sx={{ mb: 4 }}>
            <CardHeader
              title={
                <Typography variant="h5" component="h2" color="text.primary">
                  Select Course & Filters
                </Typography>
              }
              subheader="Choose a course and academic period to view clearance records"
            />
            <CardContent>
              <Grid container spacing={3}>
                {courses.map((course, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card
                      sx={{
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                        border: selectedCourse === course ? 2 : 1,
                        borderColor: selectedCourse === course ? "primary.main" : "divider",
                        bgcolor: selectedCourse === course ? "primary.50" : "background.paper",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: 4,
                        },
                      }}
                      onClick={() => handleCourseSelect(course)}
                    >
                      <CardContent>
                        <Typography
                          variant="subtitle1"
                          component="h3"
                          sx={{
                            fontWeight: 600,
                            textAlign: "center",
                            mb: 2,
                            minHeight: 48,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {course}
                        </Typography>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <FormControl fullWidth size="small">
                            <InputLabel>Year</InputLabel>
                            <Select value={selectedYear} label="Year" onChange={(e) => setSelectedYear(e.target.value)}>
                              <MenuItem value="Year 1">Year 1</MenuItem>
                              <MenuItem value="Year 2">Year 2</MenuItem>
                              <MenuItem value="Year 3">Year 3</MenuItem>
                            </Select>
                          </FormControl>

                          <FormControl fullWidth size="small">
                            <InputLabel>Semester</InputLabel>
                            <Select
                              value={selectedSemester}
                              label="Semester"
                              onChange={(e) => setSelectedSemester(e.target.value)}
                            >
                              <MenuItem value="Semester 1">Semester 1</MenuItem>
                              <MenuItem value="Semester 2">Semester 2</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Student Records Section */}
          <Card>
            <CardHeader
              title={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography variant="h5" component="h2" color="text.primary">
                      Student Clearance Records
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Showing records for {selectedCourse} - {selectedYear}, {selectedSemester}
                    </Typography>
                  </Box>

                  <CustomButton text="Print PDF" icon={<PrintIcon />} onClick={handlePrintPDF}/>
                </Box>
              }
            />
            <CardContent>
              {/* Institution Header */}
              <Paper
                sx={{
                  background: "linear-gradient(128deg, #030101 43%, #f2295b 100%)",
                  opacity:0.86,
                  color: "white",
                  p: 4,
                  textAlign: "center",
                  mb: 4,
                  borderRadius: 2,
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <img
                    src={logo}
                    alt="Institution Logo"
                    style={{ height: 80, width: "auto" }}
                    loading="lazy"
                  />
                </Box>
                <Typography variant="h5" component="h2" sx={{ fontWeight: "bold", mb: 1 }}>
                  TUITION CLEARANCE LIST ({selectedYear.toUpperCase()}, {selectedSemester.toUpperCase()})
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  {selectedCourse}
                </Typography>
              </Paper>

              {/* Students Table */}
              <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: "hidden" }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "grey.50" }}>
                      <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>#</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>First Name</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>Last Name</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>Student ID</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sampleStudents.map((student) => (
                      <TableRow
                        key={student.id}
                        sx={{
                          "&:hover": { bgcolor: "grey.50" },
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 500 }}>{student.id}</TableCell>
                        <TableCell>{student.firstName}</TableCell>
                        <TableCell>{student.lastName}</TableCell>
                        <TableCell sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                          {student.studentId}
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={<CheckCircleIcon />}
                            label={student.status}
                            color="success"
                            variant="filled"
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Summary Stats */}
              <Grid container spacing={3} sx={{ mt: 3 }}>
                <Grid item xs={12} sm={4}>
                  <Card sx={{ bgcolor: "success.50", borderColor: "success.200" }}>
                    <CardContent sx={{ textAlign: "center", py: 3 }}>
                      <Typography variant="h4" sx={{ fontWeight: "bold", color: "success.main", mb: 1 }}>
                        {sampleStudents.length}
                      </Typography>
                      <Typography variant="body2" color="success.dark">
                        Students Cleared
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card sx={{ bgcolor: "primary.50", borderColor: "primary.200" }}>
                    <CardContent sx={{ textAlign: "center", py: 3 }}>
                      <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main", mb: 1 }}>
                        100%
                      </Typography>
                      <Typography variant="body2" color="primary.dark">
                        Clearance Rate
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card sx={{ bgcolor: "secondary.50", borderColor: "secondary.200" }}>
                    <CardContent sx={{ textAlign: "center", py: 3 }}>
                      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#f2295b", mb: 1 }}>
                        {selectedSemester}
                      </Typography>
                      <Typography variant="body2" color="#f2295b">
                        Current Period
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
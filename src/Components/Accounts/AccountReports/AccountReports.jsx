"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  Paper,
  Avatar,
  LinearProgress,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Tabs,
  Tab,
  Alert,
} from "@mui/material"
import {
  TrendingUp,
  Download,
  MoreVert,
  Refresh,
  DateRange,
  Analytics,
  Assessment,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  Timeline,
  Warning,
  CheckCircle,
  Schedule,
  FilterList,
  Close,
} from "@mui/icons-material"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"
import Papa from "papaparse"
import jsPDF from "jspdf"
import "jspdf-autotable"

// Sample data
const reportData = {
  totalIncome: "UGX 22,345,000",
  totalStudentsPaid: 300,
  totalStudentsPending: 200,
  totalStudentsOverdue: 50,
  averagePaymentTime: 12,
  collectionRate: 85.7,
  paymentStatusBreakdown: [
    { name: "Paid", value: 300, color: "#4CAF50", percentage: 54.5 },
    { name: "Pending", value: 200, color: "#FF9800", percentage: 36.4 },
    { name: "Overdue", value: 50, color: "#F44336", percentage: 9.1 },
  ],
  incomeTrend: [
    { period: "Jan", income: 2000000, target: 2500000, expenses: 500000 },
    { period: "Feb", income: 3500000, target: 3000000, expenses: 700000 },
    { period: "Mar", income: 4000000, target: 3500000, expenses: 800000 },
    { period: "Apr", income: 5000000, target: 4000000, expenses: 900000 },
    { period: "May", income: 4500000, target: 4500000, expenses: 850000 },
    { period: "Jun", income: 6000000, target: 5000000, expenses: 1000000 },
  ],
  departmentBreakdown: [
    { department: "3D Architecture", income: 8500000, students: 120, completion: 85 },
    { department: "Interior Design", income: 6200000, students: 95, completion: 78 },
    { department: "Landscape Design", income: 4100000, students: 75, completion: 92 },
    { department: "Graphics Design", income: 3545000, students: 85, completion: 88 },
  ],
  monthlyComparison: [
    { month: "Jan", thisYear: 2000000, lastYear: 1800000 },
    { month: "Feb", thisYear: 3500000, lastYear: 3200000 },
    { month: "Mar", thisYear: 4000000, lastYear: 3800000 },
    { month: "Apr", thisYear: 5000000, lastYear: 4200000 },
    { month: "May", thisYear: 4500000, lastYear: 4100000 },
    { month: "Jun", thisYear: 6000000, lastYear: 5200000 },
  ],
}

const timeFilters = [
  "Today",
  "Yesterday",
  "Last Week",
  "This Week",
  "This Month",
  "Last Month",
  "This Quarter",
  "This Year",
]
const chartTypes = ["Overview", "Trends", "Departments", "Comparison"]

export default function AccountReports() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [selectedFilter, setSelectedFilter] = useState("This Month")
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [exportDialog, setExportDialog] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [exportType, setExportType] = useState("summary")
  const [exportFormat, setExportFormat] = useState("pdf")

  // Parse UGX string to number
  const parseUGX = (ugx) => parseFloat(ugx.replace("UGX ", "").replace(/,/g, ""))

  // Simulate data refresh
  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setRefreshing(false)
  }

  // Export to CSV
  const exportToCSV = () => {
    let csvData = []
    if (exportType === "summary") {
      csvData = [
        { Metric: "Total Income", Value: reportData.totalIncome },
        { Metric: "Students Paid", Value: reportData.totalStudentsPaid },
        { Metric: "Students Pending", Value: reportData.totalStudentsPending },
        { Metric: "Students Overdue", Value: reportData.totalStudentsOverdue },
        { Metric: "Collection Rate", Value: `${reportData.collectionRate}%` },
      ]
    } else if (exportType === "detailed") {
      csvData = [
        ...reportData.paymentStatusBreakdown.map((item) => ({
          Metric: `Students ${item.name}`,
          Value: item.value,
        })),
        ...reportData.incomeTrend.map((item) => ({
          Metric: `Income ${item.period}`,
          Value: `UGX ${item.income.toLocaleString()}`,
        })),
      ]
    } else if (exportType === "department") {
      csvData = reportData.departmentBreakdown.map((dept) => ({
        Metric: `${dept.department}`,
        Value: `UGX ${dept.income.toLocaleString()}`,
        Students: dept.students,
        Completion: `${dept.completion}%`,
      }))
    } else if (exportType === "trends") {
      csvData = reportData.monthlyComparison.map((item) => ({
        Metric: `${item.month}`,
        ThisYear: `UGX ${item.thisYear.toLocaleString()}`,
        LastYear: `UGX ${item.lastYear.toLocaleString()}`,
      }))
    }

    const csv = Papa.unparse(csvData)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `account-reports-${exportType}-${Date.now()}.csv`
    a.click()
    setExportDialog(false)
  }

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text("Account Reports", 20, 20)
    doc.setFontSize(12)
    doc.text(`Filter: ${selectedFilter}`, 20, 30)
    doc.text(`Date: ${new Date().toLocaleDateString("en-US", { timeZone: "Africa/Nairobi" })}`, 20, 40)

    let startY = 50
    if (exportType === "summary") {
      doc.autoTable({
        startY,
        head: [["Metric", "Value"]],
        body: [
          ["Total Income", reportData.totalIncome],
          ["Students Paid", reportData.totalStudentsPaid],
          ["Students Pending", reportData.totalStudentsPending],
          ["Students Overdue", reportData.totalStudentsOverdue],
          ["Collection Rate", `${reportData.collectionRate}%`],
        ],
      })
    } else if (exportType === "detailed") {
      doc.autoTable({
        startY,
        head: [["Status", "Students", "Percentage"]],
        body: reportData.paymentStatusBreakdown.map((item) => [
          item.name,
          item.value,
          `${item.percentage}%`,
        ]),
      })
      startY = doc.lastAutoTable.finalY + 20
      doc.autoTable({
        startY,
        head: [["Period", "Income (UGX)", "Target (UGX)", "Expenses (UGX)"]],
        body: reportData.incomeTrend.map((item) => [
          item.period,
          item.income.toLocaleString(),
          item.target.toLocaleString(),
          item.expenses.toLocaleString(),
        ]),
      })
    } else if (exportType === "department") {
      doc.autoTable({
        startY,
        head: [["Department", "Income (UGX)", "Students", "Completion Rate"]],
        body: reportData.departmentBreakdown.map((dept) => [
          dept.department,
          dept.income.toLocaleString(),
          dept.students,
          `${dept.completion}%`,
        ]),
      })
    } else if (exportType === "trends") {
      doc.autoTable({
        startY,
        head: [["Month", "This Year (UGX)", "Last Year (UGX)"]],
        body: reportData.monthlyComparison.map((item) => [
          item.month,
          item.thisYear.toLocaleString(),
          item.lastYear.toLocaleString(),
        ]),
      })
    }

    doc.save(`account-reports-${exportType}-${Date.now()}.pdf`)
    setExportDialog(false)
  }

  // Handle export based on format
  const handleExport = () => {
    if (exportFormat === "csv") {
      exportToCSV()
    } else if (exportFormat === "pdf") {
      exportToPDF()
    } else {
      console.log("Excel export not implemented")
      setExportDialog(false)
    }
  }

  // Calculate growth percentage
  const calculateGrowth = (current, previous) => {
    return (((current - previous) / previous) * 100).toFixed(1)
  }

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          elevation={8}
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: entry.color, display: "flex", alignItems: "center", gap: 1 }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: entry.color,
                }}
              />
              {entry.name}:{" "}
              {typeof entry.value === "number" && entry.value > 1000
                ? `UGX ${entry.value.toLocaleString()}`
                : entry.value}
            </Typography>
          ))}
        </Paper>
      )
    }
    return null
  }

  // Custom Legend Component
  const CustomLegend = ({ payload }) => (
    <Stack direction="row" spacing={3} justifyContent="center" sx={{ mt: 2 }}>
      {payload.map((entry, index) => (
        <Stack key={index} direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: 1,
              bgcolor: entry.color,
              boxShadow: `0 0 10px ${entry.color}40`,
            }}
          />
          <Typography variant="body2" fontWeight="medium">
            {entry.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  )

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
              <Analytics />
              Account Reports & Analytics
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
              Comprehensive financial insights and performance metrics
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={handleRefresh}
              disabled={refreshing}
              sx={{ color: "white", bgcolor: "rgba(255,255,255,0.1)" }}
            >
              <Refresh sx={{ animation: refreshing ? "spin 1s linear infinite" : "none" }} />
            </IconButton>
            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{ color: "white", bgcolor: "rgba(255,255,255,0.1)" }}
            >
              <MoreVert />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>

      {/* Quick Actions Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setExportDialog(true)}>
          <Download sx={{ mr: 1 }} /> Export Reports
        </MenuItem>
        <MenuItem onClick={handleRefresh}>
          <Refresh sx={{ mr: 1 }} /> Refresh Data
        </MenuItem>
      </Menu>

      {/* Filters */}
      <Card elevation={2} sx={{ borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FilterList />
              Time Period
            </Typography>
            <Button variant="outlined" startIcon={<DateRange />} size="small" sx={{ textTransform: "none" }}>
              Custom Range
            </Button>
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {timeFilters.map((filter) => (
              <Chip
                key={filter}
                label={filter}
                onClick={() => setSelectedFilter(filter)}
                color={selectedFilter === filter ? "primary" : "default"}
                variant={selectedFilter === filter ? "filled" : "outlined"}
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <Card
            elevation={3}
            sx={{
              borderRadius: 3,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Income
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
                    {reportData.totalIncome}
                  </Typography>
                  <Chip
                    label="+12.5% from last month"
                    size="small"
                    sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
                  />
                </Box>
                <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                  <TrendingUp sx={{ fontSize: "2rem" }} />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Card
            elevation={3}
            sx={{
              borderRadius: 3,
              background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
              color: "white",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Students Paid
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
                    {reportData.totalStudentsPaid}
                  </Typography>
                  <Chip
                    label="+8.2% this month"
                    size="small"
                    sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
                  />
                </Box>
                <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                  <CheckCircle sx={{ fontSize: "2rem" }} />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Card
            elevation={3}
            sx={{
              borderRadius: 3,
              background: "linear-gradient(135deg, #FF9800 0%, #f57c00 100%)",
              color: "white",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Pending Payments
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
                    {reportData.totalStudentsPending}
                  </Typography>
                  <Chip
                    label="-5.3% from last week"
                    size="small"
                    sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
                  />
                </Box>
                <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                  <Schedule sx={{ fontSize: "2rem" }} />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Card
            elevation={3}
            sx={{
              borderRadius: 3,
              background: "linear-gradient(135deg, #2196F3 0%, #1976d2 100%)",
              color: "white",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Collection Rate
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
                    {reportData.collectionRate}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={reportData.collectionRate}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      "& .MuiLinearProgress-bar": { bgcolor: "white" },
                    }}
                  />
                </Box>
                <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                  <Assessment sx={{ fontSize: "2rem" }} />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart Tabs */}
      <Card elevation={2} sx={{ borderRadius: 3, mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            {chartTypes.map((type) => (
              <Tab key={type} label={type} />
            ))}
          </Tabs>
        </Box>

        <CardContent sx={{ p: 0 }}>
          {/* Overview Tab */}
          {activeTab === 0 && (
            <Grid container spacing={4} sx={{ p: 4 }}>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      background: "linear-gradient(45deg, #667eea, #764ba2)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    <PieChartIcon />
                    Payment Status Distribution
                  </Typography>
                  <Box
                    sx={{
                      height: 350,
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "radial-gradient(circle at center, rgba(102, 126, 234, 0.1) 0%, transparent 70%)",
                        borderRadius: 2,
                        zIndex: 0,
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <defs>
                          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(0,0,0,0.3)" />
                          </filter>
                          <linearGradient id="paidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4CAF50" />
                            <stop offset="100%" stopColor="#66BB6A" />
                          </linearGradient>
                          <linearGradient id="pendingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FF9800" />
                            <stop offset="100%" stopColor="#FFB74D" />
                          </linearGradient>
                          <linearGradient id="overdueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F44336" />
                            <stop offset="100%" stopColor="#EF5350" />
                          </linearGradient>
                        </defs>
                        <Pie
                          data={reportData.paymentStatusBreakdown}
                          cx="50%"
                          cy="50%"
                          outerRadius={120}
                          innerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                          filter="url(#shadow)"
                          animationBegin={0}
                          animationDuration={1500}
                          label={({ name, percentage }) => `${percentage}%`}
                          labelLine={false}
                        >
                          {reportData.paymentStatusBreakdown.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                index === 0
                                  ? "url(#paidGradient)"
                                  : index === 1
                                    ? "url(#pendingGradient)"
                                    : "url(#overdueGradient)"
                              }
                              stroke="white"
                              strokeWidth={3}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>

                    {/* Center Statistics */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        zIndex: 1,
                      }}
                    >
                      <Typography variant="h4" fontWeight="bold" color="primary">
                        {reportData.totalStudentsPaid +
                          reportData.totalStudentsPending +
                          reportData.totalStudentsOverdue}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Students
                      </Typography>
                    </Box>
                  </Box>

                  {/* Custom Legend */}
                  <Stack direction="row" spacing={3} justifyContent="center" sx={{ mt: 3 }}>
                    {reportData.paymentStatusBreakdown.map((entry) => (
                      <Stack key={entry.name} alignItems="center" spacing={1}>
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background: entry.color,
                            boxShadow: `0 0 15px ${entry.color}60`,
                            border: "3px solid white",
                          }}
                        />
                        <Typography variant="body2" fontWeight="bold">
                          {entry.name}
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" color={entry.color}>
                          {entry.value}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      background: "linear-gradient(45deg, #667eea, #764ba2)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    <BarChartIcon />
                    Income vs Target Performance
                  </Typography>
                  <Box sx={{ height: 350 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={reportData.incomeTrend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#667eea" />
                            <stop offset="100%" stopColor="#764ba2" />
                          </linearGradient>
                          <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f093fb" />
                            <stop offset="100%" stopColor="#f5576c" />
                          </linearGradient>
                          <filter id="barShadow">
                            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.3)" />
                          </filter>
                        </defs>
                        <XAxis
                          dataKey="period"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#666" }}
                        />
                        <YAxis
                          tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#666" }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                          dataKey="income"
                          fill="url(#incomeGradient)"
                          name="Actual Income"
                          radius={[8, 8, 0, 0]}
                          filter="url(#barShadow)"
                          animationDuration={1500}
                        />
                        <Bar
                          dataKey="target"
                          fill="url(#targetGradient)"
                          name="Target"
                          radius={[8, 8, 0, 0]}
                          filter="url(#barShadow)"
                          animationDuration={1500}
                          animationDelay={300}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                  <CustomLegend
                    payload={[
                      { value: "Actual Income", color: "#667eea" },
                      { value: "Target", color: "#f093fb" },
                    ]}
                  />
                </Box>
              </Grid>
            </Grid>
          )}

          {/* Trends Tab */}
          {activeTab === 1 && (
            <Box sx={{ p: 4 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <Timeline />
                Advanced Income Trend Analysis
              </Typography>
              <Box
                sx={{
                  height: 450,
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)",
                    borderRadius: 2,
                    zIndex: 0,
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={reportData.incomeTrend} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="incomeAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#667eea" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#667eea" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="expenseAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f093fb" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#f093fb" stopOpacity={0.1} />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
                    <YAxis
                      tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#666" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="income"
                      stroke="#667eea"
                      strokeWidth={4}
                      fill="url(#incomeAreaGradient)"
                      name="Income"
                      filter="url(#glow)"
                      animationDuration={2000}
                      dot={{ fill: "#667eea", strokeWidth: 3, stroke: "white", r: 6, filter: "url(#glow)" }}
                      activeDot={{ r: 8, stroke: "#667eea", strokeWidth: 3, fill: "white" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stroke="#f093fb"
                      strokeWidth={4}
                      fill="url(#expenseAreaGradient)"
                      name="Expenses"
                      filter="url(#glow)"
                      animationDuration={2000}
                      animationDelay={500}
                      dot={{ fill: "#f093fb", strokeWidth: 3, stroke: "white", r: 6, filter: "url(#glow)" }}
                      activeDot={{ r: 8, stroke: "#f093fb", strokeWidth: 3, fill: "white" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
              <CustomLegend
                payload={[
                  { value: "Income", color: "#667eea" },
                  { value: "Expenses", color: "#f093fb" },
                ]}
              />
            </Box>
          )}

          {/* Departments Tab */}
          {activeTab === 2 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Department Performance
              </Typography>
              <Grid container spacing={3}>
                {reportData.departmentBreakdown.map((dept) => (
                  <Grid item xs={12} md={6} key={dept.department}>
                    <Card elevation={1} sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                          <Typography variant="h6" fontWeight="bold">
                            {dept.department}
                          </Typography>
                          <Chip label={`${dept.students} students`} size="small" />
                        </Stack>
                        <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mb: 1 }}>
                          UGX {dept.income.toLocaleString()}
                        </Typography>
                        <Box sx={{ mb: 1 }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                              Completion Rate
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {dept.completion}%
                            </Typography>
                          </Stack>
                          <LinearProgress
                            variant="determinate"
                            value={dept.completion}
                            sx={{ mt: 1, height: 8, borderRadius: 4 }}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Comparison Tab */}
          {activeTab === 3 && (
            <Box sx={{ p: 4 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <Timeline />
                Year-over-Year Performance Comparison
              </Typography>
              <Box
                sx={{
                  height: 450,
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)",
                    borderRadius: 2,
                    zIndex: 0,
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reportData.monthlyComparison} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                      <filter id="lineGlow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
                    <YAxis
                      tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#666" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="thisYear"
                      stroke="#667eea"
                      strokeWidth={5}
                      name="This Year"
                      filter="url(#lineGlow)"
                      animationDuration={2000}
                      dot={{
                        fill: "#667eea",
                        strokeWidth: 4,
                        stroke: "white",
                        r: 8,
                        boxShadow: "0 0 20px rgba(102, 126, 234, 0.6)",
                      }}
                      activeDot={{
                        r: 12,
                        stroke: "#667eea",
                        strokeWidth: 4,
                        fill: "white",
                        boxShadow: "0 0 25px rgba(102, 126, 234, 0.8)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="lastYear"
                      stroke="#f093fb"
                      strokeWidth={5}
                      strokeDasharray="10 10"
                      name="Last Year"
                      filter="url(#lineGlow)"
                      animationDuration={2000}
                      animationDelay={500}
                      dot={{
                        fill: "#f093fb",
                        strokeWidth: 4,
                        stroke: "white",
                        r: 8,
                        boxShadow: "0 0 20px rgba(240, 147, 251, 0.6)",
                      }}
                      activeDot={{
                        r: 12,
                        stroke: "#f093fb",
                        strokeWidth: 4,
                        fill: "white",
                        boxShadow: "0 0 25px rgba(240, 147, 251, 0.8)",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
              <CustomLegend
                payload={[
                  { value: "This Year", color: "#667eea" },
                  { value: "Last Year", color: "#f093fb" },
                ]}
              />

              {/* Growth Indicators */}
              <Grid container spacing={3} sx={{ mt: 3 }}>
                {reportData.monthlyComparison.map((data) => {
                  const growth = (((data.thisYear - data.lastYear) / data.lastYear) * 100).toFixed(1)
                  return (
                    <Grid item xs={6} sm={4} md={2} key={data.month}>
                      <Paper
                        elevation={2}
                        sx={{
                          p: 2,
                          textAlign: "center",
                          borderRadius: 2,
                          background:
                            Number.parseFloat(growth) > 0
                              ? "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)"
                              : "linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(244, 67, 54, 0.05) 100%)",
                          border: `1px solid ${Number.parseFloat(growth) > 0 ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"}`,
                        }}
                      >
                        <Typography variant="body2" fontWeight="bold">
                          {data.month}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color={Number.parseFloat(growth) > 0 ? "success.main" : "error.main"}
                        >
                          {Number.parseFloat(growth) > 0 ? "+" : ""}
                          {growth}%
                        </Typography>
                      </Paper>
                    </Grid>
                  )
                })}
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Key Insights
              </Typography>
              <Stack spacing={2}>
                <Alert severity="success" sx={{ borderRadius: 2 }}>
                  <Typography variant="body2">
                    <strong>Excellent Performance:</strong> Income exceeded target by 15% this month
                  </Typography>
                </Alert>
                <Alert severity="warning" sx={{ borderRadius: 2 }}>
                  <Typography variant="body2">
                    <strong>Attention Needed:</strong> 50 students have overdue payments
                  </Typography>
                </Alert>
                <Alert severity="info" sx={{ borderRadius: 2 }}>
                  <Typography variant="body2">
                    <strong>Trend Alert:</strong> Graphics Design department showing 25% growth
                  </Typography>
                </Alert>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Quick Actions
              </Typography>
              <Stack spacing={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Download />}
                  onClick={() => setExportDialog(true)}
                  sx={{ textTransform: "none" }}
                >
                  Export Reports
                </Button>
                <Button variant="outlined" fullWidth startIcon={<Warning />} sx={{ textTransform: "none" }}>
                  Send Reminders
                </Button>
                <Button variant="outlined" fullWidth startIcon={<Analytics />} sx={{ textTransform: "none" }}>
                  Detailed Analysis
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Export Dialog */}
      <Dialog open={exportDialog} onClose={() => setExportDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              Export Reports
            </Typography>
            <IconButton onClick={() => setExportDialog(false)} size="small">
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={exportType}
                label="Report Type"
                onChange={(e) => setExportType(e.target.value)}
              >
                <MenuItem value="summary">Summary Report</MenuItem>
                <MenuItem value="detailed">Detailed Analysis</MenuItem>
                <MenuItem value="department">Department Breakdown</MenuItem>
                <MenuItem value="trends">Trend Analysis</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Format</InputLabel>
              <Select
                value={exportFormat}
                label="Format"
                onChange={(e) => setExportFormat(e.target.value)}
              >
                <MenuItem value="pdf">PDF Document</MenuItem>
                <MenuItem value="csv">CSV Spreadsheet</MenuItem>
                <MenuItem value="excel">Excel Workbook</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setExportDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleExport} variant="contained">
            Export Report
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
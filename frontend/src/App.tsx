import { Route, Routes } from "react-router-dom";
import { LoginPage } from "@/pages/login/LoginPage";
import { PrivateRoutes } from "@/routes/private-routes";
import { UnprotectedRoutes } from "@/routes/unprotect-routes";
import { NotFound } from "@/pages/not-found/NotFound";
import { MyInfo } from "@/pages/my-info/MyInfoPage";
import { EmployeesPage } from "@/pages/employees/EmployeesPage";
import { ReportsPage } from "@/pages/reports/ReportsPage";
import { FilesPage } from "@/pages/files/FilesPage";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { MyInfoLayout } from "@/layouts/MyInfoLayout";
import { AssetsPage } from "@/pages/assets/AssetsPage";
import { TrainingPage } from "@/pages/training/TrainingPage";
import { TasksPage } from "@/pages/tasks/TasksPage";
import { GoalPage } from "@/pages/goals/goals";
import { DocumentLayout } from "@/layouts/DocumentLayout";
import { NewEmployeePage } from "@/pages/employees/NewEmployeePage";
import { DepartmentPage } from "@/pages/department/DepartmentPage";
import { ProfilesPage } from "@/pages/profiles/profiles";
import { EmployeeInfo } from "@/pages/empoyeeId/EmployeeIdPage";
import { EmployeeInfoLayout } from "@/layouts/EmployeeInfoLayout";
import { EmployeeGoalsPage } from "@/pages/employeeGoals/EmployeeGoals";
import { EmployeeAssetsPage } from "@/pages/employeeAssets";
import { EmployeeDocumentPage } from "@/pages/employeeDocument";
import { TeamMembersPage } from "@/pages/members/members";
import { MemberDetail } from "@/pages/member-detail/page";
import { HomePage } from "./features/home";

function App() {
  return (
    <Routes>
      {/* Unprotected Routes */}
      <Route element={<UnprotectedRoutes />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<PrivateRoutes />}>
        {/* Main Dashboard Layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />

          {/* My Info Section */}
          <Route element={<MyInfoLayout />}>
            <Route path="/my-info" element={<MyInfo />} />
            <Route path="/assets" element={<AssetsPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/goals" element={<GoalPage />} />
          </Route>

          {/* Employees Section */}
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/employees/new" element={<NewEmployeePage />} />
          <Route element={<EmployeeInfoLayout />}>
            <Route path="/employees/:employeeId" element={<EmployeeInfo />} />
            <Route path="/employees/:employeeId/assets" element={<EmployeeAssetsPage />} />
            <Route path="/employees/:employeeId/goals" element={<EmployeeGoalsPage />} />
            <Route element={<DocumentLayout />}>
              <Route path="/employees/:employeeId/documents" element={<EmployeeDocumentPage />} />
            </Route>
          </Route>

          {/* Other Routes */}
          <Route path="/departments" element={<DepartmentPage />} />
          <Route path="/profiles" element={<ProfilesPage />} />
          <Route path="/members" element={<TeamMembersPage />} />
          <Route path="/members/:memberId" element={<MemberDetail />} />

          {/* Reports and Documents */}
          <Route path="/reports" element={<ReportsPage />} />
          <Route element={<DocumentLayout />}>
            <Route path="/documents" element={<FilesPage />} />
          </Route>
        </Route>
      </Route>

      {/* Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

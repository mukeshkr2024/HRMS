import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { DocumentLayout } from "@/components/layouts/DocumentLayout";
import { EmployeeInfoLayout } from "@/components/layouts/EmployeeInfoLayout";
import { MyInfoLayout } from "@/components/layouts/MyInfoLayout";
import { NotFound } from "@/components/not-found";
import { PrivateRoutes } from "@/routes/private-routes";
import { UnprotectedRoutes } from "@/routes/unprotect-routes";
import { Route, Routes } from "react-router-dom";
import { InboxLayout } from "./components/layouts/InboxLayout";
import { MemberInfoLayout } from "./components/layouts/MemberInfoLayout";
import { AssetsPage } from "./features/assets";
import { DepartmentPage } from "./features/departments";
import { FilesPage } from "./features/documents";
import { TeamAssesmentPage } from "./features/employee/assessment";
import { EmployeeAssetsPage } from "./features/employee/assets";
import { EmployeeDocumentPage } from "./features/employee/document";
import { EmployeeGoalsPage } from "./features/employee/goals";
import { EmployeeInfo } from "./features/employee/info";
import { EmployeesPage } from "./features/employees";
import { NewEmployeePage } from "./features/employees/new";
import { FeedbackPage } from "./features/feedback";
import { GoalPage } from "./features/goals";
import { HomePage } from "./features/home";
import { InboxPage } from "./features/inbox";
import { SubmitFeedBack } from "./features/inbox/feedback/component/submit-feedback";
import LoginPage from "./features/login";
import { TeamMembersPage } from "./features/members";
import { MemberDetail } from "./features/members/detail";
import { MyInfo } from "./features/my-info";
import { ProfilesPage } from "./features/profiles";
import { Assessments } from "./features/assessments";

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
          <Route element={<InboxLayout />}>
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/inbox/feedback/view/:feedbackId" element={<SubmitFeedBack />} />
          </Route>

          {/* My Info Section */}
          <Route element={<MyInfoLayout />}>
            <Route path="/my-info" element={<MyInfo />} />
            <Route path="/assets" element={<AssetsPage />} />
            <Route path="/goals" element={<GoalPage />} />
            <Route path="/assessments" element={<Assessments />} />
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
          <Route element={<MemberInfoLayout />}>
            <Route path="/members/:memberId" element={<MemberDetail />} />
            <Route path="/members/:memberId/feedbacks" element={<FeedbackPage />} />
            <Route path="/members/:memberId/assessments" element={<TeamAssesmentPage />} />
          </Route>

          {/* Reports and Documents */}
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

import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./providers/data";
import Dashboard from "./pages/Dashboard";
import { BookOpen, GraduationCap, Home } from "lucide-react";
import { Layout } from "./components/refine-ui/layout/layout";
import SubjectsList from "./pages/subjects/SubjectsList";
import CreateSubject from "./pages/subjects/CreateSubject";
import ClassesList from "./pages/classes/list";
import CreateClass from "./pages/classes/create";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "9SAF4x-ylvjEm-wCz60T",
              }}

              resources={[
                {
                  name: "Dashboard",
                  meta: {label: "Home", icon: <Home />},
                  list: '/'
                },
                {
                  name: "subjects",
                  meta: {label: "Subjects", icon: <BookOpen />}, 
                  list: '/subjects',
                  create: '/subjects/create'
                },
                {
                  name: "classes",
                  meta: {label: "Classes", icon: <GraduationCap />}, 
                  list: '/classes',
                  create: '/classes/create'
                }
              ]}
            >
              <Routes>
                <Route element={
                  <Layout>
                    <Outlet />
                  </Layout>
                }>
                  <Route path="/" element={<Dashboard />} />

                  <Route path="subjects">
                    <Route index element={<SubjectsList />}/>
                    <Route path="create" element={<CreateSubject />} />
                  </Route>

                  <Route path="classes">
                    <Route index element={<ClassesList />}/>
                    <Route path="create" element={<CreateClass />} />
                  </Route>

                </Route>
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

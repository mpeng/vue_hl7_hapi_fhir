import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";
import PatientsList from "@/pages/PatientsList.vue";
import OrganizationsList from "@/pages/OrganizationsList.vue";
import PatientTabView from "@/pages/PatientTabView.vue";
import Practitioner from "@/pages/Practitioner.vue";
import Patient from "@/pages/Patient.vue";
import CodeSystem from "@/pages/CodeSystem.vue";
import Observation from "@/pages/Observation.vue";
import Procedure from "@/pages/Procedure.vue";
import ECharts from "@/pages/ECharts.vue";
import LifeExpectancy from "@/pages/LifeExpectancy.vue";
import ExplanationOfBenefit from "@/pages/ExplanationOfBenefit.vue";
import BootstrapTable from "@/pages/BootstrapTable.vue";
import SideBarMenu from "@/pages/SideBarMenu.vue";


const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Welcome to Vue HL7 - hapi fhir",
        component: Dashboard,
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile,
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications,
      },
      {
        path: "icons",
        name: "icons",
        component: Icons,
      },
      {
        path: "maps",
        name: "maps",
        component: Maps,
      },
      {
        path: "typography",
        name: "typography",
        component: Typography,
      },
      {
        path: "patients-list",
        name: "Patients",
        component: PatientsList,
      },
      {
        path: "patient-Tab-View",
        name: "Patient Tab View",
        component: PatientTabView,
      },
      {
        path: "Practitioner",
        name: "Practitioner",
        component: Practitioner,
      },

      {
        path: "Patient",
        name: "Patient",
        component: Patient,
      },

      {
        path: "ExplanationOfBenefit",
        name: "ExplanationOfBenefit",
        component: ExplanationOfBenefit,
      },

      {
        path: "CodeSystem",
        name: "CodeSystem",
        component: CodeSystem,
      },

      {
        path: "Procedure",
        name: "Procedure",
        component: Procedure,
      },

      {
        path: "Observation",
        name: "Observation",
        component: Observation,
      },

      {
        path: "BootstrapTable",
        name: "BootstrapTable",
        component: BootstrapTable,
      },
      {
        path: "organizations-list",
        name: "Organizations",
        component: OrganizationsList,
      },

      {
        path: "/documents",
        name: "Browse documents",
        component: () => import("../components/DocumentList")
      },
      {
        path: "/documents/:id",
        name: "document-details",
        component: () => import("../components/Document")
      },
      {
        path: "/add",
        name: "Add a document",
        component: () => import("../components/AddDocument")
      },
      {
        path: "/chart",
        name: "Charts",
        component: ECharts
      },
      {
        path: "/LifeExpectancy",
        name: "LifeExpectancy",
        component: LifeExpectancy
      },
      {
        path: "/SideBarMenu",
        name: "SideBarMenu",
        component: SideBarMenu
      }


    ],
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;

import Loadable from "app/components/Loadable";
import { lazy } from "react";
import { authRoles } from "../../auth/authRoles";

const Analytics = Loadable(lazy(() => import("./Analytics")));
const OrganizationList = Loadable(
  lazy(() => import("../Organization/organizationList"))
);
const VolunteerList = Loadable(lazy(() => import("../Volunteer/Volunteer")));
const Campaigns = Loadable(lazy(() => import("../Campaigns/campaigns")));
const Profile = Loadable(lazy(() => import("../Profile/profile")));

const dashboardRoutes = [
  { path: "/dashboard/default", element: <Analytics />, auth: authRoles.admin },
  {
    path: "/Organization/list",
    element: <OrganizationList />,
    auth: authRoles.editor,
  },
  {
    path: "/volunteer/list",
    element: <VolunteerList />,
    auth: authRoles.editor,
  },
  {
    path: "/campaigns",
    element: <Campaigns />,
    auth: authRoles.editor,
  },
  {
    path: "/profile",
    element: <Profile />,
    auth: authRoles.editor,
  },
];

export default dashboardRoutes;

import React from "react"
import { Router } from "@reach/router"
import styled from "styled-components"
import { ToastContainer, Slide } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import * as Sentry from "@sentry/gatsby"

import { colors, size } from "@everlywell/leaves"

import Layout from "components/common/layout/layout"
import PrivateRoute from "components/route/privateRoute"
import RestrictedRoute from "components/route/restrictedRoute"
import Account from "components/user/account"
import KitStatus from "components/pages/kitStatus/kitStatus"
import DetailView from "components/pages/kitStatus/detailView"
import AccessCode from "components/pages/admin/AccessCode/index"
import UserManagement from "components/pages/UserManagement"
import Settings from "components/pages/settings/main"
import Login from "components/auth/login"
import CreateAccessCode from "components/pages/admin/CreateAccessCode"
import EditAccessCode from "components/pages/admin/EditAccessCode"
import KitRegistration from "components/pages/kitRegistration"

import CollectingSampleTodayModal from "components/molecules/cliaWaiver/modal/CollectingSampleTodayModal"

import { TableProvider } from "contexts/table"
import { PopupProvider } from "contexts/popup"
import { KitRegistrationProvider } from "contexts/kitRegistration"
import { CliaWaiverProvider } from "contexts/cliaWaiver"
import { URL } from "utils/constants"

const kitStatusDetail = URL.kitStatus + "/:id"

const StyledToastContainer = styled(ToastContainer)`
  top: 7em;
  transform: unset;
  left: calc(50% - 297px);

  & > .Toastify__toast--user-management,
  .Toastify__toast--user-management-warning {
    left: calc(50% - 400px);
  }

  .Toastify__toast {
    width: 594px;
    padding: ${size.sm}px;
    border-radius: 1px;
    box-shadow: 0 2px 20px -5px rgba(170, 169, 172, 0.4);
    background-color: white;
  }

  .Toastify__toast--default {
    border: 1px solid ${colors.red3};
  }

  .Toastify__toast--error {
    border: 1px solid ${colors.red3};
  }

  .Toastify__toast--success {
    border: 1px solid ${colors.green4};
  }

  .Toastify__toast--user-management {
    border: 1px solid ${colors.green4};
    width: 1107px;
    padding: 12px 12px 16px 13px;
    font-size: 16px;
    line-height: 1.75;
    color: rgb(68, 72, 89);
  }

  .Toastify__toast--user-management-warning {
    border: 1px solid ${colors.orange1};
    width: 1107px;
    padding: 12px 12px 16px 13px;
    font-size: 16px;
    line-height: 1.75;
    color: rgb(68, 72, 89);
  }

  .Toastify__close-button {
    color: ${colors.gray3};
    & > svg {
      width: 22px;
      height: 22px;
    }
  }
`

const App = () => (
  <Sentry.ErrorBoundary fallback={"An error has occurred"}>
    <CliaWaiverProvider>
      <Layout>
        <StyledToastContainer
          autoClose={false}
          pauseOnFocusLoss={false}
          transition={Slide}
        />

        <TableProvider>
          <PopupProvider>
            <KitRegistrationProvider>
              <Router>
                <PrivateRoute path={URL.account} component={Account} />
                <PrivateRoute path={URL.kitStatus} component={KitStatus} />
                <RestrictedRoute
                  path={URL.registerKit}
                  component={KitRegistration}
                  accessType={"registration"}
                />

                <RestrictedRoute path={URL.accessCode} component={AccessCode} />
                <RestrictedRoute
                  path={URL.createAccessCode}
                  component={CreateAccessCode}
                />
                <RestrictedRoute
                  path={URL.editAccessCode}
                  component={EditAccessCode}
                />

                <RestrictedRoute
                  path={`${URL.userManagement}/*`}
                  component={UserManagement}
                  accessType="user-management"
                />

                <PrivateRoute
                  path={kitStatusDetail}
                  component={DetailView}
                  standalone={true}
                />
                <PrivateRoute path={URL.settings} component={Settings} />
                <Login path={URL.login} />
              </Router>
            </KitRegistrationProvider>
          </PopupProvider>

          <CollectingSampleTodayModal />
        </TableProvider>
      </Layout>
    </CliaWaiverProvider>
  </Sentry.ErrorBoundary>
)

export default App

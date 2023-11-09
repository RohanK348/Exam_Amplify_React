import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'

import AdminLayout from '../layouts/admin/index'
import CorporateLayout from '../layouts/corporate/index'
import Layout from '../layouts/candidate/index'
import {getCookie} from '../functions/cookie'
import {getJson} from '../functions/string'

export const AuthRoute = ({ children, ...rest }) => {
  const auth = getJson(getCookie('auth'))

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !auth ? (
          children
        ) : (
          (
            auth?.role === 'admin' ?
            (
              <Redirect
                to={{
                  pathname: '/admin/topic',
                  state: { from: location },
                }}
              />
            ):
            auth?.role === 'corporate' ?
            (
              <Redirect
                to={{
                  pathname: '/corporate',
                  state: { from: location },
                }}
              />
            ):
            (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: location },
                }}
              />
            )
          )
        )
      }
    />
  );
}

export const PrivateRoute = ({ children, isSidebar=true, isNav=true, path, ...rest }) => {
  const auth = getJson(getCookie('auth'))
  const unBlockPaths = ['/block', '/logout']

  return (
    <Layout isSidebar={isSidebar} isNav={isNav}>
      <Route
        path={path}
        {...rest}
        render={({ location }) =>
          auth ? (
            (auth?.isBlock&&unBlockPaths.indexOf(path)===-1)?
            (
              <Redirect
                to={{
                  pathname: '/block',
                  state: { from: location },
                }}
              />
            ):
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    </Layout>
  );
}

export const PrivatePremium = ({ children, path, ...rest }) => {
  const auth = getJson(getCookie('auth'))

  return (
    <Layout>
      <Route
        path={path}
        {...rest}
        render={({ location }) =>
          (auth && auth?.profile?.premiumDate && new Date(auth?.profile?.premiumDate) > new Date()) ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/payment',
                state: { from: location },
              }}
            />
          )
        }
      />
    </Layout>
  );
}

export const PrivateCorporateRoute = ({ children, ...rest }) => {
  const auth = getJson(getCookie('auth'))
  
  return (
    <CorporateLayout>
      <Route
        {...rest}
        render={({ location }) =>
          auth ?
            (auth?.isBlock?
              (
              <Redirect
                to={{
                  pathname: '/block',
                  state: { from: location },
                }}
              />
              ):(
              (auth?.role === 'corporate' ?
                (
                  children
                ) :
                <Redirect
                  to={{
                    pathname: '/',
                    state: { from: location },
                  }}
                />
              )
            )
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    </CorporateLayout>
  );
}

export const PrivateAdminRoute = ({ children, ...rest }) => {
  const auth = getJson(getCookie('auth'))
  
  return (
    <AdminLayout>
      <Route
        {...rest}
        render={({ location }) =>
          auth ?
            (auth?.role === 'admin' ?
            (
              children
            ) :
            <Redirect
              to={{
                pathname: '/',
                state: { from: location },
              }}
            />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    </AdminLayout>
  );
}

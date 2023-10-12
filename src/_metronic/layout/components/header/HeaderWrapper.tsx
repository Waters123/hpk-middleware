/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import React, {useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {MenuComponent} from '../../../assets/ts/components'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {useLayout} from '../../core'
import {Header} from './Header'
import {DefaultTitle} from './page-title/DefaultTitle'
import {Topbar} from './Topbar'
import {Alert} from '@mui/material'
import {useAuth} from '../../../../app/providers/AuthContext'

export function HeaderWrapper() {
  const {pathname} = useLocation()
  const {config, classes, attributes} = useLayout()
  const {header, aside} = config
  const {data}: any = useAuth()
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [pathname])

  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch')}
      {...attributes.headerMenu}
    >
      <div
        style={{
          width: '80%',
          position: 'fixed',
          zIndex: 500,
          justifyContent: 'center',
          display: 'flex',
        }}
        className='warning-wrapper'
      >
        {!data?.verified && (
          <Alert style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}} severity='error'>
            გაიარეთ ვერიფიკაცია
            <Link to='/user/settings'> ვერიფიკაცია</Link>
          </Alert>
        )}
      </div>
      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between'
        )}
      >
        {/* begin::Aside mobile toggle */}
        {aside.display && (
          <div className='d-flex align-items-center d-lg-none ms-n3 me-1' title='Show aside menu'>
            <div
              className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
              id='kt_aside_mobile_toggle'
            >
              <KTSVG path='/media/icons/duotune/abstract/abs015.svg' className='svg-icon-2x mt-1' />
            </div>
          </div>
        )}
        {/* end::Aside mobile toggle */}
        {/* begin::Logo */}
        {!aside.display && (
          <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
            <Link to='/dashboard' className='d-lg-none'>
              <img
                alt='Logo'
                src={toAbsoluteUrl('/media/logos/logo-1-dark.png')}
                className='h-30px'
              />
            </Link>
          </div>
        )}
        {/* end::Logo */}

        {aside.display && (
          <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
            <Link to='/' className='d-lg-none'>
              <img
                alt='Logo'
                src={toAbsoluteUrl('/media/logos/logo-1-dark.png')}
                className='h-30px'
              />
            </Link>
          </div>
        )}

        {/* begin::Wrapper */}
        <div className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'>
          {/* begin::Navbar */}
          {header.left === 'menu' && (
            <div className='d-flex align-items-stretch' id='kt_header_nav'>
              <Header />
            </div>
          )}

          {header.left === 'page-title' && (
            <div className='d-flex align-items-center' id='kt_header_nav'>
              <DefaultTitle />
            </div>
          )}

          <div className='d-flex align-items-stretch flex-shrink-0'>
            <Topbar />
          </div>
        </div>
        {/* end::Wrapper */}
      </div>
    </div>
  )
}

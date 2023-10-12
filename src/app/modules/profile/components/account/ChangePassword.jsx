import React, {useState} from 'react'
import {styled} from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {useLazyFetch} from '../../../../hooks/useLazyFetch'

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('შეიყვანეთ პაროლი'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('შიყვანეთ ახალი პაროლი'),
  changepassword: Yup.string()
    .required('გაიმეორეთ პაროლი')
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
})

const initialValues = {
  currentPassword: '',
  password: '',
  changepassword: '',
}

export default function ChangePassword() {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState(undefined)
  const [fetcher] = useLazyFetch()
  const formik = useFormik({
    initialValues,
    validationSchema: changePasswordSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {snackBar} = await fetcher('api/user/changepassword', 'put', {
          password: values.password,
          currentPassword: values.currentPassword,
        })
        snackBar()
        setHasErrors(false)
        setTimeout(() => {
          handleClose()
          setLoading(false)
        }, 1000)
      } catch (err) {
        setHasErrors(true)
        setLoading(false)
        setSubmitting(false)
        setStatus('something went wrong')
      }
    },
  })

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setHasErrors(undefined)
    formik.resetForm()
  }

  return (
    <div>
      <button
        style={{marginTop: 10}}
        type='button'
        onClick={handleClickOpen}
        className='btn btn-light-primary fw-bold btn-sm'
      >
        პაროლის შეცვლა
      </button>
      <BootstrapDialog
        onClose={handleClose}
        fullWidth
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle sx={{m: 0, p: 2}} id='customized-dialog-title'>
          პაროლის შეცვლა
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {hasErrors === false ? (
            <div className='mb-10 bg-light-info p-8 rounded'>
              <div className='text-info'>password changed</div>
            </div>
          ) : (
            <>
              {/* begin::Form group Confirm password */}
              <div className='fv-row mb-5'>
                <label className='form-label fw-bolder text-dark fs-6'>პაროლი</label>
                <input
                  type='password'
                  placeholder='პაროლი'
                  autoComplete='off'
                  {...formik.getFieldProps('currentPassword')}
                  className={clsx(
                    'form-control form-control-lg form-control-solid',
                    {
                      'is-invalid': formik.touched.currentPassword && formik.errors.currentPassword,
                    },
                    {
                      'is-valid': formik.touched.currentPassword && !formik.errors.currentPassword,
                    }
                  )}
                />
                {formik.touched.currentPassword && formik.errors.currentPassword && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.currentPassword}</span>
                    </div>
                  </div>
                )}
              </div>
              {/* end::Form group */}
              <div className='mb-10 fv-row' data-kt-password-meter='true'>
                <div className='mb-1'>
                  <label className='form-label fw-bolder text-dark fs-6'>ახალი პაროლი</label>
                  <div className='position-relative mb-3'>
                    <input
                      type='password'
                      placeholder='ახალი პაროლი'
                      autoComplete='off'
                      {...formik.getFieldProps('password')}
                      className={clsx(
                        'form-control form-control-lg form-control-solid',
                        {
                          'is-invalid': formik.touched.password && formik.errors.password,
                        },
                        {
                          'is-valid': formik.touched.password && !formik.errors.password,
                        }
                      )}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.password}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='fv-row mb-5'>
                <label className='form-label fw-bolder text-dark fs-6'>დაადასტურე პაროლი</label>
                <input
                  type='password'
                  placeholder='დაადასტურე პაროლი'
                  autoComplete='off'
                  {...formik.getFieldProps('changepassword')}
                  className={clsx(
                    'form-control form-control-lg form-control-solid',
                    {
                      'is-invalid': formik.touched.changepassword && formik.errors.changepassword,
                    },
                    {
                      'is-valid': formik.touched.changepassword && !formik.errors.changepassword,
                    }
                  )}
                />
                {formik.touched.changepassword && formik.errors.changepassword && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.changepassword}</span>
                    </div>
                  </div>
                )}
              </div>
              {hasErrors === true && (
                <div className='mb-lg-15 alert alert-danger'>
                  <div className='alert-text font-weight-bold'>something went wrong</div>
                </div>
              )}
            </>
          )}

          {/* end::Form group */}
        </DialogContent>
        <DialogActions>
          <button className='btn btn-lg btn-primary fw-bolder me-4' onClick={formik.handleSubmit}>
            {loading ? (
              <span style={{display: 'block'}} className='indicator-progress'>
                გთხოვთ მოიცადოთ...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            ) : (
              <span className='indicator-label'>შენახვა</span>
            )}
          </button>
          <button onClick={handleClose} className='btn btn-primary fw-bolder px-6 py-3 me-3'>
            დახურვა
          </button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}

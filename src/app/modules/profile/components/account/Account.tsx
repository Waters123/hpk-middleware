/* eslint-disable jsx-a11y/anchor-is-valid */
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useAuth} from '../../../../providers/AuthContext'
import ChangePassword from './ChangePassword'
import {useLazyFetch} from '../../../../hooks/useLazyFetch'
import clsx from 'clsx'
import {useState} from 'react'

const AccoutSchema = Yup.object().shape({
  firstName: Yup.string().required('FirstName is Requires'),
  lastName: Yup.string().required('FirstName is Requires'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  mobile: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Phone is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  changepassword: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
})

export function Account() {
  // const [data, setData] = useState<IAccount>(defaultAccount)
  //const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [iseVerificationSent, setIseVerificationSent] = useState<boolean>(false)
  const {data}: any = useAuth()
  const [fetcher] = useLazyFetch()

  const formik = useFormik({
    initialValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: 'M123456789',
      changepassword: 'M123456789',
      mobile: data.mobile,
    },
    validationSchema: AccoutSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setSubmitting(false)
    },
  })

  const handleVeryfyEmail = async () => {
    // Trigger email field validation
    setLoading(true)
    setIseVerificationSent(false)
    formik.validateForm().then(async (errors) => {
      if (!errors.email) {
        try {
          const {snackBar}: any = await fetcher(`/api/user/send-user-verification`, 'post', {
            email: data.email,
          })
          snackBar('ვერიფიკაციის ბმული გამოგზავნილია მეილზე')
          setLoading(false)
          setIseVerificationSent(true)
        } catch (err) {
          console.log(err)
          setLoading(false)
        }
      }
    })
  }

  return (
    <div className='card'>
      {/* begin::Form */}
      <form onSubmit={formik.handleSubmit} className='form d-flex flex-center'>
        <div className='card-body mw-800px py-20'>
          <div className='row mb-8'>
            <label className='col-lg-3 col-form-label'></label>
            <div className='col-lg-9'>
              {data.verified && (
                <span className='badge badge-light-success ' style={{padding: '10px', margin: '0'}}>
                  ვერიფიცირებული
                </span>
              )}
            </div>
          </div>

          {/* begin::Form row */}
          <div className='row mb-8'>
            <label className='col-lg-3 col-form-label'>სახელი</label>
            <div className='col-lg-9'>
              <div className='spinner spinner-sm spinner-primary spinner-right'>
                <input
                  className='form-control form-control-lg form-control-solid'
                  type='text'
                  {...formik.getFieldProps('firstName')}
                  disabled={true}
                />
              </div>
            </div>
          </div>
          {/* end::Form row */}
          {/* begin::Form row */}
          <div className='row mb-8'>
            <label className='col-lg-3 col-form-label'>გვარი</label>
            <div className='col-lg-9'>
              <div className='spinner spinner-sm spinner-primary spinner-right'>
                <input
                  className='form-control form-control-lg form-control-solid'
                  type='text'
                  {...formik.getFieldProps('lastName')}
                  disabled={true}
                />
              </div>
            </div>
          </div>
          {/* end::Form row */}
          <div className='row mb-8'>
            <label className='col-lg-3 col-form-label'>მეილი</label>
            <div className='col-lg-9'>
              <div className='spinner spinner-sm spinner-primary spinner-right'>
                <div>
                  <input
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {'is-invalid': formik.touched.email && formik.errors.email},
                      {
                        'is-valid': formik.touched.email && !formik.errors.email,
                      }
                    )}
                    type='text'
                    {...formik.getFieldProps('email')}
                    disabled={true}
                  />
                </div>
                {!iseVerificationSent && !data.verified && (
                  <button
                    style={{marginTop: 10}}
                    type='button'
                    className='btn btn-light-danger fw-bold btn-sm'
                    onClick={handleVeryfyEmail}
                  >
                    {loading ? (
                      <span style={{display: 'block'}} className='indicator-progress'>
                        გთხოვთ მოიცადოთ...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    ) : (
                      <span className='indicator-label'>ვერიფიკაცია</span>
                    )}
                  </button>
                )}
                {iseVerificationSent && (
                  <>
                    <span style={{margin: '5px 2px', display: 'block'}}>
                      {' '}
                      ვერიფიკაციის ბმული გამოგზავნილია, გთხოვთ შეამოწმოთ მეილი{' '}
                    </span>
                    <button
                      type='button'
                      className='btn btn-light-danger fw-bold btn-sm'
                      onClick={handleVeryfyEmail}
                    >
                      ახლიდან გაგზავნა
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* begin::Form row */}

          {/* end::Form row */}
          <div className='row mb-8'>
            <label className='col-lg-3 col-form-label'>ტელეფონი</label>
            <div className='col-lg-9'>
              <div className='spinner spinner-sm spinner-primary spinner-right'>
                <input
                  className='form-control form-control-lg form-control-solid'
                  type='text'
                  {...formik.getFieldProps('mobile')}
                  disabled={true}
                />
              </div>
            </div>
          </div>
          {/* begin::Form row */}

          {/* end::Form row */}

          <div className='row mb-8'>
            <label className='col-lg-3 col-form-label'>პაროლი</label>
            <div className='col-lg-9'>
              <div className='spinner spinner-sm spinner-primary spinner-right'>
                <input
                  className='form-control form-control-lg form-control-solid'
                  type='password'
                  {...formik.getFieldProps('password')}
                  disabled={true}
                />
                <ChangePassword />
              </div>
            </div>
          </div>
          {/* begin::Form row */}

          <div className='separator separator-dashed my-10'></div>

          {/* begin::Form row */}
          {/* <div className='row'>
            <label className='col-lg-3 col-form-label'></label>
            <div className='col-lg-9'>
              <button type='submit' className='btn btn-primary fw-bolder px-6 py-3 me-3'>
                Save Changes
              </button>
              <button
                type='reset'
                className='btn btn-color-gray-600 btn-active-light-primary fw-bolder px-6 py-3'
              >
                Cancel
              </button>
            </div>
          </div> */}
          {/* end::Form row */}
        </div>
      </form>
      {/* end::Form */}
    </div>
  )
}

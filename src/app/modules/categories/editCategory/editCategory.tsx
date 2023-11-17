import React, {useEffect} from 'react'
import * as Yup from 'yup'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {FormikErrors, useFormik} from 'formik'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import {useLazyFetch} from '../../../hooks/useLazyFetch'
import {ButtonDelete} from '../../../components/buttonDelete'
import {useFetch} from '../../../hooks/useFetch'

const ProductsBreadCrumb: Array<PageLink> = [
  {
    title: 'კატეგორიები',
    path: '/products/categories',
    isSeparator: false,
    isActive: true,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: true,
  },
]

const loginSchema = Yup.object().shape({
  categoryTitle: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Category title is required'),
  subCategories: Yup.array().of(
    Yup.object().shape({
      subCategoryTitle: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Subcategory title is required'),
    })
  ),
})

interface SubCategory {
  subCategoryTitle: string
}

const initialValues = {
  categoryTitle: '',
  subCategories: [] as SubCategory[],
}

const EditCategory = ({singleCategory}) => {
  const [loading, setLoading] = React.useState(false)
  const [hasErrors, setHasErrors] = React.useState<boolean | undefined>(undefined)
  const [createCategory] = useLazyFetch()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting, resetForm}) => {
      setLoading(true)
      try {
        const {snackBar} = await createCategory(
          `api/category/editCategory/${singleCategory._id}`,
          'put',
          {
            categoryTitle: values.categoryTitle,
            subCategory: values.subCategories.map((sub: any) => ({
              subCategoryTitle: sub.subCategoryTitle,
            })),
          }
        )
        setLoading(false)
        setHasErrors(false)
        snackBar('კატეგორია წარმატებით დაემატა')
        resetForm()
      } catch (err) {
        setLoading(false)
        setSubmitting(false)
        setStatus('ასეთი კატეგორია უკვე არსებობს')
        setHasErrors(true)
      }
    },
  })

  useEffect(() => {
    formik.setValues({
      categoryTitle: singleCategory.categoryTitle,
      subCategories:
        singleCategory.subCategory.length > 0
          ? singleCategory.subCategory.map((el: any) => ({
              subCategoryTitle: el.subCategoryTitle,
            }))
          : [],
    })
  }, [singleCategory])

  const handleDeleteSubCategory = (index: number) => {
    const updatedSubCategories = [...formik.values.subCategories]
    updatedSubCategories.splice(index, 1)
    formik.setValues({
      ...formik.values,
      subCategories: updatedSubCategories,
    })
  }

  return (
    <>
      <div className='card'>
        <form onSubmit={formik.handleSubmit} className='form d-flex flex-center'>
          <div className='card-body mw-400px py-20'>
            <div className='row mb-8'>
              {hasErrors === true && (
                <div className='alert alert-danger'>
                  <div className='alert-text font-weight-bold'>{formik.status}</div>
                </div>
              )}
            </div>
            <div className='row mb-8'>
              <div className='col-md-12'>
                <TextField
                  value={formik.values.categoryTitle}
                  onChange={formik.handleChange}
                  fullWidth
                  id='categoryTitle'
                  name='categoryTitle'
                  label='დასახელება'
                  variant='outlined'
                  error={Boolean(formik.errors.categoryTitle && formik.touched.categoryTitle)}
                  helperText={formik.touched.categoryTitle && formik.errors.categoryTitle}
                />
              </div>
            </div>

            {formik.values.subCategories.map((subCategory: any, index) => (
              <div className='row mb-8' key={index}>
                <div className='col-md-10'>
                  <TextField
                    value={subCategory.subCategoryTitle}
                    onChange={formik.handleChange}
                    fullWidth
                    id={`subCategories.${index}.subCategoryTitle`}
                    name={`subCategories.${index}.subCategoryTitle`}
                    label='ქვეკატეგორია'
                    variant='standard'
                    error={Boolean(
                      formik.errors.subCategories &&
                        formik.touched.subCategories &&
                        formik.touched.subCategories[index] &&
                        (formik.errors.subCategories as FormikErrors<SubCategory>[])[index]
                          ?.subCategoryTitle
                    )}
                    helperText={
                      formik.errors.subCategories &&
                      formik.touched.subCategories &&
                      formik.touched.subCategories[index] &&
                      (formik.errors.subCategories as FormikErrors<SubCategory>[])[index]
                        ?.subCategoryTitle
                    }
                  />
                </div>
                <span className='col-md-2'>
                  <ButtonDelete
                    onClick={() => handleDeleteSubCategory(index)}
                    style={{marginTop: 10}}
                  />
                </span>
              </div>
            ))}
            <div className='row mb-8'>
              <Button
                startIcon={<AddIcon />}
                onClick={() =>
                  formik.setValues({
                    ...formik.values,
                    subCategories: [...formik.values.subCategories, {subCategoryTitle: ''}],
                  })
                }
                variant='contained'
              >
                ქვეკატეგორიის დამატება
              </Button>
            </div>

            <div className='row mb-8'>
              <button type='submit' className='btn btn-lg btn-primary w-100 mb-5'>
                {!loading && <span className='indicator-label'>შენახვა</span>}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    გთხოვთ მოიცადოთ
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditCategory

import {Skeleton} from '@mui/material'
import {Category, ICategoryListProps, SubCategory} from '../../category.types'
import {Link} from 'react-router-dom'

const SkeletonLoader = () => {
  return (
    <>
      {Array.from({length: 9}, (_, index) => (
        <div key={index} className='col-xl-4 col-md-6'>
          <div className='card card-height-100 categrory-widgets overflow-hidden'>
            <div className='card-body p-4'>
              <div className='d-flex align-items-center mb-3'>
                <h5 className='flex-grow-1 mb-0'>
                  <Skeleton width={250} height={30} animation='wave' variant='text' />
                </h5>
                <ul className='flex-shrink-0 list-unstyled hstack gap-1 mb-0'>
                  <li>
                    <a href='#!' className='bg-info-subtle text-info  edit-list' data-edit-id='12'>
                      <Skeleton animation='wave' width={100} variant='text' />
                    </a>
                  </li>
                  <li>
                    <a
                      href='#delteModal'
                      data-bs-toggle='modal'
                      className='bg-danger-subtle text-danger  remove-list'
                      data-remove-id='12'
                    >
                      <Skeleton animation='wave' width={100} variant='text' />
                    </a>
                  </li>
                </ul>
              </div>
              <ul className='list-unstyled vstack gap-2 mb-0'>
                <li>
                  <a href='#!' className='text-muted'>
                    <Skeleton animation='wave' width={200} variant='text' />
                    <Skeleton animation='wave' width={200} variant='text' />
                    <Skeleton animation='wave' width={200} variant='text' />
                    <Skeleton animation='wave' width={200} variant='text' />
                    <Skeleton animation='wave' width={200} variant='text' />
                    <Skeleton animation='wave' width={200} variant='text' />
                  </a>
                </li>
              </ul>

              <div className='mt-3'>
                <a
                  data-bs-toggle='offcanvas'
                  href='#overviewOffcanvas'
                  data-view-id='12'
                  className='overview-btn fw-medium link-effect'
                >
                  <Skeleton animation='wave' width={100} variant='text' />
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export const CategoryList = ({categories, loading, HandleDeleteOne}: ICategoryListProps) => {
  return (
    <>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <>
          {categories?.map((category: Category) => {
            return (
              <div className='col-xl-4 col-md-6' key={category._id}>
                <div className='card card-height-100 categrory-widgets overflow-hidden'>
                  <div className='card-body p-4'>
                    <div className='d-flex align-items-center mb-3'>
                      <h5 className='flex-grow-1 mb-0'>{category.categoryTitle}</h5>
                      <ul className='flex-shrink-0 list-unstyled hstack gap-1 mb-0'>
                        <li>
                          <Link
                            to={`categories/edit/${category._id}`}
                            className='badge bg-info-subtle text-info  edit-list'
                          >
                            რედაქტირება
                          </Link>
                        </li>
                        <li>
                          <a
                            href='#delteModal'
                            onClick={() => HandleDeleteOne(category._id)}
                            className='badge bg-danger-subtle text-danger  remove-list'
                          >
                            წაშლა
                          </a>
                        </li>
                      </ul>
                    </div>
                    <ul className='list-unstyled vstack gap-2 mb-0'>
                      {category.subCategory.map((subCategory: SubCategory) => (
                        <li key={subCategory._id}>
                          <a href='#!' className='text-muted'>
                            {subCategory.subCategoryTitle}
                          </a>
                        </li>
                      ))}
                    </ul>

                    <div className='mt-3'>
                      <span className='overview-btn '>
                        Created By: <i className='ri-arrow-right-line align-bottom ms-1'></i>
                        {category?.createdBy?.firstName}
                      </span>
                    </div>
                    {/* <img
                      src='http://localhost:3011/media/svg/avatars/maro.jpg'
                      alt=''
                      className='img-fluid category-img object-fit-cover'
                    /> */}
                  </div>
                </div>
              </div>
            )
          })}
        </>
      )}
    </>
  )
}

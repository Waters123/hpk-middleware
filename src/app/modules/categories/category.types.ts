export interface SubCategory {
  _id: React.Key
  subCategoryTitle: String
  createdAt: String
  updatedAt: String
}

export interface Category {
  _id: React.Key
  categoryTitle: String
  subCategory: Array<SubCategory>
  createdAt: String
  updatedAt: String
  createdBy: {
    firstName: String
    lastName: String
    _id: String
  }
}
export interface CategoryData {
  loading: boolean
  data: Array<Category>
}

export interface ICategoryListProps {
  categories: any
  loading: boolean
  HandleDeleteOne: any
}

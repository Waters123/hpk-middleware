import {KTSVG} from '../../_metronic/helpers/components/KTSVG'

export const ButtonDelete = ({onClick, style}: any) => {
  return (
    <span
      onClick={onClick}
      style={{...style}}
      className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm'
    >
      <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
    </span>
  )
}

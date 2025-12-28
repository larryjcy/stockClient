import PropTypes from 'prop-types'

// material-ui
import { TableCell, TableRow } from '@mui/material'

// third-party
import { useDrag, useDrop } from 'react-dnd'

// project-import
//import IconButton from 'components/@extended/IconButton'

// assets
import { DragOutlined } from '@ant-design/icons'

// ==============================|| DRAGGABLE ROW ||============================== //

const DraggableRow = ({ row, reorderRow, children }) => {
  const [{ isOverCurrent }, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow) => reorderRow(draggedRow.index, row.index),
    collect: (monitor) => ({ isOver: monitor.isOver(), isOverCurrent: monitor.isOver({ shallow: true }) })
  })

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    item: () => row,
    type: 'row'
  })

  return (
    <TableRow
      ref={previewRef} //previewRef could go here
      sx={{ opacity: isDragging ? 0.5 : 1, bgcolor: isOverCurrent ? 'primary.lighter' : 'inherit' }}
    >
      <TableCell ref={dropRef}>
        <div 
          ref={dragRef}
          role="button"
          tabIndex={0}
          aria-label="Drag to reorder"
          style={{ 
            cursor: 'grab',
            padding: '4px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px'
          }}
        >
          <DragOutlined style={{ fontSize: '16px' }} />
        </div>
      </TableCell>
      {children}
    </TableRow>
  )
}

DraggableRow.propTypes = {
  row: PropTypes.object,
  reorderRow: PropTypes.func,
  children: PropTypes.node,
  index: PropTypes.number,
  getIsGrouped: PropTypes.func
}

export default DraggableRow

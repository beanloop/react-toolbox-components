import * as React from 'react'
import {IconButton} from 'react-toolbox/lib/button'
import {IconMenu, MenuItem} from 'react-toolbox/lib/menu'
import {withMedia} from 'react-with-media'
import {Row} from 'styled-material/dist/src/layout'

export const mediaMobile = '(max-width: 500px)'

export const Menu = withMedia(mediaMobile)(({matches, items, forceMenu, forceExpanded, limitExpandedItems = 2, ...props}) =>
  !forceExpanded && (forceMenu || matches || items.length > limitExpandedItems)
    ?
      <IconMenu icon='more_vert' {...props}>
        {items.map(item =>
          <MenuItem key={item.value} {...item} />
        )}
      </IconMenu>
    : <Row horizontal='flex-end'>
        {items.map(item =>
          <IconButton key={item.value} icon={item.icon} onClick={item.onClick} />
        )}
      </Row>
)

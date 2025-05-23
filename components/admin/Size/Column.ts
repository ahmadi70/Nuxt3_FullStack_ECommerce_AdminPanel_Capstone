import type { ColumnDef } from "@tanstack/vue-table"
import ActionMenu from './CellAction.vue'
import Value from "./Value.vue"

export interface Size {
  id: string
  name: string
  value: string
  createdAt: string
}

export const columns: ColumnDef<Size>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => {
      return h(Value, {
        sizeCode: row.original.value
      })
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At'
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const size = row.original
      return h('div', { class: 'relative' }, h(ActionMenu, {
        size
      }))
    }
  }
]
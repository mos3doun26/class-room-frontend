import { CreateButton } from '@/components/refine-ui/buttons/create'
import { DataTable } from '@/components/refine-ui/data-table/data-table'
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import { ListView } from '@/components/refine-ui/views/list-view'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { SelectItem,Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DEPARTMENT_OPTIONS } from '@/constants'
import Subject from '@/types/subject'
import { useTable } from '@refinedev/react-table'
import { ColumnDef } from '@tanstack/react-table'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

const SubjectsList = () => {
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('all')
  
  const searchFilters = search ? [
    {
      field: "name",
      operator: "contains" as const,
      value: search,
    }
  ] : []

  const departmentFilters = department === 'all' ? [] : [
    {
      field: "department",
      operator: "eq" as const,
      value: department,
    }
  ]
  
  const table = useTable<Subject>({
    columns: useMemo<ColumnDef<Subject>[]>(
      () => [
        {
          id: "code",
          accessorKey: "code",
          header: ()=> <p className='column-title'>code</p>,
          cell: ({getValue}) => <Badge>{getValue<string>()}</Badge>,
          size: 100
        },
        {
          id: "name",
          accessorKey: "name",
          header: ()=> <span className='column-title'>name</span>,
          cell: ({getValue}) => <span className='text-foreground'>{getValue<string>()}</span>,
          size: 200,
          filterFn: "includesString", // to include searching by name
        },
        {
          id: "department",
          accessorKey: "department",
          header: ()=> <p className='column-title'>department</p>,
          cell: ({getValue}) => <Badge variant='secondary' >{getValue<string>()}</Badge>,
          size: 150
        },
        {
          id: "description",
          accessorKey: "description",
          header: ()=> <span className='column-title'>description</span>,
          cell: ({getValue}) => <span className='truncate line-clamp-2' >{getValue<string>()}</span>,
          size: 300
        },
      ], []),
    refineCoreProps: {
      resource: 'subjects',
      pagination: {pageSize: 10, mode: 'server'},
      filters: {
        permanent: [...departmentFilters, ...searchFilters]
      },
      sorters: {
         initial: [
        {
          field: "id",
          order: "desc",
        },
      ]
      },
    }
  })

  return (
    <>
      <ListView>
        <Breadcrumb />
        <h1 className='page-title'>Subjects</h1>
        <div className='intro-row'>
          <p>Quick access to essential metrics and management tools.</p>
          <div className='actions-row'>

            <div className='search-field'>
              <Search className='search-icon'/>
              <Input
                type='text'
                placeholder='Search by name...'
                className='pl-10 w-full'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className='flex gap-2 w-full sm: w-auto'>
              <Select
                value={department}
                onValueChange={setDepartment}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>
                    All department
                  </SelectItem>
                  {
                    DEPARTMENT_OPTIONS.map(option => 
                      <SelectItem 
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    )
                  }
                </SelectContent>
              </Select>

              <CreateButton />
            </div>

          </div>
        </div>
        <DataTable table={table} />
      </ListView>
    </>
  )
}

export default SubjectsList
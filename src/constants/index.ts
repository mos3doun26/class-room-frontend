export const DEPARTMENT_LIST = [
    "CS",
    "Math",
    "English",
    "Arabic"
]

export const DEPARTMENT_OPTIONS = DEPARTMENT_LIST.map( department => (
    {
        value: department.toLowerCase(),
        label: department
    }
))
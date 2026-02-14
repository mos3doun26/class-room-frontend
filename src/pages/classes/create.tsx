import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb"
import { ListView } from "@/components/refine-ui/views/list-view"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { classSchema } from "@/lib/schema"
import { useBack } from "@refinedev/core" 
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select, SelectTrigger, SelectContent, SelectValue, SelectItem
} from '@/components/ui/select'
import { subjects, teachers } from "@/constants"
import {InputGroup, InputGroupTextarea} from '@/components/ui/input-group'

const CreateClass = () => {

    const back = useBack()

    const form = useForm<z.infer<typeof classSchema>>({
        resolver: zodResolver(classSchema),
        defaultValues: {
            status: "active"
        },
    })

    function onSubmit(values: z.infer<typeof classSchema>) {
        try{
            console.log(values)
        } catch(e){
            console.error(e)
        }
    }

    return (
        <ListView>
            <Breadcrumb />
            
            <h1 className="page-title">Create a class</h1>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                <p>provide information below to create a class</p>
                <Button onClick={back}>Go Back</Button>
            </div>

            <Separator />

            <div className="my-4 flex items-center">
                <Card className="class-form-card">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Fill out the form</CardTitle>
                    </CardHeader>

                    <Separator />

                    <CardContent>
                        <Form {...form}>
                            <form id="create-class-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="bannerUrl"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>
                                                Banner Image
                                                <span className="text-primary">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <span>Upload image widget</span>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Class Name
                                                <span className="text-primary">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter class name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="subjectId"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel>
                                                    Subject
                                                    <span className="text-primary">*</span>
                                                </FormLabel>
                                                <Select onValueChange={(value)=>field.onChange(Number(value))} value={field.value?.toString()} >
                                                    <FormControl className="w-full">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a subject" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {subjects.map((subject) => (
                                                            <SelectItem key={subject.id} value={subject.id.toString()}>
                                                                {subject.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="teacherId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Teacher
                                                    <span className="text-primary">*</span>
                                                </FormLabel>
                                                <Select onValueChange={(value)=>field.onChange(Number(value))} value={field.value?.toString()}>
                                                    <FormControl className="w-full">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a teacher" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {teachers.map((teacher) => (
                                                            <SelectItem key={teacher.id} value={teacher.id.toString()}>
                                                                {teacher.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="capacity"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel>
                                                    Capacity
                                                </FormLabel>
                                                <FormControl className="w-full">
                                                    <Input type="number" defaultValue={1} placeholder="enter a cabacity" {...field}/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Status
                                                    <span className="text-primary">*</span>
                                                </FormLabel>
                                                <Select onValueChange={field.onChange}>
                                                    <FormControl className="w-full">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a role" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="active">Active</SelectItem>
                                                        <SelectItem value="inactive">Inactive</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel>
                                                Description
                                            </FormLabel>
                                            <FormControl className="w-full">
                                                <InputGroup>
                                                    <InputGroupTextarea
                                                    {...field}
                                                    id="create-class-form"
                                                    placeholder="Brief description about your class"
                                                    rows={6}
                                                    className="min-h-24 resize-none"
                                                    />
                                                </InputGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" form="create-class-form">
                                    Create
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </ListView>
    )
}

export default CreateClass
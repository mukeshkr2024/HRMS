import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CustomInput } from "../../../components/shared/custom-input"
import { FormField, Form } from "../../../components/ui/form"

import {
    FormControl,
    FormItem
} from "@/components/ui/form"
import { Button } from "../../../components/ui/button"
import { PlusCircle } from "lucide-react"


const languages = [
    {
        id: 1,
        language: "English",
    }, {
        id: 2,
        language: "Hindi"
    }
]


export const LanguagesDetails = () => {
    return (
        <section className="mt-8 font-urbanist">
            <div className="flex gap-x-2">
                <img src="/icons/book.svg" alt="Profile" />
                <p className="text-[#333333] font-semibold">Languages</p>
            </div>

            <div className="mt-4 flex gap-4 items-center flex-wrap">
                {
                    languages.map((language, index) => (
                        <LanguageCard key={index} language={language.language} />
                    ))
                }

                <Button className="h-9 flex items-center gap-2  bg-[#1FBE8E] hover:bg-[#1FBE8E] text-black font-semibold text-sm"><PlusCircle size={15} />Add Language</Button>
            </div>

        </section>
    )
}



const languageSchema = z.object({
    language: z.string(),
})


const LanguageCard = ({ language }: { language: string }) => {

    const form = useForm({
        resolver: zodResolver(languageSchema),
        defaultValues: {
            language: language,
        },
    })

    const onSubmit = () => {

    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name="language"
                render={({ field, }) => (
                    <FormItem>

                        <FormControl>
                            <CustomInput

                                {...field}
                                className="w-[250px]"
                            />
                        </FormControl>
                    </FormItem>

                )}
            />
        </form>
    </Form>
}
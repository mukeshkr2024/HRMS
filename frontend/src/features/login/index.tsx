import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEmployeeLogin } from "./api/use-login";

const formSchema = z.object({
    email: z
        .string()
        .email({ message: "Please enter a valid email address." }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
});

export const LoginPage = () => {
    const { mutate } = useEmployeeLogin();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })


    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutate({
            email: values.email,
            password: values.password
        })
    };

    return (
        <div className="h-screen w-full overflow-hidden">
            <div className="w-full h-full flex ">
                <div className="w-[500px] flex h-full  justify-center items-center">
                    <div className="w-[350px] flex flex-col gap-y-6">
                        <div className="flex gap-y-3  justify-between items-center">
                            <img
                                src="/hr-logo.svg"
                                className="w-20 h-20 lg:w-auto lg:h-auto"
                                alt="Logo"
                            ></img>
                            <h1 className="flex justify-center font-urbanist font-semibold leading-5 text-lg text-[#000000]">
                                ONE.HR
                            </h1>
                        </div>
                        <div className="">
                            <h2 className="text-base font-urbanist font-semibold leading-7 text-[#1A1A1A]">
                                Nice to see you again
                            </h2>
                            <Form {...form} >
                                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-y-3">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-normal  text-[#1A1A1A]">Login</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Email or phone number"  {...field} className="bg-gray-200  text-[#808080] font-normal rounded-md" />
                                                </FormControl>
                                                <FormMessage className="text-sm font-normal" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-normal  text-[#1A1A1A]">Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter password"  {...field} className="bg-gray-200  text-[#808080] font-normal rounded-md" />
                                                </FormControl>
                                                <FormMessage className="text-sm font-normal" />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit"
                                        className="flex justify-center w-full px-4 py-3 font-urbanist font-bold text-sm leading-5 text-[#FFFFFF] bg-[#1FBE8E] hover:bg-[#1FBE8E] rounded-md mt-4 pb-5">Sign in</Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>

                <div className="">
                    <img
                        src="/images/login-bg.png"
                        className="hidden lg:block lg:w-auto"
                        alt="Login illustration"
                    ></img>
                </div>
            </div>

        </div>

    );
};

export default LoginPage;
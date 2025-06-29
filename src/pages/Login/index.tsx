import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useLogin } from "../../api/hooks/useLogin";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import Cleave from "cleave.js/react";

const loginSchema = z.object({
  phone: z
    .string()
    .min(10, {
      message: "Telefon raqami kamida 10 ta raqamdan iborat bo'lishi kerak",
    })
    .max(13, {
      message:
        "Telefon raqami ko'p bo'lsa, 13 ta raqamdan iborat bo'lishi kerak",
    })
    .regex(/^\+?\d+$/, {
      message: "Telefon raqam to'g'ri formatda bo'lishi kerak",
    }),
  password: z
    .string()
    .min(4, { message: "Parol kamida 6 belgidan iborat bo'lishi kerak" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="bg-white shadow-md rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Hisobga kirish
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Telefon raqam
                  </FormLabel>
                  <FormControl>
                    <Cleave
                      {...field}
                      options={{
                        prefix: "+998",
                        delimiters: [" ", " ", "-", "-"],
                        blocks: [4, 2, 3, 2, 2],
                        numericOnly: true,
                      }}
                      onChange={(e) =>
                        field.onChange(e.target.value.replace(/[^+\d]/g, ""))
                      }
                      placeholder="+998 99 999-99-99"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Parol
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      withToggle
                      placeholder="Parolingizni kiriting"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></span>
                  Yuborilmoqda...
                </>
              ) : (
                "Yuborish"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;

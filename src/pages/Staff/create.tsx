import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import Cleave from "cleave.js/react";
import useUserStore from "../../store/user";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../api/endpoints/user";
import { toast } from "react-toastify";

const formSchema = z.object({
  name: z.string().min(1, "Ism majburiy"),
  phone: z.string().min(9, "Telefon raqam noto‘g‘ri"),
  password: z
    .string()
    .min(4, "Parol kamida 4 ta belgidan iborat bo‘lishi kerak"),
  role: z.enum(["WAITER", "CASHER"], {
    errorMap: () => ({ message: "Rol tanlang" }),
  }),
});

type CreateUserInput = z.infer<typeof formSchema>;

const Create: React.FC = () => {
  const { userData } = useUserStore();

  const mutation = useMutation({
    mutationFn: createUser,
  });

  const form = useForm<CreateUserInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      role: "WAITER",
    },
  });

  const onSubmit = (values: CreateUserInput) => {
    const payload = {
      ...values,
      restaurantId: userData.restaurantId,
    };

    mutation.mutate(payload, {
      onSuccess: () => window.location.reload(),
      onError: (error: any) =>
        toast.error(error?.response?.data?.message || "Xatolik yuz berdi"),
    });
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ism</FormLabel>
                <FormControl>
                  <Input placeholder="Ism kiriting" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon raqam</FormLabel>
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parol</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Parol kiriting"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kim bo'lib ishlaydi</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Rol tanlang" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="WAITER">Ofitsiant</SelectItem>
                    <SelectItem value="CASHER">Kassir</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-main">
            Saqlash
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Create;

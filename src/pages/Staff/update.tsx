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
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSingleUser, updateUser } from "../../api/endpoints/user";

const formSchema = z.object({
  name: z.string().min(1, "Ism majburiy"),
  phone: z.string().min(9, "Telefon raqam noto‘g‘ri"),

  role: z.enum(["WAITER", "CASHER", "OWNER"], {
    errorMap: () => ({ message: "Rol tanlang" }),
  }),
});

type CreateUserInput = z.infer<typeof formSchema>;

const Update: React.FC<{ id: string }> = ({ id }) => {
  const { userData } = useUserStore();

  const { data: user } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getSingleUser(id),
  });

  const mutation = useMutation({
    mutationFn: updateUser,
  });

  const form = useForm<CreateUserInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      role: "WAITER",
    },
  });

  React.useEffect(() => {
    if (user) {
      form.setValue("name", user.name);
      form.setValue("phone", user.phone);
      form.setValue("role", user.role);
    }
  }, [user, form]);

  const onSubmit = (values: CreateUserInput) => {
    const payload = {
      ...values,
      id,
      restaurantId: userData.restaurantId,
    };

    mutation.mutate(payload, { onSuccess: () => window.location.reload() });
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kim bo'lib ishlaydi</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
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

          <Button
            disabled={mutation.isPending}
            type="submit"
            className="w-full bg-main"
          >
            {mutation.isPending ? "Yuklanmoqda..." : "O'zgartirish"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Update;

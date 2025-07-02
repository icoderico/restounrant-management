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

import useUserStore from "../../store/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getSingleFood, updateFood } from "../../api/endpoints/food";
import { formatThousand } from "../../utils/formatNumber";

const formSchema = z.object({
  name: z.string().min(1, "Ism majburiy"),
  price: z.number().min(1, "Narx majburiy"),
});

type CreateUserInput = z.infer<typeof formSchema>;

const Update: React.FC<{ id: string }> = ({ id }) => {
  const { userData } = useUserStore();

  const { data: item } = useQuery({
    queryKey: ["food", id],
    queryFn: () => getSingleFood(id),
  });

  const mutation = useMutation({
    mutationFn: updateFood,
  });

  const form = useForm<CreateUserInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  React.useEffect(() => {
    if (item) {
      form.setValue("name", item.name);
      form.setValue("price", item.price);
    }
  }, [item, form]);

  const onSubmit = (values: CreateUserInput) => {
    const payload = {
      ...values,
      id,
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
                <FormLabel>Taom nomi</FormLabel>
                <FormControl>
                  <Input placeholder="Taom nomini kiriting" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Narxi</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Narxni kiriting"
                    value={field.value === 0 ? "" : formatThousand(field.value)}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "");
                      field.onChange(raw === "" ? "" : Number(raw));
                    }}
                  />
                </FormControl>
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

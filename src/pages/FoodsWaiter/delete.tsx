import { Button } from "../../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteFood } from "../../api/endpoints/food";

const Delete: React.FC<{ id: string }> = ({ id }) => {
  const mutation = useMutation({
    mutationFn: deleteFood,
  });

  const handleDelete = () => {
    if (id) {
      mutation.mutate(id, {
        onSuccess: () => window.location.reload(),
        onError: (error: any) =>
          toast.error(error?.response?.data?.message || "Xatolik yuz berdi"),
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center py-5">
        Taomni o'chirmoqchimisiz?
      </h1>
      <div>
        <Button className="bg-red-500 w-full" onClick={handleDelete}>
          O'chirish
        </Button>
      </div>
    </div>
  );
};

export default Delete;

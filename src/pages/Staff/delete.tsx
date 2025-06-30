import { Button } from "../../components/ui/button";
import { deleteUser } from "../../api/endpoints/user";
import { useMutation } from "@tanstack/react-query";

const Delete: React.FC<{ id: string }> = ({ id }) => {
  const mutation = useMutation({
    mutationFn: deleteUser,
  });

  const handleDelete = () => {
    if (id) {
      mutation.mutate(id, { onSuccess: () => window.location.reload() });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center py-5">
        Xodimni o'chirmoqchimisiz?
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

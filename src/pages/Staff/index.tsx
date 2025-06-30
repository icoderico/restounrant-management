import React from "react";
import Create from "./create";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Pen, Trash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/endpoints/user";
import Update from "./update";
import Delete from "./delete";

const List: React.FC = () => {
  type SelectionState = {
    type: "edit" | "delete" | "create" | "";
    id?: string;
  };

  const [selection, setSelection] = React.useState<SelectionState>({
    type: "",
    id: "",
  } as SelectionState);

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (selection.type === "create") {
    return (
      <div>
        <div className="flex justify-between items-center py-4">
          <Button
            className="bg-white text-main border border-main hover:bg-main hover:text-white"
            onClick={() => setSelection({ type: "" })}
          >
            <ArrowLeft />
          </Button>
          <h2 className="text-2xl  font-semibold">Xodim qo'shish</h2>
        </div>
        <Create />
      </div>
    );
  }

  if (selection.type === "edit" && selection.id) {
    return (
      <div>
        <div className="flex justify-between items-center py-4">
          <Button
            className="bg-white text-main border border-main hover:bg-main hover:text-white"
            onClick={() => setSelection({ type: "" })}
          >
            <ArrowLeft />
          </Button>
          <h2 className="text-2xl  font-semibold">Xodimni tahrirlash </h2>
        </div>
        <Update id={selection.id} />
      </div>
    );
  }

  if (selection.type === "delete" && selection.id) {
    return (
      <div>
        <div className="flex justify-between items-center py-4">
          <Button
            className="bg-white text-main border border-main hover:bg-main hover:text-white"
            onClick={() => setSelection({ type: "" })}
          >
            <ArrowLeft />
          </Button>
          <h2 className="text-2xl  font-semibold">Xodimni o'chirish</h2>
        </div>
        <Delete id={selection.id} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between px-7 py-4">
        <h1 className="text-2xl font-semibold">Xodimlar</h1>
        <Button
          onClick={() => setSelection({ type: "create" })}
          className="bg-main"
        >
          Qo'shish
        </Button>
      </div>

      <div className="p-2 flex flex-col gap-1 ">
        {users
          ?.filter((user) => user.role !== "OWNER")
          .map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center rounded-md bg-gray-200 p-2"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-lg text-main">
                  {user.name}{" "}
                  {user.role === "WAITER"
                    ? "(Ofitsiant)"
                    : user.role === "CASHER"
                    ? "(Kassir)"
                    : "(Ega)"}
                </span>
                <span className="text-sm text-gray-500">{user.phone}</span>
              </div>

              <div className="flex gap-2">
                <Button
                  className="bg-main text-white"
                  onClick={() => setSelection({ type: "edit", id: user.id })}
                >
                  <Pen />
                </Button>
                <Button
                  className="bg-red-500 text-white"
                  onClick={() => setSelection({ type: "delete", id: user.id })}
                >
                  <Trash />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default List;

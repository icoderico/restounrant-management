import React, { useState } from "react";
import Create from "./create";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Pen, Trash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Update from "./update";
import Delete from "./delete";
import { getFoods } from "../../api/endpoints/food";
import { formatThousand } from "../../utils/formatNumber";
import { Input } from "../../components/ui/input";
import Loader from "../../custom/Loader";

const List: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  type SelectionState = {
    type: "edit" | "delete" | "create" | "";
    id?: string;
  };

  const [selection, setSelection] = React.useState<SelectionState>({
    type: "",
    id: "",
  } as SelectionState);

  const { data: items, isLoading } = useQuery({
    queryKey: ["foods"],
    queryFn: getFoods,
  });

  const filteredItems = React.useMemo(() => {
    if (!searchTerm.trim()) return items || [];

    return (items || []).filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-300 text-black rounded-sm">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (isLoading) return <Loader />;

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
          <h2 className="text-2xl  font-semibold">Taom qo'shish</h2>
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
          <h2 className="text-2xl  font-semibold">Taomni tahrirlash </h2>
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
          <h2 className="text-2xl  font-semibold">Taomni o'chirish</h2>
        </div>
        <Delete id={selection.id} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between px-7 py-4">
        <h1 className="text-2xl font-semibold">Taomlar</h1>
        <Button
          onClick={() => setSelection({ type: "create" })}
          className="bg-main"
        >
          Qo'shish
        </Button>
      </div>

      <div className="py-4">
        <Input
          placeholder="Taomni qidirish"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="p-2 flex flex-col gap-1 ">
        {filteredItems?.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center rounded-md bg-gray-200 p-2"
          >
            <div className="flex flex-col">
              <span className="text-sm text-black font-medium">
                {highlightMatch(item.name, searchTerm)}
              </span>
              <span className="text-sm font-bold text-main">
                {formatThousand(item.price)} so'm
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                className="bg-main text-white"
                onClick={() => setSelection({ type: "edit", id: item.id })}
              >
                <Pen />
              </Button>
              <Button
                className="bg-red-500 text-white"
                onClick={() => setSelection({ type: "delete", id: item.id })}
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

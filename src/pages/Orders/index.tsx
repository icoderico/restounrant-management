import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import React from "react";
import Create from "./create";

type SelectionState = {
  type: "edit" | "delete" | "create" | "";
  id?: string;
};

const List: React.FC = () => {
  const [selection, setSelection] = React.useState<SelectionState>({
    type: "",
    id: "",
  } as SelectionState);

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
          <h2 className="text-2xl  font-semibold">Buyurtma yaratish</h2>
        </div>
        <Create />
      </div>
    );
  }

  return (
    <div>
      <div className="py-4">
        <Button
          onClick={() => setSelection({ type: "create" })}
          className="bg-main w-full h-[50px]"
        >
          Buyurtma yaratish
        </Button>
      </div>
    </div>
  );
};

export default List;

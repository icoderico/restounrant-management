import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import React from "react";
import Create from "./create";
import ListEdit from "./listedit";

type SelectionState = {
  type: "edit" | "delete" | "create" | "table" | "";
  id?: string;
};

const List: React.FC = () => {
  const [selection, setSelection] = React.useState<SelectionState>({
    type: "",
    id: "",
  });

  const [selectedTable, setSelectedTable] = React.useState("");

  const tables = React.useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => `Stol: ${i + 1}`);
  }, []);

  const [visibleTables] = React.useState(() => {
    const shuffled = [...tables].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  });

  const hiddenTables = React.useMemo(
    () => tables.filter((t) => !visibleTables.includes(t)),
    [tables, visibleTables]
  );

  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredTables = React.useMemo(() => {
    if (!searchTerm.trim()) return visibleTables;

    const searchLower = searchTerm.toLowerCase();
    const matchedVisible = visibleTables.filter((t) =>
      t.toLowerCase().includes(searchLower)
    );
    const matchedHidden = hiddenTables.filter((t) =>
      t.toLowerCase().includes(searchLower)
    );

    return [...matchedVisible, ...matchedHidden];
  }, [searchTerm, visibleTables, hiddenTables]);

  if (selection.type === "create" && selectedTable) {
    return (
      <div>
        <div className="flex justify-between items-center py-4">
          <Button
            className="bg-white text-main border border-main hover:bg-main hover:text-white"
            onClick={() => setSelection({ type: "" })}
          >
            <ArrowLeft />
          </Button>
          <h2 className="text-2xl font-semibold">{selectedTable}</h2>
        </div>
        <Create table={selectedTable} />
      </div>
    );
  }

  if (selection.type === "table") {
    return (
      <div className="space-y-3">
        <input
          type="number"
          placeholder="Stolni qidirish..."
          className="w-full border px-4 py-2 rounded cursor-pointer"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-2">
          {filteredTables.map((table, index) => (
            <div
              key={index}
              className="text-xl bg-main p-2 text-white rounded text-center"
              onClick={() => {
                setSelectedTable(table);
                setSelection({ type: "create" });
              }}
            >
              {table}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="py-4">
        <Button
          onClick={() => setSelection({ type: "table" })}
          className="bg-main w-full h-[50px]"
        >
          Buyurtma yaratish
        </Button>
      </div>

      <ListEdit />
    </div>
  );
};

export default List;

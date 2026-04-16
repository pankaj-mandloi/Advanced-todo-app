import TodoCard from "./TodoCard";

const TodoColumn = ({
  title,
  todos,
  count,
  onMove,
  onEdit,
  onDelete,
  moveButtonText,
  showEdit,
  showDelete,
  bgColor,
}) => {
  return (
    <div className="rounded-xl border border-gray-400 h-[510px] flex flex-col">
      {/* HEADER */}
      <div
        className={`${bgColor} flex justify-between items-center px-4 py-3 rounded-t-xl border-b border-gray-400`}
      >
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>

        <span className="bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          {count}
        </span>
      </div>

      {/* BODY CONTAINER */}
      <div className="p-4 space-y-3 bg-gray-50 flex-1 rounded-b-xl overflow-y-auto">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No tasks</p>
        ) : (
          todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onMove={onMove}
              onEdit={onEdit}
              onDelete={onDelete}
              showMoveButton={!!onMove}
              moveButtonText={moveButtonText}
              showEdit={showEdit}
              showDelete={showDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoColumn;

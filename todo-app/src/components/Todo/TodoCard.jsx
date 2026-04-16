import { useState } from "react";
import { PRIORITY_COLORS } from "../../utils/constants";
import { Edit, Trash2, MoreVertical, ArrowRight } from "lucide-react";

const TodoCard = ({
  todo,
  onMove,
  onEdit,
  onDelete,
  showMoveButton,
  moveButtonText,
  showEdit,
  showDelete,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  // Check if there are any actions available
  const hasActions = showMoveButton || showEdit || showDelete;

  return (
    <div className="bg-gray-100 rounded-lg border border-gray-200 p-4 mb-3 transition">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-800 text-md">{todo.title}</h4>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${PRIORITY_COLORS[todo.priority]}`}
          >
            {todo.priority}
          </span>
          
          {/* Three dots menu button - disabled when no actions */}
          <div className="relative">
            <button
              onClick={() => hasActions && setShowPopup(!showPopup)}
              disabled={!hasActions}
              className={`p-1 rounded-full transition ${
                hasActions 
                  ? "hover:bg-gray-100 cursor-pointer" 
                  : "opacity-40 cursor-not-allowed"
              }`}
            >
              <MoreVertical size={16} className="text-gray-500" />
            </button>
            
            {/* Popup Menu - only show if has actions */}
            {showPopup && hasActions && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setShowPopup(false)}
                />
                <div 
                  className="absolute top-full mt-1 right-0 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20 min-w-[150px]"
                >
                  {showMoveButton && (
                    <button
                      onClick={() => {
                        onMove(todo);
                        setShowPopup(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition flex items-center justify-between text-blue-600"
                    >
                      <span>{moveButtonText}</span>
                      <ArrowRight size={14} className="text-blue-400" />
                    </button>
                  )}
                  
                  {showEdit && (
                    <button
                      onClick={() => {
                        onEdit(todo);
                        setShowPopup(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-yellow-50 transition flex items-center justify-between text-yellow-600"
                    >
                      <span>Edit</span>
                      <Edit size={14} className="text-yellow-400" />
                    </button>
                  )}
                  
                  {showDelete && (
                    <button
                      onClick={() => {
                        onDelete(todo.id);
                        setShowPopup(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 transition flex items-center justify-between text-red-600"
                    >
                      <span>Delete</span>
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {todo.description}
      </p>
    </div>
  );
};

export default TodoCard;
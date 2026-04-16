import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema } from "../../utils/validationSchemas";
import { PRIORITIES } from "../../utils/constants";

const TodoForm = ({ onSubmit, initialData = null, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(todoSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        priority: initialData.priority,
      });
    } else {
      reset({
        title: "",
        description: "",
        priority: "",
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset({
      title: "",
      description: "",
      priority: "",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">
        {initialData ? "Edit Todo" : "Create New Todo"}
      </h3>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title *</label>
          <input
            {...register("title")}
            placeholder="Enter todo title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description *</label>
          <textarea
            {...register("description")}
            placeholder="Enter todo description"
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Priority *</label>
          <select
            {...register("priority")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          >
            <option value="">Select Priority</option>{" "}
            {/* Added placeholder option */}
            <option value={PRIORITIES.LOW}>Low</option>
            <option value={PRIORITIES.MEDIUM}>Medium</option>
            <option value={PRIORITIES.HIGH}>High</option>
          </select>
          {errors.priority && (
            <p className="text-red-500 text-sm mt-1">
              {errors.priority.message}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="border border-green-600 text-green-600 px-4 py-1.5 rounded-lg hover:bg-green-600 hover:text-white transition duration-200"
          >
            {initialData ? "Update" : "Create"}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={() => {
                reset({
                  title: "",
                  description: "",
                  priority: "",
                });
                onCancel();
              }}
              className="border border-red-500 text-red-600 px-4 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TodoForm;

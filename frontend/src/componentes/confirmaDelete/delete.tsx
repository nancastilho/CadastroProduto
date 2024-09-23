import { Icon } from "@iconify/react";

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (e: number) => void;
  id: number;
}

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  id,
}: ModalDeleteProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <div className="flex justify-center">
          <div className=" mb-4 bg-red-700 rounded-full ">
            <Icon
              icon="heroicons:trash-20-solid"
              fontSize={48}
              className="text-white m-3"
            />
          </div>
        </div>
        <button
          onClick={onClose}
          className=" absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <Icon icon="mdi:close" fontSize={24} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold">
            Você tem certeza que deseja excluir esse item?
          </h2>
        </div>

        <div className="flex justify-evenly">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border w-36 border-gray-300 text-gray-600 hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(id)}
            className="px-4 py-2 bg-red-600 w-36 text-white rounded hover:bg-red-700"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

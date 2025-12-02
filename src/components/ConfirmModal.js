import { Icon } from "@iconify/react";

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirmar acción",
  message = "¿Está seguro de realizar esta acción?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  type = "warning" // warning, danger, info, success
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: 'mdi:alert-circle',
          iconColor: 'text-red-600',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          buttonColor: 'bg-red-600 hover:bg-red-700'
        };
      case 'success':
        return {
          icon: 'mdi:check-circle',
          iconColor: 'text-green-600',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          buttonColor: 'bg-green-600 hover:bg-green-700'
        };
      case 'info':
        return {
          icon: 'mdi:information',
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          buttonColor: 'bg-blue-600 hover:bg-blue-700'
        };
      default: // warning
        return {
          icon: 'mdi:alert',
          iconColor: 'text-yellow-600',
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          buttonColor: 'bg-yellow-600 hover:bg-yellow-700'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-boxdark rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stroke px-6 py-4 dark:border-strokedark">
          <h3 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Icon icon="mdi:close" width="24" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className={`flex items-start gap-4 p-4 rounded-lg ${styles.bgColor}`}>
            <Icon 
              icon={styles.icon} 
              className={`flex-shrink-0 ${styles.iconColor}`}
              width="24"
            />
            <p className="text-black dark:text-white">
              {message}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-stroke px-6 py-4 dark:border-strokedark">
          <button
            onClick={onClose}
            className="rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`rounded px-6 py-2 font-medium text-white ${styles.buttonColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

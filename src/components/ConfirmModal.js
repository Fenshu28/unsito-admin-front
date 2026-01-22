import { Icon } from "@iconify/react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar acción",
  message = "¿Está seguro de realizar esta acción?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  type = "warning", // warning, danger, info, success
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          icon: "mdi:alert-circle",
          iconColor: "text-red-600",
          bgColor: "bg-red-50",
          buttonColor: "bg-red-600 hover:bg-red-700",
        };
      case "success":
        return {
          icon: "mdi:check-circle",
          iconColor: "text-green-600",
          bgColor: "bg-green-50",
          buttonColor: "bg-green-600 hover:bg-green-700",
        };
      case "info":
        return {
          icon: "mdi:information",
          iconColor: "text-brand-600",
          bgColor: "bg-brand-50",
          buttonColor: "bg-brand-600 hover:bg-brand-700",
        };
      default: // warning
        return {
          icon: "mdi:alert",
          iconColor: "text-yellow-600",
          bgColor: "bg-yellow-50",
          buttonColor: "bg-yellow-600 hover:bg-yellow-700",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-sans">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-all"
          >
            <Icon icon="mdi:close" width="20" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div
            className={`flex items-start gap-4 p-4 rounded-2xl border border-opacity-20 ${styles.bgColor} ${styles.iconColor.replace("text", "border")}`}
          >
            <Icon
              icon={styles.icon}
              className={`flex-shrink-0 mt-0.5 ${styles.iconColor}`}
              width="24"
            />
            <p className="text-sm font-medium text-gray-700 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50/50 border-t border-gray-100">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-bold text-gray-700 hover:bg-white transition-all shadow-sm"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`rounded-xl px-6 py-2 text-sm font-bold text-white transition-all shadow-md ${styles.buttonColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

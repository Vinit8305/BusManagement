interface Props {
  open: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDialog = ({ open, title, description, onCancel, onConfirm }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
        <h3 className="font-display text-xl text-[#16213A]">{title}</h3>
        <p className="mt-1.5 text-sm text-[#6B7280]">{description}</p>
        <div className="mt-5 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-[#D9D5C9] py-2.5 text-sm font-medium text-[#16213A]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-[#B23A2B] py-2.5 text-sm font-medium text-white"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

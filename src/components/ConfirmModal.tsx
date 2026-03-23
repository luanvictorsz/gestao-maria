type Props = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
};

export default function ConfirmModal({
  open,
  onConfirm,
  onCancel,
  message,
}: Props) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>

        <div className="modal-actions">
          <button onClick={onConfirm}>Confirmar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
import { FC } from "react";
interface PopupProps {
  onConfirm?: () => void;
  children?: React.ReactNode;
}
const Popup: FC<PopupProps> = ({ onConfirm, children }) => {
  const preference = {
    modalOverlay: !onConfirm
      ? "hidden"
      : "fixed h-full flex justify-center items-center bg-gray-300 inset-0 z-50 shadow-lg bg-opacity-50",
    modalContent: "w-2/5 p-4",
  };
  return (
    <div>
      <div className={preference.modalOverlay}>
        <div className={preference.modalContent}>{children}</div>
      </div>
    </div>
  );
};

export default Popup;

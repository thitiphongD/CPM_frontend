import React from "react";

interface Props {
  open: boolean;
  close: () => void;
  header: string;
  content: string;
  ok: () => void;
  cancelText?: string;
  okText?: string;
  showCancelBtn?: boolean;
}

const Modal: React.FC<Props> = ({
  open,
  close,
  header,
  content,
  ok,
  cancelText = "Close",
  okText = "OK",
  showCancelBtn = true,
}) => {
  if (!open) return null;
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
        <div className="relative mx-auto w-96">
          <div className="border border-[#343434] rounded-lg relative flex flex-col w-full bg-[#232323]">
            <div className="flex items-start justify-between p-5 border-b border-[#343434]">
              <h3 className="text-xl font-semibold">{header}</h3>
            </div>
            <div className="relative p-4">
              <p className="my-2 text-lg">{content}</p>
            </div>
            <div className="flex items-center gap-4 justify-end p-6 border-t border-[#343434]">
              {showCancelBtn && (
                <button className="default" onClick={close}>
                  {cancelText}
                </button>
              )}
              <button className="primary" onClick={ok}>
                {okText}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;

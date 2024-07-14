"use client";
import React, {
  ChangeEvent,
  useCallback,
  useRef,
  FormEvent,
  useState,
} from "react";
import { FormRegister } from "@/app/interfaces/auth";
import { useRouter } from "next/navigation";
import { registerService } from "@/app/services/auth.service";
import Modal from "../ui/Modal";

const RegisterForm = () => {
  const router = useRouter();

  const form = useRef<FormRegister>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleOk = () => {
    setShowModal(false);
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    form.current[name as keyof FormRegister] = value;
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const res = await registerService(form.current);
        if (res.ok) {
          router.push("/login");
        } else {
          const error = await res.json();
          setContent(JSON.stringify(error.error));
          handleOpen();
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    [router]
  );

  return (
    <>
      <Modal
        open={showModal}
        close={handleClose}
        header="Register"
        content={content}
        ok={handleOk}
        showCancelBtn={false}
      />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="text-[#7c7c7c]">Username</p>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className="w-96 placeholder-[#7c7c7c] p-2"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <p className="text-[#7c7c7c]">Password</p>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            className="w-96 placeholder-[#7c7c7c] p-2 hover:text-hoverYellow"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <p className="text-[#7c7c7c]">Confirm Password</p>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Enter confirm password"
            className="w-96 placeholder-[#7c7c7c] p-2 hover:text-hoverYellow"
            onChange={handleChange}
          />
        </div>
        <button className="primary w-96" type="submit">
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;

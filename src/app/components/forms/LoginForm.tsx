"use client";
import React, {
  ChangeEvent,
  useCallback,
  useRef,
  FormEvent,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { FormLogin } from "@/app/interfaces/auth";
import { loginService } from "@/app/services/auth.service";
import { useAuth } from "@/app/auth/AuthProvider";
import Modal from "../ui/Modal";

const LoginForm = () => {
  const { loginAuth } = useAuth();
  const router = useRouter();
  const form = useRef<FormLogin>({ username: "", password: "" });
  
  const [showModal, setShowModal] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleOk = () => {
    setShowModal(false);
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    form.current[name as keyof FormLogin] = value;
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const res = await loginService(form.current);
        if (res.ok) {
          loginAuth(form.current.username);
          router.push("/portfolio");
        } else {
          const error = await res.json();
          setContent(JSON.stringify(error.error));
          handleOpen();
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    [loginAuth, router]
  );

  return (
    <>
      <Modal
        open={showModal}
        close={handleClose}
        header="Login"
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
            required
            className="w-96 placeholder-[#7c7c7c] p-2"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <p className="text-[#7c7c7c]">Password</p>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            className="w-96 placeholder-[#7c7c7c] p-2 hover:text-hoverYellow"
            onChange={handleChange}
          />
        </div>
        <button className="primary w-96" type="submit">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;

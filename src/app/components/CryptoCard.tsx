"use client";
import React, { useEffect, useState } from "react";
import { CoinType } from "../interfaces/coin";
import Image from "next/image";
import Link from "next/link";
import useIsMobile from "../hooks/useIsMobile";
import { usePathname } from "next/navigation";
import { deleteCoinService } from "../services/coin.service";
import Icon from "@mdi/react";
import { mdiTrashCan } from "@mdi/js";
import Modal from "./ui/Modal";

interface Props {
  data: CoinType[] | any;
  username: string | null;
  mutate: () => void;
  showDelete: boolean;
}

const CryptoCard: React.FC<Props> = ({
  data,
  username,
  mutate,
  showDelete,
}) => {
  const isMobile = useIsMobile();
  const [title, setTitle] = useState("");
  const pathname = usePathname();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [cryptoName, setCryptoName] = useState<string>(""); 

  const handleOpen = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
    cryptoName: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteId(id)
    setCryptoName(cryptoName)
    setShowModal(true)
    setContent(`Are you sure delete ${cryptoName}?`);
  };

  const handleClose = () => setShowModal(false);

  const handleOk = async () => {
    if (deleteId && cryptoName) {
      try {
        const res = await deleteCoinService(deleteId.toString(), username);
        if (res.ok) {
          mutate();
          setShowModal(false);
        } else {
          const error = await res.json();
          setContent(`Deleted coin ${error.message}`)
        }
      } catch (error) {
        setContent('Error deleting coin')
      }
    }
  };

  useEffect(() => {
    if (pathname === "/") {
      setTitle("Cryptocurrency");
    } else if (pathname === "/portfolio") {
      setTitle("Portfolio");
    }
  }, [pathname]);

  if (!data || !Array.isArray(data)) {
    return null;
  }

  return (
    <div className="flex flex-col pt-2 px-4 w-full">
       <Modal
        open={showModal}
        close={handleClose}
        header="Delete"
        content={content}
        ok={handleOk}
        showCancelBtn={false}
      />
      {isMobile ? (
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold py-4">{title}</p>
          {username && (
            <div className="all-center w-12 h-12 border border-[#7c7c7c] rounded-full">
              <span className="text-xl font-bold text-white">
                {username?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between">
          {username && (
            <span className="text-xl font-bold text-white py-4">
              Welcome {username}
            </span>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((coin: CoinType) => (
          <div key={coin.id} className="coin-card border rounded-lg p-4">
            <Link
              href={{
                pathname: `/coin/${coin.id}`,
                query:
                  pathname === "/"
                    ? { isAdd: "true" }
                    : pathname === "/portfolio"
                    ? { isEdit: "true" }
                    : {},
              }}
              className="flex-grow no-underline"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-2">
                  <Image
                    src={coin.logo}
                    width={40}
                    height={40}
                    alt={`${coin.name} logo`}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-bold">{coin.name}</p>
                    <p className="text-sm text-gray-600">{coin.symbol}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-medium">
                    ${coin.quote.USD.price.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm ${
                      coin.quote.USD.percent_change_24h >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {coin.quote.USD.percent_change_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  {coin.quantity && (
                    <p className="text-sm text-gray-600">
                      Quantity: {coin.quantity.toFixed(2)}
                    </p>
                  )}
                  {coin.amount && (
                    <p className="text-sm text-gray-600">
                      Amount: ${coin.amount.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </Link>
            {showDelete && (
              <div className="flex justify-end">
                <button
                  className="danger"
                  onClick={(e) => handleOpen(e, coin.id, coin.name)}
                >
                  <Icon path={mdiTrashCan} size={1} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoCard;

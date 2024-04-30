import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { createContext, useContext } from "react";
import { firestore } from "../firebase/config";
import { useAuth } from "./AuthContext";
import { useNotify } from "./NotifyContext";
import { Stock } from "../models/Stock/Stock";
import { instance } from "../hooks/axios";

const DataContext = createContext({} as any);
export function useData() {
  return useContext(DataContext);
}

type DataProviderProps = {
  children: React.ReactNode;
};

const DataProvider: React.FC<DataProviderProps> = (props) => {
  const { showPopup } = useNotify();
  const { user } = useAuth();

  const create = async (symbol: string, skip: boolean) => {
    let data: any;
    try {
      data = await instance
        .get(`http://localhost:5001/api/profile/${symbol}`)
        .then((res) => JSON.parse(JSON.stringify(res.data[0])));
    } catch (error) {
      showPopup(`${symbol} request failed.`, "error");
      return;
    }

    const ref = doc(firestore, "stocks", symbol);
    // await runTransaction(firestore, async (transaction) => {
    //   const doc = await transaction.get(ref);
    //   if (doc.exists() && skip) {
    //     return showPopup(`${symbol} already exists.`, "error");
    //   }
    // });

    const obj: Stock = {
      ...data,
      id: JSON.stringify(Date.now()),
      creatorId: user.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(ref, obj)
      .then(() => {
        showPopup(`${symbol} added successfully.`, "success");
      })
      .catch(() => {
        showPopup(`Failed to add ${symbol}.`, "error");
      });
  };

  const get = async (symbol: string) => {
    const ref = doc(firestore, "stocks", symbol);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      showPopup(`${symbol} does not exist.`, "error");
    }
  };

  const value = {
    create,
    get,
  };
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default DataProvider;

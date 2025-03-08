"use client";
import React, { useEffect, useState } from "react";

type Bahasa = {
  inggris: string;
  indonesia: string;
};
export default function BerandaPage() {
  const [acak, setAcak] = useState({
    inggris: true,
    indonesia: false,
  });
  const [backgroundAcak] = useState({
    nonActive: "ring-1 ring-blue-600 text-blue-600  cursor-pointer",
    active: "bg-blue-600  hover:bg-blue-700 text-gray-50 cursor-not-allowed",
  });
  const [remainingData, setRemainingData] = useState<Bahasa[]>([]);
  const [result, setResult] = useState<{
    choice: Bahasa[];
    question: Bahasa;
    loading: boolean;
  }>({
    choice: [],
    question: { inggris: "", indonesia: "" },
    loading: true,
  });
  const [data] = useState<Bahasa[]>([
    { inggris: "mattress", indonesia: "kasur" },
    { inggris: "floor", indonesia: "lantai" },
    { inggris: "table", indonesia: "meja" },
    { inggris: "chair", indonesia: "kursi" },
    { inggris: "limit", indonesia: "membatasi" },
    { inggris: "expand", indonesia: "memperluas" },
    { inggris: "repair", indonesia: "memperbaiki" },
    { inggris: "damage", indonesia: "merusak" },
    { inggris: "still", indonesia: "tetap" },
    { inggris: "also", indonesia: "juga" },
    { inggris: "bring", indonesia: "membawa" },
    { inggris: "leave", indonesia: "meninggalkan" },
    { inggris: "together", indonesia: "bersama" },
    { inggris: "separate", indonesia: "berpisah" },
    { inggris: "write", indonesia: "menulis" },
    { inggris: "erase", indonesia: "menghapus" },
    { inggris: "speak", indonesia: "berbicara" },
    { inggris: "talk", indonesia: "diam" },
    { inggris: "available", indonesia: "tersedia" },
    { inggris: "without", indonesia: "tanpa" },
    { inggris: "less", indonesia: "kurang" },
    { inggris: "expected", indonesia: "diharapkan" },
    { inggris: "chance", indonesia: "kesempatan" },
    { inggris: "actually", indonesia: "sebenarnya" },
{ inggris: "often", indonesia: "sering" },
{ inggris: "decide", indonesia: "memutuskan" },
{ inggris: "pursue", indonesia: "mengejar" },
    // { inggris: "coverage", indonesia: "cakupan" },
    // { inggris: "currently", indonesia: "saat ini" },
    // { inggris: "both", indonesia: "keduanya" },
    // { inggris: "assign", indonesia: "menugaskan" },
    // { inggris: "each", indonesia: "setiap" },
  ]);

  useEffect(() => {
    const newdata = filterData(data);
    setRemainingData(newdata.remainingDataResult);
    const randomData = acakArray(data, 9, newdata.randomData);
    randomData.push(newdata.randomData);
    setResult({
      question: newdata.randomData,
      choice: acakArray(randomData, 10, null),
      loading: false,
    });
  }, [acak]);

  const filterData = (data: Bahasa[]) => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomData = data[randomIndex];
    const remainingDataResult = data.filter(
      (_, index) => index !== randomIndex
    );
    return { randomData, remainingDataResult };
  };

  const acakArray = (
    arr: Bahasa[],
    max: number,
    exclude: Bahasa | null
  ): Bahasa[] => {
    const shuffled = arr
      .filter((item) => item !== exclude)
      .sort(() => Math.random() - 0.5);
    return shuffled.slice(0, max);
  };

  const [inputAnswer, setInputAnswer] = useState("");
  const submitAnswer = (resultdata: string) => {
    if (remainingData.length) {
      if (
        result.question.indonesia === resultdata ||
        result.question.inggris === resultdata
      ) {
        const newdata = filterData(remainingData);
        console.log(newdata);
        setRemainingData(newdata.remainingDataResult);
        const randomData = acakArray(data, 9, newdata.randomData);
        randomData.push(newdata.randomData);
        setResult({
          question: newdata.randomData,
          choice: acakArray(randomData, 10, null),
          loading: false,
        });
        setInputAnswer("");
      }
    }
  };

  useEffect(() => {
    if (!remainingData.length) {
      if(acak.indonesia){
        setAcak({indonesia:false,inggris:true})
      }else{
        setAcak({indonesia:true,inggris:false})
      }
    } 
  }, [remainingData]);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitAnswer(inputAnswer);
  };

  return (
    <div>
      <div className="max-w-[500px] mx-5 md:mx-auto p-5 ring-1 ring-gray-200 bg-white my-5 rounded-sm">
        {/* urutan pertanyaan */}
        <div className="grid grid-cols-2 gap-2 border-b border-dotted border-gray-300 pb-5">
          <div
            className={`${
              acak.inggris ? backgroundAcak.active : backgroundAcak.nonActive
            }  text-center rounded-sm py-4 text-xs uppercase`}
            onClick={() => setAcak({ inggris: true, indonesia: false })}
          >
            inggris - indonesia
          </div>
          <div
            className={`${
              acak.indonesia ? backgroundAcak.active : backgroundAcak.nonActive
            }  text-center rounded-sm py-4 text-xs uppercase`}
            onClick={() => setAcak({ inggris: false, indonesia: true })}
          >
            indonesia - inggris
          </div>
        </div>
        {/* urutan pertanyaan */}
        {/* pertanyaan */}
        <div className="flex justify-center border-b border-dotted border-gray-300 pb-5">
          <div className="ring-1 ring-gray-300 text-gray-600 mt-5 text-xs uppercase font-semibold py-3 px-4 rounded-sm cursor-not-allowed">
            {result.loading
              ? "..."
              : acak.indonesia
              ? result.question.indonesia
              : acak.inggris
              ? result.question.inggris
              : null}
          </div>
        </div>
        {/* pertanyaan */}

        {/* input answer */}
        <div className="border-b border-dotted border-gray-300 pb-5 mt-5">
          {/* {!remainingData.length && !result.loading ? (
            <div className="ring-green-400 p-5 text-xs mb-5 uppercase rounded-sm bg-green-100 ring-1">
              soal sudah habis, silahkan reload untuk mengulangi
            </div>
          ) : null} */}
          <form onSubmit={submitForm}>
            <input
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
              type="text"
              className="outline-none w-full ring-1 ring-gray-200 rounded-sm p-3 focus:ring-blue-400 text-sm"
              placeholder="Input your answer..."
            />
          </form>
        </div>
        {/* input answer */}

        {/* pilihan jawaban */}
        <div className="flex flex-wrap justify-center mt-5 gap-2 border-b border-dotted border-gray-300 pb-5">
          {result.choice.map((databahasa, index) => (
            <div
              className="ring-1 cursor-pointer hover:bg-gray-100 ring-gray-200 text-xs uppercase font-medium py-3 px-4 rounded-sm"
              key={index}
              onClick={() =>
                submitAnswer(
                  acak.indonesia
                    ? databahasa.inggris
                    : acak.inggris
                    ? databahasa.indonesia
                    : ""
                )
              }
            >
              {acak.indonesia
                ? databahasa.inggris
                : acak.inggris
                ? databahasa.indonesia
                : null}
            </div>
          ))}
        </div>
        {/* pilihan jawaban */}
      </div>
    </div>
  );
}

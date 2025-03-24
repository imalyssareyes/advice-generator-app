"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [dataId, setDataId] = useState([]);
  const [dataAdvice, setDataAdvice] = useState([]);

  const getRandomAdvice = async () => {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const advice = data.slip.advice;
      const id = data.slip.id;
      setDataAdvice(advice);
      setDataId(id);
    } catch(error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    getRandomAdvice();
  }, []);

  return (
    <div className="grid max-w-[1440px] m-auto min-h-screen">
      <main className="max-w-md flex flex-col items-center rounded-md bg-[color:var(--dark-grayish-blue)] m-auto relative">
        <div className="rounded-md flex flex-col text-center p-10">
          <p className="uppercase text-[color:var(--neon-green)] font-extrabold text-xs tracking-widest">Advice <span># {dataId}</span></p>
          <h1 className="py-8 text-2xl text-[color:var(--light-cyan)] font-bold">"{dataAdvice}"</h1>
          <Image
            src="/pattern-divider-desktop.svg"
            alt="divider-desktop"
            width={500}
            height={200}
            priority
          />
        </div>
        <button 
          onClick={getRandomAdvice}
          className="rounded-full h-[60] w-[60] bg-[color:var(--neon-green)] p-4 relative top-[30px] hover:shadow-2xl hover:shadow-emerald-400 hover:cursor-pointer hover:drop-shadow-xl"
        >
          <Image
            src="/icon-dice.svg"
            alt="dice"
            width={28}
            height={28}
          />
        </button>
      </main>
    </div>
  );
}

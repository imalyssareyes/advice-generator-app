"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataId, setDataId] = useState([]);
  const [dataAdvice, setDataAdvice] = useState([]);

  const getRandomAdvice = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const { slip: { advice, id } } = await response.json();
      setDataAdvice(advice);
      setDataId(id);
    } catch(error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setIsLoading(false); // Ensure loading state is reset in both success and error cases
    }
  };

  useEffect(() => {
    getRandomAdvice();
  }, []);

  return (
    <div className="grid max-w-[1440px] m-auto min-h-screen p-20">
      <main className="max-w-md flex flex-col items-center rounded-md bg-[color:var(--dark-grayish-blue)] m-auto relative z-0">
        <div className="rounded-md flex flex-col text-center p-10">
          {isLoading ? (
            <p className="mb-8 h-5 bg-gray-400 rounded my-1 w-full animate-pulse"></p>
          ) : (
            <p className="uppercase text-[color:var(--neon-green)] font-extrabold text-xs tracking-widest">Advice <span># {dataId}</span></p>
          )}
           {isLoading ? (
            <p className="mb-8 h-10 bg-gray-400 rounded my-1 w-full animate-pulse"></p>
          ) : (
            <h1 className="py-8 text-2xl text-[color:var(--light-cyan)] font-bold">&quot;{dataAdvice}&quot;</h1>
          )}
          
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
          className="rounded-full flex flex-col items-center justify-evenly h-[60] w-[60] bg-[color:var(--neon-green)] relative top-[30px] hover:shadow-emerald-400 hover:cursor-pointer hover:drop-shadow-xl z-10 hover:shadow-[0px_0px_25px_3px_rgba(0,0,0,5)]"
        >
          <Image
            src="/icon-dice.svg"
            alt="dice"
            width={25}
            height={25}
          />
        </button>
      </main>
    </div>
  );
}

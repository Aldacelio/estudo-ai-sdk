"use client";

import { useState } from "react";

export default function CompletionPage() {
  const [prompt, setPrompt] = useState("");
  const [completion, setCompletion] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const complete = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPrompt("");

    try{
        const response = await fetch("/api/completion", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.error || "Algo deu errado. Tente novamente!");
        }

        setCompletion(data.text);
    } catch(error){
        setError(error instanceof Error ? error.message : "Algo deu errado. Tente novamente!");
    }finally{
        setLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-full max-w-xl py-24 mx-auto stretch">

        {error && (
            <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
                {error}
            </div>
        )}

        {
            isLoading ? (
                <div>Carregando...</div>
            ) : completion ? (
                <div className="whitespace-pre-wrap">{completion}</div>
            ) : null
        }
      <form onSubmit={complete} className="fixed bottom-0 w-full max-w-xl mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-lg">
        <div className="flex gap-2">
          <input
            className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Faça sua pergunta aqui !"
          />
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );

}
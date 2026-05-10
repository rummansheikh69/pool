import React, { useState } from "react";

export default function PoolTokenCalculator() {
  const [totalGames, setTotalGames] = useState("");
  const [perBet, setPerBet] = useState("");

  const [players, setPlayers] = useState([{ name: "", wins: "" }]);

  const [results, setResults] = useState(null);

  const addPlayer = () => {
    setPlayers([...players, { name: "", wins: "" }]);
  };

  const updatePlayer = (index, field, value) => {
    const updated = [...players];
    updated[index][field] = value;
    setPlayers(updated);
  };

  const calculate = () => {
    const formattedPlayers = players.map((p) => ({
      name: p.name,
      wins: Number(p.wins),
    }));

    const pairwise = [];

    for (let i = 0; i < formattedPlayers.length; i++) {
      for (let j = i + 1; j < formattedPlayers.length; j++) {
        const p1 = formattedPlayers[i];
        const p2 = formattedPlayers[j];

        const diff = p1.wins - p2.wins;

        if (diff > 0) {
          pairwise.push({
            from: p2.name,
            to: p1.name,
            amount: diff * Number(perBet),
          });
        } else if (diff < 0) {
          pairwise.push({
            from: p1.name,
            to: p2.name,
            amount: Math.abs(diff) * Number(perBet),
          });
        }
      }
    }

    const boatBills = formattedPlayers.map((p) => ({
      name: p.name,
      bill: p.wins * Number(perBet),
    }));

    setResults({
      pairwise,
      boatBills,
    });
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <div className="max-w-3xl mx-auto bg-zinc-800 rounded-2xl p-6 shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Pool Token Calculator
        </h1>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2">Total Games</label>
            <input
              type="number"
              value={totalGames}
              placeholder="0"
              onChange={(e) => setTotalGames(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-700 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2">Per Player Amount (৳)</label>
            <input
              type="number"
              value={perBet}
              placeholder="0"
              onChange={(e) => setPerBet(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-700 outline-none "
            />
          </div>
        </div>

        <div className="space-y-4">
          {players.map((player, index) => (
            <div
              key={index}
              className="grid md:grid-cols-2 gap-4 bg-zinc-700 p-4 rounded-xl"
            >
              <input
                type="text"
                placeholder="Player Name"
                value={player.name}
                onChange={(e) => updatePlayer(index, "name", e.target.value)}
                className="p-3 rounded-xl bg-zinc-800 outline-none capitalize"
              />

              <input
                type="number"
                placeholder="Wins"
                value={player.wins}
                onChange={(e) => updatePlayer(index, "wins", e.target.value)}
                className="p-3 rounded-xl bg-zinc-800 outline-none"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row ">
          <button
            onClick={addPlayer}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold"
          >
            + Add Player
          </button>

          <button
            onClick={calculate}
            className="mt-4 md:ml-4 bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-semibold"
          >
            Generate Result
          </button>
        </div>

        {results && (
          <div className="mt-10 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">টাকার হিসাব</h2>

              <div className="space-y-3">
                {results.pairwise.map((r, index) => (
                  <div
                    key={index}
                    className="bg-zinc-700 p-4 rounded-xl flex justify-between"
                  >
                    <span className=" capitalize ">
                      <strong className=" mr-2">{r.from}</strong> ➜{" "}
                      <strong className=" ml-2">{r.to}</strong>
                    </span>

                    <span className="font-bold text-green-400">
                      ৳ {r.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">বোর্ড বিল</h2>

              <div className="space-y-3">
                {results.boatBills.map((b, index) => (
                  <div
                    key={index}
                    className="bg-zinc-700 p-4 rounded-xl flex justify-between"
                  >
                    <span className=" capitalize">{b.name}</span>

                    <span className="font-bold text-yellow-400">
                      ৳ {b.bill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Section */}
        <div className="mt-12 border-t border-zinc-700 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-zinc-400">
          <div className="">
            <span className="font-semibold text-white">Pool Location:</span>{" "}
            Pujakhola mandir, Choto Boyra, Khulna, Bangladesh
          </div>

          <div className="">
            <span className="font-semibold text-white">Developer:</span> Labib |
            +8801401458564
          </div>
        </div>
      </div>
    </div>
  );
}

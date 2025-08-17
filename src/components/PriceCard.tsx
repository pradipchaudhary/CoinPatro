import { toNepaliNumber } from "../utils/nepaliNumber";

interface PriceCardProps {
  coin: string;
  price: number;
  lastUpdated: string;
}

export default function PriceCard({ coin, price, lastUpdated }: PriceCardProps) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mb-4 w-72">
      <h2 className="text-xl font-bold">{coin} मूल्य</h2>
      <p className="text-2xl text-green-600">
        रु {toNepaliNumber(price.toFixed(2))}
      </p>
      <p className="text-gray-500 text-sm">
        अन्तिम अपडेट: {lastUpdated}
      </p>
    </div>
  );
}

export interface PortfolioPosition {
  id: string;
  botName: string;
  pair: string;
  side: "long" | "short";
  entry: number;
  current: number;
  qty: number;
  pnl: number; // %
  status: "open" | "closed";
  openedAt: string;
}

export const portfolioPositions: PortfolioPosition[] = [
  {
    id: "p1",
    botName: "Alpha Grid Pro",
    pair: "BTC/USDT",
    side: "long",
    entry: 64200,
    current: 65180,
    qty: 0.12,
    pnl: 1.52,
    status: "open",
    openedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: "p2",
    botName: "ScalpX AI",
    pair: "ETH/USDT",
    side: "short",
    entry: 3420,
    current: 3380,
    qty: 1.5,
    pnl: 1.17,
    status: "open",
    openedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
  {
    id: "p3",
    botName: "Trend Rider",
    pair: "EURUSD",
    side: "long",
    entry: 1.085,
    current: 1.092,
    qty: 0.5,
    pnl: 0.65,
    status: "open",
    openedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "p4",
    botName: "Nova Arbitrage",
    pair: "SOL/USDT",
    side: "long",
    entry: 142.5,
    current: 144.1,
    qty: 4,
    pnl: 1.12,
    status: "closed",
    openedAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
  },
];

export const equityCurve = [
  { day: "Mon", value: 10000 },
  { day: "Tue", value: 10120 },
  { day: "Wed", value: 10080 },
  { day: "Thu", value: 10240 },
  { day: "Fri", value: 10380 },
  { day: "Sat", value: 10420 },
  { day: "Sun", value: 10580 },
];

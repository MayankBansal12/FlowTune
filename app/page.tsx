import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-background flex flex-col gap-2">
      <span className="text-foreground">hello, it's FlowTune</span>
      <span>a nice and ad-free music player</span>
    </div>
  );
}

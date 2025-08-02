import Image from "next/image";
import logo from "../public/logo/main-logo.png";

const RenderLogo = () => {
  return (
    <div className="w-full flex gap-2 items-center py-1 px-2">
      <Image src={logo} alt="logo" className="w-8 h-8" />
      FlowTune
    </div>
  );
};

export { RenderLogo };

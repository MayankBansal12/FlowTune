import { TopSidebar, BottomSidebar } from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="mx-auto p-12 h-screen text-[#eee8df] gap-2 bg-[url('https://cdn.pixabay.com/photo/2023/01/12/20/17/loft-7714798_1280.jpg')] bg-cover bg-center">
      <div className="grid grid-cols-6 h-full grid-rows-8  mx-auto ">
        {/* sidebar */}
        <div className="col-span-1 row-span-8 p-2">
          <div className="row-span-2 col-span-2 backdrop-blur-md bg-white/20  rounded-2xl">
            <TopSidebar />
          </div>
          <div className="row-span-6 backdrop-blur-md mt-6">
            <BottomSidebar />
          </div>
        </div>
        {/* main content */}

        <div className="col-span-4 row-span-8 backdrop-blur-md">dashboard</div>

        {/* left sidebar */}
        <div className="col-span-1 row-span-8 backdrop-blur-md">leftbar</div>
      </div>
    </div>
  );
}

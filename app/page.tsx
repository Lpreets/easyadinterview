import Image from "next/image";
import { Button } from "@/components/ui/button";
import Form from "./_components/form/Form";
import Carousel from "./_components/Carousel";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <main className="bg-white">
      <header className="flex md:mx-4 md:justify-between justify-center">
        <Image className="mt-2 mr-6 md:mr-0" src="/logo.png" alt="logo" width={150} height={150} />
        <div className="space-x-8 mr-2 mt-4 md:block hidden">
          <Button aria-label="Login button"> Login</Button>
          <Button aria-label="Sign up button">Sign up</Button>
        </div>
      </header>
      <section className="relative">
        <div className="background-image hidden lg:block" style={{ height: "760px", width: "1152px" }} />
        <div className="lg:absolute lg:top-12 lg:right-20 flex items-center justify-center lg:mr-12 mt-10 lg:mt-10">
          <div className="bg-white p-4 border-4 border-double border-slate-500 rounded-lg">
            <Form />
          </div>
        </div>
      </section>
      <div className="md:block hidden lg:mt-0 mt-10">
      <h1 className="text-center text-xl font-bold mb-8">Brands that use our service</h1>
      <div className="flex">
        <div className="flex-1" />
        <Carousel />
        <div className="flex-1" />
      </div>
      </div>
      <footer className="hidden lg:block">
        <Footer />
      </footer>
    </main>
  );
}

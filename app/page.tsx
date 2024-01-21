import Image from "next/image";
import { Button } from "@/components/ui/button";
import Form from "./_components/form/Form";

export default function Home() {
  return (
    <main className="bg-white">
      <header className="flex mx-4 justify-between">
        <Image className="mt-2" src="/logo.png" alt="logo" width={150} height={150} />
        <div className="space-x-8 mr-2 mt-4">
          <Button>Login</Button>
          <Button>Sign up</Button>
        </div>
      </header>
      <section className="relative">
        <div className="background-image hidden lg:block" style={{ height: "760px", width: "1152px" }} />
        <div className="lg:absolute lg:top-16 lg:right-20 flex items-center justify-center lg:mr-12 mt-24 lg:mt-10">
          <div className="bg-white p-4 border-4 border-double border-slate-500 rounded-lg">
            <Form />
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Form from "./_components/form/Form";

export default function Home() {
  return (
    <main className="bg-white">
      <header className="flex space-y-2 mx-2 justify-between">
        <Image src="/logo.png" alt="logo" width={150} height={150} />
        <div className="space-x-4">
          <Button>Sign up</Button>
          <Button>Login</Button>
        </div>
      </header>
      <section className="relative">
        <div className="background-image hidden lg:block" style={{ height: "700px", width: "1150px" }} />
        <div className="lg:absolute lg:top-20 lg:right-20 flex items-center justify-center lg:mr-16 mt-28 lg:mt-10">
          <div className="bg-slate-50 p-4 border-4 border-double border-slate-500 rounded-lg">
            <Form />
          </div>
        </div>
      </section>
    </main>
  );
}

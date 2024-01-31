"use client"

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const navlinks = [
  {
    name: "Research",
    href: "#steg1",
  },
  {
    name: "Visualize",
    href: "#steg2",
  },
  {
    name: "Tech Stack",
    href: "#steg3",
  },
  {
    name: "Figma",
    href: "#steg4",
  },
  {
    name: "Code",
    href: "#steg5",
  },
  {
    name: "E2E Testing",
    href: "#steg6",
  },
  {
    name: "Accessibility",
    href: "#steg7",
  },
  {
    name: "Metrix",
    href: "#steg8",
  },
];

const Dashboard = () => {

  const { logout, user } = useAuth()

  if (!user) redirect('/')

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="bg-white border-l-2 border-r-2">
      <header>
        <div className="h-24 border-t-4">
          <h1 className="text-6xl text-center font-bold pt-2">Presentasjon</h1>
        </div>
      </header>
      <nav className="flex justify-evenly">
      {navlinks.map((link) => (
        <Button key={link.name} onClick={() => handleClick(link.href.slice(1))}>
          {link.name}
        </Button>
      ))}
    </nav>
    <div className="border mt-2" />
      <main className="mt-4 mx-4">
        <section>
          <div className="flex justify-center my-2">
          <Button onClick={logout}>Logout</Button>
          </div>
          <h1 className="text-center text-4xl">
            Min tankegang og fremgang av case
          </h1>
        </section>
        <article>
          <h2 className="text-2xl mt-2 font-bold">Tankegang</h2>
          <p className="text-lg mb-2">
            For å angripe caset så valgte jeg først å lage en oversikt som
            prosjekt i Notion over alt som måtte gjøres i en steg for steg liste
            for å følge en optimal fremgrangsmåte. Så lagde jeg forskjellige
            oppgaver til de stegene.
          </p>
          <h3 className="text-center font-bold mt-4">Oversikt</h3>
          <div className="flex border-t-2">
            <div className="mt-8 flex1 flex-col">
              <h3 className="text-center mb-2 font-bold">Notion</h3>
              <Image
                src="/notion.png"
                alt="notion"
                width={600}
                height={600}
                className="rounded-lg"
              />
            </div>
            <div className="flex-1 mx-8 mt-14">
              <p>
                Her kommer case som vi ønsker at du presenterer løsning på i
                møtet på tirsdag. Du står helt fritt ifht. hvordan du ønsker å
                angripe caset, samt presentasjonsmetoden.
              </p>
              <br />
              <p>
                <u>1.Lag en innloggingsside</u>
              </p>
              <br />
              <div className="border-4 border-double">
                <ol className="ml-6 list-disc ">
                  <li>1. Research different log in styles</li>
                  <li>2. Visualize with Exalidraw</li>
                  <li>3. Write down Tech Stack</li>
                  <li>4. Make Wireframe and Prototype in Figma</li>
                  <li>5. Code</li>
                  <li>6. E2E Testing</li>
                  <li>7. Accessibility</li>
                  <li>8. Metrix</li>
                </ol>
              </div>
              <br />
              <p>
                <u>
                  2. Dersom oppgaven hadde vært at du skulle lage en fungerende
                  innloggingsportal til en tjeneste, hvilke oppgaver ville du
                  gjort selv, og hvilke ville du eventuelt ha delegert videre?
                  Vi ønsker en begrunnelse av valgene du hadde tatt.
                </u>
              </p>
            </div>
          </div>
          <h3 className="text-center font-bold mt-4" id="steg1">Research</h3>
          <div className="flex border-t-2 justify-center">
            <div className="mt-8">
              <Image
                src="/research.png"
                alt="notion"
                width={1000}
                height={600}
                className="rounded-lg"
              />
            </div>
          </div>
          <h3 className="text-center font-bold mt-4" id="steg2">Visualize</h3>
          <div className="flex justify-center border-t-2">
            <div className="mt-8">
              <Image
                src="/exalidraw.png"
                alt="notion"
                width={1000}
                height={600}
                className="rounded-lg"
              />
            </div>
          </div>
          <h3 className="text-center font-bold mt-4" id="steg3">Tech Stack</h3>
          <div className="flex border-t-2">
            <div className="mt-8 flex1 flex-col">
              <h3 className="text-center mb-2 font-bold">Notion</h3>
              <Image
                src="/techstack.png"
                alt="notion"
                width={600}
                height={600}
                className="rounded-lg"
              />
            </div>
            <div className="flex-1 mx-8 mt-14">
              <div className="mt-20 pt-14" />
              <div className="border-4 border-double">
                  <p><u>Language &/or Framework</u></p>
                <ol className="ml-6 list-disc ">
                  <li>Next.js (React)</li>
                  <li>TypeScript</li>
                </ol>
                <br />
                <p><u>Dependencies</u></p>
                <ol className="ml-6 list-disc">
                  <li>Shadcn</li>
                  <li>Embla Carousel</li>
                </ol>
              </div>
            </div>
          </div>
          <h3 className="text-center font-bold mt-4" id="steg4">Figma</h3>
          <div className="flex justify-center border-t-2">
            <div className="mt-8">
              <Image
                src="/figma.png"
                alt="notion"
                width={1000}
                height={600}
                className="rounded-lg"
              />
            </div>
          </div>
          <h3 className="text-center font-bold mt-4" id="steg5">Code</h3>
          <div className="flex justify-center border-t-2">
            <div className="mt-8">
              <Image
                src="/code.png"
                alt="notion"
                width={1000}
                height={800}
                className="rounded-lg"
              />
            </div>
          </div>
          <h3 className="text-center font-bold mt-4" id="steg6">E2E Testing</h3>
          <div className="flex justify-center border-t-2">
            <div className="mt-8">
              <Image
                src="/e2etesting.jpg"
                alt="notion"
                width={1000}
                height={600}
                className="rounded-lg"
              />
            </div>
          </div>
          <h3 className="text-center font-bold mt-4" id="steg7">Accessibility</h3>
          <div className="flex justify-center border-t-2">
            <div className="mt-8">
              <Image
                src="/acces1.png"
                alt="notion"
                width={1000}
                height={600}
                className="rounded-lg"
              />
            </div>
            <div className="mt-8">
              <Image
                src="/acees2.png"
                alt="notion"
                width={1000}
                height={600}
                className="rounded-lg"
              />
            </div>
          </div>
          <h3 className="text-center font-bold mt-4" id="steg8">Metrix</h3>
          <div className="flex justify-center border-t-2">
            <div className="mt-8">
              <Image
                src="/gtmetrix.png"
                alt="notion"
                width={1000}
                height={500}
                className="rounded-lg"
              />
            </div>
          </div>
        </article>
        <article>
        <h3 className="text-center font-bold mt-4" id="steg8">Del 2</h3>
        <div className="border-t-2 pt-4 ">
        Dersom oppgaven hadde vært at du skulle lage en fungerende innloggingsportal til en tjeneste, hvilke oppgaver ville du gjort selv, og hvilke ville du eventuelt ha delegert videre? Vi ønsker en begrunnelse av valgene du hadde tatt.
        <div className="flex">
        <div className="flex-1 mx-8 mt-14 border-r-2 pr-16">
              <p className="text-center">
                <u>Front-End</u>
              </p>
              <br />
              <div className="border-4 border-double">
                <ol className="ml-6 list-disc ">
                  <li>Design av Brukergrensesnitt (UI)</li>
                  - UX Designer
                  <li>Responsiv Design</li>
                  - Front-End Utvikler
                  <li>Klient Side Validering</li>
                  - Front-End Utvikler
                  <li>Accessibility</li>
                  - Front-End Utvikler
                </ol>
              </div>
              <br />
              <p>
              </p>
            </div>
            <div className="flex-1 mx-8 mt-14">
              <p className="text-center">
                <u>Back-End</u>
              </p>
              <br />
              <div className="border-4 border-double">
                <ol className="ml-6 list-disc ">
                  <li>API-utvikling</li>
                  - Back-End Utvikler
                  <li>Database bruker intergrasjon</li>
                  - Back-End Utvikler
                  <li>Tredjeparts Autentiseringstjenester</li>
                  - Back-End Utvikler / Sikkerhet spesialist
                  <li>Implementering av Sikkerhetstiltak</li>
                  - Back-End Utvikler / Sikkerhet spesialist
                  <li>Spesifikk back-end testing</li>
                  - Back-End Utvikler
                </ol>
              </div>
              <br />
              </div>
            </div>
          </div>
        </article>
      </main>
      <div className="flex justify-center py-8">
      <Button onClick={scrollToTop}><ArrowUp /></Button>
      </div>
    </div>
  );
};

export default Dashboard;

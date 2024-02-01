import React from 'react'
import FormReset from '../_components/form/FormReset'
import Image from 'next/image'

const PasswordReset = () => {
  return (
    <main className="bg-white">
           <header className="flex md:mx-4 md:justify-between justify-center">
        <Image className="mt-2 mr-6 md:mr-0" src="/logo.png" alt="logo" width={150} height={150} />
        <div className="space-x-8 mr-2 mt-4 md:block hidden">

        </div>
      </header>
    <section className="relative">
    <div className="background-image hidden lg:block" style={{ height: "760px", width: "1152px" }} />
    <div className="lg:absolute lg:top-14 lg:right-20 flex items-center justify-center lg:mr-12 mt-10 lg:mt-10">
      <div className="bg-white p-4 border-4 border-double border-slate-500 rounded-lg">
        <FormReset />
      </div>
    </div>
  </section>
  </main>
  )
}

export default PasswordReset
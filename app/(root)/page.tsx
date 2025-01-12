"use client";

import React from "react";

import { useRouter } from "next/navigation";
import kuantslogo from "../../src/assets/kuantslogo.svg"
import Image from 'next/image'; // Import the Image component
import Spacer from "@/src/components/Spacer";

export default function About() {
  const router = useRouter();

  const navigateToHomePage = React.useCallback(() => {
    router.replace("/login");
  }, [router]);

  return (
    <div>
      <div
        className="flex flex-col min-h-screen items-center justify-center">
        <div className="absolute top-4 right-4"> {/* Position the button */}
          <button 
            onClick={navigateToHomePage} 
            className="px-6 py-3 bg-white text-purple-700 font-medium rounded-lg hover:bg-gray-100"
          >
            Login
          </button>
        </div>
        <Image 
          src={kuantslogo} // Use the imported image as the source
          alt="Kuants Logo" 
          width={200} // Adjust width as needed
          height={50} 
           className="mt-6" // Adjust height as needed
        />
        <div >
        <h1 className="text-xl  text-black text-center mt-8">
          India's Only AI Powered Agency Management Software specially built Insurance Companies
        </h1>
        <p className="text-black text-center mt-4">
          Contact: <a href="mailto:admin@goclientwise.in" className="underline">admin@goclientwise.in</a> for demo login
        </p>
        </div>
        <div 
        className="p-4 mt-3 rounded-lg shadow-md" 
        style={{ 
          width: '80%', // Adjust width as needed
          maxWidth: '600px', // Optional: Set a maximum width
          background:"#fff",
        }}
      >
       <div className="text-xl  text-black text-center mt-2"> Key Features:</div>
       <Spacer size="xs"></Spacer>
       <p className="text-center"> Auto-Commission Calcutors, Policy Management, Broadcast Messages,  Marketing Content Management, Track Agent Performance,AI based policy recommendation, Complete Agent CRM, Client Tracking, Meeting Reminders, Event Reminders, Latest News, 
       </p>
       <div className="text-xl  text-black text-center mt-8">Special Offers</div>
       <Spacer size="xs"></Spacer>

       <p  className="text-center"> Custom Reports, Insurance Integrations, White label Solution, Self Hosted Solution for Data Privacy, Agent Mobile Apps Available
       </p>
      </div>
      
      </div>
    </div>
  );
}

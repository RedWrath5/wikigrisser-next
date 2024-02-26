import React from "react";
import { Layout } from "../components/Layout";

const ContactPage = () => (
    <Layout>
        <div className="flex flex-col text-center items-center justify-self-center w-full px-2 mt-5">
            <div className="mt-4">
                <h2 className="text-2xl font-bold">Join Wikigrisser Team - Langrisser Mobile Volunteers Needed!</h2>
                <p className="mt-2">Heroes of El Sallia, our quest for knowledge at Wikigrisser needs your valor! To keep providing top-notch hero insights, event guides, and updates, we're recruiting volunteers.</p>

                <h3 className="mt-4 text-xl font-semibold">Content Creators:</h3>
                <p>Your mission:</p>
                <ul className="list-disc list-inside">
                    <li>Update crucial game info in our spreadsheet: <a href="http://bitly.com/langrisserref" className="text-blue-800 underline">http://bitly.com/langrisserref</a></li>
                    <li>Translate and input data, manage images and exports in our git repository.</li>
                </ul>

                <h3 className="mt-4 text-xl font-semibold">Web Developers:</h3>
                <p>We need your magic in:</p>
                <ul className="list-disc list-inside">
                    <li>Enhancing our React and TypeScript site: <a href="https://github.com/RedWrath5/wikigrisser-next" className="text-blue-800 underline">https://github.com/RedWrath5/wikigrisser-next</a></li>
                    <li>Integrating content from our Google Spreadsheet to generate static content.</li>
                </ul>

                <div className="mt-4">
                    <p>If you're ready to contribute to our community's knowledge pool, join us on Discord and DM <strong>Sibshops</strong> or <strong>Deathcrystal</strong>. Together, let's forge a legacy for Langrisser Mobile!</p>
                    <a href="https://discord.com/invite/9qSAuqUMzg" className="text-blue-800 underline">Join the Langrisser Discord</a>
                    <p>Thank you for considering this noble quest. For Langrisser!</p>
                </div>
            </div>
        </div>
    </Layout>
);

export default ContactPage;

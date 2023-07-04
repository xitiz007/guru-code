import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SettingsProvider } from "@/atoms/settings";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>Guru Code</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <meta
          name="description"
          content="Master coding skills, the premier Guru code. Access a vast collection of coding problems, solutions, and explanations. Prepare for top tech company challenges, track your progress, and engage with a vibrant programming community. Start your coding journey today!"
        />
        <meta name="keywords" content="guru code, leetcode, problem solving" />
        <meta name="author" content="Kshitiz Baniya" />
        <meta
          name="image"
          content={`https://guru-code.vercel.app/my-page.png`}
        />
        <meta property="og:title" content="Guru Code" />
        <meta
          property="og:description"
          content="Master coding skills, the premier Guru code. Access a vast collection of coding problems, solutions, and explanations. Prepare for top tech company challenges, track your progress, and engage with a vibrant programming community. Start your coding journey today!"
        />
        <meta
          property="og:image"
          content={`https://guru-code.vercel.app/my-page.png`}
        />
        <meta property="og:url" content="https://guru-code.vercel.app/" />
        <meta property="og:type" content="website" />
      </Head>
      <main className="relative min-h-screen">
        <SettingsProvider />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="light"
        />
        <Component {...pageProps} />
      </main>
    </RecoilRoot>
  );
}

import type { NextPage } from 'next'
import { useEffect, useState } from 'react';


const Home: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    // We're using optional chaining (question mark) to check if the object is null
    if (window?.solana?.isPhantom) {
      console.log('Phantom wallet found!');
      const response = await window.solana.connect({ onlyIfTrusted: true });
      console.log(
        'Connected with Public Key:',
        response.publicKey.toString()
      );
      setWalletAddress(response.publicKey.toString());
    } else {
      alert('Solana object not found! Get a Phantom Wallet 👻');
    }
  };

  const connectWallet = async () => { 
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="bg-black p-5 rounded-full font-bold text-l"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-10 lg:gap-20 font-sans bg-blue-900 text-white'>
      <h1 className='text-4xl lg:text-8xl font-bold'>🖼 GIF Portal</h1>
      <p className='text-l lg:text-3xl'>View your GIF collection in the metaverse ✨</p>
      {!walletAddress && renderNotConnectedContainer()}
    </div>
  )
}

export default Home
